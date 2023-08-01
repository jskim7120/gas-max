import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import CreateScreen from "app/hook/createScreen";
import { apiGet } from "app/axios";
import { setRowIndex } from "app/state/tab/tabSlice";
import CustomDatePicker from "components/customDatePicker";
import Button from "components/button/button";
import { MagnifyingGlassBig } from "components/allSvgIcon";
import { ISEARCH } from "./model";
import {
  MainWrapper,
  LeftSide,
  RightSide,
  SearchWrapper,
} from "../../commonStyle";
import { Select, Label, FormGroup } from "components/form/style";
import { ButtonColor } from "components/componentsType";
import GridLeft from "components/grid";
import Form from "./form";
import { GR1300SEARCH } from "app/path";
import Loader from "components/loader";
import { DateWithoutDash } from "helpers/dateFormat";
import Table from "./table";
import { fields, columns } from "./data";

const leftSideWidth: number = 920;

function GR1300({
  depthFullName,
  ownAreaCode,
  menuId,
}: {
  depthFullName: string;
  ownAreaCode: string;
  menuId: string;
}) {
  const { register, handleSubmit, reset, control } = useForm<ISEARCH>({
    mode: "onSubmit",
  });

  const {
    data,
    setData,
    selected,
    setSelected,
    loading,
    setLoading,
    isAddBtnClicked,
    setIsAddBtnClicked,
    showDraggableLine,
    gridIndexes,
    dispatch,
    dataCommonDic,
    linePos,
    show4Btns,
    addBtnUnclick,
    rowIndex,
  } = CreateScreen("GR", "GR1300", menuId, GR1300SEARCH, leftSideWidth);

  const [data2, setData2] = useState({});
  const [bbBuCode, setBbBuCode] = useState([]);

  useEffect(() => {
    if (dataCommonDic) {
      setBbBuCode(dataCommonDic?.bbBuCode);
      reset({
        areaCode: dataCommonDic?.areaCode[0].code,
        sBuCode: dataCommonDic?.sBuCode[0].code,
        sDate: dataCommonDic?.sDate[0].code,
        eDate: dataCommonDic?.eDate[0].code,
      });
    }
  }, [dataCommonDic]);

  const fetchData = async (params: any, pos: string = "") => {
    params.sDate = DateWithoutDash(params.sDate);
    params.eDate = DateWithoutDash(params.eDate);

    setLoading(true);
    const res = await apiGet(GR1300SEARCH, params);

    if (res) {
      if (res?.dataMain) {
        const lastIndex =
          res?.dataMain?.length > 0 ? res.dataMain.length - 1 : 0;
        setData(res?.dataMain);

        if (pos === "last") {
          setSelected(res.dataMain[lastIndex]);
          dispatch(setRowIndex({ menuId: menuId, row: lastIndex, grid: 0 }));
        } else {
          if (rowIndex) {
            if (rowIndex > lastIndex) {
              dispatch(
                setRowIndex({ menuId: menuId, row: lastIndex, grid: 0 })
              );
              setSelected(res.dataMain[lastIndex]);
            } else {
              setSelected(res.dataMain[rowIndex]);
            }
          }
        }
      } else {
        setData([]);
        setSelected({});
      }
      if (res?.totalData) {
        setData2(res?.totalData[0]);
      } else {
        setData2([]);
      }
    } else {
      setData([]);
      setData2([]);
      setSelected({});
    }
    setLoading(false);
  };

  const submit = async (params: any) => {
    if (params.sDate !== undefined) {
      params.sDate = DateWithoutDash(params.sDate);
    }
    if (params.eDate !== undefined) {
      params.eDate = DateWithoutDash(params.eDate);
    }
    fetchData(params);
  };

  return (
    <>
      <SearchWrapper className="h35">
        <FormGroup>
          {ownAreaCode === "00" && (
            <>
              <Label style={{ minWidth: "70px" }}>영업소</Label>
              <Select register={register("areaCode")}>
                {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </>
          )}
        </FormGroup>
        <p>{depthFullName}</p>
      </SearchWrapper>
      <MainWrapper>
        <LeftSide style={{ width: `${linePos}px` }}>
          <form
            onSubmit={handleSubmit(submit)}
            autoComplete="off"
            style={{ minWidth: leftSideWidth }}
          >
            <SearchWrapper
              style={{
                minWidth: `${leftSideWidth}px`,
                padding: "3px 15px",
                justifyContent: "flex-start",
              }}
            >
              <FormGroup>
                <Label style={{ minWidth: "70px" }}>지급기간</Label>
                <Controller
                  control={control}
                  name="sDate"
                  render={({ field }) => <CustomDatePicker {...field} />}
                />
                <Controller
                  control={control}
                  name="eDate"
                  render={({ field }) => <CustomDatePicker {...field} />}
                />

                <Label style={{ minWidth: "90px" }}>매입처명</Label>
                <Select register={register("sBuCode")}>
                  {dataCommonDic?.sBuCode?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
                <div className="buttons ml30">
                  <Button
                    text="검색"
                    icon={!loading && <MagnifyingGlassBig width="15px" />}
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
                </div>
              </FormGroup>
            </SearchWrapper>
          </form>
          <GridLeft
            areaCode={ownAreaCode}
            data={data}
            fields={fields}
            columns={columns}
            setSelected={setSelected}
            menuId={menuId}
            rowIndex={0}
            style={{
              height: `calc(100% - 91px)`,
              minWidth: `${leftSideWidth}px`,
            }}
          />
          <Table data={data} style={{ width: leftSideWidth - 8 }} />
        </LeftSide>
        <RightSide
          style={{
            width: `calc(100% - ${linePos}px)`,
          }}
        >
          <Form
            menuId={menuId}
            dataCommonDic={dataCommonDic}
            selected={selected}
            fetchData={handleSubmit(submit)}
            isAddBtnClicked={isAddBtnClicked}
            addBtnUnclick={addBtnUnclick}
            show4Btns={show4Btns}
            bbBuCode={bbBuCode}
            setBbBuCode={setBbBuCode}
          />
        </RightSide>
        {showDraggableLine()}
      </MainWrapper>
    </>
  );
}

export default GR1300;
