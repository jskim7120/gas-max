import { useState, useRef } from "react";
import { WrapperContent, SearchWrapper, TopBar } from "../../commonStyle";
import { IGR1500SEARCH } from "./model";
import Button from "components/button/button";
import { useForm, Controller } from "react-hook-form";
import { columns, fields } from "./data";
import { columnsSecond, fieldsSecond } from "./secondData";
import Grid from "./grid";
import Loader from "components/loader";
import { MagnifyingGlass } from "components/allSvgIcon";
import Form from "./form";
import CustomDatePicker from "components/customDatePicker/test-datepicker";
import API from "app/axios";
import {
  FormGroup,
  Select,
  Wrapper,
  Label,
  Field,
  Input,
} from "components/form/style";
import { Container, SubContainer } from "./style";
import { ButtonColor, FieldKind, InputSize } from "components/componentsType";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { GR1500SEARCH1, GR1500SEARCH2 } from "app/path";

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
  const [dataChk, setDataChk] = useState(true);
  const [sBuGubun, setSBuGubun] = useState("");
  const [sBuName, setSBuName] = useState("");
  const [sBuStae, setSBuStae] = useState("");
  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "GR",
    functionName: "GR1500",
  });

  const fetchDataSearch1 = async (params: any) => {
    try {
      setLoading1(true);
      const { data } = await API.get(GR1500SEARCH1, { params: params });
      console.log("data irev:", data);
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
      console.log("data irev:", data);
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
    console.log("IISEARCH:", data);
    fetchDataSearch1(data);
  };

  const submitSearch2 = (data: IGR1500SEARCH) => {
    console.log("IISEARCH:", data);
    fetchDataSearch2(data);
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IGR1500SEARCH>({
    mode: "onSubmit",
  });

  return (
    <Container>
      <SubContainer>
        <div>
          <TopBar>
            <p>{depthFullName}</p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                position: "absolute",
                left: "245px",
                gap: "7px",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              <p className="big">영업소</p>
              <Select
                {...register("areaCode")}
                name="areaCode"
                kind={FieldKind.BORDER}
              >
                {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </div>
          </TopBar>
          <WrapperContent
            style={{
              height: `calc(100% - 76px)`,
              borderRight: "2px solid #707070",
            }}
          >
            <form onSubmit={handleSubmit(submitSearch1)}>
              <SearchWrapper style={{ alignItems: "baseline" }}>
                <div>
                  <Wrapper grid col={6} fields="1fr 1fr 1fr">
                    <FormGroup>
                      <Label style={{ minWidth: "90px" }}>구분</Label>
                      <Select
                        width={InputSize.i130}
                        {...register("sBuGubun")}
                        kind={FieldKind.BORDER}
                        onChange={(e) => setSBuGubun(e.target.value)}
                      >
                        {dataCommonDic?.sBuGubun?.map(
                          (obj: any, idx: number) => (
                            <option key={idx} value={obj.code}>
                              {obj.codeName}
                            </option>
                          )
                        )}
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
                      <Label style={{ minWidth: "90px" }}>거래상태</Label>
                      <Select
                        width={InputSize.i130}
                        {...register("sBuStae")}
                        kind={FieldKind.BORDER}
                        onChange={(e) => setSBuStae(e.target.value)}
                      >
                        {dataCommonDic?.sBuStae?.map(
                          (obj: any, idx: number) => (
                            <option key={idx} value={obj.code}>
                              {obj.codeName}
                            </option>
                          )
                        )}
                      </Select>
                    </FormGroup>
                  </Wrapper>
                </div>

                <div
                  className="button-wrapper"
                  style={{ flexDirection: "row", gap: "0px" }}
                >
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
                    style={{ marginRight: "10px" }}
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
            />
          </WrapperContent>
        </div>
        <div style={{ borderRight: "2px solid #707070" }}>
          <TopBar style={{ marginTop: "0px" }}>
            <p>{depthFullName}</p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                position: "absolute",
                left: "245px",
                gap: "7px",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              <p className="big">영업소</p>
              <Select
                {...register("areaCode1")}
                name="areaCode1"
                kind={FieldKind.BORDER}
              >
                {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </div>
          </TopBar>
          <WrapperContent
            style={{
              height: `calc(100% - 76px)`,
            }}
          >
            <form onSubmit={handleSubmit(submitSearch2)}>
              <SearchWrapper style={{ alignItems: "baseline" }}>
                <div>
                  <Wrapper grid col={6} fields="1fr 1fr">
                    <Field
                      flex
                      style={{
                        alignItems: "center",
                        marginLeft: "22px",
                      }}
                    >
                      <Label style={{ minWidth: "90px" }}>지급기간</Label>
                      <Controller
                        control={control}
                        {...register("sDate")}
                        render={({ field: { onChange, value } }) => (
                          <CustomDatePicker
                            value={value}
                            onChange={onChange}
                            style={{ marginLeft: "15px" }}
                            readOnly={!dataChk}
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        {...register("eDate")}
                        render={({ field: { onChange, value } }) => (
                          <CustomDatePicker
                            value={value}
                            onChange={onChange}
                            style={{ margin: "5px 0 0 0" }}
                            readOnly={!dataChk}
                          />
                        )}
                      />
                    </Field>

                    <FormGroup>
                      <Label style={{ minWidth: "90px" }}>거래상태</Label>
                      <Input
                        register={register("sBjBuName")}
                        inputSize={InputSize.md}
                      />
                    </FormGroup>
                  </Wrapper>
                </div>

                <div
                  className="button-wrapper"
                  style={{ flexDirection: "row", gap: "0px" }}
                >
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
                    style={{ marginRight: "10px" }}
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
            />
          </WrapperContent>
        </div>
      </SubContainer>
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
    </Container>
  );
}

export default GR1500;
