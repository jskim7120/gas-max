import React, { useImperativeHandle, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "app/store";
import {
  Input,
  Select,
  Field,
  ErrorText,
  FormGroup,
  Wrapper,
  Divider,
  DividerGray,
  Label,
} from "components/form/style";
import CheckBox from "components/checkbox";
import { IJNOSAUP } from "./model";
import DaumAddress from "components/daum";
import { schema } from "./validation";
import { SearchIcon } from "components/allSvgIcon";
import { formatDateToString } from "helpers/dateFormat";
import CustomDate from "components/customDatePicker";
import { InputSize } from "components/componentsType";

import { useGetCommonGubunQuery } from "app/api/commonGubun";
import { useGetAreaCodeQuery } from "app/api/areaCode";
import API from "app/axios";
import IconInfo from "assets/image/Icon-info.png";

interface IForm {
  selected: any;
  fetchData: any;
}
const base = "/app/EN1200/";

const Form = React.forwardRef(
  (
    { selected, fetchData }: IForm,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const dispatch = useDispatch();

    const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);
    const [addr, setAddress] = useState<string>("");
    const [image, setImage] = useState<{
      file: any;
      name: string;
    }>();

    const { data: areaCode } = useGetAreaCodeQuery();
    const { data: emailType } = useGetCommonGubunQuery("5");

    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
      getValues,
    } = useForm<IJNOSAUP>({ resolver: yupResolver(schema) });

    useEffect(() => {
      if (JSON.stringify(selected) !== "{}") {
        reset({
          ...selected,
          saupEdiEmail: selected.saupEdiEmail
            ? selected.saupEdiEmail.split("@")[0]
            : "",
          emailType: selected.saupEdiEmail
            ? selected.saupEdiEmail.split("@")[1]
            : "",
        });
      }
      console.log("selected=======", selected);
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
      if (JSON.stringify(selected) !== "{}") {
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
        }
      }
    };
    const crud = async (type: string | null) => {
      if (type === "delete") {
        const path = `${base}delete`;
        const formValues = getValues();

        try {
          const response = await API.post(path, formValues);
          if (response.status === 200) {
            toast.success("Deleted");
            await fetchData();
          }
        } catch (err) {
          toast.error("Couldn't delete");
        }
      }

      if (type === null) {
        handleSubmit(submit)();
      }
    };

    const submit = async (data: IJNOSAUP) => {
      //form aldaagui uyd ajillana
      const path = isAddBtnClicked ? `${base}insert` : `${base}update`;
      const formValues = getValues();

      formValues.saupStampQu = formValues.saupStampQu ? "Y" : "N";
      formValues.saupStampEs = formValues.saupStampEs ? "Y" : "N";
      formValues.saupStampSe = formValues.saupStampSe ? "Y" : "N";
      formValues.saupEdiEmail =
        formValues.saupEdiEmail &&
        `${formValues.saupEdiEmail}@${formValues.emailType}`;

      try {
        const response: any = await API.post(path, formValues);
        if (response.status === 200) {
          toast.success("Action successful");
          setIsAddBtnClicked(false);
          await fetchData();
        } else {
          toast.error(response.response.data?.message);
        }
      } catch (err: any) {
        toast.error(err?.message);
      }
    };

    if (!selected) return <p>..loading</p>;
    return (
      <form onSubmit={handleSubmit(submit)} style={{ padding: "0px 10px" }}>
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
                label="일련번호"
                register={register("saupSno")}
                errors={errors["saupSno"]?.message}
                inputSize={InputSize.sm}
              />
              <Field>
                <FormGroup>
                  <Label>영업소</Label>
                  <Select {...register("areaCode")}>
                    {areaCode?.map((obj, idx) => (
                      <option key={idx} value={obj.areaCode}>
                        {obj.areaName}
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
              />
              <Input
                label="종사업자번호"
                register={register("saupRCode")}
                errors={errors["saupRCode"]?.message}
                inputSize={InputSize.sm}
              />
            </Wrapper>
            <DividerGray />
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
            <DividerGray />
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
            <DividerGray />
            <Wrapper>
              <Input
                label=""
                register={register("saupAddr2")}
                errors={errors["saupAddr2"]?.message}
                fullWidth
              />
            </Wrapper>
            <DividerGray />
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
                    label="서명화일"
                    register={register("saupStamp")}
                    errors={errors["saupStamp"]?.message}
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
                      onChange={(event) => {
                        console.log("changed", event?.target?.files);
                        setImage({
                          name: event?.target?.files
                            ? event?.target?.files[0].name
                            : "",

                          file: event?.target?.files
                            ? URL.createObjectURL(event?.target?.files[0])
                            : "",
                        });
                      }}
                    />
                  </button>
                </Wrapper>
                <DividerGray />
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
                <DividerGray />
                <Wrapper>
                  <CustomDate
                    label="개업일"
                    name="saupDate"
                    register={register("saupDate")}
                    reset={reset}
                    errors={errors["saupDate"]?.message}
                  />
                  <Field style={{ width: "100%" }}>
                    <Input
                      label="주민번호/법인번호"
                      register={register("saupJumin")}
                      errors={errors["saupJumin"]?.message}
                    />
                  </Field>
                </Wrapper>
              </div>
              <div
                style={{
                  width: "100px",
                  height: "100px",
                }}
              >
                {image?.file && (
                  <img
                    src={image?.file}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                )}
              </div>
            </Wrapper>
            <DividerGray />
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
            <DividerGray />
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
            <DividerGray />
            <Wrapper style={{ alignItems: "center" }}>
              <Input
                label="이메일"
                register={register("saupEdiEmail")}
                errors={errors["saupEdiEmail"]?.message}
              />
              @
              <Select {...register("emailType")}>
                {emailType?.map((obj, idx) => (
                  <option key={idx} value={obj.codeName}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </Wrapper>

            <DividerGray />
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
                  onChange={(event) => {
                    console.log("changed", event?.target?.files);
                    setImage({
                      name: event?.target?.files
                        ? event?.target?.files[0].name
                        : "",

                      file: event?.target?.files
                        ? URL.createObjectURL(event?.target?.files[0])
                        : "",
                    });
                  }}
                />
              </button>
            </Wrapper>
            <DividerGray />
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
            </div>
          </div>
        </div>
        <ToastContainer />
      </form>
    );
  }
);

export default Form;
