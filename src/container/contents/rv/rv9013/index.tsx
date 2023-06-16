import React, { useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import CreateReport from "app/hook/createReport";
import { RV9013SEARCH } from "app/path";
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
import { DateWithoutDash } from "helpers/dateFormat";
import { ISEARCH } from "./model";
import { columns, fields } from "./data";
import CheckBox from "components/checkbox";
import {
  Item,
  RadioButton,
  RadioButtonLabel,
} from "components/radioButton/style";

function RV9013({
  depthFullName,
  menuId,
  areaCode,
}: {
  depthFullName: string;
  menuId: string;
  areaCode: string;
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
  } = CreateReport("RV", "RV9013", menuId, RV9013SEARCH);
  const gridRef = useRef() as React.MutableRefObject<any>;

  const { register, handleSubmit, reset, control } = useForm<ISEARCH>({
    mode: "onSubmit",
  });

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
  const submit = (params: ISEARCH) => {
    fetchData(params);
  };

  const resetForm = (type: string) => {
    if (type === "reset") {
      const init = dataCommonDic.dataInit[0];
      reset({
        areaCode: dataCommonDic.areaCode[0].code,
        cuRdanga: init?.cuRdanga,
        cuRdangaSign: init?.cuRdangaSign,
        swCode: init?.swCode,
        cuRh20: init?.cuRh20,
        cuPer: init?.cuPer,
        cuDc: init?.cuDc,
        cuStae: init?.cuStae,
        jyCode: init?.jyCode,
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
            {areaCode === "00" && (
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
            <Item>
              <RadioButton
                type="radio"
                value="2"
                {...register(`sChk`)}
                id="2"
                //onChange={() => setSType2("2")}
              />
              <RadioButtonLabel htmlFor={``} style={{ width: "120px" }}>
                단가적용 구분 전체
              </RadioButtonLabel>
            </Item>
            <Item>
              <RadioButton
                type="radio"
                value="2"
                {...register(`cuRdanga`)}
                id="2"
                //onChange={() => setSType2("2")}
              />
              <RadioButtonLabel htmlFor={``} style={{ width: "105px" }}>
                개별단가 지정
              </RadioButtonLabel>
            </Item>
            <Label style={{ minWidth: "80px" }}>거래처</Label>
            <Select register={register("cuRdanga")} width={InputSize.i120}>
              {dataCommonDic?.cuRdanga?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <Item>
              <RadioButton
                type="radio"
                value="2"
                {...register(`cuRdangaSign`)}
                id="2"
                //onChange={() => setSType2("2")}
              />
              <RadioButtonLabel htmlFor={``} style={{ width: "105px" }}>
                할인단가 지정
              </RadioButtonLabel>
            </Item>
            <Label style={{ minWidth: "80px" }}>거래처</Label>
            <Select register={register("cuRdangaSign")} width={InputSize.i120}>
              {dataCommonDic?.cuRdangaSign?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
          <FormGroup>
            <Label style={{ minWidth: "80px" }}>담당사원</Label>
            <Select register={register("swCode")} width={InputSize.i120}>
              {dataCommonDic?.swCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <Label style={{ minWidth: "80px" }}>조정기 압력</Label>
            <Select register={register("cuRh20")} width={InputSize.i120}>
              {dataCommonDic?.cuRh20?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <Label style={{ minWidth: "80px" }}>연체율</Label>
            <Select register={register("cuPer")} width={InputSize.i120}>
              {dataCommonDic?.cuPer?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <Label style={{ minWidth: "80px" }}>할인율</Label>
            <Select register={register("cuDc")} width={InputSize.i120}>
              {dataCommonDic?.cuDc?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <Label style={{ minWidth: "80px" }}>거래상태</Label>
            <Select register={register("cuStae")} width={InputSize.i120}>
              {dataCommonDic?.cuStae?.map((obj: any, idx: number) => (
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
          </FormGroup>
        </SearchWrapper>
      </form>
      <BasicGrid
        menuId={menuId}
        ref={gridRef}
        areaCode={areaCode}
        columns={columns}
        fields={fields}
        data={data}
        rowIndex={data?.length > 1 ? data.length - 1 : 0}
        style={{ height: "calc(100% - 52px)" }}
      />
    </>
  );
}

export default RV9013;
