import React, { useImperativeHandle, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import API from "app/axios";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { EN1400INSERT, EN1400UPDATE, EN1400DELETE, EN140011 } from "app/path";
import {
  Input,
  Select,
  Field,
  FormGroup,
  Wrapper,
  Divider,
  Label,
} from "components/form/style";
import { IBUPUM, emptyObj } from "./model";
import {
  currencyMask,
  formatCurrencyRemoveComma,
  removeCommas,
} from "helpers/currency";
import { InputSize } from "components/componentsType";

interface IForm {
  selected: any;
  setSelected: any;
  fetchData: any;
  setData: any;
  selectedRowIndex: number;
  setSelectedRowIndex: Function;
  isAddBtnClicked: boolean;
  setIsAddBtnClicked: Function;
  resetButtonCombination: Function;
}

const Form = React.forwardRef(
  (
    {
      selected,
      setSelected,
      fetchData,
      setData,
      selectedRowIndex,
      setSelectedRowIndex,
      isAddBtnClicked,
      setIsAddBtnClicked,
      resetButtonCombination,
    }: IForm,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const [areaCode, setAreaCode] = useState("");

    const { data: dataCommonDic } = useGetCommonDictionaryQuery({
      groupId: "EN",
      functionName: "EN1400",
    });

    const { register, handleSubmit, reset, getValues, control, setFocus } =
      useForm<IBUPUM>({ mode: "onChange" });

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      crud,
      resetForm,
    }));

    const fetchCode11 = async (code: string) => {
      try {
        const response: any = await API.get(EN140011, {
          params: { areaCode: code },
        });

        if (response.status === 200) {
          return response?.data?.tempCode;
        } else {
          alert(response.response.data?.message);
          resetButtonCombination();
        }
        return null;
      } catch (err) {
        console.log(err);
      }
    };

    const codeChangeHandler = async (aCode: any) => {
      try {
        const tempCode = await fetchCode11(aCode);

        if (tempCode !== null) {
          setFocus("bpName");
          emptyObj.bpCode = tempCode;
          reset(emptyObj);
        }
      } catch (err: any) {
        console.log("bpCode generate error", err);
      }
    };

    const resetForm = async (type: string) => {
      if (type === "clear") {
        await codeChangeHandler(areaCode);
        return;
      }

      if (type === "reset") {
        if (selected !== undefined && Object.keys(selected)?.length > 0) {
          if (areaCode !== selected.areaCode) {
            setAreaCode(selected.areaCode);
          }
          reset({
            ...selected,
          });
        }
        return;
      }
    };

    const crud = async (type: string | null) => {
      if (type === "delete") {
        const formValues = getValues();

        try {
          const response: any = await API.post(EN1400DELETE, formValues);
          if (response.status === 200) {
            toast.success("삭제하였습니다", {
              autoClose: 500,
            });
            await fetchData("delete");
          } else {
            alert(response?.response?.message);
          }
        } catch (err) {
          console.log(err);
        }
      }

      if (type === null) {
        handleSubmit(submit)();
      }
    };

    const submit = async (data: IBUPUM) => {
      //form aldaagui uyd ajillana
      const path = isAddBtnClicked ? EN1400INSERT : EN1400UPDATE;
      const formValues = getValues();
      isAddBtnClicked && (formValues.areaCode = areaCode);
      formValues.bpIndanga = removeCommas(formValues.bpIndanga).toString();
      formValues.bpOutdanga = removeCommas(formValues.bpOutdanga).toString();

      try {
        const response: any = await API.post(path, formValues);
        if (response.status === 200) {
          if (isAddBtnClicked) {
            setData((prev: any) => [formValues, ...prev]);
            setSelectedRowIndex(0);
            setIsAddBtnClicked(false);
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
        } else {
          alert(response.response.data?.message);
        }
      } catch (err: any) {
        console.log(err);
      }
    };

    return (
      <form
        onSubmit={handleSubmit(submit)}
        style={{ width: "300px", padding: "0px 10px" }}
        autoComplete="off"
      >
        <Wrapper>
          <FormGroup>
            <Label style={{ minWidth: "80px" }}>영 업 소</Label>
            <Select
              value={areaCode}
              onChange={(e) => {
                setAreaCode(e.target.value);
                codeChangeHandler(e.target.value);
              }}
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
        </Wrapper>
        <Wrapper>
          <Input
            label="부품 코드"
            labelStyle={{ minWidth: "80px" }}
            register={register("bpCode")}
            inputSize={InputSize.i150}
            maxLength="3"
            readOnly
          />
        </Wrapper>
        <Divider />
        <Wrapper>
          <Input
            label="부 품 명"
            labelStyle={{ minWidth: "80px" }}
            register={register("bpName")}
            inputSize={InputSize.i150}
            maxLength="20"
          />
        </Wrapper>
        <Wrapper>
          <Input
            label="규 격"
            labelStyle={{ minWidth: "80px" }}
            register={register("bpType")}
            inputSize={InputSize.i150}
            maxLength="10"
          />
        </Wrapper>
        <Wrapper>
          <Input
            label="단 위"
            labelStyle={{ minWidth: "80px" }}
            register={register("bpDanwi")}
            inputSize={InputSize.i150}
            maxLength="10"
          />
        </Wrapper>
        <Divider />
        <Wrapper>
          <Field flex>
            <Controller
              control={control}
              {...register("bpIndanga")}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="매입단가"
                  labelStyle={{ minWidth: "80px" }}
                  value={value}
                  onChange={onChange}
                  mask={currencyMask}
                  textAlign="right"
                  inputSize={InputSize.i150}
                  name={name}
                />
              )}
            />
            <p>원</p>
          </Field>
        </Wrapper>
        <Wrapper>
          <Field flex>
            <Controller
              control={control}
              {...register("bpOutdanga")}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="판매단가"
                  labelStyle={{ minWidth: "80px" }}
                  value={value}
                  onChange={onChange}
                  mask={currencyMask}
                  textAlign="right"
                  inputSize={InputSize.i150}
                  name={name}
                />
              )}
            />
            <p>원</p>
          </Field>
        </Wrapper>
      </form>
    );
  }
);

export default Form;
