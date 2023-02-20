import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { InfoBox } from "./style";
import { IRV1100 } from "./model";
import { RV110065, RV1100INSERT } from "app/path";
import API from "app/axios";
import CustomDatePicker from "components/customDatePicker";
import CheckBox from "components/checkbox";
import { Wrapper, FormGroup, Label, Field, Input } from "components/form/style";
import {
  formatDate,
  formatDateByRemoveDash,
  formatDateToStringWithDash,
  formatDateToStringWithoutDash,
  formatOnlyYearMonthDateByRemoveDash,
  formatDateToStringWithoutDashOnlyYearMonth,
} from "helpers/dateFormat";
import { InputSize, ButtonColor, ButtonType } from "components/componentsType";
import Button from "components/button/button";
import Grid from "./grid";
import { fields, columns } from "./data/dataBottom";
import PinImg from "assets/image/pin.png";

function Footer({ data, dataCommonDic }: { data: any; dataCommonDic: any }) {
  const [data65, setData65] = useState([]);
  const { register, control, reset, handleSubmit } = useForm<IRV1100>({
    mode: "onSubmit",
  });

  useEffect(() => {
    if (data !== undefined) {
      console.log("data", data);
      reset({
        gjDate: data.gjDate,
        gjGum: data.gjGum,
        gjDanga: data.gjDanga,
        gjKumack: data.gjKumack,
        gjTotal: data.gjTotal,
        gjBigo: data.gjBigo,
        gjSdate: data.gjSdate,
        gjJungum: data.gjJungum,
        gjBaGageYn: data.gjBaGageYn === "Y",
        gjBaGageKum: data.gjBaGageKum,
        gjPerkum: data.gjPerkum,
        gjMisu: data.gjMisu,
        gjGage: data.gjGage,
        maintCost: data.maintCost,
        gjDc: data.gjDc,
        gjJmisuYn: data.gjJmisuYn === "Y",
        gjJmisuAmt: data.gjJmisuAmt,
        gjJankg: data?.gjJankg,
        gjT1Per: data?.gjT1Per,
        gjT1Kg: data?.gjT1Kg,
        gjT2Per: data?.gjT2Per,
        gjT2Kg: data?.gjT2Kg,
        //gjEyeTank1Dt: data?.gjEyeTank1Dt,
        //gjEyeTank2Dt: data?.gjEyeTank2Dt,
      });

      fetchData65();
    }
  }, [data]);

  const fetchData65 = async () => {
    try {
      const { data: data65 } = await API.get(RV110065, {
        params: { areaCode: data?.areaCode, gjCuCode: data?.gjCuCode },
      });
      setData65(data65);
    } catch (err) {}
  };

  const getGjJanType = () => {
    if (data.gjJanType === "0")
      return (
        <Input
          label="잔 량"
          register={register("gjJankg")}
          labelStyle={{ minWidth: "68px" }}
          inputSize={InputSize.i120}
        />
      );
    if (data.gjJanType === "1")
      return (
        <Field flex>
          <Input
            label="잔 량"
            register={register("gjT1Per")}
            labelStyle={{ minWidth: "68px" }}
            inputSize={InputSize.i50}
          />
          <Input register={register("gjT1Kg")} inputSize={InputSize.i60} />
          <p>{data?.gjEyeTank1Dt}</p>
        </Field>
      );
    if (data.gjJanType === "2")
      return (
        <Field flex style={{ alignItems: "center", gap: "4px" }}>
          <Label style={{ minWidth: "68px" }}>잔 량</Label>
          <Field>
            <Field flex>
              <Input register={register("gjT1Per")} inputSize={InputSize.i50} />
              <Input register={register("gjT1Kg")} inputSize={InputSize.i60} />
              <p>{data?.gjEyeTank1Dt}</p>
            </Field>
            <Field flex>
              <Input register={register("gjT2Per")} inputSize={InputSize.i50} />
              <Input register={register("gjT2Kg")} inputSize={InputSize.i60} />
              <p>{data?.gjEyeTank2Dt}</p>
            </Field>
          </Field>
        </Field>
      );

    return null;
  };

  const submit = async (params: any) => {
    params.areaCode = data?.areaCode;
    params.gjCuCode = data?.gjCuCode;
    params.gjJanType = data?.gjJanType;
    params.gjGumym = dataCommonDic?.sGjGumym[0].code;
    params.gjGumym =
      typeof params.gjGumym === "string"
        ? formatOnlyYearMonthDateByRemoveDash(params.gjGumym)
        : params.gjGumym instanceof Date
        ? formatDateToStringWithoutDashOnlyYearMonth(params.gjGumym)
        : "";
    params.gjSno = dataCommonDic?.sGjSno[1].code;
    params.gjPerDate = dataCommonDic?.sGjPerDate[0].code;
    params.gjPerDate =
      typeof params.gjPerDate === "string"
        ? formatDateByRemoveDash(params.gjPerDate)
        : params.gjPerDate instanceof Date
        ? formatDateToStringWithDash(params.gjPerDate)
        : "";

    params.gjSdate =
      typeof params.gjSdate === "string"
        ? formatDateByRemoveDash(params.gjSdate)
        : params.gjSdate instanceof Date
        ? formatDateToStringWithoutDash(params.gjSdate)
        : "";

    params.gjDate =
      typeof params.gjDate === "string"
        ? formatDateByRemoveDash(params.gjDate)
        : params.gjDate instanceof Date
        ? formatDateToStringWithoutDash(params.gjDate)
        : "";

    params.gjGum = Number(params.gjGum);
    params.gjBigo = Number(params.gjBigo);

    try {
      const { data: dataInserted } = await API.post(RV1100INSERT, params);
      setData65(data65);
    } catch (err) {}
    // }
  };
  return (
    <div>
      <InfoBox style={{ width: "1400px" }}>
        <Field flex>
          <div>
            <Wrapper grid col={5} fields="1fr 0.95fr 1fr 0.9fr 1fr">
              <FormGroup className="small">
                <Label style={{ minWidth: "80px" }}>검침년월</Label>
                <Controller
                  control={control}
                  {...register("gjDate")}
                  render={({ field: { onChange, value, name } }) => (
                    <CustomDatePicker
                      value={value}
                      onChange={onChange}
                      name={name}
                    />
                  )}
                />
              </FormGroup>
              <Input
                label="당월검침"
                register={register("gjGum")}
                labelStyle={{ minWidth: "66px" }}
                inputSize={InputSize.i120}
                textAlign="right"
              />
              <Input
                label="㎥ 단가"
                register={register("gjDanga")}
                labelStyle={{ minWidth: "76px" }}
                inputSize={InputSize.i120}
                textAlign="right"
              />
              <Input
                label="사용료"
                register={register("gjKumack")}
                labelStyle={{ minWidth: "52px" }}
                inputSize={InputSize.i120}
                textAlign="right"
              />
              <Input
                label="당월금액"
                register={register("gjTotal")}
                labelStyle={{ minWidth: "89px" }}
                inputSize={InputSize.i120}
                textAlign="right"
              />
            </Wrapper>
            <Wrapper grid col={5} fields="1fr 0.95fr 1fr 0.9fr 1fr">
              <FormGroup className="small">
                <Label style={{ minWidth: "80px" }}>사용시작일</Label>
                <Controller
                  control={control}
                  {...register("gjSdate")}
                  render={({ field: { onChange, value, name } }) => (
                    <CustomDatePicker
                      value={value}
                      onChange={onChange}
                      name={name}
                    />
                  )}
                />
              </FormGroup>
              <Input
                label="전월검침"
                register={register("gjJungum")}
                labelStyle={{ minWidth: "66px" }}
                inputSize={InputSize.i120}
                textAlign="right"
              />
              <FormGroup style={{ gap: "10px" }}>
                <CheckBox
                  register={{ ...register("gjBaGageYn") }}
                  title="기본료"
                />
                <Input
                  register={register("gjBaGageKum")}
                  inputSize={InputSize.i120}
                  textAlign="right"
                />
              </FormGroup>
              <Input
                label="연체료"
                register={register("gjPerkum")}
                labelStyle={{ minWidth: "52px" }}
                inputSize={InputSize.i120}
                textAlign="right"
              />
              <Input
                label="전미수"
                register={register("gjMisu")}
                labelStyle={{ minWidth: "89px" }}
                inputSize={InputSize.i120}
                textAlign="right"
              />
            </Wrapper>
            <Wrapper grid col={5} fields="1fr 0.95fr 1fr 0.9fr 1fr">
              <Field flex style={{ alignItems: "center" }}>
                <img src={PinImg} style={{ marginLeft: "15px" }} />
                <p
                  style={{
                    fontSize: "9px",
                    color: "#686767",
                    marginLeft: "10px",
                  }}
                >
                  원격검침일시 2022-12-30 12:52
                </p>
              </Field>
              <Input
                label="사용량"
                register={register("gjGage")}
                labelStyle={{ minWidth: "66px" }}
                inputSize={InputSize.i120}
                textAlign="right"
              />
              <Input
                label="관리비"
                register={register("maintCost")}
                labelStyle={{ minWidth: "76px" }}
                inputSize={InputSize.i120}
                textAlign="right"
              />
              <Input
                label="할인율"
                register={register("gjDc")}
                labelStyle={{ minWidth: "52px" }}
                inputSize={InputSize.i120}
                textAlign="right"
              />
              <FormGroup style={{ gap: "10px" }}>
                <CheckBox
                  register={{ ...register("gjJmisuYn") }}
                  title="중량금액"
                />
                <Input
                  register={register("gjJmisuAmt")}
                  inputSize={InputSize.i120}
                  textAlign="right"
                />
              </FormGroup>
            </Wrapper>
          </div>
          <div>
            <Input
              label="비고"
              register={register("gjBigo")}
              labelStyle={{ minWidth: "68px" }}
              inputSize={InputSize.i120}
            />
            {getGjJanType()}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              marginLeft: "10px",
            }}
          >
            <Button
              text="저장"
              type="button"
              color={ButtonColor.SECONDARY}
              style={{
                marginLeft: "6px",
                background: "#5284CE",
                width: "72px",
                color: "#fff",
              }}
              kind={ButtonType.ROUND}
              onClick={handleSubmit(submit)}
            />
            <Button
              text="취소"
              type="button"
              color={ButtonColor.SECONDARY}
              style={{
                marginLeft: "6px",
                background: "#5284CE",
                width: "72px",
                color: "#fff",
              }}
              kind={ButtonType.ROUND}
            />
          </div>
        </Field>
      </InfoBox>
      <Field flex style={{ width: "100%" }}>
        <div
          style={{
            background: "rgba(104,103,103,0.26)",
            width: "70px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          최근 <br />
          이력
        </div>
        <Grid
          fields={fields}
          columns={columns}
          data={data65}
          style={{
            height: "150px",
            width: `100%`,
          }}
        />
      </Field>
    </div>
  );
}

export default Footer;
