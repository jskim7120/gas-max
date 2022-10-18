import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "app/store";
// import {
//   addEmployee,
//   updateEmployee,
//   deleteEmployee,
//   getEmployees,
// } from "features/employee/employeeSlice";
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
import { InputSize } from "components/componentsType";
import { IFormProps } from "./type";
import DaumAddress from "components/daum";
import { schema } from "./validation";
import PlainTab from "components/plainTab";
import { TabContentWrapper } from "components/plainTab/style";
import getTabContent from "./getTabContent";
import Loader from "components/loader";

interface IForm {
  selected: any;
}

const Form = React.forwardRef(
  ({ selected }: IForm, ref: React.ForwardedRef<HTMLFormElement>) => {
    const dispatch = useDispatch();
    const [isClickedAdd, setIsClikedAdd] = useState(false);
    const [tabId, setTabId] = useState(0);
    const [addr, setAddress] = useState<string>("");

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
      console.log("udpate duudagdav");

      if (isClickedAdd) {
        //createCustomer
      } else {
        //updateCustomer
      }
    };

    //if (!selected) return <Loader size={25} />;
    if (!selected) return <p>..loading</p>;

    return (
      <form onSubmit={handleSubmit(update)} style={{ padding: "0px 10px" }}>
        <Wrapper grid>
          <Input
            label="코드"
            register={register("areaCode")}
            errors={errors["areaCode"]?.message}
          />
          <Input
            label="영업소명"
            register={register("areaName")}
            errors={errors["areaName"]?.message}
          />
        </Wrapper>
        <Divider />
        <Wrapper grid>
          <Input
            label="사업자번호"
            register={register("jnSsno")}
            errors={errors["jnSsno"]?.message}
          />
          <Input
            label="상호"
            register={register("jnSangho")}
            errors={errors["jnSangho"]?.message}
          />
          <Input
            label="대표"
            register={register("jnSajang")}
            errors={errors["jnSajang"]?.message}
          />
        </Wrapper>
        <DividerGray />
        <Wrapper style={{ alignItems: "center" }}>
          <Input
            label="주소"
            value={addr ? addr?.split("/")[1] : ""}
            register={register("jnZipcode")}
            errors={errors["jnZipcode"]?.message}
          />
          <DaumAddress setAddress={setAddress} />
          <Input
            value={addr ? addr?.split("/")[0] : ""}
            register={register("jnAddr1")}
            errors={errors["jnAddr1"]?.message}
            fullWidth
          />
        </Wrapper>
        <DividerGray />
        <Wrapper>
          <Input
            label=""
            register={register("jnAddr2")}
            errors={errors["jnAddr2"]?.message}
            fullWidth
          />
        </Wrapper>
        <DividerGray />
        <Wrapper>
          <Input
            label="업태"
            register={register("jnUptae")}
            errors={errors["jnUptae"]?.message}
            fullWidth
          />
          <Input
            label="종목"
            register={register("jnJongmok")}
            errors={errors["jnJongmok"]?.message}
            fullWidth
          />
        </Wrapper>
        <DividerGray />
        <Wrapper grid>
          <Input
            label="대표전화"
            register={register("jnTel1")}
            errors={errors["jnTel1"]?.message}
          />
          <Input
            label="대표전화2"
            register={register("jnTel2")}
            errors={errors["jnTel2"]?.message}
          />

          <Input
            label="팩스"
            register={register("jnFax")}
            errors={errors["jnFax"]?.message}
          />
        </Wrapper>
        <Divider />
        <Wrapper grid>
          <Input
            label="안전관리 총괄자"
            register={register("jnAnName1")}
            errors={errors["jnAnName1"]?.message}
          />
          <Input
            label="전화"
            register={register("jnAnTel1")}
            errors={errors["jnAnTel1"]?.message}
          />
        </Wrapper>
        <DividerGray />
        <Wrapper grid>
          <Input
            label="안전관리 책임자"
            register={register("jnAnName2")}
            errors={errors["jnAnName2"]?.message}
          />
          <Input
            label="전화"
            register={register("jnAnTel2")}
            errors={errors["jnAnTel2"]?.message}
          />
        </Wrapper>
        <Divider />
        <Wrapper grid col={2} style={{ gridTemplateColumns: " 2fr 4fr" }}>
          <Field>
            <FormGroup>
              <Label>세금계산서 양식</Label>
              <Select {...register("jnSekum")}>
                <option value="A4 백지">A4 백지</option>
                <option value="0">0</option>
              </Select>
            </FormGroup>
            <div>
              <ErrorText>{errors["jnSekum"]?.message}</ErrorText>
            </div>
          </Field>
          <Wrapper grid col={3}>
            <Field>
              <FormGroup>
                <CheckBox
                  register={{ ...register("jnSegongYn") }}
                  title="공급사업자 인쇄안함"
                />
              </FormGroup>
              <div>
                <ErrorText>{errors["jnSegongYn"]?.message}</ErrorText>
              </div>
            </Field>
            <Field>
              <FormGroup>
                <CheckBox
                  register={{ ...register("jnVatSumyn") }}
                  title="Vat 별도 단가계산"
                />
              </FormGroup>
              <div>
                <ErrorText>{errors["jnVatSumyn"]?.message}</ErrorText>
              </div>
            </Field>
            <Field>
              <FormGroup>
                <CheckBox
                  register={{ ...register("jnSekumEa") }}
                  title="수량 단가 인쇄 유무"
                />
              </FormGroup>
              <div>
                <ErrorText>{errors["jnSekumEa"]?.message}</ErrorText>
              </div>
            </Field>
          </Wrapper>
        </Wrapper>
        <DividerGray />
        <Wrapper>
          <Field>
            <FormGroup>
              <Label>거래명세표 양식</Label>
              <Select {...register("jnJangbu")}>
                <option value="1">1 인쇄용지</option>
                <option value="2">2 인쇄용지</option>
                <option value="0">0 인쇄용지</option>
              </Select>
            </FormGroup>
            <div>
              <ErrorText>{errors["jnJangbu"]?.message}</ErrorText>
            </div>
          </Field>
        </Wrapper>
        <DividerGray />

        <Wrapper grid col={3}>
          <Input
            label="탱크잔량/원격검침 발신기 업체번호"
            labelLong
            register={register("jnCmngno")}
            errors={errors["jnCmngno"]?.message}
          />
          <Field>
            <FormGroup>
              <CheckBox
                register={{ ...register("niceBankYn") }}
                title="Nice 계좌자동이체 사용"
              />
            </FormGroup>
            <div>
              <ErrorText>{errors["niceBankYn"]?.message}</ErrorText>
            </div>
          </Field>
          <Field>
            <FormGroup>
              <CheckBox
                register={{ ...register("innopayBankYn") }}
                title="Innopay 카드자동이체 사용"
              />
            </FormGroup>
            <div>
              <ErrorText>{errors["innopayBankYn"]?.message}</ErrorText>
            </div>
          </Field>
        </Wrapper>
        <DividerGray />
        <div style={{ marginTop: "30px" }}>
          <PlainTab
            tabHeader={["지로 양식", "고객안내문", "입금계좌  안내", "결재란"]}
            onClick={(id) => setTabId(id)}
          />
          <TabContentWrapper>
            {getTabContent(tabId, register, errors)}
          </TabContentWrapper>
        </div>
      </form>
    );
  }
);

export default Form;
