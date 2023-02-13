import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "app/store";
import { LoginSchema } from "./validation";
import { ILoginFormProps } from "./type";
import { Input, Field } from "components/form/style";
import { ButtonType } from "components/componentsType";
import Button from "components/button/button";
import { ButtonColor } from "components/componentsType";
import { useLoginMutation } from "app/api/auth";
import { setToken, setAreaCode } from "app/state/auth/authSlice";
import Loader from "components/loader";
import jwt from "jwt-decode";

interface RequestError {
  data: any;
  status: number;
}
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

  const [login, { data, isLoading, isError, isSuccess, error }] =
    useLoginMutation();

  useEffect(() => {
    if (isError) {
      toast.warn((error as RequestError).data?.message);
    }
  }, [isError]);

  if (isSuccess && data !== undefined && data.accessToken) {
    const { area_code }: { area_code: string } = jwt(data.accessToken);

    dispatch(setToken({ token: data.accessToken }));
    dispatch(setAreaCode({ areaCode: area_code }));
    localStorage.setItem("token", data.accessToken);
    navigate("/");
  }

  const submit = (data: ILoginFormProps) => {
    //   dispatch(
    //     login({ username: data.username, password: data.password })
    //   ).finally(() => navigate("/"));
    login({ username: data.username, password: data.password });
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Field style={{ marginBottom: "8px" }}>
        <Input
          register={register("username")}
          errors={errors["username"]?.message}
          placeholder="아이디"
          style={{ height: "40px", width: "100%" }}
          className="login"
        />
      </Field>
      <Field>
        <Input
          register={register("password")}
          errors={errors["password"]?.message}
          type="password"
          placeholder="비밀번호"
          style={{ height: "40px", width: "100%" }}
          className="login"
        />
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
            style={{ alignItems: "center", lineHeight: "33px" }}
            loader={
              isLoading && (
                <Loader
                  color="white"
                  size={25}
                  style={{ marginRight: "5px" }}
                />
              )
            }
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
      <ToastContainer />
    </form>
  );
}

export default Login;
