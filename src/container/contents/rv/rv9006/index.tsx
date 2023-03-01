import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import API from "app/axios";
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
  formatDateByRemoveDash,
  formatOnlyYearMonthDateByRemoveDash,
  formatDateToStringWithoutDashOnlyYearMonth,
  formatDateToStringWithoutDash,
} from "helpers/dateFormat";
import { CustomAreaCodePart } from "container/contents/customTopPart";

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
  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "RV",
    functionName: "RV9006",
  });

  const { register, control, reset, handleSubmit } = useForm<ISEARCH>({
    mode: "onSubmit",
  });

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
    try {
      setLoading(true);
      const { data: dataRV9006 } = await API.get(RV9006SEARCH, {
        params: params,
      });

      if (dataRV9006) {
        setData(dataRV9006);
      } else {
        setData([]);
      }

      setLoading(false);
    } catch (err) {
      setLoading(false);
      setData([]);
    }
  };

  const submit = async (params: any) => {
    if (sType1) {
      delete params.sGjGumymF;
      delete params.sGjGumymT;
      delete params.sGjSnoF;
      delete params.sGjSnoT;

      params.sDateF =
        typeof params.sDateF === "string"
          ? formatDateByRemoveDash(params.sDateF)
          : formatDateToStringWithoutDash(params.sDateF);

      params.sDateT =
        typeof params.sDateT === "string"
          ? formatDateByRemoveDash(params.sDateT)
          : formatDateToStringWithoutDash(params.sDateT);
    } else {
      delete params.sDateF;
      delete params.sDateT;
      params.sGjGumymF =
        typeof params.sGjGumymF === "string"
          ? formatOnlyYearMonthDateByRemoveDash(params.sGjGumymF)
          : params.sGjGumymF instanceof Date
          ? formatDateToStringWithoutDashOnlyYearMonth(params.sGjGumymF)
          : "";

      params.sGjGumymT =
        typeof params.sGjGumymT === "string"
          ? formatOnlyYearMonthDateByRemoveDash(params.sGjGumymT)
          : params.sGjGumymT instanceof Date
          ? formatDateToStringWithoutDashOnlyYearMonth(params.sGjGumymT)
          : "";
    }
    console.log("params::::", params);
    fetchData(params);
  };

  return (
    <>
      <SearchWrapper className="h35 mt5">
        <CustomAreaCodePart
          areaCode={areaCode}
          dataCommonDic={dataCommonDic}
          depthFullName={depthFullName}
          register={register}
        />
        <div className="buttons">
          <Button
            text="출력"
            icon={<Document />}
            type="button"
            color={ButtonColor.LIGHT}
          />
        </div>
      </SearchWrapper>
      <SearchWrapper>
        <Field flex style={{ width: "70%" }}>
          <Field>
            <Wrapper grid col={4} fields="1.5fr 1fr 1fr 1fr">
              <FormGroup>
                <Item>
                  <RadioButton
                    type="radio"
                    value="0"
                    {...register(`sType1`)}
                    id="0"
                    onChange={() => setSType1(false)}
                  />
                  <RadioButtonLabel htmlFor={``}>검침년월</RadioButtonLabel>
                </Item>
                <Controller
                  control={control}
                  {...register("sGjGumymF")}
                  render={({ field: { onChange, value, name } }) => (
                    <CustomDatePicker
                      value={value}
                      onChange={onChange}
                      name={name}
                      showYearDropdown
                      readOnly={sType1}
                    />
                  )}
                />
                <Select
                  {...register("sGjSnoF")}
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
                      showYearDropdown
                      readOnly={sType1}
                    />
                  )}
                />
                <Select
                  {...register("sGjSnoT")}
                  disabled={sType1}
                  style={{ marginLeft: "0" }}
                >
                  {dataCommonDic?.sGjSnoT?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>담당사원</Label>
                <Select {...register("sSwCode")} style={{ width: "100%" }}>
                  {dataCommonDic?.sSwCode?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>조정기 압력</Label>
                <Select {...register("sRh20")} style={{ width: "100%" }}>
                  {dataCommonDic?.sRh20?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
                <p>mmH20</p>
              </FormGroup>
              <FormGroup>
                <Button
                  text="검색"
                  icon={!loading && <MagnifyingGlass />}
                  type="button"
                  color={ButtonColor.SECONDARY}
                  style={{ marginLeft: "30px" }}
                  onClick={handleSubmit(submit)}
                  loader={
                    loading && (
                      <>
                        <Loader
                          color="white"
                          size={16}
                          style={{ marginRight: "10px" }}
                          borderWidth="2px"
                        />
                      </>
                    )
                  }
                />
                <Button
                  text="취소"
                  icon={<ResetGray />}
                  style={{ marginLeft: "5px" }}
                  color={ButtonColor.LIGHT}
                  onClick={() => {
                    resetSearchForm();
                    setData([]);
                  }}
                />
              </FormGroup>
            </Wrapper>
            <Wrapper grid col={4} fields="1.5fr 1fr 1fr 1fr">
              <FormGroup>
                <Item>
                  <RadioButton
                    type="radio"
                    value="1"
                    {...register(`sType1`)}
                    id="1"
                    onChange={() => setSType1(true)}
                  />
                  <RadioButtonLabel htmlFor={``}>검침일자</RadioButtonLabel>
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
              </FormGroup>
              <FormGroup>
                <Label>지역분류</Label>
                <Select {...register("sJyCode")} style={{ width: "100%" }}>
                  {dataCommonDic?.sJyCode?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>그룹종류</Label>
                <Select {...register("sOrder")} style={{ width: "100%" }}>
                  {dataCommonDic?.sOrder?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>
            </Wrapper>
          </Field>
        </Field>
      </SearchWrapper>
      <WrapperContent>
        <Grid fields={fields} columns={columns} data={data} />
      </WrapperContent>
    </>
  );
}

export default RV9006;
