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
import { SearchIcon, IconHome, IconReceipt } from "components/allSvgIcon";
import { useGetCommonDictionaryMutation } from "app/api/commonDictionary";
import { DateWithoutDash } from "helpers/dateFormat";
import CustomDatePicker from "components/customDatePicker";
import { InputSize } from "components/componentsType";
import { convertBase64 } from "helpers/convertBase64";
import IconInfo from "assets/image/Icon-info.png";
import { ImageWrapper } from "../../commonStyle";
import { EN1200INSERT, EN1200UPDATE, EN1200DELETE, EN120011 } from "app/path";

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

    // const fetchCode11 = async (code: string) => {
    //   try {
    //     const response: any = await API.get(EN120011, {
    //       params: { areaCode: code },
    //     });

    //     if (response.status === 200) {
    //       return response?.data;
    //     } else {
    //       alert(response?.response?.data?.message);
    //       resetButtonCombination();
    //     }
    //     return null;
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };

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

        // try {
        //   const response: any = await API.post(EN1200DELETE, formValues);
        //   if (response.status === 200) {
        //     toast.success("삭제하였습니다", {
        //       autoClose: 500,
        //     });
        //     await fetchData();
        //   } else {
        //     alert(response?.response?.data?.message);
        //   }
        // } catch (err) {
        //   console.log(err);
        // }

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

      // try {
      //   const response: any = await API.post(path, formValues);
      //   if (response.status === 200) {
      //     if (isAddBtnClicked) {
      //       setIsAddBtnClicked(false);
      //       await fetchData("pos");
      //     } else {
      //       await fetchData();
      //     }

      //     toast.success("저장이 성공하였습니다", {
      //       autoClose: 500,
      //     });
      //   } else {
      //     alert(response?.response?.data?.message);
      //   }
      // } catch (err: any) {
      //   console.log(err);
      // }

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
        style={{ width: "800px", padding: "0px 10px" }}
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
            <Wrapper grid col={2}>
              <Input
                label="코 드"
                register={register("saupSno")}
                inputSize={InputSize.i150}
                readOnly
              />

              <FormGroup>
                <Label>영 업 소</Label>
                <Select
                  value={areaCode}
                  onChange={(e) => {
                    setAreaCode(e.target.value);
                    codeChangeHandler(e.target.value);
                  }}
                  width={InputSize.i175}
                  disabled={!isAddBtnClicked}
                >
                  {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>
            </Wrapper>
            <Divider />
            <Wrapper grid col={2}>
              <Controller
                control={control}
                {...register("saupSsno")}
                render={({ field: { onChange, value, name, onBlur } }) => (
                  <Input
                    label="사업자 번호"
                    value={value}
                    name={name}
                    onChange={onChange}
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
                    onBlur={onBlur}
                    readOnly={!isAddBtnClicked}
                  />
                )}
              />
              <Input
                label="종사업자번호"
                register={register("saupRCode")}
                inputSize={InputSize.i175}
                maxLength="4"
              />
            </Wrapper>
            <Wrapper grid col={2}>
              <Input
                label="상 호"
                register={register("saupSangho")}
                inputSize={InputSize.i150}
                maxLength="50"
              />
              <Input
                label="대 표"
                register={register("saupSajang")}
                inputSize={InputSize.i175}
                maxLength="20"
              />
            </Wrapper>
            <Wrapper style={{ alignItems: "center" }}>
              <Input
                label="주 소"
                register={register("saupZipcode")}
                inputSize={InputSize.i150}
                readOnly
              />
              <DaumAddress
                setAddress={setAddress}
                defaultValue={saupAddr1}
                onClose={() => setFocus("saupAddr2")}
              />
              <Input
                maxLength="40"
                style={{ width: "383px" }}
                value={saupAddr1}
                onChange={(e: any) => setSaupAddr1(e.target.value)}
              />
            </Wrapper>
            <Wrapper>
              <Input
                label=""
                register={register("saupAddr2")}
                maxLength="40"
                style={{ width: "565px" }}
              />
            </Wrapper>
            <Wrapper grid col={2}>
              <Input
                label="업 태"
                register={register("saupUptae")}
                inputSize={InputSize.i250}
                maxLength="50"
              />
              <Input
                label="종 목"
                register={register("saupJongmok")}
                inputSize={InputSize.i175}
                maxLength="50"
              />
            </Wrapper>
            <Divider />
            <Wrapper style={{ justifyContent: "space-between" }}>
              <div>
                <Wrapper style={{ alignItems: "center" }}>
                  <Input
                    label="도장 이미지"
                    register={register("saupStampImg")}
                    value={image?.name}
                    inputSize={InputSize.i250}
                  />

                  <button
                    style={{
                      width: "110px",
                      height: "30px",
                      fontSize: "15px",
                      background: "#666666",
                      borderRadius: "5px",
                      border: "1px solid #707070",
                      color: "#fff",
                      position: "relative",
                    }}
                    type="button"
                  >
                    <SearchIcon />
                    &nbsp; 파일찾기
                    <input
                      type="file"
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        opacity: 0,
                      }}
                      onChange={handleChangeImage}
                    />
                  </button>
                </Wrapper>
                <Wrapper
                  style={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "21px",
                  }}
                >
                  <FormGroup>
                    <Label></Label>
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
                </Wrapper>
                <Wrapper style={{ alignItems: "center" }}>
                  <FormGroup style={{ alignItems: "center" }}>
                    <Label>개업일</Label>
                    <Controller
                      control={control}
                      {...register("saupDate")}
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <CustomDatePicker value={value} onChange={onChange} />
                      )}
                    />

                    <Controller
                      control={control}
                      {...register("saupJumin")}
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          label="주민번호/법인번호"
                          value={value}
                          name={name}
                          onChange={onChange}
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
                </Wrapper>
              </div>
              <ImageWrapper>{image64 && <img src={image64} />}</ImageWrapper>
            </Wrapper>
            <Wrapper>
              <Input
                label="메 모"
                register={register("saupBigo")}
                maxLength="50"
                style={{ width: "394px" }}
              />
            </Wrapper>
            <Divider />
            <Wrapper grid col={2}>
              <Input
                label="아이디"
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
              />
            </Wrapper>
            <Wrapper grid col={2}>
              <Input
                label="담당자명"
                register={register("saupEdiSawon")}
                maxLength="14"
                inputSize={InputSize.i200}
              />

              <Controller
                control={control}
                {...register("saupEdiSmsNo")}
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    label="전화번호"
                    value={value}
                    name={name}
                    onChange={onChange}
                    inputSize={InputSize.i175}
                    // mask={[
                    //   /\d/,
                    //   /\d/,
                    //   /\d/,
                    //   "-",
                    //   /\d/,
                    //   /\d/,
                    //   /\d/,
                    //   /\d/,
                    //   "-",
                    //   /\d/,
                    //   /\d/,
                    //   /\d/,
                    //   /\d/,
                    // ]}
                  />
                )}
              />
            </Wrapper>
            <Wrapper style={{ alignItems: "center" }}>
              <Input
                label="이메일"
                register={register("saupEdiEmail")}
                maxLength="35"
                inputSize={InputSize.i200}
              />
              <p style={{ margin: "0 1px" }}>@</p>
              <Select register={register("emailKind")}>
                {dataCommonDic?.emailKind?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code1}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </Wrapper>
            <Wrapper style={{ alignItems: "center" }}>
              <Input
                label="공인 인증서"
                register={register("saupCert")}
                inputSize={InputSize.i200}
              />
              <button
                style={{
                  width: "128px",
                  height: "30px",
                  fontSize: "15px",
                  background: "#666666",
                  borderRadius: "5px",
                  border: "1px solid #707070",
                  color: "#fff",
                  position: "relative",
                  marginLeft: "17px",
                }}
                type="button"
              >
                <SearchIcon />
                &nbsp; 찾기
                <input
                  type="file"
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 0,
                  }}
                />
              </button>
            </Wrapper>
            <Wrapper
              style={{
                padding: "10px 0 0 105px",
                color: "#1B8C8E",
                fontSize: "15px",
                alignItems: "center",
              }}
            >
              <img src={IconInfo} alt="info-icon" />
              &nbsp;
              <p>조아빌 전자세금계산서 회원가입정보를 설정합니다.</p>
            </Wrapper>
          </div>

          <div>
            <div
              style={{
                background: "rgba(101,84,255,0.2)",
                width: "100%",
                height: "auto",
                fontSize: "15px",
                color: "#1B8C8E",
                padding: "20px",
                display: "flex",
                alignItems: "start",
                lineHeight: "21px",
                position: "relative",
              }}
            >
              <img src={IconInfo} /> &nbsp;
              <p>
                공인인증서 신청방법 <br />
                1. 기업용 인터넷뱅킹이 신청되어있는 경우 해당금융기관
                <br /> 기업뱅킹 홈페이지를 통하여 전자세금계산서용 공인인증서를
                온라인상에서 발급 가능. <br />
                2. 사업자범용 또는 Joabill 특정 인증서 사용가능
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                  marginLeft: "50px",
                  marginTop: "5px",
                  position: "absolute",
                  right: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "157px",
                    height: "38px",
                    background: "#5284CE",
                    borderRadius: "999px",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "1px solid #fff",
                    gap: "6px",
                  }}
                >
                  <IconHome />
                  <span style={{ fontSize: "15px", color: "#fff" }}>
                    조아빌 회원가입
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "157px",
                    height: "38px",
                    background: "#5284CE",
                    borderRadius: "999px",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "1px solid #fff",
                    gap: "16px",
                  }}
                >
                  <IconReceipt />
                  <span style={{ fontSize: "15px", color: "#fff" }}>
                    인증서 신청
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
);

export default Form;
