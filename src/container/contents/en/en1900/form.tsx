import React, { useImperativeHandle, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import API from "app/axios";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { EN1900INSERT, EN1900UPDATE, EN1900DELETE, EN190011 } from "app/path";
import {
  Input,
  Select,
  Wrapper,
  Divider,
  FormGroup,
  Label,
} from "components/form/style";
import { ICUSTGUBUN } from "./model";
import { InputSize } from "components/componentsType";

interface IForm {
  selected: any;
  fetchData: any;
  setData: any;
  selectedRowIndex: number;
  setSelected: any;
  setSelectedRowIndex: any;
  isAddBtnClicked: boolean;
  setIsAddBtnClicked: Function;
  setIsCancelBtnDisabled: Function;
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
      setIsCancelBtnDisabled,
    }: IForm,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const { data: dataCommonDic } = useGetCommonDictionaryQuery({
      groupId: "EN",
      functionName: "EN1900",
    });

    useEffect(() => {
      if (JSON.stringify(selected) !== "{}") {
        reset({
          ...selected,
          swWorkOut: selected?.swWorkOut === "Y",
        });
      }
    }, [selected]);

    const { register, handleSubmit, reset, getValues } = useForm<ICUSTGUBUN>({
      mode: "onChange",
    });

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      crud,
      resetForm,
    }));

    const resetForm = async (type: string) => {
      if (selected !== undefined && JSON.stringify(selected) !== "{}") {
        let newData: any = {};

        if (type === "clear") {
          document.getElementById("gubunName")?.focus();
          const path = EN190011;
          try {
            const response: any = await API.get(path, {
              params: { areaCode: selected.areaCode },
            });
            if (response.status === 200) {
              for (const [key, value] of Object.entries(selected)) {
                newData[key] = null;
              }
              newData.gubunCode = response.data.tempCode;
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
            swWorkOut: selected?.swWorkOut === "Y",
          });
        }
      }
    };
    const crud = async (type: string | null) => {
      if (type === "delete") {
        const formValues = getValues();

        try {
          const response = await API.post(EN1900DELETE, formValues);
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

    const submit = async (data: ICUSTGUBUN) => {
      //form aldaagui uyd ajillana
      const path = isAddBtnClicked ? EN1900INSERT : EN1900UPDATE;
      const formValues = getValues();

      try {
        const response: any = await API.post(path, formValues);
        if (response.status === 200) {
          if (isAddBtnClicked) {
            setData((prev: any) => [formValues, ...prev]);
            setSelectedRowIndex(0);
            setIsAddBtnClicked(false);
            setIsCancelBtnDisabled(true);
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
          toast.error(response?.message, {
            autoClose: 500,
          });
        }
      } catch (err: any) {
        toast.error(err?.message, {
          autoClose: 500,
        });
      }
    };

    const handleSelectCode = async (event: any) => {
      let newData: any = {};
      const path = EN190011;
      try {
        const response: any = await API.get(path, {
          params: { areaCode: event.target.value },
        });
        if (response.status === 200) {
          for (const [key, value] of Object.entries(selected)) {
            newData[key] = null;
          }
          newData.gubunCode = response.data.tempCode;
          newData.areaCode = event.target.value;
          reset(newData);
          document.getElementById("gubunName")?.focus();
        } else {
          toast.error(response.response.data?.message, {
            autoClose: 500,
          });
        }
      } catch (err: any) {
        console.log("areaCode select error", err);
      }
    };

    return (
      <form
        onSubmit={handleSubmit(submit)}
        style={{ width: "401px", padding: "0px 10px" }}
      >
        <Wrapper>
          <Input
            label="코 드"
            labelStyle={{ minWidth: "50px" }}
            register={register("gubunCode")}
            maxLength="2"
            readOnly
            inputSize={InputSize.i80}
          />

          <FormGroup>
            <Label style={{ minWidth: "83px" }}>영 업 소</Label>
            <Select
              {...register("areaCode")}
              onChange={handleSelectCode}
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
        </Wrapper>
        <Divider />
        <Wrapper>
          <Input
            label="분류명"
            labelStyle={{ minWidth: "50px" }}
            register={register("gubunName")}
            maxLength="20"
            inputSize={InputSize.i300}
          />
        </Wrapper>
        <Wrapper>
          <Input
            label="비 고"
            labelStyle={{ minWidth: "50px" }}
            register={register("gubunBigo")}
            maxLength="20"
            inputSize={InputSize.i300}
          />
        </Wrapper>
      </form>
    );
  }
);

export default Form;
