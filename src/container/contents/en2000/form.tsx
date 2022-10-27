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
  InfoDesc,
} from "components/form/style";
import { IconInfo } from "components/allSvgIcon";
import CheckBox from "components/checkbox";
import { IFormProps } from "./type";
import { schema } from "./validation";
import API from "app/axios";
import { useGetAreaCodeQuery } from "app/api/areaCode";

interface IForm {
  selected: any;
  fetchData: any;
}
const base = "/app/EN2000/";

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
            register={register("ccCode")}
            errors={errors["ccCode"]?.message}
          />
        </Wrapper>
        <Divider />
        <Wrapper>
          <Input
            label="정비명"
            register={register("ccName")}
            errors={errors["ccName"]?.message}
          />
        </Wrapper>
        <Wrapper>
          <Input
            label="비고"
            register={register("ccBigo")}
            errors={errors["ccBigo"]?.message}
            fullWidth
          />
        </Wrapper>
        <Wrapper>
          <FormGroup>
            <Label>유류비계정 유무</Label>
            <CheckBox title="" rtl register={{ ...register("ccOilYn") }} />
          </FormGroup>
          <div>
            <ErrorText>{errors["ccOilYn"]?.message}</ErrorText>
          </div>
        </Wrapper>
        <InfoDesc>
          <IconInfo />
          <span>유류비는 주유현황과 연동됩니다.</span>
        </InfoDesc>
        <ToastContainer />
      </form>
    );
  }
);

export default Form;
