import React, { useImperativeHandle, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { apiGet, apiPost } from "app/axios";
import {
  Input,
  Select,
  FormGroup,
  Wrapper,
  Divider,
  Label,
} from "components/form/style";
import CheckBox from "components/checkbox";
import { IJNOSAUP, emptyObj } from "./model";
import DaumAddress from "components/daum";
import {
  SearchIcon,
  IconHome,
  IconReceipt,
  Trash2,
} from "components/allSvgIcon";
import { useGetCommonDictionaryMutation } from "app/api/commonDictionary";
import { DateWithoutDash } from "helpers/dateFormat";
import CustomDatePicker from "components/customDatePicker";
import { InputSize } from "components/componentsType";
import { convertBase64 } from "helpers/convertBase64";
import IconInfo from "assets/image/Icon-info.png";
import { ImageWrapper } from "../../commonStyle";
import { EN1200INSERT, EN1200UPDATE, EN1200DELETE, EN120011 } from "app/path";
import { BlueDiv, GrayButton } from "../style";
import { InfoText } from "components/text";

interface IForm {
  selected: any;
  fetchData: any;
  isAddBtnClicked: boolean;
  setIsAddBtnClicked: Function;
  resetButtonCombination: Function;
}

const Form = React.forwardRef(
  (
    {
      selected,
      fetchData,
      isAddBtnClicked,
      setIsAddBtnClicked,
      resetButtonCombination,
    }: IForm,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const [areaCode, setAreaCode] = useState("");
    const [addr, setAddress] = useState<string>("");
    const [image, setImage] = useState<{ name: string }>();
    const [image64, setImage64] = useState<any>(null);
    const [saupAddr1, setSaupAddr1] = useState("");

    const [getCommonDictionary, { data: dataCommonDic }] =
      useGetCommonDictionaryMutation();

    const { register, handleSubmit, control, reset, getValues, setFocus } =
      useForm<IJNOSAUP>({ mode: "onChange" });

    useEffect(() => {
      getCommonDictionary({ groupId: "EN", functionName: "EN1200" });
    }, []);

    useEffect(() => {
      if (addr.length > 0) {
        reset((formValues: any) => ({
          ...formValues,
          saupZipcode: addr ? addr?.split("/")[1] : "",
          saupAddr2: "",
        }));

        setSaupAddr1(addr ? addr?.split("/")[0] : "");
      }
    }, [addr]);

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      crud,
      resetForm,
    }));

    const codeChangeHandler = async (aCode: string) => {
      const res = await apiGet(EN120011, { areaCode: aCode });

      if (res) {
        document.getElementsByName("saupSsno")[0]?.focus();
        //setFocus("saupSsno");
        reset({
          ...emptyObj,
          ...res,
          saupSno: res.tempCode,
        });
        setSaupAddr1("");
      } else {
        resetButtonCombination();
      }
    };

    const resetForm = async (type: string) => {
      if (type === "clear") {
        await codeChangeHandler(areaCode);
        return;
      }

      if (type === "reset") {
        if (selected !== undefined && Object.keys(selected)?.length > 0) {
          setSaupAddr1(selected.saupAddr1);
          if (selected?.areaCode !== areaCode) {
            setAreaCode(selected.areaCode);
          }
          reset({
            ...selected,
            saupStampQu: selected?.saupStampQu === "Y",
            saupStampEs: selected?.saupStampEs === "Y",
            saupStampSe: selected?.saupStampSe === "Y",
          });

          selected.saupStampImg
            ? setImage64(selected.saupStampImg)
            : setImage64(null);
        }
      }
    };

    const crud = async (type: string | null) => {
      if (type === "delete") {
        const formValues = getValues();

        const res = await apiPost(EN1200DELETE, formValues, "삭제하였습니다");
        res && (await fetchData());
      }

      if (type === null) {
        handleSubmit(submit)();
      }
    };

    const submit = async (data: IJNOSAUP) => {
      //form aldaagui uyd ajillana
      const path = isAddBtnClicked ? EN1200INSERT : EN1200UPDATE;
      const formValues = getValues();
      isAddBtnClicked && (formValues.areaCode = areaCode);

      formValues.saupStampQu = formValues.saupStampQu ? "Y" : "N";
      formValues.saupStampEs = formValues.saupStampEs ? "Y" : "N";
      formValues.saupStampSe = formValues.saupStampSe ? "Y" : "N";
      formValues.saupDate = DateWithoutDash(formValues.saupDate);
      formValues.saupAddr1 = saupAddr1;

      formValues.saupEdiEmail =
        formValues.saupEdiEmail &&
        formValues.saupEdiEmail.trim() + "@" + formValues.emailKind;

      formValues.saupStampImg = image64 && image64;

      const res = await apiPost(path, formValues, "저장이 성공하였습니다");

      if (res) {
        if (isAddBtnClicked) {
          setIsAddBtnClicked(false);
          await fetchData("last");
        } else {
          await fetchData();
        }
      }
    };

    const handleChangeImage = async (event: any) => {
      setImage({
        name: event?.target?.files ? event?.target?.files[0].name : "",
      });
      try {
        const response =
          event?.target?.files && (await convertBase64(event.target.files[0]));

        setImage64(response);
      } catch (err: any) {
        console.log("image convert 64 error occured.", err);
      }
    };

    return (
      <form
        onSubmit={handleSubmit(submit)}
        style={{
          width: "1005px",
          padding: "6px 10px 0",
        }}
        autoComplete="off"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "75vh",
          }}
        >
          <div>
            <FormGroup>
              <Input
                label="코 드"
                labelStyle={{ minWidth: "90px" }}
                register={register("saupSno")}
                inputSize={InputSize.i150}
                readOnly={!isAddBtnClicked}
              />
              <Label>영 업 소</Label>
              <Select
                value={areaCode}
                onChange={(e: any) => {
                  setAreaCode(e.target.value);
                  codeChangeHandler(e.target.value);
                }}
                width={InputSize.i250}
                disabled={!isAddBtnClicked}
              >
                {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <Divider />
            <FormGroup>
              <Controller
                control={control}
                name="saupSsno"
                render={({ field }) => (
                  <Input
                    {...field}
                    label="사업자 번호"
                    labelStyle={{ minWidth: "90px" }}
                    inputSize={InputSize.i150}
                    mask={[
                      /\d/,
                      /\d/,
                      /\d/,
                      "-",
                      /\d/,
                      /\d/,
                      "-",
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                    ]}
                  />
                )}
              />
              <Input
                label="종사업자번호"
                register={register("saupRCode")}
                inputSize={InputSize.i250}
                maxLength="4"
              />
            </FormGroup>
            <FormGroup>
              <Input
                label="상 호"
                labelStyle={{ minWidth: "90px" }}
                register={register("saupSangho")}
                inputSize={InputSize.i250}
                maxLength="50"
              />
              <Input
                label="대 표"
                register={register("saupSajang")}
                inputSize={InputSize.i250}
                maxLength="20"
              />
            </FormGroup>
            <FormGroup>
              <Input
                label="주 소"
                labelStyle={{ minWidth: "90px" }}
                register={register("saupZipcode")}
                inputSize={InputSize.i90}
              />
              <DaumAddress
                setAddress={setAddress}
                defaultValue={saupAddr1}
                onClose={() => setFocus("saupAddr2")}
              />
              <Input
                maxLength="60"
                style={{ width: "760px" }}
                value={saupAddr1}
                onChange={(e: any) => setSaupAddr1(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Input
                label=""
                labelStyle={{ minWidth: "90px" }}
                register={register("saupAddr2")}
                maxLength="60"
                style={{ width: "882px" }}
              />
            </FormGroup>
            <FormGroup>
              <Input
                label="업 태"
                register={register("saupUptae")}
                labelStyle={{ minWidth: "90px" }}
                style={{ minWidth: "403px" }}
                maxLength="50"
              />
              <Input
                label="종 목"
                labelStyle={{ minWidth: "70px" }}
                register={register("saupJongmok")}
                style={{ minWidth: "403px" }}
                maxLength="50"
              />
            </FormGroup>
            <Divider />
            <FormGroup>
              <Input
                label="도장 이미지"
                labelStyle={{ minWidth: "90px" }}
                register={register("saupStampImg")}
                value={image?.name}
                inputSize={InputSize.i500}
              />

              <GrayButton type="button" style={{ marginRight: "20px" }}>
                <SearchIcon />
                &nbsp; 찾기
                <input type="file" onChange={handleChangeImage} />
              </GrayButton>

              <Trash2 />
            </FormGroup>
            <Wrapper style={{ gap: "20px" }}>
              <div>
                <FormGroup>
                  <Label style={{ minWidth: "92px" }}></Label>
                  <CheckBox
                    title="세금계산서 도장출력"
                    rtl
                    register={register("saupStampSe")}
                    style={{ marginRight: "20px" }}
                  />

                  <CheckBox
                    title="거래명세표 도장출력"
                    rtl
                    register={register("saupStampEs")}
                    style={{ marginRight: "20px" }}
                  />

                  <CheckBox
                    title="견적서 도장출력"
                    rtl
                    register={register("saupStampQu")}
                  />
                </FormGroup>
                <FormGroup>
                  <Label style={{ minWidth: "90px" }}>개업일</Label>
                  <Controller
                    control={control}
                    name="saupDate"
                    render={({ field }) => <CustomDatePicker {...field} />}
                  />
                  <Controller
                    control={control}
                    name="saupJumin"
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="주민번호/법인번호"
                        labelStyle={{ minWidth: "164px" }}
                        inputSize={InputSize.i150}
                        mask={[
                          /\d/,
                          /\d/,
                          /\d/,
                          /\d/,
                          /\d/,
                          /\d/,
                          "-",
                          /\d/,
                          /\d/,
                          /\d/,
                          /\d/,
                          /\d/,
                          /\d/,
                          /\d/,
                        ]}
                      />
                    )}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    label="메 모"
                    labelStyle={{ minWidth: "90px" }}
                    register={register("saupBigo")}
                    maxLength="50"
                    style={{ width: "500px" }}
                  />
                </FormGroup>
              </div>
              <ImageWrapper>{image64 && <img src={image64} />}</ImageWrapper>
            </Wrapper>
            <Divider />
            <FormGroup>
              <Input
                label="아이디"
                labelStyle={{ minWidth: "90px" }}
                register={register("saupEdiId")}
                maxLength="20"
                inputSize={InputSize.i200}
              />
              <Input
                label="비밀번호"
                register={register("saupEdiPass")}
                type="password"
                maxLength="20"
                inputSize={InputSize.i175}
                labelStyle={{ minWidth: "119px" }}
              />
            </FormGroup>
            <FormGroup>
              <Input
                label="담당자명"
                register={register("saupEdiSawon")}
                maxLength="14"
                inputSize={InputSize.i200}
                labelStyle={{ minWidth: "90px" }}
              />

              <Controller
                control={control}
                name="saupEdiSmsNo"
                render={({ field }) => (
                  <Input
                    {...field}
                    label="전화번호"
                    labelStyle={{ minWidth: "119px" }}
                    inputSize={InputSize.i175}
                  />
                )}
              />
            </FormGroup>
            <FormGroup>
              <Input
                label="이메일"
                register={register("saupEdiEmail")}
                maxLength="35"
                inputSize={InputSize.i200}
                labelStyle={{ minWidth: "90px" }}
              />
              <p style={{ margin: "0 1px" }}>@</p>
              <Select
                register={register("emailKind")}
                style={{ width: "278px" }}
              >
                {dataCommonDic?.emailKind?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code1}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <FormGroup>
              <Input
                label="공인 인증서"
                register={register("saupCert")}
                inputSize={InputSize.i500}
                labelStyle={{ minWidth: "90px" }}
              />
              <GrayButton type="button">
                <SearchIcon />
                &nbsp; 찾기
                <input type="file" />
              </GrayButton>
            </FormGroup>
            <InfoText
              text="조아빌 전자세금계산서 회원가입정보를 설정합니다."
              style={{ margin: "10px 0  10px 105px" }}
            />
          </div>
          <div>
            <FormGroup
              style={{
                background: "rgba(101,84,255,0.2)",
                padding: "20px",
                gap: "20px",
              }}
            >
              <FormGroup style={{ alignItems: "start" }}>
                <img src={IconInfo} /> &nbsp;
                <p style={{ color: "#1B8C8E" }}>
                  공인인증서 신청방법 <br />
                  1. 기업용 인터넷뱅킹이 신청되어있는 경우 해당금융기관
                  <br /> 기업뱅킹 홈페이지를 통하여 전자세금계산서용
                  공인인증서를 온라인상에서 발급 가능. <br />
                  2. 사업자범용 또는 Joabill 특정 인증서 사용가능
                </p>
              </FormGroup>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}
              >
                <BlueDiv>
                  <IconHome />
                  <span style={{ fontSize: "15px", color: "#fff" }}>
                    조아빌 회원가입
                  </span>
                </BlueDiv>
                <BlueDiv>
                  <IconReceipt />
                  <span style={{ fontSize: "15px", color: "#fff" }}>
                    인증서 신청
                  </span>
                </BlueDiv>
              </div>
            </FormGroup>
          </div>
        </div>
      </form>
    );
  }
);

export default Form;
