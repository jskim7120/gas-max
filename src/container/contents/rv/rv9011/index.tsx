import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import CreateReport from "app/hook/createReport";
import { RV9011SEARCH } from "app/path";
import { SearchWrapper } from "../../commonStyle";
import { Select, FormGroup, Label } from "components/form/style";
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
import { DateWithoutDash, GetYear, GetMonth } from "helpers/dateFormat";
import { ISEARCH } from "./model";
import { columns, fields, layout } from "./data";
import CheckBox from "components/checkbox";

function RV9011({
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
  } = CreateReport("RV", "RV9011", menuId, RV9011SEARCH);
  const gridRef = useRef() as React.MutableRefObject<any>;

  const [toggler, setToggler] = useState<boolean>(true);

  const { register, handleSubmit, reset, control, watch } = useForm<ISEARCH>({
    mode: "onSubmit",
  });

  useEffect(() => {
    if (dataCommonDic?.dataInit) {
      resetForm("reset");
    }
  }, [dataCommonDic]);

  useEffect(() => {
    if (watch("gjMonth")) {
      handleGjMonthChange(watch("gjMonth"));
      setToggler((prev) => !prev);
    }
  }, [watch("gjMonth")]);

  const handleGjMonthChange = (gjMonth: string) => {
    let year = GetYear(gjMonth);
    const month = GetMonth(gjMonth);

    let tempMonth;
    let tempYear = year;

    for (let i = 0; i < 3; i++) {
      tempMonth = +month + i;

      if (tempMonth > 12) {
        tempMonth = tempMonth - 12;
        if (tempYear === year) {
          tempYear = +tempYear + 1;
        }
      }
      tempMonth < 10 && (tempMonth = `0${tempMonth}`);

      (layout[4 + i] as any).header.text = `${tempYear}-${tempMonth}월`;
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
    params.gjMonth = DateWithoutDash(params.gjMonth);
    fetchData(params);
  };

  const resetForm = (type: string) => {
    if (type === "reset") {
      const init = dataCommonDic.dataInit[0];
      reset({
        areaCode: dataCommonDic.areaCode[0].code,
        ...init,
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
        <SearchWrapper className="h35">
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
            <Label style={{ minWidth: "80px" }}>검침년월</Label>
            <Controller
              control={control}
              name="gjMonth"
              render={({ field }) => (
                <CustomDatePicker
                  {...field}
                  style={{ width: "120px" }}
                  showMonthYearPicker
                />
              )}
            />
            <Label style={{ minWidth: "80px" }}>담당사원</Label>
            <Select register={register("swCode")} width={InputSize.i120}>
              {dataCommonDic?.swCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>

            <Label style={{ minWidth: "90px" }}>관리책임자</Label>
            <Select register={register("cuCustgubun")} width={InputSize.i120}>
              {dataCommonDic?.cuCustgubun?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <Label style={{ minWidth: "80px" }}>지역구분</Label>
            <Select register={register("jyCode")} width={InputSize.i120}>
              {dataCommonDic?.jyCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <CheckBox
              title="사용기간 자동 적용"
              rtl
              style={{ marginLeft: "20px" }}
              register={register("sChk")}
            />
          </FormGroup>
        </SearchWrapper>
      </form>
      <BasicGrid
        menuId={menuId}
        ref={gridRef}
        areaCode={ownAreaCode}
        columns={columns}
        fields={fields}
        data={data}
        rowIndex={data?.length > 1 ? data.length - 1 : 0}
        style={{ height: "calc(100% - 84px)" }}
        layout={layout}
        gridChangeField={toggler}
      />
    </>
  );
}

export default RV9011;
