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

const radioOptions = [
  {
    label: "전체",
    id: "0",
  },
  {
    label: "개별단가 지정 거래처",
    id: "1",
  },
  {
    label: "할인단가 지정 거래처",
    id: "2",
  },
];

function RV9013({
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
  } = CreateReport("RV", "RV9013", menuId, RV9013SEARCH);
  const gridRef = useRef() as React.MutableRefObject<any>;

  const { register, handleSubmit, reset, control, watch } = useForm<ISEARCH>({
    mode: "onSubmit",
  });

  useEffect(() => {
    if (dataCommonDic?.dataInit) {
      resetForm("reset");
    }
  }, [dataCommonDic]);

  useEffect(() => {
    if (watch("sChk")) {
      setData([]);
    }
  }, [watch("sChk")]);

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

  const selectedOption = watch("sChk");

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
            <Label style={{ paddingRight: "50px" }}>단가적용 구분</Label>

            <Item>
              <RadioButton
                type="radio"
                value={radioOptions[0].id}
                {...register(`sChk`)}
                id={radioOptions[0].id}
                defaultChecked={radioOptions[0].id === "0"}
              />
              {/* <RadioButtonLabel htmlFor={``} style={{ width: "50px" }}>
                전체
              </RadioButtonLabel> */}
              <RadioButtonLabel htmlFor={`${radioOptions[0].label}`}>
                {radioOptions[0].label}
              </RadioButtonLabel>
            </Item>
            <Item>
              <RadioButton
                type="radio"
                value={radioOptions[1].id}
                {...register(`sChk`)}
                id={radioOptions[1].id}
              />
              <RadioButtonLabel htmlFor={`${radioOptions[1].label}`}>
                {radioOptions[1].label}
              </RadioButtonLabel>
            </Item>
            <Select
              register={register("cuRdanga")}
              width={InputSize.i120}
              disabled={
                selectedOption === radioOptions[2].id ||
                selectedOption === radioOptions[0].id
              }
            >
              {dataCommonDic?.cuRdanga?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <Item>
              <Label style={{ marginLeft: "-96px" }}></Label>
              <RadioButton
                type="radio"
                value={radioOptions[2].id}
                {...register(`sChk`)}
                id={radioOptions[2].id}
              />
              <RadioButtonLabel htmlFor={`${radioOptions[2].label}`}>
                {radioOptions[2].label}
              </RadioButtonLabel>
            </Item>
            <Select
              register={register("cuRdangaSign")}
              width={InputSize.i120}
              disabled={
                selectedOption === radioOptions[0].id ||
                selectedOption === radioOptions[1].id
              }
            >
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
            <Label style={{ minWidth: "139px" }}>조정기 압력</Label>
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
        areaCode={ownAreaCode}
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
