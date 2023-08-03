import React, { useEffect, useImperativeHandle } from "react";
import {
  Input,
  FormGroup,
  Label,
  DividerGray,
  Select,
} from "components/form/style";
import { useForm, Controller } from "react-hook-form";
import { InputSize } from "components/componentsType";
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
    const { register, reset, control, watch } = useForm<IPT1105>();

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      resetForm,
      //   crud,
    }));

    useEffect(() => {
      if (selected !== undefined && Object.keys(selected)?.length > 0) {
        resetForm("reset");
      }
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
      if (type === "clear") {
        //reset(newData);
      } else if (type === "reset") {
        reset(selected);
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
        <FormGroup>
          <Label>수금 일자</Label>
          <Controller
            control={control}
            name="msDate"
            render={({ field }) => (
              <CustomDatePicker
                {...field}
                style={{ width: "175px" }}
                // value={value == null ? new Date() : value}
              />
            )}
          />
        </FormGroup>
        <Controller
          control={control}
          name="cuJmisu"
          render={({ field: { name } }) => (
            <Input
              labelStyle={{ minWidth: "120px" }}
              label="미수금액"
              value={cuJmisu}
              mask={currencyMask}
              textAlign="right"
              inputSize={InputSize.i175}
              name={name}
              readOnly
            />
          )}
        />
        <Controller
          control={control}
          name="cuChkamt"
          render={({ field: { name } }) => (
            <Input
              labelStyle={{ minWidth: "120px" }}
              label="선택금액"
              value={guCheckAMount}
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
          name="msDc"
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
          name="msKumack"
          render={({ field: { name } }) => (
            <Input
              labelStyle={{ minWidth: "120px" }}
              label="수 금 액"
              value={guCheckAMount}
              mask={currencyMask}
              textAlign="right"
              inputSize={InputSize.i175}
              name={name}
            />
          )}
        />
        <Controller
          control={control}
          name="msJanack"
          render={({ field: { name } }) => (
            <Input
              labelStyle={{ minWidth: "120px" }}
              label="수금 후 잔액"
              value={
                cuJmisu &&
                `${cuJmisu - guCheckAMount - (msDcTotal ? msDcTotal : 0)}`
              }
              mask={currencyMask}
              textAlign="right"
              inputSize={InputSize.i175}
              name={name}
            />
          )}
        />

        <FormGroup>
          <Label>수금 방법</Label>
          <Select register={register("msSukumtype")} style={{ width: "175px" }}>
            {dataCommonDic?.msSukumtype?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code1}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>사 원</Label>
          <Select register={register("msSwCode")} width={InputSize.i175}>
            {dataCommonDic?.msSwCode?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code1}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
        <Controller
          control={control}
          name="msBigo"
          render={({ field }) => (
            <Input
              {...field}
              labelStyle={{ minWidth: "120px" }}
              label="비 고"
              // mask={currencyMask}
              textAlign="left"
              inputSize={InputSize.i175}
            />
          )}
        />
      </form>
    );
  }
);

export default FORMCM1105;
