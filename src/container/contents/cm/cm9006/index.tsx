import React, { useState, useEffect } from "react";
import { CM9006SEARCH } from "app/path";
import { ISEARCH } from "./model";
import API from "app/axios";
import { DetailHeader, WrapperContent } from "../../commonStyle";
import { useForm, Controller } from "react-hook-form";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { Reset, MagnifyingGlass, ExcelIcon } from "components/allSvgIcon";
import { SearchWrapper } from "./style";
import {
  Select,
  FormGroup,
  Wrapper,
  Label,
  Field,
} from "components/form/style";
import Loader from "components/loader";
import Button from "components/button/button";
import {
  ButtonColor,
  ButtonType,
  InputSize,
  FieldKind,
} from "components/componentsType";
import CheckBox from "components/checkbox";
import CustomDatePicker from "components/customDatePicker/test-datepicker";
import DataGridFooter from "components/dataGridFooter/dataGridFooter";
import Grid from "./grid";

function CM9003({
  depthFullName,
  menuId,
}: {
  depthFullName: string;
  menuId: string;
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [reportKind, setReportKind] = useState("");
  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "CM",
    functionName: "CM9006",
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
    reset({
      areaCode: dataCommonDic?.areaCode[0].code,
      reportKind: dataCommonDic?.reportKind[0].code,
      cuType: dataCommonDic?.cuType[0].code,
      cuJyCode: dataCommonDic?.cuJyCode[0].code,
      swCode: dataCommonDic?.swCode[0].code,
      cuCustgubun: dataCommonDic?.cuCustgubun[0].code,
      cuCutype: dataCommonDic?.cuCutype[0].code,
      cuStae: dataCommonDic?.cuStae[0].code,
      cuSukumtype: dataCommonDic?.cuSukumtype[0].code,
    });
    setReportKind(dataCommonDic?.reportKind[0].code);
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
      const { data } = await API.get(CM9006SEARCH, { params: paramTemp });

      if (data) {
        setData(data);
        setLoading(false);
      }
    } catch (err) {
      console.log("CM9003 data search fetch error =======>", err);
    }
  };

  const submit = (data: ISEARCH) => {
    fetchData(data);
  };

  return (
    <>
      <DetailHeader>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p style={{ marginRight: "20px" }}>{depthFullName}</p>
          <p>
            <b>영업소</b>
          </p>

          <Select {...register("areaCode")} style={{ marginLeft: "5px" }}>
            {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </div>
      </DetailHeader>
      <WrapperContent style={{ height: `calc(100% - 76px)` }}>
        <form onSubmit={handleSubmit(submit)}>
          <SearchWrapper>
            <div style={{ width: "75%" }}>
              <Wrapper grid col={5} fields="1fr 1fr 1fr 1fr 1.5fr">
                <FormGroup>
                  <Label style={{ minWidth: "90px" }}>보고서종류</Label>
                  <Select
                    width={InputSize.i130}
                    {...register("reportKind")}
                    kind={FieldKind.BORDER}
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
                  <Label style={{ minWidth: "90px" }}>거래구분</Label>
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

                <FormGroup>
                  <Label style={{ minWidth: "90px" }}>지역분류</Label>
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
                  <Label style={{ minWidth: "90px" }}>담당사원</Label>
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
                  <Label style={{ minWidth: "90px" }}>관리책임자</Label>
                  <Select
                    {...register("cuCustgubun")}
                    kind={FieldKind.BORDER}
                    width={InputSize.i130}
                  >
                    {dataCommonDic?.cuCustgubun?.map(
                      (obj: any, idx: number) => (
                        <option key={idx} value={obj.code}>
                          {obj.codeName}
                        </option>
                      )
                    )}
                    <option key="sdcdcds00" value="">
                      hooson
                    </option>
                  </Select>
                </FormGroup>
              </Wrapper>
              <Wrapper grid col={5} fields="1fr 1fr 1fr 1fr 1.5fr">
                <div></div>
                <FormGroup>
                  <Label style={{ minWidth: "90px" }}>소비자형태</Label>
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
                <FormGroup>
                  <Label style={{ minWidth: "90px" }}>거래상태</Label>
                  <Select
                    {...register("cuStae")}
                    kind={FieldKind.BORDER}
                    width={InputSize.i130}
                  >
                    {dataCommonDic?.cuStae?.map((obj: any, idx: number) => (
                      <option key={idx} value={obj.code}>
                        {obj.codeName}
                      </option>
                    ))}
                    <option key="sdcdcds00" value="">
                      hooson
                    </option>
                  </Select>
                </FormGroup>
                <FormGroup>
                  <Label style={{ minWidth: "90px" }}>수금방법</Label>
                  <Select
                    {...register("cuSukumtype")}
                    kind={FieldKind.BORDER}
                    width={InputSize.i130}
                  >
                    {dataCommonDic?.cuSukumtype?.map(
                      (obj: any, idx: number) => (
                        <option key={idx} value={obj.code}>
                          {obj.codeName}
                        </option>
                      )
                    )}
                    <option key="sdcdcds00" value="">
                      hooson
                    </option>
                  </Select>
                </FormGroup>
                <Field
                  flex
                  style={{
                    alignItems: "center",
                    marginLeft: "22px",
                  }}
                >
                  <CheckBox
                    register={{ ...register("dataChk") }}
                    title="등록기간"
                  />
                  <Controller
                    control={control}
                    {...register("sDate")}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <CustomDatePicker
                        value={value}
                        onChange={onChange}
                        style={{ marginLeft: "15px" }}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    {...register("eDate")}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <CustomDatePicker
                        value={value}
                        onChange={onChange}
                        style={{ margin: "5px 0 0 0" }}
                      />
                    )}
                  />
                </Field>
              </Wrapper>
            </div>

            <div className="button-wrapper">
              <Button
                text="등록"
                icon={!loading && <MagnifyingGlass />}
                color={ButtonColor.SECONDARY}
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
                text="수정"
                icon={<Reset />}
                style={{ marginRight: "10px" }}
                type="button"
                color={ButtonColor.LIGHT}
                onClick={() => {}}
              />
              <Button
                text="삭제"
                icon={<ExcelIcon />}
                color={ButtonColor.LIGHT}
                type="button"
              />
            </div>
          </SearchWrapper>
        </form>

        <Grid data={data ? data : []} reportKind={reportKind} />
        <DataGridFooter dataLength={data?.length > 0 ? data.length : 0} />
      </WrapperContent>
    </>
  );
}

export default CM9003;
