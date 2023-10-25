import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from "app/store";
import { apiGet } from "app/axios";
import Button from "components/button/button";
import { addBupumTick } from "app/state/modal/modalSlice";
import { ModalBlueHeader } from "components/modal/customModals/style";
import {
  Reset,
  TickInCircle,
  WhiteClose,
  Sms_Send,
} from "components/allSvgIcon";
import styled from "styled-components";
import { Input, Select, FormGroup, CustomForm } from "components/form/style";
import { ButtonColor, InputSize } from "components/componentsType";
import { AR1100MODELDETAIL, emtObjTab5 } from "./model";
import { AR1100ASCUSTINSERT, AR1100ASCUSTUPDATE, AR1100SELECT } from "app/path";
import CustomDatePicker from "components/customDatePicker";
import { currencyMask, removeCommas } from "helpers/currency";
import Table from "components/table";
import { modalTableHeader } from "./tableHeader";

const LLabel = styled.label`
  background: rgba(104, 103, 103, 0.35);
  width: 80px;
  font-size: 14px;
  text-align: right;
  padding: 2px 10px 0 0;
`;
const IInput = styled.input`
  border: 1px solid #bbbbbb;
  outline: none;
  padding: 0 5px;
`;

const FFormGroup = styled.div`
  height: 25px;
  display: flex;
  margin-right: 3px;
`;
const SSpan = styled.span`
  width: 94px;
  height: 28px;
  border-radius: 3px;
  font-size: 13px;
  background: #cacaca;
  border: 1px solid #a6a6a6;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 3px;
`;
const DDiv = styled.div`
  width: 100%;
`;
const DDivInner = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 12px;
`;
const DDivTh = styled.div`
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  font-size: 13px;
  background: #cacaca;
  border: 1px solid #a6a6a6;
  margin: 3px;
`;

function AsModal({ setModalOpen }: { setModalOpen: Function }) {
  const paramState = useSelector((state) => state.modal.ar1100Tab5Params);
  const data71State = useSelector((state) => state.modal.ar1100Tab4Data71);

  const { register, handleSubmit, reset, setFocus, control, watch, getValues } =
    useForm<AR1100MODELDETAIL>({
      mode: "onSubmit",
    });

  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [dictionary, setDictionary] = useState<any>({});
  const [data, setData] = useState<any[]>();
  const [selected, setSelected] = useState<number>(0);
  const state: any = useSelector((state) => state.modal.bupum);
  const [gridData, setGridData] = useState<Array<any>>([]);

  useEffect(() => {
    if (paramState?.isAddBtnClicked !== undefined) {
      if (paramState?.isAddBtnClicked === false) {
        fetchData65({
          ...paramState,
        });
      }
      if (paramState?.isAddBtnClicked === true) {
        reset(data71State.detailData[0]);
        setData(data71State.detailData[0]);
        setGridData([emtObjTab5]);
        setDictionary({
          bgAcbCode: data71State?.bgAcbCode,
          bgInkumType: data71State?.bgInkumType,
          bgSwCode: data71State?.bgSwCode,
          bgVatDiv: data71State?.bgVatDiv,
          saleState: data71State?.saleState,
        });
      }
    }
  }, [paramState]);

  const fetchData65 = async (params: any) => {
    const res = await apiGet(AR1100SELECT, params);
    if (res && Object.keys(res)?.length > 0) {
      reset(res?.detailData[0]);
      setData(res?.detailData ? res?.detailData[0] : {});
      setGridData(
        res?.gridData ? [...res?.gridData, emtObjTab5] : [emtObjTab5]
      );

      setDictionary({
        bgAcbCode: res?.bgAcbCode,
        bgInkumType: res?.bgInkumType,
        bgSwCode: res?.bgSwCode,
        bgVatDiv: res?.bgVatDiv,
        saleState: res?.saleState,
      });
    } else {
      reset(emtObjTab5);
      setData([]);
      setGridData([emtObjTab5]);
      setDictionary({});
    }
  };

  // useEffect(() => {
  //   if (state?.areaCode && state?.pjType) {
  //     fetchData();
  //   }
  // }, []);

  // const fetchData = async () => {
  //   const response = await apiGet(AR1100BUPUMSEARCH, {
  //     areaCode: state?.areaCode,
  //     bpCode: state?.bpCode ? state?.bpCode : "",
  //     bpName: state?.bpName ? state?.bpName : "",
  //     bpSearch: state?.bpSearch ? state?.bpSearch : "",
  //     pjType: state?.pjType,
  //   });

  //   if (response) {
  //     setData(response);
  //   } else {
  //     setData([]);
  //   }
  // };

  const handleChoose = (obj: any) => {
    dispatch(addBupumTick(obj));
    setModalOpen(false);
  };

  const tableData2 = [
    {
      0: (
        <FormGroup>
          <Select register={register("asVatDiv")} width={InputSize.i120}>
            {dictionary?.asVatDiv?.map((obj: any, idx: number) => (
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
            {dictionary?.asInkumType?.map((obj: any, idx: number) => (
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
            {dictionary?.acbCode?.map((obj: any, idx: number) => (
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
    <>
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
            <div style={{ display: "flex", gap: "15", alignItems: "center" }}>
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
                  {dictionary?.saleState?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>
            </div>
            <div style={{ display: "flex", gap: "15", alignItems: "center" }}>
              <SSpan>전화번호</SSpan>
              <FormGroup>
                <Select
                  register={register("asInTel")}
                  style={{ width: "217px" }}
                >
                  {dictionary?.asInTel?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>
            </div>
            <div style={{ display: "flex", gap: "15", alignItems: "center" }}>
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
                <Controller
                  control={control}
                  name="asInSwCode"
                  render={({ field }) => (
                    <Input
                      {...field}
                      inputSize={InputSize.i100}
                      textAlign="right"
                    />
                  )}
                />
              </div>
            </div>
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

            <div style={{ display: "flex", gap: "15", alignItems: "center" }}>
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
                <SSpan style={{ width: "90px" }}>에정시간</SSpan>
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
                    register={register("asPSwName")}
                    width={InputSize.i100}
                  >
                    {dictionary?.asPSwName?.map((obj: any, idx: number) => (
                      <option key={idx} value={obj.code}>
                        {obj.codeName}
                      </option>
                    ))}
                  </Select>
                </FormGroup>
              </div>
            </div>
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
                <SSpan style={{ width: "90px" }}>에정시간</SSpan>
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
                    register={register("asSwName")}
                    width={InputSize.i100}
                  >
                    {dictionary?.asSwName?.map((obj: any, idx: number) => (
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
                  register={register("saleState")}
                  style={{ width: "100%" }}
                >
                  {dictionary?.saleState?.map((obj: any, idx: number) => (
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
            justifyContent: "end",
            gap: "10px",
            background: "#b9b9b9",
            padding: "10px",
          }}
        >
          <Button
            text="선택"
            icon={<TickInCircle />}
            type="button"
            color={ButtonColor.SUCCESS}
            onClick={(e) => data && handleChoose(data[selected])}
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
    </>
  );
}

export default AsModal;
