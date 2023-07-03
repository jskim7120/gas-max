import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import CreateReport from "app/hook/createReport";
import { useGetTabDictionaryMutation } from "app/api/commonDictionary";
import { PT9004SEARCH } from "app/path";
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
import { columns2, fields2 } from "./tab/tab3/data2";
import CheckBox from "components/checkbox";
import { useDispatch } from "app/store";
import getTabContent from "./getTabContent";
import { apiGet } from "app/axios";

function PT9004({
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

  const [getTabDictionary, { data: dataCommonDic }] =
    useGetTabDictionaryMutation();

  const dispatch = useDispatch();

  const { register, handleSubmit, reset, control, watch } = useForm<ISEARCH>({
    mode: "onSubmit",
  });

  useEffect(() => {
    getTabDictionary({
      groupId: "PT",
      functionName: "PT9004",
      tabId: tabId,
    });
  }, [tabId]);

  useEffect(() => {
    if (dataCommonDic) {
      resetForm("reset");
    }
  }, [dataCommonDic]);

  useEffect(() => {
    if (tabId === 0 || tabId === 1 || tabId === 2) {
      setData([]);
    }
  }, [tabId]);

  const fetchData = async (params: any) => {
    setLoading(true);

    const dataS = await apiGet(PT9004SEARCH, params);

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
      case 2:
        return { columns: columns2, fields: fields2 };
      default:
        return { columns: columns0, fields: fields0 };
    }
  };

  const resetForm = (type: string) => {
    if (type === "reset") {
      if (tabId === 0) {
        const init = dataCommonDic.dataInit[0];
        reset({
          areaCode: dataCommonDic.areaCode[0].code,
          swCode: init?.swCode,
          cuCustgubun: init?.cuCustgubun,
          cuJyCode: init?.cuJyCode,
          dateChk: init?.dateChk === "Y",
          sDate: init?.sDate,
          eDate: init?.eDate,
          cuSukumtype: init?.cuSukumtype,
          cuStae: init?.cuStae,
          sOrd: init?.sOrd,
          sChk: init?.sChk,
        });
      }
      if (tabId === 1) {
        const init = dataCommonDic.dataInit1[0];
        reset({
          swCode1: init?.swCode1,
          cuCustgubun1: init?.cuCustgubun1,
          cuJyCode1: init?.cuJyCode1,
          cuSukumtype1: init?.cuSukumtype1,
          cuStae1: init?.cuStae1,
          sOrd1: init?.sOrd1,
          sChk1: init?.sChk1,
        });
      }
      if (tabId === 2) {
        const init = dataCommonDic.dataInit2[0];
        reset({
          swCode2: init?.swCode2,
          cuCustgubun2: init?.cuCustgubun2,
          sOver2: init?.sOver2,
          cuJyCode2: init?.cuJyCode2,
          cuSukumtype2: init?.cuSukumtype2,
          cuStae2: init?.cuStae2,
          sOrd2: init?.sOrd2,
        });
      }
    }
  };

  const handleReset = () => {
    if (
      dataCommonDic?.dataInit ||
      dataCommonDic?.dataInit1 ||
      dataCommonDic?.dataInit2
    ) {
      resetForm("reset");
    }
    setData([]);
  };

  const handleSOverChange = () => {
    if (watch("sOver2") !== undefined && watch("sOver2") !== null) {
      const today = new Date();
      const newDate = new Date(
        today.setMonth(today.getMonth() - +watch("sOver2"))
      );
      return DateWithDashOnlyYearMonth(newDate);
    }
  };

  const submit = (params: any) => {
    params.tabKind = tabId;
    if (tabId === 0) {
      delete params.cuCustgubun1;
      delete params.cuSukumtype1;
      delete params.swCode1;
      delete params.cuJyCode1;
      delete params.cuStae1;
      delete params.sOrd1;
      delete params.sChk1;

      delete params.swCode2;
      delete params.cuCustgubun2;
      delete params.sOver2;
      delete params.cuJyCode2;
      delete params.cuSukumtype2;
      delete params.cuStae2;
      delete params.sOrd2;
      params.sDate = DateWithoutDash(params.sDate);
      params.eDate = DateWithoutDash(params.eDate);
      params.dateChk = params.dateChk ? "Y" : "N";
    } else if (tabId === 1) {
      delete params.swCode;
      delete params.cuJyCode;
      delete params.dateChk;
      delete params.sDate;
      delete params.eDate;
      delete params.cuStae;
      delete params.sOrd;
      delete params.sChk;
      delete params.cuCustgubun;
      delete params.cuSukumtype;

      delete params.swCode2;
      delete params.cuCustgubun2;
      delete params.sOver2;
      delete params.cuJyCode2;
      delete params.cuSukumtype2;
      delete params.cuStae2;
      delete params.sOrd2;
    } else if (tabId === 2) {
      delete params.swCode;
      delete params.cuJyCode;
      delete params.dateChk;
      delete params.sDate;
      delete params.eDate;
      delete params.cuStae;
      delete params.sOrd;
      delete params.sChk;
      delete params.cuCustgubun;
      delete params.cuSukumtype;

      delete params.swCode1;
      delete params.cuCustgubun1;
      delete params.cuJyCode1;
      delete params.cuSukumtype1;
      delete params.cuStae1;
      delete params.sOrd1;
      delete params.sChk1;
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
          tabHeader={["미수 상세 현황", "최종 미수 현황", "월별 미수 현황"]}
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

export default PT9004;
