import React, { useState, useEffect } from "react";
import { CM9002SEARCH } from "app/path";
import { ISEARCH } from "./model";
import API from "app/axios";
import { TopBar, WrapperContent } from "../../commonStyle";
import { useForm, Controller } from "react-hook-form";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { MagnifyingGlass, ResetGray } from "components/allSvgIcon";
import { SearchWrapper } from "../../commonStyle";
import {
  Select,
  FormGroup,
  Wrapper,
  Label,
  Field,
} from "components/form/style";
import {
  formatDateToStringWithoutDash,
  formatDateByRemoveDash,
} from "helpers/dateFormat";
import Loader from "components/loader";
import Button from "components/button/button";
import { ButtonColor, InputSize, FieldKind } from "components/componentsType";
import CustomDatePicker from "components/customDatePicker";

import Grid from "./grid";

function GR9002({
  depthFullName,
  menuId,
}: {
  depthFullName: string;
  menuId: string;
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "GR",
    functionName: "GR9001",
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
        params.sDate =
          typeof params.sDate === "string"
            ? formatDateByRemoveDash(params.sDate)
            : formatDateToStringWithoutDash(params.sDate);
      }
      if (params.eDate !== undefined) {
        params.eDate =
          typeof params.eDate === "string"
            ? formatDateByRemoveDash(params.eDate)
            : formatDateToStringWithoutDash(params.eDate);
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
      <TopBar>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p style={{ marginRight: "20px" }}>{depthFullName}</p>
          <p>
            <b>재고입고처</b>
          </p>

          <Select {...register("areaCode")} style={{ marginLeft: "5px" }}>
            {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </div>
      </TopBar>
      <WrapperContent>
        <form onSubmit={handleSubmit(submit)}>
          <SearchWrapper style={{ padding: "3px 0" }}>
            <div style={{ marginLeft: "25px" }}>
              <Wrapper style={{ gap: "20px" }}>
                <FormGroup>
                  <Label style={{ minWidth: "auto" }}>충전소</Label>
                  <Select
                    {...register("bcBuCode")}
                    kind={FieldKind.BORDER}
                    width={InputSize.i150}
                    // onChange={(e) => setReportKind(e.target.value)}
                  >
                    {dataCommonDic?.bcBuCode?.map((obj: any, idx: number) => (
                      <option key={idx} value={obj.code}>
                        {obj.codeName}
                      </option>
                    ))}
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label style={{ minWidth: "auto" }}>기간</Label>
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
                </FormGroup>

                <FormGroup>
                  <Label style={{ minWidth: "auto" }}>수송기사</Label>
                  <Select
                    {...register("bcCsawon")}
                    kind={FieldKind.BORDER}
                    width={InputSize.i110}
                  >
                    {dataCommonDic?.bcCsawon?.map((obj: any, idx: number) => (
                      <option key={idx} value={obj.code}>
                        {obj.codeName}
                      </option>
                    ))}
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label style={{ minWidth: "auto" }}>수송방법</Label>
                  <Select
                    {...register("bcCtype")}
                    kind={FieldKind.BORDER}
                    width={InputSize.i110}
                  >
                    {dataCommonDic?.bcCtype?.map((obj: any, idx: number) => (
                      <option key={idx} value={obj.code}>
                        {obj.codeName}
                      </option>
                    ))}
                  </Select>
                </FormGroup>
              </Wrapper>
            </div>

            <div
              className="button-wrapper"
              style={{ flexDirection: "row", gap: "0px", marginRight: "10px" }}
            >
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
                style={{ marginRight: "10px" }}
              />
              <Button
                text="취소"
                icon={<ResetGray color="#707070" />}
                type="button"
                color={ButtonColor.LIGHT}
                onClick={cancel}
              />
            </div>
          </SearchWrapper>
        </form>

        <Grid data={data ? data : []} />
      </WrapperContent>
    </>
  );
}

export default GR9002;
