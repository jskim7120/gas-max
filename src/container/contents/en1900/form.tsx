import React, { useImperativeHandle, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
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
import { useGetAreaCodeQuery } from "app/api/areaCode";

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

    const { data: areaCode } = useGetAreaCodeQuery();

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

    if (!selected) return <p>..loading</p>;

    return (
      <form onSubmit={handleSubmit(submit)} style={{ padding: "0px 10px" }}>
        {/* <p>{isAddBtnClicked ? "true" : "false"}</p> */}
        <Wrapper>
          <Input
            label="코드"
            register={register("gubunCode")}
            errors={errors["gubunCode"]?.message}
          />
          <Field>
            <FormGroup>
              <Label>영업소</Label>
              <Select {...register("areaCode")}>
                {areaCode?.map((obj, idx) => (
                  <option key={idx} value={obj.code1}>
                    {obj.codeName}본사
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
        <Wrapper>
          <Input
            label="비고"
            register={register("gubunBigo")}
            errors={errors["gubunBigo"]?.message}
            fullWidth
          />
        </Wrapper>
        <DividerGray />
        <ToastContainer />
      </form>
    );
  }
);

export default Form;
