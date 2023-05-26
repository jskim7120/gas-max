import React, { useState, useEffect, useImperativeHandle } from "react";
import {
  Input,
  FormGroup,
  Label,
  DividerGray,
  Field,
  Select,
} from "components/form/style";
import { useForm, Controller } from "react-hook-form";
import { FieldKind, InputSize } from "components/componentsType";
import { IPT1105 } from "./model";
import CustomDatePicker from "components/customDatePicker";
import { currencyMask } from "helpers/currency";

const FORMCM1105 = React.forwardRef(
  (
    {
      selected,
      setData,
      setSelected,
      dataCommonDic,
      guCheckAMount,
      cuJmisu,
    }: {
      selected: any;
      setData: Function;
      setSelected: Function;
      dataCommonDic: any;
      guCheckAMount: number;
      cuJmisu?: number;
    },
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);

    const { register, handleSubmit, reset, getValues, control, watch } =
      useForm<IPT1105>();

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      resetForm,
      //   crud,
      setIsAddBtnClicked,
    }));

    useEffect(() => {
      resetForm("reset");
    }, [selected]);

    let msDcTotal = 0;
    if (
      watch("msDc") === undefined ||
      Number.isNaN(watch("msDc")) ||
      watch("msDc") === null
    ) {
      msDcTotal = 0;
    } else {
      msDcTotal = parseFloat(String(watch("msDc")).replaceAll(",", ""));
    }

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

    console.log(
      cuJmisu && cuJmisu - guCheckAMount + (msDcTotal ? msDcTotal : 0),
      guCheckAMount + (msDcTotal ? msDcTotal : 0),
      typeof msDcTotal,
      msDcTotal ? msDcTotal : 0,
      guCheckAMount,
      "this is total subtruction",
      msDcTotal,
      guCheckAMount,
      "expression"
    );

    return (
      <form
        // onSubmit={handleSubmit(submit)}
        autoComplete="off"
        style={{ margin: "30px 30px 0 0" }}
      >
        <Field flex style={{ alignItems: "center" }}>
          <Label>수금 일자</Label>
          <Controller
            control={control}
            {...register("msDate")}
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
        <Controller
          control={control}
          {...register("cuJmisu")}
          render={({ field: { onChange, value, name } }) => (
            <Input
              labelStyle={{ minWidth: "120px" }}
              label="미수금액"
              value={cuJmisu}
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
          {...register("cuChkamt")}
          render={({ field: { onChange, value, name } }) => (
            <Input
              labelStyle={{ minWidth: "120px" }}
              label="선택금액"
              value={guCheckAMount}
              onChange={onChange}
              mask={currencyMask}
              textAlign="right"
              inputSize={InputSize.i175}
              name={name}
            />
          )}
        />
        <DividerGray />

        <Controller
          control={control}
          {...register("msDc")}
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
          {...register("msKumack")}
          render={({ field: { onChange, value, name } }) => (
            <Input
              labelStyle={{ minWidth: "120px" }}
              label="수 금 액"
              value={guCheckAMount}
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
          {...register("msJanack")}
          render={({ field: { onChange, value, name } }) => (
            <Input
              labelStyle={{ minWidth: "120px" }}
              label="수금 후 잔액"
              value={
                cuJmisu &&
                `${cuJmisu - guCheckAMount - (msDcTotal ? msDcTotal : 0)}`
              }
              onChange={onChange}
              mask={currencyMask}
              textAlign="right"
              inputSize={InputSize.i175}
              name={name}
            />
          )}
        />

        <FormGroup>
          <Label>수금 방법</Label>
          <Select
            register={register("msSukumtype")}
            kind={FieldKind.BORDER}
            style={{ width: "175px" }}
          >
            {dataCommonDic?.msSukumtype?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code1}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>사 원</Label>
          <Select
            register={register("msSwCode")}
            kind={FieldKind.BORDER}
            width={InputSize.i175}
          >
            {dataCommonDic?.msSwCode?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code1}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
        <Controller
          control={control}
          {...register("msBigo")}
          render={({ field: { onChange, value, name } }) => (
            <Input
              labelStyle={{ minWidth: "120px" }}
              label="비 고"
              value={value}
              onChange={onChange}
              // mask={currencyMask}
              textAlign="left"
              inputSize={InputSize.i175}
              name={name}
            />
          )}
        />
      </form>
    );
  }
);

export default FORMCM1105;
