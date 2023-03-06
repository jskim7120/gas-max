import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { toast } from "react-toastify";
import { useDispatch } from "app/store";
import { SearchWrapper, WrapperContent } from "../../commonStyle";
import Button from "components/button/button";
import { openModal, rv1100Popup } from "app/state/modal/modalSlice";
import {
  Document,
  Settings2,
  MagnifyingGlass,
  Users,
  Reset,
  Trash,
} from "components/allSvgIcon";
import { ButtonColor, InputSize } from "components/componentsType";
import {
  Select,
  Wrapper,
  Label,
  Field,
  FormGroup,
  Input,
} from "components/form/style";
import CustomDatePicker from "components/customDatePicker";
import API from "app/axios";
import { RV1100SEARCH, RV1100SEARCH62, RV1100DELETE } from "app/path";
import { ISEARCH } from "./model";
import CheckBox from "components/checkbox";
import Grid from "./grid";
import { fields, columns } from "./data/dataTop";
import Loader from "components/loader";
import {
  formatDateByRemoveDash,
  formatDateToStringWithoutDash,
  formatOnlyYearMonthDateByRemoveDash,
  formatDateToStringWithoutDashOnlyYearMonth,
} from "helpers/dateFormat";
import Footer from "./footer";
import { CustomAreaCodePart } from "container/contents/customTopPart";

