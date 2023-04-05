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
  DividerGray,
} from "components/form/style";
import { ICC9005FORM } from "./model";
import { InputSize } from "components/componentsType";
import CustomDatePicker from "components/customDatePicker";
import API from "app/axios";
import {
  Item,
  RadioButton,
  RadioButtonLabel,
} from "components/radioButton/style";

interface IForm {
  data65: any;
  setData65: Function;
  // selected: any;
  fetchData: any;
  setData: any;
  selectedRowIndex: number;
  setSelected: any;
  setSelectedRowIndex: any;
  dataCommonDic: any;
  isAddBtnClicked: boolean;
  setIsAddBtnClicked: Function;
}

const Form = React.forwardRef(
  (
    {
      data65,
      setData65,
      fetchData,
      setData,
      selectedRowIndex,
      setSelected,
      setSelectedRowIndex,
      dataCommonDic,
      isAddBtnClicked,
      setIsAddBtnClicked,
    }: IForm,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const { register, handleSubmit, control, reset, getValues } =
      useForm<ICC9005FORM>({ mode: "onChange" });

    useEffect(() => {
      if (data65 !== undefined && JSON.stringify(data65) !== "{}") {
        resetForm("reset");
      }
      setIsAddBtnClicked(false);
    }, [data65]);

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      crud,
      resetForm,
      setIsAddBtnClicked,
    }));

    const resetForm = async (type: string) => {};
    const crud = async (type: string | null) => {};

    const submit = async (data: ICC9005FORM) => {};

    return (
      <form
        onSubmit={handleSubmit(submit)}
        style={{ width: "410px", padding: "10px 10px" }}
      >
        <FormGroup>
          <Label>영업소</Label>
          <Select {...register("acbAreaCode")} width={InputSize.i200}>
            {dataCommonDic?.acbAreaCode?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>일자</Label>
          <Controller
            control={control}
            {...register("baseDate")}
            render={({ field: { onChange, value, name } }) => (
              <CustomDatePicker
                style={{ width: "200px" }}
                value={value}
                onChange={onChange}
                name={name}
                showYearDropdown
              />
            )}
          />
        </FormGroup>
        <Input
          label="계정과목"
          register={register("accName")}
          inputSize={InputSize.i200}
        />
        <FormGroup>
          <Input
            label="은행명"
            register={register("bankCode")}
            inputSize={InputSize.i50}
          />
          <Input register={register("acbName")} inputSize={InputSize.i145} />
        </FormGroup>
        <FormGroup>
          <Input
            label="계좌번호"
            register={register("acbBankno")}
            inputSize={InputSize.i200}
          />
        </FormGroup>
        <FormGroup>
          <Input
            label="잔액"
            register={register("bankKumack")}
            inputSize={InputSize.i200}
            textAlign="right"
          />
        </FormGroup>
      </form>
    );
  }
);

export default Form;