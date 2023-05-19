import React, { useState, useEffect } from "react";
import { apiGet } from "app/axios";
import { GR9006SEARCH } from "app/path";
import { ISEARCH } from "./model";
import { SearchWrapper, WrapperContent } from "../../commonStyle";
import { useForm, Controller } from "react-hook-form";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { MagnifyingGlass, ResetGray } from "components/allSvgIcon";
import { Select, FormGroup, Label, Field } from "components/form/style";
import { DateWithoutDash } from "helpers/dateFormat";
import Loader from "components/loader";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import CustomDatePicker from "components/customDatePicker";

import Grid from "./grid";

function GR9006({
  depthFullName,
  menuId,
  areaCode,
}: {
  depthFullName: string;
  menuId: string;
  areaCode: string;
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [reportType, setReportType] = useState("");
  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "GR",
    functionName: "GR9006",
  });
  const { register, handleSubmit, reset, control } = useForm<ISEARCH>({
    mode: "onSubmit",
  });
  useEffect(() => {
    resetForm();
  }, [dataCommonDic]);

  const fetchData = async (params: any) => {
    // try {
    //   params.sDate = DateWithoutDash(params.sDate);
    //   params.eDate = DateWithoutDash(params.eDate);

    //   setLoading(true);
    //   const { data } = await API.get(GR9006SEARCH, { params: params });
    //   if (data) {
    //     setData(data);
    //   } else {
    //     setData([]);
    //   }
    //   setLoading(false);
    // } catch (err) {
    //   setData([]);
    //   setLoading(false);
    //   console.log("CM9006 DATA fetch error =======>", err);
    // }

    params.sDate = DateWithoutDash(params.sDate);
    params.eDate = DateWithoutDash(params.eDate);

    setLoading(true);
    const data = await apiGet(GR9006SEARCH, params);
    if (data) {
      setData(data);
    } else {
      setData([]);
    }
    setLoading(false);
  };

  const submit = (data: ISEARCH) => {
    fetchData(data);
  };

  const resetForm = () => {
    if (dataCommonDic !== undefined) {
      reset({
        areaCode: dataCommonDic?.areaCode[0]?.code,
        bcBuCode: dataCommonDic?.bcBuCode[0]?.code,
        reportType: dataCommonDic?.reportType[0]?.code,
        eDate: dataCommonDic?.eDate[0]?.code,
        sDate: dataCommonDic?.sDate[0]?.code,
      });
      setReportType(dataCommonDic?.reportType[0].code);
    }
  };

  const cancel = () => {
    resetForm();
    setData([]);
  };

  return (
    <>
      <SearchWrapper className="h35 mt5">
        <FormGroup>
          {areaCode === "00" && (
            <>
              <Label style={{ minWidth: "80px" }}>재고입고처</Label>
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
              style={{ marginRight: "5px" }}
            />
            <Button
              text="취소"
              icon={<ResetGray />}
              type="button"
              color={ButtonColor.LIGHT}
              onClick={cancel}
            />
          </div>
        </FormGroup>
        <p>{depthFullName}</p>
      </SearchWrapper>
      <WrapperContent>
        <form onSubmit={handleSubmit(submit)} autoComplete="off">
          <SearchWrapper className="h35">
            <FormGroup>
              <Label style={{ minWidth: "auto" }}>보고서 종류</Label>
              <Select
                //register={register("reportType")}
                width={InputSize.i150}
                onChange={(e) => setReportType(e.target.value)}
              >
                {dataCommonDic?.reportType?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>

              <Label style={{ minWidth: "80px" }}>매입처</Label>
              <Select
                register={register("bcBuCode")}
                width={InputSize.i150}
                // onChange={(e) => setReportKind(e.target.value)}
              >
                {dataCommonDic?.bcBuCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>

              <Label style={{ minWidth: "70px" }}>기간</Label>
              <Controller
                control={control}
                {...register("sDate")}
                render={({ field: { onChange, value, name } }) => (
                  <CustomDatePicker
                    value={value}
                    onChange={onChange}
                    name={name}
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
                  />
                )}
              />
            </FormGroup>
          </SearchWrapper>
        </form>

        <Grid data={data} reportType={reportType} />
      </WrapperContent>
    </>
  );
}

export default GR9006;
