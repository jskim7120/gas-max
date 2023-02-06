import { useState, useEffect } from "react";
import { RV9005SEARCH } from "app/path";
import { IRV9005SEARCH } from "./model";
import API from "app/axios";
import { SearchWrapper, WrapperContent } from "../../commonStyle";
import { useForm, Controller } from "react-hook-form";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
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
  Field,
  Input,
} from "components/form/style";
import Loader from "components/loader";
import Button from "components/button/button";
import { ButtonColor } from "components/componentsType";
import Grid from "./grid";
import { columns, fields } from "./data";
import { formatDateToStringWithoutDash } from "helpers/dateFormat";

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
  const [sType1, setSType1] = useState(false);
  const [sType2, setSType2] = useState("0");

  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "RV",
    functionName: "RV9005",
  });

  console.log("dataCommonDic:", dataCommonDic);
  const { register, handleSubmit, reset, getValues, control } =
    useForm<IRV9005SEARCH>({
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
      params.sGjGumymF = formatDateToStringWithoutDash(params.sGjGumymF);
      params.sGjGumymT = formatDateToStringWithoutDash(params.sGjGumymT);
      params.sDateF = formatDateToStringWithoutDash(params.sDateF);
      params.sDateT = formatDateToStringWithoutDash(params.sDateT);
      const { data } = await API.get(RV9005SEARCH, { params: params });
      console.log("data irev:", data);
      if (data) {
        setData(data);
        setLoading(false);
      }
    } catch (err) {
      console.log("RV9005 data search fetch error =======>", err);
    }
  };

  const cancel = () => {
    resetForm();
    setData([]);
  };

  const submit = (data: IRV9005SEARCH) => {
    console.log("IISEARCH:", data);
    fetchData(data);
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
            text="출력"
            icon={<Document />}
            type="button"
            color={ButtonColor.LIGHT}
          />
        </div>
      </SearchWrapper>
      <SearchWrapper>
        <div style={{ width: "80%" }}>
          <Wrapper grid col={4} fields="1.2fr 0.8fr 1.3fr 0.7fr">
            <FormGroup>
              <Item>
                <RadioButton
                  type="radio"
                  value="0"
                  {...register(`sType1`, {
                    required: "required",
                  })}
                  id="0"
                  onChange={() => setSType1(false)}
                />
                <RadioButtonLabel
                  htmlFor={`검침년월`}
                  style={{ width: "max-content" }}
                >
                  검침년월
                </RadioButtonLabel>
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
                {dataCommonDic?.sGjSnoF?.map((obj: any, idx: number) => (
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

            <Input label="건물명" register={register("sCuName")} />
            <FormGroup>
              <Button
                text="검색"
                icon={!loading && <MagnifyingGlass />}
                type="button"
                color={ButtonColor.SECONDARY}
                style={{ marginLeft: "30px" }}
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
                text="취소"
                icon={<ResetGray />}
                style={{ marginLeft: "5px" }}
                color={ButtonColor.LIGHT}
                // onClick={resetSearch}
              />
            </FormGroup>
          </Wrapper>
          <Wrapper grid col={4} fields="1.2fr 0.8fr 1.3fr 0.7fr">
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
                  {...register(`sType2`, {
                    required: "required",
                  })}
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
              <Label>지역분류</Label>
              <Select {...register("sJyCode")}>
                {dataCommonDic?.sJyCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
          </Wrapper>
          <Wrapper grid col={4} fields="1.2fr 0.8fr 1.3fr 0.7fr">
            <FormGroup style={{ justifyContent: "space-evenly" }}>
              <Label>기간</Label>
              <Controller
                control={control}
                {...register("sDateF")}
                render={({ field: { onChange, value, name } }) => (
                  <CustomDatePicker
                    value={value}
                    onChange={onChange}
                    name={name}
                    style={{ marginLeft: "0px" }}
                    readOnly={!sType1}
                  />
                )}
              />
              <p
                style={{
                  width: "100%",
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
                    style={{ marginLeft: "0px" }}
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
                  {...register(`sType2`, {
                    required: "required",
                  })}
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
              <Label>수금방법</Label>
              <Select {...register("sSukumtype")}>
                {dataCommonDic?.cuSukumtype?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>

              <Label>조정기 압력</Label>
              <Select {...register("sRh20")}>
                {dataCommonDic?.cuSukumtype?.map((obj: any, idx: number) => (
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
