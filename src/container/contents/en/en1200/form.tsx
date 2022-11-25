import React, { useImperativeHandle, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import {
  Input,
  Select,
  Field,
  ErrorText,
  FormGroup,
  Wrapper,
  Divider,
  Label,
} from "components/form/style";
import CheckBox from "components/checkbox";
import { IJNOSAUP } from "./model";
import DaumAddress from "components/daum";
import { schema } from "./validation";
import { SearchIcon, IconHome, IconReceipt } from "components/allSvgIcon";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { formatDate, formatDateByRemoveDash } from "helpers/dateFormat";
import CustomDatePicker from "components/customDatePicker/customdate2";
import { InputSize } from "components/componentsType";
import { convertBase64 } from "helpers/convertBase64";
import API from "app/axios";
import IconInfo from "assets/image/Icon-info.png";
import { ImageWrapper } from "../style";
import { EN1200INSERT, EN1200UPDATE, EN1200DELETE } from "app/path";

interface IForm {
  selected: any;
  fetchData: any;
  setData: any;
  selectedRowIndex: number;
  setSelected: any;
  setSelectedRowIndex: any;
}

const Form = React.forwardRef(
  (
    {
      selected,
      fetchData,
      setData,
      selectedRowIndex,
      setSelected,
      setSelectedRowIndex,
    }: IForm,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);
    const [addr, setAddress] = useState<string>("");
    const [image, setImage] = useState<{ name: string }>();
    const [image64, setImage64] = useState<any>(null);

    const [saupDate, setSaupDate] = useState("");

    const { data: dataCommonDic } = useGetCommonDictionaryQuery({
      groupId: "EN",
      functionName: "EN1200",
    });

    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
      getValues,
    } = useForm<IJNOSAUP>({ mode: "onChange", resolver: yupResolver(schema) });

    useEffect(() => {
      if (selected !== undefined && JSON.stringify(selected) !== "{}") {
        resetForm("reset");
      }
    }, [selected]);

    useEffect(() => {
      if (addr.length > 0) {
        reset({
          saupZipcode: addr ? addr?.split("/")[1] : "",
          saupAddr1: addr ? addr?.split("/")[0] : "",
        });
      }
    }, [addr]);

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      crud,
      resetForm,
      setIsAddBtnClicked,
    }));

    const resetForm = (type: string) => {
      if (selected !== undefined && JSON.stringify(selected) !== "{}") {
        console.log("type:", type);
        let newData: any = {};
        if (type === "clear") {
          for (const [key, value] of Object.entries(selected)) {
            newData[key] = null;
          }
          reset(newData);
        } else if (type === "reset") {
          for (const [key, value] of Object.entries(selected)) {
            newData[key] = value;
          }

          reset({
            ...newData,
            saupStampQu: selected?.saupStampQu === "Y",
            saupStampEs: selected?.saupStampEs === "Y",
            saupStampSe: selected?.saupStampSe === "Y",
          });

          setSaupDate(selected.saupDate ? formatDate(selected.saupDate) : "");

          selected.saupStampImg
            ? setImage64(selected.saupStampImg)
            : setImage64(null);
        }
      }
    };
    const crud = async (type: string | null) => {
      if (type === "delete") {
        const formValues = getValues();

        try {
          const response = await API.post(EN1200DELETE, formValues);
          if (response.status === 200) {
            toast.success("삭제했습니다", {
              autoClose: 500,
            });

            await fetchData();
          }
        } catch (err) {
          toast.error("Couldn't delete", {
            autoClose: 500,
          });
        }
      }

      if (type === null) {
        handleSubmit(submit)();
      }
    };

    const submit = async (data: IJNOSAUP) => {
      //form aldaagui uyd ajillana
      const path = isAddBtnClicked ? EN1200INSERT : EN1200UPDATE;
      const formValues = getValues();

      formValues.saupStampQu = formValues.saupStampQu ? "Y" : "N";
      formValues.saupStampEs = formValues.saupStampEs ? "Y" : "N";
      formValues.saupStampSe = formValues.saupStampSe ? "Y" : "N";
      formValues.saupDate = saupDate ? formatDateByRemoveDash(saupDate) : "";

      formValues.saupEdiEmail =
        formValues.saupEdiEmail && formValues.saupEdiEmail.trim();

      formValues.saupStampImg = image64 && image64;

      try {
        const response: any = await API.post(path, formValues);
        if (response.status === 200) {
          if (isAddBtnClicked) {
            setData((prev: any) => [formValues, ...prev]);
            setSelectedRowIndex(0);
          } else {
            setData((prev: any) => {
              prev[selectedRowIndex] = formValues;
              return [...prev];
            });
          }
          setSelected(formValues);
          toast.success("저장이 성공하였습니다", {
            autoClose: 500,
          });
          setIsAddBtnClicked(false);
        } else {
          toast.error(response.response.data?.message, {
            autoClose: 500,
          });
        }
      } catch (err: any) {
        toast.error(err?.message, {
          autoClose: 500,
        });
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
        className="form_control"
        onSubmit={handleSubmit(submit)}
        style={{ padding: "0px 10px" }}
      >
        {/* <p>{isAddBtnClicked ? "true" : "false"}</p> */}
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
                label="코드"
                register={register("saupSno")}
                errors={errors["saupSno"]?.message}
                inputSize={InputSize.sm}
                maxLength="2"
              />
              <Field>
                <FormGroup>
                  <Label>영업소</Label>
                  <Select {...register("areaCode")}>
                    {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
                      <option key={idx} value={obj.code}>
                        {obj.codeName}
                      </option>
                    ))}
                  </Select>
                </FormGroup>
                <div>
                  <ErrorText>{errors["areaCode"]?.message}</ErrorText>
                </div>
              </Field>
            </Wrapper>
            <Divider />
            <Wrapper grid col={2}>
              <Input
                label="사업자번호"
                register={register("saupSsno")}
                errors={errors["saupSsno"]?.message}
                inputSize={InputSize.md}
                formatNumber="telNumber"
              />
              <Input
                label="종사업자번호"
                register={register("saupRCode")}
                errors={errors["saupRCode"]?.message}
                inputSize={InputSize.sm}
              />
            </Wrapper>
            <Wrapper grid col={2}>
              <Input
                label="상호"
                register={register("saupSangho")}
                errors={errors["saupSangho"]?.message}
                inputSize={InputSize.md}
              />
              <Input
                label="대표"
                register={register("saupSajang")}
                errors={errors["saupSajang"]?.message}
                inputSize={InputSize.md}
              />
            </Wrapper>
            <Wrapper style={{ alignItems: "center" }}>
              <Input
                label="주소"
                register={register("saupZipcode")}
                errors={errors["saupZipcode"]?.message}
              />
              <DaumAddress setAddress={setAddress} />
              <Input
                register={register("saupAddr1")}
                errors={errors["saupAddr1"]?.message}
                fullWidth
              />
            </Wrapper>
            <Wrapper>
              <Input
                label=""
                register={register("saupAddr2")}
                errors={errors["saupAddr2"]?.message}
                fullWidth
              />
            </Wrapper>
            <Wrapper>
              <Input
                label="업태"
                register={register("saupUptae")}
                errors={errors["saupUptae"]?.message}
                fullWidth
              />
              <Input
                label="종목"
                register={register("saupJongmok")}
                errors={errors["saupJongmok"]?.message}
                fullWidth
              />
            </Wrapper>
            <Divider />
            <Wrapper style={{ justifyContent: "space-between" }}>
              <div>
                <Wrapper style={{ alignItems: "center" }}>
                  <Input
                    label="도장이미지"
                    register={register("saupStampImg")}
                    errors={errors["saupStampImg"]?.message}
                    value={image?.name}
                    fullWidth
                  />

                  <button
                    style={{
                      width: "100px",
                      height: "30px",
                      background: "#666666",
                      borderRadius: "5px",
                      border: "1px solid #707070",
                      color: "#fff",
                      position: "relative",
                    }}
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
                  }}
                >
                  <Field>
                    <FormGroup style={{ alignItems: "center" }}>
                      <Label></Label>
                      <CheckBox
                        title="세금계산서 도장출력"
                        rtl
                        register={{ ...register("saupStampSe") }}
                      />
                    </FormGroup>
                    <div>
                      <ErrorText>{errors["saupStampSe"]?.message}</ErrorText>
                    </div>
                  </Field>
                  <Field>
                    <CheckBox
                      title="거래명세표 도장출력"
                      rtl
                      register={{ ...register("saupStampEs") }}
                    />
                    <div>
                      <ErrorText>{errors["saupStampEs"]?.message}</ErrorText>
                    </div>
                  </Field>
                  <Field>
                    <CheckBox
                      title="견적서 도장출력"
                      rtl
                      register={{ ...register("saupStampQu") }}
                    />
                    <div>
                      <ErrorText>{errors["saupStampQu"]?.message}</ErrorText>
                    </div>
                  </Field>
                </Wrapper>
                <Wrapper>
                  <Field flex style={{ alignItems: "center" }}>
                    <Label>개업일</Label>
                    <CustomDatePicker
                      value={saupDate}
                      setValue={setSaupDate}
                      name="saupDate"
                    />
                  </Field>
                  <Field style={{ width: "100%" }}>
                    <Input
                      label="주민번호/법인번호"
                      register={register("saupJumin")}
                      errors={errors["saupJumin"]?.message}
                      formatNumber="corpNumber"
                      maxLength="14"
                    />
                  </Field>
                </Wrapper>
              </div>
              <ImageWrapper>{image64 && <img src={image64} />}</ImageWrapper>
            </Wrapper>
            <Wrapper>
              <Input
                label="메모"
                register={register("saupBigo")}
                errors={errors["saupBigo"]?.message}
                fullWidth
              />
            </Wrapper>
            <Divider />
            <Wrapper grid>
              <Input
                label="아이디"
                register={register("saupEdiId")}
                errors={errors["saupEdiId"]?.message}
              />
              <Input
                label="비밀번호"
                register={register("saupEdiPass")}
                errors={errors["saupEdiPass"]?.message}
                type="password"
              />
            </Wrapper>
            <Wrapper grid>
              <Input
                label="담당자명"
                register={register("saupEdiSawon")}
                errors={errors["saupEdiSawon"]?.message}
              />
              <Input
                label="전화번호"
                register={register("saupEdiSmsNo")}
                errors={errors["saupEdiSmsNo"]?.message}
              />
            </Wrapper>
            <Wrapper style={{ alignItems: "center" }}>
              <Input
                label="이메일"
                register={register("saupEdiEmail")}
                errors={errors["saupEdiEmail"]?.message}
              />
              @
              <Select {...register("saupEdiId")}>
                {dataCommonDic?.emailKind?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code1}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </Wrapper>
            <Wrapper style={{ alignItems: "center" }}>
              <Input
                label="공인인증서"
                register={register("saupEdiSawon")}
                errors={errors["saupEdiSawon"]?.message}
                inputSize={InputSize.lg}
              />
              <button
                style={{
                  width: "100px",
                  height: "30px",
                  background: "#666666",
                  borderRadius: "5px",
                  border: "1px solid #707070",
                  color: "#fff",
                  position: "relative",
                }}
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
                fontSize: "12px",
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
                fontSize: "12px",
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
                  right: "34px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "154px",
                    height: "34px",
                    background: "#5284CE",
                    borderRadius: "999px",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "1px solid #fff",
                    gap: "6px",
                  }}
                >
                  <IconHome />
                  <span style={{ fontSize: "14px", color: "#fff" }}>
                    조아빌 회원가입
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "154px",
                    height: "34px",
                    background: "#5284CE",
                    borderRadius: "999px",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "1px solid #fff",
                    gap: "16px",
                  }}
                >
                  <IconReceipt />
                  <span style={{ fontSize: "14px", color: "#fff" }}>
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
