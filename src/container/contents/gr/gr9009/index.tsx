import { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import getSimpleData from "app/hook/getSimpleData";
import { GR9009SEARCH } from "app/path";
import { IGR9009SEARCH } from "./model";
import { SearchWrapper } from "../../commonStyle";
import {
  MagnifyingGlassBig,
  ExcelIcon,
  ResetGray,
} from "components/allSvgIcon";
import { Select, FormGroup, Label, Field } from "components/form/style";
import Loader from "components/loader";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import CustomDatePicker from "components/customDatePicker";
import BasicGrid from "components/basicGrid";
import { columns, fields } from "./data";

function GR9009({
  depthFullName,
  menuId,
  ownAreaCode,
}: {
  depthFullName: string;
  menuId: string;
  ownAreaCode: string;
}) {
  const { data, setData, loading, fetchData, dataCommonDic } = getSimpleData(
    "GR",
    "GR9009",
    GR9009SEARCH
  );
  const gridRef = useRef() as React.MutableRefObject<any>;

  const { register, handleSubmit, reset, control } = useForm<IGR9009SEARCH>({
    mode: "onSubmit",
  });

  useEffect(() => {
    if (dataCommonDic?.initData) {
      resetForm("reset");
    }
  }, [dataCommonDic]);

  const submit = (data: IGR9009SEARCH) => {
    fetchData(data);
  };

  const resetForm = (type: any) => {
    if (type === "reset") {
      const init = dataCommonDic.initData[0];
      reset({
        areaCode: dataCommonDic?.areaCode[0].code,
        ...init,
      });
    }
  };

  const handleReset = () => {
    if (dataCommonDic?.initData) {
      resetForm("reset");
    }
    setData([]);
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)} autoComplete="off">
        <SearchWrapper className="h35">
          <FormGroup>
            {ownAreaCode === "00" && (
              <>
                <Label style={{ minWidth: "60px" }}>영업소</Label>

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
                icon={!loading && <MagnifyingGlassBig width="15" />}
                color={ButtonColor.DANGER}
                type="submit"
                loader={
                  loading && (
                    <Loader
                      size={16}
                      style={{
                        marginRight: "12px",
                      }}
                    />
                  )
                }
              />
              <Button
                text="취소"
                icon={<ResetGray />}
                type="button"
                color={ButtonColor.LIGHT}
                onClick={handleReset}
              />
              <Button
                text="엑셀"
                icon={<ExcelIcon width="19px" height="19px" />}
                color={ButtonColor.LIGHT}
                type="button"
                onClick={() => gridRef.current.saveToExcel()}
              />
            </div>
          </FormGroup>
          <p>{depthFullName}</p>
        </SearchWrapper>

        <SearchWrapper className="h35">
          <FormGroup>
            <Label style={{ minWidth: "60px" }}>매입처</Label>
            <Select width={InputSize.i130} register={register("bcBuCode")}>
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
              render={({ field }) => (
                <CustomDatePicker {...field} showMonthYearPicker />
              )}
            />
            <Controller
              control={control}
              name="eDate"
              render={({ field }) => (
                <CustomDatePicker {...field} showMonthYearPicker />
              )}
            />
          </FormGroup>
        </SearchWrapper>
      </form>

      <BasicGrid
        ref={gridRef}
        areaCode={ownAreaCode}
        data={data}
        columns={columns}
        fields={fields}
        menuId={menuId}
        rowIndex={data?.length > 1 ? data.length - 1 : 0}
        style={{ height: `calc(100% - 93px)` }}
      />
    </>
  );
}

export default GR9009;
