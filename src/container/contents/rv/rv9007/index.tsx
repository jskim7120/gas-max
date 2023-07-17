import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import CreateReport from "app/hook/createReport";
import { RV9007SEARCH } from "app/path";
import { SearchWrapper } from "../../commonStyle";
import { Select, FormGroup, Label, Input } from "components/form/style";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import {
  MagnifyingGlass,
  ResetGray,
  PrintPreview,
  Print,
} from "components/allSvgIcon";
import CustomDatePicker from "components/customDatePicker";
import Loader from "components/loader";
import BasicGrid from "components/basicGrid";
import Viewer from "components/viewer";
import { GetMonth } from "helpers/dateFormat";
import { ISEARCH } from "./model";
import { columns0, fields0, layout0 } from "./data/data0";
import { columns1, fields1, layout1 } from "./data/data1";
import { DateWithoutDash } from "helpers/dateFormat";

function RV9007({
  depthFullName,
  menuId,
  ownAreaCode,
}: {
  depthFullName: string;
  menuId: string;
  ownAreaCode: string;
}) {
  const {
    data,
    setData,
    selected,
    setSelected,
    loading,
    fetchData,
    dispatch,
    dataCommonDic,
  } = CreateReport("RV", "RV9007", menuId, RV9007SEARCH);
  const gridRef = useRef() as React.MutableRefObject<any>;

  const [toggler, setToggler] = useState<boolean>(true);

  const { register, handleSubmit, reset, control, watch, getValues } =
    useForm<ISEARCH>({
      mode: "onSubmit",
    });

  useEffect(() => {
    if (dataCommonDic?.dataInit) {
      resetForm("reset");
    }
  }, [dataCommonDic]);

  useEffect(() => {
    if (watch("gjGumym")) {
      handleGjGumymChange(watch("gjGumym"));
      setToggler((prev) => !prev);
    }
    if (watch("reportKind")) {
      setData([]);
    }
  }, [watch("reportKind"), watch("gjGumym")]);

  const handleGjGumymChange = (gjGumym: string) => {
    const month = GetMonth(gjGumym);
    let j;
    for (let i = 0; i < 12; i++) {
      j = i + +month;
      j > 12 && (j = j - 12);
      selectColumns().columns[4 + i].header.text = `${j}월`;
    }
  };

  const selectColumns = () => {
    switch (watch("reportKind")) {
      case "0":
        return { columns: columns0, fields: fields0, layout: layout0 };
      case "1":
        return { columns: columns1, fields: fields1, layout: layout1 };
      default:
        return { columns: columns0, fields: fields0, layout: layout0 };
    }
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
  const submit = (params: ISEARCH) => {
    params.gjGumym = DateWithoutDash(params.gjGumym);
    fetchData(params);
  };

  const resetForm = (type: string) => {
    if (type === "reset") {
      const init = dataCommonDic.dataInit[0];
      reset({
        areaCode: dataCommonDic.areaCode[0].code,
        reportKind: init?.reportKind,
        gjGumym: init?.gjGumym,
        cuName: init?.cuName,
        cuCutype: init?.cuCutype,
        swCode: init?.swCode,
        cuStae: init?.cuStae,
        jyCode: init?.jyCode,
        cuRh20: init?.cuRh20,
      });
    }
  };

  const handleReset = () => {
    if (dataCommonDic?.dataInit) {
      resetForm("reset");
    }
    setData([]);
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)} autoComplete="off">
        <SearchWrapper className="h35 mt5">
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
            <Label style={{ minWidth: "80px" }}>보고서종류</Label>
            <Select register={register("reportKind")} width={InputSize.i140}>
              {dataCommonDic?.reportKind?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <div className="buttons ml30">
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
        <SearchWrapper style={{ flexDirection: "column", alignItems: "start" }}>
          <FormGroup>
            <Label style={{ minWidth: "80px" }}>시작월</Label>
            <Controller
              control={control}
              {...register("gjGumym")}
              render={({ field }) => (
                <CustomDatePicker
                  {...field}
                  style={{ width: "120px" }}
                  showMonthYearPicker
                />
              )}
            />
            <Input
              label="건물명"
              register={register("cuName")}
              labelStyle={{ minWidth: "80px" }}
              inputSize={InputSize.i160}
            />

            <Label style={{ minWidth: "80px" }}>담당사원</Label>
            <Select register={register("swCode")} width={InputSize.i120}>
              {dataCommonDic?.swCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <Label style={{ minWidth: "100px" }}>지역구분</Label>
            <Select register={register("jyCode")} width={InputSize.i120}>
              {dataCommonDic?.jyCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
          <FormGroup>
            <Label style={{ minWidth: "286px" }}>소비형태</Label>
            <Select register={register("cuCutype")} width={InputSize.i120}>
              {dataCommonDic?.cuCutype?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>

            <Label style={{ minWidth: "120px" }}>거래상태</Label>
            <Select register={register("cuStae")} width={InputSize.i120}>
              {dataCommonDic?.cuStae?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <Label style={{ minWidth: "100px" }}>조정기 압력</Label>
            <Select register={register("jyCode")} width={InputSize.i120}>
              {dataCommonDic?.jyCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <Label style={{ minWidth: "68px" }}>mmH20</Label>
          </FormGroup>
        </SearchWrapper>
      </form>
      <BasicGrid
        menuId={menuId}
        ref={gridRef}
        areaCode={ownAreaCode}
        {...selectColumns()}
        data={data}
        rowIndex={data?.length > 1 ? data.length - 1 : 0}
        style={{ height: "calc(100% - 88px)" }}
        gridChangeField={toggler}
      />
    </>
  );
}

export default RV9007;
