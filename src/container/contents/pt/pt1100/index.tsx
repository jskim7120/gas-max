import { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import API from "app/axios";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { PT1100SEARCH, GR1500SEARCH2 } from "app/path";
import {
  SearchWrapper,
  MainWrapper,
  LeftSide,
  RightSide,
} from "../../commonStyle";
import { IPT1100SEARCH } from "./model";
import { IPT1100THIRD } from "./thirdModel";
import Button from "components/button/button";
import { columns, fields } from "./data";
import { columnsSecond, fieldsSecond } from "./secondData";
import { columnsThird, fieldsThird } from "./thirdData";
import Grid from "components/grid";
import Loader from "components/loader";
import { MagnifyingGlass } from "components/allSvgIcon";
import CheckBox from "components/checkbox";
import Form from "./form";
import CustomDatePicker from "components/customDatePicker";
import { FormGroup, Select, Label, Field, Input } from "components/form/style";
import { ButtonColor, InputSize } from "components/componentsType";
import CustomTopPart from "container/contents/customTopPart";

function PT1100({
  depthFullName,
  menuId,
  areaCode,
}: {
  depthFullName: string;
  menuId: string;
  areaCode: string;
}) {
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [data, setData] = useState([]);
  const [dataSecond, setDataSecond] = useState([]);
  const [dataThird, setDataThird] = useState([]);
  const [selected, setSelected] = useState<any>({});
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);

  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "PT",
    functionName: "PT1100",
  });

  useEffect(() => {
    if (dataCommonDic !== undefined && dataCommonDic) {
      reset({
        areaCode: dataCommonDic?.areaCode[0].code,
      });
    }
  }, [dataCommonDic]);

  const fetchDataSearch1 = async (params: any) => {
    try {
      setLoading1(true);
      const { data } = await API.get(PT1100SEARCH, { params: params });

      if (data) {
        setData(data);
        setLoading1(false);
        setSelectedRowIndex(0);
      }
    } catch (err) {
      console.log("PT1100 data search fetch error =======>", err);
    }
  };

  const fetchDataSearch2 = async (params: any) => {
    try {
      setLoading2(true);
      const { data } = await API.get(PT1100SEARCH, { params: params });

      if (data) {
        setDataSecond(data);
        setLoading2(false);
        setSelectedRowIndex(0);
      }
    } catch (err) {
      console.log("PT1100 data search fetch error =======>", err);
    }
  };

  const fetchDataSearch3 = async (params: any) => {
    try {
      setLoading2(true);
      const { data } = await API.get(GR1500SEARCH2, { params: params });

      if (data) {
        setDataThird(data);
        setLoading2(false);
        setSelectedRowIndex(0);
      }
    } catch (err) {
      console.log("PT1100 data search fetch error =======>", err);
    }
  };

  const submitSearch1 = (data: IPT1100SEARCH) => {
    if (data.sCheck) {
      data.sCheck = "Y";
    } else {
      data.sCheck = "N";
    }
    fetchDataSearch1(data);
  };

  const submitSearch2 = (data: IPT1100SEARCH) => {
    fetchDataSearch2(data);
  };

  const { register, handleSubmit, control, reset } = useForm<IPT1100SEARCH>({
    mode: "onSubmit",
  });

  return (
    <>
      <CustomTopPart
        depthFullName={depthFullName}
        register={register}
        dataCommonDic={dataCommonDic}
        areaCode={areaCode}
      />
      <MainWrapper>
        <LeftSide>
          <form
            onSubmit={handleSubmit(submitSearch1)}
            style={{ minWidth: "925px" }}
          >
            <SearchWrapper className="h35">
              <Field flex>
                <FormGroup>
                  <Input
                    label="거래처"
                    register={register("sCuName")}
                    inputSize={InputSize.i140}
                  />
                </FormGroup>
                <FormGroup>
                  <CheckBox
                    register={{ ...register("sCheck") }}
                    title="조건검색"
                    rtl
                    style={{ width: "80px" }}
                  />
                </FormGroup>
              </Field>

              <div className="buttons">
                <Button
                  text="검색"
                  icon={!loading1 && <MagnifyingGlass />}
                  color={ButtonColor.DANGER}
                  type="submit"
                  loader={
                    loading1 && (
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
              </div>
            </SearchWrapper>
          </form>

          <Grid
            areaCode={areaCode}
            data={data.length > 0 && data}
            columns={columns}
            fields={fields}
            setSelected={setSelected}
            selectedRowIndex={selectedRowIndex}
            setSelectedRowIndex={setSelectedRowIndex}
            style={{ height: "43%", minWidth: "925px" }}
          />
          <Grid
            areaCode={areaCode}
            data={dataSecond.length > 0 && dataSecond}
            columns={columnsSecond}
            fields={fieldsSecond}
            setSelected={setSelected}
            selectedRowIndex={selectedRowIndex}
            setSelectedRowIndex={setSelectedRowIndex}
            style={{ height: "14%", minWidth: "925px" }}
          />
          <form
            onSubmit={handleSubmit(submitSearch2)}
            style={{ minWidth: "925px" }}
          >
            <SearchWrapper
              className="h35"
              style={{ borderTop: "2px solid #707070" }}
            ></SearchWrapper>
            <SearchWrapper className="h35">
              <div className="buttons">
                <Controller
                  control={control}
                  {...register("areaCode")}
                  render={({ field: { onChange, value, name } }) => (
                    <CustomDatePicker
                      value={value}
                      onChange={onChange}
                      name={name}
                    />
                  )}
                />
                <Button
                  text="검색"
                  icon={!loading2 && <MagnifyingGlass />}
                  color={ButtonColor.DANGER}
                  type="submit"
                  loader={
                    loading2 && (
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
              </div>
            </SearchWrapper>
          </form>

          <Grid
            areaCode={areaCode}
            data={dataSecond.length > 0 && dataSecond}
            columns={columnsThird}
            fields={fieldsSecond}
            setSelected={setSelected}
            selectedRowIndex={selectedRowIndex}
            setSelectedRowIndex={setSelectedRowIndex}
            style={{ height: "43%", minWidth: "925px" }}
          />
        </LeftSide>

        <RightSide>
          <Form
            selected={selected}
            ref={formRef}
            fetchData={fetchDataSearch1}
            setData={setData}
            selectedRowIndex={selectedRowIndex}
            setSelectedRowIndex={setSelectedRowIndex}
            setSelected={setSelected}
            dataCommonDic={dataCommonDic}
          />
        </RightSide>
      </MainWrapper>
    </>
  );
}

export default PT1100;
