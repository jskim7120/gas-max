import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import CreateReport from "app/hook/createReport";
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
import { ISEARCH } from "./model";
import { columns, fields } from "./data";

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
    setData,
    selected,
    setSelected,
    loading,
    fetchData,
    gridIndexes,
    dispatch,
    dataCommonDic,
  } = CreateReport("AR", "AR9005", menuId, AR9005SEARCH);

  const { register, handleSubmit, reset, control } = useForm<ISEARCH>({
    mode: "onSubmit",
  });

  useEffect(() => {
    if (dataCommonDic?.dataInit) {
      console.log("data:::::", dataCommonDic);

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
  const submit = (params: ISEARCH) => {
    params.sDate = DateWithoutDash(params.sDate);
    params.eDate = DateWithoutDash(params.eDate);
    fetchData(params);
  };

  const resetForm = (type: string) => {
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

  const handleReset = () => {
    if (dataCommonDic?.dataInit) {
      resetForm("reset");
    }
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
              register={register("cuName")}
              inputSize={InputSize.i250}
            />
            <Input
              label="전화"
              labelStyle={{ minWidth: "90px" }}
              register={register("cuTel")}
              inputSize={InputSize.i150}
            />
            <Input
              label="핸드폰"
              labelStyle={{ minWidth: "90px" }}
              register={register("cuHp")}
              inputSize={InputSize.i150}
            />
          </FormGroup>
          <FormGroup>
            <Input
              label="주소"
              labelStyle={{ minWidth: "90px" }}
              register={register("cuZipCode")}
              inputSize={InputSize.i80}
            />
            <Input register={register("cuZipCode")} inputSize={InputSize.i80} />
            <Input register={register("cuAddr1")} inputSize={InputSize.i290} />
            <Input register={register("cuAddr2")} inputSize={InputSize.i290} />
          </FormGroup>
          <FormGroup>
            <Input
              label="비고"
              labelStyle={{ minWidth: "90px" }}
              register={register("cuBigo1")}
              inputSize={InputSize.i290}
            />
            <Input register={register("cuBigo2")} inputSize={InputSize.i290} />
          </FormGroup>
          <FormGroup>
            <Input
              label="지역분류"
              labelStyle={{ minWidth: "90px" }}
              register={register("cuJyname")}
              inputSize={InputSize.i120}
            />
            <Input
              label="소비자 형태"
              labelStyle={{ minWidth: "90px" }}
              register={register("cuCutype")}
              inputSize={InputSize.i120}
            />
            <Input
              label="용기 보조금"
              labelStyle={{ minWidth: "90px" }}
              register={register("cuTongkum")}
              inputSize={InputSize.i120}
            />
            <Input
              label="중량 미수"
              labelStyle={{ minWidth: "90px" }}
              register={register("cuJMisu")}
              inputSize={InputSize.i120}
            />
            <Input
              label="체적미수"
              labelStyle={{ minWidth: "90px" }}
              register={register("cuCMisu")}
              inputSize={InputSize.i120}
            />
          </FormGroup>
        </SearchWrapper>
      </form>
      <BasicGrid
        areaCode={ownAreaCode}
        columns={columns}
        fields={fields}
        data={data}
        rowIndex={data?.length ? data.length : 0}
        style={{ height: "calc(100% - 52px)" }}
      />
    </>
  );
}

export default AR9004;
