import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
} from "react";
import { useForm, Controller } from "react-hook-form";
import { apiGet, apiPost } from "app/axios";
import { useGetCommonDictionaryMutation } from "app/api/commonDictionary";
import { EN1500UPDATE, EN150065 } from "app/path";
import { InputSize } from "components/componentsType";
import Button from "components/button/button";
import { Select, FormGroup, Label, Input } from "components/form/style";
import { InfoText } from "components/text";
import Table from "components/table";
import { currencyMask, removeCommas } from "helpers/currency";
import { IJNOTRY2 } from "./model";
import { VolReading } from "./style";

interface IForm {
  selected: any;
  fetchData?: Function;
}

const Form = ({ selected, fetchData }: IForm, ref: React.ForwardedRef<any>) => {
  const [getCommonDictionary, { data: dataCommonDic }] =
    useGetCommonDictionaryMutation();

  const { register, handleSubmit, reset, getValues, control } =
    useForm<IJNOTRY2>({
      mode: "onChange",
    });

  const [unitPriceData, setUnitPriceData] = useState<any>({});

  useEffect(() => {
    getCommonDictionary({ groupId: "EN", functionName: "EN1500" });
  }, []);

  useEffect(() => {
    if (selected && Object.keys(selected)?.length > 0) {
      resetForm("reset");
    }
  }, [selected]);

  useEffect(() => {
    if (selected && Object.keys(selected)?.length > 0) {
      resetForm("upReset");
    }
  }, [unitPriceData]);

  useImperativeHandle<HTMLFormElement, any>(ref, () => ({
    update,
    resetForm,
  }));

  const resetForm = (type: string) => {
    if (type === "reset") {
      reset(selected);
    } else if (type === "upReset") {
      reset((formValues) => ({
        ...formValues,
        ...unitPriceData,
      }));
    }
  };

  const calcUnitPrice = async () => {
    let params: any = {};
    params.areaCode = selected.areaCode;
    params.jnKgdangaMp = getValues("jnKgdangaMp");
    params.jnKgdanga = getValues("jnKgdanga");

    const res = await apiGet(EN150065, params);

    if (res) {
      setUnitPriceData(res[0]);
    } else {
      setUnitPriceData({});
    }
  };

  const update = async (data: IJNOTRY2) => {
    const formValues = getValues();

    formValues.jnCost280 = +removeCommas(formValues.jnCost280, "number");
    formValues.jnCost600 = +removeCommas(formValues.jnCost600, "number");
    formValues.jnCost1000 = +removeCommas(formValues.jnCost1000, "number");
    formValues.jnCost1500 = +removeCommas(formValues.jnCost1500, "number");
    formValues.jnCost2000 = +removeCommas(formValues.jnCost2000, "number");
    formValues.jnCost2500 = +removeCommas(formValues.jnCost2500, "number");
    formValues.jnCost7000 = +removeCommas(formValues.jnCost7000, "number");
    formValues.jnAnkum = +removeCommas(formValues.jnAnkum, "number");
    formValues.jnMpdanga = +formValues.jnMpdanga;
    formValues.jnKgdangaMp = +formValues.jnKgdangaMp;
    formValues.jnKgdanga = +formValues.jnKgdanga;

    const res = await apiPost(
      EN1500UPDATE,
      formValues,
      "저장이 성공하였습니다"
    );
    if (res) {
      fetchData && fetchData();
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
              inputSize={InputSize.i85}
            />
          )}
        />
      ),
      unitPrice: (
        <Input
          type="number"
          register={register("tempJn280Mp")}
          textAlign="right"
          inputSize={InputSize.i85}
        />
      ),
      rate: (
        <Input
          type="number"
          register={register("tempJnKgdanga280")}
          textAlign="right"
          inputSize={InputSize.i85}
        />
      ),
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
              inputSize={InputSize.i85}
            />
          )}
        />
      ),
      unitPrice: (
        <Input
          type="number"
          register={register("tempJn600Mp")}
          textAlign="right"
          inputSize={InputSize.i85}
        />
      ),
      rate: (
        <Input
          type="number"
          register={register("tempJnKgdanga600")}
          textAlign="right"
          inputSize={InputSize.i85}
        />
      ),
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
              inputSize={InputSize.i85}
            />
          )}
        />
      ),
      unitPrice: (
        <Input
          type="number"
          register={register("tempJn1000Mp")}
          textAlign="right"
          inputSize={InputSize.i85}
        />
      ),
      rate: (
        <Input
          type="number"
          register={register("tempJnKgdanga1000")}
          textAlign="right"
          inputSize={InputSize.i85}
        />
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
              inputSize={InputSize.i85}
            />
          )}
        />
      ),
      unitPrice: (
        <Input
          type="number"
          register={register("tempJn1500Mp")}
          textAlign="right"
          inputSize={InputSize.i85}
        />
      ),
      rate: (
        <Input
          type="number"
          register={register("tempJnKgdanga1500")}
          textAlign="right"
          inputSize={InputSize.i85}
        />
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
              inputSize={InputSize.i85}
            />
          )}
        />
      ),
      unitPrice: (
        <Input
          type="number"
          register={register("tempJn2000Mp")}
          textAlign="right"
          inputSize={InputSize.i85}
        />
      ),
      rate: (
        <Input
          type="number"
          register={register("tempJnKgdanga2000")}
          textAlign="right"
          inputSize={InputSize.i85}
        />
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
              inputSize={InputSize.i85}
            />
          )}
        />
      ),
      unitPrice: (
        <Input
          type="number"
          register={register("tempJn2500Mp")}
          textAlign="right"
          inputSize={InputSize.i85}
        />
      ),
      rate: (
        <Input
          type="number"
          register={register("tempJnKgdanga2500")}
          textAlign="right"
          inputSize={InputSize.i85}
        />
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
              inputSize={InputSize.i85}
            />
          )}
        />
      ),
      unitPrice: (
        <Input
          type="number"
          register={register("tempJn7000Mp")}
          textAlign="right"
          inputSize={InputSize.i85}
        />
      ),
      rate: (
        <Input
          type="number"
          register={register("tempJnKgdanga7000")}
          textAlign="right"
          inputSize={InputSize.i85}
        />
      ),
    },
  ];

  return (
    <form
      // onSubmit={handleSubmit(submit)}
      style={{
        width: "890px",
        padding: "0px 10px 10px",
      }}
      autoComplete="off"
    >
      <FormGroup>
        <Input
          label="코 드"
          register={register("areaCode")}
          inputSize={InputSize.i85}
        />
        <Input
          label="영업소명"
          register={register("areaName")}
          maxLength="20"
          inputSize={InputSize.i200}
        />
      </FormGroup>

      <VolReading>
        <div className="title">LPG 판매단가 설정</div>
        <FormGroup>
          <Input
            label="MP  단가(kg)"
            type="number"
            register={register("jnMpdanga")}
            inputSize={InputSize.i85}
            textAlign="right"
          />
          <Input
            label="kg 공급단가"
            type="number"
            register={register("jnKgdangaMp")}
            inputSize={InputSize.i85}
            textAlign="right"
          />

          <Input
            label="지역 표준기화율"
            type="number"
            register={register("jnKgdanga")}
            textAlign="right"
            inputSize={InputSize.i85}
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
        <VolReading className="mt3">
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
        <VolReading className="ml5 mt3">
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
      <VolReading className="mt3">
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
