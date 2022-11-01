import React, { useImperativeHandle, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
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
import { ICAR } from "./model";
import { schema } from "./validation";
import { formatDate, formatDateByRemoveDash } from "helpers/dateFormat";
import CustomDate from "components/customDatePicker";
import { InputSize } from "components/componentsType";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import API from "app/axios";
import { InfoText } from "components/text";

import {
  Item,
  RadioButton,
  RadioButtonLabel,
} from "components/radioButton/style";

interface IForm {
  selected: any;
  fetchData: any;
}
const base = "/app/EN1700/";

const radioOptions = [
  {
    label: "전체",
    id: "first",
  },
  {
    label: "21세",
    id: "second",
  },
  {
    label: "26세",
    id: "third",
  },
  {
    label: "30세",
    id: "fourth",
  },
  {
    label: "35세",
    id: "fifth",
  },
];

const Form = React.forwardRef(
  (
    { selected, fetchData }: IForm,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const dispatch = useDispatch();
    const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);

    const { data: dataCommonDic } = useGetCommonDictionaryQuery({
      groupId: "EN",
      functionName: "EN1700",
    });

    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
      getValues,
    } = useForm<ICAR>({ mode: "onChange", resolver: yupResolver(schema) });

    useEffect(() => {
      if (selected !== undefined && JSON.stringify(selected) !== "{}") {
        resetForm("reset");
      }
    }, [selected]);

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
            caBkYn: selected?.caBkYn === "Y",
            caRentYn: selected?.caRentYn === "Y",
            caSafeDate: selected?.caSafeDate
              ? formatDate(selected.caSafeDate)
              : "",
            caInDate: selected.caInDate ? formatDate(selected.caInDate) : "",
            caRentDate: selected.caRentDate
              ? formatDate(selected.caRentDate)
              : "",
            caJdate1: selected.caJdate1 ? formatDate(selected.caJdate1) : "",
            caJdate2: selected.caJdate2 ? formatDate(selected.caJdate2) : "",
            caBsdate: selected.caBsdate ? formatDate(selected.caBsdate) : "",
            caBldate: selected.caBldate ? formatDate(selected.caBldate) : "",
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

    const submit = async (data: ICAR) => {
      //form aldaagui uyd ajillana
      const path = isAddBtnClicked ? `${base}insert` : `${base}update`;
      const formValues = getValues();

      formValues.caBkYn = formValues.caBkYn ? "Y" : "N";
      formValues.caRentYn = formValues.caRentYn ? "Y" : "N";

      formValues.caSafeDate = formValues.caSafeDate
        ? formatDateByRemoveDash(formValues.caSafeDate)
        : "";
      formValues.caInDate = formValues.caInDate
        ? formatDateByRemoveDash(formValues.caInDate)
        : "";
      formValues.caRentDate = formValues.caRentDate
        ? formatDateByRemoveDash(formValues.caRentDate)
        : "";
      formValues.caJdate1 = formValues.caJdate1
        ? formatDateByRemoveDash(formValues.caJdate1)
        : "";
      formValues.caJdate2 = formValues.caJdate2
        ? formatDateByRemoveDash(formValues.caJdate2)
        : "";
      formValues.caBsdate = formValues.caBsdate
        ? formatDateByRemoveDash(formValues.caBsdate)
        : "";
      formValues.caBldate = formValues.caBldate
        ? formatDateByRemoveDash(formValues.caBldate)
        : "";

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

    return (
      <form onSubmit={handleSubmit(submit)} style={{ padding: "0px 10px" }}>
        <Wrapper grid col={2}>
          <Input
            label="코드"
            register={register("caCode")}
            errors={errors["caCode"]?.message}
            inputSize={InputSize.sm}
          />
          <Field>
            <FormGroup>
              <Label>영업소</Label>
              <Select {...register("areaCode")}>
                {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code1}>
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
            inputSize={InputSize.md}
          />
          <Field>
            <FormGroup>
              <Label>담당사원</Label>
              <Select {...register("caSwCode")}>
                {dataCommonDic?.caSwCode?.map((obj: any, idx: number) => (
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
        <DividerGray />
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
          <Field>
            <FormGroup>
              <Label>매핑코드</Label>
              <Select {...register("eyeCarCode")}>
                {/* {eyeCarCode?.map((obj, idx) => (
                  <option key={idx} value={obj.code1}>
                    {obj.codeName}
                  </option>
                ))} */}
              </Select>
            </FormGroup>
            <div>
              <ErrorText>{errors["eyeCarCode"]?.message}</ErrorText>
            </div>
          </Field>
          <InfoText text="탱크잔량 원격검침 시스템의 매핑할 차량코드를 지정." />
        </Wrapper>
        <Wrapper>
          <CustomDate
            label="안전검사일"
            name="caSafeDate"
            register={register("caSafeDate")}
            reset={reset}
            errors={errors["caSafeDate"]?.message}
          />
          <Field style={{ width: "100%" }}>
            <Input
              label="충전기한"
              register={register("caChargeDate")}
              errors={errors["caChargeDate"]?.message}
              inputSize={InputSize.sm}
            />
          </Field>
        </Wrapper>
        <Divider />
        <Wrapper grid col={2}>
          <Field>
            <FormGroup>
              <Label>차량종류</Label>
              <Select {...register("caType")}>
                {/* {caType?.map((obj, idx) => (
                  <option key={idx} value={obj.code1}>
                    {obj.codeName}
                  </option>
                ))} */}
              </Select>
            </FormGroup>
            <div>
              <ErrorText>{errors["caType"]?.message}</ErrorText>
            </div>
          </Field>
          <Input
            label="연식"
            register={register("caYear")}
            errors={errors["caYear"]?.message}
            inputSize={InputSize.sm}
          />
        </Wrapper>
        <DividerGray />
        <Wrapper grid col={2}>
          <Input
            label="차량소유자"
            register={register("caManager")}
            errors={errors["caManager"]?.message}
            inputSize={InputSize.sm}
          />
          <CustomDate
            label="구입일자"
            name="caInDate"
            register={register("caInDate")}
            reset={reset}
            errors={errors["caInDate"]?.message}
          />
        </Wrapper>
        <DividerGray />
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

          <CustomDate
            label="리스기간"
            name="caRentDate"
            register={register("caRentDate")}
            reset={reset}
            errors={errors["caRentDate"]?.message}
          />
        </Wrapper>
        <DividerGray />
        <Wrapper>
          <CustomDate
            label="정기검사일"
            name="caJdate1"
            register={register("caJdate1")}
            reset={reset}
            errors={errors["caJdate1"]?.message}
          />
          <CustomDate
            label="~"
            name="caJdate2"
            register={register("caJdate2")}
            reset={reset}
            errors={errors["caJdate2"]?.message}
          />
        </Wrapper>
        <DividerGray />
        <Wrapper>
          <Input
            label="메모"
            register={register("caBigo")}
            errors={errors["caBigo"]?.message}
            inputSize={InputSize.sm}
            fullWidth
          />
        </Wrapper>
        <Divider />
        <Wrapper grid col={2}>
          <Input
            label="차량가액--"
            register={register("caAmt")}
            errors={errors["caAmt"]?.message}
            inputSize={InputSize.sm}
            fullWidth
          />
          <Field style={{ display: "flex", alignItems: "center" }}>
            <Input
              label="감가 기간--"
              register={register("caDiscountM")}
              errors={errors["caDiscountM"]?.message}
              inputSize={InputSize.sm}
            />
            <p style={{ fontSize: "12px" }}>월</p>
          </Field>
        </Wrapper>
        <DividerGray />
        <Wrapper grid col={2}>
          <Input
            label="월리스료--"
            register={register("caMAmt")}
            errors={errors["caAmt"]?.message}
            inputSize={InputSize.sm}
            fullWidth
          />
          <Field>
            <Input
              label="월감가상각비--"
              register={register("caDiscountAmt")}
              errors={errors["caDiscountAmt"]?.message}
              inputSize={InputSize.sm}
              fullWidth
            />
          </Field>
        </Wrapper>
        <Divider />
        <Wrapper>
          <Input
            label="보험회사"
            register={register("caBco")}
            errors={errors["caBco"]?.message}
            inputSize={InputSize.sm}
          />
        </Wrapper>
        <DividerGray />
        <Wrapper grid col={2}>
          <Input
            label="계약지점"
            register={register("caBjijum")}
            errors={errors["caBjijum"]?.message}
            inputSize={InputSize.sm}
          />
          <Input
            label="담당자"
            register={register("caBdamdang")}
            errors={errors["caBdamdang"]?.message}
            inputSize={InputSize.sm}
          />
        </Wrapper>
        <DividerGray />
        <Wrapper grid col={2}>
          <Input
            label="전화번호"
            register={register("caBtel")}
            errors={errors["caBtel"]?.message}
            inputSize={InputSize.sm}
          />
          <Input
            label="핸드폰"
            register={register("caBhp")}
            errors={errors["caBhp"]?.message}
            inputSize={InputSize.sm}
          />
        </Wrapper>
        <DividerGray />
        <Wrapper grid col={2}>
          <Input
            label="피보험자"
            register={register("caBman")}
            errors={errors["caBman"]?.message}
            inputSize={InputSize.sm}
          />
          <Input
            label="증권번호"
            register={register("caBno")}
            errors={errors["caBno"]?.message}
            inputSize={InputSize.sm}
          />
        </Wrapper>
        <DividerGray />
        <Wrapper>
          {/* <Field>
            <FormGroup style={{ alignItems: "center" }}>
              <Label>연령특약</Label>
              <CheckBox register={{ ...register("caBage") }} />
            </FormGroup>
            <div>
              <ErrorText>{errors["caBage"]?.message}</ErrorText>
            </div>
          </Field> */}

          <Field>
            <FormGroup>
              <Label>연령특약</Label>
              {radioOptions.map((option, index) => (
                <Item key={index}>
                  <RadioButton
                    type="radio"
                    value={option.label}
                    {...register(`caBage`, {
                      required: "required",
                    })}
                    name="applyType"
                    id={option.id}
                    onChange={() => console.log(option.label)}
                  />
                  <RadioButtonLabel htmlFor={`${option.label}`}>
                    {option.label}
                  </RadioButtonLabel>
                </Item>
              ))}
            </FormGroup>
          </Field>
        </Wrapper>
        <DividerGray />
        <Wrapper>
          <CustomDate
            label="보험기간"
            name="caBsdate"
            register={register("caBsdate")}
            reset={reset}
            errors={errors["caBsdate"]?.message}
          />
          <CustomDate
            label="~"
            name="caBldate"
            register={register("caBldate")}
            reset={reset}
            errors={errors["caBldate"]?.message}
          />
        </Wrapper>
        <DividerGray />
        <Wrapper>
          <Input
            label="보험료"
            register={register("caInsuranceAmt")}
            errors={errors["caInsuranceAmt"]?.message}
            inputSize={InputSize.sm}
          />
        </Wrapper>
        <DividerGray />
      </form>
    );
  }
);

export default Form;
