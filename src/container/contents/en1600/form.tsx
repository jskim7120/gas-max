import React, { useImperativeHandle, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useDispatch } from "app/store";
import {
  Input,
  Select,
  Wrapper,
  Divider,
  DividerGray,
  Field,
  ErrorText,
  FormGroup,
  Label,
} from "components/form/style";
import CheckBox from "components/checkbox";
import { IJNOSAUP } from "./model";
import DaumAddress from "components/daum";
import { schema } from "./validation";
import { SearchIcon, IconInfo } from "components/allSvgIcon";
import { formatDate, formatDateByRemoveDash } from "helpers/dateFormat";
import { convertBase64 } from "helpers/convertBase64";
import CustomDate from "components/customDatePicker";
import API from "app/axios";
import { useGetCommonGubunQuery } from "app/api/commonGubun";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { ImageWrapper } from "../style";

interface IForm {
  selected: any;
  fetchData: any;
  menuId: string;
  setData: any;
  selectedRowIndex: number;
  setSelected: any;
  setSelectedRowIndex: any;
}
const base = "/app/EN1600/";

const Form = React.forwardRef(
  (
    {
      selected,
      fetchData,
      menuId,
      setData,
      selectedRowIndex,
      setSelected,
      setSelectedRowIndex,
    }: IForm,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const dispatch = useDispatch();

    const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);
    const [addr, setAddress] = useState<string>("");
    const [image, setImage] = useState<{
      name: string;
    }>();
    const [image64, setImage64] = useState<any>(null);
    const { data: swGubun } = useGetCommonGubunQuery("1");
    const { data: swPaytype } = useGetCommonGubunQuery("2");
    const { data: dataEmailType } = useGetCommonGubunQuery("5");

    const { data: dataCommonDic } = useGetCommonDictionaryQuery({
      groupId: "EN",
      functionName: "EN1600",
    });

    useEffect(() => {
      if (selected !== undefined && JSON.stringify(selected) !== "{}") {
        resetForm("reset");
      }
    }, [selected]);

    useEffect(() => {
      if (addr.length > 0) {
        reset({
          swZipcode: addr ? addr?.split("/")[1] : "",
          swAddr1: addr ? addr?.split("/")[0] : "",
        });
      }
    }, [addr]);

    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
      getValues,
    } = useForm<IJNOSAUP>({
      mode: "onChange",
      resolver: yupResolver(schema),
    });

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      crud,
      resetForm,
      setIsAddBtnClicked,
    }));

    const resetForm = (type: string) => {
      if (selected !== undefined && JSON.stringify(selected) !== "{}") {
        console.log("type:", type);
        let newData: any = {};

        if (type === "clear") {
          for (const [key, value] of Object.entries(selected)) {
            newData[key] = null;
          }
          reset(newData);
        } else if (type === "reset") {
          for (const [key, value] of Object.entries(selected)) {
            newData[key] = value;
          }

          reset({
            ...newData,
            swWorkOut: selected.swWorkOut === "Y",
            cuSeEmail: selected.cuSeEmail ? selected.cuSeEmail.trim() : "",
            mailKind: selected.mailKind ? selected.mailKind.trim() : "",
            swIndate: selected.swIndate ? formatDate(selected.swIndate) : "",
            swJdate1: selected.swJdate1 ? formatDate(selected.swJdate1) : "",
            swJdate2: selected.swJdate2 ? formatDate(selected.swJdate2) : "",
            swOutDate: selected.swOutDate ? formatDate(selected.swOutDate) : "",
          });

          selected.swStampFile
            ? setImage64(selected.swStampFile)
            : setImage64(null);
        }
      }
    };
    const crud = async (type: string | null) => {
      if (type === "delete") {
        const path = `${base}delete`;
        const formValues = getValues();

        try {
          const response = await API.post(path, formValues);
          if (response.status === 200) {
            toast.success("Deleted", {
              autoClose: 500,
            });
            await fetchData();
          }
        } catch (err) {
          toast.error("Couldn't delete");
        }
      }

      if (type === null) {
        handleSubmit(submit)();
      }
    };

    const submit = async (data: IJNOSAUP) => {
      //form aldaagui uyd ajillana
      const path = isAddBtnClicked ? `${base}insert` : `${base}update`;
      const formValues = getValues();

      formValues.swWorkOut = formValues.swWorkOut ? "Y" : "N";
      formValues.cuSeEmail =
        formValues.cuSeEmail &&
        `${formValues.cuSeEmail.trim()}@${formValues.mailKind}`;

      formValues.swIndate = formValues.swIndate
        ? formatDateByRemoveDash(formValues.swIndate)
        : "";
      formValues.swJdate1 = formValues.swJdate1
        ? formatDateByRemoveDash(formValues.swJdate1)
        : "";
      formValues.swJdate2 = formValues.swJdate2
        ? formatDateByRemoveDash(formValues.swJdate2)
        : "";
      formValues.swOutDate = formValues.swOutDate
        ? formatDateByRemoveDash(formValues.swOutDate)
        : "";

      formValues.swStampFile = image64 && image64;

      try {
        const response: any = await API.post(path, formValues);

        if (response.status === 200) {
          if (isAddBtnClicked) {
            setData((prev: any) => [formValues, ...prev]);
            setSelectedRowIndex(0);
          } else {
            setData((prev: any) => {
              prev[selectedRowIndex] = formValues;
              return [...prev];
            });
          }
          setSelected(formValues);
          toast.success("Action successfull", {
            autoClose: 500,
          });
          setIsAddBtnClicked(false);
        } else {
          toast.error(response?.message);
        }
      } catch (err: any) {
        toast.error(err?.message);
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

    return (
      <form
        className="form_control"
        onSubmit={handleSubmit(submit)}
        style={{ padding: "0px 10px" }}
      >
        <Wrapper>
          <Input
            label="코드"
            register={register("swCode")}
            errors={errors["swCode"]?.message}
            maxLength="2"
          />
          <Field>
            <FormGroup>
              <Label>영업소</Label>
              <Select {...register("areaCode")}>
                {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <div>
              <ErrorText>{errors["areaCode"]?.message}</ErrorText>
            </div>
          </Field>
        </Wrapper>
        <Divider />
        <Wrapper>
          <Input
            label="사원명"
            register={register("swName")}
            errors={errors["swName"]?.message}
          />
          <Input
            label="부서명"
            register={register("swDepartment")}
            errors={errors["swDepartment"]?.message}
          />
        </Wrapper>
        <DividerGray />
        <Wrapper>
          <Field style={{ marginRight: "52px" }}>
            <FormGroup>
              <Label>업무구분</Label>
              <Select {...register("swGubun")}>
                {swGubun?.map((obj, idx) => (
                  <option key={idx} value={obj.code1}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <div>
              <ErrorText>{errors["swGubun"]?.message}</ErrorText>
            </div>
          </Field>
          <Input
            label="주민번호"
            register={register("swJuminno")}
            errors={errors["swJuminno"]?.message}
          />
        </Wrapper>
        <DividerGray />
        <Wrapper>
          <Input
            label="전화번호"
            register={register("swTel")}
            errors={errors["swTel"]?.message}
          />
          <Input
            label="핸드폰"
            register={register("swHp")}
            errors={errors["swHp"]?.message}
          />
        </Wrapper>
        <DividerGray />
        <Wrapper style={{ alignItems: "center" }}>
          <Input
            label="이메일"
            register={register("cuSeEmail")}
            errors={errors["cuSeEmail"]?.message}
          />
          @
          <Select {...register("mailKind")}>
            {dataEmailType?.map((obj, idx) => (
              <option key={idx} value={obj.codeName}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </Wrapper>
        <DividerGray />
        <Wrapper style={{ alignItems: "center" }}>
          <Input
            label="주소"
            register={register("swZipcode")}
            errors={errors["swZipcode"]?.message}
          />
          <DaumAddress setAddress={setAddress} />
          <Input
            register={register("swAddr1")}
            errors={errors["swAddr1"]?.message}
            fullWidth
          />
        </Wrapper>
        <DividerGray />
        <Wrapper>
          <Input
            label=""
            register={register("swAddr2")}
            errors={errors["swAddr2"]?.message}
            fullWidth
          />
        </Wrapper>
        <DividerGray />
        <Wrapper>
          <Input
            label="매핑코드"
            register={register("eyeSwCode")}
            errors={errors["eyeSwCode"]?.message}
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
            <span style={{ color: "#1B8C8E", fontSize: "12px" }}>
              탱크잔량 원격검침 시스템의 매핑할 사원코드를 지정
            </span>
          </p>
        </Wrapper>
        <Divider />
        <Wrapper>
          <div>
            <Wrapper grid col={3} style={{ alignItems: "center" }}>
              <Input
                label="서명화일"
                register={register("swStampFile")}
                errors={errors["swStampFile"]?.message}
                value={image?.name}
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
            </Wrapper>
            <DividerGray />
            <Wrapper style={{ width: "600px" }}>
              <CustomDate
                label="입사일"
                name="swIndate"
                register={register("swIndate")}
                reset={reset}
                errors={errors["swIndate"]?.message}
              />
              <Field style={{ width: "100%" }}>
                <FormGroup>
                  <Label>급여방식</Label>
                  <Select {...register("swPaytype")}>
                    {swPaytype?.map((obj, idx) => (
                      <option key={idx} value={obj.code1}>
                        {obj.codeName}
                      </option>
                    ))}
                  </Select>
                </FormGroup>
                <div>
                  <ErrorText>{errors["swPaytype"]?.message}</ErrorText>
                </div>
              </Field>
            </Wrapper>
            <DividerGray />
            <Wrapper grid>
              <Field flex>
                <Input
                  label="급여액"
                  register={register("swPaykum")}
                  errors={errors["swPaykum"]?.message}
                  textAlign="right"
                />
                <p>원</p>
              </Field>
              <Input
                label="급여일"
                register={register("swPaydate")}
                errors={errors["swPaydate"]?.message}
              />
            </Wrapper>
          </div>
          <ImageWrapper>{image64 && <img src={image64} />}</ImageWrapper>
        </Wrapper>

        <DividerGray />
        <Wrapper>
          <Input
            label="면허종류"
            register={register("swDriverType")}
            errors={errors["swDriverType"]?.message}
          />
          <Input
            label="면허번호"
            register={register("swDriverNo")}
            errors={errors["swDriverNo"]?.message}
          />
        </Wrapper>
        <DividerGray />
        <Wrapper style={{ width: "600px" }}>
          <CustomDate
            label="적성검사"
            name="swJdate1"
            register={register("swJdate1")}
            reset={reset}
            errors={errors["swJdate1"]?.message}
          />
          <CustomDate
            label="~"
            name="swJdate2"
            register={register("swJdate2")}
            reset={reset}
            errors={errors["swJdate2"]?.message}
          />
        </Wrapper>
        <DividerGray />
        <Wrapper>
          <Input
            label="메모"
            register={register("swBigo")}
            errors={errors["swBigo"]?.message}
            fullWidth
          />
        </Wrapper>
        <Divider />
        <Wrapper grid col={2}>
          <Field>
            <FormGroup style={{ alignItems: "center" }}>
              <Label>퇴사여부</Label>
              <CheckBox register={{ ...register("swWorkOut") }} />
              <p
                style={{
                  marginLeft: "25px",
                  fontSize: "12px",
                  paddingTop: "4px",
                }}
              >
                (체크시 퇴사사원)
              </p>
            </FormGroup>
            <div>
              <ErrorText>{errors["swWorkOut"]?.message}</ErrorText>
            </div>
          </Field>
          <CustomDate
            label="퇴사일"
            name="swOutDate"
            register={register("swOutDate")}
            reset={reset}
            errors={errors["swOutDate"]?.message}
          />
        </Wrapper>
        <DividerGray />
        <p
          style={{
            display: "flex",
            right: "32px",
            alignItems: "center",
            marginLeft: "113px",
            marginBottom: "18px",
            gap: "6px",
            marginTop: "6px",
          }}
        >
          <IconInfo />
          <span style={{ color: "#1B8C8E", fontSize: "12px" }}>
            퇴사사원은 판매등록 사원에서 제외 됩니다.
          </span>
        </p>
        <DividerGray />
        <Wrapper>
          <Field flex>
            <Input
              label="가불금액"
              register={register("sgKumack")}
              errors={errors["sgKumack"]?.message}
              textAlign="right"
            />
            <p>원</p>
          </Field>
        </Wrapper>
        <DividerGray />
      </form>
    );
  }
);

export default Form;
