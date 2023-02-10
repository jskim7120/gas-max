import { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import API from "app/axios";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { GR1500SEARCH1, GR1500SEARCH2 } from "app/path";
import {
  SearchWrapper,
  MainWrapper,
  LeftSide,
  RightSide,
} from "../../commonStyle";
import { IGR1500SEARCH } from "./model";
import Button from "components/button/button";
import { columns, fields } from "./data";
import { columnsSecond, fieldsSecond } from "./secondData";
import Grid from "../grid";
import Loader from "components/loader";
import { MagnifyingGlass } from "components/allSvgIcon";
import Form from "./form";
import CustomDatePicker from "components/customDatePicker";
import { FormGroup, Select, Label, Field, Input } from "components/form/style";
import { ButtonColor, InputSize } from "components/componentsType";
import CustomTopPart from "container/contents/customTopPart";

function GR1500({
  depthFullName,
  menuId,
}: {
  depthFullName: string;
  menuId: string;
}) {
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [data, setData] = useState([]);
  const [dataSecond, setDataSecond] = useState([]);
  const [selected, setSelected] = useState<any>({});
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);

  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "GR",
    functionName: "GR1500",
  });

  useEffect(() => {
    if (dataCommonDic !== undefined && dataCommonDic) {
      reset({
        areaCode1: dataCommonDic?.areaCode[0].code,
        areaCode: dataCommonDic?.areaCode[0].code,
        sBuGubun: dataCommonDic?.sBuGubun[0].code,
        sBuStae: dataCommonDic?.sBuStae[0].code,
      });
    }
  }, [dataCommonDic]);

  const fetchDataSearch1 = async (params: any) => {
    try {
      setLoading1(true);
      const { data } = await API.get(GR1500SEARCH1, { params: params });

      if (data) {
        setData(data);
        setLoading1(false);
        setSelectedRowIndex(0);
      }
    } catch (err) {
      console.log("GR1500 data search fetch error =======>", err);
    }
  };

  const fetchDataSearch2 = async (params: any) => {
    try {
      setLoading2(true);
      const { data } = await API.get(GR1500SEARCH2, { params: params });

      if (data) {
        setDataSecond(data);
        setLoading2(false);
        setSelectedRowIndex(0);
      }
    } catch (err) {
      console.log("GR1500 data search fetch error =======>", err);
    }
  };

  const submitSearch1 = (data: IGR1500SEARCH) => {
    fetchDataSearch1(data);
  };

  const submitSearch2 = (data: IGR1500SEARCH) => {
    fetchDataSearch2(data);
  };

  const { register, handleSubmit, control, reset } = useForm<IGR1500SEARCH>({
    mode: "onSubmit",
  });

  return (
    <>
      <CustomTopPart
        depthFullName={depthFullName}
        register={register}
        dataCommonDic={dataCommonDic}
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
                  <Label style={{ minWidth: "auto" }}>구분</Label>
                  <Select width={InputSize.i130} {...register("sBuGubun")}>
                    {dataCommonDic?.sBuGubun?.map((obj: any, idx: number) => (
                      <option key={idx} value={obj.code}>
                        {obj.codeName}
                      </option>
                    ))}
                  </Select>
                </FormGroup>
                <FormGroup>
                  <Input
                    label="매입처명"
                    register={register("sBuName")}
                    inputSize={InputSize.i140}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>거래상태</Label>
                  <Select width={InputSize.i130} {...register("sBuStae")}>
                    {dataCommonDic?.sBuStae?.map((obj: any, idx: number) => (
                      <option key={idx} value={obj.code}>
                        {obj.codeName}
                      </option>
                    ))}
                  </Select>
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
            data={data.length > 0 && data}
            columns={columns}
            fields={fields}
            setSelected={setSelected}
            selectedRowIndex={selectedRowIndex}
            setSelectedRowIndex={setSelectedRowIndex}
            style={{ height: "43%", minWidth: "925px" }}
          />

          <form
            onSubmit={handleSubmit(submitSearch2)}
            style={{ minWidth: "925px" }}
          >
            <SearchWrapper
              className="h35"
              style={{ borderTop: "2px solid #707070" }}
            >
              <Field flex>
                <p>{depthFullName}</p>
                <p className="big">영업소</p>
                <Select {...register("areaCode1")} name="areaCode1">
                  {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </Field>
            </SearchWrapper>
            <SearchWrapper className="h35">
              <Field flex>
                <FormGroup>
                  <Label style={{ minWidth: "auto" }}>지급기간</Label>

                  <Controller
                    control={control}
                    {...register("sDate")}
                    render={({ field: { onChange, value, name } }) => (
                      <CustomDatePicker
                        value={value}
                        onChange={onChange}
                        name={name}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    {...register("eDate")}
                    render={({ field: { onChange, value, name } }) => (
                      <CustomDatePicker
                        value={value}
                        onChange={onChange}
                        name={name}
                      />
                    )}
                  />
                </FormGroup>

                <Input
                  register={register("sBjBuName")}
                  inputSize={InputSize.md}
                  label="거래상태"
                />
              </Field>

              <div className="buttons">
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
            data={dataSecond.length > 0 && dataSecond}
            columns={columnsSecond}
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
            menuId={menuId}
          />
        </RightSide>
      </MainWrapper>
    </>
  );
}

export default GR1500;
