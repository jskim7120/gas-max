import { useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import CreateReport from "app/hook/createReport";
import { CM9003SEARCH } from "app/path";
import { ISEARCH } from "./model";
import Loader from "components/loader";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import CustomDatePicker from "components/customDatePicker";
import BasicGrid from "components/basicGrid";
import { MagnifyingGlass, ExcelIcon, ResetGray } from "components/allSvgIcon";
import { SearchWrapper, WrapperContent } from "../../commonStyle";
import { Select, FormGroup, Wrapper, Label } from "components/form/style";
import { columns0, fields0 } from "./data/data0";
import { columns1, fields1 } from "./data/data1";
import { columns2, fields2 } from "./data/data2";
import { columns3, fields3 } from "./data/data3";
import { columns4, fields4 } from "./data/data4";
import { columns5, fields5 } from "./data/data5";
import { columns6, fields6 } from "./data/data6";
import setFooterDetail from "container/contents/footer/footerDetailFunc";
import { DateWithoutDash } from "helpers/dateFormat";

function CM9003({
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
  } = CreateReport("CM", "CM9003", menuId, CM9003SEARCH);
  const gridRef = useRef() as React.MutableRefObject<any>;

  const { register, handleSubmit, reset, control, watch } = useForm<ISEARCH>({
    mode: "onSubmit",
  });

  useEffect(() => {
    if (selected && Object.keys(selected)?.length > 0) {
      setFooterDetail(selected.areaCode, selected.cuCode, dispatch);
    }
  }, [selected]);

  useEffect(() => {
    resetForm();
  }, [dataCommonDic]);

  useEffect(() => {
    if (watch("reportKind")) {
      setData([]);
    }
  }, [watch("reportKind")]);

  const submit = (data: ISEARCH) => {
    data.sDate = DateWithoutDash(data.sDate);
    data.dDate = DateWithoutDash(data.dDate);
    fetchData(data);
  };

  const resetForm = () => {
    if (dataCommonDic) {
      reset({
        areaCode: dataCommonDic?.areaCode[0].code,
        reportKind: dataCommonDic?.reportKind[0].code,
        cuType: dataCommonDic?.cuType[0].code,
        cuJyCode: dataCommonDic?.cuJyCode[0].code,
        swCode: dataCommonDic?.swCode[0].code,
        cuCutype: dataCommonDic?.cuCutype[0].code,
        sDate: dataCommonDic?.sDate[0].code,
        dDate: dataCommonDic?.dDate[0].code,
      });
    }
  };

  const handleReset = () => {
    resetForm();
    setData([]);
  };

  const selectColumns = () => {
    switch (watch("reportKind")) {
      case "0":
        return { columns: columns0, fields: fields0 };
      case "1":
        return { columns: columns1, fields: fields1 };
      case "2":
        return { columns: columns2, fields: fields2 };
      case "3":
        return { columns: columns3, fields: fields3 };
      case "4":
        return { columns: columns4, fields: fields4 };
      case "5":
        return { columns: columns5, fields: fields5 };
      case "6":
        return { columns: columns6, fields: fields6 };
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)} autoComplete="off">
        <SearchWrapper className="h35 mt5">
          <FormGroup>
            {areaCode === "00" && (
              <>
                <Label style={{ minWidth: "93px" }}>영업소</Label>

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
              />
              <Button
                text="취소"
                icon={<ResetGray color="#707070" />}
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

        <SearchWrapper>
          <FormGroup>
            <Label style={{ minWidth: "auto" }}>보고서 종류</Label>
            <Select register={register("reportKind")} width={InputSize.i130}>
              {dataCommonDic?.reportKind?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>

            <Label style={{ minWidth: "90px" }}>거래 구분</Label>
            <Select register={register("cuType")} width={InputSize.i130}>
              {dataCommonDic?.cuType?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>

            <Label style={{ minWidth: "90px" }}>기간</Label>
            <Controller
              control={control}
              name="sDate"
              render={({ field }) => <CustomDatePicker {...field} />}
            />
            <Controller
              control={control}
              name="dDate"
              render={({ field }) => <CustomDatePicker {...field} />}
            />

            <Label style={{ minWidth: "90px" }}>지역 분류</Label>
            <Select register={register("cuJyCode")} width={InputSize.i130}>
              {dataCommonDic?.cuJyCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>

            <Label style={{ minWidth: "90px" }}>담당 사원</Label>
            <Select register={register("swCode")} width={InputSize.i130}>
              {dataCommonDic?.swCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>

            <Label style={{ minWidth: "90px" }}>소비자 형태</Label>
            <Select register={register("cuCutype")} width={InputSize.i130}>
              {dataCommonDic?.cuCutype?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
              <option key="sdcdcds00" value="">
                hooson
              </option>
            </Select>
          </FormGroup>
        </SearchWrapper>
      </form>
      <BasicGrid
        ref={gridRef}
        areaCode={areaCode}
        data={data}
        columns={selectColumns()?.columns}
        fields={selectColumns()?.fields}
        menuId={menuId}
        gridChangeField={watch("reportKind")}
        rowIndex={data?.length > 1 ? data.length - 1 : 0}
        style={{ height: `calc(100% - 52px)` }}
      />
    </>
  );
}

export default CM9003;
