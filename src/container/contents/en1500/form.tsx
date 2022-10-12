import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
} from "react";
import Table from "components/table";
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
  Select,
  Field,
  ErrorText,
  FormGroup,
  FormInline,
  FormBlock,
  Wrapper,
  Divider,
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
import { VolReading, Container, RubeUnit, BasicItems } from "../en1500/style";

import { InputTest } from "components/form/style";

interface IForm {
  selected: any;
}
const Form = ({ selected }: IForm, ref: React.ForwardedRef<any>) => {
  console.log("selected", selected);
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

  useImperativeHandle(ref, () => ({
    getValues,
    reset,
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

  const data1500 = [
    {
      title: "280 mmH2O",
      jnCost280: (
        <InputTest name="jnCost280" register={register} errors={errors} />
      ),
    },
    {
      title: "600 mmH2O",
      jnCost600: (
        <InputTest name="jnCost600" register={register} errors={errors} />
      ),
    },
    {
      title: "1000 mmH2O",
      jnCost1000: (
        <InputTest name="jnCost1000" register={register} errors={errors} />
      ),
    },
    {
      title: "1500 mmH2O",
      jnCost1500: (
        <InputTest name="jnCost1500" register={register} errors={errors} />
      ),
    },
    {
      title: "2000 mmH2O",
      jnCost2000: (
        <InputTest name="jnCost2000" register={register} errors={errors} />
      ),
    },
    {
      title: "2500 mmH2O",
      jnCost2500: (
        <InputTest name="jnCost2500" register={register} errors={errors} />
      ),
    },
  ];

  return (
    <form onSubmit={handleSubmit(update)} style={{ padding: "10px 15px" }}>
      {/* <button type="button" onClick={handleSubmit(update)}>Click</button> */}
      <Wrapper grid>
        <Field className="field">
          <FormGroup>
            <Label>
              <b>코드</b>
            </Label>
            <InputForm
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
            <Label>
              <b>영업소명</b>
            </Label>
            <InputForm
              {...register("areaName")}
              type="string"
              inputSize={InputSize.md}
            />
          </FormGroup>
          <div>
            <ErrorText>{errors["areaName"]?.message}</ErrorText>
          </div>
        </Field>
      </Wrapper>
      <Divider />
      <VolReading>
        <div className="title">체적검침 환경</div>
        <Wrapper className="volWrapper">
          <Field>
            <FormGroup>
              <Label>연체료 적용방법</Label>
              <Select {...register("jnPerMeth")}>
                <option value="0">1. 인쇄용지</option>
                <option value="1">2. 미 수 금 연체적용 (등록일 기준)</option>
                <option value="2">3. 전월미납 연체적용 (등록일 기준)</option>
                <option value="3">
                  4. 전월미납 연체적용 (납부마감일 기준)
                </option>
                <option value="4">
                  5. 미 수 금 연체적용 (납부마감일 기준)
                </option>
              </Select>
            </FormGroup>
            <div>
              <ErrorText>{errors["jnPerMeth"]?.message}</ErrorText>
            </div>
          </Field>
          <p>검침 등록시 미납금액에 대하여 연체료를 부과</p>
        </Wrapper>
        <Wrapper className="volWrapper">
          <Field className="field">
            <FormGroup>
              <Label>표준기화율</Label>
              <InputForm
                {...register("jnKgdanga")}
                type="number"
                inputSize={InputSize.sm}
              />
            </FormGroup>
            <div>
              <ErrorText>{errors["jnKgdanga"]?.message}</ErrorText>
            </div>
          </Field>
          <p>검침오차에서 사용량 (㎥-Kg) 변환시 적용</p>
        </Wrapper>
        <Wrapper className="volWrapper">
          <Field>
            <FormGroup>
              <Label>체적사용료 계산</Label>
              <Select {...register("jnChekum")}>
                <option value="0">1. 사용 안함</option>
                <option value="1">2. 원단위 절사</option>
                <option value="2">3. 원단위 반올림</option>
              </Select>
            </FormGroup>
            <div>
              <ErrorText>{errors["jnChekum"]?.message}</ErrorText>
            </div>
          </Field>
          <p>당월합계금액의 1원단위 계산방법</p>
        </Wrapper>
        <Wrapper className="volWrapper">
          <Field>
            <FormGroup>
              <Label>지로출력 조건</Label>
              <Select {...register("jnJiroPrint")}>
                <option value="0">0원 이상</option>
                <option value="300">300원 이상</option>
                <option value="500">500원 이상</option>
                <option value="1,000">1,000원 이상</option>
                <option value="2,000">2,000원 이상</option>
                <option value="검침전체자료">검침전체자료</option>
                <option value="5,000">5,000원 이상</option>
              </Select>
            </FormGroup>
            <div>
              <ErrorText>{errors["jnJiroPrint"]?.message}</ErrorText>
            </div>
          </Field>
          <p>지로 청구서 출력시 범위 지정</p>
        </Wrapper>
      </VolReading>
      <Container>
        <RubeUnit>
          <div className="title">압력별 환경 루베단가 설정</div>
          <Table
            tableHeader={["조정기압력", "루베(㎥ ) 단가"]}
            tableData={data1500}
            onClick={(item) => console.log("form1500", item)}
          />
        </RubeUnit>
        <BasicItems>
          <div className="title">신규거래처 기본설정 항목</div>
          <Wrapper className="volWrapper">
            <Field>
              <FormGroup>
                <Label>조정기압력</Label>
                <Select {...register("jnR")}>
                  <option value="280">280</option>
                  <option value="600">600</option>
                  <option value="1000">1000</option>
                  <option value="1500">1500</option>
                  <option value="2000">2000</option>
                  <option value="2500">2500</option>
                  <option value="7000">7000</option>
                </Select>
              </FormGroup>
              <div>
                <ErrorText>{errors["jnR"]?.message}</ErrorText>
              </div>
            </Field>
          </Wrapper>
          <Wrapper className="volWrapper">
            <Field className="field">
              <FormGroup>
                <Label>안전관리비</Label>
                <InputForm
                  {...register("jnAnkum")}
                  type="number"
                  inputSize={InputSize.sm}
                />
              </FormGroup>
              <div>
                <ErrorText>{errors["jnAnkum"]?.message}</ErrorText>
              </div>
            </Field>
          </Wrapper>
          <Wrapper className="volWrapper">
            <Field className="field">
              <FormGroup>
                <Label>정기검침일</Label>
                <InputForm
                  {...register("jnGumdate")}
                  type="string"
                  inputSize={InputSize.sm}
                />
              </FormGroup>
              <div>
                <ErrorText>{errors["jnGumdate"]?.message}</ErrorText>
              </div>
            </Field>
          </Wrapper>
          <Wrapper className="volWrapper">
            <Field>
              <FormGroup>
                <Label>조정기압력</Label>
                <Select {...register("jnSukumtype")}>
                  <option value="지로">지로</option>
                </Select>
              </FormGroup>
              <div>
                <ErrorText>{errors["jnSukumtype"]?.message}</ErrorText>
              </div>
            </Field>
          </Wrapper>
          <Wrapper className="volWrapper">
            <Field className="field">
              <FormGroup>
                <Label>수금방법</Label>
                <InputForm
                  {...register("jnPer")}
                  type="number"
                  inputSize={InputSize.sm}
                />
              </FormGroup>
              <div>
                <ErrorText>{errors["jnPer"]?.message}</ErrorText>
              </div>
            </Field>
          </Wrapper>
        </BasicItems>
      </Container>
    </form>
  );
};

export default forwardRef(Form);
