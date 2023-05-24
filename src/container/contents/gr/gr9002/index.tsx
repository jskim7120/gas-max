import React, { useState, useEffect } from "react";
import { apiGet } from "app/axios";
import { CM9002SEARCH } from "app/path";
import { ISEARCH } from "./model";
import { WrapperContent, SearchWrapper } from "../../commonStyle";
import { useForm, Controller } from "react-hook-form";
import { useGetCommonDictionaryMutation } from "app/api/commonDictionary";
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

  const [getCommonDictionary, { data: dataCommonDic }] =
    useGetCommonDictionaryMutation();

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
    getCommonDictionary({ groupId: "GR", functionName: "GR9002" });
  }, []);

  useEffect(() => {
    resetForm();
  }, [dataCommonDic]);

  const fetchData = async (params: any) => {
    // try {
    //   params.sDate = DateWithoutDash(params.sDate);
    //   params.eDate = DateWithoutDash(params.eDate);

    //   setLoading(true);
    //   const { data } = await API.get(CM9002SEARCH, { params: params });
    //   console.log("data:", data);
    //   if (data) {
    //     setData(data);
    //   } else {
    //     setData([]);
    //   }
    //   setLoading(false);
    // } catch (err) {
    //   setData([]);
    //   setLoading(false);
    //   console.log("CM9001 DATA fetch error =======>", err);
    // }

    params.sDate = DateWithoutDash(params.sDate);
    params.eDate = DateWithoutDash(params.eDate);

    setLoading(true);
    const data = await apiGet(CM9002SEARCH, params);
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
      <SearchWrapper className="h35 mt5">
        <FormGroup>
          {areaCode === "00" && (
            <>
              <Label style={{ minWidth: "48px" }}>영업소</Label>
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
          </SearchWrapper>
        </form>

        <Grid data={data} />
      </WrapperContent>
    </>
  );
}

export default GR9002;
