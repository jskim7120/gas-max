import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { CM9003SEARCH } from "app/path";
import { ISEARCH } from "./model";
import API from "app/axios";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import Loader from "components/loader";
import Button from "components/button/button";
import { ButtonColor, InputSize, FieldKind } from "components/componentsType";
import CustomDatePicker from "components/customDatePicker/test-datepicker";
import Grid from "./grid";
import { MagnifyingGlass, ExcelIcon, ResetGray } from "components/allSvgIcon";
import { TopBar, WrapperContent } from "../../commonStyle";
import { SearchWrapper } from "../../commonStyle";
import {
  Select,
  FormGroup,
  Wrapper,
  Label,
  Field,
} from "components/form/style";

function CM9003({
  depthFullName,
  menuId,
}: {
  depthFullName: string;
  menuId: string;
}) {
  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "CM",
    functionName: "CM9003",
  });

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [reportKind, setReportKind] = useState("");

  const { register, handleSubmit, reset, control } = useForm<ISEARCH>({
    mode: "onSubmit",
  });

  useEffect(() => {
    resetForm();
  }, [dataCommonDic]);

  const fetchData = async (params: any) => {
    let paramTemp: any = {};
    for (const [key, value] of Object.entries(params)) {
      if (value !== "" && value !== undefined) {
        paramTemp = { ...paramTemp, [key]: value };
      }
    }

    try {
      setLoading(true);
      const { data } = await API.get(CM9003SEARCH, { params: paramTemp });

      if (data) {
        setData(data);
        setLoading(false);
      }
    } catch (err) {
      setData([]);
      setLoading(false);
      console.log("CM9003 data search error =======>", err);
    }
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
      <TopBar>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p style={{ marginRight: "20px" }}>{depthFullName}</p>
          <p>
            <b>영업소</b>
          </p>

          <Select
            {...register("areaCode")}
            style={{ marginLeft: "5px" }}
            width={InputSize.i130}
          >
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
          <SearchWrapper style={{ alignItems: "baseline" }}>
            <div style={{ width: "80%" }}>
              <Wrapper grid col={6} style={{ justifyItems: "center" }}>
                <FormGroup>
                  <Label style={{ minWidth: "90px" }}>보고서종류</Label>
                  <Select
                    {...register("reportKind")}
                    kind={FieldKind.BORDER}
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
                  <Label style={{ minWidth: "auto" }}>거래구분</Label>
                  <Select
                    {...register("cuType")}
                    kind={FieldKind.BORDER}
                    width={InputSize.i130}
                  >
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
                  <Label style={{ minWidth: "auto" }}>지역분류</Label>
                  <Select
                    {...register("cuJyCode")}
                    kind={FieldKind.BORDER}
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
                  <Label style={{ minWidth: "auto" }}>담당사원</Label>
                  <Select
                    {...register("swCode")}
                    kind={FieldKind.BORDER}
                    width={InputSize.i130}
                  >
                    {dataCommonDic?.swCode?.map((obj: any, idx: number) => (
                      <option key={idx} value={obj.code}>
                        {obj.codeName}
                      </option>
                    ))}
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label style={{ minWidth: "auto" }}>소비자형태</Label>
                  <Select
                    {...register("cuCutype")}
                    kind={FieldKind.BORDER}
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

            <div
              className="button-wrapper"
              style={{ flexDirection: "row", gap: "0px" }}
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
                style={{ marginRight: "10px" }}
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
          </SearchWrapper>
        </form>

        <Grid data={data ? data : []} reportKind={reportKind} />
      </WrapperContent>
    </>
  );
}

export default CM9003;
