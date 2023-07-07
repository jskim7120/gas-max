import { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { apiGet } from "app/axios";
import { useGetCommonDictionaryMutation } from "app/api/commonDictionary";
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
import useDrawLine from "app/hook/useDrawLine";

const leftSideWidth: number = 1100;

function PT1200({
  depthFullName,
  menuId,
  areaCode,
}: {
  depthFullName: string;
  menuId: string;
  areaCode: string;
}) {
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [data, setData] = useState([]);
  const [dataSecond, setDataSecond] = useState([]);
  const [dataThird, setDataThird] = useState([]);
  const [secondGridSelected, setSecondGridSelected] = useState<any>({});
  const [selected, setSelected] = useState<any>({});
  const [data65, setData65] = useState([]);
  const [totMisukum, setTotMisukun] = useState(0);
  const [totSukum, setTotSukum] = useState(0);
  const [totDc, setTotDc] = useState(0);

  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  const dispatch = useDispatch();
  const { showDraggableLine, linePos } = useDrawLine(leftSideWidth);
  const { register, handleSubmit, control, reset, getValues, watch } =
    useForm<IPT1200SEARCH>({
      mode: "onSubmit",
    });

  const [getCommonDictionary, { data: dataCommonDic }] =
    useGetCommonDictionaryMutation();

  useEffect(() => {
    getCommonDictionary({ groupId: "PT", functionName: "PT1200" });
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
    if (selected && Object.keys(selected)?.length > 0) {
      fetch65Data(selected);
    }
  }, [selected]);

  useEffect(() => {
    if (watch("sCheck") !== undefined) {
      fetchDataSearch1({
        areaCode: getValues("areaCode"),
        sCheck: getValues("sCheck") ? "Y" : "N",
        sCuName: getValues("sCuName"),
      });
    }
  }, [watch("sCheck")]);

  const calcTotal = async (fieldName: string, data: []) => {
    let total = 0;
    data.forEach((obj: any) => (total += obj[fieldName] ?? 0));
    console.log("Im summing all of them ==", total, "fieldName", fieldName);
    return total;
  };

  const fetch65Data = async (params: any) => {
    const data = await apiGet(PT120065, {
      areaCode: params.areaCode,
      cuCode: params.cuCode,
    });

    if (data) {
      setData65(data);
    }
  };
  const resetSearchForm = () => {
    reset({
      areaCode: dataCommonDic?.areaCode[0].code,
      sGsdateF: dataCommonDic?.sGsdateF[0].code,
      sGsdateT: dataCommonDic?.sGsdateT[0].code,
    });
  };

  // const resetCuName = () => {
  //   reset((formValues) => ({
  //     ...formValues,
  //     sCuName: "",
  //   }));
  // };

  const fetchDataSearch1 = async (params: any) => {
    setLoading1(true);

    const res = await apiGet(PT1200SEARCH, params);
    if (res) {
      setData(res);

      setTotMisukun(await calcTotal("cuCmisu", res));
    } else {
      setData([]);
    }
    setLoading1(false);
  };

  const fetchDataSearch2 = async (params: any) => {
    params.sMsdateF = DateWithoutDash(params.sMsdateF);
    params.sMsdateT = DateWithoutDash(params.sMsdateT);

    setLoading2(true);
    const data = await apiGet(PT1200SEARCH62, params);

    if (data) {
      setDataSecond(data);
      setLoading2(false);

      setTotSukum(await calcTotal("gsKumack", data));
      setTotDc(await calcTotal("gsDc", data));
    }
  };

  const submitSearch2 = (data: IPT1200SEARCH) => {
    fetchDataSearch2(data);
  };

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
            />
            <Button text="수금" icon={<Plus />} />
            <Button
              text="저장"
              icon={<Update />}
              color={ButtonColor.SECONDARY}
              onClick={() => {}}
            />
            <Button text="취소" icon={<Reset />} />
          </div>
        </FormGroup>
        <p>{depthFullName}</p>
      </SearchWrapper>
      <MainWrapper>
        <LeftSide style={{ width: `${linePos}px` }}>
          <form autoComplete="off">
            <SearchWrapper className="h35">
              <FormGroup>
                <PersonInfoText text="미수 현황" />
                <Input
                  label="거래처"
                  register={register("sCuName")}
                  inputSize={InputSize.i140}
                />
                <Controller
                  control={control}
                  name="sCheck"
                  render={({ field }) => (
                    <CheckBox
                      {...field}
                      title="조건 검색"
                      rtl
                      style={{ marginLeft: "15px" }}
                    />
                  )}
                />
              </FormGroup>
            </SearchWrapper>
          </form>

          <Grid
            areaCode={areaCode}
            data={data.length > 0 && data}
            columns={columns}
            fields={fields}
            rowIndex={0}
            menuId={menuId}
            setSelected={setSelected}
            style={{ height: "40%" }}
          />
          <Grid
            areaCode={areaCode}
            data={data65.length > 0 && data65}
            columns={columnsSecond}
            fields={fieldsSecond}
            rowIndex={0}
            menuId={menuId}
            setSelected={setSelected}
            style={{ height: "18%" }}
          />
          <form onSubmit={handleSubmit(submitSearch2)} autoComplete="off">
            <SearchWrapper className="h35">
              <FormGroup>
                <PersonInfoText text="수금 현황" />
                <Controller
                  control={control}
                  name="sGsdateF"
                  render={({ field }) => <CustomDatePicker {...field} />}
                />
                <Controller
                  control={control}
                  name="sGsdateT"
                  render={({ field }) => <CustomDatePicker {...field} />}
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
                <Button text="수금취소" icon={<Trash />} />
              </FormGroup>
            </SearchWrapper>
          </form>

          <Grid
            areaCode={areaCode}
            data={dataSecond.length > 0 && dataSecond}
            columns={columnsThird}
            fields={fieldsThird}
            rowIndex={0}
            menuId={menuId}
            setSelected={setSecondGridSelected}
            style={{ height: "43%" }}
          />
        </LeftSide>

        <RightSide
          style={{
            width: `calc(100% - ${linePos}px)`,
          }}
        >
          <Form
            selected={selected}
            ref={formRef}
            fetchData={fetchDataSearch1}
            setData={setData}
            setSelected={setSelected}
            dataCommonDic={dataCommonDic}
            totMisukum={totMisukum}
            totSukum={totSukum}
            totDc={totDc}
          />
        </RightSide>
        {showDraggableLine()}
      </MainWrapper>
    </>
  );
}

export default PT1200;
