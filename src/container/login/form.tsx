import React from "react";
import { useForm, Path, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "./validation";
import { ILoginFormProps } from "./type";
import {
  Input,
  Select,
  Field,
  ErrorText,
  FormGroup,
  FormInline,
  FormBlock,
  Wrapper,
  Divider,
} from "components/form/style";
import { InputSize } from "components/componentsType";
import Button from "components/button/button";

function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
    getValues,
  } = useForm<ILoginFormProps>({
    resolver: yupResolver(LoginSchema),
  });

  const submit = (data: ILoginFormProps) => {};

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Field>
        <Input
          {...register("username")}
          type="text"
          placeholder="username"
          style={{ height: "40px", width: "100%" }}
        />
        <div>
          <ErrorText>{errors["username"]?.message}</ErrorText>
        </div>
      </Field>
      <Field>
        <Input
          {...register("password")}
          type="text"
          placeholder="password"
          style={{ height: "40px", width: "100%" }}
        />

        <div>
          <ErrorText>{errors["password"]?.message}</ErrorText>
        </div>
      </Field>
      <Field>
        <input type="checkbox" style={{ marginRight: "5px" }} />
        <label className="login">로그인 정보 저장</label>
      </Field>
      <Button />
    </form>
  );
}

export default Login;
