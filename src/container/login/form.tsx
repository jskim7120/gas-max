import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "app/store";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "./validation";
import { ILoginFormProps } from "./type";
import { Field, InputLogin } from "components/form/style";
import { ButtonType } from "components/componentsType";
import Button from "components/button/button";
import { ButtonColor } from "components/componentsType";
import { useLoginMutation } from "app/api/auth";
import { removeAllTabs } from "app/state/tab/tabSlice";
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
    formState: { errors },
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
    dispatch(removeAllTabs());
    const { area_code }: { area_code: string } = jwt(data.accessToken);
    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("areaCode", area_code);
    localStorage.setItem("username", data.username);
    localStorage.setItem("loginCo", data.loginCo);
    localStorage.setItem("email", data.email);

    navigate("/");
  }

  const submit = (data: ILoginFormProps) => {
    login({ username: data.username, password: data.password });
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Field style={{ marginBottom: "8px" }}>
        <InputLogin
          register={register("username")}
          errors={errors["username"]?.message}
          placeholder="아이디"
          style={{ height: "40px", width: "100%" }}
          className="login"
        />
      </Field>
      <Field>
        <InputLogin
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
