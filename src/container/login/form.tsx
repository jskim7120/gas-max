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
import { ButtonType, InputSize } from "components/componentsType";
import Button from "components/button/button";
import {
  ButtonColor,
  ButtonSize,
  ButtonTextColor,
} from "components/componentsType";

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

      <div style={{ padding: "10px 50px" }}>
        <Field style={{ display: "flex", marginBottom: "20px" }}>
          <input type="checkbox" style={{ marginRight: "5px" }} />
          <label className="login">로그인 정보 저장</label>
        </Field>
        <Field style={{ marginBottom: "80px" }}>
          <Button
            text="로그인"
            kind={ButtonType.LOGIN}
            color={ButtonColor.PRIMARY}
            fullWidth
          />
        </Field>
        <span style={{ fontSize: "14px", color: "#707070" }}>
          <b>(주)조아테크</b> 회원이 아니신가요?
          <br />
        </span>
        <span style={{ fontSize: "14px", color: "#707070" }}>
          최상의 서비스와 혜택을 누려보세요.
        </span>

        <Button
          text="회원가입신청"
          kind={ButtonType.LOGIN}
          color={ButtonColor.SECONDARY}
          fullWidth
          style={{ marginTop: "15px" }}
        />
      </div>
    </form>
  );
}

export default Login;
