import React, { useImperativeHandle, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import API from "app/axios";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { EN1600INSERT, EN1600UPDATE, EN1600DELETE, EN160011 } from "app/path";
import {
  Input,
  Select,
  Wrapper,
  Divider,
  Field,
  FormGroup,
  Label,
} from "components/form/style";
import CheckBox from "components/checkbox";
import { IJNOSAUP } from "./model";
import DaumAddress from "components/daum";
import { SearchIcon, IconInfo } from "components/allSvgIcon";
import { DateWithoutDash } from "helpers/dateFormat";
import { convertBase64 } from "helpers/convertBase64";
import CustomDatePicker from "components/customDatePicker";
import { ImageWrapper } from "../../commonStyle";
import { currencyMask, formatCurrencyRemoveComma } from "helpers/currency";
import { InputSize } from "components/componentsType";

interface IForm {
  selected: any;
  fetchData: any;
  setData: any;
  selectedRowIndex: number;
  setSelected: any;
  setSelectedRowIndex: any;
  isAddBtnClicked: boolean;
  setIsAddBtnClicked: Function;
  setIsCancelBtnDisabled: Function;
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
      isAddBtnClicked,
      setIsAddBtnClicked,
      setIsCancelBtnDisabled,
    }: IForm,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const [addr, setAddress] = useState<string>("");
    const [image, setImage] = useState<{
      name: string;
    }>();
    const [image64, setImage64] = useState<any>(null);

    const { data: dataCommonDic } = useGetCommonDictionaryQuery({
      groupId: "EN",
      functionName: "EN1600",
    });

    useEffect(() => {
      if (addr.length > 0) {
        reset({
          swZipcode: addr ? addr?.split("/")[1] : "",
          swAddr1: addr ? addr?.split("/")[0] : "",
        });
      }
    }, [addr]);

    const { register, handleSubmit, reset, getValues, control } =
      useForm<IJNOSAUP>({
        mode: "onChange",
      });

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      crud,
      resetForm,
      setImage64,
    }));

    const resetForm = async (type: string) => {
      if (selected !== undefined && JSON.stringify(selected) !== "{}") {
        let newData: any = {};
        if (type === "clear") {
          document.getElementById("swName")?.focus();
          const path = EN160011;

          try {
            const response: any = await API.get(path, {
              params: { areaCode: selected.areaCode },
            });
            if (response.status === 200) {
              for (const [key, value] of Object.entries(selected)) {
                newData[key] = null;
              }
              newData.swCode = response.data.tempCode;
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
            swWorkOut: selected.swWorkOut === "Y",
            cuSeEmail: selected.cuSeEmail ? selected.cuSeEmail.trim() : "",
            mailKind: selected.mailKind ? selected.mailKind.trim() : "",
          });

          selected.swStampFile
            ? setImage64(selected.swStampFile)
            : setImage64(null);
        }
      }
    };
    const crud = async (type: string | null) => {
      if (type === "delete") {
        const formValues = getValues();
        try {
          const response: any = await API.post(EN1600DELETE, formValues);
          if (response.status === 200) {
            toast.success("삭제하였습니다", {
              autoClose: 500,
            });
            await fetchData("delete");
          } else {
            toast.error(response?.response?.message, {
              autoClose: 500,
            });
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
      const path = isAddBtnClicked ? EN1600INSERT : EN1600UPDATE;
      const formValues = getValues();

      formValues.swPaykum = formValues.swPaykum
        ? formatCurrencyRemoveComma(formValues.swPaykum)
        : "";
      formValues.sgKumack = formValues.sgKumack
        ? formatCurrencyRemoveComma(formValues.sgKumack)
        : "";

      formValues.swWorkOut = formValues.swWorkOut ? "Y" : "N";
      formValues.cuSeEmail =
        formValues.cuSeEmail &&
        `${formValues.cuSeEmail.trim()}@${formValues.mailKind}`;

      formValues.swIndate = DateWithoutDash(formValues.swIndate);
      formValues.swJdate1 = DateWithoutDash(formValues.swJdate1);
      formValues.swJdate2 = DateWithoutDash(formValues.swJdate2);
      formValues.swOutDate = DateWithoutDash(formValues.swOutDate);
      formValues.swGubun = formValues.swGubunName?.charAt(0);

      formValues.swStampFile = image64 && image64;

      try {
        const response: any = await API.post(path, formValues);

        if (response.status === 200) {
          if (isAddBtnClicked) {
            setData((prev: any) => [formValues, ...prev]);
            setSelectedRowIndex(0);
            setIsAddBtnClicked(false);
            setIsCancelBtnDisabled(true);
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
        } else {
          toast.error(response?.message, {
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
      const path = EN160011;
      try {
        const response: any = await API.get(path, {
          params: { areaCode: event.target.value },
        });
        if (response.status === 200) {
          for (const [key, value] of Object.entries(selected)) {
            newData[key] = null;
          }
          newData.swCode = response.data.tempCode;
          newData.areaCode = event.target.value;
          reset(newData);
          document.getElementById("swName")?.focus();
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
        style={{ width: "725px", padding: "0px 10px" }}
        autoComplete="off"
      >
        <Wrapper>
          <Input
            label="코 드"
            register={register("swCode")}
            maxLength="2"
            readOnly
            inputSize={InputSize.i200}
          />

          <FormGroup>
            <Label>영 업 소</Label>
            <Select
              //register={register("areaCode")}
              onChange={handleSelectCode}
              width={InputSize.i200}
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
        <Wrapper>
          <Input
            label="사 원 명"
            register={register("swName")}
            inputSize={InputSize.i200}
          />
          <Input
            label="부 서 명"
            register={register("swDepartment")}
            inputSize={InputSize.i200}
          />
        </Wrapper>

        <Wrapper>
          <Field>
            <FormGroup>
              <Label>업무구분</Label>
              <Select register={register("swGubunName")} width={InputSize.i200}>
                {dataCommonDic?.swGubun?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
          </Field>

          <Field>
            <Controller
              control={control}
              {...register("swJuminno")}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="주민번호"
                  value={value}
                  onChange={onChange}
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
                  name={name}
                  inputSize={InputSize.i200}
                />
              )}
            />
          </Field>
        </Wrapper>

        <Wrapper>
          <Input
            label="전화번호"
            register={register("swTel")}
            maxLength="14"
            inputSize={InputSize.i200}
          />

          <Controller
            control={control}
            {...register("swHp")}
            render={({ field: { onChange, value, name } }) => (
              <Input
                label="핸드폰"
                value={value}
                onChange={onChange}
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
                inputSize={InputSize.i200}
              />
            )}
          />
        </Wrapper>

        <Wrapper style={{ alignItems: "center", gap: "4.5px" }}>
          <Input
            label="이메일"
            register={register("cuSeEmail")}
            maxLength="50"
            inputSize={InputSize.i200}
          />
          @
          <Select register={register("mailKind")} style={{ marginLeft: "3px" }}>
            {dataCommonDic?.emailKind?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.codeName}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </Wrapper>

        <Wrapper style={{ alignItems: "center" }}>
          <Input
            label="주 소"
            register={register("swZipcode")}
            maxLength="6"
            inputSize={InputSize.i200}
          />
          <DaumAddress setAddress={setAddress} />
          <Input
            register={register("swAddr1")}
            maxLength="40"
            style={{ width: "294px" }}
          />
        </Wrapper>

        <Wrapper>
          <Input
            label=""
            register={register("swAddr2")}
            maxLength="40"
            style={{ width: "526px" }}
          />
        </Wrapper>

        <Wrapper>
          <Input
            label="매핑코드"
            register={register("eyeSwCode")}
            maxLength="10"
            inputSize={InputSize.i200}
          />
          <p
            style={{
              display: "flex",
              right: "32px",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "12px",
              gap: "6px",
            }}
          >
            <IconInfo />
            <span
              style={{ color: "#1B8C8E", fontSize: "15px", marginTop: "-1px" }}
            >
              탱크잔량 원격검침 시스템의 매핑할 사원코드를 지정
            </span>
          </p>
        </Wrapper>
        <Divider />
        <Wrapper>
          <div style={{ width: "600px" }}>
            <Wrapper grid col={3} style={{ alignItems: "center" }}>
              <Input
                label="서명 화일"
                register={register("swStampFile")}
                value={image?.name}
                inputSize={InputSize.i200}
                maxLength="80"
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
                  fontSize: "15px",
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

            <Wrapper>
              <FormGroup>
                <Label>입 사 일</Label>
                <Controller
                  control={control}
                  {...register("swIndate")}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <CustomDatePicker
                      value={value}
                      onChange={onChange}
                      style={{ width: "200px" }}
                    />
                  )}
                />
              </FormGroup>

              <FormGroup>
                <Label style={{ minWidth: "90px" }}>급여방식</Label>
                <Select register={register("swPaytype")} width={InputSize.i110}>
                  {dataCommonDic?.swPaytype?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>
            </Wrapper>

            <Wrapper grid>
              <FormGroup>
                <Controller
                  control={control}
                  {...register("swPaykum")}
                  render={({ field: { onChange, value, name } }) => (
                    <Input
                      label="급 여 액"
                      value={value}
                      onChange={onChange}
                      mask={currencyMask}
                      name={name}
                      textAlign="right"
                      inputSize={InputSize.i200}
                    />
                  )}
                />

                <p>원</p>
              </FormGroup>
              <FormGroup>
                <Controller
                  control={control}
                  {...register("swPaydate")}
                  render={({ field: { onChange, value, name } }) => (
                    <Input
                      label="급 여 일"
                      value={value}
                      labelStyle={{ minWidth: "76px" }}
                      onChange={onChange}
                      mask={[/\d/, /\d/]}
                      name={name}
                      inputSize={InputSize.i110}
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
            label="면허종류"
            register={register("swDrivertype")}
            maxLength="15"
            inputSize={InputSize.i200}
          />
          <Input
            label="면허번호"
            labelStyle={{ minWidth: "90px" }}
            register={register("swDriverno")}
            maxLength="17"
            inputSize={InputSize.i110}
          />
        </Wrapper>

        <Wrapper style={{ width: "600px" }}>
          <Field flex style={{ alignItems: "center" }}>
            <Label>적성검사</Label>
            <Controller
              control={control}
              {...register("swJdate1")}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <CustomDatePicker value={value} onChange={onChange} />
              )}
            />
          </Field>

          <Field flex style={{ alignItems: "center" }}>
            <Label style={{ minWidth: "auto" }}>~</Label>
            <Controller
              control={control}
              {...register("swJdate2")}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <CustomDatePicker value={value} onChange={onChange} />
              )}
            />
          </Field>
        </Wrapper>

        <Wrapper>
          <Input
            label="메 모"
            register={register("swBigo")}
            maxLength="40"
            style={{ width: "526px" }}
          />
        </Wrapper>
        <Divider />
        <Wrapper>
          <Field style={{ width: "325px" }}>
            <FormGroup style={{ alignItems: "center" }}>
              <Label>퇴사여부</Label>
              <CheckBox register={{ ...register("swWorkOut") }} />
              <p
                style={{
                  marginLeft: "25px",
                  fontSize: "15px",
                }}
              >
                (체크시 퇴사사원)
              </p>
            </FormGroup>
          </Field>
          <Field flex style={{ alignItems: "center" }}>
            <Label>퇴사일</Label>

            <Controller
              control={control}
              {...register("swOutDate")}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <CustomDatePicker value={value} onChange={onChange} />
              )}
            />
          </Field>
        </Wrapper>

        <p
          style={{
            display: "flex",
            right: "32px",
            alignItems: "center",
            marginLeft: "125px",
            marginBottom: "18px",
            gap: "6px",
            marginTop: "6px",
          }}
        >
          <IconInfo />
          <span style={{ color: "#1B8C8E", fontSize: "15px" }}>
            퇴사사원은 판매등록 사원에서 제외 됩니다.
          </span>
        </p>

        <Wrapper>
          <Field flex>
            <Controller
              control={control}
              {...register("sgKumack")}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="가불 금액"
                  value={value}
                  onChange={onChange}
                  mask={currencyMask}
                  name={name}
                  textAlign="right"
                  inputSize={InputSize.i200}
                />
              )}
            />
            <p>원</p>
          </Field>
        </Wrapper>
      </form>
    );
  }
);

export default Form;
