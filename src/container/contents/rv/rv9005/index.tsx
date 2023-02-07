import { useState, useEffect } from "react";
import { GR9005SEARCH } from "app/path";
import { IRV9005SEARCH } from "./model";
import API from "app/axios";
import { TopBar, WrapperContent } from "../../commonStyle";
import { useForm, Controller } from "react-hook-form";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { MagnifyingGlass, ExcelIcon, ResetGray } from "components/allSvgIcon";
import { SearchWrapper } from "../../commonStyle";
import {
  Select,
  FormGroup,
  Wrapper,
  Label,
  Field,
} from "components/form/style";
import Loader from "components/loader";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import Grid from "./grid";
import { columns, fields } from "./data";
import {
  formatDateToStringWithoutDash,
  formatDateByRemoveDash,
  formatOnlyYearMonthDateByRemoveDash,
  formatDateToStringWithoutDashOnlyYearMonth,
} from "helpers/dateFormat";

const radioOptions = [
  {
    label: "검침일자",
    id: "1",
  },
  {
    label: "지로 발행일",
    id: "2",
  },
  {
    label: "등록일자",
    id: "3",
  },
  {
    label: "수정일자",
    id: "4",
  },
];

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
    groupId: "GR",
    functionName: "GR9004",
  });

  const { register, handleSubmit, reset, getValues, control } =
    useForm<IRV9005SEARCH>({
      mode: "onSubmit",
    });

  useEffect(() => {
    if (dataCommonDic) {
      console.log("dataCommonDic::::", dataCommonDic);
      resetSearchForm();
    }
  }, [dataCommonDic]);

  const resetSearchForm = () => {
    reset({
      areaCode: dataCommonDic?.areaCode[0].code,
      sType1: dataCommonDic?.sType1[0].code,
      sGjGumymF: dataCommonDic?.sGjGumymF[0].code,
      sGjSnoF: dataCommonDic?.sGjSnoF[0].code,
      sGjGumymT: dataCommonDic?.sGjGumymT[0].code,
      sGjSnoT: dataCommonDic?.sGjSnoT[0].code,
      sType2: dataCommonDic?.sType2[0].code,
      sSwCode: dataCommonDic?.sSwCode[0].code,
      sCuSwCode: dataCommonDic?.sCuSwCode[0].code,
      sCuCustgubun: dataCommonDic?.sCuCustgubun[0].code,
      sJyCode: dataCommonDic?.sJyCode[0].code,
      sSukumtype: dataCommonDic?.cuSukumtype[0].code,
      sSort: dataCommonDic?.sSort[0].code,
      sDateF: dataCommonDic?.sDateF[0].code,
      sDateT: dataCommonDic?.sDateT[0].code,
      sRh20: dataCommonDic?.sRh20[0].code,
    });
  };

  const fetchData = async (params: any) => {
    try {
      setLoading(true);
      const { data } = await API.get(RV9005SEARCH, { params: params });

      if (data) {
        setData(data);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log("RV9005 data search fetch error =======>", err);
    }
  };

  const submit = (params: any) => {
    if (sType1) {
      delete params.sGjGumymF;
      delete params.sGjGumymT;
      delete params.sGjSnoF;
      delete params.sGjSnoT;
      params.sDateF =
        typeof params.sDateF === "string"
          ? formatDateByRemoveDash(params.sDateF)
          : formatDateToStringWithoutDash(params.sDateF);
      params.sDateT =
        typeof params.sDateT === "string"
          ? formatDateByRemoveDash(params.sDateT)
          : formatDateToStringWithoutDash(params.sDateT);
    } else {
      delete params.sDateF;
      delete params.sDateT;
      params.sGjGumymF =
        typeof params.sGjGumymF === "string"
          ? formatOnlyYearMonthDateByRemoveDash(params.sGjGumymF)
          : params.sGjGumymF instanceof Date
          ? formatDateToStringWithoutDashOnlyYearMonth(params.sGjGumymF)
          : "";

      params.sGjGumymT =
        typeof params.sGjGumymT === "string"
          ? formatOnlyYearMonthDateByRemoveDash(params.sGjGumymT)
          : params.sGjGumymT instanceof Date
          ? formatDateToStringWithoutDashOnlyYearMonth(params.sGjGumymT)
          : "";
    }

    if (sType2 === "0") {
      delete params.sCuSwCode;
      delete params.sCuCustgubun;
    } else if (sType2 === "1") {
      delete params.sSwCode;
      delete params.sCuCustgubun;
    } else if (sType2 === "2") {
      delete params.sSwCode;
      delete params.sCuSwCode;
    }

    fetchData(params);
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
        <div className="buttons">
          <Button
            text="출력"
            icon={<Document />}
            type="button"
            color={ButtonColor.LIGHT}
          />
        </div>
      </SearchWrapper>
      <SearchWrapper>
        <div style={{ width: "80%" }}>
          <Wrapper grid col={4} fields="1.2fr 0.8fr 1.2fr 0.6fr">
            <FormGroup style={{ justifyContent: "start" }}>
              <Item>
                <RadioButton
                  type="radio"
                  value="0"
                  {...register(`sType1`)}
                  id="0"
                  onChange={() => setSType1(false)}
                />
                <RadioButtonLabel htmlFor={``}>검침년월</RadioButtonLabel>
              </Item>
              <Controller
                control={control}
                {...register("sGjGumymF")}
                render={({ field: { onChange, value, name } }) => (
                  <CustomDatePicker
                    value={value}
                    onChange={onChange}
                    name={name}
                    showYearDropdown
                    readOnly={sType1}
                  />
                )}
              />
              <Select
                {...register("sGjSnoF")}
                disabled={sType1}
                style={{ marginLeft: "0" }}
              >
                {dataCommonDic?.sGjSnoF?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
              <p>~</p>
              <Controller
                control={control}
                {...register("sGjGumymT")}
                render={({ field: { onChange, value, name } }) => (
                  <CustomDatePicker
                    value={value}
                    onChange={onChange}
                    name={name}
                    showYearDropdown
                    readOnly={sType1}
                  />
                )}
              />
              <Select
                {...register("sGjSnoT")}
                disabled={sType1}
                style={{ marginLeft: "0" }}
              >
                {dataCommonDic?.sGjSnoT?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <FormGroup>
              <Item>
                <RadioButton
                  type="radio"
                  value="0"
                  {...register(`sType2`, {
                    required: "required",
                  })}
                  id="0"
                  onChange={() => setSType2("0")}
                />
                <RadioButtonLabel htmlFor={``} style={{ width: "105px" }}>
                  거래처 담당사원
                </RadioButtonLabel>
              </Item>
              <Select {...register("sSwCode")} disabled={sType2 !== "0"}>
                {dataCommonDic?.sSwCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>

            <Input
              label="건물명"
              register={register("sCuName")}
              labelStyle={{ minWidth: "70px" }}
              inputSize={InputSize.i100}
            />
            <FormGroup>
              <Button
                text="검색"
                icon={!loading && <MagnifyingGlass />}
                type="button"
                color={ButtonColor.SECONDARY}
                onClick={handleSubmit(submit)}
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
                onClick={resetSearchForm}
              />
            </FormGroup>
          </Wrapper>
          <Wrapper grid col={4} fields="1.2fr 0.8fr 1.2fr 0.6fr">
            <FormGroup>
              {radioOptions.map((option, index) => (
                <Item key={index}>
                  <RadioButton
                    type="radio"
                    value={option.id}
                    {...register(`sType1`, {
                      required: "required",
                    })}
                    id={option.id}
                    onChange={() => setSType1(true)}
                  />
                  <RadioButtonLabel
                    htmlFor={`${option.label}`}
                    style={{ width: "max-content" }}
                  >
                    {option.label}
                  </RadioButtonLabel>
                </Item>
              ))}
            </FormGroup>
            <FormGroup>
              <Item>
                <RadioButton
                  type="radio"
                  value="1"
                  {...register(`sType2`)}
                  id="1"
                  onChange={() => setSType2("1")}
                />
                <RadioButtonLabel htmlFor={``} style={{ width: "105px" }}>
                  체 적 검침사원
                </RadioButtonLabel>
              </Item>
              <Select {...register("sCuSwCode")} disabled={sType2 !== "1"}>
                {dataCommonDic?.sCuSwCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <FormGroup>
              <Label style={{ minWidth: "70px" }}>지역분류</Label>
              <Select {...register("sJyCode")}>
                {dataCommonDic?.sJyCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
          </Wrapper>
          <Wrapper grid col={4} fields="1.2fr 0.8fr 1.2fr 0.6fr">
            <FormGroup>
              <Label style={{ minWidth: "95px" }}>기간</Label>
              <Controller
                control={control}
                {...register("sDateF")}
                render={({ field: { onChange, value, name } }) => (
                  <CustomDatePicker
                    value={value}
                    onChange={onChange}
                    name={name}
                    readOnly={!sType1}
                  />
                )}
              />
              <p
                style={{
                  width: "auto",
                  display: "block",
                  textAlign: "center",
                }}
              >
                ~
              </p>
              <Controller
                control={control}
                {...register("sDateT")}
                render={({ field: { onChange, value, name } }) => (
                  <CustomDatePicker
                    value={value}
                    onChange={onChange}
                    name={name}
                    readOnly={!sType1}
                  />
                )}
              />
            </FormGroup>
            <FormGroup>
              <Item>
                <RadioButton
                  type="radio"
                  value="2"
                  {...register(`sType2`)}
                  id="2"
                  onChange={() => setSType2("2")}
                />
                <RadioButtonLabel htmlFor={``} style={{ width: "105px" }}>
                  관리책임자 분류
                </RadioButtonLabel>
              </Item>
              <Select {...register("sCuCustgubun")} disabled={sType2 !== "2"}>
                {dataCommonDic?.sCuCustgubun?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup>
              <Label style={{ minWidth: "70px" }}>수금방법</Label>
              <Select {...register("sSukumtype")}>
                {dataCommonDic?.cuSukumtype?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>

              <Label>조정기 압력</Label>
              <Select {...register("sRh20")}>
                {dataCommonDic?.sRh20?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
              <p>mmH20</p>
            </FormGroup>
            <FormGroup>
              <Label>정렬순서</Label>
              <Select {...register("sSort")}>
                {dataCommonDic?.sSort?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
          </Wrapper>
        </div>
      </SearchWrapper>
      <WrapperContent>
        <Grid data={data} columns={columns} fields={fields} />
      </WrapperContent>
    </>
  );
}

export default RV9005;
