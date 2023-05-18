import React, { useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { apiGet, apiPost } from "app/axios";
import { EN2000INSERT, EN2000UPDATE, EN2000DELETE, EN200011 } from "app/path";
import { Input, Divider, FormGroup, Label } from "components/form/style";
import { InfoText } from "components/text";
import { InfoDesc } from "../../commonStyle";
import CheckBox from "components/checkbox";
import { ICARJBC, emptyObj } from "./model";
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
    const { register, handleSubmit, reset, getValues, setFocus } =
      useForm<ICARJBC>({
        mode: "onChange",
      });

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      crud,
      resetForm,
    }));

    // const fetchCode11 = async () => {
    //   try {
    //     const response: any = await API.get(EN200011);
    //     if (response.status === 200) {
    //       return response?.data;
    //     } else {
    //       alert(response?.response?.data?.message);
    //       resetButtonCombination();
    //     }
    //     return null;
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };

    const resetForm = async (type: string) => {
      if (type === "clear") {
        setFocus("ccName");

        const res = await apiGet(EN200011);
        if (res) {
          emptyObj.ccCode = res.tempCode;
          reset(emptyObj);
        } else {
          resetButtonCombination();
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

        // try {
        //   const response: any = await API.post(EN2000DELETE, formValues);
        //   if (response.status === 200) {
        //     toast.success("삭제하였습니다", {
        //       autoClose: 500,
        //     });
        //     await fetchData();
        //   } else {
        //     alert(response?.response?.data?.message);
        //     return;
        //   }
        // } catch (err) {
        //   console.log(err);
        // }

        const res: any = await apiPost(
          EN2000DELETE,
          formValues,
          "삭제하였습니다"
        );
        res && (await fetchData());
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

      // try {
      //   const response: any = await API.post(path, formValues);

      //   if (response.status === 200) {
      //     if (isAddBtnClicked) {
      //       setIsAddBtnClicked(false);
      //       await fetchData("pos");
      //     } else {
      //       await fetchData();
      //     }

      //     toast.success("저장이 성공하였습니다", {
      //       autoClose: 500,
      //     });
      //   } else {
      //     alert(response?.response?.data?.message);
      //   }
      // } catch (err: any) {
      //   console.log(err);
      // }

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
        style={{ width: "380px", padding: "0px 10px" }}
        autoComplete="off"
      >
        <FormGroup>
          <Input
            label="코 드"
            register={register("ccCode")}
            maxLength="2"
            readOnly
            inputSize={InputSize.i80}
          />
        </FormGroup>
        <Divider />
        <FormGroup>
          <Input
            label="정비명"
            register={register("ccName")}
            maxLength="30"
            fullWidth
          />
        </FormGroup>

        <FormGroup>
          <Input
            label="비 고"
            register={register("ccBigo")}
            fullWidth
            maxLength="50"
          />
        </FormGroup>

        <FormGroup>
          <FormGroup>
            <Label>유류비계정 유무</Label>
            <CheckBox title="" rtl register={register("ccOilYn")} />
          </FormGroup>
        </FormGroup>

        <InfoDesc>
          <InfoText text="유류비는 주유현황과 연동됩니다." />
        </InfoDesc>
      </form>
    );
  }
);

export default Form;
