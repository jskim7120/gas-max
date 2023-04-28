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
import { ICC1600FORM, emptyObj } from "./model";
import { InputSize } from "components/componentsType";
import API from "app/axios";
import {
  Item,
  RadioButton,
  RadioButtonLabel,
} from "components/radioButton/style";

interface IForm {
  data65: any;
  acsAccName: any;
  isAddBtnClicked: boolean;
  setIsAddBtnClicked: Function;
}

const Form = React.forwardRef(
  (
    { data65, acsAccName, isAddBtnClicked, setIsAddBtnClicked }: IForm,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const { register, handleSubmit, control, reset, getValues } =
      useForm<ICC1600FORM>({ mode: "onChange" });

    useEffect(() => {
      if (data65 !== undefined && JSON.stringify(data65) !== "{}") {
        resetForm("reset");
      }
      // setIsAddBtnClicked(false);
    }, [data65]);

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      crud,
      resetForm,
      // setIsAddBtnClicked,
    }));

    const resetForm = async (type: string) => {
      if (type === "clear") {
        reset(emptyObj);
      }
      if (type === "reset") {
        reset(data65);
      }
    };
    const crud = async (type: string | null) => {};

    const submit = async (data: ICC1600FORM) => {};

    return (
      <form
        onSubmit={handleSubmit(submit)} autoComplete="off"
        style={{ width: "410px", padding: "10px 10px" }}
      >
        <FormGroup>
          <Label style={{ marginRight: "2px" }}>구 분</Label>
          {[
            { name: "수입", value: "0" },
            { name: "지출", value: "1" },
          ].map((option, index) => {
            return (
              <Item key={index}>
                <RadioButton
                  type="radio"
                  value={option.value}
                  {...register("acsType")}
                  id={option.value}
                />
                <RadioButtonLabel htmlFor={`${option.value}`}>
                  {option.name}
                </RadioButtonLabel>
              </Item>
            );
          })}
        </FormGroup>
        <FormGroup>
          <Label>계정 과목</Label>
          <Select register={register("acsAccCode")} width={InputSize.i150}>
            {acsAccName?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>

        <Input
          label="항 목"
          register={register("acsName")}
          inputSize={InputSize.i150}
        />
      </form>
    );
  }
);

export default Form;
