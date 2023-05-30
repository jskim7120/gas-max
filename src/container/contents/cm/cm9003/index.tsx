import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "app/store";
import { CM9003SEARCH } from "app/path";
import { apiGet } from "app/axios";
import { ISEARCH } from "./model";
import { useGetCommonDictionaryMutation } from "app/api/commonDictionary";
import Loader from "components/loader";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import CustomDatePicker from "components/customDatePicker";
import Grid from "components/grid";
import { MagnifyingGlass, ExcelIcon, ResetGray } from "components/allSvgIcon";
import { SearchWrapper, WrapperContent } from "../../commonStyle";
import {
  Select,
  FormGroup,
  Wrapper,
  Label,
  Field,
} from "components/form/style";
import { columns0, fields0 } from "./data/data0";
import { columns1, fields1 } from "./data/data1";
import { columns2, fields2 } from "./data/data2";
import { columns3, fields3 } from "./data/data3";
import { columns4, fields4 } from "./data/data4";
import { columns5, fields5 } from "./data/data5";
import { columns6, fields6 } from "./data/data6";
import setFooterDetail from "container/contents/footer/footerDetailFunc";

function CM9003({
  depthFullName,
  menuId,
  areaCode,
}: {
  depthFullName: string;
  menuId: string;
  areaCode: string;
}) {
  const dispatch = useDispatch();

  const [getCommonDictionary, { data: dataCommonDic }] =
    useGetCommonDictionaryMutation();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState<any>({});
  const [reportKind, setReportKind] = useState("");

  const { register, handleSubmit, reset, control } = useForm<ISEARCH>({
    mode: "onSubmit",
  });

  useEffect(() => {
    getCommonDictionary({ groupId: "CM", functionName: "CM9003" });
  }, []);

  useEffect(() => {
    resetForm();
  }, [dataCommonDic]);

  useEffect(() => {
    if (Object.keys(selected)?.length > 0) {
      setFooterDetail(selected.areaCode, selected.cuCode, dispatch);
    }
  }, [selected]);

  const fetchData = async (params: any) => {
    let paramTemp: any = {};
    for (const [key, value] of Object.entries(params)) {
      if (value !== "" && value !== undefined) {
        paramTemp = { ...paramTemp, [key]: value };
      }
    }

    setLoading(true);
    const data = await apiGet(CM9003SEARCH, paramTemp);
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
        areaCode: dataCommonDic?.areaCode[0].code,
        reportKind: dataCommonDic?.reportKind[0].code,
        cuType: dataCommonDic?.cuType[0].code,
        cuJyCode: dataCommonDic?.cuJyCode[0].code,
        swCode: dataCommonDic?.swCode[0].code,
        cuCutype: dataCommonDic?.cuCutype[0].code,
      });
      setReportKind(dataCommonDic?.reportKind[0].code);
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
              <Label style={{ minWidth: "93px" }}>영업소</Label>

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
              icon={<ResetGray color="#707070" />}
              type="button"
              color={ButtonColor.LIGHT}
              onClick={cancel}
            />
            <Button
              text="엑셀"
              icon={<ExcelIcon width="19px" height="19px" />}
              color={ButtonColor.LIGHT}
              type="button"
            />
          </div>
        </FormGroup>
        <p>{depthFullName}</p>
      </SearchWrapper>
      <WrapperContent>
        <form onSubmit={handleSubmit(submit)} autoComplete="off">
          <SearchWrapper style={{ alignItems: "baseline" }}>
            <div style={{ width: "80%" }}>
              <Wrapper grid col={6} style={{ justifyItems: "center" }}>
                <FormGroup>
                  <Label style={{ minWidth: "90px" }}>보고서 종류</Label>
                  <Select
                    value={reportKind}
                    width={InputSize.i130}
                    onChange={(e) => setReportKind(e.target.value)}
                  >
                    {dataCommonDic?.reportKind?.map((obj: any, idx: number) => (
                      <option key={idx} value={obj.code}>
                        {obj.codeName}
                      </option>
                    ))}
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label style={{ minWidth: "auto" }}>거래 구분</Label>
                  <Select register={register("cuType")} width={InputSize.i130}>
                    {dataCommonDic?.cuType?.map((obj: any, idx: number) => (
                      <option key={idx} value={obj.code}>
                        {obj.codeName}
                      </option>
                    ))}
                  </Select>
                </FormGroup>

                <Field flex style={{ alignItems: "center" }}>
                  <Label style={{ minWidth: "auto" }}>기간</Label>
                  <Controller
                    control={control}
                    {...register("sDate")}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <CustomDatePicker value={value} onChange={onChange} />
                    )}
                  />
                  <Controller
                    control={control}
                    {...register("eDate")}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <CustomDatePicker value={value} onChange={onChange} />
                    )}
                  />
                </Field>

                <FormGroup>
                  <Label style={{ minWidth: "auto" }}>지역 분류</Label>
                  <Select
                    register={register("cuJyCode")}
                    width={InputSize.i130}
                  >
                    {dataCommonDic?.cuJyCode?.map((obj: any, idx: number) => (
                      <option key={idx} value={obj.code}>
                        {obj.codeName}
                      </option>
                    ))}
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label style={{ minWidth: "auto" }}>담당 사원</Label>
                  <Select register={register("swCode")} width={InputSize.i130}>
                    {dataCommonDic?.swCode?.map((obj: any, idx: number) => (
                      <option key={idx} value={obj.code}>
                        {obj.codeName}
                      </option>
                    ))}
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label style={{ minWidth: "auto" }}>소비자 형태</Label>
                  <Select
                    register={register("cuCutype")}
                    width={InputSize.i130}
                  >
                    {dataCommonDic?.cuCutype?.map((obj: any, idx: number) => (
                      <option key={idx} value={obj.code}>
                        {obj.codeName}
                      </option>
                    ))}
                    <option key="sdcdcds00" value="">
                      hooson
                    </option>
                  </Select>
                </FormGroup>
              </Wrapper>
            </div>
          </SearchWrapper>
        </form>

        {reportKind === "0" && (
          <Grid
            areaCode={areaCode}
            data={data}
            setSelected={setSelected}
            fields={fields0}
            columns={columns0}
            menuId={menuId}
            rowIndex={0}
            style={{ height: `calc(100% - 38px)` }}
            //evenFill
          />
        )}
        {reportKind === "1" && (
          <Grid
            areaCode={areaCode}
            data={data}
            setSelected={setSelected}
            fields={fields1}
            columns={columns1}
            menuId={menuId}
            rowIndex={0}
            style={{ height: `calc(100% - 38px)` }}
            //evenFill
          />
        )}
        {reportKind === "2" && (
          <Grid
            areaCode={areaCode}
            data={data}
            setSelected={setSelected}
            fields={fields2}
            columns={columns2}
            menuId={menuId}
            rowIndex={0}
            style={{ height: `calc(100% - 38px)` }}
            //evenFill
          />
        )}
        {reportKind === "3" && (
          <Grid
            areaCode={areaCode}
            data={data}
            setSelected={setSelected}
            fields={fields3}
            columns={columns3}
            menuId={menuId}
            rowIndex={0}
            style={{ height: `calc(100% - 38px)` }}
            //evenFill
          />
        )}
        {reportKind === "4" && (
          <Grid
            areaCode={areaCode}
            data={data}
            setSelected={setSelected}
            fields={fields4}
            columns={columns4}
            menuId={menuId}
            rowIndex={0}
            style={{ height: `calc(100% - 38px)` }}
            // evenFill
          />
        )}
        {reportKind === "5" && (
          <Grid
            areaCode={areaCode}
            data={data}
            setSelected={setSelected}
            fields={fields5}
            columns={columns5}
            menuId={menuId}
            rowIndex={0}
            style={{ height: `calc(100% - 38px)` }}
            // evenFill
          />
        )}
        {reportKind === "6" && (
          <Grid
            areaCode={areaCode}
            data={data}
            setSelected={setSelected}
            fields={fields6}
            columns={columns6}
            menuId={menuId}
            rowIndex={0}
            style={{ height: `calc(100% - 38px)` }}
            // evenFill
          />
        )}
      </WrapperContent>
    </>
  );
}

export default CM9003;
