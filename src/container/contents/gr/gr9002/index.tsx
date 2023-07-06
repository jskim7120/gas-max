import React, { useState, useEffect, useRef } from "react";
import CreateReport from "app/hook/createReport";
import { GR9002SEARCH } from "app/path";
import { ISEARCH } from "./model";
import { WrapperContent, SearchWrapper } from "../../commonStyle";
import { useForm, Controller } from "react-hook-form";
import { MagnifyingGlass, ResetGray } from "components/allSvgIcon";
import { Select, FormGroup, Label } from "components/form/style";
import { DateWithoutDash } from "helpers/dateFormat";
import Loader from "components/loader";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import CustomDatePicker from "components/customDatePicker";
import { columns, fields, layout } from "./data";
import BasicGrid from "components/basicGrid";

function GR9002({
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
  } = CreateReport("GR", "GR9002", menuId, GR9002SEARCH);
  const gridRef = useRef() as React.MutableRefObject<any>;

  const { register, handleSubmit, reset, getValues, control } =
    useForm<ISEARCH>({
      mode: "onSubmit",
    });

  useEffect(() => {
    resetForm();
  }, [dataCommonDic]);

  const submit = (data: ISEARCH) => {
    data.sDate = DateWithoutDash(data.sDate);
    data.eDate = DateWithoutDash(data.eDate);
    fetchData(data);
  };

  const resetForm = () => {
    if (dataCommonDic !== undefined) {
      reset({
        areaCode: dataCommonDic?.areaCode[0]?.code,
        bcBuCode: dataCommonDic?.bcBuCode[0]?.code,
        bcCsawon: dataCommonDic?.bcCsawon[0]?.code,
        bcCtype: dataCommonDic?.bcCtype[0]?.code,
        eDate: dataCommonDic?.eDate[0]?.code,
        sDate: dataCommonDic?.sDate[0]?.code,
      });
    }
  };

  const handleReset = () => {
    resetForm();
    setData([]);
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)} autoComplete="off">
        <SearchWrapper className="h35 mt5">
          <FormGroup>
            {areaCode === "00" && (
              <>
                <Label style={{ minWidth: "48px" }}>재고입고처</Label>
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
            <Label style={{ minWidth: "76px" }}>충전소</Label>
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
              {...register("sDate")}
              render={({ field: { onChange, value } }) => (
                <CustomDatePicker value={value} onChange={onChange} />
              )}
            />
            <Controller
              control={control}
              {...register("eDate")}
              render={({ field: { onChange, value } }) => (
                <CustomDatePicker value={value} onChange={onChange} />
              )}
            />

            <Label style={{ minWidth: "80px" }}>수송 기사</Label>
            <Select register={register("bcCsawon")} width={InputSize.i110}>
              {dataCommonDic?.bcCsawon?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>

            <Label style={{ minWidth: "80px" }}>수송 방법</Label>
            <Select register={register("bcCtype")} width={InputSize.i110}>
              {dataCommonDic?.bcCtype?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
        </SearchWrapper>
      </form>
      <WrapperContent>
        <BasicGrid
          ref={gridRef}
          areaCode={areaCode}
          data={data}
          columns={columns}
          fields={fields}
          menuId={menuId}
          rowIndex={data?.length > 1 ? data.length - 1 : 0}
          style={{ height: `calc(100% - 47px)` }}
          // evenFill
          layout={layout}
        />
      </WrapperContent>
    </>
  );
}

export default GR9002;
