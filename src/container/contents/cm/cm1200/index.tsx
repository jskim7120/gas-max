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

  const [cuCustgubunDic, setCuCustgubunDic] = useState<any[]>([]);
  const [cuJyCodeDic, setCuJyCodeDic] = useState<any[]>([]);
  const [cuSwCodeDic, setCuSwCodeDic] = useState<any[]>([]);
  const rowIndex0 = gridIndexes?.find((item) => item.grid === 0)?.row;
  const rowIndex1 = gridIndexes?.find((item) => item.grid === 1)?.row;

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
        fetchData65({
          areaCode: selected.areaCode,
          cuCode: selected.cuCode,
        });
      }
    }
  }, [selected]);

  const prepareSearchFormValues = () => {
    const params: any = getValues();
    if (params.dataChk === undefined || params.dataChk === false) {
      delete params.sCuName;
      delete params.dataChk;
    }

    return params;
  };

  const fetchData65 = async (params: any) => {
    const res = await apiGet(CM120065, params);

    if (res) {
      if (res?.userInfo) {
        setUserInfo(res.userInfo);
      } else {
        setUserInfo([]);
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

  // const onClickAdd = () => {
  //   addBtnClick();
  //   setUserInfo([]);
  //   formRef.current.resetForm("clear");
  // };

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
                    {...register("dataChk")}
                    render={({ field: { onChange, value, name } }) => (
                      <CheckBox
                        title="건물명"
                        checked={value}
                        onChange={onChange}
                      />
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
          />
        </RightSide>
        {showDraggableLine()}
      </MainWrapper>
    </>
  );
}

export default CM1200;
