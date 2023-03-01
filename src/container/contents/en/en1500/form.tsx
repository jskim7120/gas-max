import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
} from "react";
import Table from "components/table";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { EN1500UPDATE, EN150065 } from "app/path";
import { InputSize } from "components/componentsType";
import Button from "components/button/button";
import { ButtonColor } from "components/componentsType";
import {
  Select,
  Field,
  FormGroup,
  Wrapper,
  Divider,
  Label,
  Input,
} from "components/form/style";
import { IconInfo } from "components/allSvgIcon";
import { IJNOTRY2 } from "./model";
import { currencyMask, formatCurrencyRemoveComma } from "helpers/currency";
import { VolReading, Container, RubeUnit, BasicItems } from "../en1500/style";

import API from "app/axios";

interface IForm {
  selected: any;
  fetchData: any;
  setData: any;
  selectedRowIndex: number;
  setSelected: any;
  setSelectedRowIndex: any;
}

const Form = (
  {
    selected,
    fetchData,
    setData,
    selectedRowIndex,
    setSelected,
    setSelectedRowIndex,
  }: IForm,
  ref: React.ForwardedRef<any>
) => {
  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "EN",
    functionName: "EN1500",
  });
  const [unitPriceData, setUnitPriceData] = useState<any>([]);
  const [jnKgdanga, setJnKgdanga] = useState<number>(selected.jnKgdanga);
  const [jnKgdangaMp, setJnKgdangaMp] = useState<number>(selected.jnKgdangaMp);

  useEffect(() => {
    if (selected !== undefined && JSON.stringify(selected) !== "{}") {
      reset(selected);
      setJnKgdanga(selected.jnKgdanga);
      setJnKgdangaMp(selected.jnKgdangaMp);
    }
  }, [selected]);

  useEffect(() => {
    resetForm("upReset");
  }, [unitPriceData]);

  const { register, handleSubmit, reset, getValues, control } =
    useForm<IJNOTRY2>({
      mode: "onChange",
    });

  const resetForm = (type: string) => {
    if (selected !== undefined && JSON.stringify(selected) !== "{}") {
      let newData: any = {};

      if (type === "reset") {
        for (const [key, value] of Object.entries(selected)) {
          newData[key] = value;
        }
      }
      if (type === "upReset") {
        for (const [key, value] of Object.entries(selected)) {
          newData[key] = value;
        }

        newData.tempJn280Mp = unitPriceData.tempJn280Mp;
        newData.tempJn600Mp = unitPriceData.tempJn600Mp;
        newData.tempJn1000Mp = unitPriceData.tempJn1000Mp;
        newData.tempJn1500Mp = unitPriceData.tempJn1500Mp;
        newData.tempJn2000Mp = unitPriceData.tempJn2000Mp;
        newData.tempJn2500Mp = unitPriceData.tempJn2500Mp;
        newData.tempJn7000Mp = unitPriceData.tempJn7000Mp;
        newData.tempJnKgdanga280 = unitPriceData.tempJnKgdanga280;
        newData.tempJnKgdanga600 = unitPriceData.tempJnKgdanga600;
        newData.tempJnKgdanga1000 = unitPriceData.tempJnKgdanga1000;
        newData.tempJnKgdanga1500 = unitPriceData.tempJnKgdanga1500;
        newData.tempJnKgdanga2000 = unitPriceData.tempJnKgdanga2000;
        newData.tempJnKgdanga2500 = unitPriceData.tempJnKgdanga2500;
        newData.tempJnKgdanga7000 = unitPriceData.tempJnKgdanga7000;

        newData.jnKgdanga = jnKgdanga;
        newData.jnKgdangaMp = jnKgdangaMp;
      }
      reset(newData);
    }
  };
  const update = async (data: IJNOTRY2) => {
    let updateParams: any = {};
    const formValues = getValues();
    if (typeof formValues.jnCost280 === "string") {
      formValues.jnCost280 = Number(formValues.jnCost280.replaceAll(",", ""));
    }
    if (typeof formValues.jnCost600 === "string") {
      formValues.jnCost600 = Number(formValues.jnCost600.replaceAll(",", ""));
    }
    if (typeof formValues.jnCost1000 === "string") {
      formValues.jnCost1000 = Number(formValues.jnCost1000.replaceAll(",", ""));
    }
    if (typeof formValues.jnCost1500 === "string") {
      formValues.jnCost1500 = Number(formValues.jnCost1500.replaceAll(",", ""));
    }
    if (typeof formValues.jnCost2000 === "string") {
      formValues.jnCost2000 = Number(formValues.jnCost2000.replaceAll(",", ""));
    }
    if (typeof formValues.jnCost2500 === "string") {
      formValues.jnCost2500 = Number(formValues.jnCost2500.replaceAll(",", ""));
    }
    if (typeof formValues.jnCost7000 === "string") {
      formValues.jnCost7000 = Number(formValues.jnCost7000.replaceAll(",", ""));
    }
    if (typeof formValues.jnKgdanga === "string") {
      formValues.jnKgdanga = Number(formValues.jnKgdanga);
    }
    if (typeof formValues.jnKgdangaMp === "string") {
      formValues.jnKgdangaMp = Number(formValues.jnKgdangaMp);
    }
    formValues.jnAnkum = formValues.jnAnkum
      ? formatCurrencyRemoveComma(formValues.jnAnkum)
      : "";

    updateParams.areaCode = formValues.areaCode;
    updateParams.areaName = formValues.areaName;
    updateParams.jnPerMeth = formValues.jnPerMeth;
    updateParams.jnKgdangaMp = formValues.jnKgdangaMp;
    updateParams.jnKgdanga = formValues.jnKgdanga * 10000;
    updateParams.jnChekum = formValues.jnChekum;
    updateParams.jnJiroPrint = formValues.jnJiroPrint;
    updateParams.jnCost280 = formValues.jnCost280;
    updateParams.jnCost600 = formValues.jnCost600;
    updateParams.jnCost1000 = formValues.jnCost1000;
    updateParams.jnCost1500 = formValues.jnCost1500;
    updateParams.jnCost2000 = formValues.jnCost2000;
    updateParams.jnCost2500 = formValues.jnCost2500;
    updateParams.jnCost7000 = formValues.jnCost7000;
    updateParams.jnR = formValues.jnR;
    updateParams.jnAnkum = formValues.jnAnkum;
    updateParams.jnGumdate = formValues.jnGumdate;
    updateParams.jnSukumtype = formValues.jnSukumtype;
    updateParams.jnPer = formValues.jnPer;
    try {
      const response = await API.post(EN1500UPDATE, updateParams);
      if (response.status === 200) {
        setData((prev: any) => {
          prev[selectedRowIndex] = formValues;
          return [...prev];
        });

        setSelected(formValues);
        toast.success("저장이 성공하였습니다", {
          autoClose: 500,
        });
      }
    } catch (err: any) {
      toast.error(err?.message, {
        autoClose: 500,
      });
    }
  };

  useImperativeHandle<HTMLFormElement, any>(ref, () => ({
    update,
    resetForm,
  }));

  const data1500 = [
    {
      title: "280 mmH2O",
      jnCost280: (
        <Controller
          control={control}
          {...register("jnCost280")}
          render={({ field: { onChange, value, name } }) => (
            <Input
              value={value}
              onChange={onChange}
              mask={currencyMask}
              textAlign="right"
              inputSize={InputSize.i70}
              name={name}
            />
          )}
        />
      ),
      unitPrice: <Input register={register("tempJn280Mp")} textAlign="right" />,
      rate: <Input register={register("tempJnKgdanga280")} textAlign="right" />,
    },
    {
      title: "600 mmH2O",
      jnCost600: (
        <Controller
          control={control}
          {...register("jnCost600")}
          render={({ field: { onChange, value, name } }) => (
            <Input
              value={value}
              onChange={onChange}
              mask={currencyMask}
              textAlign="right"
              inputSize={InputSize.i70}
              name={name}
            />
          )}
        />
      ),
      unitPrice: <Input register={register("tempJn600Mp")} textAlign="right" />,
      rate: <Input register={register("tempJnKgdanga600")} textAlign="right" />,
    },
    {
      title: "1000 mmH2O",
      jnCost1000: (
        <Controller
          control={control}
          {...register("jnCost1000")}
          render={({ field: { onChange, value, name } }) => (
            <Input
              value={value}
              onChange={onChange}
              mask={currencyMask}
              textAlign="right"
              inputSize={InputSize.i70}
              name={name}
            />
          )}
        />
      ),
      unitPrice: (
        <Input register={register("tempJn1000Mp")} textAlign="right" />
      ),
      rate: (
        <Input register={register("tempJnKgdanga1000")} textAlign="right" />
      ),
    },
    {
      title: "1500 mmH2O",
      jnCost1500: (
        <Controller
          control={control}
          {...register("jnCost1500")}
          render={({ field: { onChange, value, name } }) => (
            <Input
              value={value}
              onChange={onChange}
              mask={currencyMask}
              textAlign="right"
              inputSize={InputSize.i70}
              name={name}
            />
          )}
        />
      ),
      unitPrice: (
        <Input register={register("tempJn1500Mp")} textAlign="right" />
      ),
      rate: (
        <Input register={register("tempJnKgdanga1500")} textAlign="right" />
      ),
    },
    {
      title: "2000 mmH2O",
      jnCost2000: (
        <Controller
          control={control}
          {...register("jnCost2000")}
          render={({ field: { onChange, value, name } }) => (
            <Input
              value={value}
              onChange={onChange}
              mask={currencyMask}
              textAlign="right"
              inputSize={InputSize.i70}
              name={name}
            />
          )}
        />
      ),
      unitPrice: (
        <Input register={register("tempJn2000Mp")} textAlign="right" />
      ),
      rate: (
        <Input register={register("tempJnKgdanga2000")} textAlign="right" />
      ),
    },
    {
      title: "2500 mmH2O",
      jnCost2500: (
        <Controller
          control={control}
          {...register("jnCost2500")}
          render={({ field: { onChange, value, name } }) => (
            <Input
              value={value}
              onChange={onChange}
              mask={currencyMask}
              textAlign="right"
              inputSize={InputSize.i70}
              name={name}
            />
          )}
        />
      ),
      unitPrice: (
        <Input register={register("tempJn2500Mp")} textAlign="right" />
      ),
      rate: (
        <Input register={register("tempJnKgdanga2500")} textAlign="right" />
      ),
    },
    {
      title: "7000 mmH2O",
      jnCost7000: (
        <Controller
          control={control}
          {...register("jnCost7000")}
          render={({ field: { onChange, value, name } }) => (
            <Input
              value={value}
              onChange={onChange}
              mask={currencyMask}
              textAlign="right"
              inputSize={InputSize.i70}
              name={name}
            />
          )}
        />
      ),
      unitPrice: (
        <Input register={register("tempJn7000Mp")} textAlign="right" />
      ),
      rate: (
        <Input register={register("tempJnKgdanga7000")} textAlign="right" />
      ),
    },
  ];

  const calcUnitPrice = async () => {
    let params: any = {};
    params.areaCode = selected.areaCode;
    params.jnKgdanga = jnKgdanga;
    params.jnKgdangaMp = jnKgdangaMp;
    try {
      const response = await API.get(EN150065, { params });

      if (response.status === 200) {
        setUnitPriceData(response.data[0]);
      } else {
        setUnitPriceData([]);
        toast.error(response.data?.message, {
          autoClose: 500,
        });
      }
    } catch (err: any) {
      setUnitPriceData([]);
      console.log("error", err);
    }
  };

  return (
    <form
      // onSubmit={handleSubmit(submit)}
      style={{ width: "890px", padding: "0px 10px" }}
    >
      <Wrapper grid style={{ marginBottom: "7px" }}>
        <Field className="field">
          <FormGroup>
            <Input label="코드" register={register("areaCode")} maxLength="2" />
          </FormGroup>
        </Field>
        <Field>
          <FormGroup>
            <Input
              label="영업소명"
              register={register("areaName")}
              maxLength="20"
            />
          </FormGroup>
        </Field>
      </Wrapper>
      <Divider />
      <VolReading style={{ height: "115px" }}>
        <div className="title">LPG 판매단가 설정</div>
        <div className="volReadCnt">
          <Wrapper className="volWrapper">
            <Field className="field">
              <FormGroup>
                <Input
                  label="kg 공급단가"
                  register={register("jnKgdangaMp")}
                  inputSize={InputSize.i85}
                  textAlign="right"
                  onChange={(e: any) => {
                    setJnKgdangaMp(e.target.value);
                  }}
                />
                <Button
                  text="㎥ 단가 환산"
                  style={{
                    marginLeft: "10px",
                    background: "#666666",
                    width: "130px",
                    height: "30px",
                  }}
                  onClick={calcUnitPrice}
                  type="button"
                />
              </FormGroup>
              <FormGroup>
                <Input
                  label="지역 표준기화율"
                  register={register("jnKgdanga")}
                  inputSize={InputSize.i85}
                  textAlign="right"
                  onChange={(e: any) => {
                    setJnKgdanga(e.target.value);
                  }}
                />
              </FormGroup>
            </Field>
          </Wrapper>
          <p className="lpgDesc">
            <IconInfo />
            <span>
              kg단가는 중량,체적공급단가 및 루베단가를 MP단가로 적용시
              기초금액으로 자동계산 됩니다.
            </span>
          </p>
        </div>
      </VolReading>
      <Container>
        <RubeUnit>
          <div className="title">압력별 환경 루베단가 설정</div>
          <Table
            tableHeader={[
              "조정기압력",
              "루베(㎥ ) 단가",
              "㎥단가 환산",
              "기화율",
            ]}
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
          <div className="basicItemsCnt">
            <Wrapper className="volWrapper">
              <FormGroup>
                <Label>조정기압력</Label>
                <Select
                  {...register("jnR")}
                  style={{ minWidth: "85px" }}
                  textAlign="left"
                >
                  {dataCommonDic?.jnR?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.code}
                    </option>
                  ))}
                </Select>

                <span>mmH2O</span>
              </FormGroup>
            </Wrapper>

            <Wrapper className="volWrapper">
              <FormGroup>
                <Controller
                  control={control}
                  {...register("jnAnkum")}
                  render={({ field: { onChange, value, name } }) => (
                    <Input
                      label="안전관리비"
                      value={value}
                      onChange={onChange}
                      mask={currencyMask}
                      textAlign="right"
                      inputSize={InputSize.i85}
                      name={name}
                    />
                  )}
                />
                <span>원</span>
              </FormGroup>
            </Wrapper>

            <Wrapper className="volWrapper">
              <FormGroup>
                <Controller
                  control={control}
                  {...register("jnGumdate")}
                  render={({ field: { onChange, value, name } }) => (
                    <Input
                      label="정기검침일"
                      value={value}
                      onChange={onChange}
                      mask={[/\d/, /\d/]}
                      textAlign="right"
                      inputSize={InputSize.i85}
                      name={name}
                    />
                  )}
                />
                <span>일</span>
              </FormGroup>
            </Wrapper>

            <Wrapper className="volWrapper">
              <FormGroup>
                <Label>수금방법</Label>
                <Select
                  {...register("jnSukumtype")}
                  style={{ minWidth: "85px" }}
                >
                  {dataCommonDic?.jnSukumtype?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>
            </Wrapper>

            <Wrapper className="volWrapper">
              <Field className="field">
                <FormGroup>
                  <Controller
                    control={control}
                    {...register("jnPer")}
                    render={({ field: { onChange, value, name } }) => (
                      <Input
                        label="연체율"
                        value={value}
                        onChange={onChange}
                        mask={[/\d/, /\d/, /\d/]}
                        textAlign="right"
                        inputSize={InputSize.i85}
                        name={name}
                      />
                    )}
                  />
                  <span>%</span>
                </FormGroup>
              </Field>
            </Wrapper>
          </div>
          <p className="basicDesc">
            <IconInfo />
            <span>신규 거래처 등록시 자동적용 항목.</span>
          </p>
        </BasicItems>
      </Container>
      <VolReading>
        <div className="title">체적검침 환경</div>
        <div className="volReadCnt">
          <Wrapper className="volWrapper">
            <Field>
              <FormGroup>
                <Label>연체료 적용방법</Label>
                <Select {...register("jnPerMeth")}>
                  {dataCommonDic?.jnPerMeth?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>
            </Field>
            <p>
              <IconInfo />
              <span>검침 등록시 미납금액에 대하여 연체료를 부과</span>
            </p>
          </Wrapper>

          <Wrapper className="volWrapper">
            <Field>
              <FormGroup>
                <Label>체적사용료 계산</Label>
                <Select {...register("jnChekum")}>
                  {dataCommonDic?.jnChekum?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>
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

                <Select {...register("jnJiroPrint")}>
                  {dataCommonDic?.jnJiroPrint?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>
            </Field>
            <p>
              <IconInfo />
              <span>지로 청구서 출력시 범위 지정</span>
            </p>
          </Wrapper>
        </div>
      </VolReading>
    </form>
  );
};

export default forwardRef(Form);
