import React, { useEffect, useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "app/store";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import API from "app/axios";
import GridLeft from "components/grid";
import {
  SearchWrapper,
  MainWrapper,
  RightSide,
  LeftSide,
} from "../../commonStyle";
import { openModal, addDeleteMenuId } from "app/state/modal/modalSlice";
import { ICC1400SEARCH } from "./model";
import CustomDatePicker from "components/customDatePicker";
import {
  MagnifyingGlass,
  ResetGray,
  Plus,
  Trash,
  Update,
} from "components/allSvgIcon";
import { Select, FormGroup, Label } from "components/form/style";
import Loader from "components/loader";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import Grid from "../grid";
import { fields, columns } from "./data";
import Form from "./form";
import { CC1400SEARCH } from "app/path";
import { DateWithoutDash } from "helpers/dateFormat";
import { CustomAreaCodePart } from "container/contents/customTopPart";
import FourButtons from "components/button/fourButtons";

function CC1400({
  depthFullName,
  areaCode,
  menuId,
}: {
  depthFullName: string;
  areaCode: string;
  menuId: string;
}) {
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState();
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const [isAddBtnClicked, setIsAddBtnClicked] = useState<boolean>(false);
  const [isCancelBtnDisabled, setIsCancelBtnDisabled] = useState<boolean>(true);

  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "CC",
    functionName: "CC1400",
  });

  useEffect(() => {
    if (dataCommonDic) {
      console.log("dataCommonDic:::", dataCommonDic);
      resetSearchForm();
    }
  }, [dataCommonDic]);

  const { register, handleSubmit, reset, control } = useForm<ICC1400SEARCH>({
    mode: "onSubmit",
  });

  const resetSearchForm = () => {
    reset({
      areaCode: dataCommonDic?.areaCode[0].code,
      sDateF: dataCommonDic?.sDateF[0].code,
      sDateT: dataCommonDic?.sDateT[0].code,
      sSwCode: dataCommonDic?.sSwCode[0].code,
      sgSwCode: dataCommonDic?.sgSwCode[0].code,
    });
  };

  const submit = (params: any) => {
    // params.sDateF =
    //   typeof params.sDateF === "string"
    //     ? formatDateByRemoveDash(params.sDateF)
    //     : formatDateToStringWithoutDash(params.sDateF);
    params.sDateF = DateWithoutDash(params.sDateF);

    // params.sDateT =
    //   typeof params.sDateT === "string"
    //     ? formatDateByRemoveDash(params.sDateT)
    //     : formatDateToStringWithoutDash(params.sDateT);
    params.sDateT = DateWithoutDash(params.sDateT);

    fetchData(params);
  };

  const fetchData = async (params: any) => {
    try {
      setLoading(true);
      const { data: dataCC1400 } = await API.get(CC1400SEARCH, {
        params: params,
      });

      console.log("fetch data:::::", dataCC1400);
      if (dataCC1400) {
        setData(dataCC1400);
      } else {
        setData([]);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setData([]);
      console.log("CC1400 data search fetch error =======>", err);
    }
  };

  const onClickAdd = () => {
    setIsAddBtnClicked(true);
    setIsCancelBtnDisabled(false);
    formRef.current.resetForm("clear");
  };

  const onClickDelete = () => {
    dispatch(openModal({ type: "delModal" }));
    dispatch(addDeleteMenuId({ menuId: menuId }));
  };
  const onClickUpdate = () => {
    formRef.current.crud(null);
  };

  const onClickReset = () => {
    setIsAddBtnClicked(false);
    formRef.current.resetForm("reset");
  };

  return (
    <>
      <SearchWrapper className="h35 mt5">
        <CustomAreaCodePart
          areaCode={areaCode}
          depthFullName={depthFullName}
          register={register}
          dataCommonDic={dataCommonDic}
        />
        <SearchWrapper
          className="h35 mt5"
          style={{
            display: "flex",
            position: "absolute",
            top: "87px",
            right: "19px",
            background: "none",
            padding: "0",
            border: "none",
            height: "auto",
            marginTop: "2px",
          }}
        >
          <FourButtons
            onClickAdd={onClickAdd}
            onClickDelete={onClickDelete}
            onClickUpdate={onClickUpdate}
            onClickReset={onClickReset}
            isAddBtnClicked={isAddBtnClicked}
            isCancelBtnDisabled={isCancelBtnDisabled}
          />
        </SearchWrapper>
        <div className="buttons">
          <Button
            text="등록"
            icon={<Plus />}
            style={{ marginRight: "5px" }}
            onClick={() => {}}
          />
          <Button
            text="삭제"
            icon={<Trash />}
            style={{ marginRight: "5px" }}
            onClick={() => {}}
          />
          <Button
            text="저장"
            icon={<Update />}
            style={{ marginRight: "5px" }}
            color={ButtonColor.SECONDARY}
            onClick={() => {}}
          />
          <Button
            text="취소"
            icon={<ResetGray />}
            color={ButtonColor.LIGHT}
            onClick={() => {}}
          />
        </div>
      </SearchWrapper>
      <MainWrapper>
        <LeftSide>
          <SearchWrapper style={{ height: "35px" }}>
            <FormGroup>
              <Label style={{ minWidth: "auto" }}>기간</Label>
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
              <p
                style={{
                  width: "auto",
                  display: "block",
                  textAlign: "center",
                }}
              >
                ~
              </p>
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

              <Label>차량</Label>
              <Select {...register("sSwCode")} width={InputSize.i120}>
                {dataCommonDic?.sSwCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>

              <Button
                text="검색"
                icon={!loading && <MagnifyingGlass />}
                type="button"
                color={ButtonColor.SECONDARY}
                onClick={handleSubmit(submit)}
                style={{ marginLeft: "30px" }}
                loader={
                  loading && (
                    <>
                      <Loader
                        color="white"
                        size={16}
                        style={{ marginRight: "10px" }}
                        borderWidth="2px"
                      />
                    </>
                  )
                }
              />
              <Button
                text="취소"
                icon={<ResetGray />}
                style={{ marginLeft: "5px" }}
                color={ButtonColor.LIGHT}
                onClick={() => {
                  resetSearchForm();
                  setData([]);
                }}
              />
            </FormGroup>
          </SearchWrapper>
          <GridLeft
            areaCode="00"
            data={data}
            fields={fields}
            columns={columns}
            setSelected={setSelected}
            selectedRowIndex={selectedRowIndex}
            setIsCancelBtnDisabled={setIsCancelBtnDisabled}
            setIsAddBtnClicked={setIsAddBtnClicked}
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
            isAddBtnClicked={isAddBtnClicked}
            setIsAddBtnClicked={setIsAddBtnClicked}
          />
        </RightSide>
      </MainWrapper>
    </>
  );
}

export default CC1400;
