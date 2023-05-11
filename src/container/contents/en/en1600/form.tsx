import React, { useImperativeHandle, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import API from "app/axios";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { EN1600INSERT, EN1600UPDATE, EN1600DELETE, EN160011 } from "app/path";
import {
  Input,
  Select,
  Divider,
  FormGroup,
  Label,
} from "components/form/style";
import CheckBox from "components/checkbox";
import { IJNOSAUP, emptyObj } from "./model";
import DaumAddress from "components/daum";
import { SearchIcon, IconInfo } from "components/allSvgIcon";
import { DateWithoutDash } from "helpers/dateFormat";
import { convertBase64 } from "helpers/convertBase64";
import CustomDatePicker from "components/customDatePicker";
import { ImageWrapper } from "../../commonStyle";
import { currencyMask, removeCommas2 } from "helpers/currency";
import { InputSize } from "components/componentsType";

interface IForm {
  selected: any;
  fetchData: Function;
  isAddBtnClicked: boolean;
  setIsAddBtnClicked: Function;
  resetButtonCombination: Function;
}

const Form = React.forwardRef(
  (
    {
      selected,
      fetchData,
      isAddBtnClicked,
      setIsAddBtnClicked,
      resetButtonCombination,
    }: IForm,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const [areaCode, setAreaCode] = useState("");
    const [swAddr1, setSwAddr1] = useState("");
    const [addr, setAddress] = useState<string>("");
    const [image, setImage] = useState<{
      name: string;
    }>();
    const [image64, setImage64] = useState<any>(null);

    const { data: dataCommonDic } = useGetCommonDictionaryQuery({
      groupId: "EN",
      functionName: "EN1600",
    });

    const { register, handleSubmit, reset, getValues, control, setFocus } =
      useForm<IJNOSAUP>({
        mode: "onChange",
      });

    useEffect(() => {
      if (addr.length > 0) {
        reset((formValues: any) => ({
          ...formValues,
          swZipcode: addr ? addr?.split("/")[1] : "",
          swAddr2: "",
        }));

        setSwAddr1(addr ? addr?.split("/")[0] : "");
      }
    }, [addr]);

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      crud,
      resetForm,
      setImage64,
    }));

    const fetchCode11 = async (code: string) => {
      try {
        const response: any = await API.get(EN160011, {
          params: { areaCode: code },
        });

        if (response.status === 200) {
          return response?.data;
        } else {
          alert(response.response.data?.message);
          resetButtonCombination();
        }
        return null;
      } catch (err) {
        console.log(err);
      }
    };

    const codeChangeHandler = async (aCode: any) => {
      try {
        const temp = await fetchCode11(aCode);

        if (temp !== null) {
          setFocus("swName");
          reset({ ...emptyObj, ...temp, swCode: temp.tempCode });
          setSwAddr1("");
        }
      } catch (err: any) {
        console.log("swCode generate error", err);
      }
    };

    const handleChangeImage = async (event: any) => {
      setImage({
        name: event?.target?.files ? event?.target?.files[0].name : "",
      });
      try {
        const response =
          event?.target?.files && (await convertBase64(event.target.files[0]));

        setImage64(response);
      } catch (err: any) {
        console.log("image convert 64 error occured.", err);
      }
    };

    const resetForm = async (type: string) => {
      if (type === "clear") {
        await codeChangeHandler(areaCode);
        return;
      }
      if (type === "reset") {
        if (selected !== undefined && Object.keys(selected)?.length > 0) {
          setSwAddr1(selected?.swAddr1 ? selected?.swAddr1 : "");
          if (selected?.areaCode !== areaCode) {
            setAreaCode(selected.areaCode);
          }
          reset({
            ...selected,
            swWorkOut: selected.swWorkOut === "Y",
          });
          setImage64(selected.swStampFile ? selected.swStampFile : null);
        }
        return;
      }
    };

    const crud = async (type: string | null) => {
      if (type === "delete") {
        const formValues: any = getValues();
        delete formValues.swPaykum;
        try {
          const response: any = await API.post(EN1600DELETE, formValues);
          if (response.status === 200) {
            toast.success("삭제하였습니다", {
              autoClose: 500,
            });
            await fetchData();
          } else {
            alert(response?.response?.data.message);
          }
        } catch (err) {
          console.log(err);
        }
        return;
      }

      if (type === null) {
        handleSubmit(submit)();
      }
    };

    const submit = async (data: IJNOSAUP) => {
      //form aldaagui uyd ajillana
      const path = isAddBtnClicked ? EN1600INSERT : EN1600UPDATE;
      const formValues = getValues();

      isAddBtnClicked && (formValues.areaCode = areaCode);

      formValues.swPaykum =
        formValues.swPaykum && +removeCommas2(formValues.swPaykum);
      formValues.sgKumack =
        formValues.sgKumack && +removeCommas2(formValues.sgKumack);

      formValues.swWorkOut = formValues.swWorkOut ? "Y" : "N";
      formValues.cuSeEmail =
        formValues.cuSeEmail &&
        `${formValues.cuSeEmail.trim()}@${formValues.mailKind}`;

      formValues.swIndate = DateWithoutDash(formValues.swIndate);
      formValues.swJdate1 = DateWithoutDash(formValues.swJdate1);
      formValues.swJdate2 = DateWithoutDash(formValues.swJdate2);
      formValues.swOutDate = DateWithoutDash(formValues.swOutDate);
      formValues.swAddr1 = swAddr1;

      formValues.swStampFile = image64 && image64;

      try {
        const response: any = await API.post(path, formValues);

        if (response.status === 200) {
          if (isAddBtnClicked) {
            setIsAddBtnClicked(false);
            await fetchData("pos");
          } else {
            await fetchData();
          }

          toast.success("저장이 성공하였습니다", {
            autoClose: 500,
          });
        } else {
          alert(response?.response?.data.message);
        }
      } catch (err: any) {
        console.log(err);
      }
    };

    return (
      <form
        onSubmit={handleSubmit(submit)}
        style={{ width: "725px", padding: "0px 10px" }}
        autoComplete="off"
      >
        <FormGroup>
          <Input
            label="코 드"
            register={register("swCode")}
            maxLength="2"
            readOnly
            inputSize={InputSize.i200}
          />

          <Label>영 업 소</Label>
          <Select
            value={areaCode}
            onChange={(e) => {
              setAreaCode(e.target.value);
              codeChangeHandler(e.target.value);
            }}
            width={InputSize.i200}
            disabled={!isAddBtnClicked}
          >
            {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
        <Divider />
        <FormGroup>
          <Input
            label="사 원 명"
            register={register("swName")}
            inputSize={InputSize.i200}
          />
          <Input
            label="부 서 명"
            register={register("swDepartment")}
            inputSize={InputSize.i200}
          />
        </FormGroup>

        <FormGroup>
          <Label>업무구분</Label>
          <Select register={register("swGubun")} width={InputSize.i200}>
            {dataCommonDic?.swGubun?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>

          <Controller
            control={control}
            {...register("swJuminno")}
            render={({ field: { onChange, value, name } }) => (
              <Input
                label="주민번호"
                value={value}
                onChange={onChange}
                mask={[
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  "-",
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                ]}
                name={name}
                inputSize={InputSize.i200}
              />
            )}
          />
        </FormGroup>

        <FormGroup>
          <Input
            label="전화번호"
            register={register("swTel")}
            maxLength="14"
            inputSize={InputSize.i200}
          />

          <Controller
            control={control}
            {...register("swHp")}
            render={({ field: { onChange, value, name } }) => (
              <Input
                label="핸드폰"
                value={value}
                name={name}
                onChange={onChange}
                mask={[
                  /\d/,
                  /\d/,
                  /\d/,
                  "-",
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  "-",
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                ]}
                inputSize={InputSize.i200}
              />
            )}
          />
        </FormGroup>

        <FormGroup>
          <Input
            label="이메일"
            register={register("cuSeEmail")}
            maxLength="50"
            inputSize={InputSize.i200}
          />
          @
          <Select register={register("mailKind")} style={{ marginLeft: "3px" }}>
            {dataCommonDic?.emailKind?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Input
            label="주 소"
            register={register("swZipcode")}
            maxLength="6"
            inputSize={InputSize.i200}
            readOnly
          />
          <DaumAddress
            setAddress={setAddress}
            defaultValue={swAddr1}
            onClose={() => setFocus("swAddr2")}
          />
          <Input
            maxLength="40"
            style={{ width: "294px" }}
            value={swAddr1}
            onChange={(e: any) => setSwAddr1(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Input
            label=""
            register={register("swAddr2")}
            maxLength="40"
            style={{ width: "526px" }}
          />
        </FormGroup>

        <FormGroup>
          <Input
            label="매핑코드"
            register={register("eyeSwCode")}
            maxLength="10"
            inputSize={InputSize.i200}
          />
          <p
            style={{
              display: "flex",
              right: "32px",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "12px",
              gap: "6px",
            }}
          >
            <IconInfo />
            <span
              style={{ color: "#1B8C8E", fontSize: "15px", marginTop: "-1px" }}
            >
              탱크잔량 원격검침 시스템의 매핑할 사원코드를 지정
            </span>
          </p>
        </FormGroup>
        <Divider />
        <FormGroup>
          <div style={{ width: "600px" }}>
            <FormGroup>
              <Input
                label="서명 화일"
                register={register("swStampFile")}
                value={image?.name}
                inputSize={InputSize.i200}
                maxLength="80"
              />

              <button
                style={{
                  width: "100px",
                  height: "30px",
                  background: "#666666",
                  borderRadius: "5px",
                  border: "1px solid #707070",
                  color: "#fff",
                  position: "relative",
                  fontSize: "15px",
                }}
              >
                <SearchIcon />
                &nbsp; 파일찾기
                <input
                  type="file"
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 0,
                  }}
                  onChange={handleChangeImage}
                />
              </button>
            </FormGroup>

            <FormGroup>
              <Label>입 사 일</Label>
              <Controller
                control={control}
                {...register("swIndate")}
                render={({ field: { onChange, onBlur, value, name } }) => (
                  <CustomDatePicker
                    value={value}
                    name={name}
                    onChange={onChange}
                    style={{ width: "200px" }}
                  />
                )}
              />

              <Label style={{ minWidth: "90px" }}>급여방식</Label>
              <Select register={register("swPaytype")} width={InputSize.i110}>
                {dataCommonDic?.swPaytype?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup>
              <Controller
                control={control}
                {...register("swPaykum")}
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    label="급 여 액"
                    value={value}
                    onChange={onChange}
                    mask={currencyMask}
                    name={name}
                    textAlign="right"
                    inputSize={InputSize.i200}
                  />
                )}
              />

              <p>원</p>

              <Controller
                control={control}
                {...register("swPaydate")}
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    label="급 여 일"
                    value={value}
                    labelStyle={{ minWidth: "76px" }}
                    onChange={onChange}
                    mask={[/\d/, /\d/]}
                    name={name}
                    inputSize={InputSize.i110}
                  />
                )}
              />
            </FormGroup>
          </div>
          <ImageWrapper>{image64 && <img src={image64} />}</ImageWrapper>
        </FormGroup>

        <FormGroup>
          <Input
            label="면허종류"
            register={register("swDrivertype")}
            maxLength="15"
            inputSize={InputSize.i200}
          />
          <Input
            label="면허번호"
            labelStyle={{ minWidth: "90px" }}
            register={register("swDriverno")}
            maxLength="17"
            inputSize={InputSize.i110}
          />
        </FormGroup>

        <FormGroup>
          <Label>적성검사</Label>
          <Controller
            control={control}
            {...register("swJdate1")}
            render={({ field: { onChange, onBlur, value, name } }) => (
              <CustomDatePicker value={value} onChange={onChange} name={name} />
            )}
          />

          <Label style={{ minWidth: "auto" }}>~</Label>
          <Controller
            control={control}
            {...register("swJdate2")}
            render={({ field: { onChange, onBlur, value, name } }) => (
              <CustomDatePicker value={value} onChange={onChange} name={name} />
            )}
          />
        </FormGroup>

        <FormGroup>
          <Input
            label="메 모"
            register={register("swBigo")}
            maxLength="40"
            style={{ width: "526px" }}
          />
        </FormGroup>
        <Divider />
        <FormGroup>
          <Label>퇴사여부</Label>
          <CheckBox register={register("swWorkOut")} />
          <p
            style={{
              marginLeft: "25px",
              fontSize: "15px",
            }}
          >
            (체크시 퇴사사원)
          </p>

          <Label>퇴사일</Label>

          <Controller
            control={control}
            {...register("swOutDate")}
            render={({ field: { onChange, onBlur, value, name } }) => (
              <CustomDatePicker value={value} onChange={onChange} name={name} />
            )}
          />
        </FormGroup>

        <p
          style={{
            display: "flex",
            right: "32px",
            alignItems: "center",
            marginLeft: "125px",
            marginBottom: "18px",
            gap: "6px",
            marginTop: "6px",
          }}
        >
          <IconInfo />
          <span style={{ color: "#1B8C8E", fontSize: "15px" }}>
            퇴사사원은 판매등록 사원에서 제외 됩니다.
          </span>
        </p>

        <FormGroup>
          <Controller
            control={control}
            {...register("sgKumack")}
            render={({ field: { onChange, value, name } }) => (
              <Input
                label="가불 금액"
                value={value}
                onChange={onChange}
                mask={currencyMask}
                name={name}
                textAlign="right"
                inputSize={InputSize.i200}
              />
            )}
          />
          <p>원</p>
        </FormGroup>
      </form>
    );
  }
);

export default Form;
