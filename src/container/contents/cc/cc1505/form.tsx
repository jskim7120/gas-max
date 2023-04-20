import React, { useImperativeHandle, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Select, FormGroup, Label } from "components/form/style";
import { ICC1505FORM, emtyObj } from "./model";
import { InputSize } from "components/componentsType";
import API from "app/axios";

interface IForm {
  data: any;
  dataCommonDic: any;
  isAddBtnClicked: boolean;
}

const Form = React.forwardRef(
  (
    { data, dataCommonDic, isAddBtnClicked }: IForm,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const { register, handleSubmit, control, reset, getValues } =
      useForm<ICC1505FORM>({ mode: "onChange" });

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      crud,
      resetForm,
    }));

    useEffect(() => {
      if (data) {
        resetForm("reset");
      }
    }, [data]);

    const resetForm = async (type: string) => {
      if (type === "clear") {
        reset(emtyObj);
      }
      if (type === "reset") {
        reset(data);
      }
    };
    const crud = async (type: string | null) => {};

    const submit = async (data: ICC1505FORM) => {};

    return (
      <form
        onSubmit={handleSubmit(submit)}
        style={{ width: "360px", padding: "20px 10px" }}
      >
        <FormGroup>
          <Label>계정 분류</Label>
          <Select register={register("accCodeType")} width={InputSize.i150}>
            {dataCommonDic?.accCodeType?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Input
            label="코 드"
            register={register("accCode1")}
            inputSize={InputSize.i60}
          />
          <Input register={register("accCode2")} style={{ width: "84px" }} />
        </FormGroup>
        <Input
          label="계정 과목"
          register={register("accName")}
          inputSize={InputSize.i150}
        />
      </form>
    );
  }
);

export default Form;
