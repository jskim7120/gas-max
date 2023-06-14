import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import CreateScreen from "app/hook/createScreen";
import CustomDatePicker from "components/customDatePicker";
import Button from "components/button/button";
import { MagnifyingGlassBig } from "components/allSvgIcon";
import { apiGet } from "app/axios";
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

const minWidth = "905px";
const leftSideWidth: number = 922;

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
    isAddBtnClicked,
    setIsAddBtnClicked,
    activeTabId,
    fetchData,
    showDraggableLine,
    isOpen,
    gridIndexes,
    dispatch,
    dataCommonDic,
    linePos,
  } = CreateScreen("GR", "GR1300", menuId, GR1300SEARCH, leftSideWidth);

  useEffect(() => {
    if (dataCommonDic) {
      reset({
        areaCode: dataCommonDic?.areaCode[0].code,
        sBuCode: dataCommonDic?.sBuCode[0].code,
        sDate: dataCommonDic?.sDate[0].code,
        eDate: dataCommonDic?.eDate[0].code,
      });
    }
  }, [dataCommonDic]);

  const submit = async (data: any) => {
    if (data.sDate !== undefined) {
      data.sDate = DateWithoutDash(data.sDate);
    }
    if (data.eDate !== undefined) {
      data.eDate = DateWithoutDash(data.eDate);
    }
    fetchData(data);
  };

  return (
    <>
      <SearchWrapper className="h35 mt5">
        <FormGroup>
          {ownAreaCode === "00" && (
            <>
              <Label style={{ minWidth: "62px" }}>영업소</Label>

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
          <SearchWrapper
            style={{ minWidth: `${leftSideWidth}px`, padding: "3px 15px" }}
          >
            <form
              onSubmit={handleSubmit(submit)}
              autoComplete="off"
              style={{ minWidth: minWidth }}
            >
              <FormGroup>
                <Label style={{ minWidth: "auto" }}>지급기간</Label>
                <Controller
                  control={control}
                  {...register("sDate")}
                  render={({ field: { onChange, value, name } }) => (
                    <CustomDatePicker
                      value={value}
                      onChange={onChange}
                      name={name}
                    />
                  )}
                />
                <Controller
                  control={control}
                  {...register("eDate")}
                  render={({ field: { onChange, value, name } }) => (
                    <CustomDatePicker
                      value={value}
                      onChange={onChange}
                      name={name}
                    />
                  )}
                />

                <Label>매입처명</Label>
                <Select register={register("sBuCode")}>
                  {dataCommonDic?.sBuCode?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>

                <Button
                  text="검색"
                  icon={!loading && <MagnifyingGlassBig width="15px" />}
                  style={{ marginRight: "5px" }}
                  color={ButtonColor.DANGER}
                  type="submit"
                  loader={
                    loading && (
                      <>
                        <Loader
                          color="white"
                          size={15}
                          borderWidth="2px"
                          style={{ marginRight: "10px" }}
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
            fields={fields}
            columns={columns}
            setSelected={setSelected}
            menuId={menuId}
            rowIndex={0}
            style={{
              height: `calc(100% - 82px)`,
              minWidth: `${leftSideWidth}px`,
            }}
          />
          <Table data={data} style={{ minWidth: minWidth, width: "922px" }} />
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
            setIsAddBtnClicked={setIsAddBtnClicked}
          />
        </RightSide>
        {showDraggableLine()}
      </MainWrapper>
    </>
  );
}

export default GR1300;
