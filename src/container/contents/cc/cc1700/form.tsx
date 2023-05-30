import React, { useImperativeHandle, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Input,
  Select,
  Field,
  FormGroup,
  Wrapper,
  Divider,
  Label,
  DividerGray,
} from "components/form/style";
import { ICC1700FORM } from "./model";
import CustomDatePicker from "components/customDatePicker";
import { InputSize } from "components/componentsType";
import {
  Item,
  RadioButton,
  RadioButtonLabel,
} from "components/radioButton/style";
import { emptyObj } from "./model";

interface IForm {
  areaCode: string;
  data65: any;
  setData65: Function;
  fetchData: any;
  setData: any;
  setSelected: any;
  dataCommonDic: any;
  isAddBtnClicked: boolean;
  setIsAddBtnClicked: Function;
}

const Form = React.forwardRef(
  (
    {
      areaCode,
      data65,
      setData65,
      fetchData,
      setData,
      setSelected,
      dataCommonDic,
      isAddBtnClicked,
      setIsAddBtnClicked,
    }: IForm,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const { register, handleSubmit, control, reset, getValues } =
      useForm<ICC1700FORM>({ mode: "onChange" });

    useEffect(() => {
      if (data65 !== undefined && Object.keys(data65)?.length > 0) {
        resetForm("reset");
      }
      setIsAddBtnClicked(false);
    }, [data65]);

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      crud,
      resetForm,
      setIsAddBtnClicked,
    }));

    const resetForm = async (type: string) => {
      if (type === "clear") {
        reset({ ...emptyObj, acbAreaCode: areaCode, acbAccCode: "0" });
      }
      if (type === "reset") {
        reset(data65);
      }
    };
    const crud = async (type: string | null) => {};

    const submit = async (data: ICC1700FORM) => {};

    return (
      <form
        onSubmit={handleSubmit(submit)}
        autoComplete="off"
        style={{ width: "370px", padding: "20px 10px" }}
      >
        <FormGroup>
          <Label>영 업 소</Label>
          <Select register={register("acbAreaCode")} width={InputSize.i175}>
            {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
        <Input
          label="코 드"
          register={register("acbCode")}
          inputSize={InputSize.i175}
        />
        <FormGroup>
          <Label style={{ marginRight: "3px" }}>구 분</Label>
          {[
            { name: "보통예금", value: "0" },
            { name: "정기적금", value: "1" },
          ].map((option, index) => {
            return (
              <Item key={index}>
                <RadioButton
                  type="radio"
                  value={option.value}
                  {...register("acbAccCode")}
                  id={option.value}
                />
                <RadioButtonLabel htmlFor={`${option.value}`}>
                  {option.name}
                </RadioButtonLabel>
              </Item>
            );
          })}
        </FormGroup>
        <Input
          label="은 행 명"
          register={register("acbName")}
          inputSize={InputSize.i175}
        />
        <Input
          label="계좌 번호"
          register={register("acbBankno")}
          inputSize={InputSize.i175}
        />
        <Input
          label="적 요"
          register={register("acbBigo")}
          inputSize={InputSize.i175}
        />
      </form>
    );
  }
);

export default Form;
