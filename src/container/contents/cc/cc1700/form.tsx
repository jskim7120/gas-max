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
import { ICC1700FORM } from "./model";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import CustomDatePicker from "components/customDatePicker";
import { InputSize } from "components/componentsType";
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
}

const Form = React.forwardRef(
  (
    {
      data65,
      setData65,
      // selected,
      fetchData,
      setData,
      selectedRowIndex,
      setSelected,
      setSelectedRowIndex,
      dataCommonDic,
    }: IForm,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);

    const { register, handleSubmit, control, reset, getValues } =
      useForm<ICC1700FORM>({ mode: "onChange" });

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

    const submit = async (data: ICC1700FORM) => {};

    return (
      <form
        onSubmit={handleSubmit(submit)}
        style={{ width: "410px", padding: "0px 10px" }}
      >
        <FormGroup>
          <Label>영 업 소</Label>
          <Select {...register("acbAreaCode")} width={InputSize.i130}>
            {dataCommonDic?.acbAreaCode?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
        <Input
          label="코 드"
          register={register("acbCode")}
          inputSize={InputSize.i130}
        />
        <FormGroup>
          <Label>구 분</Label>
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
          inputSize={InputSize.i130}
        />
        <Input
          label="계좌번호"
          register={register("acbBankno")}
          inputSize={InputSize.i130}
        />
        <Input
          label="적 요"
          register={register("acbBigo")}
          inputSize={InputSize.i130}
        />
      </form>
    );
  }
);

export default Form;
