import React, { useState, useEffect, useImperativeHandle } from "react";
import { Input, FormGroup, Label, Field, Select } from "components/form/style";
import { useForm, Controller } from "react-hook-form";
import { FieldKind, InputSize } from "components/componentsType";
import { IPT1205 } from "./model";
import CustomDatePicker from "components/customDatePicker";
import { currencyMask } from "helpers/currency";

const FORMPT1205 = React.forwardRef(
  (
    {
      selected,
      setData,
      selectedRowIndex,
      setSelectedRowIndex,
      setSelected,
      dataCommonDic,
      totalGuAmount,
      cuCmisu,
    }: {
      selected: any;
      setData: Function;
      selectedRowIndex: any;
      setSelectedRowIndex: Function;
      setSelected: Function;
      dataCommonDic: any;
      totalGuAmount: number;
      cuCmisu?: number;
    },
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);
    const [addedDcAmount, setAddedDcAmount] = useState(0);
    const { register, handleSubmit, reset, getValues, control, watch } =
      useForm<IPT1205>();

    let gsDcTotal = 0;
    console.log(typeof watch("gsDc"), "type of total");
    console.log(watch("gsDc"), "value of total");
    console.log(watch("gsDc") === undefined, "is nuulllll");
    console.log(Number.isNaN(watch("gsDc")), "===");
    if (
      watch("gsDc") === undefined ||
      Number.isNaN(watch("gsDc")) ||
      watch("gsDc") === null
    ) {
      gsDcTotal = 0;
    } else {
      gsDcTotal = parseFloat(String(watch("gsDc")).replaceAll(",", ""));
    }
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
          <Controller
            control={control}
            {...register("cuCmisu")}
            render={({ field: { onChange, value, name } }) => (
              <Input
                labelStyle={{ minWidth: "120px" }}
                label="미수금액"
                value={cuCmisu}
                onChange={onChange}
                mask={currencyMask}
                textAlign="right"
                inputSize={InputSize.i175}
                name={name}
              />
            )}
          />
          <Controller
            control={control}
            {...register("guChkamt")}
            render={({ field: { onChange, value, name } }) => (
              <Input
                labelStyle={{ minWidth: "120px" }}
                label="선택금액"
                value={totalGuAmount}
                onChange={onChange}
                mask={currencyMask}
                textAlign="right"
                inputSize={InputSize.i175}
                name={name}
              />
            )}
          />
        </div>
        <br />
        <Controller
          control={control}
          {...register("gsDc")}
          render={({ field: { onChange, value, name } }) => (
            <Input
              labelStyle={{ minWidth: "120px" }}
              label="D / C"
              value={value}
              onChange={onChange}
              mask={currencyMask}
              textAlign="right"
              inputSize={InputSize.i175}
              name={name}
            />
          )}
        />
        <Controller
          control={control}
          {...register("gsKumack")}
          render={({ field: { onChange, value, name } }) => (
            <Input
              labelStyle={{ minWidth: "120px" }}
              label="수 금 액"
              value={totalGuAmount}
              onChange={onChange}
              mask={currencyMask}
              textAlign="right"
              inputSize={InputSize.i175}
              name={name}
            />
          )}
        />
        <br />
        <Controller
          control={control}
          {...register("gsJanack")}
          render={({ field: { onChange, value, name } }) => (
            <Input
              labelStyle={{ minWidth: "120px" }}
              label="수금 후 잔액"
              value={cuCmisu && `${cuCmisu - (totalGuAmount + gsDcTotal)}`}
              onChange={onChange}
              mask={currencyMask}
              textAlign="right"
              inputSize={InputSize.i175}
              name={name}
            />
          )}
        />
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
            textAlign="left"
          />
        </Field>
      </form>
    );
  }
);

export default FORMPT1205;
