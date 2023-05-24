import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import jwt from "jwt-decode";
import { yupResolver } from "@hookform/resolvers/yup";
import { ReLoginSchema } from "./validation";
import { ILoginFormProps2 } from "./type";
import { useSelector, useDispatch } from "app/store";
import { setReloginInfo } from "app/state/auth/authSlice";
import { closeModal } from "app/state/modal/modalSlice";
import {
  useLoginInfoMutation,
  useReLoginMutation,
  useAreaInfoMutation,
} from "app/api/auth";
import { refreshTabs, removeAllTabs } from "app/state/tab/tabSlice";
import { Field, InputLogin, Select } from "components/form/style";
import { ButtonType, ButtonColor } from "components/componentsType";
import Button from "components/button/button";
import Loader from "components/loader";

function Login() {
  const [checked, setChecked] = useState(false);
  const authState = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    setFocus,
    watch,
    formState: { errors },
  } = useForm<ILoginFormProps2>({
    resolver: yupResolver(ReLoginSchema),
    mode: "onChange",
  });

  const dispatch = useDispatch();

  const [loginInfo, { data, isError, isSuccess, error }] =
    useLoginInfoMutation();

  const [
    areaInfo,
    { data: data2, isError: isError2, isSuccess: isSuccess2, error: error2 },
  ] = useAreaInfoMutation();

  const [
    reLogin,
    {
      data: data3,
      isLoading: isLoading3,
      isError: isError3,
      isSuccess: isSuccess3,
      error: error3,
    },
  ] = useReLoginMutation();

  useEffect(() => {
    if (authState) {
      loginInfo({ username: authState.username });
      reset((formValues) => ({
        ...formValues,
        username: authState.username,
        //areaCode: authState.areaCode, ---buruu
      }));
    }
  }, []);

  useEffect(() => {
    if (isSuccess && data) {
      reset((formValues) => ({
        ...formValues,
        hpSeq: data[0].hpSeq,
      }));
    }
  }, [isSuccess]);

  useEffect(() => {
    if (authState && watch("hpSeq")) {
      areaInfo({ username: authState.username, hpSeq: watch("hpSeq") });
    }
  }, [watch("hpSeq")]);

  useEffect(() => {
    if (isSuccess2) {
      console.log("data2data2data2data2data2data2:::", data2);

      reset((formValues) => ({
        ...formValues,
        areaCode: data2[0].code,
      }));
    }
  }, [isSuccess2]);

  useEffect(() => {
    if (isSuccess3 && data3?.accessToken) {
      //console.log("dataRRRRRRRR:::::", dataR);
      //console.log("accessToken:::::", jwt(dataR.accessToken));

      const { area_code }: { area_code: string } = jwt(data3?.accessToken);
      dispatch(
        setReloginInfo({ token: data3.accessToken, areaCode: area_code })
      );
      dispatch(removeAllTabs());
      dispatch(closeModal());
    }
  }, [isSuccess3]);

  useEffect(() => {
    if (isError3) {
      toast.warning((error3 as any)?.data?.message, {
        autoClose: 500,
      });
    }
  }, [isError3]);

  const submit = async () => {
    const formValues: any = getValues();
    formValues.username = authState.username;
    reLogin(formValues);
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)} style={{ padding: "0 25px" }}>
        <Select
          register={register("hpSeq")}
          className="login"
          style={{ margin: "0 0 20px 0" }}
          fullWidth
        >
          {data?.map((obj: any, idx: number) => (
            <option key={idx} value={obj?.hpSeq}>
              {obj?.loginCo}
            </option>
          ))}
        </Select>

        <Select
          register={register("areaCode")}
          className="login"
          style={{ margin: "0 0 20px 0" }}
          fullWidth
        >
          {data2?.map((obj: any, idx: number) => (
            <option key={idx} value={obj?.code}>
              {obj?.codeName}
            </option>
          ))}
        </Select>

        <InputLogin
          register={register("username")}
          className="login"
          style={{ margin: "0 0 20px 0" }}
          errors={errors["username"]?.message}
          placeholder="업체명"
          fullWidth
        />

        <InputLogin
          register={register("password")}
          className="login"
          style={{ margin: "0 0 20px 0" }}
          errors={errors["password"]?.message}
          type="password"
          placeholder="비밀번호"
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
              disabled={isError || isError2}
              loader={
                isLoading3 && (
                  <Loader
                    color="white"
                    size={25}
                    style={{ marginRight: "5px" }}
                  />
                )
              }
            />
          </Field>
        </div>
      </form>

      {/* {isLoading && (
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
      )} */}
    </>
  );
}

export default Login;
