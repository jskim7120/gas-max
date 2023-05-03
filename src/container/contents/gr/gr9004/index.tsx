import React, { useState, useEffect } from "react";
import { GR9004SEARCH } from "app/path";
import { ISEARCH } from "./model";
import API from "app/axios";
import { SearchWrapper, WrapperContent } from "../../commonStyle";
import { useForm, Controller } from "react-hook-form";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { MagnifyingGlass, ResetGray } from "components/allSvgIcon";
import {
  Select,
  FormGroup,
  Wrapper,
  Label,
  Field,
} from "components/form/style";
import { DateWithoutDash } from "helpers/dateFormat";
import Loader from "components/loader";
import Button from "components/button/button";
import { ButtonColor, InputSize, FieldKind } from "components/componentsType";
import CustomDatePicker from "components/customDatePicker";

import Grid from "./grid";
import CustomTopPart from "container/contents/customTopPart";

function GR9004({
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
    functionName: "GR9004",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
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
      const { data } = await API.get(GR9004SEARCH, { params: params });
      if (data) {
        setData(data);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log("CM9003 DATA fetch error =======>", err);
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
        areaCode={areaCode}
        depthFullName={depthFullName}
        register={register}
        dataCommonDic={dataCommonDic}
        bigText="재고입고처"
      />
      <WrapperContent>
        <form onSubmit={handleSubmit(submit)} autoComplete="off">
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
              <Label style={{ minWidth: "80px" }}>기간</Label>
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

export default GR9004;
