import React, { useImperativeHandle, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import API from "app/axios";
import { EN2000INSERT, EN2000UPDATE, EN2000DELETE, EN200011 } from "app/path";
import {
  Input,
  Wrapper,
  Divider,
  FormGroup,
  Label,
} from "components/form/style";
import { InfoText } from "components/text";
import { InfoDesc } from "../../commonStyle";
import CheckBox from "components/checkbox";
import { ICARJBC, emptyObj } from "./model";
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
    const { register, handleSubmit, reset, getValues, setFocus } =
      useForm<ICARJBC>({
        mode: "onChange",
      });

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      crud,
      resetForm,
    }));

    const fetchCode11 = async () => {
      try {
        const response: any = await API.get(EN200011);
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

    const resetForm = async (type: string) => {
      if (type === "clear") {
        setFocus("ccName");
        try {
          const temp = await fetchCode11();
          if (temp !== null) {
            emptyObj.ccCode = temp.tempCode;
            reset(emptyObj);
          }
        } catch (err: any) {
          console.log("areaCode generate error:", err);
        }
        return;
      }

      if (type === "reset") {
        if (selected !== undefined && Object.keys(selected).length > 0) {
          reset({
            ...selected,
            ccOilYn: selected?.ccOilYn === "Y",
          });
        }
        return;
      }
    };

    const crud = async (type: string | null) => {
      if (type === "delete") {
        const formValues = getValues();

        try {
          const response: any = await API.post(EN2000DELETE, formValues);
          if (response.status === 200) {
            toast.success("삭제하였습니다", {
              autoClose: 500,
            });
            await fetchData("delete");
          } else {
            alert(response?.response?.message);
            return;
          }
        } catch (err) {
          console.log(err);
        }
      }

      if (type === null) {
        handleSubmit(submit)();
      }
    };

    const submit = async (data: ICARJBC) => {
      //form aldaagui uyd ajillana
      const path = isAddBtnClicked ? EN2000INSERT : EN2000UPDATE;
      const formValues = getValues();
      formValues.ccOilYn = formValues.ccOilYn ? "Y" : "N";

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
        style={{ width: "380px", padding: "0px 10px" }}
        autoComplete="off"
      >
        <Wrapper>
          <Input
            label="코 드"
            register={register("ccCode")}
            maxLength="2"
            readOnly
            inputSize={InputSize.i80}
          />
        </Wrapper>
        <Divider />
        <Wrapper>
          <Input
            label="정비명"
            register={register("ccName")}
            maxLength="30"
            fullWidth
          />
        </Wrapper>

        <Wrapper>
          <Input
            label="비 고"
            register={register("ccBigo")}
            fullWidth
            maxLength="50"
          />
        </Wrapper>

        <Wrapper>
          <FormGroup>
            <Label>유류비계정 유무</Label>
            <CheckBox title="" rtl register={register("ccOilYn")} />
          </FormGroup>
        </Wrapper>

        <InfoDesc>
          <InfoText text="유류비는 주유현황과 연동됩니다." />
        </InfoDesc>
      </form>
    );
  }
);

export default Form;
