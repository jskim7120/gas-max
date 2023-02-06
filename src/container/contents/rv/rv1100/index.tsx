import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { SearchWrapper, WrapperContent } from "../../commonStyle";
import Button from "components/button/button";
import {
  Document,
  Settings2,
  MagnifyingGlass,
  Users,
  Reset,
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
import { RV1100SEARCH } from "app/path";
import { ISEARCH, IRV1100 } from "./model";
import CheckBox from "components/checkbox";
import Grid from "./grid";
import { fields, columns } from "./data/dataTop";
import Loader from "components/loader";
import {
  formatDateByRemoveDash,
  formatOnlyYearMonthDateByRemoveDash,
  formatDateToStringWithoutDashOnlyYearMonth,
} from "helpers/dateFormat";
import Footer from "./footer";

function RV1100({
  depthFullName,
  menuId,
}: {
  depthFullName: string;
  menuId: string;
}) {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState({});
  const [loading, setLoading] = useState(false);
  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "RV",
    functionName: "RV1100",
  });

  //console.log("dataCommonDic::::::::::", dataCommonDic);

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
    console.log(typeof params.sGjGumym, params.sGjGumym);

    params.sGjGumym =
      typeof params.sGjGumym === "string"
        ? formatOnlyYearMonthDateByRemoveDash(params.sGjGumym)
        : params.sGjGumym instanceof Date
        ? formatDateToStringWithoutDashOnlyYearMonth(params.sGjGumym)
        : "";
    params.sGjPerDate = formatDateByRemoveDash(params.sGjPerDate);
    params.sGjDate = formatDateByRemoveDash(params.sGjDate);

    fetchData(params);
  };

  const fetchData = async (params: ISEARCH) => {
    try {
      setLoading(true);
      const { data } = await API.get(RV1100SEARCH, { params: params });
      console.log("data::::::", data);

      if (data.length > 0) {
        setData(data);
      } else {
        setData([]);
      }

      setLoading(false);
    } catch (err) {}
  };

  return (
    <>
      <SearchWrapper style={{ height: "35px", marginTop: "5px" }}>
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <p>{depthFullName}</p>
          <p className="big">영업소</p>

          <Select {...register("areaCode")}>
            {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </div>
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
          />
        </div>
      </SearchWrapper>
      <SearchWrapper>
        <div style={{ width: "70%" }}>
          <Wrapper grid col={4} fields="1fr 0.5fr 0.6fr 1fr">
            <FormGroup>
              <Label style={{ minWidth: "auto" }}>검침년월</Label>
              <Controller
                control={control}
                {...register("sGjGumym")}
                render={({ field: { onChange, value, name } }) => (
                  <CustomDatePicker
                    value={value}
                    onChange={onChange}
                    name={name}
                    showYearDropdown
                  />
                )}
              />
              <Label style={{ minWidth: "auto" }}>회차</Label>
              <Select {...register("sGjSno")} style={{ width: "100%" }}>
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
              />
              <Button
                text="전체 미검침"
                icon={<Users />}
                type="button"
                color={ButtonColor.LIGHT}
                style={{ marginLeft: "6px" }}
              />
            </Field>
          </Wrapper>

          <Wrapper grid col={4} fields="1fr 0.5fr 0.6fr 1fr">
            <FormGroup>
              <Input
                label="건물명"
                register={register("sCuName")}
                labelStyle={{ minWidth: "62px" }}
                fullWidth
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
        />
        <Footer data={selected} />
      </WrapperContent>
    </>
  );
}

export default RV1100;
