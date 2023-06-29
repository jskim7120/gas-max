import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { apiGet } from "app/axios";
import CreateScreen from "app/hook/createScreen";
import { CM1200SEARCH, CM120065 } from "app/path";
import GridLeft from "components/grid";
import { ButtonType } from "components/componentsType";
import { FormGroup, Input, Label, Select } from "components/form/style";
import CheckBox from "components/checkbox";
import Loader from "components/loader";
import Button from "components/button/button";
import {
  SearchWrapper,
  LeftSide,
  RightSide,
  MainWrapper,
} from "../../commonStyle";
import { MagnifyingGlassBig } from "components/allSvgIcon";
import { ISEARCH } from "./model";
import Form from "./form";
import { fields, columns } from "./data";
import { useSelector } from "app/store";
import { addCM1105LoadStatus } from "app/state/modal/modalSlice";

const leftSideWidth: number = 530;

function CM1200({
  depthFullName,
  menuId,
  ownAreaCode,
}: {
  depthFullName: string;
  menuId: string;
  ownAreaCode: string;
}) {
  const { handleSubmit, reset, watch, register, getValues, control } =
    useForm<ISEARCH>({
      mode: "onSubmit",
    });

  const {
    data,
    setData,
    selected,
    setSelected,
    loading,
    isAddBtnClicked,
    setIsAddBtnClicked,
    activeTabId,
    fetchData,
    showDraggableLine,
    show4Btns,
    isOpen,
    gridIndexes,
    dispatch,
    dataCommonDic,
    linePos,
    formRef,
    addBtnUnclick,
  } = CreateScreen("CM", "CM1200", menuId, CM1200SEARCH, leftSideWidth);

  const [selectedSupplyTab, setSelectedSupplyTab] = useState<any>({});
  const [userInfo, setUserInfo] = useState<any[]>([]);
  const [selectedUserInfo, setSelectedUserInfo] = useState<any>({});

  const [cuCustgubunDic, setCuCustgubunDic] = useState<any[]>([]);
  const [cuJyCodeDic, setCuJyCodeDic] = useState<any[]>([]);
  const [cuSwCodeDic, setCuSwCodeDic] = useState<any[]>([]);
  const rowIndex0 = gridIndexes?.find((item) => item.grid === 0)?.row;
  const rowIndex1 = gridIndexes?.find((item) => item.grid === 1)?.row;
  const cm1105 = useSelector((state) => state.modal.cm1105);

  useEffect(() => {
    if (dataCommonDic) {
      reset({ areaCode: dataCommonDic?.areaCode[0].code });
      fetchData({ areaCode: dataCommonDic?.areaCode[0].code }, "last");
    }
  }, [dataCommonDic]);

  useEffect(() => {
    if (watch("areaCode")) {
      if (isAddBtnClicked) {
        formRef.current.resetForm("clear");
      }
    }
  }, [watch("areaCode")]);

  useEffect(() => {
    if (selected) {
      if (isAddBtnClicked) {
        addBtnUnclick();
      }

      if (selected.cuCode && selected.areaCode) {
        fetchData65(
          {
            areaCode: selected.areaCode,
            cuCode: selected.cuCode,
          },
          "last"
        );
      }
    }
  }, [selected]);

  useEffect(() => {
    if (
      cm1105 &&
      cm1105.source === menuId &&
      cm1105.loadStatus === true &&
      Object.keys(selected)?.length > 0
    ) {
      if (selected.cuCode && selected.areaCode) {
        if (cm1105.status === "INSERT") {
          fetchData65(
            {
              areaCode: selected.areaCode,
              cuCode: selected.cuCode,
            },
            "last"
          );
        }
        if (cm1105.status === "UPDATE") {
          fetchData65({
            areaCode: selected.areaCode,
            cuCode: selected.cuCode,
          });
        }
      }
      dispatch(addCM1105LoadStatus({ loadStatus: false }));
    }
  }, [cm1105]);

  const prepareSearchFormValues = () => {
    const params: any = getValues();
    if (params.dataChk === undefined || params.dataChk === false) {
      delete params.sCuName;
      delete params.dataChk;
    }

    return params;
  };

  const fetchData65 = async (params: any, pos: any = null) => {
    const res = await apiGet(CM120065, params);

    if (res) {
      if (res?.userInfo) {
        setUserInfo(res.userInfo);
        if (pos === "last") {
          setSelectedUserInfo(res.userInfo[res.userInfo?.length - 1]);
        }
      } else {
        setUserInfo([]);
        setSelectedUserInfo({});
      }

      if (res?.supplyTab) {
        setSelectedSupplyTab(res?.supplyTab[0]);
      } else {
        setSelectedSupplyTab({});
      }

      if (res?.cuCustgubun) {
        setCuCustgubunDic(res.cuCustgubun);
      }

      if (res?.cuJyCode) {
        setCuJyCodeDic(res.cuJyCode);
      }

      if (res?.cuSwCode) {
        setCuSwCodeDic(res.cuSwCode);
      }
    } else {
      setUserInfo([]);
      setSelectedUserInfo({});
      setSelectedSupplyTab({});
      setCuCustgubunDic([]);
      setCuJyCodeDic([]);
      setCuSwCodeDic([]);
    }
  };

  const submit = async (p: any) => {
    const params = prepareSearchFormValues();
    fetchData(params);
  };

  return (
    <>
      <SearchWrapper className="h35 mt5">
        <FormGroup>
          {ownAreaCode === "00" && (
            <>
              <Label style={{ minWidth: "72px" }}>영업소</Label>
              <Select register={register("areaCode")}>
                {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </>
          )}

          {show4Btns({})}
        </FormGroup>
        <p>{depthFullName}</p>
      </SearchWrapper>

      <MainWrapper>
        <LeftSide style={{ width: `${linePos}px` }}>
          <SearchWrapper
            style={{ minWidth: `${leftSideWidth}px`, padding: "3px 15px" }}
          >
            <form onSubmit={handleSubmit(submit)} autoComplete="off">
              <FormGroup>
                <Label className="lable-check" style={{ minWidth: "auto" }}>
                  <Controller
                    control={control}
                    name="dataChk"
                    render={({ field }) => (
                      <CheckBox {...field} title="건물명" />
                    )}
                  />
                </Label>

                <Input
                  register={register("sCuName")}
                  readOnly={!watch("dataChk")}
                />

                <Button
                  text="검색"
                  icon={!loading && <MagnifyingGlassBig />}
                  kind={ButtonType.ROUND}
                  type="submit"
                  style={{ minWidth: "80px", marginLeft: "15px" }}
                  loader={
                    loading && (
                      <>
                        <Loader
                          color="white"
                          size={19}
                          style={{ marginRight: "10px" }}
                          borderWidth="3px"
                        />
                      </>
                    )
                  }
                />
              </FormGroup>
            </form>
          </SearchWrapper>

          <GridLeft
            areaCode={ownAreaCode}
            data={data}
            setSelected={setSelected}
            setIsAddBtnClicked={setIsAddBtnClicked}
            fields={fields}
            columns={columns}
            menuId={menuId}
            rowIndex={rowIndex0}
            style={{
              height: `calc(100% - 44px)`,
              minWidth: `${leftSideWidth}px`,
            }}
          />
        </LeftSide>
        <RightSide
          style={{
            width: `calc(100% - ${linePos}px)`,
          }}
        >
          <Form
            ref={formRef}
            dataCommonDic={dataCommonDic}
            fetchData={fetchData}
            areaCode={watch("areaCode")}
            selected={selected}
            ownAreaCode={ownAreaCode}
            isAddBtnClicked={isAddBtnClicked}
            setIsAddBtnClicked={setIsAddBtnClicked}
            prepareSearchFormValues={prepareSearchFormValues}
            userInfo={userInfo}
            cuCustgubunDic={cuCustgubunDic}
            setCuCustgubunDic={setCuCustgubunDic}
            cuJyCodeDic={cuJyCodeDic}
            setCuJyCodeDic={setCuJyCodeDic}
            selectedSupplyTab={selectedSupplyTab}
            cuSwCodeDic={cuSwCodeDic}
            setCuSwCodeDic={setCuSwCodeDic}
            parentFetchData65={fetchData65}
            setSelectedUserInfo={setSelectedUserInfo}
            selectedUserInfo={selectedUserInfo}
            menuId={menuId}
            setUserInfo={setUserInfo}
          />
        </RightSide>
        {showDraggableLine()}
      </MainWrapper>
    </>
  );
}

export default CM1200;
