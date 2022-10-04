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
import { InputSize } from "components/ComponentsType";

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
      <Wrapper>
        <Field>
          <FormGroup>
            <Input
              {...register("username")}
              type="text"
              inputSize={InputSize.md}
              placeholder="username"
            />
          </FormGroup>
          <div>
            <ErrorText>{errors["username"]?.message}</ErrorText>
          </div>
        </Field>
        <Field>
          <FormGroup>
            <label>코드:</label>
            <Input
              {...register("password")}
              type="text"
              inputSize={InputSize.md}
              placeholder="password"
            />
          </FormGroup>
          <div>
            <ErrorText>{errors["password"]?.message}</ErrorText>
          </div>
        </Field>
      </Wrapper>
    </form>
  );
}

export default Login;
