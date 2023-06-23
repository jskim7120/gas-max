import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useGetTabDictionaryQuery } from "app/api/commonDictionary";
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
import { DateWithDashOnlyYearMonth, DateWithoutDash } from "helpers/dateFormat";
import { ISEARCH } from "./model";
import { columns0, fields0 } from "./tab/tab1/data0";
import { columns1, fields1 } from "./tab/tab2/data1";
import CheckBox from "components/checkbox";
import { useDispatch } from "app/store";
import getTabContent from "./getTabContent";
import { apiGet } from "app/axios";

function PT9001({
  depthFullName,
  menuId,
  ownAreaCode,
}: {
  depthFullName: string;
  menuId: string;
  ownAreaCode: string;
}) {
  const gridRef = useRef() as React.MutableRefObject<any>;

  const [data, setData] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [tabId, setTabId] = useState(0);

  const { data: dataCommonDic } = useGetTabDictionaryQuery({
    groupId: "PT",
    functionName: "PT9001",
    tabId: tabId,
  });

  const dispatch = useDispatch();
  const { register, handleSubmit, reset, control, watch } = useForm<ISEARCH>({
    mode: "onSubmit",
  });

  useEffect(() => {
    if (dataCommonDic?.dataInit) {
      resetForm("reset");
    }
  }, [dataCommonDic]);

  const fetchData = async (params: any) => {
    setLoading(true);

    const dataS = await apiGet(PT9001SEARCH, params);

    if (dataS && dataS?.length > 0) {
      setData(dataS);
      const lastIndex = dataS && dataS?.length > 1 ? dataS.length - 1 : 0;
    } else {
      setData([]);
    }
    setLoading(false);
  };

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
      default:
        return { columns: columns0, fields: fields0 };
    }
  };

  const resetForm = (type: string) => {
    if (type === "reset") {
      const init = dataCommonDic?.dataInit[0];

      reset({
        areaCode: dataCommonDic.areaCode[0].code,
        cuGubun: init?.cuGubun,
        cuJangbu: init?.cuJangbu,
        cuJyCode: init?.cuJyCode,
        cuStae: init?.cuStae,
        dateChk: init?.dateChk === "Y",
        eDate: init?.eDate,
        sDate: init?.sDate,
        sOrd: init?.sOrd,
        swCode: init?.swCode,

        cuCustgubun1: init?.cuCustgubun1,
        cuJangbu1: init?.cuJangbu1,
        cuJyCode1: init?.cuJyCode1,
        cuStae1: init?.cuStae1,
        cuSukumtype1: init?.cuSukumtype1,
        sOrd1: init?.sOrd1,
        swCode1: init?.swCode1,
      });
    }
  };

  const handleReset = () => {
    if (dataCommonDic?.dataInit) {
      resetForm("reset");
    }
    setData([]);
  };

  const handleSOverChange = () => {
    if (watch("sOver") !== undefined && watch("sOver") !== null) {
      const today = new Date();
      const newDate = new Date(
        today.setMonth(today.getMonth() - +watch("sOver"))
      );
      return DateWithDashOnlyYearMonth(newDate);
    }
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
      params.sDate = DateWithoutDash(params.sDate);
      params.eDate = DateWithoutDash(params.eDate);
      params.dateChk = params.dateChk ? "Y" : "N";
    } else if (tabId === 1) {
      delete params.cuGubun;
      delete params.cuJyCode;
      delete params.cuStae;
      delete params.sDate;
      delete params.eDate;
      delete params.cuJangbu;
      delete params.swCode;
      delete params.sOrd;
      delete params.dateChk;
      delete params.sDate;
      delete params.eDate;
      delete params.sOver;
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
          {getTabContent(
            tabId,
            register,
            dataCommonDic,
            data,
            control,
            handleSOverChange
          )}
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
        style={{ height: "calc(100% - 52px)" }}
      />
    </>
  );
}

export default PT9001;
