import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { apiGet } from "app/axios";
import CreateScreen from "app/hook/createScreen";
import { CM1300SEARCH, CM130065 } from "app/path";
import { setRowIndex } from "app/state/tab/tabSlice";
import Button from "components/button/button";
import Loader from "components/loader";
import { MagnifyingGlassBig } from "components/allSvgIcon";
import { ButtonType, InputSize } from "components/componentsType";
import GridLeft from "components/grid";
import { BuildingInfoText } from "components/text";
import {
  MainWrapper,
  SearchWrapper,
  LeftSide,
  RightSide,
} from "../../commonStyle";
import {
  Divider,
  FormGroup,
  Input,
  Select,
  Label,
} from "components/form/style";
import { columns, fields } from "./data";
import Form from "./form";
import CM1300User from "./cm1300User";
import { ISEARCH } from "./model";

const leftSideWidth: number = 840;

function CM1300({
  depthFullName,
  menuId,
  ownAreaCode,
}: {
  depthFullName: string;
  menuId: string;
  ownAreaCode: string;
}) {
  const { handleSubmit, register, reset, watch, getValues } = useForm<ISEARCH>({
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
  } = CreateScreen("CM", "CM1300", menuId, CM1300SEARCH, leftSideWidth);

  const [data65, setData65] = useState([]);
  const [selected65, setSelected65] = useState<any>({});
  const [isAddBtnClicked2, setIsAddBtnClicked2] = useState<boolean>(false);
  const [aptGubun, setAptGubun] = useState<any>([]);
  const [aptJyCode, setAptJyCode] = useState<any>([]);
  const [aptSwCode, setAptSwCode] = useState<any>([]);

  const rowIndex0 = gridIndexes?.find((item) => item.grid === 0)?.row;
  const rowIndex1 = gridIndexes?.find((item) => item.grid === 1)?.row;

  useEffect(() => {
    if (dataCommonDic) {
      reset({ areaCode: dataCommonDic?.areaCode[0].code });
      fetchData({ areaCode: dataCommonDic.areaCode[0].code }, "last");
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

      if (selected.aptCode && selected.areaCode) {
        fetchData65(
          {
            areaCode: selected.areaCode,
            aptCode: selected.aptCode,
          },
          "last"
        );
      }
    }
  }, [selected]);

  const submit = async (params: ISEARCH) => {
    fetchData(params);
  };

  const fetchData65 = async (params: any, pos: string = "") => {
    const res = await apiGet(CM130065, params);

    if (res) {
      if (res?.userCustomer && res?.userCustomer?.length > 0) {
        setData65(res.userCustomer);
        const lastIndex =
          res.userCustomer.length > 0 ? res.userCustomer.length - 1 : 0;
        if (pos === "last") {
          setSelected65(res.userCustomer[lastIndex]);
          dispatch(setRowIndex({ menuId: menuId, row: lastIndex, grid: 1 }));
        } else {
          if (rowIndex1) {
            if (rowIndex1 > lastIndex) {
              dispatch(
                setRowIndex({ menuId: menuId, row: lastIndex, grid: 1 })
              );
              setSelected65(res.userCustomer[lastIndex]);
            } else {
              setSelected65(res.userCustomer[rowIndex1]);
            }
          }
        }
      } else {
        setData65([]);
        setSelected65({});
      }

      if (res?.aptGubun) {
        setAptGubun(res?.aptGubun);
      } else {
        setAptGubun([]);
      }

      if (res?.aptJyCode) {
        setAptJyCode(res?.aptJyCode);
      } else {
        setAptJyCode([]);
      }

      if (res?.aptSwCode) {
        setAptSwCode(res?.aptSwCode);
      } else {
        setAptSwCode([]);
      }
    } else {
      setData65([]);
      setSelected65({});
      setAptSwCode([]);
      setAptJyCode([]);
      setAptGubun([]);
    }
  };

  // const onClickAdd = () => {
  //   addBtnClick();
  //   setData65([]);
  //   setSelected65({});
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
                <BuildingInfoText text="건물" />
                <Input
                  label="코드"
                  labelStyle={{ minWidth: "73px" }}
                  register={register("aptCode")}
                  inputSize={InputSize.i80}
                />
                <Input
                  label="건물명"
                  labelStyle={{ minWidth: "80px" }}
                  register={register("aptName")}
                  inputSize={InputSize.i120}
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
            setIsAddBtnClicked2={setIsAddBtnClicked2}
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
          <div style={{ width: "925px" }}>
            <Form
              ref={formRef}
              dataCommonDic={dataCommonDic}
              areaCode={watch("areaCode")}
              selected={selected}
              fetchData={fetchData}
              setData={setData}
              setSelected={setSelected}
              isAddBtnClicked={isAddBtnClicked}
              setIsAddBtnClicked={setIsAddBtnClicked}
              aptGubun={aptGubun}
              setAptGubun={setAptGubun}
              aptJyCode={aptJyCode}
              setAptJyCode={setAptJyCode}
              aptSwCode={aptSwCode}
              setAptSwCode={setAptSwCode}
              prepareSearchFormValues={getValues}
            />

            <Divider style={{ border: "1px solid #707070" }} />

            <CM1300User
              ownAreaCode={ownAreaCode}
              data={data65}
              mainSelected={selected}
              selected={selected65}
              setSelected={setSelected65}
              fetchData={fetchData65}
              mainIsAddBtnClicked={isAddBtnClicked}
              isAddBtnClicked={isAddBtnClicked2}
              setIsAddBtnClicked={setIsAddBtnClicked2}
              menuId={menuId}
            />
          </div>
        </RightSide>
        {showDraggableLine()}
      </MainWrapper>
    </>
  );
}

export default CM1300;
