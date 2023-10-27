import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from "app/store";
import { apiPost } from "app/axios";
import { AR1100ASCUSTINSERT, AR1100ASCUSTUPDATE } from "app/path";
import { setAR1100Tab5AsCust } from "app/state/modal/modalSlice";
import Button from "components/button/button";
import { ModalBlueHeader } from "components/modal/customModals/style";
import {
  Reset,
  WhiteClose,
  Sms_Send,
  Update,
  Settings2,
} from "components/allSvgIcon";
import { Input, Select, FormGroup, CustomForm } from "components/form/style";
import { ButtonColor, InputSize } from "components/componentsType";
import Table from "components/table";
import CustomDatePicker from "components/customDatePicker";
import { currencyMask, removeCommas } from "helpers/currency";
import { DateWithoutDash } from "helpers/dateFormat";
import { AR1100MODELDETAIL } from "./model";
import { modalTableHeader } from "./tableHeader";
import {
  FFormGroup,
  LLabel,
  IInput,
  SSpan,
  DDiv,
  DDivInner,
  DDivTh,
} from "./style";
import { prepVal, calculationOfVat2 } from "../../helper";
function AsModal({
  setModalOpen,
  params,
}: {
  setModalOpen: Function;
  params: any;
}) {
  console.log("params>>>>>>>>>>>>>>>>>>>", params);
  const dataState: any = useSelector(
    (state: any) => state.modal.ar1100Tab5Data
  );

  const { register, handleSubmit, reset, control, watch, getValues } =
    useForm<AR1100MODELDETAIL>({
      mode: "onSubmit",
    });

  const dispatch = useDispatch();

  useEffect(() => {
    if (dataState) {
      if (
        dataState?.detailData &&
        Object.keys(dataState?.detailData)?.length > 0
      ) {
        reset(dataState?.detailData[0]);
      }
    }
  }, [dataState]);

  useEffect(() => {
    if (watch("asInkumtype") !== undefined) {
      handleChangeInkumType(watch("asInkumtype"));
    }
  }, [watch("asInkumtype")]);

  useEffect(() => {
    if (watch("asSurikum") !== undefined) {
      handleChangeSurikum(watch("asSurikum"));
    }
  }, [watch("asSurikum")]);

  useEffect(() => {
    if (watch("asInkum") !== undefined) {
      handleChangefields(watch("asInkum"), "inkum");
    }
  }, [watch("asInkum")]);

  useEffect(() => {
    if (watch("asDc") !== undefined) {
      handleChangefields(watch("asDc"), "dc");
    }
  }, [watch("asDc")]);

  useEffect(() => {
    if (watch("asVatDiv") !== undefined) {
      handleChangeVatDiv(watch("asVatDiv"));
    }
  }, [watch("asVatDiv")]);

  const calculationOfMisu = (tempTotal: number) => {
    let tempInkum = prepVal(getValues("asInkum"));
    let tempDc = prepVal(getValues("asDc"));
    const tempMisu = tempTotal - tempInkum - tempDc;
    return tempMisu;
  };

  const handleChangeInkumType = (val: string) => {
    if (val === "A") {
      reset((formValues) => ({
        ...formValues,
        asInkum: 0,
        asDc: 0,
      }));
    }
    if (val !== "2") {
      reset((formValues) => ({
        ...formValues,
        acbCode: "",
      }));
    }
  };

  const handleChangeSurikum = (val: number) => {
    const tempMisuKum = calculationOfMisu(prepVal(val));
    const tempVatDiv = getValues("asVatDiv") ? getValues("asVatDiv") : "0";
    const { tempKumSup, tempKumVat } = calculationOfVat2(
      prepVal(val),
      tempVatDiv
    );

    reset((formValues) => ({
      ...formValues,
      asKumSup: tempKumSup,
      asKumVat: tempKumVat,
      asMisukum: tempMisuKum,
    }));
  };

  const handleChangeVatDiv = (val: string) => {
    const tempSurikum = prepVal(getValues("asSurikum"));
    let { tempKumSup, tempKumVat } = calculationOfVat2(tempSurikum, val);
    const tempMisu = calculationOfMisu(tempSurikum);
    reset((formValues) => ({
      ...formValues,
      asKumSup: tempKumSup,
      asKumVat: tempKumVat,
      asMisukum: tempMisu,
    }));
  };

  const handleChangefields = (val: number, type: string) => {
    let tempInkum: number = 0;
    let tempDc: number = 0;

    if (type === "inkum") {
      tempDc = prepVal(getValues("asDc"));
      tempInkum = prepVal(val);
    } else if (type === "dc") {
      tempInkum = prepVal(getValues("asInkum"));
      tempDc = prepVal(val);
    }

    const tempSurikum = prepVal(getValues("asSurikum"));
    const tempMisu: number = tempSurikum - tempDc - tempInkum;

    reset((formValues) => ({
      ...formValues,
      asMisukum: tempMisu,
    }));
  };

  const submit = async (params: any) => {
    if (dataState?.isAddBtnClicked !== undefined) {
      let path: string = "";
      if (dataState?.isAddBtnClicked) {
        path = AR1100ASCUSTINSERT;
        params.asSno = "";
      } else {
        path = AR1100ASCUSTUPDATE;
        params.asDateB = DateWithoutDash(params.asDate);
      }
      params.insertType = "0";
      params.areaCode = dataState?.areaCode;
      params.asDate = DateWithoutDash(params.asDate);
      params.asPdate = DateWithoutDash(params.asPdate);
      params.asPtime = DateWithoutDash(params.asPtime);
      params.asYdate = DateWithoutDash(params.asYdate);

      params.asSurikum = +removeCommas(params.asSurikum, "number");
      params.asMisukum = +removeCommas(params.asMisukum, "number");
      params.asInkum = +removeCommas(params.asInkum, "number");
      params.asDc = +removeCommas(params.asDc, "number");

      if (params.asInSwCode) {
        const asSwName = dataState?.asInSwCode?.find(
          (item: any) => item.code === params.asInSwCode
        )?.codeName;
        params.asSwName = asSwName;
      }

      const res = await apiPost(path, params, "저장이 성공하였습니다");
      if (res) {
        dispatch(setAR1100Tab5AsCust({ loadStatus: true, source: "AR1100" }));
        setTimeout(() => {
          setModalOpen(false);
        }, 1000);
      }
    }
  };

  const tableData2 = [
    {
      0: (
        <FormGroup>
          <Select register={register("asVatDiv")} width={InputSize.i120}>
            {dataState?.asVatDiv?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
      ),
      1: (
        <Controller
          control={control}
          name="asKumSup"
          render={({ field }) => (
            <Input
              {...field}
              inputSize={InputSize.i100}
              readOnly
              textAlign="right"
              mask={currencyMask}
            />
          )}
        />
      ),
      2: (
        <Controller
          control={control}
          name="asKumVat"
          render={({ field }) => (
            <Input
              {...field}
              inputSize={InputSize.i100}
              readOnly
              textAlign="right"
              mask={currencyMask}
            />
          )}
        />
      ),
      3: (
        <Controller
          control={control}
          name="asSurikum"
          render={({ field }) => (
            <Input
              {...field}
              inputSize={InputSize.i120}
              textAlign="right"
              mask={currencyMask}
            />
          )}
        />
      ),
      4: (
        <FormGroup>
          <Select register={register("asInkumtype")} width={InputSize.i100}>
            {dataState?.asInkumType?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
      ),
      5: (
        <FormGroup>
          <Select
            register={register("acbCode")}
            width={InputSize.i170}
            disabled={watch("asInkumtype") !== "2"}
          >
            {dataState?.asAcbCode?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
      ),
      6: (
        <Controller
          control={control}
          name="asInkum"
          render={({ field }) => (
            <Input
              {...field}
              inputSize={InputSize.i120}
              textAlign="right"
              mask={currencyMask}
              readOnly={watch("asInkumtype") === "A"}
            />
          )}
        />
      ),
      7: (
        <Controller
          control={control}
          name="asDc"
          render={({ field }) => (
            <Input
              {...field}
              inputSize={InputSize.i120}
              textAlign="right"
              mask={currencyMask}
              readOnly={watch("asInkumtype") === "A"}
            />
          )}
        />
      ),
      8: (
        <Controller
          control={control}
          name="asMisukum"
          render={({ field }) => (
            <Input
              {...field}
              inputSize={InputSize.i120}
              textAlign="right"
              mask={currencyMask}
              readOnly
            />
          )}
        />
      ),
    },
  ];

  return (
    <CustomForm autoComplete="off" onSubmit={handleSubmit(submit)}>
      <ModalBlueHeader
        className="handle h25"
        style={{ background: "rgba(101, 84, 255, 0.37)", height: "40px" }}
      >
        <FormGroup>A/S 관리</FormGroup>
        <FormGroup>
          <span
            className="close_btn"
            style={{ marginLeft: "10px", marginTop: "1px" }}
            onClick={() => {
              setModalOpen(false);
            }}
          >
            <WhiteClose />
          </span>
        </FormGroup>
      </ModalBlueHeader>
      <div>
        <div
          style={{
            fontSize: "14px",
            padding: "20px 15px",
            display: "flex",
            alignItems: "center",
            background: "#fffbd6",
          }}
        >
          <FFormGroup>
            <LLabel style={{}}>거래구분</LLabel>
            <IInput readOnly />
          </FFormGroup>
          <FFormGroup>
            <LLabel style={{}}>거래처 코드</LLabel>
            <IInput readOnly />
          </FFormGroup>
          <FFormGroup>
            <LLabel style={{}}>거래처명</LLabel>
            <IInput readOnly />
          </FFormGroup>
        </div>
        <div
          style={{
            padding: "0 10px",
            margin: "10px 0",
            display: "flex",
            gap: "20px",
          }}
        >
          <div>
            <FormGroup>
              <span
                style={{
                  width: "94px",
                  height: "28px",
                  fontSize: "13px",
                  background: "#fdef73",
                  border: "1px solid #a6a6a6",
                  borderRadius: "3px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "3px",
                }}
              >
                A/S 상태
              </span>
              <FormGroup>
                <Select
                  register={register("saleState")}
                  style={{ width: "217px" }}
                >
                  {dataState?.saleState?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>
            </FormGroup>

            <FormGroup>
              <SSpan>전화번호</SSpan>
              <Select register={register("asInTel")} style={{ width: "217px" }}>
                {dataState?.asInTel?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup>
              <div>
                <SSpan style={{ width: "115px" }}>접수일자</SSpan>
                <Controller
                  control={control}
                  name="asDate"
                  render={({ field }) => (
                    <CustomDatePicker {...field} style={{ margin: "0" }} />
                  )}
                />
              </div>
              <div>
                <SSpan style={{ width: "90px" }}>접수시간</SSpan>
                <Controller
                  control={control}
                  name="asInTime"
                  render={({ field }) => (
                    <Input
                      {...field}
                      inputSize={InputSize.i90}
                      textAlign="center"
                    />
                  )}
                />
              </div>
              <div>
                <SSpan style={{ width: "100px" }}>접수 사원</SSpan>
                <FormGroup>
                  <Select
                    register={register("asInSwCode")}
                    width={InputSize.i100}
                  >
                    {dataState?.asInSwCode?.map((obj: any, idx: number) => (
                      <option key={idx} value={obj.code}>
                        {obj.codeName}
                      </option>
                    ))}
                  </Select>
                </FormGroup>
              </div>
            </FormGroup>
            {/* SMS_SEND_0 YN, SMS_SEND_0 DT  */}
            <div
              style={{
                display: "flex",
                gap: "5px",
                alignItems: "center",
                margin: "0 0 15px 3px",
              }}
            >
              <Button
                text="접수알림"
                icon={<Sms_Send />}
                type="button"
                color={ButtonColor.SMS_SEND}
                onClick={(e) => alert("SMS_SEND_0 sms ilgeeh ")}
              />
              <span style={{ fontSize: "12px" }}>
                전송일시: 23-10-20 16:26:23
              </span>
            </div>

            <FormGroup>
              <div>
                <SSpan style={{ width: "115px" }}>처리예정일</SSpan>
                <Controller
                  control={control}
                  name="asPdate"
                  render={({ field }) => (
                    <CustomDatePicker {...field} style={{ margin: "0" }} />
                  )}
                />
              </div>
              <div>
                <SSpan style={{ width: "90px" }}>예정시간</SSpan>
                <Controller
                  control={control}
                  name="asPtime"
                  render={({ field }) => (
                    <Input
                      {...field}
                      inputSize={InputSize.i90}
                      textAlign="center"
                    />
                  )}
                />
              </div>
              <div>
                <SSpan style={{ width: "100px" }}>처리 예정 사원</SSpan>
                <FormGroup>
                  <Select
                    register={register("asPSwCode")}
                    width={InputSize.i100}
                  >
                    {dataState?.asPSwCode?.map((obj: any, idx: number) => (
                      <option key={idx} value={obj.code}>
                        {obj.codeName}
                      </option>
                    ))}
                  </Select>
                </FormGroup>
              </div>
            </FormGroup>
            {/* SMS_SEND_1 YN, SMS_SEND_1 DT  */}
            <div
              style={{
                display: "flex",
                gap: "5px",
                alignItems: "center",
                margin: "0 0 15px 3px",
              }}
            >
              <Button
                text="예정알림"
                icon={<Sms_Send />}
                type="button"
                color={ButtonColor.SMS_SEND}
                onClick={(e) => alert("SMS_SEND_1 sms ilgeeh ")}
              />
              <span style={{ fontSize: "12px" }}>
                전송일시: 23-10-20 16:26:23
              </span>
            </div>
            <div style={{ display: "flex", gap: "15", alignItems: "center" }}>
              <div>
                <SSpan style={{ width: "115px" }}>처리일자</SSpan>
                <Controller
                  control={control}
                  name="asYdate"
                  render={({ field }) => (
                    <CustomDatePicker {...field} style={{ margin: "0" }} />
                  )}
                />
              </div>
              <div>
                <SSpan style={{ width: "90px" }}>완료시간</SSpan>
                <Controller
                  control={control}
                  name="asYtime"
                  render={({ field }) => (
                    <Input
                      {...field}
                      inputSize={InputSize.i90}
                      textAlign="center"
                    />
                  )}
                />
              </div>
              <div>
                <SSpan style={{ width: "100px" }}>처리 사원</SSpan>
                <FormGroup>
                  <Select
                    register={register("asSwCode")}
                    width={InputSize.i100}
                  >
                    {dataState?.asSwCode?.map((obj: any, idx: number) => (
                      <option key={idx} value={obj.code}>
                        {obj.codeName}
                      </option>
                    ))}
                  </Select>
                </FormGroup>
              </div>
            </div>
            {/* SMS_SEND_2 YN, SMS_SEND_2 DT  */}
            <div
              style={{
                display: "flex",
                gap: "5px",
                alignItems: "center",
                margin: "0 0 15px 3px",
              }}
            >
              <Button
                text="완료알림"
                icon={<Sms_Send />}
                type="button"
                color={ButtonColor.SMS_SEND}
                onClick={(e) => alert("SMS_SEND_2 sms ilgeeh ")}
              />
              <span style={{ fontSize: "12px" }}>
                전송일시: 23-10-20 16:26:23
              </span>
            </div>
          </div>
          <DDiv>
            <DDivInner>
              <span
                style={{
                  width: "80px",
                  height: "28px",
                  fontSize: "13px",
                  background: "#fdef73",
                  border: "1px solid #a6a6a6",
                  borderRadius: "3px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "3px",
                }}
              >
                불류명
              </span>
              <FormGroup style={{ width: "100%" }}>
                <Select
                  register={register("asTagName")}
                  style={{ width: "100%" }}
                >
                  {dataState?.asTagName?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>
            </DDivInner>
            <DDivInner>
              <DDivTh style={{ background: "#c2f9da" }}>
                <span>접수 내용</span>
              </DDivTh>
              <div style={{ width: "100%" }}>
                <Controller
                  control={control}
                  name="asIn"
                  render={({ field }) => (
                    <Input {...field} fullWidth textAlign="left" />
                  )}
                />
                <Controller
                  control={control}
                  name="asIn02"
                  render={({ field }) => (
                    <Input {...field} fullWidth textAlign="left" />
                  )}
                />
                <Controller
                  control={control}
                  name="asIn03"
                  render={({ field }) => (
                    <Input {...field} fullWidth textAlign="left" />
                  )}
                />
              </div>
            </DDivInner>
            <DDivInner>
              <DDivTh>
                <span>고장 부분</span>
              </DDivTh>
              <div style={{ width: "100%" }}>
                <Controller
                  control={control}
                  name="asGojang"
                  render={({ field }) => (
                    <Input {...field} fullWidth textAlign="left" />
                  )}
                />
                <Controller
                  control={control}
                  name="asGojang02"
                  render={({ field }) => (
                    <Input {...field} fullWidth textAlign="left" />
                  )}
                />
              </div>
            </DDivInner>
            <DDivInner>
              <DDivTh>
                <span>처리 내용</span>
              </DDivTh>
              <div style={{ width: "100%" }}>
                <Controller
                  control={control}
                  name="asSuri"
                  render={({ field }) => (
                    <Input {...field} fullWidth textAlign="left" />
                  )}
                />
                <Controller
                  control={control}
                  name="asSuri02"
                  render={({ field }) => (
                    <Input {...field} fullWidth textAlign="left" />
                  )}
                />
              </div>
            </DDivInner>
            <DDivInner>
              <DDivTh>
                <span>원인</span>
              </DDivTh>
              <div style={{ width: "100%" }}>
                <Controller
                  control={control}
                  name="asWonin"
                  render={({ field }) => (
                    <Input {...field} fullWidth textAlign="left" />
                  )}
                />
                <Controller
                  control={control}
                  name="asWonin02"
                  render={({ field }) => (
                    <Input {...field} fullWidth textAlign="left" />
                  )}
                />
              </div>
            </DDivInner>
          </DDiv>
        </div>
        <div>
          <Table
            className="no-space"
            tableHeader={modalTableHeader}
            tableData={tableData2}
          />
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",

            background: "#b9b9b9",
            padding: "10px",
          }}
        >
          <Button
            text="문자전송 환경"
            icon={<Settings2 />}
            color={ButtonColor.LIGHT}
            type="button"
            onClick={() => alert("odoohndoo hiigdeegui bga")}
          />
          <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <Button
              text="저장"
              icon={<Update />}
              color={ButtonColor.SECONDARY}
              type="submit"
            />
            <Button
              text="취소"
              icon={<Reset />}
              type="button"
              onClick={() => {
                setModalOpen(false);
              }}
            />
          </div>
        </div>
      </div>
    </CustomForm>
  );
}

export default AsModal;
