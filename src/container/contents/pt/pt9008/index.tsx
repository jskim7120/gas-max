import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useGetTabDictionaryMutation } from "app/api/commonDictionary";
import { PT9008SEARCH } from "app/path";
import { SearchWrapper } from "../../commonStyle";
import PlainTab from "components/plainTab";
import { TabContentWrapper } from "components/plainTab/style";
import { Select, FormGroup, Label } from "components/form/style";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import {
  MagnifyingGlassBig,
  ResetGray,
  PrintPreview,
  Print,
} from "components/allSvgIcon";
import Loader from "components/loader";
import BasicGrid from "components/basicGrid";
import Viewer from "components/viewer";
import { DateWithoutDash } from "helpers/dateFormat";
import { ISEARCH } from "./model";
import { columns0, fields0 } from "./tab/tab1/data0";
import { columns1, fields1 } from "./tab/tab2/data1";
import { useDispatch } from "app/store";
import getTabContent from "./getTabContent";
import { apiGet } from "app/axios";

function PT9008({
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

  const { register, handleSubmit, reset, control } = useForm<ISEARCH>({
    mode: "onSubmit",
  });

  useEffect(() => {
    getTabDictionary({
      groupId: "PT",
      functionName: "PT9008",
      tabId: tabId,
    });
  }, [tabId]);

  useEffect(() => {
    if (dataCommonDic) {
      resetForm("reset");
    }
  }, [dataCommonDic]);

  useEffect(() => {
    if (tabId === 0 || tabId === 1) {
      setData([]);
    }
  }, [tabId]);

  const fetchData = async (params: any) => {
    setLoading(true);

    const dataS = await apiGet(PT9008SEARCH, params);

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

  const submit = (params: any) => {
    params.tabKind = tabId;
    params.sDate = DateWithoutDash(params.sDate);
    params.eDate = DateWithoutDash(params.eDate);
    fetchData(params);
  };

  const resetForm = (type: string) => {
    if (type === "reset") {
      if (tabId === 0) {
        const init = dataCommonDic.dataInit[0];
        reset({
          areaCode: dataCommonDic.areaCode[0].code,
          cuGubun: init?.cuGubun,
          sDate: init?.sDate,
          eDate: init?.eDate,
          sawonChk: init?.sawonChk,
          swCode: init?.swCode,
          cuCustgubun: init?.cuCustgubun,
          cuName: init?.cuName,
          cuSukumtype: init?.cuSukumtype,
          cuJyCode: init?.cuJyCode,
        });
      }
      if (tabId === 1) {
        const init = dataCommonDic?.dataInit[0];
        reset({
          areaCode: dataCommonDic.areaCode[0].code,
          cuGubun: init?.cuGubun,
          sDate: init?.sDate,
          eDate: init?.eDate,
          sawonChk: init?.sawonChk,
          swCode: init?.swCode,
          cuCustgubun: init?.cuCustgubun,
          cuName: init?.cuName,
          cuSukumtype: init?.cuSukumtype,
          cuJyCode: init?.cuJyCode,
        });
      }
    }
  };

  const handleReset = () => {
    if (dataCommonDic?.dataInit || dataCommonDic?.dataInit1) {
      resetForm("reset");
    }
    setData([]);
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
            <Label style={{ minWidth: "80px" }}>구 분</Label>
            <Select register={register("cuGubun")} width={InputSize.i120}>
              {dataCommonDic?.cuGubun?.map((obj: any, idx: number) => (
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
        {getTabContent(tabId, register, dataCommonDic, data, control)}
        <PlainTab
          tabHeader={["거 래 처 별", "구분별 집계 "]}
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
        ></TabContentWrapper>
      </div>
      <BasicGrid
        menuId={menuId}
        ref={gridRef}
        gridChangeField={tabId}
        areaCode={ownAreaCode}
        {...selectColumns()}
        data={data}
        rowIndex={data?.length > 1 ? data.length - 1 : 0}
        style={{ height: "calc(100% - 158px)" }}
      />
    </>
  );
}

export default PT9008;
