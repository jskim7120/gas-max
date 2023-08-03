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
  MagnifyingGlassBig,
  Plus,
  Update,
  Reset,
  Trash,
} from "components/allSvgIcon";
import CheckBox from "components/checkbox";
import Form from "./form";
import CustomDatePicker from "components/customDatePicker";
import { FormGroup, Select, Label, Input } from "components/form/style";
import { ButtonColor, InputSize } from "components/componentsType";
import useDrawLine from "app/hook/useMidLine";

const leftSideWidth: number = 1010;

function PT1100({
  depthFullName,
  menuId,
  ownAreaCode,
}: {
  depthFullName: string;
  menuId: string;
  ownAreaCode: string;
}) {
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  const { showDraggableLine, linePos } = useDrawLine(leftSideWidth);

  const [loading2, setLoading2] = useState(false);
  const [data, setData] = useState([]);
  const [dataSecond, setDataSecond] = useState([]);
  const [data65, setData65] = useState([]);
  const [selected, setSelected] = useState<any>({});
  // const [secondSelected, setSecondSelected] = useState<any>({});
  const [totMisukum, setTotMisukum] = useState(0);
  const [totSukum, setTotSukum] = useState(0);
  const [totDc, setTotDc] = useState(0);

  const dispatch = useDispatch();

  const [getCommonDictionary, { data: dataCommonDic }] =
    useGetCommonDictionaryMutation();

  useEffect(() => {
    getCommonDictionary({ groupId: "PT", functionName: "PT1100" });
  }, []);

  const { register, handleSubmit, control, reset, getValues, watch } =
    useForm<IPT1100SEARCH>({
      mode: "onSubmit",
    });

  useEffect(() => {
    if (dataCommonDic) {
      resetSearchForm();
      fetchDataSearch1({
        areaCode: dataCommonDic.areaCode[0].code,
        sCheck: "N",
        sCuName: "",
      });
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

  const resetSearchForm = () => {
    reset({
      areaCode: dataCommonDic?.areaCode[0].code,
      sMsdateF: dataCommonDic?.sMsdateF[0].code,
      sMsdateT: dataCommonDic?.sMsdateT[0].code,
    });
  };

  const calcTotal = async (fieldName: string, data: []) => {
    let total = 0;
    data.forEach((obj: any) => (total += obj[fieldName] ?? 0));
    return total;
  };

  const fetchDataSearch1 = async (params: any) => {
    const res = await apiGet(PT1100SEARCH, params);
    if (res) {
      setData(res);
      setSelected(res[0]);
      setTotMisukum(await calcTotal("cuJmisu", res));
    } else {
      setData([]);
      setSelected({});
      setTotMisukum(0);
    }
  };

  const fetchDataSearch2 = async (params: any) => {
    params.sMsdateF = DateWithoutDash(params.sMsdateF);
    params.sMsdateT = DateWithoutDash(params.sMsdateT);

    setLoading2(true);
    const res = await apiGet(PT1100SEARCH62, params);
    if (res) {
      setDataSecond(res);
      // setSecondSelected(res[0]);
      setTotSukum(await calcTotal("msKumack", res));
      setTotDc(await calcTotal("msDc", res));
    } else {
      setDataSecond([]);
      // setSecondSelected({});
      setTotSukum(0);
      setTotDc(0);
    }
    setLoading2(false);
  };

  const fetch65Data = async (params: any) => {
    const res = await apiGet(PT110065, {
      areaCode: params.areaCode,
      cuCode: params.cuCode,
    });

    if (res) {
      setData65(res);
    } else {
      setData65([]);
    }
  };

  const submitSearch2 = (params: IPT1100SEARCH) => {
    fetchDataSearch2(params);
  };

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

  // const resetCuName = () => {
  //   reset((formValues) => ({
  //     ...formValues,
  //     sCuName: "",
  //   }));
  // };

  return (
    <>
      <SearchWrapper className="h35 mt5">
        <FormGroup>
          {ownAreaCode === "00" && (
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
          <div
            style={{
              minWidth: leftSideWidth,
              height: "100%",
            }}
          >
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
              areaCode={ownAreaCode}
              data={data.length > 0 && data}
              columns={columns}
              fields={fields}
              rowIndex={0}
              menuId={menuId}
              setSelected={setSelected}
              style={{ height: "34%" }}
            />
            <Grid
              areaCode={ownAreaCode}
              data={data65.length > 0 && data65}
              columns={columnsSecond}
              fields={fieldsSecond}
              rowIndex={0}
              menuId={menuId}
              hideFooter
              style={{ height: "22%", marginTop: "5px" }}
            />
            <form onSubmit={handleSubmit(submitSearch2)} autoComplete="off">
              <SearchWrapper className="h35">
                <FormGroup>
                  <PersonInfoText text="수금 현황" />
                  <Controller
                    control={control}
                    name="sMsdateF"
                    render={({ field }) => <CustomDatePicker {...field} />}
                  />
                  <Controller
                    control={control}
                    name="sMsdateT"
                    render={({ field }) => <CustomDatePicker {...field} />}
                  />
                  <div className="buttons ml30">
                    <Button
                      text="검색"
                      icon={!loading2 && <MagnifyingGlassBig width="15" />}
                      color={ButtonColor.DANGER}
                      type="submit"
                      loader={
                        loading2 && (
                          <Loader
                            size={16}
                            style={{
                              marginRight: "12px",
                            }}
                          />
                        )
                      }
                    />
                    <Button text="수금취소" icon={<Trash />} type="button" />
                  </div>
                </FormGroup>
              </SearchWrapper>
            </form>

            <Grid
              areaCode={ownAreaCode}
              data={dataSecond.length > 0 && dataSecond}
              columns={columnsThird}
              fields={fieldsThird}
              // setSelected={setSecondSelected}
              rowIndex={0}
              menuId={menuId}
              style={{ height: "calc(31% - 2px)" }}
            />
          </div>
        </LeftSide>

        <RightSide
          style={{
            width: `calc(100% - ${linePos}px)`,
          }}
        >
          <Form
            ref={formRef}
            selected={selected}
            fetchData={fetchDataSearch1}
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

export default PT1100;
