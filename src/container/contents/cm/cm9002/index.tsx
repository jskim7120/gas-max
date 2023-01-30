import React, { useState, useEffect } from "react";
import { CM9002SEARCH } from "app/path";
import { ICM9002SEARCH } from "./model";
import API from "app/axios";
import { TopBar, WrapperContent } from "../../commonStyle";
import { useForm, Controller } from "react-hook-form";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import CheckBox from "components/checkbox";
import { MagnifyingGlass, ExcelIcon, ResetGray } from "components/allSvgIcon";
import { SearchWrapper } from "../../commonStyle";
import {
  Input,
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
import CustomDatePicker from "components/customDatePicker";
import Grid from "./grid";
import { columns, fields } from "./data";
// import {
//   Plus,
//   Trash,
//   Update,
//   Reset,
//   MagnifyingGlassBig,
//   ExcelIcon,
// } from "components/allSvgIcon";

function CM9002({
  depthFullName,
  menuId,
}: {
  depthFullName: string;
  menuId: string;
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState<any>({});
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const [dataChk, setDataChk] = useState(true);
  const [reportKind, setReportKind] = useState("");
  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "CM",
    functionName: "CM9002",
  });

  console.log("CM9002:", dataCommonDic);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
    control,
  } = useForm<ICM9002SEARCH>({
    mode: "onSubmit",
  });

  const resetForm = () => {
    if (dataCommonDic !== undefined) {
      reset({
        areaCode: dataCommonDic?.areaCode[0].code,
        reportKind: dataCommonDic?.reportKind[0].code,
        cuType: dataCommonDic?.cuType[0].code,
        cuGumsa: dataCommonDic?.cuGumsa[0].code,
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

  useEffect(() => {
    reset({
      areaCode: dataCommonDic?.areaCode[0].code,
      //   reportKind: dataCommonDic?.reportKind[0].code,
      //   cuType: dataCommonDic?.cuType[0].code,
      //   cuJyCode: dataCommonDic?.cuJyCode[0].code,
      //   swCode: dataCommonDic?.swCode[0].code,
      //   cuCutype: dataCommonDic?.cuCutype[0].code,
    });
  }, [dataCommonDic]);

  const fetchData = async (params: any) => {
    try {
      setLoading(true);
      const { data } = await API.get(CM9002SEARCH, { params: params });
      console.log("data irev:", data);
      if (data) {
        setData(data);
        setLoading(false);
        setSelectedRowIndex(0);
      }
    } catch (err) {
      console.log("CM9003 data search fetch error =======>", err);
    }
  };

  const cancel = () => {
    resetForm();
    setDataChk(true);
    setData([]);
  };

  const submit = (data: ICM9002SEARCH) => {
    console.log("IISEARCH:", data);
    fetchData(data);
  };

  return (
    <>
      <TopBar>
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
      </TopBar>
      <WrapperContent style={{ height: `calc(100% - 76px)` }}>
        <form onSubmit={handleSubmit(submit)}>
          <SearchWrapper style={{ alignItems: "baseline" }}>
            <div>
              <Wrapper grid col={6} fields="1fr 1fr 1fr 1.3fr 1fr 1fr">
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
                  </Select>
                </FormGroup>
                <FormGroup>
                  <Label style={{ minWidth: "90px" }}>검사대상</Label>
                  <Select
                    {...register("cuGumsa")}
                    kind={FieldKind.BORDER}
                    width={InputSize.i130}
                  >
                    {dataCommonDic?.cuGumsa?.map((obj: any, idx: number) => (
                      <option key={idx} value={obj.code}>
                        {obj.codeName}
                      </option>
                    ))}
                  </Select>
                </FormGroup>
              </Wrapper>
              <Wrapper grid col={6} fields="1fr 1fr 1fr 1.3fr 1fr 1fr">
                <FormGroup>
                  <Label style={{ minWidth: "90px" }}>미수구</Label>
                  <Select
                    {...register("cuMisu")}
                    kind={FieldKind.BORDER}
                    width={InputSize.i130}
                  >
                    {dataCommonDic?.cuMisu?.map((obj: any, idx: number) => (
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
                        style={{ margin: "5px 0 0 0" }}
                        readOnly={!dataChk}
                      />
                    )}
                  />
                </Field>
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
                  </Select>
                </FormGroup>
                <FormGroup>
                  <Label style={{ minWidth: "90px" }}>장부구분</Label>
                  <Select
                    {...register("cuJangbu")}
                    kind={FieldKind.BORDER}
                    width={InputSize.i130}
                  >
                    {dataCommonDic?.cuJangbu?.map((obj: any, idx: number) => (
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
                style={{ marginRight: "10px", minWidth: "max-content" }}
              />
              <Button
                text="취소"
                icon={<ResetGray />}
                style={{ marginRight: "10px", minWidth: "max-content" }}
                type="button"
                color={ButtonColor.LIGHT}
                onClick={cancel}
              />
              <Button
                text="엑셀"
                style={{ minWidth: "max-content" }}
                icon={<ExcelIcon width="19px" height="19px" />}
                color={ButtonColor.LIGHT}
                type="button"
              />
            </div>
          </SearchWrapper>
        </form>

        <Grid
          data={data.length > 0 && data}
          columns={columns}
          fields={fields}
          setSelected={setSelected}
          selectedRowIndex={selectedRowIndex}
          setSelectedRowIndex={setSelectedRowIndex}
        />
      </WrapperContent>
    </>
  );
}

export default CM9002;