function RV1100({
  depthFullName,
  menuId,
  areaCode,
}: {
  depthFullName: string;
  menuId: string;
  areaCode: string;
}) {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState({});
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [gjGumym, setGjGumym] = useState<string>();
  const [gjSno, setGjSno] = useState<string>();
  const [gjPerDate, setGjPerDate] = useState<string>();
  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "RV",
    functionName: "RV1100",
  });

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
    params.sGjGumym =
      typeof params.sGjGumym === "string"
        ? formatOnlyYearMonthDateByRemoveDash(params.sGjGumym)
        : params.sGjGumym instanceof Date
        ? formatDateToStringWithoutDashOnlyYearMonth(params.sGjGumym)
        : "";
    params.sGjPerDate =
      typeof params.sGjPerDate === "string"
        ? formatDateByRemoveDash(params.sGjPerDate)
        : params.sGjPerDate instanceof Date
        ? formatDateToStringWithoutDash(params.sGjPerDate)
        : "";
    params.sGjDate =
      typeof params.sGjDate === "string"
        ? formatDateByRemoveDash(params.sGjDate)
        : params.sGjDate instanceof Date
        ? formatDateToStringWithoutDash(params.sGjDate)
        : "";

    fetchData(params);
  };

  const submit2 = async (params: any) => {
    params.sGjGumym =
      typeof params.sGjGumym === "string"
        ? formatOnlyYearMonthDateByRemoveDash(params.sGjGumym)
        : params.sGjGumym instanceof Date
        ? formatDateToStringWithoutDashOnlyYearMonth(params.sGjGumym)
        : "";
    params.sGjPerDate =
      typeof params.sGjPerDate === "string"
        ? formatDateByRemoveDash(params.sGjPerDate)
        : params.sGjPerDate instanceof Date
        ? formatDateToStringWithoutDash(params.sGjPerDate)
        : "";
    params.sGjDate =
      typeof params.sGjDate === "string"
        ? formatDateByRemoveDash(params.sGjDate)
        : params.sGjDate instanceof Date
        ? formatDateToStringWithoutDash(params.sGjDate)
        : "";

    search2(params);
  };

  const fetchData = async (params: ISEARCH) => {
    try {
      setLoading(true);
      const { data } = await API.get(RV1100SEARCH, { params: params });

      if (data.mainData.length > 0) {
        setData(data.mainData);
      } else {
        setData([]);
      }

      setLoading(false);
    } catch (err) {}
  };

  const openPopupEN1500 = async (selected: any) => {
    dispatch(openModal({ type: "en1500Modal" }));
    dispatch(rv1100Popup({ areaCode: selected.areaCode }));
  };

  const search2 = async (params: ISEARCH) => {
    try {
      const { data } = await API.get(RV1100SEARCH62, { params: params });

      if (data.mainData.length > 0) {
        setData(data.mainData);
      } else {
        setData([]);
      }
    } catch (err) {}
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
        newData.gjGumym = formatOnlyYearMonthDateByRemoveDash(newData.gjGumym);
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
        newData.gjPerDate = formatDateByRemoveDash(newData.gjPerDate);
      }
      newData.gjDate = formatDateByRemoveDash(newData.gjDate);
      newData.gjLdate = formatDateByRemoveDash(newData.gjLdate);
      newData.gjSdate = formatDateByRemoveDash(newData.gjSdate);

      try {
        const response: any = await API.post(RV1100DELETE, newData);

        if (response.status === 200) {
          toast.success("삭제하였습니다", {
            autoClose: 500,
          });
          params.sGjDate = formatDateByRemoveDash(params.sGjDate);
          params.sGjGumym = formatOnlyYearMonthDateByRemoveDash(
            params.sGjGumym
          );
          params.sGjPerDate = formatDateByRemoveDash(params.sGjPerDate);
          await fetchData(params);
        } else {
          toast.error(response?.response?.message, {
            autoClose: 500,
          });
        }
      } catch (err) {
        toast.error("Couldn't delete", {
          autoClose: 500,
        });
      }
    }
  };

  const gjPerDateChanged = (value: any) => {
    value = value instanceof Date ? formatDateToStringWithoutDash(value) : null;
    setGjPerDate(value);
  };

  const gjGumymChanged = (value: any) => {
    value =
      value instanceof Date
        ? formatDateToStringWithoutDashOnlyYearMonth(value)
        : null;
    setGjGumym(value);
  };

  return (
    <>
      <SearchWrapper className="h35 mt5">
        <CustomAreaCodePart
          areaCode={areaCode}
          dataCommonDic={dataCommonDic}
          depthFullName={depthFullName}
          register={register}
        />
        <div className="buttons">
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
            style={{ marginLeft: "7px" }}
            onClick={() => {
              openPopupEN1500(selected);
            }}
          />
        </div>
      </SearchWrapper>
      <SearchWrapper>
        <div style={{ width: "70%" }}>
          <Wrapper grid col={4} fields="0.7fr 0.5fr 0.6fr 1fr">
            <FormGroup>
              <Label style={{ minWidth: "90px" }}>검침년월</Label>
              <Controller
                control={control}
                {...register("sGjGumym")}
                render={({ field: { onChange, value, name } }) => (
                  <CustomDatePicker
                    value={value}
                    // onChange={(e: any) => gjGumymChanged(e)}
                    onChange={onChange}
                    name={name}
                    showYearDropdown
                  />
                )}
              />
              <Label style={{ minWidth: "41px" }}>회차</Label>
              <Select
                {...register("sGjSno")}
                style={{ marginLeft: "0" }}
                onChange={(e: any) => setGjSno(e.target.value)}
              >
                {dataCommonDic?.sGjSno?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup>
              <Label style={{ minWidth: "80px" }}>검침일자</Label>
              <Controller
                control={control}
                {...register("sGjDate")}
                render={({ field: { onChange, value, name } }) => (
                  <CustomDatePicker
                    value={value}
                    onChange={onChange}
                    name={name}
                    style={{ marginLeft: "0px" }}
                  />
                )}
              />
            </FormGroup>

            <FormGroup style={{ gap: "8px" }}>
              <CheckBox
                register={{ ...register("sGjPerYn") }}
                title="연체적요일"
              />
              <Controller
                control={control}
                {...register("sGjPerDate")}
                render={({ field: { onChange, value, name } }) => (
                  <CustomDatePicker
                    value={value}
                    // onChange={gjPerDateChanged}
                    onChange={onChange}
                    name={name}
                  />
                )}
              />
            </FormGroup>
            <Field flex>
              <Button
                text="검색"
                icon={!loading && <MagnifyingGlass />}
                type="button"
                color={ButtonColor.SECONDARY}
                //style={{ marginLeft: "8px" }}
                onClick={handleSubmit(submit)}
                loader={
                  loading && (
                    <>
                      <Loader
                        color="white"
                        size={16}
                        style={{ marginRight: "10px" }}
                        borderWidth="2px"
                      />
                    </>
                  )
                }
              />
              <Button
                text="회차별 미검침"
                icon={<Users />}
                type="button"
                color={ButtonColor.LIGHT}
                style={{ marginLeft: "6px" }}
                onClick={handleSubmit(submit2)}
              />
              <Button
                text="전체 미검침"
                icon={<Users />}
                type="button"
                color={ButtonColor.LIGHT}
                style={{ marginLeft: "6px" }}
              />
              <Button
                text="삭제"
                icon={<Trash />}
                type="button"
                color={ButtonColor.LIGHT}
                style={{ marginLeft: "6px" }}
                onClick={handleSubmit(deleteRow)}
              />
            </Field>
          </Wrapper>

          <Wrapper grid col={4} fields="0.7fr 0.5fr 0.6fr 1fr">
            <FormGroup>
              <Input
                label="건물명"
                register={register("sCuName")}
                labelStyle={{ minWidth: "90px" }}
                inputSize={InputSize.i200}
              />
            </FormGroup>
            <FormGroup>
              <Label style={{ minWidth: "80px" }}>담당사원</Label>
              <Select {...register("sSwCode")}>
                {dataCommonDic?.sSwCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <FormGroup>
              <Label style={{ minWidth: "67px" }}>지역분류</Label>
              <Select {...register("sJyCode")} style={{ width: "149px" }}>
                {dataCommonDic?.sJyCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>

            <Field flex>
              <FormGroup>
                <Label style={{ minWidth: "76px" }}>관리책임자</Label>
                <Select {...register("sCuCustgubun")}>
                  {dataCommonDic?.sCustgubun?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>수금방법</Label>
                <Select {...register("sSukumtype")}>
                  {dataCommonDic?.cuSukumtype?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>
            </Field>
          </Wrapper>
        </div>
      </SearchWrapper>
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
