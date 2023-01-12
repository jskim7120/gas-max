import React, { forwardRef, useImperativeHandle, useEffect } from "react";
import Table from "components/table";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { EN1500UPDATE } from "app/path";
import { InputSize } from "components/componentsType";
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

  useEffect(() => {
    if (selected !== undefined && JSON.stringify(selected) !== "{}") {
      reset(selected);
    }
  }, [selected]);

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
      reset(newData);
    }
  };
  const submit = async (data: IJNOTRY2) => {
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
    formValues.jnAnkum = formValues.jnAnkum
      ? formatCurrencyRemoveComma(formValues.jnAnkum)
      : "";

    try {
      const response = await API.post(EN1500UPDATE, formValues);
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
    update: () => {
      handleSubmit(submit)();
    },
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
    },
  ];

  return (
    <form
      onSubmit={handleSubmit(submit)}
      style={{ width: "727px", padding: "0px 10px" }}
    >
      <Wrapper grid>
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
                  textAlign="right"
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
    </form>
  );
};

export default forwardRef(Form);
