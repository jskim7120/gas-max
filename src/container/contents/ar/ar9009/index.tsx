import React, { useEffect, useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import CreateReport from "app/hook/createReport";
import { AR9009SEARCH } from "app/path";
import { SearchWrapper } from "../../commonStyle";
import PlainTab from "components/plainTab";
import { TabContentWrapper } from "components/plainTab/style";
import { Select, FormGroup, Label } from "components/form/style";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import { MagnifyingGlass, ExcelIcon, ResetGray } from "components/allSvgIcon";
import CustomDatePicker from "components/customDatePicker";
import { DateWithoutDash } from "helpers/dateFormat";
import Loader from "components/loader";
import BasicGrid from "components/basicGrid";
import { ISEARCH } from "./model";
import { columns0, fields0 } from "./data/data0";
import { columns1, fields1 } from "./data/data1";
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
  const {
    data,
    setData,
    selected,
    setSelected,
    loading,
    fetchData,
    dispatch,
    dataCommonDic,
  } = CreateReport("AR", "AR9009", menuId, AR9009SEARCH);
  const gridRef = useRef() as React.MutableRefObject<any>;

  const { register, handleSubmit, reset, control } = useForm<ISEARCH>({
    mode: "onSubmit",
  });

  const [tabId, setTabId] = useState(0);

  const submit = (params: ISEARCH) => {
    // params.sDate = DateWithoutDash(params.sDate);
    // params.eDate = DateWithoutDash(params.eDate);

    fetchData(params);
  };

  useEffect(() => {
    if (dataCommonDic?.dataInit) {
      const init = dataCommonDic.dataInit[0];
      reset({
        // sDate: init?.sDate,
        // eDate: init?.dDate,
        // jpCode: init?.jpCode,
        // swCode: init?.swCode,
      });
    }
  }, [dataCommonDic]);

  const selectColumns = () => {
    switch (tabId) {
      case 0:
        return { columns: columns0, fields: fields0 };
      case 1:
        return { columns: columns1, fields: fields1 };
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

            <Label style={{ minWidth: "80px" }}>년 - 월</Label>
            <Select register={register("dataInit")} width={InputSize.i120}>
              {dataCommonDic?.dataInit?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
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
                style={{ minWidth: "max-content" }}
              />
              <Button
                text="취소"
                icon={<ResetGray />}
                style={{ minWidth: "max-content" }}
                type="button"
                color={ButtonColor.LIGHT}
                // onClick={cancel}
              />
              <Button
                text="엑셀"
                style={{ minWidth: "max-content" }}
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
      <div style={{ marginTop: "5px" }}>
        <PlainTab
          tabHeader={["지로 양식", "고객 안내문", "입금계좌 안내", "결재 라인"]}
          onClick={(id) => setTabId(id)}
          tabId={tabId}
        />
        <TabContentWrapper style={{ padding: "0" }}>
          {getTabContent(tabId, register, dataCommonDic, data)}
        </TabContentWrapper>
      </div>

      <BasicGrid
        menuId={menuId}
        ref={gridRef}
        gridChangeField={tabId}
        areaCode={ownAreaCode}
        columns={selectColumns()?.columns}
        fields={selectColumns()?.fields}
        data={data}
        rowIndex={data?.length > 1 ? data.length - 1 : 0}
        style={{ height: "calc(100% - 292px)" }}
      />
    </>
  );
}

export default AR9009;
