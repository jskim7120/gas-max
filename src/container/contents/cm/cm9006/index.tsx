import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "app/store";
import { CM9006SEARCH } from "app/path";
import { ISEARCH } from "./model";
import API from "app/axios";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import Loader from "components/loader";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import CheckBox from "components/checkbox";
import CustomDatePicker from "components/customDatePicker";
import Grid from "components/grid";
import {
  Select,
  FormGroup,
  Wrapper,
  Label,
  Field,
} from "components/form/style";
import { ResetGray, MagnifyingGlass, ExcelIcon } from "components/allSvgIcon";
import { WrapperContent, SearchWrapper } from "../../commonStyle";
import CustomTopPart from "../../customTopPart";
import setFooterDetail from "container/contents/footer/footerDetailFunc";

import { columns0, fields0 } from "./data/data0";
import { columns1, fields1 } from "./data/data1";

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

  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "CM",
    functionName: "CM9006",
  });

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState<any>({});
  const [reportKind, setReportKind] = useState("");
  const [dataChk, setDataChk] = useState(true);

  const { register, handleSubmit, reset, control } = useForm<ISEARCH>({
    mode: "onSubmit",
  });

  useEffect(() => {
    if (Object.keys(selected).length > 0) {
      setFooterDetail(selected.areaCode, selected.cuCode, dispatch);
    }
  }, [selected]);

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
      const { data } = await API.get(CM9006SEARCH, { params: paramTemp });
      if (data) {
        setData(data);
      } else {
        setData([]);
      }
      setLoading(false);
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
        cuCustgubun: dataCommonDic?.cuCustgubun[0].code,
        cuCutype: dataCommonDic?.cuCutype[0].code,
        cuStae: dataCommonDic?.cuStae[0].code,
        cuSukumtype: dataCommonDic?.cuSukumtype[0].code,
      });
      setReportKind(dataCommonDic?.reportKind[0].code);
    }
  };

  const cancel = () => {
    resetForm();
    setDataChk(true);
    setData([]);
  };

  return (
    <>
      <CustomTopPart
        depthFullName={depthFullName}
        register={register}
        dataCommonDic={dataCommonDic}
        areaCode={areaCode}
      />
      <WrapperContent style={{ height: `calc(100% - 76px)` }}>
        <form onSubmit={handleSubmit(submit)}>
          <SearchWrapper style={{ alignItems: "baseline" }}>
            <div>
              <Wrapper grid col={5} fields="1fr 1fr 1fr 1fr 1.5fr">
                <FormGroup>
                  <Label style={{ minWidth: "90px" }}>보고서종류</Label>
                  <Select
                    width={InputSize.i130}
                    {...register("reportKind")}
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
                  <Select {...register("cuType")} width={InputSize.i130}>
                    {dataCommonDic?.cuType?.map((obj: any, idx: number) => (
                      <option key={idx} value={obj.code}>
                        {obj.codeName}
                      </option>
                    ))}
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label style={{ minWidth: "90px" }}>지역분류</Label>
                  <Select {...register("cuJyCode")} width={InputSize.i130}>
                    {dataCommonDic?.cuJyCode?.map((obj: any, idx: number) => (
                      <option key={idx} value={obj.code}>
                        {obj.codeName}
                      </option>
                    ))}
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label style={{ minWidth: "90px" }}>담당사원</Label>
                  <Select {...register("swCode")} width={InputSize.i130}>
                    {dataCommonDic?.swCode?.map((obj: any, idx: number) => (
                      <option key={idx} value={obj.code}>
                        {obj.codeName}
                      </option>
                    ))}
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label style={{ minWidth: "90px" }}>관리책임자</Label>
                  <Select {...register("cuCustgubun")} width={InputSize.i130}>
                    {dataCommonDic?.cuCustgubun?.map(
                      (obj: any, idx: number) => (
                        <option key={idx} value={obj.code}>
                          {obj.codeName}
                        </option>
                      )
                    )}
                  </Select>
                </FormGroup>
              </Wrapper>
              <Wrapper grid col={5} fields="1fr 1fr 1fr 1fr 1.5fr">
                <div></div>
                <FormGroup>
                  <Label style={{ minWidth: "90px" }}>소비자형태</Label>
                  <Select {...register("cuCutype")} width={InputSize.i130}>
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
                  <Select {...register("cuStae")} width={InputSize.i130}>
                    {dataCommonDic?.cuStae?.map((obj: any, idx: number) => (
                      <option key={idx} value={obj.code}>
                        {obj.codeName}
                      </option>
                    ))}
                  </Select>
                </FormGroup>
                <FormGroup>
                  <Label style={{ minWidth: "90px" }}>수금방법</Label>
                  <Select {...register("cuSukumtype")} width={InputSize.i130}>
                    {dataCommonDic?.cuSukumtype?.map(
                      (obj: any, idx: number) => (
                        <option key={idx} value={obj.code}>
                          {obj.codeName}
                        </option>
                      )
                    )}
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
                    onChange={(e: any) => setDataChk(e.target.checked)}
                    checked={dataChk}
                  />
                  <Controller
                    control={control}
                    {...register("sDate")}
                    render={({ field: { onChange, value } }) => (
                      <CustomDatePicker
                        value={value}
                        onChange={onChange}
                        style={{ marginLeft: "15px" }}
                        readOnly={!dataChk}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    {...register("eDate")}
                    render={({ field: { onChange, value } }) => (
                      <CustomDatePicker
                        value={value}
                        onChange={onChange}
                        readOnly={!dataChk}
                      />
                    )}
                  />
                </Field>
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
                icon={<ResetGray />}
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
        {reportKind === "0" && (
          <Grid
            areaCode={areaCode}
            data={data}
            setSelected={setSelected}
            fields={fields0}
            columns={columns0}
            style={{ height: `calc(100% - 15px)` }}
            // evenFill
          />
        )}
        {reportKind === "1" && (
          <Grid
            areaCode={areaCode}
            data={data}
            setSelected={setSelected}
            fields={fields1}
            columns={columns1}
            style={{ height: `calc(100% - 15px)` }}
            // evenFill
          />
        )}
      </WrapperContent>
    </>
  );
}

export default CM9003;
