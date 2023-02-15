import React, { useImperativeHandle, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import {
  Input,
  Select,
  Field,
  FormGroup,
  Wrapper,
  Divider,
  Label,
} from "components/form/style";
import CheckBox from "components/checkbox";
import { IJNOSAUP } from "./model";
import DaumAddress from "components/daum";
import { SearchIcon, IconHome, IconReceipt } from "components/allSvgIcon";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { formatDate, formatDateToStringWithoutDash } from "helpers/dateFormat";
import CustomDatePicker from "components/customDatePicker";
import { InputSize } from "components/componentsType";
import { convertBase64 } from "helpers/convertBase64";
import API from "app/axios";
import IconInfo from "assets/image/Icon-info.png";
import { ImageWrapper } from "../../commonStyle";
import { EN1200INSERT, EN1200UPDATE, EN1200DELETE, EN120011 } from "app/path";

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

    const { data: dataCommonDic } = useGetCommonDictionaryQuery({
      groupId: "EN",
      functionName: "EN1200",
    });

    const { register, handleSubmit, control, reset, getValues } =
      useForm<IJNOSAUP>({ mode: "onChange" });

    useEffect(() => {
      if (selected !== undefined && JSON.stringify(selected) !== "{}") {
        resetForm("reset");
      }
      setIsAddBtnClicked(false);
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

    const resetForm = async (type: string) => {
      if (selected !== undefined && JSON.stringify(selected) !== "{}") {
        let newData: any = {};
        if (type === "clear") {
          document.getElementById("saupSsno")?.focus();
          const path = EN120011;
          try {
            const response: any = await API.get(path, {
              params: { areaCode: selected.areaCode },
            });
            if (response.status === 200) {
              for (const [key, value] of Object.entries(selected)) {
                newData[key] = null;
              }
              newData.saupSno = response.data.tempCode;
              newData.areaCode = selected.areaCode;
              reset(newData);
            } else {
              toast.error(response.response.data?.message, {
                autoClose: 500,
              });
            }
          } catch (err: any) {
            console.log("areaCode select error", err);
          }
        } else if (type === "reset") {
          for (const [key, value] of Object.entries(selected)) {
            newData[key] = value;
          }

          reset({
            ...newData,
            saupStampQu: selected?.saupStampQu === "Y",
            saupStampEs: selected?.saupStampEs === "Y",
            saupStampSe: selected?.saupStampSe === "Y",
            saupDate: selected?.saupDate ? formatDate(selected.saupDate) : "",
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

        try {
          const response = await API.post(EN1200DELETE, formValues);
          if (response.status === 200) {
            toast.success("삭제하였습니다", {
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
      formValues.saupDate = formValues.saupDate
        ? formatDateToStringWithoutDash(formValues.saupDate)
        : "";
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

    const handleSelectCode = async (event: any) => {
      let newData: any = {};
      const path = EN120011;
      try {
        const response: any = await API.get(path, {
          params: { areaCode: event.target.value },
        });
        if (response.status === 200) {
          for (const [key, value] of Object.entries(selected)) {
            newData[key] = value;
          }
          newData.saupSno = response.data.tempCode;
          newData.areaCode = event.target.value;
          reset(newData);
        } else {
          toast.error(response.response.data?.message, {
            autoClose: 500,
          });
        }
      } catch (err: any) {
        console.log("areaCode select error", err);
      }
    };

    return (
      <form
        onSubmit={handleSubmit(submit)}
        style={{ width: "800px", padding: "0px 10px" }}
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
                label="코드"
                register={register("saupSno")}
                inputSize={InputSize.i150}
                readOnly={isAddBtnClicked}
              />

              <FormGroup>
                <Label>영업소</Label>
                <Select
                  {...register("areaCode")}
                  onChange={handleSelectCode}
                  width={InputSize.i175}
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
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    label="사업자번호"
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
                label="상호"
                register={register("saupSangho")}
                inputSize={InputSize.i150}
                maxLength="50"
              />
              <Input
                label="대표"
                register={register("saupSajang")}
                inputSize={InputSize.i175}
                maxLength="20"
              />
            </Wrapper>
            <Wrapper style={{ alignItems: "center" }}>
              <Input
                label="주소"
                register={register("saupZipcode")}
                maxLength="6"
                inputSize={InputSize.i150}
              />
              <DaumAddress setAddress={setAddress} />
              <Input
                register={register("saupAddr1")}
                maxLength="40"
                style={{ width: "383px" }}
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
                label="업태"
                register={register("saupUptae")}
                inputSize={InputSize.i250}
                maxLength="50"
              />
              <Input
                label="종목"
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
                    label="도장이미지"
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
                  <FormGroup style={{ alignItems: "center" }}>
                    <Label></Label>
                    <CheckBox
                      title="세금계산서 도장출력"
                      rtl
                      register={{ ...register("saupStampSe") }}
                    />
                  </FormGroup>

                  <Field>
                    <CheckBox
                      title="거래명세표 도장출력"
                      rtl
                      register={{ ...register("saupStampEs") }}
                    />
                  </Field>
                  <Field>
                    <CheckBox
                      title="견적서 도장출력"
                      rtl
                      register={{ ...register("saupStampQu") }}
                    />
                  </Field>
                </Wrapper>
                <Wrapper style={{ alignItems: "center" }}>
                  <Field flex style={{ alignItems: "center" }}>
                    <Label>개업일</Label>
                    <Controller
                      control={control}
                      {...register("saupDate")}
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <CustomDatePicker value={value} onChange={onChange} />
                      )}
                    />
                  </Field>
                  <Field>
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
                  </Field>
                </Wrapper>
              </div>
              <ImageWrapper>{image64 && <img src={image64} />}</ImageWrapper>
            </Wrapper>
            <Wrapper>
              <Input
                label="메모"
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
                    mask={[
                      /\d/,
                      /\d/,
                      /\d/,
                      "-",
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                      "-",
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                    ]}
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
