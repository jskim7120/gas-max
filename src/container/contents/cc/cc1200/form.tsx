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
import { ICC1200SEARCH } from "./model";
import { currencyMask, formatCurrencyRemoveComma } from "helpers/currency";
import { InputSize } from "components/componentsType";

interface IForm {
  selected: any;
  fetchData: any;
  setData: any;
  selectedRowIndex: number;
  setSelected: any;
  setSelectedRowIndex: any;
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
    }: IForm,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);
    const { data: dataCommonDic } = useGetCommonDictionaryQuery({
      groupId: "CC",
      functionName: "CC1200",
    });

    const { register, handleSubmit, reset, getValues, control } =
      useForm<ICC1200SEARCH>({ mode: "onChange" });

    useEffect(() => {
      if (selected !== undefined && JSON.stringify(selected) !== "{}") {
        resetForm("reset");
      }
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
          document.getElementById("bpName")?.focus();
          const path = EN140011;

          try {
            const response: any = await API.get(path, {
              params: { areaCode: selected.areaCode },
            });
            if (response.status === 200) {
              for (const [key, value] of Object.entries(selected)) {
                newData[key] = null;
              }
              newData.bpCode = response.data.tempCode;
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
          });
        }
      }
    };
    const crud = async (type: string | null) => {
      if (type === "delete") {
        const formValues = getValues();

        try {
          const response = await API.post(EN1400DELETE, formValues);
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

    const submit = async (data: ICC1200SEARCH) => {
      //form aldaagui uyd ajillana
      const path = isAddBtnClicked ? EN1400INSERT : EN1400UPDATE;
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
          setIsAddBtnClicked(false);
          toast.success("저장이 성공하였습니다", {
            autoClose: 500,
          });
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

    const handleSelectCode = async (event: any) => {
      let newData: any = {};
      const path = EN140011;
      try {
        const response: any = await API.get(path, {
          params: { areaCode: event.target.value },
        });
        if (response.status === 200) {
          for (const [key, value] of Object.entries(selected)) {
            newData[key] = value;
          }
          newData.bpCode = response.data.tempCode;
          newData.areaCode = event.target.value;
          reset(newData);
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
        style={{ width: "380px", padding: "0px 10px" }}
      >
        <Wrapper>
          <Input
            label="영 업 소"
            labelStyle={{ minWidth: "80px" }}
            register={register("cbareaCode")}
            inputSize={InputSize.i80}
            maxLength="3"
            readOnly={isAddBtnClicked}
          />
        </Wrapper>
        <Divider />
        <Wrapper>
          <Input
            label="일 자"
            labelStyle={{ minWidth: "80px" }}
            register={register("acjDate")}
            inputSize={InputSize.i250}
            maxLength="20"
          />
        </Wrapper>
        <Wrapper>
          <Input
            label="차 변"
            labelStyle={{ minWidth: "80px" }}
            register={register("chGubun")}
            inputSize={InputSize.i250}
            maxLength="10"
          />
        </Wrapper>
        <Wrapper>
          <Input
            label="계정과목"
            labelStyle={{ minWidth: "80px" }}
            register={register("acjAccCodeCh")}
            inputSize={InputSize.i250}
            maxLength="10"
          />
        </Wrapper>
        <Divider />
        <Wrapper>
          <Field flex>
            <p>대 변</p>
            <Controller
              control={control}
              {...register("daGubun")}
              render={({ field: { onChange, name } }) => (
                <Input
                  label="판매단가"
                  labelStyle={{ minWidth: "80px" }}
                  onChange={onChange}
                  mask={currencyMask}
                  textAlign="right"
                  inputSize={InputSize.i130}
                  name={name}
                />
              )}
            />
          </Field>
        </Wrapper>
      </form>
    );
  }
);

export default Form;
