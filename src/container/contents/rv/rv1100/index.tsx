import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { apiGet, apiPost } from "app/axios";
import { useGetCommonDictionaryMutation } from "app/api/commonDictionary";
import { useDispatch } from "app/store";
import { SearchWrapper, WrapperContent } from "../../commonStyle";
import Button from "components/button/button";
import { openModal, rv1100Popup } from "app/state/modal/modalSlice";
import {
  Document,
  Settings2,
  MagnifyingGlassBig,
  Users,
  Trash,
} from "components/allSvgIcon";
import { ButtonColor, InputSize } from "components/componentsType";
import { Select, Label, FormGroup, Input } from "components/form/style";
import CustomDatePicker from "components/customDatePicker";
import { RV1100SEARCH, RV1100SEARCH62, RV1100DELETE } from "app/path";
import { ISEARCH } from "./model";
import CheckBox from "components/checkbox";
import Grid from "./grid";
import { fields, columns } from "./data/dataTop";
import Loader from "components/loader";
import {
  DateWithoutDash,
  DateWithoutDashOnlyYearMonth,
} from "helpers/dateFormat";
import Footer from "./footer";

function RV1100({
  depthFullName,
  menuId,
  ownAreaCode,
}: {
  depthFullName: string;
  menuId: string;
  ownAreaCode: string;
}) {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState({});
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [gjGumym, setGjGumym] = useState<string>();
  const [gjSno, setGjSno] = useState<string>();
  const [gjPerDate, setGjPerDate] = useState<string>();

  const [getCommonDictionary, { data: dataCommonDic }] =
    useGetCommonDictionaryMutation();

  useEffect(() => {
    getCommonDictionary({ groupId: "RV", functionName: "RV1100" });
  }, []);

  useEffect(() => {
    if (dataCommonDic) {
      reset({
        areaCode: dataCommonDic?.areaCode[0].code,
        sGjSno: dataCommonDic?.sGjSno[0].code,
        sSwCode: dataCommonDic?.sSwCode[0].code,
        sCuCustgubun: dataCommonDic?.sCustgubun[0].code,
        sSukumtype: dataCommonDic?.cuSukumtype[0].code,
        sGjDate: dataCommonDic?.sGjDate[0].code,
        sGjGumym: dataCommonDic?.sGjGumym[0].code,
        sGjPerDate: dataCommonDic?.sGjPerDate[0].code,
        sJyCode: dataCommonDic?.sJyCode[0].code,
      });
    }
  }, [dataCommonDic]);

  const { register, control, reset, handleSubmit } = useForm<ISEARCH>({
    mode: "onSubmit",
  });

  const submit = async (params: any) => {
    params.sGjGumym = DateWithoutDashOnlyYearMonth(params.sGjGumym);
    params.sGjPerDate = DateWithoutDash(params.sGjPerDate);
    params.sGjDate = DateWithoutDash(params.sGjDate);

    fetchData(params);
  };

  const submit2 = async (params: any) => {
    params.sGjGumym = DateWithoutDashOnlyYearMonth(params.sGjGumym);
    params.sGjPerDate = DateWithoutDash(params.sGjPerDate);
    params.sGjDate = DateWithoutDash(params.sGjDate);
    search2(params);
  };

  const fetchData = async (params: ISEARCH) => {
    setLoading(true);
    const data = await apiGet(RV1100SEARCH, params);

    if (data.mainData.length > 0) {
      setData(data.mainData);
    } else {
      setData([]);
    }

    setLoading(false);
  };

  const openPopupEN1500 = async (selected: any) => {
    dispatch(openModal({ type: "en1500Modal" }));
    dispatch(rv1100Popup({ areaCode: selected.areaCode }));
  };

  const search2 = async (params: ISEARCH) => {
    const data = await apiGet(RV1100SEARCH62, params);
    if (data.mainData.length > 0) {
      setData(data.mainData);
    } else {
      setData([]);
    }
  };

  const deleteRow = async (params: ISEARCH) => {
    if (selected !== undefined && JSON.stringify(selected) !== "{}") {
      let newData: any = {};
      for (const [key, value] of Object.entries(selected)) {
        newData[key] = value;
      }
      if (gjGumym) {
        newData.gjGumym = gjGumym;
      } else {
        newData.gjGumym = dataCommonDic?.sGjGumym[0].code;
        newData.gjGumym = DateWithoutDashOnlyYearMonth(newData.gjGumym);
      }
      if (gjSno) {
        newData.gjSno = gjSno;
      } else {
        newData.gjSno = dataCommonDic?.sGjSno[0].code;
      }
      if (gjPerDate) {
        newData.gjPerDate = gjPerDate;
      } else {
        newData.gjPerDate = dataCommonDic?.sGjPerDate[0].code;
        newData.gjPerDate = DateWithoutDash(newData.gjPerDate);
      }
      newData.gjDate = DateWithoutDash(newData.gjDate);
      newData.gjLdate = DateWithoutDash(newData.gjLdate);
      newData.gjSdate = DateWithoutDash(newData.gjSdate);

      const res: any = await apiPost(RV1100DELETE, newData, "삭제하였습니다");

      if (res) {
        params.sGjDate = DateWithoutDash(params.sGjDate);
        params.sGjGumym = DateWithoutDashOnlyYearMonth(params.sGjGumym);
        params.sGjPerDate = DateWithoutDash(params.sGjPerDate);
        await fetchData(params);
      }
    }
  };

  const gjPerDateChanged = (value: any) => {
    value = value instanceof Date ? DateWithoutDashOnlyYearMonth(value) : null;
    setGjPerDate(value);
  };

  const gjGumymChanged = (value: any) => {
    value = value instanceof Date ? DateWithoutDashOnlyYearMonth(value) : null;
    setGjGumym(value);
  };

  return (
    <>
      <SearchWrapper className="h35">
        <FormGroup>
          {ownAreaCode === "00" && (
            <>
              <Label style={{ minWidth: "70px" }}>영업소</Label>
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
              text="지로 출력"
              icon={<Document />}
              type="button"
              color={ButtonColor.LIGHT}
            />
            <Button
              text="체적환경"
              icon={<Settings2 />}
              type="button"
              color={ButtonColor.LIGHT}
              onClick={() => {
                openPopupEN1500(selected);
              }}
            />
          </div>
        </FormGroup>
        <p>{depthFullName}</p>
      </SearchWrapper>
      <form autoComplete="off">
        <SearchWrapper style={{ flexDirection: "column", alignItems: "start" }}>
          <FormGroup>
            <Label style={{ minWidth: "70px" }}>검침 년월</Label>
            <Controller
              control={control}
              name="sGjGumym"
              render={({ field }) => (
                <CustomDatePicker
                  {...field}
                  showMonthYearPicker
                  style={{ width: "110px" }}
                />
              )}
            />

            <Label style={{ minWidth: "43px" }}>회차</Label>
            <Select register={register("sGjSno")}>
              {dataCommonDic?.sGjSno?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>

            <Label style={{ minWidth: "90px" }}>검침 일자</Label>
            <Controller
              control={control}
              name="sGjDate"
              render={({ field }) => (
                <CustomDatePicker {...field} style={{ width: "110px" }} />
              )}
            />

            <CheckBox
              register={register("sGjPerYn")}
              title="연체 적요일"
              style={{ marginLeft: "20px" }}
            />
            <Controller
              control={control}
              name="sGjPerDate"
              render={({ field }) => (
                <CustomDatePicker {...field} style={{ width: "110px" }} />
              )}
            />

            <div className="buttons ml30">
              <Button
                text="검색"
                icon={!loading && <MagnifyingGlassBig width="15" />}
                type="button"
                color={ButtonColor.DANGER}
                onClick={handleSubmit(submit)}
                loader={
                  loading && (
                    <Loader
                      size={16}
                      style={{
                        marginRight: "12px",
                      }}
                    />
                  )
                }
              />

              <Button
                text="회차별 미검침"
                icon={<Users />}
                type="button"
                color={ButtonColor.LIGHT}
                onClick={handleSubmit(submit2)}
              />
              <Button
                text="전체 미검침"
                icon={<Users />}
                type="button"
                color={ButtonColor.LIGHT}
              />
              <Button
                text="삭제"
                icon={<Trash />}
                type="button"
                color={ButtonColor.LIGHT}
                onClick={handleSubmit(deleteRow)}
              />
            </div>
          </FormGroup>

          <FormGroup>
            <Input
              label="건물명"
              register={register("sCuName")}
              labelStyle={{ minWidth: "70px" }}
              inputSize={InputSize.i200}
            />

            <Label style={{ minWidth: "90px" }}>담당 사원</Label>
            <Select register={register("sSwCode")} width={InputSize.i110}>
              {dataCommonDic?.sSwCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>

            <Label style={{ minWidth: "117px" }}>지역 분류</Label>
            <Select register={register("sJyCode")} width={InputSize.i110}>
              {dataCommonDic?.sJyCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>

            <Label style={{ minWidth: "110px" }}>관리 책임자</Label>
            <Select register={register("sCuCustgubun")} width={InputSize.i110}>
              {dataCommonDic?.sCustgubun?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>

            <Label style={{ minWidth: "90px" }}>수금 방법</Label>
            <Select register={register("sSukumtype")} width={InputSize.i110}>
              {dataCommonDic?.cuSukumtype?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
        </SearchWrapper>
      </form>
      <WrapperContent>
        <Grid
          fields={fields}
          columns={columns}
          data={data}
          setSelected={setSelected}
          setSelectedRowIndex={setSelectedRowIndex}
        />
        <Footer
          data={selected}
          dataCommonDic={dataCommonDic}
          gjGumym={gjGumym}
          gjSno={gjSno}
          gjPerDate={gjPerDate}
          selectedRowIndex={selectedRowIndex}
          setSelectedRowIndex={setSelectedRowIndex}
        />
      </WrapperContent>
    </>
  );
}

export default RV1100;
