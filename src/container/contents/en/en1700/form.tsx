import React, { useImperativeHandle, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import API from "app/axios";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import {
  EN1700INSERT,
  EN1700UPDATE,
  EN1700DELETE,
  EN170011,
  EN170065,
} from "app/path";
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
import { ICAR } from "./model";
import {
  DateWithoutDash,
  DateWithoutDashOnlyYearMonth,
} from "helpers/dateFormat";
import CustomDatePicker from "components/customDatePicker";
import { InputSize } from "components/componentsType";
import { InfoText } from "components/text";
import { currencyMask, formatCurrencyRemoveComma } from "helpers/currency";
import {
  Item,
  RadioButton,
  RadioButtonLabel,
} from "components/radioButton/style";

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

const radioOptions = [
  {
    label: "전체",
    id: "0",
  },
  {
    label: "21세",
    id: "1",
  },
  {
    label: "26세",
    id: "2",
  },
  {
    label: "30세",
    id: "3",
  },
  {
    label: "35세",
    id: "4",
  },
];

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
    const [empChargeData, setEmpChargeData] = useState([]);

    const { data: dataCommonDic } = useGetCommonDictionaryQuery({
      groupId: "EN",
      functionName: "EN1700",
    });

    const { register, handleSubmit, reset, control, getValues } = useForm<ICAR>(
      { mode: "onChange" }
    );

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      crud,
      resetForm,
    }));

    const resetForm = async (type: string) => {
      if (selected !== undefined && JSON.stringify(selected) !== "{}") {
        let newData: any = {};
        if (type === "clear") {
          document.getElementById("caName")?.focus();
          const path = EN170011;

          try {
            const response: any = await API.get(path, {
              params: { areaCode: selected.areaCode },
            });
            if (response.status === 200) {
              for (const [key, value] of Object.entries(selected)) {
                newData[key] = null;
              }
              newData.caCode = response.data.tempCode;
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
          empChargeDataSelect(selected.areaCode);

          reset({
            ...selected,
            caBkYn: selected?.caBkYn === "Y",
            caRentYn: selected?.caRentYn === "Y",
          });
        }
      }
    };

    const crud = async (type: string | null) => {
      if (type === "delete") {
        const formValues = getValues();

        try {
          const response: any = await API.post(EN1700DELETE, formValues);
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

    const submit = async (data: ICAR) => {
      //form aldaagui uyd ajillana
      const path = isAddBtnClicked ? EN1700INSERT : EN1700UPDATE;
      const formValues = getValues();

      formValues.caBkYn = formValues.caBkYn ? "Y" : "N";
      formValues.caRentYn = formValues.caRentYn ? "Y" : "N";

      formValues.caSafeDate = DateWithoutDash(formValues.caSafeDate);
      formValues.caInDate = DateWithoutDash(formValues.caInDate);
      formValues.caRentDate = DateWithoutDash(formValues.caRentDate);
      formValues.caJdate1 = DateWithoutDash(formValues.caJdate1);
      formValues.caJdate2 = DateWithoutDash(formValues.caJdate2);
      formValues.caBsdate = DateWithoutDash(formValues.caBsdate);
      formValues.caBldate = DateWithoutDash(formValues.caBldate);
      formValues.caYear = DateWithoutDashOnlyYearMonth(formValues.caYear);

      formValues.caAmt = formValues.caAmt
        ? formatCurrencyRemoveComma(formValues.caAmt)
        : "";
      formValues.caMAmt = formValues.caMAmt
        ? formatCurrencyRemoveComma(formValues.caMAmt)
        : "";

      formValues.caDiscountAmt = formValues.caDiscountAmt
        ? formatCurrencyRemoveComma(formValues.caDiscountAmt)
        : "";
      formValues.caInsuranceAmt = formValues.caInsuranceAmt
        ? formatCurrencyRemoveComma(formValues.caInsuranceAmt)
        : 0;

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

    const handleSelectCode = async (event: any) => {
      let newData: any = {};
      const path = EN170011;

      try {
        const response: any = await API.get(path, {
          params: { areaCode: event.target.value },
        });
        if (response.status === 200) {
          for (const [key, value] of Object.entries(selected)) {
            newData[key] = null;
          }
          newData.caCode = response.data.tempCode;
          newData.areaCode = event.target.value;
          reset(newData);
          document.getElementById("caName")?.focus();
        } else {
          toast.error(response.response.data?.message, {
            autoClose: 500,
          });
        }
        empChargeDataSelect(event);
      } catch (err: any) {
        console.log("areaCode select error", err);
      }
    };

    const empChargeDataSelect = async (event: any) => {
      const path2 = EN170065;
      try {
        if (typeof event === "string") {
          const responseEmpCharge: any = await API.get(path2, {
            params: { areaCode: event },
          });
          if (responseEmpCharge.status === 200) {
            setEmpChargeData(responseEmpCharge.data);
          }
        } else {
          const responseEmpCharge: any = await API.get(path2, {
            params: { areaCode: event.target.value },
          });
          if (responseEmpCharge.status === 200) {
            setEmpChargeData(responseEmpCharge.data);
          }
        }
      } catch (err: any) {
        console.log("areaCode select error", err);
      }
    };

    return (
      <form
        onSubmit={handleSubmit(submit)}
        style={{ width: "650px", padding: "0px 10px" }}
      >
        <Wrapper grid col={2}>
          <Input
            label="코 드"
            register={register("caCode")}
            inputSize={InputSize.i150}
            maxLength="2"
            readOnly
          />

          <FormGroup>
            <Label>영 업 소</Label>
            <Select
              register={register("areaCode")}
              onChange={handleSelectCode}
              width={InputSize.i150}
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
          <Input
            label="차량 번호"
            register={register("caName")}
            inputSize={InputSize.i150}
            maxLength="15"
          />

          <FormGroup>
            <Label>담당 사원</Label>
            <Select register={register("caSwCode")} width={InputSize.i150}>
              {empChargeData?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
        </Wrapper>
        <Wrapper grid col={2}>
          <FormGroup style={{ alignItems: "center" }}>
            <Label>벌크로리 차량 유무</Label>
            <CheckBox register={{ ...register("caBkYn") }} />
          </FormGroup>

          <FormGroup>
            <Label>재고사용 유무</Label>
            <Select register={register("caJaegoyn")} width={InputSize.i150}>
              {dataCommonDic?.caJaegoyn?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
        </Wrapper>
        <Wrapper>
          <Input
            label="매핑코드"
            register={register("eyeCarCode")}
            maxLength="10"
            inputSize={InputSize.i150}
          />
          <InfoText text="탱크잔량 원격검침 시스템의 매핑할 차량코드를 지정." />
        </Wrapper>
        <Wrapper grid col={2}>
          <Field flex style={{ alignItems: "center" }}>
            <Label>안전 검사일</Label>

            <Controller
              control={control}
              {...register("caSafeDate")}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <CustomDatePicker
                  value={value}
                  onChange={onChange}
                  style={{ width: "150px" }}
                />
              )}
            />
          </Field>
          <Field>
            <Input
              label="충전 기한"
              register={register("caChargeDate")}
              inputSize={InputSize.i150}
              maxLength="8"
            />
          </Field>
        </Wrapper>
        <Divider />
        <Wrapper grid col={2}>
          <Input
            label="차량 종류"
            register={register("caType")}
            inputSize={InputSize.i150}
            maxLength="20"
          />
          <FormGroup>
            <Label>연 식</Label>
            <Controller
              control={control}
              {...register("caYear")}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <CustomDatePicker
                  value={value}
                  onChange={onChange}
                  style={{ width: "150px" }}
                  showMonthYearPicker
                />
              )}
            />
          </FormGroup>
        </Wrapper>
        <Wrapper grid col={2}>
          <Input
            label="차량소유자"
            register={register("caManager")}
            inputSize={InputSize.i150}
            maxLength="20"
          />

          <Field flex style={{ alignItems: "center" }}>
            <Label>구입일자</Label>
            <Controller
              control={control}
              {...register("caInDate")}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <CustomDatePicker
                  value={value}
                  onChange={onChange}
                  style={{ width: "150px" }}
                />
              )}
            />
          </Field>
        </Wrapper>
        <Wrapper grid col={2}>
          <FormGroup style={{ alignItems: "center" }}>
            <Label>리스/렌트 유무</Label>
            <CheckBox register={{ ...register("caRentYn") }} />
          </FormGroup>

          <Field flex style={{ alignItems: "center" }}>
            <Label>리스기간</Label>
            <Controller
              control={control}
              {...register("caRentDate")}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <CustomDatePicker
                  value={value}
                  onChange={onChange}
                  style={{ width: "150px" }}
                />
              )}
            />
          </Field>
        </Wrapper>
        <Wrapper style={{ width: "630px" }}>
          <Field flex style={{ alignItems: "center" }}>
            <Label>정기 검사일</Label>

            <Controller
              control={control}
              {...register("caJdate1")}
              render={({ field: { onChange, onBlur, value, name } }) => (
                <CustomDatePicker
                  value={value}
                  onChange={onChange}
                  style={{ width: "150px" }}
                  name={name}
                />
              )}
            />
          </Field>
          <Field flex style={{ alignItems: "center" }}>
            <Label style={{ minWidth: "auto" }}>~</Label>

            <Controller
              control={control}
              {...register("caJdate2")}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <CustomDatePicker
                  value={value}
                  onChange={onChange}
                  style={{ width: "145px" }}
                />
              )}
            />
          </Field>
        </Wrapper>
        <Wrapper>
          <Input
            label="메 모"
            register={register("caBigo")}
            style={{ width: "465px" }}
            maxLength="40"
          />
        </Wrapper>
        <Divider />
        <Wrapper grid col={2}>
          <Field flex>
            <Controller
              control={control}
              {...register("caAmt")}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="차량가액"
                  value={value}
                  onChange={onChange}
                  mask={currencyMask}
                  textAlign="right"
                  inputSize={InputSize.i150}
                  name={name}
                />
              )}
            />
            <p>원 </p>
          </Field>

          <Field flex>
            <Input
              label="감가 기간"
              register={register("caDiscountM")}
              inputSize={InputSize.i150}
              maxLength="10"
            />

            <p>월</p>
          </Field>
        </Wrapper>
        <Wrapper grid col={2}>
          <Field flex>
            <Controller
              control={control}
              {...register("caMAmt")}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="월 리스료"
                  value={value}
                  onChange={onChange}
                  mask={currencyMask}
                  textAlign="right"
                  inputSize={InputSize.i150}
                  name={name}
                />
              )}
            />
            <p>원</p>
          </Field>
          <Field flex>
            <Controller
              control={control}
              {...register("caDiscountAmt")}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="월 감가상각비"
                  value={value}
                  onChange={onChange}
                  mask={currencyMask}
                  textAlign="right"
                  inputSize={InputSize.i150}
                  name={name}
                />
              )}
            />
            <p>원</p>
          </Field>
        </Wrapper>
        <Divider />
        <Wrapper>
          <Input
            label="보험 회사"
            register={register("caBco")}
            inputSize={InputSize.i150}
            maxLength="20"
          />
        </Wrapper>
        <Wrapper grid col={2}>
          <Input
            label="계약 지점"
            register={register("caBjijum")}
            inputSize={InputSize.i150}
            maxLength="20"
          />
          <Input
            label="담 당 자"
            register={register("caBdamdang")}
            inputSize={InputSize.i150}
            maxLength="10"
          />
        </Wrapper>
        <Wrapper grid col={2}>
          <Input
            label="전화 번호"
            register={register("caBtel")}
            inputSize={InputSize.i150}
            maxLength="14"
          />

          <Controller
            control={control}
            {...register("caBhp")}
            render={({ field: { onChange, value, name } }) => (
              <Input
                label="핸 드 폰"
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
        <Wrapper grid col={2}>
          <Input
            label="피 보험자"
            register={register("caBman")}
            inputSize={InputSize.i150}
            maxLength="10"
          />
          <Input
            label="증권 번호"
            register={register("caBno")}
            inputSize={InputSize.i150}
            maxLength="20"
          />
        </Wrapper>
        <Wrapper>
          <Field>
            <FormGroup>
              <Label>연령 특약</Label>
              {radioOptions.map((option, index) => (
                <Item key={index}>
                  <RadioButton
                    type="radio"
                    value={option.id}
                    {...register(
                      `caBage`
                      // , {
                      //   required: "required",
                      // }
                    )}
                    id={option.id}
                    // onChange={() => console.log(option.label)}
                  />
                  <RadioButtonLabel htmlFor={`${option.label}`}>
                    {option.label}
                  </RadioButtonLabel>
                </Item>
              ))}
            </FormGroup>
          </Field>
        </Wrapper>
        <Wrapper style={{ width: "630px" }}>
          <Field flex style={{ alignItems: "center" }}>
            <Label>보험 기간</Label>
            <Controller
              control={control}
              {...register("caBsdate")}
              render={({ field: { onChange, onBlur, value, name } }) => (
                <CustomDatePicker
                  value={value}
                  onChange={onChange}
                  style={{ width: "150px" }}
                  name={name}
                />
              )}
            />
          </Field>
          <Field flex style={{ alignItems: "center" }}>
            <Label style={{ minWidth: "auto" }}>~</Label>
            <Controller
              control={control}
              {...register("caBldate")}
              render={({ field: { onChange, onBlur, value, name } }) => (
                <CustomDatePicker
                  value={value}
                  onChange={onChange}
                  style={{ width: "150px" }}
                  name={name}
                />
              )}
            />
          </Field>
        </Wrapper>
        <Wrapper>
          <Field flex>
            <Controller
              control={control}
              {...register("caInsuranceAmt")}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="보 험 료"
                  value={value}
                  onChange={onChange}
                  mask={currencyMask}
                  textAlign="right"
                  inputSize={InputSize.i150}
                  name={name}
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
