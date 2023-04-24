import React, { useState, useEffect } from "react";
import { CM9002SEARCH } from "app/path";
import { ISEARCH } from "./model";
import API from "app/axios";
import { WrapperContent, SearchWrapper } from "../../commonStyle";
import { useForm, Controller } from "react-hook-form";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { MagnifyingGlass, ResetGray } from "components/allSvgIcon";
import { Select, FormGroup, Label } from "components/form/style";
import { DateWithoutDash } from "helpers/dateFormat";
import Loader from "components/loader";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import CustomDatePicker from "components/customDatePicker";
import { columns, fields, layout } from "./data";

import Grid from "./grid";
import CustomTopPart from "container/contents/customTopPart";

function GR9002({
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
  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "GR",
    functionName: "GR9002",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
    control,
  } = useForm<ISEARCH>({
    mode: "onSubmit",
  });
  useEffect(() => {
    resetForm();
  }, [dataCommonDic]);
  const fetchData = async (params: any) => {
    try {
      if (params.sDate !== undefined) {
        // params.sDate =
        //   typeof params.sDate === "string"
        //     ? formatDateByRemoveDash(params.sDate)
        //     : formatDateToStringWithoutDash(params.sDate);
        params.sDate = DateWithoutDash(params.sDate);
      }
      if (params.eDate !== undefined) {
        // params.eDate =
        //   typeof params.eDate === "string"
        //     ? formatDateByRemoveDash(params.eDate)
        //     : formatDateToStringWithoutDash(params.eDate);
        params.eDate = DateWithoutDash(params.eDate);
      }
      setLoading(true);
      const { data } = await API.get(CM9002SEARCH, { params: params });
      if (data) {
        setData(data);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log("CM9001 DATA fetch error =======>", err);
    }
  };

  const submit = (data: ISEARCH) => {
    fetchData(data);
  };

  const resetForm = () => {
    if (dataCommonDic !== undefined) {
      reset({
        areaCode: dataCommonDic?.areaCode[0]?.code,
        bcBuCode: dataCommonDic?.bcBuCode[0]?.code,
        bcCsawon: dataCommonDic?.bcCsawon[0]?.code,
        bcCtype: dataCommonDic?.bcCtype[0]?.code,
        eDate: dataCommonDic?.eDate[0]?.code,
        sDate: dataCommonDic?.sDate[0]?.code,
      });
    }
  };

  const cancel = () => {
    resetForm();
    setData([]);
  };

  return (
    <>
      <CustomTopPart
        depthFullName={depthFullName}
        register={register}
        dataCommonDic={dataCommonDic}
        bigText="재고입고처"
        areaCode={areaCode}
      />
      <WrapperContent>
        <form onSubmit={handleSubmit(submit)}>
          <SearchWrapper className="h35">
            <FormGroup>
              <Label style={{ minWidth: "auto" }}>충전소</Label>
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
                render={({ field: { onChange, value } }) => (
                  <CustomDatePicker value={value} onChange={onChange} />
                )}
              />
              <Controller
                control={control}
                {...register("eDate")}
                render={({ field: { onChange, value } }) => (
                  <CustomDatePicker value={value} onChange={onChange} />
                )}
              />

              <Label style={{ minWidth: "80px" }}>수송 기사</Label>
              <Select register={register("bcCsawon")} width={InputSize.i110}>
                {dataCommonDic?.bcCsawon?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>

              <Label style={{ minWidth: "80px" }}>수송 방법</Label>
              <Select register={register("bcCtype")} width={InputSize.i110}>
                {dataCommonDic?.bcCtype?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>

            <div className="buttons">
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
          </SearchWrapper>
        </form>

        <Grid data={data} />
      </WrapperContent>
    </>
  );
}

export default GR9002;
