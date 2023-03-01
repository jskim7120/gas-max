import { useState, useEffect, useRef } from "react";
import { CC1200SEARCH } from "app/path";
import { ICC1200SEARCH } from "./model";
import API from "app/axios";
import CheckBox from "components/checkbox";
import {
  MainWrapper,
  TopBar,
  WrapperContent,
  RightSide,
  LeftSide,
} from "../../commonStyle";
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
import Form from "./form";
import Loader from "components/loader";
import Button from "components/button/button";
import { ButtonColor } from "components/componentsType";
import CustomDatePicker from "components/customDatePicker";
import Grid from "../grid";
import { columns, fields } from "./data";
import { formatDateToStringWithoutDash } from "helpers/dateFormat";

function CC1200({
  depthFullName,
  menuId,
}: {
  depthFullName: string;
  menuId: string;
}) {
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState<any>({});
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const [dataChk, setDataChk] = useState(true);
  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "CC",
    functionName: "CC1200",
  });

  console.log("CC1200:", dataCommonDic);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
    control,
  } = useForm<ICC1200SEARCH>({
    mode: "onSubmit",
  });

  const resetSearchForm = () => {
    reset({
      areaCode: dataCommonDic?.areaCode[0].code,
      sDateT: dataCommonDic?.sDateT[0].code,
      sDateF: dataCommonDic?.sDateF[0].code,
    });
  };

  useEffect(() => {
    if (dataCommonDic) {
      resetSearchForm();
    }
  }, [dataCommonDic]);

  const fetchData = async (params: any) => {
    try {
      setLoading(true);
      const { data } = await API.get(CC1200SEARCH, { params: params });
      console.log("data irev:", data);
      if (data) {
        setData(data);
        setLoading(false);
        setSelectedRowIndex(0);
      }
    } catch (err) {
      console.log("CC1200 data search fetch error =======>", err);
    }
  };

  const cancel = () => {
    resetSearchForm();
    setDataChk(true);
    setData([]);
  };

  const submit = (data: ICC1200SEARCH) => {
    if (data.userChk === "true") {
      data.userChk = "Y";
    } else {
      data.userChk = "N";
    }

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
      <MainWrapper>
        <LeftSide>
          <SearchWrapper style={{ alignItems: "baseline" }}>
            <div>
              <Wrapper grid col={2} fields="1fr 1.5fr">
                <FormGroup>
                  <Label style={{ minWidth: "80px" }}>기간</Label>

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
                  <p>~</p>

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
                </FormGroup>
                <Field>
                  <FormGroup>
                    &nbsp;&nbsp;
                    <CheckBox register={{ ...register("userChk") }} />
                    &nbsp; &nbsp; &nbsp;
                    <Label>사용자등록 자료만 보기</Label>
                  </FormGroup>
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
                onClick={cancel}
              />
            </div>
          </SearchWrapper>
          <Grid
            data={data}
            fields={fields}
            columns={columns}
            setSelected={setSelected}
            selectedRowIndex={selectedRowIndex}
            setSelectedRowIndex={setSelectedRowIndex}
            style={{ height: `calc(100% - 38px)` }}
          />
        </LeftSide>
        <RightSide>
          <Form
            selected={selected}
            ref={formRef}
            fetchData={fetchData}
            setData={setData}
            selectedRowIndex={selectedRowIndex}
            setSelectedRowIndex={setSelectedRowIndex}
            setSelected={setSelected}
          />
        </RightSide>
      </MainWrapper>
    </>
  );
}

export default CC1200;
