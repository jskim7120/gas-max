import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiGet } from "app/axios";
import CreateScreen from "app/hook/createScreen";
import { GR1600SEARCH } from "app/path";
import { InputSize, ButtonColor, ButtonType } from "components/componentsType";
import Button from "components/button/button";
import { Input, Select, FormGroup, Label } from "components/form/style";
import { MagnifyingGlassBig, ExcelIcon } from "components/allSvgIcon";
import {
  MainWrapper,
  SearchWrapper,
  RightSide,
  LeftSide,
} from "../../commonStyle";
import Form from "./right/form";
import GridLeft from "components/grid";
import { ISEARCH } from "./model";
import { fields, columns } from "./data";
import Loader from "components/loader";

let values1: any;
let labels1: any;
let values2: any;
let labels2: any;
const minWidth = "833px";
const leftSideWidth: number = 850;

function GR1600({
  depthFullName,
  menuId,
  ownAreaCode,
}: {
  depthFullName: string;
  menuId: string;
  ownAreaCode: string;
}) {
  const { register, handleSubmit, reset } = useForm<ISEARCH>({
    mode: "onSubmit",
  });

  const {
    data,
    selected,
    setSelected,
    loading,
    fetchData,
    showDraggableLine,
    dataCommonDic,
    linePos,
  } = CreateScreen("GR", "GR1600", menuId, GR1600SEARCH, leftSideWidth);

  useEffect(() => {
    if (dataCommonDic) {
      reset({
        areaCode: dataCommonDic?.areaCode[0].code,
        buGubun: dataCommonDic?.sBuGubun[0].code,
      });
      fetchData({ areaCode: dataCommonDic?.areaCode[0].code });

      values1 = [];
      labels1 = [];
      values2 = [];
      labels2 = [];

      dataCommonDic?.jpDangaType.map((item: any) => {
        values1.push(item.code);
        labels1.push(item.codeName);
      });

      dataCommonDic?.jpVatKind.map((item: any) => {
        values2.push(item.code);
        labels2.push(item.codeName);
      });
    }
  }, [dataCommonDic]);

  const submit = async (data: any) => {
    if (data?.buGubun && data.buGubun === "9") {
      delete data.buGubun;
    }
    fetchData(data);
  };

  return (
    <>
      <SearchWrapper className="h35 mt5">
        <FormGroup>
          {ownAreaCode === "00" && (
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
                    minWidth: "48px",
                  }}
                >
                  구분
                </Label>
                <Select register={register("buGubun")} width={InputSize.i100}>
                  {dataCommonDic?.sBuGubun?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>

                <Input
                  label="매입처명"
                  register={register("buName")}
                  inputSize={InputSize.i200}
                />
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
                    text="엑셀"
                    icon={<ExcelIcon />}
                    color={ButtonColor.LIGHT}
                    type="button"
                  />
                </div>
              </FormGroup>
            </SearchWrapper>
          </form>

          <GridLeft
            areaCode={ownAreaCode}
            data={data}
            columns={columns}
            fields={fields}
            menuId={menuId}
            rowIndex={data?.length > 1 ? data.length - 1 : 0}
            setSelected={setSelected}
            style={{
              height: `calc(100% - 47px)`,
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
            values1={values1}
            values2={values2}
            labels1={labels1}
            labels2={labels2}
            fetchLeftData={handleSubmit(submit)}
          />
        </RightSide>
        {showDraggableLine()}
      </MainWrapper>
    </>
  );
}

export default GR1600;
