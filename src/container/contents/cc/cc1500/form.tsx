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
import { ICC1500FORM } from "./model";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import CustomDatePicker from "components/customDatePicker";
import { InputSize } from "components/componentsType";
import { currencyMask } from "helpers/currency";

interface IForm {
  data65: any;
  setData65: Function;
  // selected: any;
  fetchData: any;
  setData: any;
  selected: any;
  selectedRowIndex: number;
  setSelected: any;
  setSelectedRowIndex: any;
  dataCommonDic: any;
  isAddBtnClicked: boolean;
  setIsAddBtnClicked: Function;
}

const Form = React.forwardRef(
  (
    {
      data65,
      setData65,
      // selected,
      fetchData,
      setData,
      selected,
      selectedRowIndex,
      setSelected,
      setSelectedRowIndex,
      dataCommonDic,
      isAddBtnClicked,
      setIsAddBtnClicked,
    }: IForm,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const { register, handleSubmit, control, reset, getValues } =
      useForm<ICC1500FORM>({ mode: "onChange" });

    useEffect(() => {
      if (selected !== undefined && JSON.stringify(selected) !== "{}") {
        resetForm("reset");
      }
      setIsAddBtnClicked(false);
    }, [selected]);

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      crud,
      resetForm,
      setIsAddBtnClicked,
    }));

    const resetForm = async (type: string) => {
      if (selected !== undefined && Object.keys(selected).length > 0) {
        let newData: any = {};
        if (type === "clear") {
          document.getElementById("acjDate")?.focus();

          for (const [key, value] of Object.entries(selected)) {
            newData[key] = null;
          }
          newData.areaCode = selected.areaCode;
          reset(newData);
        } else if (type === "reset") {
          for (const [key, value] of Object.entries(selected)) {
            newData[key] = value;
          }
          reset({
            ...newData,
          });
        }
      }
    };
    const crud = async (type: string | null) => {};

    const submit = async (data: ICC1500FORM) => {};

    return (
      <form
        onSubmit={handleSubmit(submit)} autoComplete="off"
        style={{ width: "410px", padding: "10px 10px 0" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "75vh",
          }}
        >
          <div>
            <FormGroup>
              <Label>영 업 소</Label>
              <Select
                register={register("areaCode")}
                width={InputSize.i150}
                disabled={!isAddBtnClicked}
              >
                {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <FormGroup>
              <Label>일 자 </Label>
              <Controller
                control={control}
                {...register("cjDate")}
                render={({ field: { onChange, value, name } }) => (
                  <CustomDatePicker
                    style={{ width: "150px" }}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </FormGroup>
            <FormGroup>
              <Label>차 량</Label>
              <Select register={register("cjCaCode")} width={InputSize.i150}>
                {dataCommonDic?.cjCaCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <FormGroup>
              <Label>정 비 명</Label>
              <Select register={register("cjCcCode")} width={InputSize.i150}>
                {dataCommonDic?.cjCcCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <br />

            <Input
              label="금 액"
              register={register("cjKumack")}
              inputSize={InputSize.i150}
              textAlign="right"
              mask={currencyMask}
            />
            <FormGroup>
              <Label>사 원</Label>
              <Select register={register("cjSwCode")} width={InputSize.i150}>
                {dataCommonDic?.cjSwCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <Input
              label="비 고"
              register={register("cjBigo")}
              inputSize={InputSize.i150}
            />
            <br />
            <br />
            <Input
              label="주 유 량"
              register={register("cjOilL")}
              inputSize={InputSize.i150}
              textAlign="right"
            />
            <Input
              label="단 가"
              register={register("cjOilDanga")}
              inputSize={InputSize.i150}
              textAlign="right"
            />
            <Input
              label="주유금액"
              register={register("cjKumackOil")}
              inputSize={InputSize.i150}
              textAlign="right"
            />
            <br />
            <Input
              label="누적주행"
              register={register("cjCarKg")}
              inputSize={InputSize.i150}
              textAlign="right"
            />
            <FormGroup>
              <Label>사 원</Label>
              <Select register={register("cjSwCodeOil")} width={InputSize.i150}>
                {dataCommonDic?.cjSwCodeOil?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <Input
              label="비 고"
              register={register("cjBigoOil")}
              inputSize={InputSize.i150}
            />
          </div>
          <div>
            <p
              style={{
                color: "#00BEFF",
                fontSize: "15px",
                width: "90%",
                padding: "20px",
              }}
            >
              ☞ 가불 반제 처리는 '- '금액으로 입력하며
              <br />
              매월 급여 공제시에는 반제처리 합니다.
            </p>
            <DividerGray />
            <Input
              label="기간별 합계"
              register={register("totGabul")}
              inputSize={InputSize.i150}
              textAlign="right"
            />
          </div>
        </div>
      </form>
    );
  }
);

export default Form;
