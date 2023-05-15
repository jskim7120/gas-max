import { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import API from "app/axios";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { useDispatch } from "app/store";
import { openModal, pt1205Popup } from "app/state/modal/modalSlice";
import { PT1200SEARCH, PT1200SEARCH62, PT120065 } from "app/path";
import {
  SearchWrapper,
  MainWrapper,
  LeftSide,
  RightSide,
} from "../../commonStyle";
import { PersonInfoText } from "components/text";
import { IPT1200SEARCH } from "./model";
import Button from "components/button/button";
import { columns, fields } from "./data";
import { columnsSecond, fieldsSecond } from "./secondData";
import { columnsThird, fieldsThird } from "./thirdData";
import Grid from "components/grid";
import Loader from "components/loader";
import { DateWithoutDash } from "helpers/dateFormat";
import {
  MagnifyingGlass,
  Plus,
  Trash,
  Update,
  Reset,
} from "components/allSvgIcon";
import CheckBox from "components/checkbox";
import Form from "./form";
import CustomDatePicker from "components/customDatePicker";
import { FormGroup, Select, Label, Field, Input } from "components/form/style";
import { ButtonColor, InputSize } from "components/componentsType";
import CustomTopPart from "container/contents/customTopPart";

function PT1200({
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
  const [secondGridSelected, setSecondGridSelected] = useState<any>({});
  const [selected, setSelected] = useState<any>({});
  const [totMisukum, setTotMisukun] = useState(0);
  const [totSukum, setTotSukum] = useState(0);
  const [totDc, setTotDc] = useState(0);
  const [sCheck, setSCheck] = useState(false);
  const [data65, setData65] = useState([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const dispatch = useDispatch();

  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "PT",
    functionName: "PT1200",
  });

  useEffect(() => {
    if (dataCommonDic) {
      fetchDataSearch1({
        areaCode: dataCommonDic.areaCode[0].code,
        sCheck: "N",
        sCuName: "",
      });
      resetSearchForm();
    }
  }, [dataCommonDic]);
  useEffect(() => {
    fetch65Data(selected);
  }, [selected]);

  useEffect(() => {
    if (!sCheck) {
      resetCuName();
    }
    fetchDataSearch1({
      areaCode: getValues("areaCode"),
      sCheck: sCheck,
      sCuName: getValues("sCuName"),
    });
  }, [sCheck]);

  const calcTotal = async (fieldName: string, data: []) => {
    let total = 0;
    data.forEach((obj: any) => (total += obj[fieldName] ?? 0));
    console.log("Im summing all of them ==", total, "fieldName", fieldName);
    return total;
  };

  const fetch65Data = async (params: any) => {
    try {
      const { data } = await API.get(PT120065, {
        params: { areaCode: params.areaCode, cuCode: params.cuCode },
      });

      if (data) {
        setData65(data);
      }
    } catch (err) {
      console.log("PT120065 data search fetch error =======>", err);
    }
  };
  const resetSearchForm = () => {
    reset({
      areaCode: dataCommonDic?.areaCode[0].code,
      sGsdateF: dataCommonDic?.sGsdateF[0].code,
      sGsdateT: dataCommonDic?.sGsdateT[0].code,
    });
  };
  const resetCuName = () => {
    reset((formValues) => ({
      ...formValues,
      sCuName: "",
    }));
  };
  const fetchDataSearch1 = async (params: any) => {
    try {
      setLoading1(true);
      if (params.sCheck) {
        params.sCheck = "Y";
      } else {
        params.sCheck = "N";
      }
      const { data } = await API.get(PT1200SEARCH, { params: params });
      if (data) {
        setData(data);
        setLoading1(false);
        setSelectedRowIndex(0);
        setTotMisukun(await calcTotal("cuCmisu", data));
      }
    } catch (err) {
      console.log("PT1200 data search fetch error =======>", err);
    }
  };

  const fetchDataSearch2 = async (params: any) => {
    params.sMsdateF = DateWithoutDash(params.sMsdateF);
    params.sMsdateT = DateWithoutDash(params.sMsdateT);
    try {
      setLoading2(true);
      const { data } = await API.get(PT1200SEARCH62, { params: params });

      if (data) {
        setDataSecond(data);
        setLoading2(false);
        setSelectedRowIndex(0);
        setTotSukum(await calcTotal("gsKumack", data));
        setTotDc(await calcTotal("gsDc", data));
      }
    } catch (err) {
      console.log("PT110062 data search fetch error =======>", err);
    }
  };

  const submitSearch1 = (data: IPT1200SEARCH) => {
    if (data.sCheck) {
      data.sCheck = "Y";
    } else {
      data.sCheck = "N";
    }
    fetchDataSearch1(data);
  };

  const submitSearch2 = (data: IPT1200SEARCH) => {
    fetchDataSearch2(data);
  };

  const { register, handleSubmit, control, reset, getValues } =
    useForm<IPT1200SEARCH>({
      mode: "onSubmit",
    });

  const openPopupPT1205 = async () => {
    dispatch(openModal({ type: "pt1205Modal" }));
    dispatch(
      pt1205Popup({
        areaCode: selected.areaCode,
        cuCode: selected.cuCode,
        cuName: selected.cuName,
        cuCmisu: selected.cuCmisu,
      })
    );
  };

  return (
    <>
      <SearchWrapper className="h35 mt5">
        <FormGroup>
          {areaCode === "00" && (
            <>
              <Label style={{ minWidth: "42px" }}>영업소</Label>

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
              text="선택 수금"
              icon={<Plus />}
              onClick={openPopupPT1205}
              style={{ marginRight: "5px" }}
            />
            <Button
              text="수금"
              icon={<Plus />}
              onClick={() => {}}
              style={{ marginRight: "5px" }}
            />
            <Button
              text="저장"
              icon={<Update />}
              color={ButtonColor.SECONDARY}
              onClick={() => {}}
              style={{ marginRight: "5px" }}
            />
            <Button text="취소" icon={<Reset />} onClick={() => {}} />
          </div>
        </FormGroup>
        <p>{depthFullName}</p>
      </SearchWrapper>
      <MainWrapper>
        <LeftSide>
          <form
            onSubmit={handleSubmit(submitSearch1)}
            autoComplete="off"
            style={{ minWidth: "925px" }}
          >
            <SearchWrapper className="h35">
              <Field flex>
                <PersonInfoText text="미수 현황" />
                <FormGroup style={{ marginLeft: "7px" }}>
                  <Input
                    label="거래처"
                    register={register("sCuName")}
                    inputSize={InputSize.i140}
                  />
                </FormGroup>
                <FormGroup>
                  <CheckBox
                    register={{ ...register("sCheck") }}
                    title="조건 검색"
                    rtl
                    style={{ width: "80px" }}
                    onChange={(e: any) => setSCheck(e.target.checked)}
                  />
                </FormGroup>
              </Field>
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
            style={{ height: "40%", minWidth: "925px" }}
          />
          <Grid
            areaCode={areaCode}
            data={data65.length > 0 && data65}
            columns={columnsSecond}
            fields={fieldsSecond}
            setSelected={setSelected}
            selectedRowIndex={selectedRowIndex}
            setSelectedRowIndex={setSelectedRowIndex}
            style={{ height: "18%", minWidth: "925px" }}
          />
          <form
            onSubmit={handleSubmit(submitSearch2)}
            autoComplete="off"
            style={{ minWidth: "925px" }}
          >
            <SearchWrapper className="h35">
              <div className="buttons">
                <PersonInfoText text="수금 현황" />
                <Controller
                  control={control}
                  {...register("sGsdateF")}
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
                  {...register("sGsdateT")}
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
              <div className="buttons">
                <Button text="수금취소" icon={<Trash />} />
              </div>
            </SearchWrapper>
          </form>

          <Grid
            areaCode={areaCode}
            data={dataSecond.length > 0 && dataSecond}
            columns={columnsThird}
            fields={fieldsThird}
            setSelected={setSecondGridSelected}
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
            totMisukum={totMisukum}
            totSukum={totSukum}
            totDc={totDc}
          />
        </RightSide>
      </MainWrapper>
    </>
  );
}

export default PT1200;
