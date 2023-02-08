import { useState, useEffect, useRef } from "react";
import { CC1100SEARCH } from "app/path";
import { ICC1100SEARCH } from "./model";
import API from "app/axios";
import { MainWrapper, TopBar, RightSide } from "../../commonStyle";
import { useForm, Controller } from "react-hook-form";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import Form from "./form";
import { MagnifyingGlass, ResetGray } from "components/allSvgIcon";
import { SearchWrapper } from "../../commonStyle";
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
import { ButtonColor, InputSize, FieldKind } from "components/componentsType";
import CustomDatePicker from "components/customDatePicker";
import Grid from "../grid";
import { columns, fields } from "./data";

function CC1100({
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
    functionName: "CC1100",
  });

  console.log("CC1100:", dataCommonDic);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
    control,
  } = useForm<ICC1100SEARCH>({
    mode: "onSubmit",
  });

  const resetForm = () => {
    if (dataCommonDic !== undefined) {
      reset({
        areaCode: dataCommonDic?.areaCode[0].code,
        codeGu: dataCommonDic?.codeGu[0].code,
      });
    }
  };

  useEffect(() => {
    reset({
      areaCode: dataCommonDic?.areaCode[0].code,
      sDateT: dataCommonDic?.sDateT[0].code,
      sDateF: dataCommonDic?.sDateF[0].code,
    });
  }, [dataCommonDic]);

  const resetSearchForm = () => {
    reset({
      areaCode: dataCommonDic?.areaCode[0].code,
    });
  };

  const fetchData = async (params: any) => {
    try {
      setLoading(true);
      const { data } = await API.get(CC1100SEARCH, { params: params });
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
    resetForm();
    setDataChk(true);
    setData([]);
  };

  const submit = (data: ICC1100SEARCH) => {
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
      <form onSubmit={handleSubmit(submit)}>
        <SearchWrapper style={{ alignItems: "baseline" }}>
          <div>
            <Wrapper grid col={2} fields="1fr 1.5fr">
              <FormGroup>
                <Input
                  label="충전소"
                  register={register("codeGu")}
                  labelStyle={{ minWidth: "70px" }}
                  inputSize={InputSize.i100}
                />
              </FormGroup>
              <FormGroup>
                <Label style={{ minWidth: "auto" }}>기간</Label>
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
                <Label style={{ minWidth: "auto" }}>~</Label>
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
      </form>
      <MainWrapper style={{ height: `calc(100% - 76px)` }}>
        <Grid
          data={data.length > 0 && data}
          columns={columns}
          fields={fields}
          setSelected={setSelected}
          selectedRowIndex={selectedRowIndex}
          setSelectedRowIndex={setSelectedRowIndex}
        />
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

export default CC1100;
