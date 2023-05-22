import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { ReLoginSchema } from "./validation";
import { ILoginFormProps2 } from "./type";
import { Field, FormGroup, InputLogin, Select } from "components/form/style";
import { ButtonType } from "components/componentsType";
import Button from "components/button/button";
import { ButtonColor } from "components/componentsType";
import { useLoginInfoMutation, useReLoginMutation } from "app/api/auth";
import Loader from "components/loader";

import jwt from "jwt-decode";

function Login() {
  const [checked, setChecked] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    setFocus,
    formState: { errors },
  } = useForm<ILoginFormProps2>({
    resolver: yupResolver(ReLoginSchema),
    mode: "onChange",
  });

  const navigate = useNavigate();

  const [loginInfo, { data, isLoading, isError, isSuccess, error }] =
    useLoginInfoMutation();

  const [
    reLogin,
    {
      data: dataR,
      isLoading: isLoadingR,
      isError: isErrorR,
      isSuccess: isSuccessR,
      error: errorR,
    },
  ] = useReLoginMutation();

  useEffect(() => {
    if (isErrorR) {
      toast.warning((errorR as any)?.data?.message, {
        autoClose: 500,
      });
    }
  }, [isErrorR]);

  const [areaName, setAreaName] = useState<Array<any>>([]);
  const [isActive, setIsActive] = useState<boolean>(true);

  useEffect(() => {
    if (isSuccess) {
      if (data && data?.length > 0) {
        setAreaName(data);

        reset((formValues) => ({
          ...formValues,
          areaName: data[0].hpSeq,
        }));
        setFocus("hpSeq");
        setIsActive(false);
      }
    } else {
      setAreaName([]);
      setIsActive(true);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isSuccessR) {
      if (dataR) {
        const { area_code }: { area_code: string } = jwt(dataR.accessToken);
        localStorage.setItem("areaCode", area_code);
        localStorage.setItem("token", dataR.accessToken);
        navigate("/");
      }
    }
  }, [isSuccessR]);

  const getLoginInfo = async (params: any) => {
    if (params.username) {
      loginInfo({ username: params.username });
    }
  };

  const submit = async () => {
    const formValues: any = getValues();
    reLogin(formValues);
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      // const element = event.target;
      // const form = element.form;
      // const index = Array.prototype.indexOf.call(form, element);
      // form.elements[index + 1].focus();
      // if (element.name === "username") {
      //   handleSubmit(getLoginInfo)();
      // }
      handleSubmit(getLoginInfo)();
    }
  };
  //01089208066
  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <InputLogin
          register={register("username")}
          errors={errors["username"]?.message}
          placeholder="업체명"
          className="login"
          style={{ margin: "0 0 20px 0" }}
          fullWidth
          onKeyDown={handleKeyPress}
        />

        <Select
          register={register("hpSeq")}
          className="login"
          style={{ margin: "0 0 20px 0" }}
          fullWidth
          disabled={isActive}
        >
          {areaName?.map((obj: any, idx: number) => (
            <option key={idx} value={obj?.hpSeq}>
              {obj?.loginCo}
            </option>
          ))}
        </Select>

        <InputLogin
          register={register("password")}
          errors={errors["password"]?.message}
          type="password"
          placeholder="비밀번호"
          className="login"
          readOnly={isActive}
          style={{ margin: "0 0 20px 0" }}
          fullWidth
        />

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
              type="submit"
              className="login"
              text="로그인"
              kind={ButtonType.LOGIN}
              color={ButtonColor.PRIMARY}
              fullWidth
              style={{ alignItems: "center", lineHeight: "33px" }}
              loader={
                isLoadingR && (
                  <Loader
                    color="white"
                    size={25}
                    style={{ marginRight: "5px" }}
                  />
                )
              }
              disabled={isActive}
            />
          </Field>
        </div>
        <ToastContainer />
      </form>

      {isLoading && (
        <div
          style={{
            width: "100%",
            height: "233px",
            position: "absolute",
            top: "287px",
            left: "0px",
            background: "rgba(255, 255, 255, 0.2)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(1.2px)",
            //-webkit-backdrop-filter: "blur(1.2px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          <Loader
            color="#0098ff"
            size={25}
            style={{ marginRight: "5px", position: "absolute", top: "60px" }}
          />
        </div>
      )}
    </>
  );
}

export default Login;
