import React, { useImperativeHandle, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { apiGet, apiPost } from "app/axios";
import { useGetCommonDictionaryMutation } from "app/api/commonDictionary";
import { EN1900INSERT, EN1900UPDATE, EN1900DELETE, EN190011 } from "app/path";
import {
  Input,
  Select,
  Divider,
  FormGroup,
  Label,
  CustomForm,
} from "components/form/style";
import { ICUSTGUBUN, emptyObj } from "./model";
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
      useForm<ICUSTGUBUN>({
        mode: "onChange",
      });

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      crud,
      resetForm,
    }));

    useEffect(() => {
      getCommonDictionary({ groupId: "EN", functionName: "EN1900" });
    }, []);

    const codeChangeHandler = async (aCode: any) => {
      const res = await apiGet(EN190011, { areaCode: aCode });
      if (res !== null) {
        setFocus("gubunName");
        emptyObj.gubunCode = res.tempCode;
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
          EN1900DELETE,
          formValues,
          "삭제하였습니다"
        );
        res && (await fetchData());
      }

      if (type === null) {
        handleSubmit(submit)();
      }
    };

    const submit = async (data: ICUSTGUBUN) => {
      //form aldaagui uyd ajillana
      const path = isAddBtnClicked ? EN1900INSERT : EN1900UPDATE;
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
      <CustomForm
        onSubmit={handleSubmit(submit)}
        style={{
          width: "442px",
          padding: "6px 7px 0 10px",
        }}
        autoComplete="off"
      >
        <FormGroup>
          <Input
            label="코 드"
            register={register("gubunCode")}
            maxLength="2"
            readOnly={!isAddBtnClicked}
            inputSize={InputSize.i80}
          />

          <Label style={{ minWidth: "84px" }}>영 업 소</Label>
          <Select
            value={areaCode}
            onChange={(e: any) => {
              setAreaCode(e.target.value);
              codeChangeHandler(e.target.value);
            }}
            name="areaCode"
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
            register={register("gubunName")}
            maxLength="10"
            inputSize={InputSize.i170}
          />
        </FormGroup>
        <FormGroup>
          <Input
            label="비 고"
            register={register("gubunBigo")}
            maxLength="20"
            inputSize={InputSize.i300}
          />
        </FormGroup>
      </CustomForm>
    );
  }
);

export default Form;
