import React, { useImperativeHandle, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useDispatch } from "app/store";
import {
  Input,
  Select,
  Field,
  ErrorText,
  FormGroup,
  Wrapper,
  Divider,
  DividerGray,
  Label,
} from "components/form/style";
import { IBUPUM } from "./model";
import { schema } from "./validation";
import { InputSize } from "components/componentsType";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import API from "app/axios";

interface IForm {
  selected: any;
  fetchData: any;
}
const base = "/app/EN1400/";

const Form = React.forwardRef(
  (
    { selected, fetchData }: IForm,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const dispatch = useDispatch();

    const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);

    const { data: dataCommonDic } = useGetCommonDictionaryQuery({
      groupId: "EN",
      functionName: "EN1400",
    });

    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
      getValues,
    } = useForm<IBUPUM>({ mode: "onChange", resolver: yupResolver(schema) });

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

    const resetForm = (type: string) => {
      if (selected !== undefined && JSON.stringify(selected) !== "{}") {
        console.log("type:", type);
        let newData: any = {};
        if (type === "clear") {
          for (const [key, value] of Object.entries(selected)) {
            newData[key] = null;
          }
          reset(newData);
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
        const path = `${base}delete`;
        const formValues = getValues();

        try {
          const response = await API.post(path, formValues);
          if (response.status === 200) {
            toast.success("Deleted");
            await fetchData();
          }
        } catch (err) {
          toast.error("Couldn't delete");
        }
      }

      if (type === null) {
        handleSubmit(submit)();
      }
    };

    const submit = async (data: IBUPUM) => {
      //form aldaagui uyd ajillana
      const path = isAddBtnClicked ? `${base}insert` : `${base}update`;
      const formValues = getValues();

      try {
        const response: any = await API.post(path, formValues);
        if (response.status === 200) {
          toast.success("Action successful");
          setIsAddBtnClicked(false);
          await fetchData();
        } else {
          toast.error(response.response.data?.message);
        }
      } catch (err: any) {
        toast.error(err?.message);
      }
    };

    return (
      <form
        className="form_control"
        onSubmit={handleSubmit(submit)}
        style={{ padding: "0px 10px" }}
      >
        {/* <p>{isAddBtnClicked ? "true" : "false"}</p> */}

        <Wrapper>
          <Field>
            <FormGroup>
              <Label>영업소</Label>
              <Select {...register("areaCode")}>
                {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code1}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <div>
              <ErrorText>{errors["areaCode"]?.message}</ErrorText>
            </div>
          </Field>
        </Wrapper>
        <DividerGray />
        <Wrapper>
          <Input
            label="코드"
            register={register("bpCode")}
            errors={errors["bpCode"]?.message}
            inputSize={InputSize.md}
          />
        </Wrapper>
        <Divider />
        <Wrapper>
          <Input
            label="부품명"
            register={register("bpName")}
            errors={errors["bpName"]?.message}
            inputSize={InputSize.md}
          />
        </Wrapper>
        <DividerGray />
        <Wrapper>
          <Input
            label="규격"
            register={register("bpType")}
            errors={errors["bpType"]?.message}
            inputSize={InputSize.md}
          />
        </Wrapper>
        <DividerGray />
        <Wrapper>
          <Field>
            <FormGroup>
              <Label>단위</Label>
              <Select {...register("bpDanwi")}>
                {/* {bpDanwi?.map((obj, idx) => (
                  <option key={idx} value={obj.areaCode}>
                    {obj.areaName}
                  </option>
                ))} */}
              </Select>
            </FormGroup>
            <div>
              <ErrorText>{errors["bpDanwi"]?.message}</ErrorText>
            </div>
          </Field>
        </Wrapper>
        <Divider />
        <Wrapper>
          <Input
            label="매입단가"
            register={register("bpIndanga")}
            errors={errors["bpIndanga"]?.message}
            inputSize={InputSize.md}
          />
        </Wrapper>
        <DividerGray />
        <Wrapper>
          <Input
            label="판매단가"
            register={register("bpOutdanga")}
            errors={errors["bpOutdanga"]?.message}
            inputSize={InputSize.md}
          />
        </Wrapper>
        <DividerGray />
      </form>
    );
  }
);

export default Form;
