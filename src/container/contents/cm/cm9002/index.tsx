import { useState, useEffect } from "react";
import { useDispatch } from "app/store";
import { CM9002SEARCH } from "app/path";
import { ICM9002SEARCH } from "./model";
import API from "app/axios";
import { SearchWrapper, WrapperContent } from "../../commonStyle";
import { useForm, Controller } from "react-hook-form";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import CheckBox from "components/checkbox";
import { MagnifyingGlass, ExcelIcon, ResetGray } from "components/allSvgIcon";
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
import { ButtonColor, InputSize } from "components/componentsType";
import CustomDatePicker from "components/customDatePicker";
import Grid from "components/grid";
import { columns, fields } from "./data";
import CustomTopPart from "../../customTopPart";
import setFooterDetail from "container/contents/footer/footerDetailFunc";

function CM9002({
  depthFullName,
  menuId,
  areaCode,
}: {
  depthFullName: string;
  menuId: string;
  areaCode: string;
}) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState<any>({});
  //const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const [dataChk, setDataChk] = useState(true);
  const [reportKind, setReportKind] = useState("");
  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "CM",
    functionName: "CM9002",
  });

  const { register, handleSubmit, reset, control } = useForm<ICM9002SEARCH>({
    mode: "onSubmit",
  });

  const resetForm = () => {
    if (dataCommonDic) {
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
    if (Object.keys(selected).length > 0) {
      setFooterDetail(selected.areaCode, selected.cuCode, dispatch);
    }
  }, [selected]);

  useEffect(() => {
    if (dataCommonDic) {
      resetForm();
    }
  }, [dataCommonDic]);

  const fetchData = async (params: any) => {
    try {
      setLoading(true);
      const { data } = await API.get(CM9002SEARCH, { params: params });

      if (data) {
        setData(data);
        // setSelectedRowIndex(0);
      } else {
        setData([]);
      }
      setLoading(false);
    } catch (err) {
      setData([]);
      setLoading(false);
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
      <CustomTopPart
        areaCode={areaCode}
        depthFullName={depthFullName}
        register={register}
        dataCommonDic={dataCommonDic}
      />
      <WrapperContent style={{ height: `calc(100% - 76px)` }}>
        <form onSubmit={handleSubmit(submit)}>
          <SearchWrapper style={{ alignItems: "baseline" }}>
            <div>
              <Wrapper grid col={6} fields="1fr 1fr 1fr 1.3fr 1fr 1fr">
                <FormGroup style={{ width: "255px" }}>
                  <Label style={{ minWidth: "90px" }}>보고서종류</Label>
                  <Select
                    width={InputSize.i130}
                    register={register("reportKind")}
                    onChange={(e) => setReportKind(e.target.value)}
                  >
                    {dataCommonDic?.reportKind?.map((obj: any, idx: number) => (
                      <option key={idx} value={obj.code}>
                        {obj.codeName}
                      </option>
                    ))}
                  </Select>
                </FormGroup>

                <FormGroup style={{ width: "255px" }}>
                  <Label style={{ minWidth: "90px" }}>거래구분</Label>
                  <Select register={register("cuType")} width={InputSize.i130}>
                    {dataCommonDic?.cuType?.map((obj: any, idx: number) => (
                      <option key={idx} value={obj.code}>
                        {obj.codeName}
                      </option>
                    ))}
                  </Select>
                </FormGroup>

                <FormGroup style={{ width: "255px" }}>
                  <Label style={{ minWidth: "90px" }}>지역분류</Label>
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

                <FormGroup style={{ width: "362px" }}>
                  <Label style={{ minWidth: "90px" }}>담당사원</Label>
                  <Select
                    register={register("swCode")}
                    width={InputSize.i130}
                    style={{ marginLeft: "4px" }}
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
                    register={register("cuCustgubun")}
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
                  <Select register={register("cuGumsa")} width={InputSize.i130}>
                    {dataCommonDic?.cuGumsa?.map((obj: any, idx: number) => (
                      <option key={idx} value={obj.code}>
                        {obj.codeName}
                      </option>
                    ))}
                  </Select>
                </FormGroup>
              </Wrapper>
              <Wrapper grid col={6} fields="1fr 1fr 1fr 1.3fr 1fr 1fr">
                <FormGroup style={{ width: "255px" }}>
                  <Label style={{ minWidth: "90px" }}>미수구</Label>
                  <Select register={register("cuMisu")} width={InputSize.i130}>
                    {dataCommonDic?.cuMisu?.map((obj: any, idx: number) => (
                      <option key={idx} value={obj.code}>
                        {obj.codeName}
                      </option>
                    ))}
                  </Select>
                </FormGroup>
                <FormGroup style={{ width: "255px" }}>
                  <Label style={{ minWidth: "90px" }}>소비자형태</Label>
                  <Select
                    register={register("cuCutype")}
                    width={InputSize.i130}
                  >
                    {dataCommonDic?.cuCutype?.map((obj: any, idx: number) => (
                      <option key={idx} value={obj.code}>
                        {obj.codeName}
                      </option>
                    ))}
                  </Select>
                </FormGroup>
                <FormGroup style={{ width: "255px" }}>
                  <Label style={{ minWidth: "90px" }}>거래상태</Label>
                  <Select register={register("cuStae")} width={InputSize.i130}>
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
                    // width: "335px",
                  }}
                >
                  <p style={{ width: "69px" }}>등록기간</p>
                  <CheckBox
                    register={{ ...register("dataChk") }}
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
                        style={{ marginLeft: "8px", width: "130px" }}
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
                        style={{ width: "130px" }}
                      />
                    )}
                  />
                </Field>
                <FormGroup>
                  <Label style={{ minWidth: "90px" }}>수금방법</Label>
                  <Select
                    register={register("cuSukumtype")}
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
                    register={register("cuJangbu")}
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
          areaCode={areaCode}
          data={data}
          columns={columns}
          fields={fields}
          setSelected={setSelected}
          // selectedRowIndex={selectedRowIndex}
          // setSelectedRowIndex={setSelectedRowIndex}
          style={{ height: `calc(100% - 15px)` }}
          evenFill
        />
      </WrapperContent>
    </>
  );
}

export default CM9002;
