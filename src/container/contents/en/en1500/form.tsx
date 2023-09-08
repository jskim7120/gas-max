import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
} from "react";
import { useForm, Controller } from "react-hook-form";
import { apiGet, apiPost } from "app/axios";
import Table from "components/table";
import { useGetCommonDictionaryMutation } from "app/api/commonDictionary";
import { EN1500UPDATE, EN150065 } from "app/path";
import { InputSize } from "components/componentsType";
import Button from "components/button/button";
import { Select, FormGroup, Label, Input } from "components/form/style";
import { IJNOTRY2 } from "./model";
import { currencyMask, formatCurrencyRemoveComma } from "helpers/currency";
import { VolReading } from "../en1500/style";
import { InfoText } from "components/text";

interface IForm {
  selected: any;
  setSelected: any;
}

const Form = (
  { selected, setSelected }: IForm,
  ref: React.ForwardedRef<any>
) => {
  const [getCommonDictionary, { data: dataCommonDic }] =
    useGetCommonDictionaryMutation();

  const [unitPriceData, setUnitPriceData] = useState<any>([]);
  const [jnMpdanga, setJnMpdanga] = useState<number>(selected.jnMpdanga);
  const [jnKgdanga, setJnKgdanga] = useState<number>(selected.jnKgdanga);
  const [jnKgdangaMp, setJnKgdangaMp] = useState<number>(selected.jnKgdangaMp);

  useEffect(() => {
    getCommonDictionary({ groupId: "EN", functionName: "EN1500" });
  }, []);

  useEffect(() => {
    if (selected !== undefined && JSON.stringify(selected) !== "{}") {
      reset(selected);
      setJnMpdanga(selected.jnMpdanga);
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

  useImperativeHandle<HTMLFormElement, any>(ref, () => ({
    update,
    resetForm,
  }));

  const resetForm = (type: string) => {
    if (selected !== undefined && JSON.stringify(selected) !== "{}") {
      let newData: any = {};

      if (type === "reset") {
        reset(selected);
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

        newData.jnMpdanga = jnMpdanga;
        newData.jnKgdanga = jnKgdanga;
        newData.jnKgdangaMp = jnKgdangaMp;
        reset(newData);
      }
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
    if (typeof formValues.jnMpdanga === "string") {
      formValues.jnMpdanga = Number(formValues.jnMpdanga);
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
    updateParams.jnMpdanga = formValues.jnMpdanga;
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

    const res: any = await apiPost(
      EN1500UPDATE,
      updateParams,
      "저장이 성공하였습니다"
    );
    if (res) {
      //setData((prev: any) => {
      //  prev[selectedRowIndex] = formValues;
      //  return [...prev];
      //});

      setSelected(formValues);
    }
  };

  const data1500 = [
    {
      title: "280 mmH2O",
      jnCost280: (
        <Controller
          control={control}
          name="jnCost280"
          render={({ field }) => (
            <Input
              {...field}
              mask={currencyMask}
              textAlign="right"
              inputSize={InputSize.i70}
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
          name="jnCost600"
          render={({ field }) => (
            <Input
              {...field}
              mask={currencyMask}
              textAlign="right"
              inputSize={InputSize.i70}
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
          name="jnCost1000"
          render={({ field }) => (
            <Input
              {...field}
              mask={currencyMask}
              textAlign="right"
              inputSize={InputSize.i70}
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
          name="jnCost1500"
          render={({ field }) => (
            <Input
              {...field}
              mask={currencyMask}
              textAlign="right"
              inputSize={InputSize.i70}
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
          name="jnCost2000"
          render={({ field }) => (
            <Input
              {...field}
              mask={currencyMask}
              textAlign="right"
              inputSize={InputSize.i70}
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
          name="jnCost2500"
          render={({ field }) => (
            <Input
              {...field}
              mask={currencyMask}
              textAlign="right"
              inputSize={InputSize.i70}
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
          name="jnCost7000"
          render={({ field }) => (
            <Input
              {...field}
              mask={currencyMask}
              textAlign="right"
              inputSize={InputSize.i70}
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
    params.jnMpdanga = jnMpdanga;
    params.jnKgdanga = jnKgdanga;
    params.jnKgdangaMp = jnKgdangaMp;

    const res = await apiGet(EN150065, params);

    if (res) {
      setUnitPriceData(res[0]);
    } else {
      setUnitPriceData([]);
    }
  };

  return (
    <form
      // onSubmit={handleSubmit(submit)}
      style={{
        width: "890px",
        padding: "5px 10px 10px",
      }}
      autoComplete="off"
    >
      <FormGroup>
        <Input label="코 드" register={register("areaCode")} maxLength="2" />
        <Input
          label="영업소명"
          register={register("areaName")}
          maxLength="20"
        />
      </FormGroup>

      <VolReading>
        <div className="title">LPG 판매단가 설정</div>
        <FormGroup>
          <Input
            label="MP  단가(kg)"
            register={register("jnMpdanga")}
            inputSize={InputSize.i85}
            textAlign="right"
            onChange={(e: any) => {
              setJnMpdanga(e.target.value);
            }}
          />
          <Input
            label="kg 공급단가"
            register={register("jnKgdangaMp")}
            inputSize={InputSize.i85}
            textAlign="right"
            onChange={(e: any) => {
              setJnKgdangaMp(e.target.value);
            }}
          />

          <Input
            label="지역 표준기화율"
            register={register("jnKgdanga")}
            inputSize={InputSize.i85}
            textAlign="right"
            onChange={(e: any) => {
              setJnKgdanga(e.target.value);
            }}
          />
          <Button
            text="㎥ 표준단가 계산"
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

        <InfoText
          text="거래처의 루베단가를 kg단가로 적용시 압력별 ㎥ 표준단가 계산하여 적용"
          style={{ marginLeft: "30px" }}
        />
      </VolReading>
      <FormGroup style={{ alignItems: "stretch" }}>
        <VolReading>
          <div className="title">압력별 환경 루베단가 설정</div>
          <div style={{ padding: "0 5px 5px 5px" }}>
            <Table
              tableHeader={[
                "조정기 압력",
                "루베(㎥ ) 단가",
                "㎥단가 환산",
                "기화율",
              ]}
              tableData={data1500}
            />
          </div>
          <InfoText
            text="체적 환경단가 적용 거래처에 적용됩니다."
            style={{ marginLeft: "30px" }}
          />
        </VolReading>
        <VolReading className="ml5">
          <div className="title">신규거래처 기본설정 항목</div>
          <FormGroup>
            <Label>조정기 압력</Label>
            <Select
              register={register("jnR")}
              width={InputSize.i85}
              textAlign="left"
            >
              {dataCommonDic?.jnR?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.code}
                </option>
              ))}
            </Select>
            <p>mmH2O</p>
          </FormGroup>
          <FormGroup>
            <Controller
              control={control}
              name="jnAnkum"
              render={({ field }) => (
                <Input
                  {...field}
                  label="안전 관리비"
                  mask={currencyMask}
                  textAlign="right"
                  inputSize={InputSize.i85}
                />
              )}
            />
            <p>원</p>
          </FormGroup>
          <FormGroup>
            <Controller
              control={control}
              name="jnGumdate"
              render={({ field }) => (
                <Input
                  {...field}
                  label="정기 검침일"
                  mask={[/\d/, /\d/]}
                  textAlign="right"
                  inputSize={InputSize.i85}
                />
              )}
            />
            <p>일</p>
          </FormGroup>
          <FormGroup>
            <Label>수금 방법</Label>
            <Select register={register("jnSukumtype")} width={InputSize.i85}>
              {dataCommonDic?.jnSukumtype?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
          <FormGroup>
            <Controller
              control={control}
              name="jnPer"
              render={({ field }) => (
                <Input
                  {...field}
                  label="연체율"
                  mask={[/\d/, /\d/, /\d/]}
                  textAlign="right"
                  inputSize={InputSize.i85}
                />
              )}
            />
            <p>%</p>
          </FormGroup>
          <InfoText
            text="신규 거래처 등록시 자동적용 항목입니다."
            style={{ marginLeft: "30px" }}
          />
        </VolReading>
      </FormGroup>
      <VolReading>
        <div className="title">체적검침 환경</div>
        <FormGroup>
          <Label>루베단가 계산</Label>
          <Select register={register("jnMpdangaType")} width={InputSize.i250}>
            {dataCommonDic?.jnMpdangaType?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
          <InfoText
            text="할인단가 적용시 루베단가 소수미만 계산"
            style={{ marginLeft: "30px" }}
          />
        </FormGroup>
        <FormGroup>
          <Label>연체료 적용방법</Label>
          <Select register={register("jnPerMeth")} width={InputSize.i250}>
            {dataCommonDic?.jnPerMeth?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
          <InfoText
            text="검침 등록시 미납금액에 대하여 연체료를 부과"
            style={{ marginLeft: "30px" }}
          />
        </FormGroup>
        <FormGroup>
          <Label>체적사용료 계산</Label>
          <Select register={register("jnChekum")} width={InputSize.i250}>
            {dataCommonDic?.jnChekum?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
          <InfoText
            text="당월합계금액의 1원단위 계산방법"
            style={{ marginLeft: "30px" }}
          />
        </FormGroup>
        <FormGroup>
          <Label>지로출력 조건</Label>
          <Select register={register("jnJiroPrint")} width={InputSize.i250}>
            {dataCommonDic?.jnJiroPrint?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
          <InfoText
            text="지로 청구서 출력시 범위 지정"
            style={{ marginLeft: "30px" }}
          />
        </FormGroup>
      </VolReading>
    </form>
  );
};

export default forwardRef(Form);
