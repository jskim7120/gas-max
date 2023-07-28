import React, { useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import getSimpleData from "app/hook/getSimpleData";
import { ISEARCH } from "./model";
import { RV9006SEARCH } from "app/path";
import CustomDatePicker from "components/customDatePicker";
import Loader from "components/loader";
import { SearchWrapper } from "../../commonStyle";
import { Select, Label, FormGroup } from "components/form/style";
import { fields, columns } from "./data";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import { MagnifyingGlassBig, ResetGray } from "components/allSvgIcon";
import {
  Item,
  RadioButton,
  RadioButtonLabel,
} from "components/radioButton/style";
import {
  DateWithoutDash,
  DateWithoutDashOnlyYearMonth,
} from "helpers/dateFormat";
import BasicGrid from "components/basicGrid";
import { PrintPreview, Print } from "components/allSvgIcon";

function RV9006({
  depthFullName,
  menuId,
  ownAreaCode,
}: {
  depthFullName: string;
  menuId: string;
  ownAreaCode: string;
}) {
  const { data, setData, loading, fetchData, dataCommonDic } = getSimpleData(
    "RV",
    "RV9006",
    RV9006SEARCH
  );
  const gridRef = useRef() as React.MutableRefObject<any>;

  const { register, control, reset, handleSubmit, watch } = useForm<ISEARCH>({
    mode: "onSubmit",
  });

  useEffect(() => {
    if (dataCommonDic) {
      resetSearchForm();
    }
  }, [dataCommonDic]);

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

  const submit = async (params: any) => {
    if (params.sType1 === "0") {
      delete params.sGjGumymF;
      delete params.sGjGumymT;
      delete params.sGjSnoF;
      delete params.sGjSnoT;

      params.sDateF = DateWithoutDash(params.sDateF);
      params.sDateT = DateWithoutDash(params.sDateT);
    } else {
      delete params.sDateF;
      delete params.sDateT;

      params.sGjGumymF = DateWithoutDashOnlyYearMonth(params.sGjGumymF);
      params.sGjGumymT = DateWithoutDashOnlyYearMonth(params.sGjGumymT);
    }

    fetchData(params);
  };

  const resetSearchForm = () => {
    reset({
      areaCode: dataCommonDic?.areaCode[0].code,
      sType1: dataCommonDic?.sType1[0].code,
      sGjGumymF: dataCommonDic?.sGjGumymF[0].code,
      sGjGumymT: dataCommonDic?.sGjGumymT[0].code,
      sGjSnoF: dataCommonDic?.sGjSnoF[0].code,
      sGjSnoT: dataCommonDic?.sGjSnoT[0].code,
      sDateF: dataCommonDic?.sDateF[0].code,
      sDateT: dataCommonDic?.sDateT[0].code,
      sSwCode: dataCommonDic?.sSwCode[0].code,
      sJyCode: dataCommonDic?.sJyCode[0].code,
      sRh20: dataCommonDic?.sRh20[0].code,
      sOrder: dataCommonDic?.sOrder[0].code,
    });
  };

  const handleReset = () => {
    if (dataCommonDic?.dataInit) {
      resetSearchForm();
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
                <Label style={{ minWidth: "94px" }}>영업소</Label>
                <Select register={register("areaCode")}>
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
            <Item style={{ marginRight: "5px" }}>
              <RadioButton
                type="radio"
                value="0"
                {...register(`sType1`)}
                id="0"
              />
              <RadioButtonLabel
                htmlFor={``}
                style={{
                  minWidth: "65px",
                }}
              >
                검침일자
              </RadioButtonLabel>
            </Item>
            <Controller
              control={control}
              name="sDateF"
              render={({ field }) => (
                <CustomDatePicker
                  {...field}
                  style={{ width: "130px" }}
                  readOnly={watch("sType1") !== "0"}
                />
              )}
            />
            <p>~</p>
            <Controller
              control={control}
              name="sDateT"
              render={({ field }) => (
                <CustomDatePicker
                  {...field}
                  style={{ width: "130px" }}
                  readOnly={watch("sType1") !== "0"}
                />
              )}
            />
            <Label style={{ minWidth: "90px" }}>담당사원</Label>
            <Select register={register("sSwCode")} width={InputSize.i120}>
              {dataCommonDic?.sSwCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <Label style={{ minWidth: "90px" }}>조정기 압력</Label>
            <Select register={register("sRh20")} width={InputSize.i120}>
              {dataCommonDic?.sRh20?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <p>mmH20</p>
          </FormGroup>
          <FormGroup>
            <Item style={{ marginRight: "5px" }}>
              <RadioButton
                type="radio"
                value="1"
                {...register(`sType1`)}
                id="1"
              />
              <RadioButtonLabel
                htmlFor={``}
                style={{
                  minWidth: "65px",
                }}
              >
                년-월 회차
              </RadioButtonLabel>
            </Item>
            <Controller
              control={control}
              name="sGjGumymF"
              render={({ field }) => (
                <CustomDatePicker
                  {...field}
                  showMonthYearPicker
                  style={{ width: "90px" }}
                  readOnly={watch("sType1") === "0"}
                />
              )}
            />
            <Select
              register={register("sGjSnoF")}
              style={{ width: "41px", marginLeft: "-4px" }}
              disabled={watch("sType1") === "0"}
            >
              {dataCommonDic?.sGjSnoF?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <p>~</p>
            <Controller
              control={control}
              name="sGjGumymT"
              render={({ field }) => (
                <CustomDatePicker
                  {...field}
                  showMonthYearPicker
                  style={{ width: "90px" }}
                  readOnly={watch("sType1") === "0"}
                />
              )}
            />
            <Select
              register={register("sGjSnoT")}
              disabled={watch("sType1") === "0"}
              style={{ width: "41px", marginLeft: "-4px" }}
            >
              {dataCommonDic?.sGjSnoT?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <Label style={{ minWidth: "90px" }}>지역분류</Label>
            <Select register={register("sJyCode")} width={InputSize.i120}>
              {dataCommonDic?.sJyCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <Label style={{ minWidth: "90px" }}>그룹종류</Label>
            <Select register={register("sOrder")} width={InputSize.i120}>
              {dataCommonDic?.sOrder?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
        </SearchWrapper>
      </form>
      <BasicGrid
        menuId={menuId}
        ref={gridRef}
        columns={columns}
        fields={fields}
        data={data}
        rowIndex={data?.length > 1 ? data.length - 1 : 0}
        style={{ height: "calc(100% - 120px)" }}
      />
    </>
  );
}

export default RV9006;
