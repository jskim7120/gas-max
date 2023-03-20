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
import API from "app/axios";
import { EN1200INSERT, EN1200UPDATE, EN1200DELETE, EN120011 } from "app/path";

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
      // if (data65 !== undefined && JSON.stringify(data65) !== "{}") {
      let newData: any = {};
      if (type === "clear") {
      } else if (type === "reset") {
        reset(selected);
      }
      // }
    };
    const crud = async (type: string | null) => {
      if (type === "delete") {
        const formValues = getValues();

        try {
          const response = await API.post(EN1200DELETE, formValues);
          if (response.status === 200) {
            toast.success("삭제하였습니다", {
              autoClose: 500,
            });

            await fetchData();
          }
        } catch (err) {
          toast.error("Couldn't delete", {
            autoClose: 500,
          });
        }
      }

      if (type === null) {
        handleSubmit(submit)();
      }
    };

    const submit = async (data: ICC1500FORM) => {
      const path = isAddBtnClicked ? EN1200INSERT : EN1200UPDATE;
      const formValues = getValues();

      try {
        const response: any = await API.post(path, formValues);
        if (response.status === 200) {
          if (isAddBtnClicked) {
            setData((prev: any) => [formValues, ...prev]);
            setSelectedRowIndex(0);
          } else {
            setData((prev: any) => {
              prev[selectedRowIndex] = formValues;
              return [...prev];
            });
          }
          setSelected(formValues);
          toast.success("저장이 성공하였습니다", {
            autoClose: 500,
          });
          setIsAddBtnClicked(false);
        } else {
          toast.error(response.response.data?.message, {
            autoClose: 500,
          });
        }
      } catch (err: any) {
        toast.error(err?.message, {
          autoClose: 500,
        });
      }
    };

    return (
      <form
        onSubmit={handleSubmit(submit)}
        style={{ width: "410px", padding: "0px 10px" }}
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
              <Label>영업소</Label>
              <Select
                {...register("areaCode")}
                width={InputSize.i150}
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
              <Label>일자 </Label>
              <Controller
                control={control}
                {...register("cjDate")}
                render={({ field: { onChange, value, name } }) => (
                  <CustomDatePicker
                    style={{ width: "150px" }}
                    value={value}
                    onChange={onChange}
                    name={name}
                    showYearDropdown
                  />
                )}
              />
            </FormGroup>
            <FormGroup>
              <Label>차량</Label>
              <Select {...register("cjCaCode")} width={InputSize.i150}>
                {dataCommonDic?.cjCaCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <FormGroup>
              <Label>정비명</Label>
              <Select {...register("cjCcCode")} width={InputSize.i150}>
                {dataCommonDic?.cjCcCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <br />

            <Input
              label="금액"
              register={register("cjKumack")}
              inputSize={InputSize.i150}
            />
            <FormGroup>
              <Label>사원</Label>
              <Select {...register("cjSwCode")} width={InputSize.i150}>
                {dataCommonDic?.cjSwCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <Input
              label="비고"
              register={register("cjBigo")}
              inputSize={InputSize.i150}
            />
            <br />
            <br />
            <Input
              label="주유량"
              register={register("cjOilL")}
              inputSize={InputSize.i150}
            />
            <Input
              label="단가"
              register={register("cjOilDanga")}
              inputSize={InputSize.i150}
            />
            <Input
              label="주유금액"
              register={register("cjKumackOil")}
              inputSize={InputSize.i150}
            />
            <br />
            <Input
              label="누적주행"
              register={register("cjCarKg")}
              inputSize={InputSize.i150}
            />
            <FormGroup>
              <Label>사원</Label>
              <Select {...register("cjSwCodeOil")} width={InputSize.i150}>
                {dataCommonDic?.cjCaCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <Input
              label="비고"
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
            />
          </div>
        </div>
      </form>
    );
  }
);

export default Form;
