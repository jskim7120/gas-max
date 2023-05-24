import React, { useEffect, useImperativeHandle, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { apiGet, apiPost } from "app/axios";
import { useGetCommonDictionaryMutation } from "app/api/commonDictionary";
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
import { ICAR, emptyObj } from "./model";
import {
  DateWithoutDash,
  DateWithoutDashOnlyYearMonth,
} from "helpers/dateFormat";
import CustomDatePicker from "components/customDatePicker";
import { InputSize } from "components/componentsType";
import { InfoText } from "components/text";
import { currencyMask, removeCommas } from "helpers/currency";
import {
  Item,
  RadioButton,
  RadioButtonLabel,
} from "components/radioButton/style";

interface IForm {
  selected: any;
  fetchData: Function;
  isAddBtnClicked: boolean;
  setIsAddBtnClicked: Function;
  resetButtonCombination: Function;
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
      isAddBtnClicked,
      setIsAddBtnClicked,
      resetButtonCombination,
    }: IForm,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const [areaCode, setAreaCode] = useState("");
    const [caSwCode, setCaSwCode] = useState([]);

    const [getCommonDictionary, { data: dataCommonDic }] =
      useGetCommonDictionaryMutation();

    const { register, handleSubmit, reset, control, getValues, setFocus } =
      useForm<ICAR>({ mode: "onChange" });

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      crud,
      resetForm,
    }));

    useEffect(() => {
      getCommonDictionary({ groupId: "EN", functionName: "EN1700" });
    }, []);

    // const fetchCode11 = async (code: string) => {
    //   try {
    //     const response: any = await API.get(EN170011, {
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

    const fetchData65 = async (code: string) => {
      // try {
      //   const res: any = await API.get(EN170065, {
      //     params: { areaCode: code },
      //   });

      //   if (res.status === 200) {
      //     setCaSwCode(res.data);
      //   } else {
      //     setCaSwCode([]);
      //   }
      // } catch (err) {
      //   setCaSwCode([]);
      //   console.log(err);
      // }

      const res: any = await apiGet(EN170065, { areaCode: code });
      if (res) {
        setCaSwCode(res);
      } else {
        setCaSwCode([]);
      }
    };

    const codeChangeHandler = async (aCode: string) => {
      const res = await apiGet(EN170011, { areaCode: aCode });
      await fetchData65(aCode);

      if (res) {
        setFocus("caName");
        reset({ ...emptyObj, ...res, caCode: res.tempCode });
      }
    };

    const resetForm = async (type: string) => {
      if (type === "clear") {
        await codeChangeHandler(areaCode);
        return;
      }

      if (type === "reset") {
        if (selected !== undefined && Object.keys(selected)?.length > 0) {
          if (selected?.areaCode !== areaCode) {
            await fetchData65(selected.areaCode);
            setAreaCode(selected.areaCode);
          }
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
        const formValues: any = getValues();
        delete formValues.caAmt;
        delete formValues.caMAmt;
        delete formValues.caDiscountAmt;
        delete formValues.caInsuranceAmt;

        // try {
        //   const response: any = await API.post(EN1700DELETE, formValues);
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

        const res = await apiPost(EN1700DELETE, formValues, "삭제하였습니다");
        res && (await fetchData());
        //return;
      }

      if (type === null) {
        handleSubmit(submit)();
      }
    };

    const submit = async (data: ICAR) => {
      //form aldaagui uyd ajillana
      const path = isAddBtnClicked ? EN1700INSERT : EN1700UPDATE;
      const formValues: any = getValues();
      isAddBtnClicked && (formValues.areaCode = areaCode);
      const obj: any =
        formValues.caSwCode &&
        caSwCode.find((item: any) => item.code === formValues.caSwCode);
      formValues.caSwName = obj?.codeName ? obj?.codeName : "";
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

      formValues.caAmt = +removeCommas(formValues.caAmt, "number");
      formValues.caMAmt = +removeCommas(formValues.caMAmt, "number");
      formValues.caDiscountAmt = +removeCommas(
        formValues.caDiscountAmt,
        "number"
      );
      formValues.caInsuranceAmt = +removeCommas(
        formValues.caInsuranceAmt,
        "number"
      );

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

    return (
      <form
        onSubmit={handleSubmit(submit)}
        style={{ width: "650px", padding: "0px 10px" }}
        autoComplete="off"
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
              value={areaCode}
              onChange={(e) => {
                setAreaCode(e.target.value);
                codeChangeHandler(e.target.value);
              }}
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
              {caSwCode?.map((obj: any, idx: number) => (
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
            <CheckBox register={register("caBkYn")} />
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
              render={({ field: { onChange, onBlur, value, name } }) => (
                <CustomDatePicker
                  value={value}
                  onChange={onChange}
                  style={{ width: "150px" }}
                  name={name}
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
            <CheckBox register={register("caRentYn")} />
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
              render={({ field: { onChange, onBlur, value, name } }) => (
                <CustomDatePicker
                  value={value}
                  onChange={onChange}
                  name={name}
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
        <FormGroup>
          <Label>연령 특약</Label>
          {radioOptions.map((option, index) => (
            <Item key={index}>
              <RadioButton
                type="radio"
                value={option.id}
                {...register(`caBage`)}
                id={option.id}
              />
              <RadioButtonLabel htmlFor={`${option.label}`}>
                {option.label}
              </RadioButtonLabel>
            </Item>
          ))}
        </FormGroup>
        <FormGroup>
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
        </FormGroup>
        <FormGroup>
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
        </FormGroup>
      </form>
    );
  }
);

export default Form;
