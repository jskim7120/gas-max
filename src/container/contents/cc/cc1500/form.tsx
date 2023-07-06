import React, { useImperativeHandle, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Input,
  Select,
  FormGroup,
  Label,
  DividerGray,
} from "components/form/style";
import { ICC1500, emptyObj } from "./model";
import CustomDatePicker from "components/customDatePicker";
import { InputSize } from "components/componentsType";
import { currencyMask } from "helpers/currency";

interface IForm {
  data65: any;
  setData65: Function;
  fetchData: any;
  setData: any;
  selected: any;
  setSelected: any;
  dataCommonDic: any;
  isAddBtnClicked: boolean;
}

const Form = React.forwardRef(
  (
    {
      data65,
      setData65,
      fetchData,
      setData,
      selected,
      setSelected,
      dataCommonDic,
      isAddBtnClicked,
    }: IForm,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const { register, handleSubmit, control, reset } = useForm<ICC1500>({
      mode: "onChange",
    });

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
        document.getElementById("acjDate")?.focus();
        reset(emptyObj);
      } else if (type === "reset") {
        reset(selected);
      }
    };
    const crud = async (type: string | null) => {};

    const submit = async (data: ICC1500) => {};

    return (
      <form
        onSubmit={handleSubmit(submit)}
        autoComplete="off"
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
                name="cjDate"
                render={({ field }) => (
                  <CustomDatePicker style={{ width: "150px" }} {...field} />
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
