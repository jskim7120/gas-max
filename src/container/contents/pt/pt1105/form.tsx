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

const FORMCM1105 = React.forwardRef(
  (
    {
      selected,
      setData,
      selectedRowIndex,
      setSelectedRowIndex,
      setSelected,
      dataCommonDic,
      guCheckAMount,
    }: {
      selected: any;
      setData: Function;
      selectedRowIndex: any;
      setSelectedRowIndex: Function;
      setSelected: Function;
      dataCommonDic: any;
      guCheckAMount: number;
    },
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);

    const { register, handleSubmit, reset, getValues, control } =
      useForm<IPT1105>();

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
        style={{ margin: "30px 30px 0 0" }}
      >
        <Field flex style={{ alignItems: "center" }}>
          <Label>수금일자</Label>
          <Controller
            control={control}
            {...register("msBigo")}
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
        <Field>
          <Input
            label="미수금액"
            register={register("cuJmisu")}
            kind={FieldKind.BORDER}
            inputSize={InputSize.i175}
          />
        </Field>
        <Field>
          <Input
            label="선태금액"
            register={register("cuChkamt")}
            kind={FieldKind.BORDER}
            inputSize={InputSize.i175}
            value={guCheckAMount}
            readOnly={true}
          />
        </Field>
        <DividerGray />

        <FormGroup>
          <Field>
            <Input
              label="D    /    C"
              register={register("msDc")}
              kind={FieldKind.BORDER}
              inputSize={InputSize.i175}
              value={0}
              textAlign={"right"}
            />
          </Field>
        </FormGroup>

        <FormGroup>
          <Field>
            <Input
              label="수 금 액"
              register={register("msKumack")}
              kind={FieldKind.BORDER}
              inputSize={InputSize.i175}
              value={guCheckAMount}
              textAlign={"right"}
            />
          </Field>
        </FormGroup>
        <FormGroup>
          <Field>
            <Input
              label="수금 후 잔액"
              register={register("msJanack")}
              kind={FieldKind.BORDER}
              inputSize={InputSize.i175}
              textAlign={"right"}
              value={selected.cuJmisu - guCheckAMount}
            />
          </Field>
        </FormGroup>

        <FormGroup>
          <Label>수금방법</Label>
          <Select
            {...register("msSukumtype")}
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
          <Label>사원</Label>
          <Select
            {...register("msSwCode")}
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

        <Field>
          <Input
            label="비고"
            register={register("msBigo")}
            kind={FieldKind.BORDER}
            inputSize={InputSize.i175}
            textAlign="right"
          />
        </Field>
      </form>
    );
  }
);

export default FORMCM1105;
