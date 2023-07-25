import React, { useImperativeHandle, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { apiGet, apiPost } from "app/axios";
import { useGetCommonDictionaryMutation } from "app/api/commonDictionary";
import { EN1800INSERT, EN1800UPDATE, EN1800DELETE, EN180011 } from "app/path";
import {
  Input,
  Select,
  Divider,
  FormGroup,
  Label,
} from "components/form/style";
import { ICUSTJY, emptyObj } from "./model";
import { InputSize } from "components/componentsType";

interface IForm {
  selected: any;
  fetchData: Function;
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

    const { register, handleSubmit, reset, getValues, setFocus } =
      useForm<ICUSTJY>({
        mode: "onChange",
      });

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      crud,
      resetForm,
    }));

    useEffect(() => {
      getCommonDictionary({ groupId: "EN", functionName: "EN1800" });
    }, []);

    const codeChangeHandler = async (aCode: any) => {
      const res = await apiGet(EN180011, { areaCode: aCode });
      if (res) {
        setFocus("jyName");
        emptyObj.jyCode = res.tempCode;
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
          setAreaCode(selected.areaCode);
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

        const res: any = await apiPost(
          EN1800DELETE,
          formValues,
          "삭제하였습니다"
        );
        res && (await fetchData());
      }

      if (type === null) {
        handleSubmit(submit)();
      }
    };

    const submit = async (data: ICUSTJY) => {
      //form aldaagui uyd ajillana
      const path = isAddBtnClicked ? EN1800INSERT : EN1800UPDATE;
      const formValues = getValues();
      isAddBtnClicked && (formValues.areaCode = areaCode);

      const res: any = await apiPost(path, formValues, "저장이 성공하였습니다");

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
        style={{ width: "400px", padding: "0px 10px" }}
        autoComplete="off"
      >
        <FormGroup>
          <Input
            label="코 드"
            labelStyle={{ minWidth: "50px" }}
            register={register("jyCode")}
            maxLength="2"
            readOnly
            inputSize={InputSize.i80}
          />

          <Label style={{ minWidth: "83px" }}>영 업 소</Label>
          <Select
            value={areaCode}
            onChange={(e: any) => {
              setAreaCode(e.target.value);
              codeChangeHandler(e.target.value);
            }}
            width={InputSize.i130}
            disabled={!isAddBtnClicked}
          >
            {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
        <Divider />
        <FormGroup>
          <Input
            label="분류명"
            labelStyle={{ minWidth: "50px" }}
            register={register("jyName")}
            inputSize={InputSize.i300}
          />
        </FormGroup>

        <FormGroup>
          <Input
            label="비 고"
            labelStyle={{ minWidth: "50px" }}
            register={register("jyBigo")}
            inputSize={InputSize.i300}
          />
        </FormGroup>
      </form>
    );
  }
);

export default Form;
