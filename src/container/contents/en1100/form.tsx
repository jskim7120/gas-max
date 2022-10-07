import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
} from "react";
import DatePicker from "react-datepicker";
import { useForm, Path, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "app/store";
import {
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployees,
} from "features/employee/employeeSlice";
import {
  InputForm,
  InputTest,
  Select,
  Field,
  ErrorText,
  FormGroup,
  FormInline,
  FormBlock,
  Wrapper,
  Divider,
  DividerGray,
  Label,
} from "components/form/style";
import CheckBox from "components/checkbox2";
import { InputSize } from "components/componentsType";
import { IFormProps } from "./type";
import { MagnifyingGlass } from "components/allSvgIcon";
import { schema } from "./validation";
import PlainTab from "components/plainTab";
import { TabContentWrapper } from "components/plainTab/style";
import getTabContent from "../getTabContent";

interface IForm {
  selected: any;
}

const Form = React.forwardRef(
  ({ selected }: IForm, ref: React.ForwardedRef<HTMLFormElement>) => {
    const dispatch = useDispatch();
    const [isClickedAdd, setIsClikedAdd] = useState(false);
    const [tabId, setTabId] = useState(0);

    useEffect(() => {
      if (JSON.stringify(selected) !== "{}") {
        reset(selected);
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
        } else if (type === "reset") {
          for (const [key, value] of Object.entries(selected)) {
            newData[key] = value;
          }
        }
        reset(newData);
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

    // if (selected && JSON.stringify(selected) === "{}")
    if (!selected) return <p>Loading...</p>;

    return (
      <form onSubmit={handleSubmit(update)} style={{ padding: "0px 10px" }}>
        <Wrapper grid>
          <InputTest
            label="코드"
            name="areaCode"
            register={register}
            errors={errors}
          />
          <InputTest
            label="영업소명"
            name="areaName"
            register={register}
            errors={errors}
          />
        </Wrapper>
        <Divider />
        <Wrapper grid>
          <InputTest
            label="사업자번호"
            name="jnSsno"
            register={register}
            errors={errors}
          />
          <InputTest
            label="상호"
            name="jnSangho"
            register={register}
            errors={errors}
          />
          <InputTest
            label="대표"
            name="jnSajang"
            register={register}
            errors={errors}
          />
        </Wrapper>
        <DividerGray />
        <Wrapper style={{ alignItems: "center" }}>
          <InputTest
            label="주소"
            name="jnZipcode"
            register={register}
            errors={errors}
          />
          <button
            style={{
              width: "25px",
              height: "25px",
              background: "#666666",
              padding: "2px 0 0 4px",
              borderRadius: "5px",
              border: "1px solid #707070",
            }}
            type="button"
          >
            <MagnifyingGlass />
          </button>
          <InputTest
            name="jnAddr1"
            register={register}
            errors={errors}
            fullWidth
          />
        </Wrapper>
        <DividerGray />
        <Wrapper>
          <InputTest
            label=""
            name="jnAddr2"
            register={register}
            errors={errors}
            fullWidth
          />
        </Wrapper>
        <DividerGray />
        <Wrapper>
          <InputTest
            label="업태"
            name="jnUptae"
            register={register}
            errors={errors}
            fullWidth
          />
          <InputTest
            label="종목"
            name="jnJongmok"
            register={register}
            errors={errors}
            fullWidth
          />
        </Wrapper>
        <DividerGray />
        <Wrapper grid>
          <InputTest
            label="대표전화"
            name="jnTel1"
            register={register}
            errors={errors}
          />
          <InputTest
            label="대표전화2"
            name="jnTel2"
            register={register}
            errors={errors}
          />

          <InputTest
            label="팩스"
            name="jnFax"
            register={register}
            errors={errors}
          />
        </Wrapper>
        <Divider />
        <Wrapper grid>
          <InputTest
            label="안전관리 총괄자"
            name="jnAnName1"
            register={register}
            errors={errors}
          />
          <InputTest
            label="전화"
            name="jnAnTel1"
            register={register}
            errors={errors}
          />
        </Wrapper>
        <DividerGray />
        <Wrapper grid>
          <InputTest
            label="안전관리 책임자"
            name="jnAnName2"
            register={register}
            errors={errors}
          />
          <InputTest
            label="전화"
            name="jnAnTel2"
            register={register}
            errors={errors}
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
                  {...register("jnSegongYn")}
                  name="공급사업자 인쇄안함"
                  defaultChecked={selected.jnSegongYn === "Y"}
                />
              </FormGroup>
              <div>
                <ErrorText>{errors["jnSegongYn"]?.message}</ErrorText>
              </div>
            </Field>
            <Field>
              <FormGroup>
                <CheckBox
                  {...register("jnVatSumyn")}
                  name="Vat 별도 단가계산"
                  defaultChecked={selected.jnVatSumyn === "Y"}
                />
              </FormGroup>
              <div>
                <ErrorText>{errors["jnVatSumyn"]?.message}</ErrorText>
              </div>
            </Field>
            <Field>
              <FormGroup>
                <CheckBox
                  {...register("jnSekumEa")}
                  name="수량 단가 인쇄 유무"
                  defaultChecked={selected.jnSekumEa === "Y"}
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
          <InputTest
            label="탱크잔량/원격검침 발신기 업체번호"
            labelLong
            name="jnCmngno"
            register={register}
            errors={errors}
          />
          <Field>
            <FormGroup>
              <CheckBox
                {...register("innopayBankYn")}
                name="Nice 계좌자동이체 사용"
                defaultChecked={selected.innopayBankYn === "Y"}
              />
            </FormGroup>
            <div>
              <ErrorText>{errors["innopayBankYn"]?.message}</ErrorText>
            </div>
          </Field>
          <Field>
            <FormGroup>
              <CheckBox
                {...register("niceBankYn")}
                name="Innopay 카드자동이체 사용"
                defaultChecked={selected.niceBankYn === "Y"}
              />
            </FormGroup>
            <div>
              <ErrorText>{errors["niceBankYn"]?.message}</ErrorText>
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
