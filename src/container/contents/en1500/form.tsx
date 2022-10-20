import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
} from "react";
import Table from "components/table";
import { useForm, Path, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "app/store";
import {
  Select,
  Field,
  ErrorText,
  FormGroup,
  Wrapper,
  Divider,
  Label,
  Input,
  DividerGray,
  SelectCom,
} from "components/form/style";
import CheckBox from "components/checkbox";
import { IFormProps } from "./type";
import { schema } from "./validation";
import { VolReading, Container, RubeUnit, BasicItems } from "../en1500/style";
import { useGetCommonGubunQuery } from "app/api/commonGubun";

interface IForm {
  selected: any;
}
const Form = ({ selected }: IForm, ref: React.ForwardedRef<any>) => {
  console.log("selected===>", selected);
  const dispatch = useDispatch();
  const [isClickedAdd, setIsClikedAdd] = useState(false);
  const [tabId, setTabId] = useState(0);

  const { data: jnPerMeth, isError: isJnPerMethError } =
    useGetCommonGubunQuery("11");
  const { data: jnChekum, isError: isJnChekumError } =
    useGetCommonGubunQuery("12");

  const { data: jnJiroPrint, isError: isJnJiroPrintError } =
    useGetCommonGubunQuery("13");

  const { data: jnR, isError: isJnR } = useGetCommonGubunQuery("14");

  const { data: jnSukumtype, isError: isJnSukumtypeError } =
    useGetCommonGubunQuery("15");

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
        <Input
          register={register("jnCost280")}
          errors={errors["jnCost280"]?.message}
        />
      ),
    },
    {
      title: "600 mmH2O",
      jnCost600: (
        <Input
          register={register("jnCost600")}
          errors={errors["jnCost600"]?.message}
        />
      ),
    },
    {
      title: "1000 mmH2O",
      jnCost1000: (
        <Input
          register={register("jnCost1000")}
          errors={errors["jnCost1000"]?.message}
        />
      ),
    },
    {
      title: "1500 mmH2O",
      jnCost1500: (
        <Input
          register={register("jnCost1500")}
          errors={errors["jnCost1500"]?.message}
        />
      ),
    },
    {
      title: "2000 mmH2O",
      jnCost2000: (
        <Input
          register={register("jnCost2000")}
          errors={errors["jnCost2000"]?.message}
        />
      ),
    },
    {
      title: "2500 mmH2O",
      jnCost2500: (
        <Input
          register={register("jnCost2500")}
          errors={errors["jnCost2500"]?.message}
        />
      ),
    },
  ];

  return (
    <form onSubmit={handleSubmit(update)} style={{ padding: "10px 15px" }}>
      {/* <button type="button" onClick={handleSubmit(update)}>Click</button> */}
      <Wrapper grid>
        <Field className="field">
          <FormGroup>
            <Input
              label="코드"
              register={register("areaCode")}
              errors={errors["areaCode"]?.message}
            />
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <Input
              label="영업소명"
              register={register("areaName")}
              errors={errors["areaName"]?.message}
            />
          </FormGroup>
        </Field>
      </Wrapper>
      <Divider />
      <VolReading>
        <div className="title">체적검침 환경</div>
        <Wrapper className="volWrapper">
          <Field>
            <FormGroup>
              <SelectCom
                label="연체료 적용방법"
                selectOption={jnPerMeth}
                errors={errors["jnPerMeth"]?.message}
                register={register("jnPerMeth")}
                defaultValue={selected.jnPerMeth}
                fullWidth
              />
            </FormGroup>
          </Field>
          <p>검침 등록시 미납금액에 대하여 연체료를 부과</p>
        </Wrapper>
        <Wrapper className="volWrapper">
          <Field className="field">
            <FormGroup>
              <Input
                label="표준기화율"
                register={register("jnKgdanga")}
                errors={errors["jnKgdanga"]?.message}
              />
            </FormGroup>
          </Field>
          <p>검침오차에서 사용량 (㎥-Kg) 변환시 적용</p>
        </Wrapper>
        <Wrapper className="volWrapper">
          <Field>
            <FormGroup>
              <SelectCom
                label="체적사용료 계산"
                selectOption={jnChekum}
                errors={errors["jnChekum"]?.message}
                register={register("jnChekum")}
                defaultValue={selected.jnChekum}
                fullWidth
              />
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
              <SelectCom
                label="지로출력 조건"
                selectOption={jnJiroPrint}
                errors={errors["jnJiroPrint"]?.message}
                register={register("jnJiroPrint")}
                defaultValue={selected.jnJiroPrint}
                fullWidth
              />
            </FormGroup>
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
            onClick={(item) => {}}
          />
        </RubeUnit>
        <BasicItems>
          <div className="title">신규거래처 기본설정 항목</div>
          <Wrapper className="volWrapper">
            <Field>
              <FormGroup>
                <SelectCom
                  label="세금계산서 양식"
                  selectOption={jnR}
                  errors={errors["jnR"]?.message}
                  register={register("jnR")}
                  defaultValue={selected.jnR}
                  fullWidth
                />
              </FormGroup>
              <div>
                <ErrorText>{errors["jnR"]?.message}</ErrorText>
              </div>
            </Field>
          </Wrapper>
          <Wrapper className="volWrapper">
            <Field className="field">
              <FormGroup>
                <Input
                  label="안전관리비"
                  register={register("jnAnkum")}
                  errors={errors["jnAnkum"]?.message}
                />
              </FormGroup>
            </Field>
          </Wrapper>
          <Wrapper className="volWrapper">
            <Field className="field">
              <FormGroup>
                <Input
                  label="정기검침일"
                  register={register("jnGumdate")}
                  errors={errors["jnGumdate"]?.message}
                />
              </FormGroup>
            </Field>
          </Wrapper>
          <Wrapper className="volWrapper">
            <Field>
              <FormGroup>
                <SelectCom
                  label="세금계산서 양식"
                  selectOption={jnSukumtype}
                  errors={errors["jnSukumtype"]?.message}
                  register={register("jnSukumtype")}
                  defaultValue={selected.jnSukumtype}
                  fullWidth
                />
              </FormGroup>
            </Field>
          </Wrapper>
          <Wrapper className="volWrapper">
            <Field className="field">
              <FormGroup>
                <Input
                  label="수금방법"
                  register={register("jnPer")}
                  errors={errors["jnPer"]?.message}
                />
              </FormGroup>
            </Field>
          </Wrapper>
        </BasicItems>
      </Container>
    </form>
  );
};

export default forwardRef(Form);
