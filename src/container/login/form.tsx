import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "app/store";
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
import { login } from "features/auth/authSlice";

function Login() {
  const [checked, setChecked] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm<ILoginFormProps>({
    resolver: yupResolver(LoginSchema),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submit = (data: ILoginFormProps) => {
    dispatch(
      login({ username: data.username, password: data.password })
    ).finally(() => navigate("/"));
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Field style={{ marginBottom: "8px" }}>
        <Input
          {...register("username")}
          type="text"
          placeholder="아이디"
          style={{ height: "40px", width: "100%" }}
        />
        <div>
          <ErrorText>{errors["username"]?.message}</ErrorText>
        </div>
      </Field>
      <Field>
        <Input
          {...register("password")}
          type="password"
          placeholder="비밀번호"
          style={{ height: "40px", width: "100%" }}
        />

        <div>
          <ErrorText>{errors["password"]?.message}</ErrorText>
        </div>
      </Field>

      <div style={{ padding: "10px 50px" }}>
        <Field style={{ display: "flex", marginBottom: "19px" }}>
          <input
            type="checkbox"
            style={{ width: "20px", height: "21px", marginRight: "5px" }}
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
          <label className="login">로그인 정보 저장</label>
        </Field>
        <Field style={{ marginBottom: "75px" }}>
          <Button
            text="로그인"
            kind={ButtonType.LOGIN}
            color={ButtonColor.PRIMARY}
            fullWidth
            style={{ alignItems: "baseline", lineHeight: "33px" }}
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
          style={{
            marginTop: "15px",
            alignItems: "baseline",
            lineHeight: "33px",
          }}
        />
      </div>
    </form>
  );
}

export default Login;
