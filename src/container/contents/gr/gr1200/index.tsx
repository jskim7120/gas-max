import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import CreateScreen from "app/hook/createScreen";
import { setRowIndex } from "app/state/tab/tabSlice";
import { GR1200SEARCH } from "app/path";
import { apiGet } from "app/axios";
import CustomDatePicker from "components/customDatePicker";
import Button from "components/button/button";
import {
  ResetGray,
  ExcelIcon,
  MagnifyingGlassBig,
} from "components/allSvgIcon";
import { ISEARCH } from "./model";
import {
  MainWrapper,
  LeftSide,
  RightSide,
  SearchWrapper,
} from "../../commonStyle";
import { Select, Label, FormGroup } from "components/form/style";
import { ButtonColor, InputSize } from "components/componentsType";
import GridLeft from "components/grid";
import Form from "./form";
import Loader from "components/loader";
import { DateWithoutDash } from "helpers/dateFormat";
import Table from "./table";
import { fields, columns, layout } from "./data";

const minWidth = "925px";
const leftSideWidth: number = 942;

function GR1200({
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
    rowIndex,
    dispatch,
    dataCommonDic,
    addBtnUnclick,
    linePos,
    showDraggableLine,
    show4Btns,
    handleClickDelete,
  } = CreateScreen("GR", "GR1200", menuId, GR1200SEARCH, leftSideWidth);

  const [data2, setData2] = useState({});

  useEffect(() => {
    if (dataCommonDic) {
      reset({
        areaCode: dataCommonDic?.areaCode[0].code,
        sBcBuCode: dataCommonDic?.sBcBuCode[0].code,
        sDate: dataCommonDic?.sDate[0].code,
        eDate: dataCommonDic?.eDate[0].code,
      });
      fetchData(
        {
          areaCode: dataCommonDic?.areaCode[0].code,
          sBcBuCode: dataCommonDic?.sBcBuCode[0].code,
          sDate: dataCommonDic?.sDate[0].code,
          eDate: dataCommonDic?.eDate[0].code,
        },
        "last"
      );
    }
  }, [dataCommonDic]);

  useEffect(() => {
    if (selected) {
      if (isAddBtnClicked) {
        addBtnUnclick();
      }
    }
  }, [selected]);

  const fetchData = async (params: any, pos: string = "") => {
    params.sDate = DateWithoutDash(params.sDate);
    params.eDate = DateWithoutDash(params.eDate);

    setLoading(true);
    const res = await apiGet(GR1200SEARCH, params);

    if (res) {
      if (res?.realgridData) {
        const lastIndex =
          res?.realgridData?.length > 0 ? res.realgridData.length - 1 : 0;
        setData(res?.realgridData);

        if (pos === "last") {
          setSelected(res.realgridData[lastIndex]);

          dispatch(setRowIndex({ menuId: menuId, row: lastIndex, grid: 0 }));
        } else {
          if (rowIndex) {
            if (rowIndex > lastIndex) {
              dispatch(
                setRowIndex({ menuId: menuId, row: lastIndex, grid: 0 })
              );
              setSelected(res.realgridData[lastIndex]);
            } else {
              setSelected(res.realgridData[rowIndex]);
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
    setIsAddBtnClicked(false);
  };

  const submit = async (params: any) => {
    params.sDate = DateWithoutDash(params.sDate);
    params.eDate = DateWithoutDash(params.eDate);
    fetchData(params, "last");
  };

  return (
    <>
      <SearchWrapper className="h35">
        <FormGroup>
          {ownAreaCode === "00" && (
            <>
              <Label style={{ minWidth: "40px" }}>영업소</Label>
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
            style={{ minWidth: minWidth }}
          >
            <SearchWrapper
              className="h35"
              style={{
                minWidth: `${leftSideWidth}px`,
              }}
            >
              <FormGroup>
                <Label style={{ minWidth: "48px" }}>기간</Label>
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

                <Label style={{ minWidth: "80px" }}>매입처</Label>
                <Select register={register("sBcBuCode")} width={InputSize.i160}>
                  {dataCommonDic?.sBcBuCode?.map((obj: any, idx: number) => (
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
                    color={ButtonColor.LIGHT}
                  />
                  <Button
                    text="엑셀"
                    icon={<ExcelIcon width="18px" />}
                    color={ButtonColor.LIGHT}
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
            menuId={menuId}
            rowIndex={rowIndex}
            setSelected={setSelected}
            style={{
              height: `calc(100% - 209px)`,
              minWidth: `${leftSideWidth}px`,
            }}
            layout={layout}
          />
          <Table data={data2} style={{ minWidth: minWidth, width: "942px" }} />
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
            handleClickDelete={handleClickDelete}
          />
        </RightSide>
        {showDraggableLine()}
      </MainWrapper>
    </>
  );
}

export default GR1200;
