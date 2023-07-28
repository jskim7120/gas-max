import React, { useEffect, useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import getSimpleData from "app/hook/getSimpleData";
import { apiGet } from "app/axios";
import { AR9009SEARCH } from "app/path";
import { SearchWrapper } from "../../commonStyle";
import PlainTab from "components/plainTab";
import { TabContentWrapper } from "components/plainTab/style";
import { Select, FormGroup, Label } from "components/form/style";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import {
  MagnifyingGlassBig,
  ExcelIcon,
  ResetGray,
} from "components/allSvgIcon";
import CustomDatePicker from "components/customDatePicker";
import { DateWithoutDashOnlyYearMonth } from "helpers/dateFormat";
import Loader from "components/loader";
import BasicGrid from "components/basicGrid";
import { ISEARCH } from "./model";
import { columns0, fields0 } from "./data/data0";
import { columns1, fields1 } from "./data/data1";
import { columns2, fields2 } from "./data/data2";
import { columns3, fields3 } from "./data/data3";

import getTabContent from "./getTabContent";

function AR9009({
  depthFullName,
  menuId,
  ownAreaCode,
}: {
  depthFullName: string;
  menuId: string;
  ownAreaCode: string;
}) {
  const { data, setData, loading, setLoading, dataCommonDic } = getSimpleData(
    "AR",
    "AR9009",
    AR9009SEARCH
  );
  const gridRef = useRef() as React.MutableRefObject<any>;

  const { register, handleSubmit, reset, control } = useForm<ISEARCH>({
    mode: "onSubmit",
  });

  const [tabId, setTabId] = useState(0);

  useEffect(() => {
    if (dataCommonDic?.dataInit) {
      resetForm("reset");
    }
  }, [dataCommonDic]);

  useEffect(() => {
    if (tabId !== undefined) {
      setData([]);
    }
  }, [tabId]);

  const fetchData = async (params: any) => {
    setLoading(true);
    const dataS = await apiGet(AR9009SEARCH, params);

    if (dataS && dataS?.length > 0) {
      dataS.map((d: any) => (d.rowchk = +d.dangmisu > 0 ? "Y" : "N"));
      setData(dataS);
    } else {
      setData([]);
    }
    setLoading(false);
  };

  const selectColumns = () => {
    switch (tabId) {
      case 0:
        return { columns: columns0, fields: fields0 };
      case 1:
        return { columns: columns1, fields: fields1 };
      case 2:
        return { columns: columns2, fields: fields2 };
      case 3:
        return { columns: columns3, fields: fields3 };
      default:
        return { columns: columns0, fields: fields0 };
    }
  };

  const resetForm = (type: string) => {
    if (type === "reset") {
      const init = dataCommonDic.dataInit[0];
      reset({
        areaCode: dataCommonDic.areaCode[0].code,
        ...init,
        chkGubun: init?.chkGubun === "Y",
      });
    }
  };

  const handleReset = () => {
    if (dataCommonDic?.dataInit) {
      resetForm("reset");
    }
    setData([]);
  };

  const submit = (params: any) => {
    params.sMonth = DateWithoutDashOnlyYearMonth(params.sMonth);
    params.chkGubun = params.chkGubun ? "Y" : "N";
    params.tabKind = tabId;
    if (tabId === 0) {
      delete params.swCode2;
      delete params.cuJyCode2;
      delete params.cuCutype2;

      delete params.swCode3;
      delete params.cuJyCode3;
      delete params.cuCutype3;

      delete params.swCode4;
      delete params.cuJyCode4;
      delete params.cuCutype4;
    } else if (tabId === 1) {
      delete params.swCode;
      delete params.cuJyCode;
      delete params.cuCutype;

      delete params.swCode3;
      delete params.cuJyCode3;
      delete params.cuCutype3;

      delete params.swCode4;
      delete params.cuJyCode4;
      delete params.cuCutype4;

      params.swCode = params.swCode2;
      params.cuJyCode = params.cuJyCode2;
      params.cuCutype = params.cuCutype2;
    } else if (tabId === 2) {
      delete params.swCode;
      delete params.cuJyCode;
      delete params.cuCutype;

      delete params.swCode2;
      delete params.cuJyCode2;
      delete params.cuCutype2;

      delete params.swCode4;
      delete params.cuJyCode4;
      delete params.cuCutype4;

      params.swCode = params.swCode3;
      params.cuJyCode = params.cuJyCode3;
      params.cuCutype = params.cuCutype3;
    } else if (tabId === 3) {
      delete params.swCode;
      delete params.cuJyCode;
      delete params.cuCutype;

      delete params.swCode2;
      delete params.cuJyCode2;
      delete params.cuCutype2;

      delete params.swCode3;
      delete params.cuJyCode3;
      delete params.cuCutype3;

      params.swCode = params.swCode4;
      params.cuJyCode = params.cuJyCode4;
      params.cuCutype = params.cuCutype4;
    }
    fetchData(params);
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)} autoComplete="off">
        <SearchWrapper className="h35">
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

            <Label style={{ minWidth: "80px" }}>년 - 월</Label>
            <Controller
              control={control}
              name="sMonth"
              render={({ field }) => (
                <CustomDatePicker {...field} showMonthYearPicker />
              )}
            />

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
      </form>
      <div
        style={{
          width: "100%",
          paddingTop: "2px",
          background: "#626161",
        }}
      >
        <PlainTab
          tabHeader={[
            "사용자별",
            "담당사원별",
            "다세대 / 건물별",
            "그룹 코드별",
          ]}
          onClick={(id) => setTabId(id)}
          tabId={tabId}
        />
        <TabContentWrapper
          style={{
            padding: "0",
            minHeight: "auto",
            border: "none",
            borderTop: "1px solid #00000033",
          }}
        >
          {getTabContent(tabId, register, dataCommonDic, data)}
        </TabContentWrapper>
      </div>

      <BasicGrid
        menuId={menuId}
        ref={gridRef}
        gridChangeField={tabId}
        areaCode={ownAreaCode}
        {...selectColumns()}
        data={data}
        rowIndex={data?.length > 1 ? data.length - 1 : 0}
        style={
          tabId === 0
            ? { height: `calc(100% - 157px)` }
            : { height: `calc(100% - 121px)` }
        }
      />
    </>
  );
}

export default AR9009;
