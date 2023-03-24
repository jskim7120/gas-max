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
import { ICC1400FORM } from "./model";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import CustomDatePicker from "components/customDatePicker";
import { InputSize } from "components/componentsType";
import { currencyMask } from "helpers/currency";
import API from "app/axios";
import { EN1200INSERT, EN1200UPDATE, EN1200DELETE, EN120011 } from "app/path";

interface IForm {
  selected: any;
  fetchData: any;
  setData: any;
  selectedRowIndex: number;
  setSelected: any;
  setSelectedRowIndex: any;
  isAddBtnClicked: boolean;
  setIsAddBtnClicked: Function;
}

const Form = React.forwardRef(
  (
    {
      selected,
      fetchData,
      setData,
      selectedRowIndex,
      setSelected,
      setSelectedRowIndex,
      isAddBtnClicked,
      setIsAddBtnClicked,
    }: IForm,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const { data: dataCommonDic } = useGetCommonDictionaryQuery({
      groupId: "EN",
      functionName: "EN1200",
    });

    const { register, handleSubmit, control, reset, getValues } =
      useForm<ICC1400FORM>({ mode: "onChange" });

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
      if (selected !== undefined && JSON.stringify(selected) !== "{}") {
        let newData: any = {};
        if (type === "clear") {
          document.getElementById("sgDate")?.focus();
          const path = EN120011;
          try {
            const response: any = await API.get(path, {
              params: { areaCode: selected.areaCode },
            });
            if (response.status === 200) {
              for (const [key, value] of Object.entries(selected)) {
                newData[key] = null;
              }
              newData.saupSno = response.data.tempCode;
              newData.areaCode = selected.areaCode;
              reset(newData);
            } else {
              toast.error(response.response.data?.message, {
                autoClose: 500,
              });
            }
          } catch (err: any) {
            console.log("areaCode select error", err);
          }
        } else if (type === "reset") {
          for (const [key, value] of Object.entries(selected)) {
            newData[key] = value;
          }

          reset({
            ...newData,
            saupStampQu: selected?.saupStampQu === "Y",
            saupStampEs: selected?.saupStampEs === "Y",
            saupStampSe: selected?.saupStampSe === "Y",
            // saupDate: selected?.saupDate ? formatDate(selected.saupDate) : "",
            // saupDate: selected?.saupDate ? DateWithDash(selected.saupDate) : "",
          });
        }
      }
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

    const submit = async (data: ICC1400FORM) => {
      //form aldaagui uyd ajillana
      const path = isAddBtnClicked ? EN1200INSERT : EN1200UPDATE;
      const formValues = getValues();

      //formValues.saupStampQu = formValues.saupStampQu ? "Y" : "N";
      //formValues.saupDate = formValues.saupDate
      //  ? formatDateToStringWithoutDash(formValues.saupDate)
      //  : "";
      //formValues.saupEdiEmail =
      //  formValues.saupEdiEmail && formValues.saupEdiEmail.trim();

      //formValues.saupStampImg = image64 && image64;

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
        style={{ width: "410px", padding: "20px 10px" }}
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
              <Label>일자 </Label>
              <Controller
                control={control}
                {...register("sgDate")}
                render={({ field: { onChange, value, name } }) => (
                  <CustomDatePicker
                    value={value}
                    onChange={onChange}
                    name={name}
                    style={{ width: "200px" }}
                  />
                )}
              />
            </FormGroup>
            <FormGroup>
              <Label>사원</Label>
              <Select {...register("sgSwCode")} width={InputSize.i200}>
                {dataCommonDic?.sgSwCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <Input
              label="가불합계"
              register={register("gabulSum")}
              inputSize={InputSize.i200}
              textAlign="right"
            />
            <br />

            <Input
              label="금액"
              register={register("sgKumack")}
              inputSize={InputSize.i200}
              textAlign="right"
              mask={currencyMask}
            />
            <Input
              label="비고"
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
