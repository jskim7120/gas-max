import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from "app/store";
import { apiGet } from "app/axios";
import Button from "components/button/button";
import { addBupumTick } from "app/state/modal/modalSlice";
import { ModalBlueHeader } from "components/modal/customModals/style";
import { Reset, WhiteClose, Update } from "components/allSvgIcon";
import styled from "styled-components";
import { Input, Select, FormGroup, CustomForm } from "components/form/style";
import { ButtonColor, InputSize } from "components/componentsType";
import { AR1100ASCUSTINSERT, AR1100ASCUSTUPDATE, AR1100SELECT } from "app/path";
import CustomDatePicker from "components/customDatePicker";
import { currencyMask, removeCommas } from "helpers/currency";
import Table from "components/table";
import { modalGubunHeader1, modalGubunHeader2 } from "./tableHeader";
import { AR1100MODELDETAIL, emtObjTab6 } from "./model";
import EditableSelect from "components/editableSelect";
import { BorderRight } from "container/contents/cm/cm1300/style";
import { InfoText } from "components/text";

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

const TTSide = styled.div`
  height: 275px;
  background: #d0d2e5;
  width: 30px;
  display: flex;
  align-items: center;
  text-align: center;
  border: 1px solid #a6a6a6;
  border-radius: 3px;
  writing-mode: vertical-lr;
  justify-content: center;
`;
const ArticleDiv = styled.div`
  border: 1px solid #a6a6a6;
  padding: 10px 20px;
  border-radius: 3px;
`;

function GubunModal({ setModalOpen }: { setModalOpen: Function }) {
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

  const fetchData65 = async (params: any) => {
    const res = await apiGet(AR1100SELECT, params);
    if (res && Object.keys(res)?.length > 0) {
      reset(res?.detailData[0]);
      setData(res?.detailData ? res?.detailData[0] : {});
      setGridData(
        res?.gridData ? [...res?.gridData, emtObjTab6] : [emtObjTab6]
      );

      setDictionary({
        bgAcbCode: res?.bgAcbCode,
        bgInkumType: res?.bgInkumType,
        bgSwCode: res?.bgSwCode,
        bgVatDiv: res?.bgVatDiv,
        saleState: res?.saleState,
      });
    } else {
      reset(emtObjTab6);
      setData([]);
      setGridData([emtObjTab6]);
      setDictionary({});
    }
  };

  const handleChoose = (obj: any) => {
    dispatch(addBupumTick(obj));
    setModalOpen(false);
  };

  const tableData1 = [
    {
      0: (
        <Controller
          control={control}
          name="suDate"
          render={({ field }) => (
            <CustomDatePicker {...field} style={{ margin: "0" }} />
          )}
        />
      ),
      1: (
        <Controller
          control={control}
          name="ikDate"
          render={({ field }) => (
            <CustomDatePicker {...field} style={{ margin: "0" }} />
          )}
        />
      ),
      2: (
        <FormGroup>
          <Select register={register("suGubun")} width={InputSize.i80}>
            {dictionary?.suGubun?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
      ),
      3: (
        <Controller
          control={control}
          name="misu"
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
      4: (
        <Controller
          control={control}
          name="suKumack"
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
      5: (
        <Controller
          control={control}
          name="suKumack"
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
      6: (
        <Controller
          control={control}
          name="suDc"
          render={({ field }) => (
            <Input
              {...field}
              inputSize={InputSize.i90}
              textAlign="right"
              mask={currencyMask}
            />
          )}
        />
      ),
      7: (
        <Controller
          control={control}
          name="suAfmisu"
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
  const tableData2 = [
    {
      8: (
        <Controller
          control={control}
          name="suKumtype"
          render={({ field }) => (
            <Input
              {...field}
              inputSize={InputSize.i120}
              textAlign="center"
              mask={currencyMask}
            />
          )}
        />
      ),
      9: (
        <FormGroup>
          <Select register={register("suAcbcode")} width={InputSize.i150}>
            {dictionary?.suAcbcode?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
      ),
      10: (
        <EditableSelect
          list={dictionary?.asIn}
          reset={reset}
          register={register("suBigo")}
          watch={watch("suBigo")}
          textAlign={"left"}
          style={{ width: "200px" }}
        />
      ),
      11: (
        <Controller
          control={control}
          name="suSwCode"
          render={({ field }) => (
            <Input
              {...field}
              inputSize={InputSize.i140}
              textAlign="center"
              mask={currencyMask}
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
        <FormGroup>[ 중량미수 ] 선택수금처리</FormGroup>
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
        {/* Header */}
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

        {/* Content */}
        <div style={{ margin: "5px 0" }}>
          <FormGroup style={{ marginTop: "3px", gap: "5px" }}>
            <TTSide>미납&nbsp;&nbsp;&nbsp;내역</TTSide>
            <div>1</div>
          </FormGroup>
          <FormGroup style={{ marginTop: "3px", gap: "5px" }}>
            <TTSide
              style={{
                height: "159px",
                background: "#eab2e2",
              }}
            >
              수납 정보
            </TTSide>
            {/* Table */}
            <ArticleDiv>
              <Table
                className="no-space"
                tableHeader={modalGubunHeader1}
                tableData={tableData1}
              />
              <Table
                className="no-space"
                tableHeader={modalGubunHeader2}
                tableData={tableData2}
                style={{ marginTop: "3px" }}
              />
            </ArticleDiv>
          </FormGroup>
        </div>

        {/* Footer */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
            alignItems: "center",
            background: "#b9b9b9",
            padding: "10px",
          }}
        >
          <div style={{ color: "#359395" }}>
            <InfoText text="선택된 미수자료를 선입선출 방법을 수납처리 합니다." />
          </div>
          <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <Button
              text="저장"
              icon={<Update />}
              color={ButtonColor.SECONDARY}
              type="submit"
              style={{ padding: "18px 16px" }}
            />
            <Button
              text="취소"
              icon={<Reset />}
              type="button"
              onClick={() => {
                setModalOpen(false);
              }}
              style={{ padding: "18px 16px" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default GubunModal;
