import React, { useImperativeHandle, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Input,
  Select,
  FormGroup,
  Label,
  DividerGray,
} from "components/form/style";
import { ICC1400, emptyObj } from "./model";
import { useGetCommonDictionaryMutation } from "app/api/commonDictionary";
import CustomDatePicker from "components/customDatePicker";
import { InputSize } from "components/componentsType";
import { currencyMask } from "helpers/currency";

interface IForm {
  selected: any;
  fetchData: any;
  setData: any;
  setSelected: any;
  isAddBtnClicked: boolean;
}

const Form = React.forwardRef(
  (
    { selected, fetchData, setData, setSelected, isAddBtnClicked }: IForm,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const [getCommonDictionary, { data: dataCommonDic }] =
      useGetCommonDictionaryMutation();

    const { register, handleSubmit, control, reset, watch } = useForm<ICC1400>({
      mode: "onChange",
    });

    useEffect(() => {
      getCommonDictionary({ groupId: "CC", functionName: "CC1400" });
    }, []);

    useEffect(() => {
      if (selected !== undefined && Object.keys(selected)?.length > 0) {
        resetForm("reset");
      }
    }, [selected]);

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      crud,
      resetForm,
    }));

    const resetForm = async (type: string) => {
      if (type === "clear") {
        document.getElementById("sgDate")?.focus();

        reset(emptyObj);
      } else if (type === "reset") {
        if (selected !== undefined && Object.keys(selected)?.length > 0) {
          reset({
            ...selected,
            saupStampQu: selected?.saupStampQu === "Y",
            saupStampEs: selected?.saupStampEs === "Y",
            saupStampSe: selected?.saupStampSe === "Y",
          });
        }
      }
    };
    const crud = async (type: string | null) => {};

    const submit = async (data: ICC1400) => {};

    return (
      <form
        onSubmit={handleSubmit(submit)}
        autoComplete="off"
        style={{ width: "410px", padding: "20px 10px" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "70vh",
          }}
        >
          <div>
            <FormGroup>
              <Label>영 업 소</Label>
              <Select
                register={register("areaCode")}
                width={InputSize.i200}
                disabled={isAddBtnClicked}
              >
                {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <FormGroup>
              <Label>일 자</Label>
              <Controller
                control={control}
                name="sgDate"
                render={({ field }) => (
                  <CustomDatePicker {...field} style={{ width: "200px" }} />
                )}
              />
            </FormGroup>
            <FormGroup>
              <Label>사 원</Label>
              <Select register={register("sgSwCode")} width={InputSize.i200}>
                {dataCommonDic?.sgSwCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <Input
              label="가불 합계"
              register={register("gabulSum")}
              inputSize={InputSize.i200}
              textAlign="right"
            />
            <br />

            <Input
              label="금 액"
              register={register("sgKumack")}
              inputSize={InputSize.i200}
              textAlign="right"
              mask={currencyMask}
            />
            <Input
              label="비 고"
              register={register("sgBigo")}
              inputSize={InputSize.i200}
            />
          </div>
          <div>
            <div
              style={{
                color: "#00BEFF",
                fontSize: "15px",
                width: "90%",
                paddingLeft: "20px",
                paddingBottom: "5px",
              }}
            >
              <p>☞ 가불 반제 처리는 '- '금액으로 입력하며</p>
              <p
                style={{
                  paddingLeft: "20px",
                }}
              >
                {" "}
                매월 급여 공제시에는 반제처리 합니다.
              </p>
            </div>
            <DividerGray />
            <Input
              label="기간별 합계"
              register={register("totGabul")}
              inputSize={InputSize.i200}
              style={{ marginTop: "10px" }}
              textAlign="right"
            />
          </div>
        </div>
      </form>
    );
  }
);

export default Form;
