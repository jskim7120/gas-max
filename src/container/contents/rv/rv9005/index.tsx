import { useState, useEffect } from "react";
import { RV9005SEARCH } from "app/path";
import { IRV9005SEARCH } from "./model";
import API from "app/axios";
import { TopBar, WrapperContent } from "../../commonStyle";
import { useForm, Controller } from "react-hook-form";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { MagnifyingGlass, ExcelIcon, ResetGray } from "components/allSvgIcon";
import { SearchWrapper } from "../../commonStyle";
import CustomDatePicker from "components/customDatePicker";
import CheckBox from "components/checkbox";
import {
  Select,
  FormGroup,
  Wrapper,
  Label,
  Field,
} from "components/form/style";
import Loader from "components/loader";
import Button from "components/button/button";
import { ButtonColor, InputSize, FieldKind } from "components/componentsType";
import Grid from "./grid";
import { columns, fields } from "./data";

function RV9005({
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
  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "RV",
    functionName: "RV9005",
  });

  console.log("RV9005:", dataCommonDic);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
    control,
  } = useForm<IRV9005SEARCH>({
    mode: "onSubmit",
  });

  const resetForm = () => {
    if (dataCommonDic !== undefined) {
      reset({
        areaCode: dataCommonDic?.areaCode[0].code,
      });
    }
  };

  useEffect(() => {
    reset({
      areaCode: dataCommonDic?.areaCode[0].code,
    });
  }, [dataCommonDic]);

  const fetchData = async (params: any) => {
    try {
      setLoading(true);
      const { data } = await API.get(RV9005SEARCH, { params: params });
      console.log("data irev:", data);
      if (data) {
        setData(data);
        setLoading(false);
        setSelectedRowIndex(0);
      }
    } catch (err) {
      console.log("RV9005 data search fetch error =======>", err);
    }
  };

  const cancel = () => {
    resetForm();
    setDataChk(true);
    setData([]);
  };

  const submit = (data: IRV9005SEARCH) => {
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
            <div
              className="button-wrapper"
              style={{ flexDirection: "row", gap: "0px" }}
            >
              <FormGroup>
                <Label>검침년월</Label>
                <CheckBox register={{ ...register("sSwCode") }} />
              </FormGroup>
              <FormGroup>
                <Field style={{ minWidth: "120px" }}>
                  <Controller
                    control={control}
                    {...register("sGjGumymF")}
                    render={({ field: { onChange, value, name } }) => (
                      <CustomDatePicker
                        value={value}
                        onChange={onChange}
                        name={name}
                      />
                    )}
                  />
                </Field>
              </FormGroup>
              <FormGroup>
                <Select
                  width={InputSize.i40}
                  {...register("sGjSnoF")}
                  kind={FieldKind.BORDER}
                >
                  {dataCommonDic?.sGjSnoF?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>
              <Field style={{ minWidth: "120px" }}>
                <Controller
                  control={control}
                  {...register("sGjGumymT")}
                  render={({ field: { onChange, value, name } }) => (
                    <CustomDatePicker
                      value={value}
                      onChange={onChange}
                      name={name}
                    />
                  )}
                />
              </Field>
              <FormGroup>
                <Select
                  width={InputSize.i40}
                  {...register("sGjSnoT")}
                  kind={FieldKind.BORDER}
                >
                  {dataCommonDic?.sGjSnoT?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>
              <FormGroup>
                <CheckBox register={{ ...register("sSwCode") }} />

                <Label>거래처 담당사원</Label>
              </FormGroup>
              <FormGroup>
                <Select
                  width={InputSize.i100}
                  {...register("sSwCode")}
                  kind={FieldKind.BORDER}
                >
                  {dataCommonDic?.sSwCode?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>건물명</Label>
                <Select
                  width={InputSize.i100}
                  {...register("sCuName")}
                  kind={FieldKind.BORDER}
                >
                  {dataCommonDic?.sCuName?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>
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
            </div>
          </SearchWrapper>
          <SearchWrapper style={{ alignItems: "baseline" }}>
            <div
              className="button-wrapper"
              style={{ flexDirection: "row", gap: "0px" }}
            >
              <FormGroup>
                <CheckBox register={{ ...register("sSwCode") }} />
                <Label>검침일자</Label>
              </FormGroup>
              <FormGroup>
                <CheckBox register={{ ...register("sSwCode") }} />
                <Label>지로 발행일</Label>
              </FormGroup>
              <FormGroup>
                <CheckBox register={{ ...register("sSwCode") }} />
                <Label>등록일자</Label>
              </FormGroup>
              <FormGroup>
                <CheckBox register={{ ...register("sSwCode") }} />
                <Label>수정일자</Label>
              </FormGroup>

              <FormGroup>
                <Label>체 적 검침사원</Label>
                <CheckBox register={{ ...register("sSwCode") }} />
              </FormGroup>
              <FormGroup>
                <Select
                  width={InputSize.i40}
                  {...register("sCuSwCode")}
                  kind={FieldKind.BORDER}
                >
                  {dataCommonDic?.sCuSwCode?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>
              <FormGroup>
                <CheckBox register={{ ...register("sSwCode") }} />
                <Label>거래처 담당사원</Label>
              </FormGroup>
              <FormGroup>
                <Label>지역분류</Label>
                <Select
                  width={InputSize.i100}
                  {...register("sJyCode")}
                  kind={FieldKind.BORDER}
                >
                  {dataCommonDic?.sJyCode?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>
            </div>
          </SearchWrapper>
          <SearchWrapper style={{ alignItems: "baseline" }}>
            <div
              className="button-wrapper"
              style={{ flexDirection: "row", gap: "0px" }}
            >
              <FormGroup>
                <Label>기간</Label>
                <Field style={{ minWidth: "120px" }}>
                  <Controller
                    control={control}
                    {...register("sDateF")}
                    render={({ field: { onChange, value, name } }) => (
                      <CustomDatePicker
                        value={value}
                        onChange={onChange}
                        name={name}
                      />
                    )}
                  />
                </Field>
              </FormGroup>
              <Label>~</Label>
              <FormGroup>
                <Field style={{ minWidth: "120px" }}>
                  <Controller
                    control={control}
                    {...register("sDateT")}
                    render={({ field: { onChange, value, name } }) => (
                      <CustomDatePicker
                        value={value}
                        onChange={onChange}
                        name={name}
                      />
                    )}
                  />
                </Field>
              </FormGroup>
              <FormGroup>
                <CheckBox register={{ ...register("sSwCode") }} />
                <Label>관리책임자 분류</Label>
              </FormGroup>
              <FormGroup>
                <Label>지역분류</Label>
                <Select
                  width={InputSize.i100}
                  {...register("sCuCustgubun")}
                  kind={FieldKind.BORDER}
                >
                  {dataCommonDic?.sCuCustgubun?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>수금방법</Label>
                <Select
                  width={InputSize.i100}
                  {...register("sSukumtype")}
                  kind={FieldKind.BORDER}
                >
                  {dataCommonDic?.sSukumtype?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>조정기 압력</Label>
                <Select
                  width={InputSize.i100}
                  {...register("sRh20")}
                  kind={FieldKind.BORDER}
                >
                  {dataCommonDic?.sRh20?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>
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

export default RV9005;
