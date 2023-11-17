import React, { useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { apiGet, apiPost } from "app/axios";
import { EN2000INSERT, EN2000UPDATE, EN2000DELETE, EN200011 } from "app/path";
import { Input, Divider, FormGroup, CustomForm } from "components/form/style";
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
        if (selected !== undefined && Object.keys(selected)?.length > 0) {
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
          width: "857px",
          padding: "6px 7px 0 10px",
        }}
        autoComplete="off"
      >
        <FormGroup>
          <Input
            label="코 드"
            register={register("ccCode")}
            maxLength="2"
            readOnly={!isAddBtnClicked}
            inputSize={InputSize.i80}
          />
        </FormGroup>
        <Divider />
        <FormGroup>
          <Input
            label="정비명"
            register={register("ccName")}
            maxLength="30"
            style={{ width: "440px" }}
          />
        </FormGroup>

        <FormGroup>
          <Input
            label="비 고"
            register={register("ccBigo")}
            maxLength="50"
            style={{ width: "715px" }}
          />
        </FormGroup>

        <FormGroup>
          <CheckBox
            title="유류비계정 유무"
            register={register("ccOilYn")}
            style={{ marginLeft: "145px" }}
          />
        </FormGroup>
        <InfoDesc style={{ margin: "15px 0 0 145px" }}>
          <InfoText text="유류비는 주유현황과 연동됩니다." />
        </InfoDesc>
      </CustomForm>
    );
  }
);

export default Form;
