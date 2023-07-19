import { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import CreateReport from "app/hook/createReport";
import { CM9006SEARCH } from "app/path";
import { ISEARCH } from "./model";
import Loader from "components/loader";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import CheckBox from "components/checkbox";
import CustomDatePicker from "components/customDatePicker";
import BasicGrid from "components/basicGrid";
import { Select, FormGroup, Label } from "components/form/style";
import { ResetGray, MagnifyingGlass, ExcelIcon } from "components/allSvgIcon";
import { SearchWrapper } from "../../commonStyle";
import setFooterDetail from "container/contents/footer/footerDetailFunc";

import { columns0, fields0 } from "./data/data0";
import { columns1, fields1 } from "./data/data1";
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
  } = CreateReport("CM", "CM9006", menuId, CM9006SEARCH);
  const gridRef = useRef() as React.MutableRefObject<any>;

  const [dataChk, setDataChk] = useState(true);

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
        cuCustgubun: dataCommonDic?.cuCustgubun[0].code,
        cuCutype: dataCommonDic?.cuCutype[0].code,
        cuStae: dataCommonDic?.cuStae[0].code,
        cuSukumtype: dataCommonDic?.cuSukumtype[0].code,
        sDate: dataCommonDic?.sDate[0].code,
        dDate: dataCommonDic?.dDate[0].code,
      });
    }
  };

  const handleReset = () => {
    resetForm();
    setData([]);
    setDataChk(true);
  };

  const selectColumns = () => {
    switch (watch("reportKind")) {
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
                <Label style={{ minWidth: "90px" }}>영업소</Label>

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

        <SearchWrapper style={{ alignItems: "start", flexDirection: "column" }}>
          <FormGroup>
            <Label style={{ minWidth: "90px" }}>보고서 종류</Label>
            <Select width={InputSize.i130} register={register("reportKind")}>
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

            <Label style={{ minWidth: "105px" }}>관리 책임자</Label>
            <Select register={register("cuCustgubun")} width={InputSize.i130}>
              {dataCommonDic?.cuCustgubun?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            <Label style={{ minWidth: "90px" }}>소비자 형태</Label>
            <Select register={register("cuCutype")} width={InputSize.i130}>
              {dataCommonDic?.cuCutype?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
              <option key="sdcdcds00" value=""></option>
            </Select>

            <Label style={{ minWidth: "90px" }}>거래 상태</Label>
            <Select register={register("cuStae")} width={InputSize.i130}>
              {dataCommonDic?.cuStae?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>

            <Label style={{ minWidth: "90px" }}>수금 방법</Label>
            <Select register={register("cuSukumtype")} width={InputSize.i130}>
              {dataCommonDic?.cuSukumtype?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>

            <Label style={{ minWidth: "92px" }}>등록기간</Label>
            <CheckBox
              register={register("dataChk")}
              onChange={(e: any) => setDataChk(e.target.checked)}
              checked={dataChk}
            />
            <Controller
              control={control}
              name="sDate"
              render={({ field }) => (
                <CustomDatePicker
                  {...field}
                  style={{ marginLeft: "15px" }}
                  readOnly={!dataChk}
                />
              )}
            />
            <Controller
              control={control}
              name="dDate"
              render={({ field }) => (
                <CustomDatePicker {...field} readOnly={!dataChk} />
              )}
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
        menuId={menuId}
        gridChangeField={watch("reportKind")}
        rowIndex={data?.length > 1 ? data.length - 1 : 0}
        style={{ height: `calc(100% - 120px)` }}
      />
    </>
  );
}

export default CM9003;
