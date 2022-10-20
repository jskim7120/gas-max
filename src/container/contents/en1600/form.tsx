import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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
} from "components/form/style";
import CheckBox from "components/checkbox";
import { InputSize } from "components/componentsType";
import { IFormProps } from "./type";
import DaumAddress from "components/daum";
import { schema } from "./validation";
import Loader from "components/loader";
import { useGetCommonGubunQuery } from "app/api/commonGubun";
import { SearchIcon } from "components/allSvgIcon";
import DatePicker from "react-datepicker";
import { formatDateToString } from "helpers/dateFormat";
import CustomDate from "./date";

interface IForm {
  selected: any;
}

const Form = React.forwardRef(
  ({ selected }: IForm, ref: React.ForwardedRef<HTMLFormElement>) => {
    const dispatch = useDispatch();
    const [isClickedAdd, setIsClikedAdd] = useState(false);
    const [tabId, setTabId] = useState(0);
    const [addr, setAddress] = useState<string>("");
    const [image, setImage] = useState<{
      file: any;
      name: string;
    }>();

    const { data: jnSekum, isError: isJnSekumError } =
      useGetCommonGubunQuery("12");

    const { data: jnJangbu, isError: isJnJangbuError } =
      useGetCommonGubunQuery("10");

    const { data: jnJiro, isError: isJnJiroError } =
      useGetCommonGubunQuery("17");

    useEffect(() => {
      if (JSON.stringify(selected) !== "{}") {
        reset({
          ...selected,
          innopayBankYn: selected?.innopayBankYn === "Y",
          niceBankYn: selected?.niceBankYn === "Y",
          jnSekumEa: selected?.jnSekumEa === "Y",
          jnSegongYn: selected?.jnSegongYn === "Y",
          jnVatSumyn: selected?.jnVatSumyn === "Y",
        });
      }
    }, [selected]);

    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
      control,
      getValues,
    } = useForm<IFormProps>({
      resolver: yupResolver(schema),
    });

    const resetForm = (type: string) => {
      if (JSON.stringify(selected) !== "{}") {
        console.log("type:", type);
        let newData: any = {};

        if (type === "clear") {
          for (const [key, value] of Object.entries(selected)) {
            newData[key] = null;
          }
          setIsClikedAdd(true);
          reset(newData);
        } else if (type === "reset") {
          for (const [key, value] of Object.entries(selected)) {
            newData[key] = value;
          }

          reset({
            ...newData,
            innopayBankYn: selected?.innopayBankYn === "Y",
            niceBankYn: selected?.niceBankYn === "Y",
            jnSekumEa: selected?.jnSekumEa === "Y",
            jnSegongYn: selected?.jnSegongYn === "Y",
            jnVatSumyn: selected?.jnVatSumyn === "Y",
          });
        }
      }
    };

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      submitForm() {
        handleSubmit(update)();
      },
      resetForm,
    }));

    const update = (data: IFormProps) => {
      console.log("udpate duudagdav:", data);

      if (isClickedAdd) {
        //createCustomer
      } else {
        //updateCustomer
      }
    };

    //if (!selected) return <Loader size={25} />;
    if (!selected) return <p>..loading</p>;

    const onFileUpload = () => {
      const formData = new FormData();

      //formData.append("myFile");
      //axios.post("api/uploadfile", formData);
    };
    const handleDateChange = (date: Date) => {
      const stringDate = formatDateToString(date);
      console.log("stringDate========>", stringDate);
      reset({
        swIndate: stringDate,
      });
    };

    return (
      <form onSubmit={handleSubmit(update)} style={{ padding: "0px 10px" }}>
        <Wrapper>
          <Input
            label="코드"
            register={register("swCode")}
            errors={errors["swCode"]?.message}
          />
          <Input
            label="영업소"
            register={register("areaCode")}
            errors={errors["areaCode"]?.message}
          />
        </Wrapper>
        <Divider />
        <Wrapper>
          <Input
            label="사원명"
            register={register("swName")}
            errors={errors["swName"]?.message}
          />
          <Input
            label="상호"
            register={register("swDepartment")}
            errors={errors["swDepartment"]?.message}
          />
        </Wrapper>
        <DividerGray />
        <Wrapper>
          <Input
            label="업무구분"
            register={register("swGubun")}
            errors={errors["swGubun"]?.message}
          />
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
        <Wrapper>
          <Input
            label="이메일"
            register={register("cuSeEmail")}
            errors={errors["cuSeEmail"]?.message}
          />
          @
          <Select>
            <option value="naver.com">naver.com</option>
          </Select>
        </Wrapper>
        <DividerGray />
        <Wrapper style={{ alignItems: "center" }}>
          <Input
            label="주소"
            value={addr ? addr?.split("/")[1] : ""}
            register={register("swZipcode")}
            errors={errors["swZipcode"]?.message}
          />
          <DaumAddress setAddress={setAddress} />
          <Input
            value={addr ? addr?.split("/")[0] : ""}
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
                  onChange={(event) => {
                    console.log("changed", event?.target?.files);
                    setImage({
                      name: event?.target?.files
                        ? event?.target?.files[0].name
                        : "",

                      file: event?.target?.files
                        ? URL.createObjectURL(event?.target?.files[0])
                        : "",
                    });
                  }}
                />
              </button>
            </Wrapper>
            <DividerGray />
            <Wrapper grid>
              <CustomDate
                label="입사일----"
                name="swIndate"
                register={register("swIndate")}
                reset={reset}
                errors={errors["swIndate"]?.message}
              />
              <Input
                label="급여방식"
                register={register("swPaytype")}
                errors={errors["swPaytype"]?.message}
              />
            </Wrapper>
            <DividerGray />
            <Wrapper grid>
              <Input
                label="급여액-----"
                register={register("swPaykum")}
                errors={errors["swPaykum"]?.message}
              />
              <Input
                label="급여일"
                register={register("swPaydate")}
                errors={errors["swPaydate"]?.message}
              />
            </Wrapper>
          </div>
          <div
            style={{
              width: "100px",
              height: "100px",
            }}
          >
            {image?.file && (
              <img
                src={image?.file}
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            )}
          </div>
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
        <Wrapper>
          <CustomDate
            label="입사일"
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
        <Wrapper grid>
          <Field>
            <FormGroup>
              <div style={{ width: "50px" }}></div>
              <CheckBox
                register={{ ...register("swWorkOut") }}
                title="퇴사여부"
              />
              <p style={{ marginLeft: "25px" }}>(체크시 퇴사사원)</p>
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
        <Wrapper>
          <Input
            label="가불금액"
            register={register("swGabul")}
            errors={errors["swGabul"]?.message}
          />
        </Wrapper>
      </form>
    );
  }
);

export default Form;
