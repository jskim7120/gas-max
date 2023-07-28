import React, { useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import getSimpleData from "app/hook/getSimpleData";
import { AR9003SEARCH } from "app/path";
import { SearchWrapper } from "../../commonStyle";
import { Select, FormGroup, Label, Input } from "components/form/style";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import {
  MagnifyingGlassBig,
  ExcelIcon,
  ResetGray,
} from "components/allSvgIcon";
import CustomDatePicker from "components/customDatePicker";
import Loader from "components/loader";
import CheckBox from "components/checkbox";
import BasicGrid from "components/basicGrid";
import Viewer from "components/viewer";
import { DateWithoutDash } from "helpers/dateFormat";
import { ISEARCH } from "./model";
import { columns0, fields0 } from "./data/data0";
import { columns1, fields1 } from "./data/data1";

function AR9003({
  depthFullName,
  menuId,
  ownAreaCode,
}: {
  depthFullName: string;
  menuId: string;
  ownAreaCode: string;
}) {
  const { data, setData, loading, fetchData, dataCommonDic } = getSimpleData(
    "AR",
    "AR9003",
    AR9003SEARCH
  );
  const gridRef = useRef() as React.MutableRefObject<any>;

  const { register, handleSubmit, reset, control, watch } = useForm<ISEARCH>({
    mode: "onSubmit",
  });

  useEffect(() => {
    if (dataCommonDic?.dataInit) {
      resetForm("reset");
    }
  }, [dataCommonDic]);

  useEffect(() => {
    if (watch("reportKind")) {
      setData([]);
    }
  }, [watch("reportKind")]);

  const openNewWindow = async () => {
    const width = 1500;
    const height = 2000;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2;

    const newWindow = window.open(
      "/print" + `?${JSON.stringify(data)}`,
      "",
      `width=${width},height=${height},left=${left},top=${top},resizable,scrollbars=yes,status=1`
    );
  };

  const submit = (params: any) => {
    params.sDate = DateWithoutDash(params.sDate);
    params.eDate = DateWithoutDash(params.eDate);
    params.chkDate = params.chkDate ? "Y" : "N";
    params.chkSv = params.chkSv ? "Y" : "N";
    fetchData(params);
  };

  const resetForm = (type: string) => {
    if (type === "reset") {
      const init = dataCommonDic.dataInit[0];
      reset({
        areaCode: dataCommonDic.areaCode[0].code,
        ...init,
        chkDate: init?.chkDate === "Y",
        chkSv: init?.chkSv === "Y",
      });
    }
  };

  const handleReset = () => {
    if (dataCommonDic?.dataInit) {
      resetForm("reset");
    }
    setData([]);
  };

  const selectColumns = () => {
    switch (watch("reportKind")) {
      case "0":
        return { columns: columns0, fields: fields0 };
      case "1":
        return { columns: columns1, fields: fields1 };
      default:
        return { columns: columns0, fields: fields0 };
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)} autoComplete="off">
        <SearchWrapper className="h35">
          <FormGroup>
            {ownAreaCode === "00" && (
              <>
                <Label style={{ minWidth: "90px" }}>영업소</Label>
                <Select register={register("areaCode")} width={InputSize.i120}>
                  {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </>
            )}
            <Label style={{ minWidth: "90px" }}>보고서종류</Label>
            <Select register={register("reportKind")} width={InputSize.i200}>
              {dataCommonDic?.reportKind?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
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
        <SearchWrapper style={{ flexDirection: "column", alignItems: "start" }}>
          <FormGroup>
            <CheckBox
              register={register("chkDate")}
              title="기간"
              rtl
              style={{ marginLeft: "28px" }}
            />
            <Controller
              control={control}
              name="sDate"
              render={({ field }) => (
                <CustomDatePicker {...field} style={{ width: "120px" }} />
              )}
            />
            <Controller
              control={control}
              name="eDate"
              render={({ field }) => (
                <CustomDatePicker {...field} style={{ width: "120px" }} />
              )}
            />
            <Input
              label="거래처명"
              labelStyle={{ minWidth: "90px" }}
              register={register("aptName")}
              inputSize={InputSize.i200}
            />
          </FormGroup>
          <FormGroup>
            <Label style={{ minWidth: "90px" }}>사원</Label>
            <Select register={register("swCode")} width={InputSize.i120}>
              {dataCommonDic?.swCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <Label style={{ minWidth: "216px" }}>지역구분</Label>
            <Select register={register("cuJyCode")} width={InputSize.i120}>
              {dataCommonDic?.cuJyCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <CheckBox
              title="무료시설 자료만 조회"
              rtl
              register={register("chkSv")}
              style={{ marginLeft: "20px" }}
            />
          </FormGroup>
        </SearchWrapper>
      </form>
      <BasicGrid
        menuId={menuId}
        ref={gridRef}
        areaCode={ownAreaCode}
        {...selectColumns()}
        data={data}
        gridChangeField={watch("reportKind")}
        rowIndex={data?.length > 1 ? data.length - 1 : 0}
        style={{ height: "calc(100% - 120px)" }}
      />
    </>
  );
}

export default AR9003;
