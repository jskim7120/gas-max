import React, { useState, useEffect, useRef } from "react";
import CreateReport from "app/hook/createReport";
import { GR9006SEARCH } from "app/path";
import { ISEARCH } from "./model";
import { SearchWrapper } from "../../commonStyle";
import { useForm, Controller } from "react-hook-form";
import { MagnifyingGlass, ResetGray } from "components/allSvgIcon";
import { Select, FormGroup, Label } from "components/form/style";
import Loader from "components/loader";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import CustomDatePicker from "components/customDatePicker";
import BasicGrid from "components/basicGrid";
import { columns0, fields0 } from "./data/data0";
import { columns1, fields1 } from "./data/data1";
import { DateWithoutDash } from "helpers/dateFormat";

function GR9006({
  depthFullName,
  menuId,
  areaCode,
}: {
  depthFullName: string;
  menuId: string;
  areaCode: string;
}) {
  const {
    data,
    setData,
    selected,
    setSelected,
    loading,
    fetchData,
    dispatch,
    dataCommonDic,
  } = CreateReport("GR", "GR9006", menuId, GR9006SEARCH);
  const gridRef = useRef() as React.MutableRefObject<any>;

  const { register, handleSubmit, reset, control, watch } = useForm<ISEARCH>({
    mode: "onSubmit",
  });

  useEffect(() => {
    if (dataCommonDic?.initData) {
      resetForm("reset");
    }
  }, [dataCommonDic]);

  useEffect(() => {
    if (watch("reportType")) {
      setData([]);
    }
  }, [watch("reportType")]);

  const submit = (data: any) => {
    data.sDate = DateWithoutDash(data.sDate);
    data.eDate = DateWithoutDash(data.eDate);
    fetchData(data);
  };

  const resetForm = (type: any) => {
    if (type === "reset") {
      const init = dataCommonDic.initData[0];
      reset({
        areaCode: dataCommonDic?.areaCode[0]?.code,
        bcBuCode: init?.bcBuCode,
        reportType: init?.reportType,
        eDate: init?.eDate,
        sDate: init?.sDate,
      });
    }
  };

  const handleReset = () => {
    if (dataCommonDic?.initData) {
      resetForm("reset");
    }
    setData([]);
  };

  const selectColumns = () => {
    switch (watch("reportType")) {
      case "0":
        return { columns: columns0, fields: fields0 };
      case "1":
        return { columns: columns1, fields: fields1 };
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(submit)} autoComplete="off">
        <SearchWrapper className="h35 mt5">
          <FormGroup>
            {areaCode === "00" && (
              <>
                <Label style={{ minWidth: "80px" }}>재고입고처</Label>
                <Select register={register("areaCode")}>
                  {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </>
            )}
            <div className="buttons ml30">
              <Button
                text="검색"
                icon={!loading && <MagnifyingGlass />}
                color={ButtonColor.DANGER}
                type="submit"
                loader={
                  loading && (
                    <>
                      <Loader
                        color="white"
                        size={13}
                        borderWidth="2px"
                        style={{ marginRight: "10px" }}
                      />
                    </>
                  )
                }
                style={{ marginRight: "5px" }}
              />
              <Button
                text="취소"
                icon={<ResetGray />}
                type="button"
                color={ButtonColor.LIGHT}
                onClick={handleReset}
              />
            </div>
          </FormGroup>
          <p>{depthFullName}</p>
        </SearchWrapper>

        <SearchWrapper className="h35">
          <FormGroup>
            <Label style={{ minWidth: "80px" }}>보고서종류</Label>
            <Select register={register("reportType")} width={InputSize.i200}>
              {dataCommonDic?.reportType?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <Label style={{ minWidth: "90px" }}>매입처</Label>
            <Select register={register("bcBuCode")} width={InputSize.i150}>
              {dataCommonDic?.bcBuCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>

            <Label style={{ minWidth: "70px" }}>기간</Label>
            <Controller
              control={control}
              name="sDate"
              render={({ field }) => <CustomDatePicker {...field} />}
            />
            <Controller
              control={control}
              name="eDate"
              render={({ field }) => <CustomDatePicker {...field} />}
            />
          </FormGroup>
        </SearchWrapper>
      </form>

      <BasicGrid
        ref={gridRef}
        areaCode={areaCode}
        data={data}
        columns={selectColumns()?.columns}
        fields={selectColumns()?.fields}
        gridChangeField={watch("reportType")}
        menuId={menuId}
        rowIndex={data?.length > 1 ? data.length - 1 : 0}
        style={{ height: `calc(100% - 93px)` }}
      />
    </>
  );
}

export default GR9006;
