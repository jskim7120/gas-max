import React, { useImperativeHandle, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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
  ErrorText,
  FormGroup,
  Wrapper,
  Divider,
  Label,
} from "components/form/style";
import CheckBox from "components/checkbox";
import { ICAR } from "./model";
import { schema } from "./validation";
import {
  formatDate,
  formatDateByRemoveDash,
  formatCurrencyRemoveComma,
} from "helpers/dateFormat";
import CustomDatePicker from "components/customDatePicker/customdate2";
import { InputSize } from "components/componentsType";
import { InfoText } from "components/text";
import { currencyMask } from "helpers/currency";
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
    }: IForm,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);
    const [caSafeDate, setCaSafeDate] = useState("");
    const [caInDate, setCaInDate] = useState("");
    const [caRentDate, setCaRentDate] = useState("");
    const [caJdate1, setCaJdate1] = useState("");
    const [caJdate2, setCaJdate2] = useState("");
    const [caBsdate, setCaBsdate] = useState("");
    const [caBldate, setCaBldate] = useState("");
    const [empChargeData, setEmpChargeData] = useState([]);

    const { data: dataCommonDic } = useGetCommonDictionaryQuery({
      groupId: "EN",
      functionName: "EN1700",
    });

    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
      control,
      getValues,
    } = useForm<ICAR>({ mode: "onChange", resolver: yupResolver(schema) });

    useEffect(() => {
      if (selected !== undefined && JSON.stringify(selected) !== "{}") {
        resetForm("reset");
        empChargeDataSelect(selected.areaCode);
      }
    }, [selected]);

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      crud,
      resetForm,
      setIsAddBtnClicked,
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
          for (const [key, value] of Object.entries(selected)) {
            newData[key] = value;
          }
          empChargeDataSelect(newData.areaCode);
          reset({
            ...newData,
            caBkYn: selected?.caBkYn === "Y",
            caRentYn: selected?.caRentYn === "Y",
          });
          setCaSafeDate(
            selected.caSafeDate ? formatDate(selected.caSafeDate) : ""
          );
          setCaInDate(selected.caInDate ? formatDate(selected.caInDate) : "");
          setCaRentDate(
            selected.caRentDate ? formatDate(selected.caRentDate) : ""
          );
          setCaJdate1(selected.caJdate1 ? formatDate(selected.caJdate1) : "");
          setCaJdate2(selected.caJdate2 ? formatDate(selected.caJdate2) : "");
          setCaBsdate(selected.caBsdate ? formatDate(selected.caBsdate) : "");
          setCaBldate(selected.caBldate ? formatDate(selected.caBldate) : "");
        }
      }
    };
    const crud = async (type: string | null) => {
      if (type === "delete") {
        const formValues = getValues();

        try {
          const response = await API.post(EN1700DELETE, formValues);
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

    const submit = async (data: ICAR) => {
      //form aldaagui uyd ajillana
      const path = isAddBtnClicked ? EN1700INSERT : EN1700UPDATE;
      const formValues = getValues();

      formValues.caBkYn = formValues.caBkYn ? "Y" : "N";
      formValues.caRentYn = formValues.caRentYn ? "Y" : "N";

      formValues.caSafeDate = caSafeDate
        ? formatDateByRemoveDash(caSafeDate)
        : "";
      formValues.caInDate = caInDate ? formatDateByRemoveDash(caInDate) : "";
      formValues.caRentDate = caRentDate
        ? formatDateByRemoveDash(caRentDate)
        : "";
      formValues.caJdate1 = caJdate1 ? formatDateByRemoveDash(caJdate1) : "";
      formValues.caJdate2 = caJdate2 ? formatDateByRemoveDash(caJdate2) : "";
      formValues.caBsdate = caBsdate ? formatDateByRemoveDash(caBsdate) : "";
      formValues.caBldate = caBsdate ? formatDateByRemoveDash(caBldate) : "";
      // --------------------------
      formValues.caAmt = formValues.caAmt
        ? formatCurrencyRemoveComma(formValues.caAmt)
        : "";
      formValues.caMAmt = formValues.caMAmt
        ? formatCurrencyRemoveComma(formValues.caMAmt)
        : "";
      formValues.caDiscountM = formValues.caDiscountM
        ? formatCurrencyRemoveComma(formValues.caDiscountM)
        : "";
      formValues.caDiscountAmt = formValues.caDiscountAmt
        ? formatCurrencyRemoveComma(formValues.caDiscountAmt)
        : "";
      formValues.caInsuranceAmt = formValues.caInsuranceAmt
        ? formatCurrencyRemoveComma(formValues.caInsuranceAmt)
        : "";

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

    const handleSelectCode = async (event: any) => {
      let newData: any = {};
      const path = EN170011;

      try {
        const response: any = await API.get(path, {
          params: { areaCode: event.target.value },
        });
        if (response.status === 200) {
          console.log("works", response);
          for (const [key, value] of Object.entries(selected)) {
            newData[key] = value;
          }
          newData.caCode = response.data.tempCode;
          newData.areaCode = event.target.value;
          reset(newData);
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
        className="form_control"
        onSubmit={handleSubmit(submit)}
        style={{ padding: "0px 10px" }}
      >
        <Wrapper grid col={2}>
          <Input
            label="코드"
            register={register("caCode")}
            errors={errors["caCode"]?.message}
            inputSize={InputSize.sm}
            maxLength="2"
            readOnly={isAddBtnClicked}
          />
          <Field>
            <FormGroup>
              <Label>영업소</Label>
              <Select {...register("areaCode")} onChange={handleSelectCode}>
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
            label="차량번호"
            register={register("caName")}
            errors={errors["caName"]?.message}
            inputSize={InputSize.i140}
            maxLength="15"
          />
          <Field>
            <FormGroup>
              <Label>담당사원</Label>
              <Select {...register("caSwCode")}>
                {empChargeData?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <div>
              <ErrorText>{errors["caSwCode"]?.message}</ErrorText>
            </div>
          </Field>
        </Wrapper>

        <Wrapper grid col={2}>
          <Field>
            <FormGroup style={{ alignItems: "center" }}>
              <Label>벌크로리차량유무</Label>
              <CheckBox register={{ ...register("caBkYn") }} />
            </FormGroup>
            <div>
              <ErrorText>{errors["caBkYn"]?.message}</ErrorText>
            </div>
          </Field>
          <Field>
            <FormGroup>
              <Label>재고사용유무</Label>
              <Select {...register("caJaegoyn")}>
                {dataCommonDic?.caJaegoyn?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <div>
              <ErrorText>{errors["caJaegoyn"]?.message}</ErrorText>
            </div>
          </Field>
        </Wrapper>
        <Wrapper>
          <Input
            label="매핑코드"
            register={register("eyeCarCode")}
            errors={errors["eyeCarCode"]?.message}
            maxLength="10"
            inputSize={InputSize.i140}
          />
          <InfoText text="탱크잔량 원격검침 시스템의 매핑할 차량코드를 지정." />
        </Wrapper>
        <Wrapper>
          <Field flex style={{ alignItems: "center" }}>
            <Label>안전검사일</Label>
            <CustomDatePicker
              value={caSafeDate}
              setValue={setCaSafeDate}
              name="caSafeDate"
            />
          </Field>
          <Field style={{ width: "100%" }}>
            <Input
              label="충전기한"
              register={register("caChargeDate")}
              errors={errors["caChargeDate"]?.message}
              inputSize={InputSize.sm}
              maxLength="8"
            />
          </Field>
        </Wrapper>
        <Divider />
        <Wrapper grid col={2}>
          <Input
            label="차량종류"
            register={register("caType")}
            errors={errors["caType"]?.message}
            inputSize={InputSize.sm}
            maxLength="20"
          />
          <Input
            label="연식"
            register={register("caYear")}
            errors={errors["caYear"]?.message}
            inputSize={InputSize.sm}
            maxLength="6"
          />
        </Wrapper>

        <Wrapper grid col={2}>
          <Input
            label="차량소유자"
            register={register("caManager")}
            errors={errors["caManager"]?.message}
            inputSize={InputSize.sm}
            maxLength="20"
          />

          <Field flex style={{ alignItems: "center" }}>
            <Label>구입일자</Label>
            <CustomDatePicker
              value={caInDate}
              setValue={setCaInDate}
              name="caInDate"
            />
          </Field>
        </Wrapper>

        <Wrapper grid col={2}>
          <Field>
            <FormGroup style={{ alignItems: "center" }}>
              <Label>리스/렌트 유무</Label>
              <CheckBox register={{ ...register("caRentYn") }} />
            </FormGroup>
            <div>
              <ErrorText>{errors["caRentYn"]?.message}</ErrorText>
            </div>
          </Field>
          <Field flex style={{ alignItems: "center" }}>
            <Label>리스기간</Label>
            <CustomDatePicker
              value={caRentDate}
              setValue={setCaRentDate}
              name="caRentDate"
            />
          </Field>
        </Wrapper>

        <Wrapper style={{ width: "630px" }}>
          <Field flex style={{ alignItems: "center" }}>
            <Label>정기검사일</Label>
            <CustomDatePicker
              value={caJdate1}
              setValue={setCaJdate1}
              name="caJdate1"
            />
          </Field>
          <Field flex style={{ alignItems: "center" }}>
            <Label style={{ minWidth: "auto" }}>~</Label>
            <CustomDatePicker
              value={caJdate2}
              setValue={setCaJdate2}
              name="caJdate2"
            />
          </Field>
        </Wrapper>

        <Wrapper>
          <Input
            label="메모"
            register={register("caBigo")}
            errors={errors["caBigo"]?.message}
            inputSize={InputSize.sm}
            fullWidth
            maxLength="40"
          />
        </Wrapper>
        <Divider />
        <Wrapper grid col={2}>
          <Field flex>
            {/* <Input
              label="차량가액"
              register={register("caAmt")}
              errors={errors["caAmt"]?.message}
              inputSize={InputSize.sm}
              textAlign="right"
              formatNumber="comNumber"
              maxLength="13"
            /> */}
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
                  inputSize={InputSize.i100}
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
              errors={errors["caDiscountM"]?.message}
              inputSize={InputSize.i100}
              maxLength="10"
            />
            <p>월</p>
          </Field>
        </Wrapper>

        <Wrapper grid col={2}>
          <Field flex>
            {/* <Input
              label="월리스료"
              register={register("caMAmt")}
              errors={errors["caAmt"]?.message}
              inputSize={InputSize.sm}
              textAlign="right"
              formatNumber="comNumber"
              maxLength="13"
            /> */}
            <Controller
              control={control}
              {...register("caMAmt")}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="월리스료"
                  value={value}
                  onChange={onChange}
                  mask={currencyMask}
                  textAlign="right"
                  inputSize={InputSize.i100}
                  name={name}
                />
              )}
            />
            <p>원</p>
          </Field>
          <Field flex>
            {/* <Input
              label="월 감가상각비"
              register={register("caDiscountAmt")}
              errors={errors["caDiscountAmt"]?.message}
              inputSize={InputSize.sm}
              textAlign="right"
              formatNumber="comNumber"
              maxLength="13"
            /> */}
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
                  inputSize={InputSize.i100}
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
            label="보험회사"
            register={register("caBco")}
            errors={errors["caBco"]?.message}
            inputSize={InputSize.sm}
            maxLength="20"
          />
        </Wrapper>

        <Wrapper grid col={2}>
          <Input
            label="계약지점"
            register={register("caBjijum")}
            errors={errors["caBjijum"]?.message}
            inputSize={InputSize.sm}
            maxLength="20"
          />
          <Input
            label="담당자"
            register={register("caBdamdang")}
            errors={errors["caBdamdang"]?.message}
            inputSize={InputSize.sm}
            maxLength="10"
          />
        </Wrapper>

        <Wrapper grid col={2}>
          <Input
            label="전화번호"
            register={register("caBtel")}
            errors={errors["caBtel"]?.message}
            inputSize={InputSize.sm}
            maxLength="14"
          />
          {/* <Input
            label="핸드폰"
            register={register("caBhp")}
            errors={errors["caBhp"]?.message}
            inputSize={InputSize.sm}
            maxLength="14"
          /> */}
          <Controller
            control={control}
            {...register("caBhp")}
            render={({ field: { onChange, value, name } }) => (
              <Input
                label="핸드폰"
                value={value}
                onChange={onChange}
                inputSize={InputSize.i100}
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
            label="피보험자"
            register={register("caBman")}
            errors={errors["caBman"]?.message}
            inputSize={InputSize.sm}
            maxLength="10"
          />
          <Input
            label="증권번호"
            register={register("caBno")}
            errors={errors["caBno"]?.message}
            inputSize={InputSize.i150}
            maxLength="20"
          />
        </Wrapper>

        <Wrapper>
          <Field>
            <FormGroup>
              <Label>연령특약</Label>
              {radioOptions.map((option, index) => (
                <Item key={index}>
                  <RadioButton
                    type="radio"
                    value={option.id}
                    {...register(`caBage`, {
                      required: "required",
                    })}
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
            <Label>보험기간</Label>
            <CustomDatePicker
              value={caBsdate}
              setValue={setCaBsdate}
              name="caBsdate"
            />
          </Field>
          <Field flex style={{ alignItems: "center" }}>
            <Label style={{ minWidth: "auto" }}>~</Label>
            <CustomDatePicker
              value={caBldate}
              setValue={setCaBldate}
              name="caBldate"
            />
          </Field>
        </Wrapper>

        <Wrapper>
          <Field flex>
            {/* <Input
              label="보험료"
              register={register("caInsuranceAmt")}
              errors={errors["caInsuranceAmt"]?.message}
              inputSize={InputSize.sm}
              textAlign="right"
              formatNumber="comNumber"
              maxLength="13"
            /> */}
            <Controller
              control={control}
              {...register("caInsuranceAmt")}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="보험료"
                  value={value}
                  onChange={onChange}
                  mask={currencyMask}
                  textAlign="right"
                  inputSize={InputSize.i100}
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
