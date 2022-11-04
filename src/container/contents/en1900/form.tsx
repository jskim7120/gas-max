import React, { useImperativeHandle, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useDispatch } from "app/store";
import {
  Input,
  Select,
  Wrapper,
  Divider,
  DividerGray,
  Field,
  ErrorText,
  FormGroup,
  Label,
} from "components/form/style";
import { IFormProps } from "./type";
import { schema } from "./validation";
import API from "app/axios";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";

interface IForm {
  selected: any;
  fetchData: any;
}
const base = "/app/EN1900/";

const Form = React.forwardRef(
  (
    { selected, fetchData }: IForm,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const dispatch = useDispatch();

    const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);

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

    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
      getValues,
    } = useForm<IFormProps>({
      mode: "onChange",
      resolver: yupResolver(schema),
    });

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      crud,
      resetForm,
      setIsAddBtnClicked,
    }));

    const resetForm = (type: string) => {
      if (JSON.stringify(selected) !== "{}") {
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
            swWorkOut: selected?.swWorkOut === "Y",
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

    const submit = async (data: IFormProps) => {
      //form aldaagui uyd ajillana
      const path = isAddBtnClicked ? `${base}insert` : `${base}update`;
      const formValues = getValues();

      try {
        const response: any = await API.post(path, formValues);

        if (response.status === 200) {
          toast.success("Action successfull");
          setIsAddBtnClicked(false);
          await fetchData();
        } else {
          toast.error(response?.message);
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
          <Input
            label="코드"
            register={register("gubunCode")}
            errors={errors["gubunCode"]?.message}
            textAlign="right"
          />
          <Field>
            <FormGroup>
              <Label>영업소</Label>
              <Select {...register("areaCode")}>
                {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
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
        <Divider />
        <Wrapper>
          <Input
            label="분류명"
            register={register("gubunName")}
            errors={errors["gubunName"]?.message}
          />
        </Wrapper>
        <DividerGray />
        <Wrapper>
          <Input
            label="비고"
            register={register("gubunBigo")}
            errors={errors["gubunBigo"]?.message}
            fullWidth
          />
        </Wrapper>
        <DividerGray />
      </form>
    );
  }
);

export default Form;
