import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
} from "react";
import Table from "components/table";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "app/store";
import { ToastContainer, toast } from "react-toastify";
import {
  Select,
  Field,
  ErrorText,
  FormGroup,
  Wrapper,
  Divider,
  Label,
  Input,
} from "components/form/style";
import { IconInfo } from "components/allSvgIcon";
import { IJNOTRY2 } from "./model";
import { schema } from "./validation";
import { VolReading, Container, RubeUnit, BasicItems } from "../en1500/style";
import { useGetCommonGubunQuery } from "app/api/commonGubun";
import API from "app/axios";

interface IForm {
  selected: any;
  fetchData: any;
}
const base = "/app/EN1500/";

const Form = ({ selected, fetchData }: IForm, ref: React.ForwardedRef<any>) => {
  const dispatch = useDispatch();
  const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);
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
    if (selected !== undefined && JSON.stringify(selected) !== "{}") {
      reset(selected);
    }
  }, [selected]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm<IJNOTRY2>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const resetForm = (type: string) => {
    if (selected !== undefined && JSON.stringify(selected) !== "{}") {
      let newData: any = {};

      if (type === "reset") {
        for (const [key, value] of Object.entries(selected)) {
          newData[key] = value;
        }
      }
      reset(newData);
    }
  };

  const submit = async (data: IJNOTRY2) => {
    const formValues = getValues();
    //form aldaagui uyd ajillana

    const path = `${base}update`;

    try {
      const response = await API.post(path, formValues);
      if (response.status === 200) {
        setIsAddBtnClicked(false);
        await fetchData();
        toast.success("Action successful");
      }
    } catch (err: any) {
      toast.error(err?.message);
    }
  };

  useImperativeHandle<HTMLFormElement, any>(ref, () => ({
    update: () => {
      handleSubmit(submit)();
    },

    resetForm,
    setIsAddBtnClicked,
  }));

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
    {
      title: "7000 mmH2O",
      jnCost7000: (
        <Input
          register={register("jnCost7000")}
          errors={errors["jnCost7000"]?.message}
        />
      ),
    },
  ];

  return (
    <form onSubmit={handleSubmit(submit)} style={{ padding: "0px 10px" }}>
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
              <Label>연체료 적용방법</Label>
              {isJnPerMethError ? (
                "error occured"
              ) : (
                <Select {...register("jnPerMeth")}>
                  {jnPerMeth?.map((obj, idx) => (
                    <option key={idx} value={obj.code1}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              )}
            </FormGroup>
            <div>
              <ErrorText>{errors["jnPerMeth"]?.message}</ErrorText>
            </div>
          </Field>
          <p style={{ right: "32px" }}>
            <IconInfo />
            <span>검침 등록시 미납금액에 대하여 연체료를 부과</span>
          </p>
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
          <p>
            <IconInfo />
            <span>검침오차에서 사용량 (㎥-Kg) 변환시 적용</span>
          </p>
        </Wrapper>
        <Wrapper className="volWrapper">
          <Field>
            <FormGroup>
              <Label>체적사용료 계산</Label>
              {isJnChekumError ? (
                "error occured"
              ) : (
                <Select {...register("jnChekum")}>
                  {jnChekum?.map((obj, idx) => (
                    <option key={idx} value={obj.code1}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              )}
            </FormGroup>
            <div>
              <ErrorText>{errors["jnChekum"]?.message}</ErrorText>
            </div>
          </Field>
          <p>
            <IconInfo />
            <span>당월합계금액의 1원단위 계산방법</span>
          </p>
        </Wrapper>
        <Wrapper className="volWrapper">
          <Field>
            <FormGroup>
              <Label>지로출력 조건</Label>
              {isJnJiroPrintError ? (
                "error occured"
              ) : (
                <Select {...register("jnJiroPrint")}>
                  {jnJiroPrint?.map((obj, idx) => (
                    <option key={idx} value={obj.code1}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              )}
            </FormGroup>
            <div>
              <ErrorText>{errors["jnJiroPrint"]?.message}</ErrorText>
            </div>
          </Field>
          <p>
            <IconInfo />
            <span>지로 청구서 출력시 범위 지정</span>
          </p>
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
          <p className="rubeDesc">
            <IconInfo />
            <span>체적 환경단가 적용 거래처에만 적용.</span>
          </p>
        </RubeUnit>
        <BasicItems>
          <div className="title">신규거래처 기본설정 항목</div>
          <Wrapper className="volWrapper">
            <Field>
              <FormGroup>
                <Label>조정기압력</Label>
                {isJnR ? (
                  "error occured"
                ) : (
                  <Select {...register("jnR")}>
                    {jnR?.map((obj, idx) => (
                      <option key={idx} value={obj.code1}>
                        {obj.codeName}
                      </option>
                    ))}
                  </Select>
                )}
                <span>mmH2O</span>
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
                <span>원</span>
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
                <span>일</span>
              </FormGroup>
            </Field>
          </Wrapper>
          <Wrapper className="volWrapper">
            <Field>
              <FormGroup>
                <Label>수금방법</Label>
                {isJnSukumtypeError ? (
                  "error occured"
                ) : (
                  <Select {...register("jnSukumtype")}>
                    {jnSukumtype?.map((obj, idx) => (
                      <option key={idx} value={obj.code1}>
                        {obj.codeName}
                      </option>
                    ))}
                  </Select>
                )}
              </FormGroup>
              <div>
                <ErrorText>{errors["jnSukumtype"]?.message}</ErrorText>
              </div>
            </Field>
          </Wrapper>
          <Wrapper className="volWrapper">
            <Field className="field">
              <FormGroup>
                <Input
                  label="연체율"
                  register={register("jnPer")}
                  errors={errors["jnPer"]?.message}
                />
                <span>%</span>
              </FormGroup>
            </Field>
          </Wrapper>
          <p className="basicDesc">
            <IconInfo />
            <span>신규 거래처 등록시 자동적용 항목.</span>
          </p>
        </BasicItems>
      </Container>
      <ToastContainer />
    </form>
  );
};

export default forwardRef(Form);
