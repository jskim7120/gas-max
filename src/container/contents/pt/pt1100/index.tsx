import { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { apiGet } from "app/axios";
import { useGetCommonDictionaryMutation } from "app/api/commonDictionary";
import { useDispatch } from "app/store";
import { openModal, ptAreaCode } from "app/state/modal/modalSlice";
import { PT1100SEARCH, PT1100SEARCH62, PT110065 } from "app/path";
import {
  SearchWrapper,
  MainWrapper,
  LeftSide,
  RightSide,
} from "../../commonStyle";
import { PersonInfoText } from "components/text";
import { IPT1100SEARCH } from "./model";
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
  Update,
  Reset,
  Trash,
} from "components/allSvgIcon";
import CheckBox from "components/checkbox";
import Form from "./form";
import CustomDatePicker from "components/customDatePicker";
import { FormGroup, Select, Label, Field, Input } from "components/form/style";
import { ButtonColor, InputSize } from "components/componentsType";
import CustomTopPart from "container/contents/customTopPart";

function PT1100({
  depthFullName,
  menuId,
  ownAreaCode,
}: {
  depthFullName: string;
  menuId: string;
  ownAreaCode: string;
}) {
  const [areaCode, setAreaCode] = useState("");
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [data, setData] = useState([]);
  const [dataSecond, setDataSecond] = useState([]);
  const [selected, setSelected] = useState<any>({});
  const [secondGridSelected, setSecondGridSelected] = useState<any>({});
  const [data65, setData65] = useState([]);
  const [totMisukum, setTotMisukun] = useState(0);
  const [totSukum, setTotSukum] = useState(0);
  const [totDc, setTotDc] = useState(0);
  const [sCheck, setSCheck] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const dispatch = useDispatch();

  const [getCommonDictionary, { data: dataCommonDic }] =
    useGetCommonDictionaryMutation();

  useEffect(() => {
    getCommonDictionary({ groupId: "PT", functionName: "PT1100" });
  }, []);

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

  const fetch65Data = async (params: any) => {
    // try {
    //   const { data } = await API.get(PT110065, {
    //     params: { areaCode: params.areaCode, cuCode: params.cuCode },
    //   });

    //   if (data) {
    //     setData65(data);
    //   }
    // } catch (err) {
    //   console.log("PT110065 data search fetch error =======>", err);
    // }

    const data = await apiGet(PT110065, {
      areaCode: params.areaCode,
      cuCode: params.cuCode,
    });

    if (data) {
      setData65(data);
    }
  };

  const fetchDataSearch1 = async (params: any) => {
    // try {
    //   setLoading1(true);
    //   if (params.sCheck) {
    //     params.sCheck = "Y";
    //   } else {
    //     params.sCheck = "N";
    //   }
    //   const { data } = await API.get(PT1100SEARCH, { params: params });
    //   if (data) {
    //     setData(data);
    //     setLoading1(false);
    //     setSelectedRowIndex(0);
    //     setTotMisukun(await calcTotal("cuJmisu", data));
    //   }
    // } catch (err) {
    //   console.log("PT1100 data search fetch error =======>", err);
    // }

    setLoading1(true);
    if (params.sCheck) {
      params.sCheck = "Y";
    } else {
      params.sCheck = "N";
    }
    const data = await apiGet(PT1100SEARCH, params);
    if (data) {
      setData(data);
      setLoading1(false);
      setSelectedRowIndex(0);
      setTotMisukun(await calcTotal("cuJmisu", data));
    }
  };

  const calcTotal = async (fieldName: string, data: []) => {
    let total = 0;
    data.forEach((obj: any) => (total += obj[fieldName] ?? 0));
    return total;
  };

  const fetchDataSearch2 = async (params: any) => {
    params.sMsdateF = DateWithoutDash(params.sMsdateF);
    params.sMsdateT = DateWithoutDash(params.sMsdateT);
    // try {
    //   setLoading2(true);
    //   const { data } = await API.get(PT1100SEARCH62, { params: params });

    //   if (data) {
    //     setDataSecond(data);
    //     setLoading2(false);
    //     setSelectedRowIndex(0);
    //     setTotSukum(await calcTotal("msKumack", data));
    //     setTotDc(await calcTotal("msDc", data));
    //   }
    // } catch (err) {
    //   console.log("PT110062 data search fetch error =======>", err);
    // }

    setLoading2(true);
    const data = await apiGet(PT1100SEARCH62, params);

    if (data) {
      setDataSecond(data);
      setLoading2(false);
      setSelectedRowIndex(0);
      setTotSukum(await calcTotal("msKumack", data));
      setTotDc(await calcTotal("msDc", data));
    }
  };

  const submitSearch2 = (data: IPT1100SEARCH) => {
    fetchDataSearch2(data);
  };

  const { register, handleSubmit, control, reset, getValues } =
    useForm<IPT1100SEARCH>({
      mode: "onSubmit",
    });

  const openPopupPT1105 = async () => {
    dispatch(openModal({ type: "pt1105Modal" }));
    dispatch(
      ptAreaCode({
        areaCode: selected.areaCode,
        cuCode: selected.cuCode,
        cuName: selected.cuName,
        cuJmisu: selected.cuJmisu,
      })
    );
  };

  const resetCuName = () => {
    reset((formValues) => ({
      ...formValues,
      sCuName: "",
    }));
  };

  const resetSearchForm = () => {
    reset({
      areaCode: dataCommonDic?.areaCode[0].code,
      sMsdateF: dataCommonDic?.sMsdateF[0].code,
      sMsdateT: dataCommonDic?.sMsdateT[0].code,
    });
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
              onClick={openPopupPT1105}
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
            <Button
              text="취소"
              icon={<Reset />}
              onClick={() => {}}
              style={{ padding: "0 3px" }}
            />
          </div>
        </FormGroup>
      </SearchWrapper>
      <MainWrapper>
        <LeftSide>
          <form autoComplete="off" style={{ minWidth: "1000px" }}>
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
            areaCode={ownAreaCode}
            data={data.length > 0 && data}
            columns={columns}
            fields={fields}
            setSelected={setSelected}
            selectedRowIndex={selectedRowIndex}
            setSelectedRowIndex={setSelectedRowIndex}
            style={{ height: "45%", minWidth: "925px" }}
          />
          <Grid
            areaCode={ownAreaCode}
            data={data65.length > 0 && data65}
            columns={columnsSecond}
            fields={fieldsSecond}
            setSelected={setSelected}
            selectedRowIndex={selectedRowIndex}
            setSelectedRowIndex={setSelectedRowIndex}
            style={{ height: "12%", minWidth: "925px", marginTop: "17px" }}
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
                  {...register("sMsdateF")}
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
                  {...register("sMsdateT")}
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
            areaCode={ownAreaCode}
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

export default PT1100;
