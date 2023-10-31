import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from "app/store";
import { apiGet } from "app/axios";
import { AR1100MISU } from "app/path";
import Button from "components/button/button";
import { ModalBlueHeader } from "components/modal/customModals/style";
import { Reset, WhiteClose, Update } from "components/allSvgIcon";
import { Input, Select, FormGroup, CustomForm } from "components/form/style";
import { ButtonColor, InputSize } from "components/componentsType";
import CustomDatePicker from "components/customDatePicker";
import { currencyMask, removeCommas } from "helpers/currency";
import Table from "components/table";
import { modalHeader1, modalHeader2 } from "../tableHeader";
import { AR1100MODELDETAIL, emtObjTab6 } from "../model";
import EditableSelect from "components/editableSelect";
import { InfoText } from "components/text";
import { LLabel, IInput, FFormGroup, TTSide, ArticleDiv } from "../style";
import Grid from "./grid";

function SukumModal1({
  setModalOpen,
  params,
}: {
  setModalOpen: Function;
  params: any;
}) {
  const { register, handleSubmit, reset, setFocus, control, watch, getValues } =
    useForm<AR1100MODELDETAIL>({
      mode: "onSubmit",
    });
  const [gridData, setGridData] = useState<Array<any>>([]);
  const dispatch = useDispatch();

  const { info } = useSelector((state: any) => state.footer);

  useEffect(() => {
    if (info?.cuCode && info?.areaCode) {
      fetchDataMisu();
    }
  }, [info]);

  useEffect(() => {
    if (params !== undefined) {
      // console.log("params 2 irev>>>>>", params);
      if (params?.detailData) {
        reset(params?.detailData);
      }
    }
  }, [params]);

  const fetchDataMisu = async () => {
    const response = await apiGet(AR1100MISU, {
      areaCode: info?.areaCode,
      cuCode: info?.cuCode,
      suGubun: "J",
    });

    if (response && response?.detailData) {
      setGridData(response?.detailData);
    } else {
      setGridData([]);
    }
  };

  const tableData1 = [
    {
      0: (
        <Controller
          control={control}
          name="gsDate"
          render={({ field }) => (
            <CustomDatePicker {...field} style={{ margin: "0" }} />
          )}
        />
      ),
      1: (
        <Controller
          control={control}
          name="gsDateUse"
          render={({ field }) => (
            <CustomDatePicker {...field} style={{ margin: "0" }} />
          )}
        />
      ),
      2: (
        <FormGroup>
          <Select register={register("misuType")} width={InputSize.i80}>
            {params?.misuType?.map((obj: any, idx: number) => (
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
          name="gsInkum"
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
          name="gsInkum"
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
          name="gsDc"
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
    },
  ];
  const tableData2 = [
    {
      8: (
        <Controller
          control={control}
          name="gsInkumtype"
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
          <Select register={register("acbCode")} width={InputSize.i150}>
            {params?.acbcode?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
      ),
      10: (
        <EditableSelect
          list={params?.asIn}
          reset={reset}
          register={register("gsBigo")}
          watch={watch("gsBigo")}
          textAlign={"left"}
          style={{ width: "200px" }}
        />
      ),
      11: (
        <Controller
          control={control}
          name="gsSwCode"
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
          <FormGroup
            style={{
              marginTop: "3px",
              gap: "5px",
              width: "100%",
            }}
          >
            <TTSide>미납&nbsp;&nbsp;&nbsp;내역</TTSide>
            <Grid data={gridData} style={{ width: "100%", height: "218px" }} />
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
                tableHeader={modalHeader1}
                tableData={tableData1}
              />
              <Table
                className="no-space"
                tableHeader={modalHeader2}
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
    </>
  );
}

export default SukumModal1;
