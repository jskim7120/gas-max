import { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import API from "app/axios";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { useDispatch } from "app/store";
import { openModal, ptAreaCode } from "app/state/modal/modalSlice";
import { PT1200SEARCH, PT1200SEARCH62, PT120065 } from "app/path";
import {
  SearchWrapper,
  MainWrapper,
  LeftSide,
  RightSide,
} from "../../commonStyle";
import { PersonInfoText } from "components/text";
import { IPT1200SEARCH } from "./model";
import { IPT1200THIRD } from "./thirdModel";
import Button from "components/button/button";
import { columns, fields } from "./data";
import { columnsSecond, fieldsSecond } from "./secondData";
import { columnsThird, fieldsThird } from "./thirdData";
import Grid from "components/grid";
import Loader from "components/loader";
import {
  formatDateByRemoveDash,
  formatDateToStringWithoutDash,
} from "helpers/dateFormat";
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
  const [selected, setSelected] = useState<any>({});
  const [data65, setData65] = useState([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const dispatch = useDispatch();

  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "PT",
    functionName: "PT1200",
  });

  useEffect(() => {
    fetch65Data(selected);
  }, [selected]);

  useEffect(() => {
    if (dataCommonDic !== undefined && dataCommonDic) {
      reset({
        areaCode: dataCommonDic?.areaCode[0].code,
      });
    }
  }, [dataCommonDic]);

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

  const fetchDataSearch1 = async (params: any) => {
    try {
      setLoading1(true);
      const { data } = await API.get(PT1200SEARCH, { params: params });

      if (data) {
        setData(data);
        setLoading1(false);
        setSelectedRowIndex(0);
      }
    } catch (err) {
      console.log("PT1200 data search fetch error =======>", err);
    }
  };

  const fetchDataSearch2 = async (params: any) => {
    params.sMsdateF =
      typeof params.sMsdateF === "string"
        ? formatDateByRemoveDash(params.sMsdateF)
        : params.sMsdateF instanceof Date
        ? formatDateToStringWithoutDash(params.sMsdateF)
        : "";
    params.sMsdateT =
      typeof params.sMsdateT === "string"
        ? formatDateByRemoveDash(params.sMsdateT)
        : params.sMsdateT instanceof Date
        ? formatDateToStringWithoutDash(params.sMsdateT)
        : "";
    try {
      setLoading2(true);
      const { data } = await API.get(PT1200SEARCH62, { params: params });

      if (data) {
        setDataSecond(data);
        setLoading2(false);
        setSelectedRowIndex(0);
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

  const { register, handleSubmit, control, reset } = useForm<IPT1200SEARCH>({
    mode: "onSubmit",
  });

  const openPopupPT1105 = async () => {
    dispatch(openModal({ type: "pt1105Modal" }));
    dispatch(
      ptAreaCode({
        areaCode: selected.areaCode,
        cuCode: selected.cuCode,
        cuName: selected.cuName,
      })
    );
  };

  return (
    <>
      <CustomTopPart
        depthFullName={depthFullName}
        register={register}
        dataCommonDic={dataCommonDic}
        areaCode={areaCode}
      />
      <div
        className="buttons"
        style={{
          display: "flex",
          gap: "5px",
          position: "absolute",
          right: "13px",
          top: "88px",
        }}
      >
        <Button text="선택 수금" icon={<Plus />} onClick={openPopupPT1105} />
        <Button text="수금" icon={<Trash />} onClick={() => {}} />
        <Button
          text="저장"
          icon={<Update />}
          color={ButtonColor.SECONDARY}
          onClick={() => {}}
        />
        <Button
          text="취소"
          icon={<Reset />}
          onClick={() => {}}
          style={{ padding: "0 3px" }}
        />
      </div>
      <MainWrapper>
        <LeftSide>
          <form
            onSubmit={handleSubmit(submitSearch1)}
            style={{ minWidth: "925px" }}
          >
            <SearchWrapper className="h35">
              <Field flex>
                <PersonInfoText text="미수현황" />
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
            </SearchWrapper>
          </form>

          <Grid
            areaCode={areaCode}
            data={dataSecond.length > 0 && dataSecond}
            columns={columnsThird}
            fields={fieldsThird}
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

export default PT1200;
