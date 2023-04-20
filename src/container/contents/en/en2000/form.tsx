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
import { ICARJBC } from "./model";
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
    useEffect(() => {
      if (JSON.stringify(selected) !== "{}") {
        reset({
          ...selected,
          swWorkOut: selected?.swWorkOut === "Y",
        });
      }
    }, [selected]);

    const { register, handleSubmit, reset, getValues } = useForm<ICARJBC>({
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
          document.getElementById("ccName")?.focus();
          const path = EN200011;
          try {
            const response: any = await API.get(path, {
              params: { areaCode: selected.areaCode },
            });
            if (response.status === 200) {
              for (const [key, value] of Object.entries(selected)) {
                newData[key] = null;
              }
              newData.ccCode = response.data.tempCode;
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
          const response = await API.post(EN2000DELETE, formValues);
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

    const submit = async (data: ICARJBC) => {
      //form aldaagui uyd ajillana
      const path = isAddBtnClicked ? EN2000INSERT : EN2000UPDATE;
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

    return (
      <form
        onSubmit={handleSubmit(submit)}
        style={{ width: "400px", padding: "0px 50px 0 10px" }}
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
            <CheckBox title="" rtl register={{ ...register("ccOilYn") }} />
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
