import { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import CreateReport from "app/hook/createReport";
import { GR9008SEARCH } from "app/path";
import { ISEARCH } from "./model";
import { SearchWrapper, WrapperContent } from "../../commonStyle";
import { MagnifyingGlass, ResetGray } from "components/allSvgIcon";
import { Select, FormGroup, Label } from "components/form/style";
import Loader from "components/loader";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import CustomDatePicker from "components/customDatePicker";
import BasicGrid from "components/basicGrid";
import { columns, fields } from "./data";
import { DateWithoutDash } from "helpers/dateFormat";

function GR9008({
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
  } = CreateReport("GR", "GR9008", menuId, GR9008SEARCH);
  const gridRef = useRef() as React.MutableRefObject<any>;

  const { register, handleSubmit, reset, control } = useForm<ISEARCH>({
    mode: "onSubmit",
  });

  useEffect(() => {
    if (dataCommonDic?.initData) {
      resetForm("reset");
    }
  }, [dataCommonDic]);

  const submit = (data: ISEARCH) => {
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

  return (
    <>
      <form onSubmit={handleSubmit(submit)} autoComplete="off">
        <SearchWrapper className="h35 mt5">
          <FormGroup>
            {areaCode === "00" && (
              <>
                <Label style={{ minWidth: "48px" }}>영업소</Label>

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
            <Label style={{ minWidth: "auto" }}>매입처</Label>
            <Select register={register("bcBuCode")} width={InputSize.i150}>
              {dataCommonDic?.bcBuCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>

            <Label style={{ minWidth: "60px" }}>기간</Label>
            <Controller
              control={control}
              {...register("sDate")}
              render={({ field: { onChange, value, name } }) => (
                <CustomDatePicker
                  value={value}
                  onChange={onChange}
                  name={name}
                  showMonthYearPicker
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
                  showMonthYearPicker
                />
              )}
            />
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
          evenFill
        />
      </WrapperContent>
    </>
  );
}

export default GR9008;
