import React, { useImperativeHandle, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "app/store";
import {
  Input,
  Select,
  Field,
  ErrorText,
  FormGroup,
  Wrapper,
  Divider,
  DividerGray,
  Label,
} from "components/form/style";
import CheckBox from "components/checkbox";
import { ICAR } from "./model";
import DaumAddress from "components/daum";
import { schema } from "./validation";
import { SearchIcon, IconHome, IconReceipt } from "components/allSvgIcon";
import { formatDateToString } from "helpers/dateFormat";
import CustomDate from "components/customDatePicker";
import { InputSize } from "components/componentsType";
import { convertBase64 } from "helpers/convertBase64";
import { useGetCommonGubunQuery } from "app/api/commonGubun";
import { useGetAreaCodeQuery } from "app/api/areaCode";
import API from "app/axios";
import IconInfo from "assets/image/Icon-info.png";
import { ImageWrapper } from "../style";

interface IForm {
  selected: any;
  fetchData: any;
}
const base = "/app/EN1700/";

const Form = React.forwardRef(
  (
    { selected, fetchData }: IForm,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const dispatch = useDispatch();

    const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);
    const [addr, setAddress] = useState<string>("");
    const [image, setImage] = useState<{ name: string }>();
    const [image64, setImage64] = useState<any>(null);

    const { data: areaCode } = useGetAreaCodeQuery();
    console.log("areaCode================>", areaCode);
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
      getValues,
    } = useForm<ICAR>({ mode: "onChange", resolver: yupResolver(schema) });

    useEffect(() => {
      if (selected !== undefined && JSON.stringify(selected) !== "{}") {
        resetForm("reset");
      }
    }, [selected]);

    useEffect(() => {
      // if (addr.length > 0) {
      //   reset({
      //     saupZipcode: addr ? addr?.split("/")[1] : "",
      //     saupAddr1: addr ? addr?.split("/")[0] : "",
      //   });
      // }
    }, [addr]);

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
            saupStampQu: selected?.saupStampQu === "Y",
            saupStampEs: selected?.saupStampEs === "Y",
            saupStampSe: selected?.saupStampSe === "Y",
            saupEdiEmail: selected?.saupEdiEmail
              ? selected.saupEdiEmail.split("@")[0]
              : "",
            emailType: selected?.saupEdiEmail
              ? selected.saupEdiEmail.split("@")[1]
              : "",
          });
          selected.saupStamp
            ? setImage64(selected.saupStamp)
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
            toast.success("Deleted");
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

    const submit = async (data: ICAR) => {
      //form aldaagui uyd ajillana
      const path = isAddBtnClicked ? `${base}insert` : `${base}update`;
      const formValues = getValues();

      // formValues.saupStampQu = formValues.saupStampQu ? "Y" : "N";
      // formValues.saupStampEs = formValues.saupStampEs ? "Y" : "N";

      // formValues.saupEdiEmail =
      //   formValues.saupEdiEmail &&
      //   `${formValues.saupEdiEmail}@${formValues.emailType}`;

      // formValues.saupStamp = image64 && image64;

      try {
        const response: any = await API.post(path, formValues);
        if (response.status === 200) {
          toast.success("Action successful");
          setIsAddBtnClicked(false);
          await fetchData();
        } else {
          toast.error(response.response.data?.message);
        }
      } catch (err: any) {
        toast.error(err?.message);
      }
    };

    return (
      <form onSubmit={handleSubmit(submit)} style={{ padding: "0px 10px" }}>
        <Wrapper grid col={2}>
          <Input
            label="코드"
            register={register("caCode")}
            errors={errors["caCode"]?.message}
            inputSize={InputSize.sm}
          />
          <Field>
            <FormGroup>
              <Label>영업소</Label>
              <Select {...register("areaCode")}>
                {areaCode?.map((obj, idx) => (
                  <option key={idx} value={obj.code1}>
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
        <Wrapper grid col={2}>
          <Input
            label="차량번호"
            register={register("caName")}
            errors={errors["caName"]?.message}
            inputSize={InputSize.md}
          />
          <Field>
            <FormGroup>
              <Label>담당사원</Label>
              <Select {...register("caSwCode")}>
                {/* {caSwCode?.map((obj, idx) => (
                  <option key={idx} value={obj.code1}>
                    {obj.codeName}
                  </option>
                ))} */}
              </Select>
            </FormGroup>
            <div>
              <ErrorText>{errors["caSwCode"]?.message}</ErrorText>
            </div>
          </Field>
        </Wrapper>
        <DividerGray />
        <Wrapper grid col={2}>
          <Field>
            <FormGroup style={{ alignItems: "center" }}>
              <Label>벌크로리차량유무</Label>
              <CheckBox register={{ ...register("caBkYn") }} />
            </FormGroup>
            <div>
              <ErrorText>{errors["caBkYn"]?.message}</ErrorText>
            </div>
          </Field>
          <Field>
            <FormGroup>
              <Label>재고사용유무</Label>
              <Select {...register("caJaegoyn")}>
                {/* {caJaegoyn?.map((obj, idx) => (
                  <option key={idx} value={obj.code1}>
                    {obj.codeName}
                  </option>
                ))} */}
              </Select>
            </FormGroup>
            <div>
              <ErrorText>{errors["caJaegoyn"]?.message}</ErrorText>
            </div>
          </Field>
        </Wrapper>
        <Wrapper>
          <Field>
            <FormGroup>
              <Label>매핑코드</Label>
              <Select {...register("eyeCarCode")}>
                {/* {eyeCarCode?.map((obj, idx) => (
                  <option key={idx} value={obj.code1}>
                    {obj.codeName}
                  </option>
                ))} */}
              </Select>
            </FormGroup>
            <div>
              <ErrorText>{errors["eyeCarCode"]?.message}</ErrorText>
            </div>
          </Field>
          info nogoon
        </Wrapper>
        <Wrapper grid col={2}>
          <CustomDate
            label="안전검사일"
            name="caSafeDate"
            register={register("caSafeDate")}
            reset={reset}
            errors={errors["caSafeDate"]?.message}
          />
          <Input
            label="충전기한"
            register={register("caChargeDate")}
            errors={errors["caChargeDate"]?.message}
            inputSize={InputSize.sm}
          />
        </Wrapper>
        <Divider />
        <Wrapper grid col={2}>
          <Field>
            <FormGroup>
              <Label>차량종류</Label>
              <Select {...register("caType")}>
                {/* {caType?.map((obj, idx) => (
                  <option key={idx} value={obj.code1}>
                    {obj.codeName}
                  </option>
                ))} */}
              </Select>
            </FormGroup>
            <div>
              <ErrorText>{errors["caType"]?.message}</ErrorText>
            </div>
          </Field>
          <Input
            label="연식"
            register={register("caYear")}
            errors={errors["caYear"]?.message}
            inputSize={InputSize.sm}
          />
        </Wrapper>
        <DividerGray />
        <Wrapper grid col={2}>
          <Input
            label="차량소유자"
            register={register("caManager")}
            errors={errors["caManager"]?.message}
            inputSize={InputSize.sm}
          />
          <CustomDate
            label="구입일자"
            name="caInDate"
            register={register("caInDate")}
            reset={reset}
            errors={errors["caInDate"]?.message}
          />
        </Wrapper>
        <DividerGray />
        <Wrapper grid col={2}>
          <Field>
            <FormGroup style={{ alignItems: "center" }}>
              <Label>리스/렌트 유무</Label>
              <CheckBox register={{ ...register("caRentYn") }} />
            </FormGroup>
            <div>
              <ErrorText>{errors["caRentYn"]?.message}</ErrorText>
            </div>
          </Field>

          <CustomDate
            label="리스기간"
            name="caRentDate"
            register={register("caRentDate")}
            reset={reset}
            errors={errors["caRentDate"]?.message}
          />
        </Wrapper>
        <DividerGray />
        <Wrapper>
          <CustomDate
            label="정기검사일"
            name="caJdate1"
            register={register("caJdate1")}
            reset={reset}
            errors={errors["caJdate1"]?.message}
          />
          <CustomDate
            label="~"
            name="caJdate2"
            register={register("caJdate2")}
            reset={reset}
            errors={errors["caJdate2"]?.message}
          />
        </Wrapper>
        <DividerGray />
        <Wrapper>
          <Input
            label="메모"
            register={register("caBigo")}
            errors={errors["caBigo"]?.message}
            inputSize={InputSize.sm}
            fullWidth
          />
        </Wrapper>
        <Divider />
        <Wrapper grid col={2}>
          <Input
            label="차량가액--baihgui"
            register={register("caAmt")}
            errors={errors["caAmt"]?.message}
            inputSize={InputSize.sm}
            fullWidth
          />
          <Field>
            <Input
              label="감가 기간--bhgui"
              register={register("caDiscountM")}
              errors={errors["caDiscountM"]?.message}
              inputSize={InputSize.sm}
              fullWidth
            />
            월
          </Field>
        </Wrapper>
        <DividerGray />
        <Wrapper grid col={2}>
          <Input
            label="월리스료--baihgui"
            register={register("caMAmt")}
            errors={errors["caAmt"]?.message}
            inputSize={InputSize.sm}
            fullWidth
          />
          <Field>
            <Input
              label="월감가상각비--bhgui"
              register={register("caDiscountAmt")}
              errors={errors["caDiscountAmt"]?.message}
              inputSize={InputSize.sm}
              fullWidth
            />
          </Field>
        </Wrapper>
        <Divider />
        <Wrapper>
          <Input
            label="보험회사"
            register={register("caBco")}
            errors={errors["caBco"]?.message}
            inputSize={InputSize.sm}
          />
        </Wrapper>
        <DividerGray />
        <Wrapper grid col={2}>
          <Input
            label="계약지점"
            register={register("caBjijum")}
            errors={errors["caBjijum"]?.message}
            inputSize={InputSize.sm}
          />
          <Input
            label="담당자"
            register={register("caBdamdang")}
            errors={errors["caBdamdang"]?.message}
            inputSize={InputSize.sm}
          />
        </Wrapper>
        <DividerGray />
        <Wrapper grid col={2}>
          <Input
            label="전화번호"
            register={register("caBtel")}
            errors={errors["caBtel"]?.message}
            inputSize={InputSize.sm}
          />
          <Input
            label="핸드폰"
            register={register("caBhp")}
            errors={errors["caBhp"]?.message}
            inputSize={InputSize.sm}
          />
        </Wrapper>
        <DividerGray />
        <Wrapper grid col={2}>
          <Input
            label="피보험자"
            register={register("caBman")}
            errors={errors["caBman"]?.message}
            inputSize={InputSize.sm}
          />
          <Input
            label="증권번호"
            register={register("caBno")}
            errors={errors["caBno"]?.message}
            inputSize={InputSize.sm}
          />
        </Wrapper>
        <DividerGray />
        <Wrapper>
          <Field>
            <FormGroup style={{ alignItems: "center" }}>
              <Label>연령특약</Label>
              <CheckBox register={{ ...register("caBage") }} />
            </FormGroup>
            <div>
              <ErrorText>{errors["caBage"]?.message}</ErrorText>
            </div>
          </Field>
        </Wrapper>
        <DividerGray />
        <Wrapper grid col={2}>
          <CustomDate
            label="보험기간"
            name="caBsdate"
            register={register("caBsdate")}
            reset={reset}
            errors={errors["caBsdate"]?.message}
          />
          <CustomDate
            label="~"
            name="caBldate"
            register={register("caBldate")}
            reset={reset}
            errors={errors["caBldate"]?.message}
          />
        </Wrapper>
        <DividerGray />
        <Wrapper>
          <Input
            label="보험료"
            register={register("caInsuranceAmt")}
            errors={errors["caInsuranceAmt"]?.message}
            inputSize={InputSize.sm}
          />
        </Wrapper>
      </form>
    );
  }
);

export default Form;
