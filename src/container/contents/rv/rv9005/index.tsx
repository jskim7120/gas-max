import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { apiGet } from "app/axios";
import { RV9005SEARCH } from "app/path";
import { IRV9005SEARCH } from "./model";
import { SearchWrapper, WrapperContent } from "../../commonStyle";
import { useGetCommonDictionaryMutation } from "app/api/commonDictionary";
import { MagnifyingGlass, ResetGray, Document } from "components/allSvgIcon";
import CustomDatePicker from "components/customDatePicker";
import {
  Item,
  RadioButton,
  RadioButtonLabel,
} from "components/radioButton/style";
import {
  Select,
  FormGroup,
  Wrapper,
  Label,
  Input,
  Field,
} from "components/form/style";
import Loader from "components/loader";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import Grid from "./grid";
import { columns, fields } from "./data";
import {
  DateWithoutDash,
  DateWithoutDashOnlyYearMonth,
} from "helpers/dateFormat";
import { PrintPreview, Print } from "components/allSvgIcon";

const radioOptions = [
  {
    label: "검침 일자",
    id: "1",
  },
  {
    label: "지로 발행일",
    id: "2",
  },
  {
    label: "등록 일자",
    id: "3",
  },
  {
    label: "수정 일자",
    id: "4",
  },
];

