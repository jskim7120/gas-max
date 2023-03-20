import React, { useState, useEffect, useImperativeHandle } from "react";
import { Input, FormGroup, Label, Field, Select } from "components/form/style";
import { useForm, Controller } from "react-hook-form";
import { FieldKind, InputSize } from "components/componentsType";
import { IPT1205 } from "./model";
import CustomDatePicker from "components/customDatePicker";

const FORMPT1205 = React.forwardRef(
  (
    {
      selected,
      setData,
      selectedRowIndex,
      setSelectedRowIndex,
      setSelected,
      dataCommonDic,
    }: {
      selected: any;
      setData: Function;
      selectedRowIndex: any;
      setSelectedRowIndex: Function;
      setSelected: Function;
      dataCommonDic: any;
    },
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);

    const { register, handleSubmit, reset, getValues, control } =
      useForm<IPT1205>();

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      resetForm,
      //   crud,
      setIsAddBtnClicked,
    }));

    useEffect(() => {
      resetForm("reset");
    }, [selected]);
    const resetForm = (type: string | null) => {
      if (selected !== undefined && JSON.stringify(selected) !== "{}") {
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
          console.log("WTTTGF ", newData);
          reset(newData);
        }
      }
    };
    return (
      <form
        // onSubmit={handleSubmit(submit)}
        style={{ margin: "30px 30px 0 0", padding: "10px" }}
      >
        <Field flex style={{ alignItems: "center" }}>
          <Label>수금일자</Label>
          <Controller
            control={control}
            {...register("gsDate")}
            render={({ field: { onChange, value, name } }) => (
              <CustomDatePicker
                style={{ width: "175px" }}
                value={value == null ? new Date() : value}
                onChange={onChange}
                name={name}
              />
            )}
          />
        </Field>
        <div style={{ borderStyle: "groove", alignItems: "center" }}>
          <Field>
            <Input
              label="미수금액"
              register={register("gjMisu")}
              kind={FieldKind.BORDER}
              inputSize={InputSize.i175}
            />
          </Field>
          <Field>
            <Input
              label="선택금액"
              register={register("guChkamt")}
              kind={FieldKind.BORDER}
              inputSize={InputSize.i175}
            />
          </Field>
        </div>
        <br />
        <FormGroup>
          <Field>
            <Input
              label="D    /    C"
              register={register("gsDc")}
              kind={FieldKind.BORDER}
              inputSize={InputSize.i175}
            />
          </Field>
        </FormGroup>

        <FormGroup>
          <Field>
            <Input
              label="수  금  액"
              register={register("gsKumack")}
              kind={FieldKind.BORDER}
              inputSize={InputSize.i175}
            />
          </Field>
        </FormGroup>
        <br />
        <FormGroup>
          <Field>
            <Input
              label="수금 후 잔액"
              register={register("gsJanack")}
              kind={FieldKind.BORDER}
              inputSize={InputSize.i175}
            />
          </Field>
        </FormGroup>
        <br />
        <FormGroup>
          <Label>수금방법</Label>
          <Select
            {...register("gsSukumtype")}
            kind={FieldKind.BORDER}
            style={{ width: "175px" }}
          >
            {dataCommonDic?.gsSukumtype?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code1}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>사원</Label>
          <Select
            {...register("gsSwCode")}
            kind={FieldKind.BORDER}
            width={InputSize.i175}
          >
            {dataCommonDic?.gsSwCode?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code1}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>

        <Field>
          <Input
            label="비고"
            register={register("gsBigo")}
            kind={FieldKind.BORDER}
            inputSize={InputSize.i175}
            textAlign="right"
          />
        </Field>
      </form>
    );
  }
);

export default FORMPT1205;
