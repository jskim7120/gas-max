import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import CreateReport from "app/hook/createReport";
import { PT9001SEARCH } from "app/path";
import { SearchWrapper } from "../../commonStyle";
import PlainTab from "components/plainTab";
import { TabContentWrapper } from "components/plainTab/style";
import { Select, FormGroup, Label } from "components/form/style";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import {
  MagnifyingGlass,
  ResetGray,
  PrintPreview,
  Print,
} from "components/allSvgIcon";
import CustomDatePicker from "components/customDatePicker";
import Loader from "components/loader";
import BasicGrid from "components/basicGrid";
import Viewer from "components/viewer";
import { DateWithoutDash } from "helpers/dateFormat";
import { ISEARCH } from "./model";
import { columns0, fields0 } from "./data/data0";
import { columns1, fields1 } from "./data/data1";
import CheckBox from "components/checkbox";

import getTabContent from "./getTabContent";

function PT9001({
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
  } = CreateReport("PT", "PT9001", menuId, PT9001SEARCH);
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

  const selectColumns = () => {
    switch (tabId) {
      case 0:
        return { columns: columns0, fields: fields0 };
      case 1:
        return { columns: columns1, fields: fields1 };
    }
  };

  const resetForm = (type: string) => {
    if (type === "reset") {
      const init = dataCommonDic.dataInit[0];
      reset({
        areaCode: dataCommonDic.areaCode[0].code,
        cuGubun: init?.cuGubun,
        cuJyCode: init?.cuJyCode,
        cuStae: init?.cuStae,
        sDate: init?.sDate,
        eDate: init?.eDate,
        cuJangbu: init?.cuJangbu,
        swCode: init?.swCode,
        sOrd: init?.sOrd,
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
    params.tabKind = tabId;
    if (tabId === 0) {
      delete params.swCode1;
      delete params.cuCustgubun1;
      delete params.cuJangbu1;
      delete params.sOver;
      delete params.cuJyCode1;
      delete params.cuSukumtype1;
      delete params.cuStae1;
      delete params.sOrd1;
    } else if (tabId === 1) {
      delete params.cuGubun;
      delete params.cuJyCode;
      delete params.cuStae;
      delete params.sDate;
      delete params.eDate;
      delete params.cuJangbu;
      delete params.swCode;
      delete params.sOrd;

      params.swCode = params.swCode1;
      params.cuJangbu = params.cuJangbu1;
      params.cuJyCode = params.cuJyCode1;
      params.cuStae = params.cuStae1;
      params.sOrd = params.sOrd1;
    }
    fetchData(params);
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
                text="미리보기"
                icon={<PrintPreview />}
                color={ButtonColor.LIGHT}
                type="button"
                onClick={openNewWindow}
              />
              <Button
                text="출력"
                icon={<Print />}
                color={ButtonColor.LIGHT}
                type="button"
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
          tabHeader={["미수 상세 현황", "월별 미수 현"]}
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
          {getTabContent(tabId, register, dataCommonDic, data, control)}
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
        style={{ height: "calc(100% - 52px)" }}
      />
    </>
  );
}

export default PT9001;
