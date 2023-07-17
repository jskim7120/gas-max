import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import CreateReport from "app/hook/createReport";
import { RV9008SEARCH } from "app/path";
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
import { DateWithoutDash } from "helpers/dateFormat";
import { ISEARCH } from "./model";
import { columns, fields, layout } from "./data";
import CheckBox from "components/checkbox";
import {
  Item,
  RadioButton,
  RadioButtonLabel,
} from "components/radioButton/style";

const radioOptions = [
  {
    label: "조회구분 ",
    id: "1",
  },
  {
    label: "이익(+)",
    id: "2",
  },
  {
    label: "손실(-)",
    id: "3",
  },
];

function RV9008({
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
  } = CreateReport("RV", "RV9008", menuId, RV9008SEARCH);
  const gridRef = useRef() as React.MutableRefObject<any>;

  const { register, handleSubmit, reset, control } = useForm<ISEARCH>({
    mode: "onSubmit",
  });

  const [sChk0, setSChk0] = useState(false);

  useEffect(() => {
    if (dataCommonDic?.dataInit) {
      resetForm("reset");
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
  const submit = (params: any) => {
    params.sDate = DateWithoutDash(params.sDate);
    params.eDate = DateWithoutDash(params.eDate);
    params.sChk1 = params.sChk1 ? "Y" : "N";
    params.sChk2 = params.sChk2 ? "Y" : "N";
    params.sChk3 = params.sChk3 ? "Y" : "N";
    params.sChk4 = params.sChk4 ? "N" : "Y";
    fetchData(params);
  };

  const resetForm = (type: string) => {
    if (type === "reset") {
      const init = dataCommonDic.dataInit[0];
      reset({
        areaCode: dataCommonDic.areaCode[0].code,
        sDate: init?.sDate,
        eDate: init?.eDate,
        sOrder: init?.sOrder,
        cuName: init?.cuName,
        jyCode: init?.jyCode,
        cuType: init?.cuType,
        swCode: init?.swCode,
        sChk0: init?.sChk0 === "0",
        sChk1: init?.sChk1 === "Y",
        sChk2: init?.sChk2 === "Y",
        sChk3: init?.sChk3 === "Y",
        sChk4: init?.sChk4 === "N",
        sDanga: init?.sDanga,
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
            <CheckBox
              title="체적사용료 할인액차감"
              rtl
              style={{ marginLeft: "16px" }}
              register={register("sChk1")}
            />
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
            <Label style={{ minWidth: "80px" }}>검침기간</Label>
            <Controller
              control={control}
              {...register("sDate")}
              render={({ field: { onChange, value, name } }) => (
                <CustomDatePicker
                  value={value}
                  onChange={onChange}
                  name={name}
                  style={{ width: "120px" }}
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
                  style={{ width: "120px" }}
                />
              )}
            />
            <Input
              label="건물명"
              register={register("cuName")}
              labelStyle={{ minWidth: "76px" }}
              inputSize={InputSize.i160}
            />

            <Label style={{ minWidth: "260px" }}>정렬순서</Label>
            <Select register={register("sOrder")} width={InputSize.i120}>
              {dataCommonDic?.sOrder?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <CheckBox
              title="체적검침 내역별 조회"
              rtl
              style={{ marginLeft: "30px" }}
              register={register("sChk2")}
            />
          </FormGroup>
          <FormGroup>
            <Label style={{ marginLeft: "-38px" }}>조회구분</Label>
            {radioOptions.map((option, index) => (
              <Item key={index}>
                <RadioButton
                  type="radio"
                  value={option.id}
                  {...register(`sChk0`)}
                  id={option.id}
                  onChange={() => setSChk0(true)}
                />
                <RadioButtonLabel htmlFor={`${option.label}`}>
                  {option.label}
                </RadioButtonLabel>
              </Item>
            ))}
            <Label style={{ minWidth: "48px" }}>지역구분</Label>
            <Select register={register("jyCode")} width={InputSize.i120}>
              {dataCommonDic?.jyCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <Label style={{ minWidth: "94px" }}>거래처구분</Label>
            <Select register={register("cuType")} width={InputSize.i120}>
              {dataCommonDic?.cuType?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <Label style={{ minWidth: "80px" }}>담당사원</Label>
            <Select register={register("swCode")} width={InputSize.i120}>
              {dataCommonDic?.swCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <CheckBox
              title="검침사용기간 자동적용"
              rtl
              style={{ marginLeft: "30px" }}
              register={register("sChk3")}
            />
            <CheckBox
              title="Kg단가 지정"
              rtl
              style={{ marginLeft: "30px" }}
              register={register("sChk4")}
            />
            <Input
              register={register("sDanga")}
              labelStyle={{ minWidth: "70px" }}
              inputSize={InputSize.i160}
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
        style={{ height: "calc(100% - 52px)" }}
        layout={layout}
      />
    </>
  );
}

export default RV9008;
