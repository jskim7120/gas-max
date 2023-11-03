import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "app/store";
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
  LabelYellow,
  WrapperInner,
} from "./style";
import { prepVal, calculationOfVat2, timeData } from "../../helper";
import EditableSelect from "components/editableSelect";
function AsModal({
  setModalOpen,
  params,
}: {
  setModalOpen: Function;
  params: any;
}) {
  const { register, handleSubmit, reset, control, watch, getValues } =
    useForm<AR1100MODELDETAIL>({
      mode: "onSubmit",
    });

  const dispatch = useDispatch();

  useEffect(() => {
    if (params !== undefined) {
      if (params?.detailData) {
        reset(params?.detailData);
      }
    }
  }, [params]);

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

  const submit = async (dat: any) => {
    if (params?.isAddBtnClicked !== undefined) {
      let path: string = "";
      if (params?.isAddBtnClicked) {
        path = AR1100ASCUSTINSERT;
        dat.asSno = "";
      } else {
        path = AR1100ASCUSTUPDATE;
        dat.asDateB = DateWithoutDash(dat.asDate);
      }
      dat.insertType = "0";
      dat.areaCode = params?.areaCode;
      dat.asDate = DateWithoutDash(dat.asDate);
      dat.asPdate = DateWithoutDash(dat.asPdate);
      dat.asPtime = DateWithoutDash(dat.asPtime);
      dat.asYdate = DateWithoutDash(dat.asYdate);

      dat.asSurikum = +removeCommas(dat.asSurikum, "number");
      dat.asMisukum = +removeCommas(dat.asMisukum, "number");
      dat.asInkum = +removeCommas(dat.asInkum, "number");
      dat.asDc = +removeCommas(dat.asDc, "number");

      if (dat.asInSwCode) {
        const asSwName = params?.asInSwCode?.find(
          (item: any) => item.code === dat.asInSwCode
        )?.codeName;
        dat.asSwName = asSwName;
      }

      const res = await apiPost(path, dat, "저장이 성공하였습니다");
      if (res) {
        dispatch(setAR1100Tab5AsCust({ loadStatus: true, source: "AR1100" }));
        setTimeout(() => {
          setModalOpen(false);
        }, 300);
      }
    }
  };

  const tableData2 = [
    {
      0: (
        <FormGroup>
          <Select register={register("asVatDiv")} width={InputSize.i120}>
            {params?.asVatDiv?.map((obj: any, idx: number) => (
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
            {params?.asInkumType?.map((obj: any, idx: number) => (
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
            {params?.asAcbCode?.map((obj: any, idx: number) => (
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
              className="blue"
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
              className="red"
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
              <LabelYellow>A/S 상태</LabelYellow>
              <FormGroup>
                <Select
                  register={register("saleState")}
                  style={{ width: "217px" }}
                >
                  {params?.saleState?.map((obj: any, idx: number) => (
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
                {params?.asInTel?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <FFormGroup>
              <SSpan style={{ width: "115px" }}>접수일자</SSpan>
              <SSpan style={{ width: "90px" }}>접수시간</SSpan>
              <SSpan style={{ width: "100px" }}>접수 사원</SSpan>
            </FFormGroup>
            <FormGroup>
              <Controller
                control={control}
                name="asDate"
                render={({ field }) => (
                  <CustomDatePicker {...field} style={{ margin: "0" }} />
                )}
              />
              <Select
                register={register("asInTime")}
                width={InputSize.i90}
                textAlign="center"
              >
                {timeData?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
              <Select register={register("asInSwCode")} width={InputSize.i100}>
                {params?.asInSwCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>

            {/* SMS_SEND_0 YN, SMS_SEND_0 DT  */}
            <WrapperInner>
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
            </WrapperInner>
            <FFormGroup>
              <SSpan style={{ width: "115px" }}>처리예정일</SSpan>
              <SSpan style={{ width: "90px" }}>예정시간</SSpan>
              <SSpan style={{ width: "100px" }}>처리 예정 사원</SSpan>
            </FFormGroup>
            <FormGroup>
              <Controller
                control={control}
                name="asPdate"
                render={({ field }) => (
                  <CustomDatePicker {...field} style={{ margin: "0" }} />
                )}
              />
              <Select
                register={register("asPtime")}
                width={InputSize.i90}
                textAlign="center"
              >
                {timeData?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
              <Select register={register("asPSwCode")} width={InputSize.i100}>
                {params?.asPSwCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
            {/* SMS_SEND_1 YN, SMS_SEND_1 DT  */}
            <WrapperInner>
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
            </WrapperInner>

            <FFormGroup>
              <SSpan style={{ width: "115px" }}>처리일자</SSpan>
              <SSpan style={{ width: "90px" }}>완료시간</SSpan>
              <SSpan style={{ width: "100px" }}>처리 사원</SSpan>
            </FFormGroup>

            <FormGroup>
              <Controller
                control={control}
                name="asYdate"
                render={({ field }) => (
                  <CustomDatePicker {...field} style={{ margin: "0" }} />
                )}
              />

              <Select
                register={register("asYtime")}
                width={InputSize.i90}
                textAlign="center"
              >
                {timeData?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>

              <Select register={register("asSwCode")} width={InputSize.i100}>
                {params?.asSwCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>

            {/* SMS_SEND_2 YN, SMS_SEND_2 DT  */}
            <WrapperInner>
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
            </WrapperInner>
          </div>
          <DDiv>
            <DDivInner>
              <LabelYellow style={{ width: "80px" }}>불류명</LabelYellow>

              <EditableSelect
                list={params?.asTagName}
                reset={reset}
                register={register("asTagName")}
                watch={watch("asTagName")}
                textAlign={"left"}
                style={{ width: "100%" }}
              />
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
