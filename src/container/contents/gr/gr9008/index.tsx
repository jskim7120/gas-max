import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { apiGet } from "app/axios";
import { GR9008SEARCH } from "app/path";
import { ISEARCH } from "./model";
import { SearchWrapper, WrapperContent } from "../../commonStyle";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { MagnifyingGlass, ResetGray } from "components/allSvgIcon";
import { Select, FormGroup, Label } from "components/form/style";
import { DateWithoutDash } from "helpers/dateFormat";
import Loader from "components/loader";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import CustomDatePicker from "components/customDatePicker";
import Grid from "../grid2";
import { columns, fields } from "./data";
import CustomTopPart from "container/contents/customTopPart";

function GR9008({
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
    functionName: "GR9008",
  });

  const { register, handleSubmit, reset, control } = useForm<ISEARCH>({
    mode: "onSubmit",
  });
  useEffect(() => {
    resetForm();
  }, [dataCommonDic]);

  const fetchData = async (params: any) => {
    // try {
    //   if (params.sDate !== undefined) {
    //     // params.sDate =
    //     //   typeof params.sDate === "string"
    //     //     ? formatDateByRemoveDash(params.sDate)
    //     //     : formatDateToStringWithoutDash(params.sDate);
    //     params.sDate = DateWithoutDash(params.sDate);
    //   }
    //   if (params.eDate !== undefined) {
    //     // params.eDate =
    //     //   typeof params.eDate === "string"
    //     //     ? formatDateByRemoveDash(params.eDate)
    //     //     : formatDateToStringWithoutDash(params.eDate);
    //     params.eDate = DateWithoutDash(params.eDate);
    //   }
    //   setLoading(true);
    //   const { data } = await API.get(GR9008SEARCH, { params: params });
    //   if (data) {
    //     setData(data);
    //     setLoading(false);
    //   }
    // } catch (err) {
    //   setLoading(false);
    //   console.log("GR9008 DATA fetch error =======>", err);
    // }

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
    const data = await apiGet(GR9008SEARCH, params);
    if (data) {
      setData(data);
      setLoading(false);
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
              <Label style={{ minWidth: "auto" }}>매입처</Label>
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
          </SearchWrapper>
        </form>

        <Grid
          data={data}
          fields={fields}
          columns={columns}
          style={{ height: `calc(100% - 38px)` }}
        />
      </WrapperContent>
    </>
  );
}

export default GR9008;
