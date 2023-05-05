import React, { useImperativeHandle, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import API from "app/axios";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { EN1900INSERT, EN1900UPDATE, EN1900DELETE, EN190011 } from "app/path";
import {
  Input,
  Select,
  Divider,
  FormGroup,
  Label,
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
    const { data: dataCommonDic } = useGetCommonDictionaryQuery({
      groupId: "EN",
      functionName: "EN1900",
    });

    const { register, handleSubmit, reset, getValues, setFocus } =
      useForm<ICUSTGUBUN>({
        mode: "onChange",
      });

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      crud,
      resetForm,
    }));

    const fetchCode11 = async (code: string) => {
      try {
        const response: any = await API.get(EN190011, {
          params: { areaCode: code },
        });
        if (response.status === 200) {
          return response?.data;
        } else {
          alert(response?.response?.data?.message);
          resetButtonCombination();
        }
        return null;
      } catch (err) {
        console.log(err);
      }
    };

    const codeChangeHandler = async (aCode: any) => {
      try {
        const temp = await fetchCode11(aCode);
        if (temp !== null) {
          setFocus("gubunName");
          emptyObj.gubunCode = temp.tempCode;
          reset(emptyObj);
        }
      } catch (err: any) {
        console.log("gubunCode generate error:", err);
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

        try {
          const response: any = await API.post(EN1900DELETE, formValues);
          if (response.status === 200) {
            toast.success("삭제하였습니다", {
              autoClose: 500,
            });
            await fetchData("pos");
          } else {
            alert(response?.response?.data?.message);
          }
        } catch (err) {
          console.log(err);
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
      isAddBtnClicked && (formValues.areaCode = areaCode);
      try {
        const response: any = await API.post(path, formValues);
        if (response.status === 200) {
          if (isAddBtnClicked) {
            setIsAddBtnClicked(false);
            await fetchData("pos");
          } else {
            await fetchData();
          }

          toast.success("저장이 성공하였습니다", {
            autoClose: 500,
          });
        } else {
          alert(response?.response?.data?.message);
        }
      } catch (err: any) {
        console.log(err);
      }
    };

    return (
      <form
        onSubmit={handleSubmit(submit)}
        style={{ width: "395px", padding: "0px 10px" }}
        autoComplete="off"
      >
        <FormGroup>
          <Input
            label="코 드"
            labelStyle={{ minWidth: "50px" }}
            register={register("gubunCode")}
            maxLength="2"
            readOnly
            inputSize={InputSize.i80}
          />

          <Label style={{ minWidth: "83px" }}>영 업 소</Label>
          <Select
            value={areaCode}
            onChange={(e) => {
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
            labelStyle={{ minWidth: "50px" }}
            register={register("gubunName")}
            maxLength="20"
            inputSize={InputSize.i300}
          />
        </FormGroup>
        <FormGroup>
          <Input
            label="비 고"
            labelStyle={{ minWidth: "50px" }}
            register={register("gubunBigo")}
            maxLength="20"
            inputSize={InputSize.i300}
          />
        </FormGroup>
      </form>
    );
  }
);

export default Form;
