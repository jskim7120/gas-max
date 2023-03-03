import React, { forwardRef, useImperativeHandle, useEffect } from "react";
import Table from "components/table";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { EN1500UPDATE } from "app/path";
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
import {
  IconInfo,
  Plus,
  Trash,
  Update,
  Reset,
  Close,
} from "components/allSvgIcon";
import { IJNOTRY2 } from "../../../container/contents/en/en1500/model";
import { currencyMask, formatCurrencyRemoveComma } from "helpers/currency";
import {
  VolReading,
  Container,
  RubeUnit,
  BasicItems,
} from "../../../container/contents/en/en1500/style";

import API from "app/axios";

interface IForm {
  //   selected: any;
  //   fetchData: any;
  //   setData: any;
  //   selectedRowIndex: number;
  //   setSelected: any;
  //   setSelectedRowIndex: any;
}

const EN1500Modal = (
  {}: // selected,
  // fetchData,
  // setData,
  // selectedRowIndex,
  // setSelected,
  // setSelectedRowIndex,
  IForm,
  ref: React.ForwardedRef<any>
) => {
  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "EN",
    functionName: "EN1500",
  });

  //   useEffect(() => {
  //     if (selected !== undefined && JSON.stringify(selected) !== "{}") {
  //       reset(selected);
  //     }
  //   }, [selected]);

  const { register, handleSubmit, reset, getValues, control } =
    useForm<IJNOTRY2>({
      mode: "onChange",
    });

  //   const resetForm = (type: string) => {
  //     if (selected !== undefined && JSON.stringify(selected) !== "{}") {
  //       let newData: any = {};

  //       if (type === "reset") {
  //         for (const [key, value] of Object.entries(selected)) {
  //           newData[key] = value;
  //         }
  //       }
  //       reset(newData);
  //     }
  //   };
  //   const submit = async (data: IJNOTRY2) => {
  //     const formValues = getValues();
  //     if (typeof formValues.jnCost280 === "string") {
  //       formValues.jnCost280 = Number(formValues.jnCost280.replaceAll(",", ""));
  //     }
  //     if (typeof formValues.jnCost600 === "string") {
  //       formValues.jnCost600 = Number(formValues.jnCost600.replaceAll(",", ""));
  //     }
  //     if (typeof formValues.jnCost1000 === "string") {
  //       formValues.jnCost1000 = Number(formValues.jnCost1000.replaceAll(",", ""));
  //     }
  //     if (typeof formValues.jnCost1500 === "string") {
  //       formValues.jnCost1500 = Number(formValues.jnCost1500.replaceAll(",", ""));
  //     }
  //     if (typeof formValues.jnCost2000 === "string") {
  //       formValues.jnCost2000 = Number(formValues.jnCost2000.replaceAll(",", ""));
  //     }
  //     if (typeof formValues.jnCost2500 === "string") {
  //       formValues.jnCost2500 = Number(formValues.jnCost2500.replaceAll(",", ""));
  //     }
  //     if (typeof formValues.jnCost7000 === "string") {
  //       formValues.jnCost7000 = Number(formValues.jnCost7000.replaceAll(",", ""));
  //     }
  //     formValues.jnAnkum = formValues.jnAnkum
  //       ? formatCurrencyRemoveComma(formValues.jnAnkum)
  //       : "";

  //     try {
  //       const response = await API.post(EN1500UPDATE, formValues);
  //       if (response.status === 200) {
  //         setData((prev: any) => {
  //           prev[selectedRowIndex] = formValues;
  //           return [...prev];
  //         });

  //         setSelected(formValues);
  //         toast.success("저장이 성공하였습니다", {
  //           autoClose: 500,
  //         });
  //       }
  //     } catch (err: any) {
  //       toast.error(err?.message, {
  //         autoClose: 500,
  //       });
  //     }
  //   };

  //   useImperativeHandle<HTMLFormElement, any>(ref, () => ({
  //     update: () => {
  //       handleSubmit(submit)();
  //     },
  //     resetForm,
  //   }));

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

  return (
    <form
      //   onSubmit={handleSubmit(submit)}
      style={{
        width: "940px",
        // padding: "11px 35px",
        background: "#fff",
        height: "817px",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "35px",
          background: "rgba(101, 84, 255, 0.37)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 34px",
        }}
      >
        <Field flex style={{ alignItems: "center" }}>
          <p style={{ fontSize: "14px" }}>거래처 사용품목</p>
          <Field></Field>
        </Field>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            text="저장"
            icon={<Update />}
            style={{ marginRight: "5px" }}
            color={ButtonColor.SECONDARY}
            onClick={() => {}}
            type="button"
          />
          <Button
            text="취소"
            style={{ marginRight: "5px" }}
            icon={<Reset />}
            type="button"
            onClick={() => {
              //   formRef.current.setIsAddBtnClicked(false);
              //   formRef.current.resetForm("reset");
            }}
          />
          <span
            style={{ marginTop: "1px" }}
            onClick={() => {
              //   dispatch(closeModal());
            }}
          ></span>
        </div>
      </div>
      <div style={{ padding: "5px 35px" }}>
        <Wrapper grid style={{ marginBottom: "7px" }}>
          <Field className="field">
            <FormGroup>
              <Input
                label="코드"
                register={register("areaCode")}
                maxLength="2"
              />
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
                  <Controller
                    control={control}
                    {...register("jnPer")}
                    render={({ field: { onChange, value, name } }) => (
                      <Input
                        label="kg 공급단가"
                        value={value}
                        onChange={onChange}
                        mask={[/\d/, /\d/, /\d/]}
                        textAlign="right"
                        inputSize={InputSize.i85}
                        name={name}
                      />
                    )}
                  />
                  <Button
                    text="㎥ 단가 환산"
                    style={{
                      marginLeft: "10px",
                      background: "#666666",
                      width: "130px",
                      height: "30px",
                    }}
                    onClick={() => {
                      // formRef.current.update();
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Controller
                    control={control}
                    {...register("jnPer")}
                    render={({ field: { onChange, value, name } }) => (
                      <Input
                        label="지역 표준기화율"
                        value={value}
                        onChange={onChange}
                        mask={[/\d/, /\d/, /\d/]}
                        textAlign="right"
                        inputSize={InputSize.i85}
                        name={name}
                      />
                    )}
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
                    {dataCommonDic?.jnSukumtype?.map(
                      (obj: any, idx: number) => (
                        <option key={idx} value={obj.code}>
                          {obj.codeName}
                        </option>
                      )
                    )}
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
                    {dataCommonDic?.jnJiroPrint?.map(
                      (obj: any, idx: number) => (
                        <option key={idx} value={obj.code}>
                          {obj.codeName}
                        </option>
                      )
                    )}
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
      </div>
    </form>
  );
};

export default forwardRef(EN1500Modal);
