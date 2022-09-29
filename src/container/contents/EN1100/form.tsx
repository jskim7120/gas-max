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
  Input,
  Select,
  Field,
  ErrorText,
  FormGroup,
  FormInline,
  FormBlock,
  Wrapper,
  Divider,
} from "components/form/style";
import CheckBox from "components/CheckBox";
import { InputSize } from "components/ComponentsType";
import { IFormProps } from "./type";
import { MagnifyingGlass } from "components/AllSvgIcon";
// import { schema } from "./validation";
import PlainTab from "components/plainTab";
import { TabContentWrapper } from "components/plainTab/style";
import getTabContent from "../getTabContent";

interface IForm {
  selected: any;
  getFormValues: (arg: Object) => void;
}

function Form(
  { selected, getFormValues }: IForm,
  ref?: React.ForwardedRef<any>
) {
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
    // resolver: yupResolver(schema),
  });

  /* 
  const resetForm = (type: string) => {
    if (JSON.stringify(selected) !== "{}") {
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
  */

  const update = (data: IFormProps) => {
    getFormValues({ ...getValues(), action: "update" });
    if (isClickedAdd) {
      //createCustomer
    } else {
      //updateCustomer
    }
  };

  // if (selected && JSON.stringify(selected) === "{}")
  if (!selected) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit(update)} style={{ padding: "10px 15px" }}>
      <Wrapper grid>
        <Field>
          <FormGroup>
            <label>코드:</label>
            <Input
              {...register("areaCode")}
              type="number"
              inputSize={InputSize.sm}
            />
          </FormGroup>
          <div>
            <ErrorText>{errors["areaCode"]?.message}</ErrorText>
          </div>
        </Field>
        <Field>
          <FormGroup>
            <label>영업소명:</label>
            <Input
              {...register("areaName")}
              type="number"
              inputSize={InputSize.md}
            />
          </FormGroup>
          <div>
            <ErrorText>{errors["areaName"]?.message}</ErrorText>
          </div>
        </Field>
      </Wrapper>
      <Divider />
      <Wrapper grid>
        <Field>
          <FormGroup>
            <label>사업자번호:</label>
            <Input {...register("jnSsno")} type="text" />
          </FormGroup>
          <div>
            <ErrorText>{errors["jnSsno"]?.message}</ErrorText>
          </div>
        </Field>
        <Field>
          <FormGroup>
            <label>상호:</label>
            <Input
              {...register("jnSangho")}
              type="text"
              inputSize={InputSize.md}
            />
          </FormGroup>
          <div>
            <ErrorText>{errors["jnSangho"]?.message}</ErrorText>
          </div>
        </Field>
        <Field>
          <FormGroup>
            <label>대표:</label>
            <Input {...register("jnSajang")} type="text" />
          </FormGroup>
          <div>
            <ErrorText>{errors["jnSajang"]?.message}</ErrorText>
          </div>
        </Field>
      </Wrapper>
      <Wrapper style={{ alignItems: "center" }}>
        <Field>
          <FormGroup>
            <label> 주소:</label>
            <Input {...register("jnZipcode")} type="text" />
          </FormGroup>
          <div>
            <ErrorText>{errors["jnZipcode"]?.message}</ErrorText>
          </div>
        </Field>
        <Field>
          <button
            style={{
              width: "25px",
              height: "25px",
              background: "#666666",
              padding: "2px 0 0 4px",
              borderRadius: "5px",
              border: "1px solid #707070",
            }}
          >
            <MagnifyingGlass />
          </button>
        </Field>
        <Field>
          <Input
            {...register("jnAddr1")}
            type="text"
            inputSize={InputSize.md}
          />
          <div>
            <ErrorText>{errors["jnAddr1"]?.message}</ErrorText>
          </div>
        </Field>
      </Wrapper>
      <Wrapper>
        <FormGroup>
          <label></label>
          <Input
            {...register("jnAddr2")}
            type="text"
            inputSize={InputSize.lg}
          />
        </FormGroup>
        <div>
          <ErrorText>{errors["jnAddr2"]?.message}</ErrorText>
        </div>
      </Wrapper>
      <Wrapper grid col={2}>
        <Field>
          <FormGroup>
            <label>업태:</label>
            <Input
              {...register("jnUptae")}
              type="text"
              inputSize={InputSize.md}
            />
          </FormGroup>
          <div>
            <ErrorText>{errors["jnUptae"]?.message}</ErrorText>
          </div>
        </Field>
        <Field>
          <FormGroup>
            <label>종목:</label>
            <Input
              {...register("jnJongmok")}
              type="text"
              inputSize={InputSize.md}
            />
          </FormGroup>
          <div>
            <ErrorText>{errors["jnJongmok"]?.message}</ErrorText>
          </div>
        </Field>
      </Wrapper>
      <Wrapper grid>
        <Field>
          <FormGroup>
            <label>대표전화:</label>
            <Input {...register("jnTel1")} type="text" />
          </FormGroup>
          <div>
            <ErrorText>{errors["jnTel1"]?.message}</ErrorText>
          </div>
        </Field>
        <Field>
          <FormGroup>
            <label>대표전화2:</label>
            <Input {...register("jnTel2")} type="text" />
          </FormGroup>
          <div>
            <ErrorText>{errors["jnTel2"]?.message}</ErrorText>
          </div>
        </Field>
        <Field>
          <FormGroup>
            <label>팩스:</label>
            <Input {...register("jnFax")} type="text" />
          </FormGroup>
          <div>
            <ErrorText>{errors["jnFax"]?.message}</ErrorText>
          </div>
        </Field>
      </Wrapper>
      <Divider />
      <Wrapper grid>
        <Field>
          <FormGroup>
            <label>안전관리 총괄자:</label>
            <Input {...register("jnAnName1")} type="text" />
          </FormGroup>
          <div>
            <ErrorText>{errors["jnAnName1"]?.message}</ErrorText>
          </div>
        </Field>
        <Field>
          <FormGroup>
            <label>전화:</label>
            <Input {...register("jnAnTel1")} type="text" />
          </FormGroup>
          <div>
            <ErrorText>{errors["jnAnTel1"]?.message}</ErrorText>
          </div>
        </Field>
      </Wrapper>
      <Wrapper>
        <Field>
          <FormGroup>
            <label>안전관리 책임자:</label>
            <Input {...register("jnAnName2")} type="text" />
          </FormGroup>
          <div>
            <ErrorText>{errors["jnAnName2"]?.message}</ErrorText>
          </div>
        </Field>
        <Field>
          <FormGroup>
            <label>전화:</label>
            <Input {...register("jnAnTel2")} type="text" />
          </FormGroup>
          <div>
            <ErrorText>{errors["jnAnTel2"]?.message}</ErrorText>
          </div>
        </Field>
      </Wrapper>
      <Divider />
      <Wrapper grid col={4}>
        <Field>
          <FormGroup>
            <label>세금계산서 양식:</label>
            <Select {...register("jnSekum")}>
              <option value="A4 백지">A4 백지</option>
            </Select>
          </FormGroup>
          <div>
            <ErrorText>{errors["jnSekum"]?.message}</ErrorText>
          </div>
        </Field>
        <Field>
          <FormGroup>
            <label>공급사업자 인쇄안함</label>
            <Input
              {...register("jnSegongYn")}
              type="checkbox"
              checked={true}
              style={{ width: "20px" }}
            />
          </FormGroup>
          <div>
            <ErrorText>{errors["jnSegongYn"]?.message}</ErrorText>
          </div>
        </Field>
        <Field>
          <FormGroup>
            <label>Vat 별도 단가계산</label>
            <Input
              {...register("jnVatSumyn")}
              type="checkbox"
              checked={true}
              style={{ width: "20px" }}
            />
          </FormGroup>
          <div>
            <ErrorText>{errors["jnVatSumyn"]?.message}</ErrorText>
          </div>
        </Field>
        <Field>
          <FormGroup>
            <label>수량 단가 인쇄 유무</label>
            <Input
              {...register("jnSekumEa")}
              type="checkbox"
              checked={true}
              style={{ width: "20px" }}
            />
          </FormGroup>
          <div>
            <ErrorText>{errors["jnSekumEa"]?.message}</ErrorText>
          </div>
        </Field>
      </Wrapper>
      <Wrapper grid>
        <Field>
          <FormGroup>
            <label>거래명세표 양식:</label>
            <Select {...register("jnJangbu")}>
              <option value="0  인쇄용지">0 인쇄용지</option>
            </Select>
          </FormGroup>
          <div>
            <ErrorText>{errors["jnJangbu"]?.message}</ErrorText>
          </div>
        </Field>
      </Wrapper>
      <Wrapper grid>
        <Field>
          <FormGroup>
            <label>탱크잔량/원격검침 발신기 업체번호</label>
            <Input
              {...register("jnCmngno")}
              type="checkbox"
              checked={true}
              style={{ width: "20px" }}
            />
          </FormGroup>
          <div>
            <ErrorText>{errors["jnCmngno"]?.message}</ErrorText>
          </div>
        </Field>
        <Field>
          <FormGroup>
            <label>Nice 계좌자동이체 사용</label>
            <Input
              {...register("innopayBankYn")}
              type="checkbox"
              checked={false}
              style={{ width: "20px" }}
            />
          </FormGroup>
          <div>
            <ErrorText>{errors["innopayBankYn"]?.message}</ErrorText>
          </div>
        </Field>
        <Field>
          <FormGroup>
            <label>Innopay 카드자동이체 사용</label>
            <Input
              {...register("niceBankYn")}
              type="checkbox"
              checked={true}
              style={{ width: "20px" }}
            />
          </FormGroup>
          <div>
            <ErrorText>{errors["niceBankYn"]?.message}</ErrorText>
          </div>
        </Field>
      </Wrapper>
      <PlainTab
        tabHeader={["지로 양식", "고객안내문", "입금계좌  안내", "결재란"]}
        onClick={(id) => setTabId(id)}
      />
      <TabContentWrapper>{getTabContent(tabId)}</TabContentWrapper>
    </form>
  );
}

export default forwardRef(Form);
