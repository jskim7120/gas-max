import { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import CreateScreen from "app/hook/createScreen";
import { apiGet } from "app/axios";
import { GR1500SEARCH1, GR1500SEARCH2 } from "app/path";
import {
  SearchWrapper,
  MainWrapper,
  LeftSide,
  RightSide,
} from "../../commonStyle";
import { IGR1500SEARCH } from "./model";
import Button from "components/button/button";
import { columns, fields } from "./data";
import { columnsSecond, fieldsSecond } from "./secondData";
import GridLeft from "components/grid";
import Loader from "components/loader";
import { MagnifyingGlass } from "components/allSvgIcon";
import Form from "./form";
import CustomDatePicker from "components/customDatePicker";
import { FormGroup, Select, Label, Field, Input } from "components/form/style";
import { ButtonColor, InputSize } from "components/componentsType";
import { DateWithoutDash } from "helpers/dateFormat";

const minWidth = "927px";
const leftSideWidth: number = 940;

function GR1500({
  depthFullName,
  menuId,
  areaCode,
}: {
  depthFullName: string;
  menuId: string;
  areaCode: string;
}) {
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  const { register, handleSubmit, control, reset, getValues } =
    useForm<IGR1500SEARCH>({
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
  } = CreateScreen("GR", "GR1500", menuId, GR1500SEARCH1, leftSideWidth);

  const [loading2, setLoading2] = useState(false);

  const [dataSecond, setDataSecond] = useState([]);

  const [selected2, setSelected2] = useState<any>({});

  useEffect(() => {
    if (dataCommonDic !== undefined && dataCommonDic) {
      reset({
        areaCode1: dataCommonDic?.areaCode[0].code,
        areaCode: dataCommonDic?.areaCode[0].code,
        sBuGubun: dataCommonDic?.sBuGubun[0].code,
        sBuStae: dataCommonDic?.sBuStae[0].code,
        sDate: dataCommonDic?.sDate[0].code,
        eDate: dataCommonDic?.dDate[0].code,
      });
    }
  }, [dataCommonDic]);

  useEffect(() => {
    if (selected) {
      reset((formValues: any) => ({
        ...formValues,
        sBjBuName: selected ? selected.buCode : "",
      }));
    }
  }, [selected]);

  useEffect(() => {
    if (dataCommonDic) {
      fetchData({ areaCode: dataCommonDic.areaCode[0].code });
    }
  }, [dataCommonDic]);

  const fetchDataSearch2 = async (params: any) => {
    setLoading2(true);
    const data = await apiGet(GR1500SEARCH2, params);
    if (data) {
      setDataSecond(data);
      setSelected2(data[0]);
    }

    setLoading2(false);
  };

  const submitSearch1 = (data: IGR1500SEARCH) => {
    if (data.sDate !== undefined) {
      data.sDate = DateWithoutDash(data.sDate);
    }
    if (data.eDate !== undefined) {
      data.eDate = DateWithoutDash(data.eDate);
    }
    fetchData(data);
  };

  const submitSearch2 = (data: IGR1500SEARCH) => {
    if (data.sDate !== undefined) {
      data.sDate = DateWithoutDash(data.sDate);
    }
    if (data.eDate !== undefined) {
      data.eDate = DateWithoutDash(data.eDate);
    }
    fetchDataSearch2(data);
  };

  return (
    <>
      <SearchWrapper className="h35 mt5">
        <FormGroup>
          {areaCode === "00" && (
            <>
              <Label style={{ minWidth: "34px" }}>영업소</Label>
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
              onSubmit={handleSubmit(submitSearch1)}
              autoComplete="off"
              style={{ minWidth: "925px" }}
            >
              <FormGroup>
                <Label style={{ minWidth: "48px" }}>구분</Label>
                <Select width={InputSize.i130} register={register("sBuGubun")}>
                  {dataCommonDic?.sBuGubun?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>

                <Input
                  label="매입처명"
                  register={register("sBuName")}
                  inputSize={InputSize.i140}
                />

                <Label>거래 상태</Label>
                <Select width={InputSize.i130} register={register("sBuStae")}>
                  {dataCommonDic?.sBuStae?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>

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
              </FormGroup>
            </form>
          </SearchWrapper>
          <GridLeft
            areaCode={areaCode}
            data={data.length > 0 && data}
            setSelected={setSelected}
            fields={fields}
            columns={columns}
            menuId={menuId}
            rowIndex={0}
            // evenFill
            style={{ height: "43%", minWidth: "925px" }}
          />

          <form
            onSubmit={handleSubmit(submitSearch2)}
            style={{ minWidth: "925px" }}
          >
            <SearchWrapper
              className="h35"
              style={{ borderTop: "2px solid #707070" }}
            >
              <FormGroup>
                <p>{depthFullName}</p>
                <p className="big">영업소</p>
                <Select register={register("areaCode1")} name="areaCode1">
                  {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>
            </SearchWrapper>
            <SearchWrapper className="h35">
              <FormGroup>
                <Label style={{ minWidth: "auto" }}>지급 기간</Label>

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

                {/* <Input
                  register={register("sBjBuName")}
                  inputSize={InputSize.md}
                  label="매입처명"
                /> */}

                <Label>매입처명</Label>
                <Select width={InputSize.i130} register={register("sBjBuName")}>
                  {dataCommonDic?.sBjBuName?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>

              <div className="buttons">
                <Button
                  text="검색"
                  icon={!loading2 && <MagnifyingGlass />}
                  color={ButtonColor.DANGER}
                  type="submit"
                  loader={
                    loading2 && (
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
              </div>
            </SearchWrapper>
          </form>

          <GridLeft
            areaCode={areaCode}
            data={dataSecond.length > 0 && dataSecond}
            columns={columnsSecond}
            fields={fieldsSecond}
            setSelected={setSelected}
            // setSelected2={setSelected2}
            menuId={menuId}
            rowIndex={0}
            // evenFill
            style={{ height: "43%", minWidth: `${leftSideWidth}px` }}
          />
        </LeftSide>
        <RightSide
          style={{
            width: `calc(100% - ${linePos}px)`,
          }}
        >
          <Form
            selected={selected}
            selected2={selected2}
            ref={formRef}
            fetchData={fetchData}
            setData={setData}
            setSelected={setSelected}
            setSelected2={setSelected2}
            menuId={menuId}
          />
        </RightSide>
        {showDraggableLine()}
      </MainWrapper>
    </>
  );
}

export default GR1500;
