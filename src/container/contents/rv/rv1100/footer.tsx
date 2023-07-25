import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { InfoBox } from "./style";
import { IRV1100 } from "./model";
import { RV110065, RV1100INSERT } from "app/path";
import { apiGet, apiPost } from "app/axios";
import CustomDatePicker from "components/customDatePicker";
import CheckBox from "components/checkbox";
import { Wrapper, FormGroup, Label, Field, Input } from "components/form/style";
import {
  DateWithoutDash,
  DateWithoutDashOnlyYearMonth,
} from "helpers/dateFormat";
import { InputSize, ButtonColor, ButtonType } from "components/componentsType";
import Button from "components/button/button";
import Grid from "./grid";
import { fields, columns } from "./data/dataBottom";
import PinImg from "assets/image/pin.png";
import { currencyMask } from "helpers/currency";

function Footer({
  data,
  dataCommonDic,
  gjGumym,
  gjSno,
  gjPerDate,
  selectedRowIndex,
  setSelectedRowIndex,
}: {
  data: any;
  dataCommonDic: any;
  gjGumym: any;
  gjSno: any;
  gjPerDate: any;
  selectedRowIndex: any;
  setSelectedRowIndex?: any;
}) {
  const [data65, setData65] = useState([]);
  const { register, control, reset, handleSubmit } = useForm<IRV1100>({
    mode: "onSubmit",
  });

  useEffect(() => {
    if (data !== undefined) {
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
    if (data.gjCuCode && data.areaCode) {
      // try {
      //   const { data: data65 } = await API.get(RV110065, {
      //     params: { areaCode: data?.areaCode, gjCuCode: data?.gjCuCode },
      //   });
      //   setData65(data65);
      // } catch (err) {}
      const data65 = await apiGet(RV110065, {
        areaCode: data?.areaCode,
        gjCuCode: data?.gjCuCode,
      });
      setData65(data65);
    }
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
    gjGumym
      ? (params.gjGumym = gjGumym)
      : (params.gjGumym = DateWithoutDash(dataCommonDic?.sGjGumym[0].code));
    gjSno
      ? (params.gjSno = gjSno)
      : (params.gjSno = dataCommonDic?.sGjSno[0].code);

    gjPerDate
      ? (params.gjPerDate = gjPerDate)
      : (params.gjPerDate = DateWithoutDash(dataCommonDic?.sGjPerDate[0].code));

    params.gjSdate = DateWithoutDash(params.gjSdate);
    params.gjDate = DateWithoutDash(params.gjDate);
    params.gjGum = Number(params.gjGum);
    params.gjBigo = Number(params.gjBigo);

    // try {
    //   const response: any = await API.post(RV1100INSERT, params);
    //   if (response.status === 200) {
    //     toast.success("저장이 성공하였습니다", {
    //       autoClose: 500,
    //     });
    //     setSelectedRowIndex(selectedRowIndex + 1);
    //   } else {
    //     toast.error(response?.response?.message, {
    //       autoClose: 500,
    //     });
    //   }
    //   setData65(data65);
    // } catch (err) {}

    const response: any = await apiPost(
      RV1100INSERT,
      params,
      "저장이 성공하였습니다"
    );
    if (response) {
      setSelectedRowIndex(selectedRowIndex + 1);
    }
    setData65(data65);
    // }
  };
  return (
    <div>
      <form autoComplete="off">
        <InfoBox style={{ width: "1400px" }}>
          <Field flex>
            <div>
              <Wrapper grid col={5} fields="1fr 0.95fr 1fr 0.9fr 1fr">
                <FormGroup className="small">
                  <Label style={{ minWidth: "80px" }}>검침 년월</Label>
                  <Controller
                    control={control}
                    name="gjDate"
                    render={({ field }) => <CustomDatePicker {...field} />}
                  />
                </FormGroup>
                <Input
                  label="당월 검침"
                  register={register("gjGum")}
                  labelStyle={{ minWidth: "66px" }}
                  inputSize={InputSize.i120}
                  textAlign="right"
                  mask={currencyMask}
                />
                <Input
                  label="㎥ 단가"
                  register={register("gjDanga")}
                  labelStyle={{ minWidth: "76px" }}
                  inputSize={InputSize.i120}
                  textAlign="right"
                  mask={currencyMask}
                />
                <Input
                  label="사용료"
                  register={register("gjKumack")}
                  labelStyle={{ minWidth: "52px" }}
                  inputSize={InputSize.i120}
                  textAlign="right"
                  mask={currencyMask}
                />
                <Input
                  label="당월 금액"
                  register={register("gjTotal")}
                  labelStyle={{ minWidth: "89px" }}
                  inputSize={InputSize.i120}
                  textAlign="right"
                  mask={currencyMask}
                />
              </Wrapper>
              <Wrapper grid col={5} fields="1fr 0.95fr 1fr 0.9fr 1fr">
                <FormGroup className="small">
                  <Label style={{ minWidth: "80px" }}>사용 시작일</Label>
                  <Controller
                    control={control}
                    name="gjSdate"
                    render={({ field }) => <CustomDatePicker {...field} />}
                  />
                </FormGroup>
                <Input
                  label="전월 검침"
                  register={register("gjJungum")}
                  labelStyle={{ minWidth: "66px" }}
                  inputSize={InputSize.i120}
                  textAlign="right"
                  mask={currencyMask}
                />
                <FormGroup style={{ gap: "10px" }}>
                  <CheckBox register={register("gjBaGageYn")} title="기본료" />
                  <Input
                    register={register("gjBaGageKum")}
                    inputSize={InputSize.i120}
                    textAlign="right"
                    mask={currencyMask}
                  />
                </FormGroup>
                <Input
                  label="연체료"
                  register={register("gjPerkum")}
                  labelStyle={{ minWidth: "52px" }}
                  inputSize={InputSize.i120}
                  textAlign="right"
                  mask={currencyMask}
                />
                <Input
                  label="전미수"
                  register={register("gjMisu")}
                  labelStyle={{ minWidth: "89px" }}
                  inputSize={InputSize.i120}
                  textAlign="right"
                  mask={currencyMask}
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
                  mask={currencyMask}
                />
                <Input
                  label="관리비"
                  register={register("maintCost")}
                  labelStyle={{ minWidth: "76px" }}
                  inputSize={InputSize.i120}
                  textAlign="right"
                  mask={currencyMask}
                />
                <Input
                  label="할인율"
                  register={register("gjDc")}
                  labelStyle={{ minWidth: "52px" }}
                  inputSize={InputSize.i120}
                  textAlign="right"
                  mask={currencyMask}
                />
                <FormGroup style={{ gap: "10px" }}>
                  <CheckBox
                    register={register("gjJmisuYn")}
                    title="중량 금액"
                  />
                  <Input
                    register={register("gjJmisuAmt")}
                    inputSize={InputSize.i120}
                    textAlign="right"
                    mask={currencyMask}
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
      </form>
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
