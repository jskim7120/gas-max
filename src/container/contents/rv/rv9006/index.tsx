import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useGetCommonDictionaryMutation } from "app/api/commonDictionary";
import { apiGet } from "app/axios";
import { ISEARCH } from "./model";
import { RV9006SEARCH } from "app/path";
import CustomDatePicker from "components/customDatePicker";
import Loader from "components/loader";
import Grid from "./grid";
import { SearchWrapper, WrapperContent } from "../../commonStyle";
import {
  Select,
  Wrapper,
  Label,
  Field,
  FormGroup,
} from "components/form/style";
import { fields, columns } from "./data";
import Button from "components/button/button";
import { ButtonColor } from "components/componentsType";
import { Document, MagnifyingGlass, ResetGray } from "components/allSvgIcon";
import {
  Item,
  RadioButton,
  RadioButtonLabel,
} from "components/radioButton/style";
import {
  DateWithoutDash,
  DateWithoutDashOnlyYearMonth,
} from "helpers/dateFormat";
import { PrintPreview, Print } from "components/allSvgIcon";

const radioOptions = [
  {
    label: "검침년월",
    id: "0",
  },
  {
    label: "검침일자",
    id: "1",
  },
];
function RV9006({
  depthFullName,
  menuId,
  areaCode,
}: {
  depthFullName: string;
  menuId: string;
  areaCode: string;
}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sType1, setSType1] = useState(false);

  const [getCommonDictionary, { data: dataCommonDic }] =
    useGetCommonDictionaryMutation();

  const { register, control, reset, handleSubmit } = useForm<ISEARCH>({
    mode: "onSubmit",
  });

  useEffect(() => {
    getCommonDictionary({ groupId: "RV", functionName: "RV9006" });
  }, []);

  useEffect(() => {
    if (dataCommonDic) {
      resetSearchForm();
    }
  }, [dataCommonDic]);

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

  const fetchData = async (params: any) => {
    // try {
    //   setLoading(true);
    //   const { data: dataRV9006 } = await API.get(RV9006SEARCH, {
    //     params: params,
    //   });

    //   if (dataRV9006) {
    //     setData(dataRV9006);
    //   } else {
    //     setData([]);
    //   }

    //   setLoading(false);
    // } catch (err) {
    //   setLoading(false);
    //   setData([]);
    // }

    setLoading(true);
    const dataRV9006 = await apiGet(RV9006SEARCH, params);

    if (dataRV9006) {
      setData(dataRV9006);
    } else {
      setData([]);
    }

    setLoading(false);
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

  const submit = async (params: any) => {
    if (sType1) {
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

  const handleReset = () => {
    if (dataCommonDic?.dataInit) {
      resetSearchForm();
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
                <Label style={{ minWidth: "72px" }}>영업소</Label>

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
                value="0"
                {...register(`sType1`)}
                id="0"
                onChange={() => setSType1(false)}
              />
              <RadioButtonLabel htmlFor={``} style={{ width: "65px" }}>
                검침일자
              </RadioButtonLabel>
            </Item>
            <Controller
              control={control}
              {...register("sDateF")}
              render={({ field: { onChange, value, name } }) => (
                <CustomDatePicker
                  value={value}
                  onChange={onChange}
                  name={name}
                  style={{ marginLeft: "0px" }}
                  readOnly={!sType1}
                />
              )}
            />
            <p
              style={{
                width: "auto",
                display: "block",
                textAlign: "center",
              }}
            >
              ~
            </p>
            <Controller
              control={control}
              {...register("sDateT")}
              render={({ field: { onChange, value, name } }) => (
                <CustomDatePicker
                  value={value}
                  onChange={onChange}
                  name={name}
                  style={{ marginLeft: "0px" }}
                  readOnly={!sType1}
                />
              )}
            />
            <Label style={{ minWidth: "170px" }}>담당사원</Label>
            <Select register={register("sSwCode")} style={{ width: "100%" }}>
              {dataCommonDic?.sSwCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <Label style={{ minWidth: "110px" }}>조정기 압력</Label>
            <Select register={register("sRh20")} style={{ width: "100%" }}>
              {dataCommonDic?.sRh20?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <p>mmH20</p>
          </FormGroup>
          <FormGroup>
            <Item>
              <RadioButton
                type="radio"
                value="1"
                {...register(`sType1`)}
                id="1"
                onChange={() => setSType1(true)}
              />
              <RadioButtonLabel htmlFor={``} style={{ width: "65px" }}>
                년-월 회차
              </RadioButtonLabel>
            </Item>
            <Controller
              control={control}
              {...register("sGjGumymF")}
              render={({ field: { onChange, value, name } }) => (
                <CustomDatePicker
                  value={value}
                  onChange={onChange}
                  name={name}
                  showMonthYearPicker
                  readOnly={sType1}
                />
              )}
            />
            <Select
              register={register("sGjSnoF")}
              disabled={sType1}
              style={{ marginLeft: "0" }}
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
              {...register("sGjGumymT")}
              render={({ field: { onChange, value, name } }) => (
                <CustomDatePicker
                  value={value}
                  onChange={onChange}
                  name={name}
                  showMonthYearPicker
                  readOnly={sType1}
                />
              )}
            />
            <Select
              register={register("sGjSnoT")}
              disabled={sType1}
              style={{ marginLeft: "0" }}
            >
              {dataCommonDic?.sGjSnoT?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <Label style={{ minWidth: "82px" }}>지역분류</Label>
            <Select register={register("sJyCode")} style={{ width: "100%" }}>
              {dataCommonDic?.sJyCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <Label style={{ minWidth: "87px" }}>그룹종류</Label>
            <Select register={register("sOrder")} style={{ width: "100%" }}>
              {dataCommonDic?.sOrder?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
        </SearchWrapper>
      </form>
      <WrapperContent>
        <Grid fields={fields} columns={columns} data={data} />
      </WrapperContent>
    </>
  );
}

export default RV9006;
