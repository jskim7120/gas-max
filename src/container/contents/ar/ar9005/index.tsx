import React, { useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "app/store";
import CreateReportAR9005 from "app/hook/createReportAR9005";
import { AR9005SEARCH } from "app/path";
import { SearchWrapper } from "../../commonStyle";
import { Select, FormGroup, Label, Input } from "components/form/style";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import {
  MagnifyingGlass,
  ExcelIcon,
  ResetGray,
  PrintPreview,
  Print,
} from "components/allSvgIcon";
import CustomDatePicker from "components/customDatePicker";
import Loader from "components/loader";
import BasicGrid from "components/basicGrid";
import Viewer from "components/viewer";
import { DateWithoutDash } from "helpers/dateFormat";
import { ISEARCH, I2 } from "./model";
import { columns1, fields1 } from "./data1";
import { columns2, fields2, layout } from "./data2";
import CheckBox from "components/checkbox";

function AR9004({
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
    data2,
    data3,
    selected,
    selected2,
    loading,
    fetchData,
    dispatch,
    dataCommonDic,
  } = CreateReportAR9005("AR", "AR9005", menuId, AR9005SEARCH);
  const gridRef = useRef() as React.MutableRefObject<any>;

  const { register, handleSubmit, reset, control } = useForm<ISEARCH>({
    mode: "onSubmit",
  });

  const { register: register2, reset: reset2 } = useForm<I2>({
    mode: "onSubmit",
  });

  const infoState = useSelector((state) => state.footer.info);

  useEffect(() => {
    document.getElementById("footerSearchId")?.focus();
  }, []);

  useEffect(() => {
    if (dataCommonDic?.dataInit) {
      resetForm1("reset");
    }
  }, [dataCommonDic]);

  useEffect(() => {
    if (infoState) {
      resetFromFooter();
    }
  }, [infoState]);

  useEffect(() => {
    if (data3 && Object.keys(data3).length > 0) {
      reset2((formValues) => ({
        ...formValues,
        cuZipCode: data3?.cuZipcode,
        cuName: data3?.cuName,
        cuAddr1: data3?.cuAddr1,
        cuAddr2: data3?.cuAddr2,
        cuJyname: data3?.cuJyname,
        cuCutype: data3?.cuCutype,
      }));
    }
  }, [data3]);

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
    params.chkDate = params.chkDate ? "Y" : "N";

    fetchData(params);
  };

  const resetForm1 = (type: string) => {
    if (type === "reset") {
      const init = dataCommonDic.dataInit[0];

      reset({
        areaCode: dataCommonDic.areaCode[0].code,
        sDate: init?.sDate,
        eDate: init?.dDate,
        jpCode: init?.jpCode,
      });
    }
  };

  const resetFromFooter = () => {
    reset((formValues) => ({
      ...formValues,
      areaCode: infoState?.areaCode,
      cuCode: infoState?.cuCode,
    }));

    reset2({
      cuTel: infoState?.cuTel,
      cuHp: infoState?.cuHp,
      cuAddr1: infoState?.cuSaddr1,
      cuBigo1: infoState?.cuBigo1,
      cuBigo2: infoState?.cuBigo2,
      cuTongkum: infoState?.cuTongkum,
      cuJmisu: infoState?.cuJmisu,
      cuCmisu: infoState?.cuCmisu,
    });
  };

  const handleReset = () => {
    if (dataCommonDic?.dataInit) {
      // resetForm2("reset");
    }
  };

  return (
    <>
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
          <div className="buttons ml30">
            <Button
              text="취소"
              icon={<ResetGray />}
              type="button"
              color={ButtonColor.LIGHT}
              onClick={handleReset}
            />
            <Button
              text="엑셀"
              icon={<ExcelIcon width="19px" height="19px" />}
              color={ButtonColor.LIGHT}
              type="button"
              onClick={() => gridRef.current.saveToExcel()}
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
          <Input
            label="거래처코드"
            labelStyle={{ minWidth: "90px" }}
            register={register("cuCode")}
            inputSize={InputSize.i120}
          />
          <Input
            label="거래처명"
            labelStyle={{ minWidth: "90px" }}
            register={register2("cuName")}
            style={{ width: "310px" }}
          />
          <Input
            label="전화"
            labelStyle={{ minWidth: "67px" }}
            register={register2("cuTel")}
            inputSize={InputSize.i150}
          />
          <Input
            label="핸드폰"
            labelStyle={{ minWidth: "67px" }}
            register={register2("cuHp")}
            inputSize={InputSize.i150}
          />
        </FormGroup>
        <FormGroup>
          <Input
            label="주소"
            labelStyle={{ minWidth: "90px" }}
            register={register2("cuZipCode")}
            inputSize={InputSize.i80}
          />
          <Input register={register2("cuAddr1")} style={{ width: "440px" }} />
          <Input register={register2("cuAddr2")} style={{ width: "440px" }} />
        </FormGroup>
        <FormGroup>
          <Input
            label="비고"
            labelStyle={{ minWidth: "90px" }}
            register={register2("cuBigo1")}
            style={{ width: "526px" }}
          />
          <Input register={register2("cuBigo2")} style={{ width: "440px" }} />
        </FormGroup>
        <FormGroup>
          <Input
            label="지역분류"
            labelStyle={{ minWidth: "90px" }}
            register={register2("cuJyname")}
            inputSize={InputSize.i120}
          />
          <Input
            label="소비자 형태"
            labelStyle={{ minWidth: "90px" }}
            register={register2("cuCutype")}
            inputSize={InputSize.i120}
          />
          <Input
            label="용기 보조금"
            labelStyle={{ minWidth: "86px" }}
            register={register2("cuTongkum")}
            inputSize={InputSize.i120}
            textAlign="right"
          />
          <Input
            label="중량 미수"
            labelStyle={{ minWidth: "86px" }}
            register={register2("cuJmisu")}
            inputSize={InputSize.i120}
            textAlign="right"
          />
          <Input
            label="체적미수"
            labelStyle={{ minWidth: "86px" }}
            register={register2("cuCmisu")}
            inputSize={InputSize.i120}
            textAlign="right"
          />
        </FormGroup>
      </SearchWrapper>
      <BasicGrid
        menuId={menuId}
        ref={gridRef}
        columns={columns1}
        fields={fields1}
        data={data}
        rowIndex={data?.length ? data.length - 1 : 0}
        style={{ height: "calc(50% - 120px)" }}
      />
      <form onSubmit={handleSubmit(submit)} autoComplete="off">
        <SearchWrapper>
          <FormGroup>
            <CheckBox rtl title="기간" style={{ margin: "0 5px 0 30px" }} />
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
            <Label style={{ minWidth: "90px" }}>품목</Label>
            <Select register={register("jpCode")} width={InputSize.i120}>
              {dataCommonDic?.jpCode?.map((obj: any, idx: number) => (
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
            </div>
          </FormGroup>
        </SearchWrapper>
      </form>
      <BasicGrid
        menuId={menuId}
        ref={gridRef}
        areaCode={ownAreaCode}
        columns={columns2}
        fields={fields2}
        data={data2}
        rowIndex={data2?.length > 1 ? data.length - 1 : 0}
        style={{ height: "calc(50% - 78px)" }}
        layout={layout}
      />
    </>
  );
}

export default AR9004;