function RV9005({
  depthFullName,
  menuId,
  areaCode,
}: {
  depthFullName: string;
  menuId: string;
  areaCode: string;
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [sType1, setSType1] = useState(false);
  const [sType2, setSType2] = useState("0");

  const [getCommonDictionary, { data: dataCommonDic }] =
    useGetCommonDictionaryMutation();

  const { register, handleSubmit, reset, control } = useForm<IRV9005SEARCH>({
    mode: "onSubmit",
  });

  useEffect(() => {
    getCommonDictionary({ groupId: "RV", functionName: "RV9005" });
  }, []);

  useEffect(() => {
    if (dataCommonDic) {
      resetSearchForm();
    }
  }, [dataCommonDic]);

  const openNewWindow = async () => {
    const width = 1500;
    const height = 2000;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2;

    const newWindow = window.open(
      "/print" + `?${JSON.stringify(data)}`,
      "",
      `width=${width},height=${height},left=${left},top=${top},resizable,scrollbars=yes,status=1`
    );
  };

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
    // try {
    //   setLoading(true);
    //   const { data: dataRV9005 } = await API.get(RV9005SEARCH, {
    //     params: params,
    //   });

    //   if (dataRV9005) {
    //     setData(dataRV9005);
    //   } else {
    //     setData([]);
    //   }
    //   setLoading(false);
    // } catch (err) {
    //   setLoading(false);
    //   setData([]);
    //   console.log("RV9005 data search fetch error =======>", err);
    // }

    setLoading(true);
    const dataRV9005 = await apiGet(RV9005SEARCH, params);

    if (dataRV9005) {
      setData(dataRV9005);
    } else {
      setData([]);
    }
    setLoading(false);
  };

  const submit = (params: any) => {
    if (sType1) {
      delete params.sGjGumymF;
      delete params.sGjGumymT;
      delete params.sGjSnoF;
      delete params.sGjSnoT;

      params.sDateF = DateWithoutDash(params.sDateF);
      params.sDateT = DateWithoutDash(params.sDateT);
    } else {
      delete params.sDateF;
      delete params.sDateT;

      params.sGjGumymF = DateWithoutDashOnlyYearMonth(params.sGjGumymF);
      params.sGjGumymT = DateWithoutDashOnlyYearMonth(params.sGjGumymT);
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

  const handleReset = () => {
    if (dataCommonDic?.dataInit) {
      resetSearchForm();
    }
    setData([]);
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)} autoComplete="off">
        <SearchWrapper className="h35 mt5">
          <FormGroup>
            {areaCode === "00" && (
              <>
                <Label style={{ minWidth: "72px" }}>영업소</Label>
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
              />
              <Button
                text="취소"
                icon={<ResetGray />}
                type="button"
                color={ButtonColor.LIGHT}
                onClick={handleReset}
              />
              <Button
                text="미리보기"
                icon={<PrintPreview />}
                color={ButtonColor.LIGHT}
                type="button"
                onClick={openNewWindow}
              />
              <Button
                text="출력"
                icon={<Print />}
                color={ButtonColor.LIGHT}
                type="button"
              />
            </div>
          </FormGroup>
          <p>{depthFullName}</p>
        </SearchWrapper>

        <SearchWrapper>
          <div style={{ width: "80%" }}>
            <Wrapper grid col={4} fields="1.2fr 0.8fr 1.2fr 0.6fr">
              <FormGroup>
                <Item>
                  <RadioButton
                    type="radio"
                    value="0"
                    {...register(`sType1`)}
                    id="0"
                    onChange={() => setSType1(false)}
                  />
                  <RadioButtonLabel htmlFor={``}>검침 년월</RadioButtonLabel>
                </Item>
                <Controller
                  control={control}
                  {...register("sGjGumymF")}
                  render={({ field: { onChange, value, name } }) => (
                    <CustomDatePicker
                      value={value}
                      onChange={onChange}
                      name={name}
                      showMonthYearPicker
                      readOnly={sType1}
                    />
                  )}
                />
                <Select
                  register={register("sGjSnoF")}
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
                      showMonthYearPicker
                      readOnly={sType1}
                    />
                  )}
                />
                <Select
                  register={register("sGjSnoT")}
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
                    {...register(`sType2`)}
                    id="0"
                    onChange={() => setSType2("0")}
                  />
                  <RadioButtonLabel htmlFor={``} style={{ width: "105px" }}>
                    거래처 담당사원
                  </RadioButtonLabel>
                </Item>
                <Select
                  register={register("sSwCode")}
                  disabled={sType2 !== "0"}
                  width={InputSize.i120}
                >
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
                inputSize={InputSize.i120}
              />
            </Wrapper>
            <Wrapper grid col={4} fields="1.2fr 0.8fr 1.2fr 0.6fr">
              <FormGroup>
                {radioOptions.map((option, index) => (
                  <Item key={index}>
                    <RadioButton
                      type="radio"
                      value={option.id}
                      {...register(`sType1`)}
                      id={option.id}
                      onChange={() => setSType1(true)}
                    />
                    <RadioButtonLabel htmlFor={`${option.label}`}>
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
                    체적 검침 사원
                  </RadioButtonLabel>
                </Item>
                <Select
                  register={register("sCuSwCode")}
                  disabled={sType2 !== "1"}
                  width={InputSize.i120}
                >
                  {dataCommonDic?.sCuSwCode?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>
              <FormGroup>
                <Label style={{ minWidth: "70px" }}>지역 분류</Label>
                <Select register={register("sJyCode")} width={InputSize.i120}>
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
                    관리 책임자 분류
                  </RadioButtonLabel>
                </Item>
                <Select
                  register={register("sCuCustgubun")}
                  disabled={sType2 !== "2"}
                  width={InputSize.i120}
                >
                  {dataCommonDic?.sCuCustgubun?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup>
                <Label style={{ minWidth: "70px" }}>수금 방법</Label>
                <Select
                  register={register("sSukumtype")}
                  width={InputSize.i120}
                >
                  {dataCommonDic?.cuSukumtype?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>

                <Label>조정기 압력</Label>
                <Select register={register("sRh20")}>
                  {dataCommonDic?.sRh20?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
                <p>mmH20</p>
              </FormGroup>
              <FormGroup>
                <Label style={{ minWidth: "90px" }}>정렬 순서</Label>
                <Select register={register("sSort")}>
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
      </form>
      <WrapperContent>
        <Grid data={data} columns={columns} fields={fields} />
      </WrapperContent>
    </>
  );
}

export default RV9005;
