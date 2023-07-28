import { useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import getSimpleData from "app/hook/getSimpleData";
import { RV9005SEARCH } from "app/path";
import { IRV9005SEARCH } from "./model";
import { SearchWrapper } from "../../commonStyle";
import { MagnifyingGlassBig, ResetGray } from "components/allSvgIcon";
import CustomDatePicker from "components/customDatePicker";
import {
  Item,
  RadioButton,
  RadioButtonLabel,
} from "components/radioButton/style";
import { Select, FormGroup, Label, Input } from "components/form/style";
import Loader from "components/loader";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import { columns, fields } from "./data";
import {
  DateWithoutDash,
  DateWithoutDashOnlyYearMonth,
} from "helpers/dateFormat";
import BasicGrid from "components/basicGrid";
import { PrintPreview, Print } from "components/allSvgIcon";

const radioOptions = [
  {
    label: "검침 일자",
    id: "1",
  },
  {
    label: "지로 발행일",
    id: "2",
  },
  {
    label: "등록 일자",
    id: "3",
  },
  {
    label: "수정 일자",
    id: "4",
  },
];

function RV9005({
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
    "RV9005",
    RV9005SEARCH
  );
  const gridRef = useRef() as React.MutableRefObject<any>;

  const { register, handleSubmit, reset, control, watch } =
    useForm<IRV9005SEARCH>({
      mode: "onSubmit",
    });

  useEffect(() => {
    if (dataCommonDic) {
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
    if (params.sType1) {
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

    if (params.sType2 === "0") {
      delete params.sCuSwCode;
      delete params.sCuCustgubun;
    } else if (params.sType2 === "1") {
      delete params.sSwCode;
      delete params.sCuCustgubun;
    } else if (params.sType2 === "2") {
      delete params.sSwCode;
      delete params.sCuSwCode;
    }

    fetchData(params);
  };

  const resetForm = (type: string) => {
    if (type === "reset") {
      if (dataCommonDic?.dataInit) {
        const init = dataCommonDic.dataInit[0];
        reset({
          areaCode: dataCommonDic?.areaCode[0].code,
          sType1: init?.sType1,
          sGjGumymF: init?.sGjGumymF,
          sGjSnoF: init?.sGjSnoF,
          sGjGumymT: init?.sGjGumymT,
          sGjSnoT: init?.sGjSnoT,
          sType2: init?.sType2,
          sSwCode: init?.sSwCode,
          sCuSwCode: init?.sCuSwCode,
          sCuCustgubun: init?.sCuCustgubun,
          sJyCode: init?.sJyCode,
          sSukumtype: init?.sSukumtype,
          sSort: init?.sSort,
          sDateF: init?.sDateF,
          sDateT: init?.sDateT,
          sRh20: init?.sRh20,
        });
      }
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
        <SearchWrapper className="h35 ">
          <FormGroup>
            {ownAreaCode === "00" && (
              <>
                <Label style={{ minWidth: "88px" }}>영업소</Label>
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
              <RadioButtonLabel htmlFor={``}>검침 년월</RadioButtonLabel>
            </Item>
            <Controller
              control={control}
              name="sGjGumymF"
              render={({ field }) => (
                <CustomDatePicker
                  {...field}
                  showMonthYearPicker
                  style={{ width: "90px" }}
                  readOnly={watch("sType1") !== "0"}
                />
              )}
            />
            <Select
              register={register("sGjSnoF")}
              style={{ width: "41px", marginLeft: "-4px" }}
              disabled={watch("sType1") !== "0"}
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
                  readOnly={watch("sType1") !== "0"}
                />
              )}
            />
            <Select
              register={register("sGjSnoT")}
              style={{ width: "41px", marginLeft: "-4px" }}
              disabled={watch("sType1") !== "0"}
            >
              {dataCommonDic?.sGjSnoT?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <Item style={{ marginRight: "2px" }}>
              <RadioButton
                type="radio"
                value="0"
                {...register(`sType2`)}
                id="0"
              />
              <RadioButtonLabel
                htmlFor={``}
                style={{
                  marginLeft: "100px",
                  minWidth: "110px",
                }}
              >
                거래처 담당사원
              </RadioButtonLabel>
            </Item>
            <Select
              register={register("sSwCode")}
              disabled={watch("sType2") !== "0"}
              width={InputSize.i120}
            >
              {dataCommonDic?.sSwCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <Input
              label="건물명"
              register={register("sCuName")}
              labelStyle={{ minWidth: "90px" }}
              inputSize={InputSize.i120}
            />
          </FormGroup>
          <FormGroup>
            {radioOptions.map((option, index) => (
              <Item key={index} style={{ marginRight: "25px" }}>
                <RadioButton
                  type="radio"
                  value={option.id}
                  {...register(`sType1`)}
                  id={option.id}
                />
                <RadioButtonLabel htmlFor={`${option.label}`}>
                  {option.label}
                </RadioButtonLabel>
              </Item>
            ))}
            <Item style={{ marginRight: "2px" }}>
              <RadioButton
                type="radio"
                value="1"
                {...register(`sType2`)}
                id="1"
              />
              <RadioButtonLabel
                htmlFor={``}
                style={{
                  marginLeft: "23px",
                  minWidth: "110px",
                }}
              >
                체적 검침 사원
              </RadioButtonLabel>
            </Item>
            <Select
              register={register("sCuSwCode")}
              disabled={watch("sType2") !== "1"}
              width={InputSize.i120}
            >
              {dataCommonDic?.sCuSwCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <Label style={{ minWidth: "90px" }}>지역 분류</Label>
            <Select register={register("sJyCode")} width={InputSize.i120}>
              {dataCommonDic?.sJyCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            <Label style={{ minWidth: "88px" }}>기간</Label>
            <Controller
              control={control}
              name="sDateF"
              render={({ field }) => (
                <CustomDatePicker
                  {...field}
                  style={{ width: "130px" }}
                  readOnly={watch("sType1") === "0"}
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
                  readOnly={watch("sType1") === "0"}
                />
              )}
            />

            <Item style={{ marginRight: "2px" }}>
              <RadioButton
                type="radio"
                value="2"
                {...register(`sType2`)}
                id="2"
              />
              <RadioButtonLabel
                htmlFor={``}
                style={{
                  marginLeft: "100px",
                  minWidth: "110px",
                }}
              >
                관리 책임자 분류
              </RadioButtonLabel>
            </Item>
            <Select
              register={register("sCuCustgubun")}
              disabled={watch("sType2") !== "2"}
              width={InputSize.i120}
            >
              {dataCommonDic?.sCuCustgubun?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>

            <Label style={{ minWidth: "90px" }}>수금 방법</Label>
            <Select register={register("sSukumtype")} width={InputSize.i120}>
              {dataCommonDic?.cuSukumtype?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>

            <Label style={{ minWidth: "105px" }}>조정기 압력</Label>
            <Select register={register("sRh20")} width={InputSize.i100}>
              {dataCommonDic?.sRh20?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <p>mmH20</p>
            <Label style={{ minWidth: "90px" }}>정렬 순서</Label>
            <Select register={register("sSort")} width={InputSize.i100}>
              {dataCommonDic?.sSort?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
        </SearchWrapper>
      </form>
      <BasicGrid
        areaCode={ownAreaCode}
        ref={gridRef}
        data={data}
        columns={columns}
        fields={fields}
        rowIndex={data?.length > 1 ? data.length - 1 : 0}
        menuId={menuId}
        style={{ height: "calc(100% - 156px)" }}
      />
    </>
  );
}

export default RV9005;
