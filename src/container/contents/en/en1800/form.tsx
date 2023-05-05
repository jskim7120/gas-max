import React, { useImperativeHandle, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import API from "app/axios";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { EN1800INSERT, EN1800UPDATE, EN1800DELETE, EN180011 } from "app/path";
import {
  Input,
  Select,
  Wrapper,
  Divider,
  FormGroup,
  Label,
} from "components/form/style";
import { ICUSTJY, emptyObj } from "./model";
import { InputSize } from "components/componentsType";

interface IForm {
  selected: any;
  setSelected: any;
  fetchData: any;
  setData: any;
  // selectedRowIndex: number;
  // setSelectedRowIndex: Function;
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
      // selectedRowIndex,
      // setSelectedRowIndex,
      isAddBtnClicked,
      setIsAddBtnClicked,
      resetButtonCombination,
    }: IForm,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const [areaCode, setAreaCode] = useState("");
    const { data: dataCommonDic } = useGetCommonDictionaryQuery({
      groupId: "EN",
      functionName: "EN1800",
    });

    const { register, handleSubmit, reset, getValues, setFocus } =
      useForm<ICUSTJY>({
        mode: "onChange",
      });

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      crud,
      resetForm,
    }));

    const fetchCode11 = async (code: string) => {
      try {
        const response: any = await API.get(EN180011, {
          params: { areaCode: code },
        });
        if (response.status === 200) {
          return response?.data;
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
        const temp = await fetchCode11(aCode);
        if (temp !== null) {
          setFocus("jyName");
          emptyObj.jyCode = temp.tempCode;
          reset(emptyObj);
        }
      } catch (err: any) {
        console.log("jyCode generate error:", err);
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
          const response: any = await API.post(EN1800DELETE, formValues);
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

    const submit = async (data: ICUSTJY) => {
      //form aldaagui uyd ajillana
      const path = isAddBtnClicked ? EN1800INSERT : EN1800UPDATE;
      const formValues = getValues();
      isAddBtnClicked && (formValues.areaCode = areaCode);
      try {
        const response: any = await API.post(path, formValues);

        if (response.status === 200) {
          if (isAddBtnClicked) {
            setData((prev: any) => [formValues, ...prev]);
            // setSelectedRowIndex(0);
            setIsAddBtnClicked(false);
          } else {
            // setData((prev: any) => {
            //   prev[selectedRowIndex] = formValues;
            //   return [...prev];
            // });
            fetchData();
          }
          setSelected(formValues);
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
        style={{ width: "400px", padding: "0px 10px" }}
        autoComplete="off"
      >
        <Wrapper>
          <Input
            label="코 드"
            labelStyle={{ minWidth: "50px" }}
            register={register("jyCode")}
            maxLength="2"
            readOnly
            inputSize={InputSize.i80}
          />

          <FormGroup>
            <Label style={{ minWidth: "83px" }}>영 업 소</Label>
            <Select
              value={areaCode}
              onChange={(e) => {
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
        </Wrapper>
        <Divider />
        <Wrapper>
          <Input
            label="분류명"
            labelStyle={{ minWidth: "50px" }}
            register={register("jyName")}
            inputSize={InputSize.i300}
          />
        </Wrapper>

        <Wrapper>
          <Input
            label="비 고"
            labelStyle={{ minWidth: "50px" }}
            register={register("jyBigo")}
            inputSize={InputSize.i300}
          />
        </Wrapper>
      </form>
    );
  }
);

export default Form;
