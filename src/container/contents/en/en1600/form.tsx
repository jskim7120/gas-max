import React, { useImperativeHandle, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { apiGet, apiPost } from "app/axios";
import { useGetCommonDictionaryMutation } from "app/api/commonDictionary";
import { EN1600INSERT, EN1600UPDATE, EN1600DELETE, EN160011 } from "app/path";
import {
  Input,
  Select,
  Divider,
  FormGroup,
  Label,
  CustomForm,
} from "components/form/style";
import CheckBox from "components/checkbox";
import { IJNOSAUP, emptyObj } from "./model";
import DaumAddress from "components/daum";
import { SearchIcon, IconInfo, Trash2 } from "components/allSvgIcon";
import { DateWithoutDash } from "helpers/dateFormat";
import { convertBase64 } from "helpers/convertBase64";
import CustomDatePicker from "components/customDatePicker";
import { ImageWrapper } from "../../commonStyle";
import { currencyMask, removeCommas2 } from "helpers/currency";
import { InputSize } from "components/componentsType";
import { InfoText } from "components/text";
import { GrayButton } from "../style";

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

    const [getCommonDictionary, { data: dataCommonDic }] =
      useGetCommonDictionaryMutation();

    const { register, handleSubmit, reset, getValues, control, setFocus } =
      useForm<IJNOSAUP>({
        mode: "onChange",
      });

    useEffect(() => {
      getCommonDictionary({ groupId: "EN", functionName: "EN1600" });
    }, []);

    useEffect(() => {
      if (addr?.length > 0) {
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

    const codeChangeHandler = async (aCode: any) => {
      const res = await apiGet(EN160011, { areaCode: aCode });

      if (res) {
        setFocus("swName");
        reset({ ...emptyObj, ...res, swCode: res.tempCode });
        setSwAddr1("");
      } else {
        resetButtonCombination();
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

        const res = await apiPost(EN1600DELETE, formValues, "삭제하였습니다");
        res && (await fetchData());
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

      const res = await apiPost(path, formValues, "저장이 성공하였습니다");

      if (res) {
        if (isAddBtnClicked) {
          setIsAddBtnClicked(false);
          await fetchData("last");
        } else {
          await fetchData();
        }
      }
    };

    return (
      <CustomForm
        onSubmit={handleSubmit(submit)}
        style={{
          width: "780px",
          padding: "6px 10px 0",
        }}
        autoComplete="off"
      >
        <FormGroup>
          <Input
            label="코 드"
            register={register("swCode")}
            maxLength="2"
            readOnly={!isAddBtnClicked}
            inputSize={InputSize.i200}
          />

          <Label>영 업 소</Label>
          <Select
            value={areaCode}
            onChange={(e: any) => {
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
            maxLength="10"
          />
          <Input
            label="부 서 명"
            register={register("swDepartment")}
            inputSize={InputSize.i300}
            maxLength="20"
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
            name="swJuminno"
            render={({ field }) => (
              <Input
                {...field}
                label="주민번호"
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
            name="swHp"
            render={({ field }) => (
              <Input
                {...field}
                label="핸드폰"
                maxLength="14"
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
          <Select register={register("mailKind")} style={{ width: "305px" }}>
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
            inputSize={InputSize.i100}
            readOnly
          />
          <DaumAddress
            setAddress={setAddress}
            defaultValue={swAddr1}
            onClose={() => setFocus("swAddr2")}
          />
          <Input
            maxLength="60"
            style={{ width: "494px" }}
            value={swAddr1}
            onChange={(e: any) => setSwAddr1(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Input
            label=""
            register={register("swAddr2")}
            maxLength="60"
            style={{ width: "626px" }}
          />
        </FormGroup>

        <FormGroup>
          <Input
            label="매핑코드"
            register={register("eyeSwCode")}
            maxLength="10"
            inputSize={InputSize.i100}
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
          <div>
            <FormGroup>
              <Input
                label="서명 화일"
                register={register("swStampFile")}
                value={image?.name}
                inputSize={InputSize.i330}
                maxLength="80"
              />
              <GrayButton type="button" style={{ marginRight: "11px" }}>
                <SearchIcon />
                &nbsp;찾기
                <input type="file" onChange={handleChangeImage} />
              </GrayButton>
              <Trash2 />
            </FormGroup>
            <FormGroup>
              <Label>입 사 일</Label>
              <Controller
                control={control}
                name="swIndate"
                render={({ field }) => (
                  <CustomDatePicker {...field} style={{ width: "120px" }} />
                )}
              />

              <Label style={{ minWidth: "242px" }}>급여방식</Label>
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
                name="swPaykum"
                render={({ field }) => (
                  <Input
                    {...field}
                    label="급 여 액"
                    mask={currencyMask}
                    textAlign="right"
                    inputSize={InputSize.i120}
                  />
                )}
              />
              <p>원</p>
              <Controller
                control={control}
                name="swPaydate"
                render={({ field }) => (
                  <Input
                    {...field}
                    label="급 여 일"
                    labelStyle={{ minWidth: "228px" }}
                    mask={[/\d/, /\d/]}
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
            inputSize={InputSize.i230}
          />
          <Input
            label="면허번호"
            labelStyle={{ minWidth: "132px" }}
            register={register("swDriverno")}
            maxLength="17"
            style={{ width: "258px" }}
          />
        </FormGroup>

        <FormGroup>
          <Label>적성검사</Label>
          <Controller
            control={control}
            name="swJdate1"
            render={({ field }) => (
              <CustomDatePicker {...field} style={{ width: "120px" }} />
            )}
          />

          <Label style={{ minWidth: "auto" }}>~</Label>
          <Controller
            control={control}
            name="swJdate2"
            render={({ field }) => (
              <CustomDatePicker {...field} style={{ width: "120px" }} />
            )}
          />
        </FormGroup>

        <FormGroup>
          <Input
            label="메 모"
            register={register("swBigo")}
            maxLength="40"
            style={{ width: "580px" }}
          />
        </FormGroup>
        <Divider />
        <FormGroup>
          <Label>퇴사여부</Label>
          <CheckBox register={register("swWorkOut")} />
          <p
            style={{
              marginLeft: "25px",
            }}
          >
            (체크시 퇴사사원)
          </p>

          <Label style={{ minWidth: "151px" }}>퇴사일</Label>

          <Controller
            control={control}
            name="swOutDate"
            render={({ field }) => (
              <CustomDatePicker {...field} style={{ width: "110px" }} />
            )}
          />
        </FormGroup>

        <InfoText
          text="퇴사사원은 판매등록 사원에서 제외 됩니다."
          style={{ margin: "6px  0 10px 119px" }}
        />
        <Divider />
        <FormGroup>
          <Controller
            control={control}
            name="sgKumack"
            render={({ field }) => (
              <Input
                {...field}
                label="가불 금액"
                mask={currencyMask}
                textAlign="right"
                inputSize={InputSize.i200}
              />
            )}
          />
          <p>원</p>
        </FormGroup>
      </CustomForm>
    );
  }
);

export default Form;
