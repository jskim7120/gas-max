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
import Grid from "./grid";
import {
  ModalBody,
  TabModalFooter,
  TabModalHeadWrap,
  LLabel,
  IInput,
  FFormGroup,
  TTSide,
  ArticleDiv,
} from "../../style";

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

  const { info, source } = useSelector((state: any) => state.footer);

  useEffect(() => {
    if (source === "AR1100" && info?.cuCode && info?.areaCode) {
      fetchDataMisu();
    }
  }, [info]);

  useEffect(() => {
    if (Object.keys(params)?.length > 0) {
      if (params?.detailData) {
        reset(params?.detailData);
      }
    }
  }, [params]);

  const fetchDataMisu = async () => {
    const response = await apiGet(AR1100MISU, {
      areaCode: info?.areaCode,
      cuCode: info?.cuCode,
      misuCode: "J",
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
            <CustomDatePicker {...field} style={{ width: "110px" }} />
          )}
        />
      ),
      1: (
        <Controller
          control={control}
          name="gsDateUse"
          render={({ field }) => (
            <CustomDatePicker {...field} style={{ width: "110px" }} />
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
              inputSize={InputSize.i110}
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
              inputSize={InputSize.i110}
              textAlign="right"
              mask={currencyMask}
            />
          )}
        />
      ),
      5: (
        <Controller
          control={control}
          name="test"
          render={({ field }) => (
            <Input
              {...field}
              inputSize={InputSize.i110}
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
              inputSize={InputSize.i110}
              textAlign="right"
              mask={currencyMask}
            />
          )}
        />
      ),
      7: (
        <Controller
          control={control}
          name="test2"
          render={({ field }) => (
            <Input
              {...field}
              inputSize={InputSize.i130}
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
        <FormGroup>
          <Select register={register("gsInkumtype")} width={InputSize.i110}>
            {params?.gsInkumtype?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
      ),
      9: (
        <FormGroup>
          <Select register={register("acbCode")} width={InputSize.i290}>
            {params?.acbCode?.map((obj: any, idx: number) => (
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
          style={{ width: "388px" }}
        />
      ),
      11: (
        <FormGroup>
          <Select register={register("gsSwCode")} width={InputSize.i110}>
            {params?.gsSwCode?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
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
        <TabModalHeadWrap>
          <FFormGroup>
            <LLabel>거래구분</LLabel>
            <IInput
              readOnly
              value={info?.cuTypeName}
              style={{ width: "80px" }}
            />
          </FFormGroup>
          <FFormGroup>
            <LLabel>거래처 코드</LLabel>
            <IInput readOnly value={info?.cuCode} />
          </FFormGroup>
          <FFormGroup>
            <LLabel>거래처명</LLabel>
            <IInput readOnly value={info?.cuName} />
          </FFormGroup>
        </TabModalHeadWrap>

        {/* Content */}
        <ModalBody>
          <FormGroup
            style={{
              marginTop: "3px",
              gap: "5px",
              width: "100%",
            }}
          >
            <TTSide style={{ height: "350px" }}>
              미납&nbsp;&nbsp;&nbsp;내역
            </TTSide>
            <Grid
              data={gridData}
              style={{
                width: "100%",
                height: "350px",
                border: "1px solid #a6a6a6",
              }}
            />
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
                style={{ marginBottom: "3px" }}
              />
              <Table
                className="no-space"
                tableHeader={modalHeader2}
                tableData={tableData2}
              />
            </ArticleDiv>
          </FormGroup>
        </ModalBody>

        {/* Footer */}
        <TabModalFooter>
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
        </TabModalFooter>
      </div>
    </>
  );
}

export default SukumModal1;
