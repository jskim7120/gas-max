import React, { useImperativeHandle, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Select, FormGroup, Label } from "components/form/style";
import { ICC1505FORM } from "./model";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { InputSize } from "components/componentsType";
import API from "app/axios";

interface IForm {
  selected: any;
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
      selected,
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
      useForm<ICC1505FORM>({ mode: "onChange" });

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      crud,
      resetForm,
      setIsAddBtnClicked,
    }));

    const resetForm = async (type: string) => {};
    const crud = async (type: string | null) => {};

    const submit = async (data: ICC1505FORM) => {};

    return (
      <form
        onSubmit={handleSubmit(submit)}
        style={{ width: "360px", padding: "20px 10px" }}
      >
        <FormGroup>
          <Label>계정분류</Label>
          <Select {...register("accCoddType")} width={InputSize.i130}>
            {dataCommonDic?.accCoddType?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Input
            label="코 드"
            register={register("accCode")}
            inputSize={InputSize.i130}
          />
        </FormGroup>
        <Input
          label="계정과목"
          register={register("accName")}
          inputSize={InputSize.i130}
        />
      </form>
    );
  }
);

export default Form;
