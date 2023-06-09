import React, { useState, useEffect } from "react";
import CreateReport from "app/hook/createReport";
import { GR9006SEARCH } from "app/path";
import { ISEARCH } from "./model";
import { SearchWrapper, WrapperContent } from "../../commonStyle";
import { useForm, Controller } from "react-hook-form";
import { MagnifyingGlass, ResetGray } from "components/allSvgIcon";
import { Select, FormGroup, Label } from "components/form/style";
import Loader from "components/loader";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import CustomDatePicker from "components/customDatePicker";
import Grid from "components/grid";
import { columns1, fields1 } from "./data/data1";

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

  const { register, handleSubmit, reset, control, watch } = useForm<ISEARCH>({
    mode: "onSubmit",
  });

  useEffect(() => {
    resetForm();
  }, [dataCommonDic]);

  const submit = (data: ISEARCH) => {
    fetchData(data);
  };

  // useEffect(() => {
  //   if (watch("reportKind")) {
  //     setData([]);
  //   }
  // }, [watch("reportKind")]);

  const resetForm = () => {
    if (dataCommonDic !== undefined) {
      console.log(dataCommonDic);
      reset({
        areaCode: dataCommonDic?.areaCode[0]?.code,
        bcBuCode: dataCommonDic?.bcBuCode[0]?.code,
        reportType: dataCommonDic?.reportType[0]?.code,
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
            <Label style={{ minWidth: "80px" }}>매입처</Label>
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
              render={({ field: { onChange, value, name } }) => (
                <CustomDatePicker
                  value={value}
                  onChange={onChange}
                  name={name}
                />
              )}
            />
            <Controller
              control={control}
              {...register("eDate")}
              render={({ field: { onChange, value, name } }) => (
                <CustomDatePicker
                  value={value}
                  onChange={onChange}
                  name={name}
                />
              )}
            />
          </FormGroup>
        </SearchWrapper>
      </form>
      <WrapperContent>
        <Grid
          areaCode={areaCode}
          data={data}
          columns={columns1}
          fields={fields1}
          menuId={menuId}
          rowIndex={data?.length > 1 ? data.length - 1 : 0}
          setSelected={setSelected}
          style={{ height: `calc(100% - 47px)` }}
          evenFill
        />
      </WrapperContent>
    </>
  );
}

export default GR9006;
