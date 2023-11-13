import React, { useImperativeHandle, useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { apiGet, apiPost } from "app/axios";
import { useGetCommonDictionaryMutation } from "app/api/commonDictionary";
import { EN1400INSERT, EN1400UPDATE, EN1400DELETE, EN140011 } from "app/path";
import {
  Input,
  Select,
  FormGroup,
  Divider,
  Label,
} from "components/form/style";
import { IBUPUM, emptyObj } from "./model";
import { currencyMask, removeCommas } from "helpers/currency";
import { InputSize } from "components/componentsType";

interface IForm {
  selected: any;
  fetchData: any;
  isAddBtnClicked: boolean;
  setIsAddBtnClicked: Function;
  resetButtonCombination: Function;
}

const Form = React.forwardRef(
  (
    {
      selected,
      fetchData,
      isAddBtnClicked,
      setIsAddBtnClicked,
      resetButtonCombination,
    }: IForm,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const [areaCode, setAreaCode] = useState("");

    const [getCommonDictionary, { data: dataCommonDic }] =
      useGetCommonDictionaryMutation();

    const { register, handleSubmit, reset, getValues, control, setFocus } =
      useForm<IBUPUM>({ mode: "onChange" });

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      crud,
      resetForm,
    }));

    useEffect(() => {
      getCommonDictionary({ groupId: "EN", functionName: "EN1400" });
    }, []);

    const codeChangeHandler = async (aCode: any) => {
      const res = await apiGet(EN140011, { areaCode: aCode });

      if (res) {
        setFocus("bpName");
        emptyObj.bpCode = res.tempCode;
        reset(emptyObj);
      } else {
        resetButtonCombination();
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
        const formValues: any = getValues();
        delete formValues.bpIndanga;
        delete formValues.bpOutdanga;

        const res = await apiPost(EN1400DELETE, formValues, "삭제하였습니다");
        res && (await fetchData());
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

      const res = await apiPost(path, formValues, "저장이 성공하였습니다");
      if (res) {
        if (isAddBtnClicked) {
          setIsAddBtnClicked(false);
          await fetchData("last");
        } else {
          await fetchData();
        }
      }
    };

    return (
      <form
        onSubmit={handleSubmit(submit)}
        style={{
          width: "410px",
          padding: "6px 10px 0",
        }}
        autoComplete="off"
      >
        <FormGroup>
          <Label style={{ minWidth: "80px" }}>영 업 소</Label>
          <Select
            value={areaCode}
            onChange={(e: any) => {
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

        <FormGroup>
          <Input
            label="부품 코드"
            labelStyle={{ minWidth: "80px" }}
            register={register("bpCode")}
            inputSize={InputSize.i150}
            maxLength="3"
            readOnly={!isAddBtnClicked}
          />
        </FormGroup>
        <Divider />
        <FormGroup>
          <Input
            label="부 품 명"
            labelStyle={{ minWidth: "80px" }}
            register={register("bpName")}
            inputSize={InputSize.i300}
            maxLength="20"
          />
        </FormGroup>
        <FormGroup>
          <Input
            label="규 격"
            labelStyle={{ minWidth: "80px" }}
            register={register("bpType")}
            inputSize={InputSize.i170}
            maxLength="10"
          />
        </FormGroup>
        <FormGroup>
          <Input
            label="단 위"
            labelStyle={{ minWidth: "80px" }}
            register={register("bpDanwi")}
            inputSize={InputSize.i170}
            maxLength="10"
          />
        </FormGroup>
        <Divider />
        <FormGroup>
          <Controller
            control={control}
            name="bpIndanga"
            render={({ field }) => (
              <Input
                {...field}
                label="매입단가"
                labelStyle={{ minWidth: "80px" }}
                mask={currencyMask}
                textAlign="right"
                inputSize={InputSize.i150}
              />
            )}
          />
          <p>원</p>
        </FormGroup>
        <FormGroup>
          <Controller
            control={control}
            name="bpOutdanga"
            render={({ field }) => (
              <Input
                {...field}
                label="판매단가"
                labelStyle={{ minWidth: "80px" }}
                mask={currencyMask}
                textAlign="right"
                inputSize={InputSize.i150}
              />
            )}
          />
          <p>원</p>
        </FormGroup>
      </form>
    );
  }
);

export default Form;
