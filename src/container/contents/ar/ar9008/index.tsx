import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import CreateReport from "app/hook/createReport";
import { AR9008SEARCH } from "app/path";
import { SearchWrapper } from "../../commonStyle";
import { Select, FormGroup, Label } from "components/form/style";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import {
  MagnifyingGlass,
  ExcelIcon,
  ResetGray,
  PrintPreview,
  Print,
} from "components/allSvgIcon";
import CustomDatePicker from "components/customDatePicker";
import Loader from "components/loader";
import BasicGrid from "components/basicGrid";
import Viewer from "components/viewer";
import {
  DateWithoutDash,
  DateWithoutDashOnlyYearMonth,
} from "helpers/dateFormat";
import { ISEARCH } from "./model";
import { columns, fields } from "./data";
import CheckBox from "components/checkbox";

function AR9008({
  depthFullName,
  menuId,
  ownAreaCode,
}: {
  depthFullName: string;
  menuId: string;
  ownAreaCode: string;
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
  } = CreateReport("AR", "AR9008", menuId, AR9008SEARCH);

  const { register, handleSubmit, reset, control } = useForm<ISEARCH>({
    mode: "onSubmit",
  });

  useEffect(() => {
    if (dataCommonDic?.dataInit) {
      resetForm("reset");
    }
  }, [dataCommonDic]);

  const submit = (params: ISEARCH) => {
    params.sMonth = DateWithoutDashOnlyYearMonth(params.sMonth);
    fetchData(params);
  };

  const resetForm = (type: string) => {
    if (type === "reset") {
      const init = dataCommonDic.dataInit[0];

      reset({
        areaCode: dataCommonDic.areaCode[0].code,
        swCode: init?.swCode,
        cuJyCode: init?.cuJyCode,
        cuJangbu: init?.cuJangbu,
        cuCustgubun: init?.cuCustgubun,
        sMonth: init?.sMonth,
      });
    }
  };

  const handleReset = () => {
    if (dataCommonDic?.dataInit) {
      resetForm("reset");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)} autoComplete="off">
        <SearchWrapper className="h35 mt5">
          <FormGroup>
            {ownAreaCode === "00" && (
              <>
                <Label style={{ minWidth: "80px" }}>영업소</Label>
                <Select register={register("areaCode")} width={InputSize.i120}>
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
              />
            </div>
          </FormGroup>
          <p>{depthFullName}</p>
        </SearchWrapper>
        <SearchWrapper>
          <FormGroup>
            <Label style={{ minWidth: "80px" }}>년 - 월</Label>
            {/* <Select register={register("sMonth")} width={InputSize.i120}>
              {dataCommonDic?.sMonth?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select> */}
            <Controller
              control={control}
              {...register("sMonth")}
              render={({ field: { onChange, value, name } }) => (
                <CustomDatePicker
                  value={value}
                  onChange={onChange}
                  name={name}
                  showMonthYearPicker
                />
              )}
            />

            <Label style={{ minWidth: "80px" }}>담당사원</Label>
            <Select register={register("swCode")} width={InputSize.i120}>
              {dataCommonDic?.swCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <Label style={{ minWidth: "80px" }}>지역구분</Label>
            <Select register={register("cuJyCode")} width={InputSize.i120}>
              {dataCommonDic?.cuJyCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>

            <Label style={{ minWidth: "80px" }}>장부구분</Label>
            <Select register={register("cuJangbu")} width={InputSize.i120}>
              {dataCommonDic?.cuJangbu?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <Label style={{ minWidth: "80px" }}>관리책임자</Label>
            <Select register={register("cuCustgubun")} width={InputSize.i120}>
              {dataCommonDic?.cuCustgubun?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <CheckBox
              title="당월 매출/수금  조회"
              rtl
              style={{ marginLeft: "61px" }}
              register={register("chkGubun")}
            />
          </FormGroup>
        </SearchWrapper>
      </form>
      <BasicGrid
        areaCode={ownAreaCode}
        columns={columns}
        fields={fields}
        data={data}
        rowIndex={data?.length ? data.length : 0}
        style={{ height: "calc(100% - 52px)" }}
      />
    </>
  );
}

export default AR9008;
