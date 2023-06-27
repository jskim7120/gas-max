import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import CreateScreen from "app/hook/createScreen";
import { GR1100SEARCH } from "app/path";
import { ButtonColor, ButtonType, InputSize } from "components/componentsType";
import Button from "components/button/button";
import { Input, Select, FormGroup, Label } from "components/form/style";
import {
  MagnifyingGlassBig,
  ExcelIcon,
  Plus,
  Trash,
  Update,
  Reset,
} from "components/allSvgIcon";
import Form from "./form";
import { columns, fields } from "./data";
import { ISEARCH } from "./model";
import GridLeft from "components/grid";
import {
  MainWrapper,
  RightSide,
  LeftSide,
  SearchWrapper,
} from "../../commonStyle";
import Loader from "components/loader";

const minWidth = "763px";
const leftSideWidth: number = 780;

function GR1100({
  depthFullName,
  ownAreaCode,
  menuId,
}: {
  depthFullName: string;
  ownAreaCode: string;
  menuId: string;
}) {
  const { register, handleSubmit, reset, getValues } = useForm<ISEARCH>({
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
    gridIndexes,
    dispatch,
    dataCommonDic,
    linePos,
    formRef,
    addBtnUnclick,
  } = CreateScreen("GR", "GR1100", menuId, GR1100SEARCH, leftSideWidth);

  const [areaCode, setAreaCode] = useState("");

  useEffect(() => {
    if (dataCommonDic) {
      reset({
        sBuGubun: dataCommonDic?.sBuGubun[0].code,
        sBuStae: dataCommonDic?.sBuStae[0].code,
      });
      setAreaCode(dataCommonDic?.areaCode[0].code);

      fetchData({ areaCode: dataCommonDic?.areaCode[0].code });
    }
  }, [dataCommonDic]);

  useEffect(() => {
    if (selected) {
      if (isAddBtnClicked) {
        addBtnUnclick();
      }
    }
  }, [selected]);

  const submit = async (data: ISEARCH) => {
    fetchData({ ...data, areaCode: areaCode });
  };

  return (
    <>
      <SearchWrapper className="h35 mt5">
        <FormGroup>
          {ownAreaCode === "00" && (
            <>
              <Label style={{ minWidth: "50px" }}>영업소</Label>
              <Select
                value={areaCode}
                onChange={(e) => setAreaCode(e.target.value)}
              >
                {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </>
          )}

          {show4Btns({
            style: { marginLeft: ownAreaCode === "00" ? "30px" : "55px" },
          })}
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
              style={{
                minWidth: `${leftSideWidth}px`,
                padding: "3px 15px",
                justifyContent: "flex-start",
              }}
            >
              <FormGroup>
                <Label
                  style={{
                    minWidth: "50px",
                  }}
                >
                  구분
                </Label>
                <Select register={register("sBuGubun")} width={InputSize.i100}>
                  {dataCommonDic?.sBuGubun?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>

                <Input
                  label="매입처명"
                  labelStyle={{ minWidth: "80px" }}
                  register={register("sBuName")}
                  inputSize={InputSize.i130}
                />

                <Label
                  style={{
                    minWidth: "80px",
                  }}
                >
                  거래 상태
                </Label>
                <Select register={register("sBuStae")} width={InputSize.i100}>
                  {dataCommonDic?.sBuStae?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>
              <div className="buttons" style={{ marginLeft: "20px" }}>
                <Button
                  text="검색"
                  icon={!loading && <MagnifyingGlassBig />}
                  kind={ButtonType.ROUND}
                  type="submit"
                  loader={
                    loading && (
                      <>
                        <Loader color="white" size={19} borderWidth="3px" />
                      </>
                    )
                  }
                  style={{ marginRight: "5px", height: "30px" }}
                />

                <Button
                  text="엑셀"
                  icon={<ExcelIcon />}
                  kind={ButtonType.ROUND}
                  color={ButtonColor.SECONDARY}
                  type="button"
                  style={{ height: "30px" }}
                />
              </div>
            </SearchWrapper>
          </form>

          <GridLeft
            areaCode={ownAreaCode}
            data={data}
            fields={fields}
            columns={columns}
            menuId={menuId}
            rowIndex={0}
            setSelected={setSelected}
            setIsAddBtnClicked={setIsAddBtnClicked}
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
            selected={selected}
            ref={formRef}
            fetchData={fetchData}
            setData={setData}
            setSelected={setSelected}
            areaCode={areaCode}
            setAreaCode={setAreaCode}
            setIsAddBtnClicked={setIsAddBtnClicked}
            isAddBtnClicked={isAddBtnClicked}
          />
        </RightSide>
        {showDraggableLine()}
      </MainWrapper>
    </>
  );
}

export default GR1100;
