import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "app/store";
import API from "app/axios";
import Button from "components/button/button";
import { ButtonColor, ButtonType, InputSize } from "components/componentsType";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import {
  Update,
  Reset,
  WhiteClose,
  MagnifyingGlassBig,
} from "components/allSvgIcon";
import Grid from "components/grid";
import Form from "./form";
import { closeModal } from "app/state/modal/modalSlice";
import { Select, FormGroup, Label, Input } from "components/form/style";
import { PT1105SEARCH } from "app/path";
import { IPT1105 } from "./model";
import styled from "styled-components";
import { SearchWrapper } from "container/contents/commonStyle";
import { columns, fields } from "./data";
const ModalWrapper = styled.div`
  width: 1000px;
  height: 610px;
  height: auto;
  background: #fff;
`;
function FormIP1105() {
  const [loading, setLoading] = useState(false);
  const areaCode = useSelector((state) => state.auth.areaCode);
  const ptAreaCode = useSelector((state) => state.modal.pt1105.areaCode);
  const ptScuCode = useSelector((state) => state.modal.pt1105.cuCode);
  const ptScuName = useSelector((state) => state.modal.pt1105.cuName);
  const ptCuJmisu = useSelector((state) => state.modal.pt1105.cuJmisu);
  const [data, setData] = useState<any>([]);
  const [selected, setSelected] = useState<any>({});
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  const { register, handleSubmit, reset, getValues } = useForm<IPT1105>();
  const [totalGuAmount, setTotalGuAmount] = useState(0);

  const dispatch = useDispatch();

  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "PT",
    functionName: "PT1105",
  });

  useEffect(() => {
    firstFetchData();
  }, []);

  useEffect(() => {
    if (ptScuCode && ptScuName) {
      resetForm();
    }
  }, []);

  const resetForm = () => {
    reset({
      sCuCode: ptScuCode,
      sCuName: ptScuName,
    });
  };

  const calc = (i: number, s: string) => {
    if (i !== undefined && s !== undefined) {
      if (s === "Y") {
        setTotalGuAmount((prev) => prev + data[i].mjMisujan);
      } else if (s === "N") {
        setTotalGuAmount((prev) => prev - data[i].mjMisujan);
      } else {
        setTotalGuAmount((prev) => prev - 0);
      }
    }
  };

  const fetchSearchData = async (params: any) => {
    try {
      setLoading(true);
      const { data } = await API.get(PT1105SEARCH, {
        params: { sCuCode: params.sCuCode, areaCode: ptAreaCode },
      });

      if (data) {
        setData(data);
        setLoading(false);
        setSelected(data[0]);
        setSelectedRowIndex(0);
      }
    } catch (err) {
      console.log("PT1105 data search fetch error =======>", err);
    }
  };
  const firstFetchData = async () => {
    try {
      setLoading(true);
      const { data } = await API.get(PT1105SEARCH, {
        params: { sCuCode: ptScuCode, areaCode: ptAreaCode },
      });

      if (data) {
        setData(data);
        setLoading(false);
        setSelected(data[0]);
        setSelectedRowIndex(0);
      }
    } catch (err) {
      console.log("PT1105 data search fetch error =======>", err);
    }
  };

  const onSearchSubmit = async (data: any, para: any) => {
    if (ptScuCode) {
      fetchSearchData(data);
    }
  };
  return (
    <ModalWrapper>
      <form onSubmit={handleSubmit(onSearchSubmit)}>
        <SearchWrapper
          style={{
            background: "#0B97F6",
            height: "40px",
            borderBottom: "none",
          }}
        >
          <FormGroup style={{ gap: "3px" }}>
            <Input
              label="거래처"
              register={register("sCuName")}
              //   kind={FieldKind.BORDER}
              textAlign="left"
              labelStyle={{
                minWidth: "60px",
              }}
            />
            <Button
              // text="검색"
              icon={<MagnifyingGlassBig />}
              kind={ButtonType.SQUARE_SMALL}
              type="submit"
              style={{
                background: "#666666",
                borderRadius: "5px",
                border: "none",
                height: "30px",
                width: "35px",
              }}
            />
            <Input
              register={register("sCuCode")}
              textAlign="left"
              inputSize={InputSize.i120}
            />
          </FormGroup>
          <div className="buttons">
            <Button
              text="저장"
              icon={<Update />}
              style={{ marginRight: "5px" }}
              color={ButtonColor.SECONDARY}
              onClick={() => formRef.current.crud(null)}
              type="button"
            />
            <Button
              text="취소"
              style={{ marginRight: "5px" }}
              icon={<Reset />}
              type="button"
              onClick={() => {
                formRef.current.setIsAddBtnClicked(false);
                formRef.current.resetForm("reset");
              }}
            />
            <span
              style={{ marginLeft: "10px", marginTop: "1px" }}
              onClick={() => {
                dispatch(closeModal());
              }}
            >
              <WhiteClose />
            </span>
          </div>
        </SearchWrapper>

        <div style={{ display: "flex", width: "100%" }}>
          <Grid
            areaCode={areaCode}
            data={data}
            fields={fields}
            columns={columns}
            setSelected={setSelected}
            selectedRowIndex={selectedRowIndex}
            setSelectedRowIndex={setSelectedRowIndex}
            style={{
              height: "600px",
              width: "90%",
              borderRight: "1px solid #000",
              margin: "8px",
              padding: "5px",
            }}
            isEditable={false}
            calc={calc}
            isSortable={false}
          />
          <Form
            selected={selected}
            ref={formRef}
            setData={setData}
            selectedRowIndex={selectedRowIndex}
            setSelectedRowIndex={setSelectedRowIndex}
            setSelected={setSelected}
            dataCommonDic={dataCommonDic}
            guCheckAMount={totalGuAmount}
            cuJmisu={ptCuJmisu}
          />
        </div>
      </form>
    </ModalWrapper>
  );
}

export default FormIP1105;