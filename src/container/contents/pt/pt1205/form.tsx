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
      setSelected,
      dataCommonDic,
      totalGuAmount,
      cuCmisu,
    }: {
      selected: any;
      setData: Function;
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
      if (selected !== undefined && Object.keys(selected)?.length > 0) {
        resetForm("reset");
      }
    }, [selected]);

    const resetForm = (type: string | null) => {
      if (type === "clear") {
        reset();
      } else if (type === "reset") {
        console.log("selected");
        reset({
          ...selected,
          gsDate: selected?.gsDate ? selected.gsDate : new Date(),
        });
      }
    };
    return (
      <form
        // onSubmit={handleSubmit(submit)}
        autoComplete="off"
        style={{ margin: "30px 30px 0 0", padding: "10px" }}
      >
        <Field flex style={{ alignItems: "center" }}>
          <Label>수금 일자</Label>
          <Controller
            control={control}
            name="gsDate"
            render={({ field }) => (
              <CustomDatePicker
                {...field}
                style={{ width: "175px" }}
                //value={value == null ? new Date() : value}
                //onChange={onChange}
                //name={name}
              />
            )}
          />
        </Field>
        <div style={{ borderStyle: "groove", alignItems: "center" }}>
          <Controller
            control={control}
            name="cuCmisu"
            render={({ field: { name } }) => (
              <Input
                labelStyle={{ minWidth: "120px" }}
                label="미수 금액"
                value={cuCmisu}
                mask={currencyMask}
                textAlign="right"
                inputSize={InputSize.i175}
                name={name}
              />
            )}
          />
          <Controller
            control={control}
            name="guChkamt"
            render={({ field: { name } }) => (
              <Input
                labelStyle={{ minWidth: "120px" }}
                label="선택 금액"
                value={totalGuAmount}
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
          name="gsDc"
          render={({ field }) => (
            <Input
              {...field}
              labelStyle={{ minWidth: "120px" }}
              label="D / C"
              mask={currencyMask}
              textAlign="right"
              inputSize={InputSize.i175}
            />
          )}
        />
        <Controller
          control={control}
          name="gsKumack"
          render={({ field: { name } }) => (
            <Input
              labelStyle={{ minWidth: "120px" }}
              label="수 금 액"
              value={totalGuAmount}
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
          name="gsJanack"
          render={({ field: { name } }) => (
            <Input
              labelStyle={{ minWidth: "120px" }}
              label="수금 후 잔액"
              value={
                cuCmisu &&
                `${cuCmisu - (totalGuAmount + gsDcTotal ? gsDcTotal : 0)}`
              }
              mask={currencyMask}
              textAlign="right"
              inputSize={InputSize.i175}
              name={name}
            />
          )}
        />
        <br />
        <FormGroup>
          <Label>수금 방법</Label>
          <Select
            register={register("gsSukumtype")}
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
          <Label>사 원</Label>
          <Select
            register={register("gsSwCode")}
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
            label="비 고"
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
