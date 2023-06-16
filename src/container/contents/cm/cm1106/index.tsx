import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "app/store";
import { apiGet } from "app/axios";
import Button from "components/button/button";
import { ButtonColor, ButtonType } from "components/componentsType";
import { useGetCommonDictionaryMutation } from "app/api/commonDictionary";
import {
  Plus,
  Trash,
  Update,
  Reset,
  WhiteClose,
  Tick,
} from "components/allSvgIcon";
import SEARCH_RED from "assets/image/search_red.png";
import Grid from "components/grid";
import Form from "./form";
import { addCM1106AR1100Tick, closeModal } from "app/state/modal/modalSlice";
import { Select, FormGroup } from "components/form/style";
import { CM1106LIST } from "app/path";
import { ISEARCH } from "./model";
import styled from "styled-components";
import { SearchWrapper } from "container/contents/commonStyle";
import { columns, fields } from "./data";

const LLabel = styled.label`
  background: rgba(104, 103, 103, 0.35);
  width: 94px;
  font-size: 14px;
  text-align: right;
  padding: 2px 10px 0 0;
`;
const IInput = styled.input`
  border: 1px solid #bbbbbb;
  outline: none;
  padding: 0 5px;
`;

const FFormGroup = styled.div`
  height: 25px;
  display: flex;
  margin-right: 3px;
`;

function FormCM1106() {
  const cm1106 = useSelector((state) => state.modal.cm1106);
  const areaCode = useSelector((state) => state.auth.areaCode);
  const [isAddBtnClicked, setIsAddBtnClicked] = useState<boolean>(false);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState<any>({});
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  const { register, handleSubmit, reset, getValues } = useForm<ISEARCH>();

  const dispatch = useDispatch();

  useEffect(() => {
    if (cm1106.areaCode && cm1106.cuCode) {
      fetchData();
      resetForm("resetAreaCode");
    }
  }, [cm1106.areaCode, cm1106.cuCode]);

  const [getCommonDictionary, { data: dataCommonDic }] =
    useGetCommonDictionaryMutation();

  useEffect(() => {
    getCommonDictionary({ groupId: "CM", functionName: "CM1106" });
  }, []);

  useEffect(() => {
    if (selected && Object.keys(selected)?.length > 0) {
      setIsAddBtnClicked(false);
      resetForm("resetName");
    }
  }, [selected]);

  const fetchData = async () => {
    const data1106 = await apiGet(CM1106LIST, {
      jcCuCode: cm1106.cuCode,
      areaCode: cm1106.areaCode,
    });

    if (data1106) {
      setData(data1106);
      setSelected(data1106[0]);
    } else {
      setData([]);
      setSelected({});
    }
  };

  const submit = async (data: ISEARCH) => {};

  const handleClickTick = () => {
    if (selected && Object.keys(selected)?.length > 0) {
      dispatch(
        addCM1106AR1100Tick({
          jpName: selected?.jcJpName,
          jpCode: selected?.jcJpCode,
          custIn: selected?.custIn,
          custOut: selected?.custOut,
          jcBasicJaego: selected?.jcBasicJaego,
          jcJpDanga: selected?.jcJpDanga,
        })
      );
      dispatch(closeModal());
    }
  };

  const resetForm = (type: string) => {
    if ("resetAreaCode") {
      reset((formValues) => ({
        ...formValues,
        areaCode: cm1106.areaCode,
      }));
    }
    if ("resetName") {
      reset((formValues) => ({
        ...formValues,
        jcCuCode: selected?.jcCuCode,
        jcCuName: selected?.jcCuName,
      }));
    }
  };

  return (
    <>
      <SearchWrapper
        style={{ background: "#0B97F6", height: "40px", borderBottom: "none" }}
      >
        <FormGroup>
          {areaCode === "00" && (
            <>
              <p className="big" style={{ color: "white" }}>
                영업소
              </p>

              <Select register={register("areaCode")} disabled>
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
              text="등록"
              icon={<Plus />}
              style={{ marginRight: "5px" }}
              type="button"
              onClick={() => {
                formRef.current.resetForm("clear");

                setIsAddBtnClicked(true);
              }}
            />
            <Button
              text="삭제"
              icon={<Trash />}
              style={{ marginRight: "5px" }}
              type="button"
              onClick={() => {
                // dispatch(openModal({ type: "delModal" }));
                // dispatch(addDeleteMenuId({ menuId: "CM1106" }));
                formRef.current.crud("delete");
              }}
              disabled={isAddBtnClicked}
            />
            <Button
              text="저장"
              icon={<Update />}
              style={{ marginRight: "5px" }}
              color={ButtonColor.SECONDARY}
              onClick={() => formRef.current.crud(null)}
              type="button"
            />
            <Button
              text="취소"
              style={{ marginRight: "5px" }}
              icon={<Reset />}
              type="button"
              onClick={() => {
                formRef.current.resetForm("reset");
                setIsAddBtnClicked(false);
              }}
            />
          </div>
        </FormGroup>
        <FormGroup>
          <p style={{ color: "#fff" }}>거래처 사용품목</p>
          <span
            style={{ marginLeft: "10px", marginTop: "1px" }}
            onClick={() => {
              dispatch(closeModal());
            }}
          >
            <WhiteClose />
          </span>
        </FormGroup>
      </SearchWrapper>

      <form onSubmit={handleSubmit(submit)} autoComplete="off">
        <div
          style={{
            background: "#CDE7EB",
            height: "54px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            padding: "0 0 0 8px",
          }}
        >
          <div style={{ width: "60%", display: "flex" }}>
            <FFormGroup>
              <LLabel style={{}}>거래처코드</LLabel>
              <IInput {...register("jcCuCode")} />
            </FFormGroup>

            <FFormGroup>
              <LLabel style={{}}>거래처명</LLabel>
              <IInput {...register("jcCuName")} />
            </FFormGroup>

            <button
              style={{ background: "none", border: "none" }}
              type="submit"
            >
              <img src={SEARCH_RED} />
            </button>
          </div>
        </div>
      </form>
      <div style={{ display: "flex", width: "100%" }}>
        <div style={{ flex: "1" }}>
          <Grid
            areaCode={areaCode}
            data={data}
            fields={fields}
            columns={columns}
            setSelected={setSelected}
            menuId={"CM1106"}
            rowIndex={0}
            style={{
              height: "500px",
              width: "100%",
            }}
          />
          {cm1106.source === "AR1100" && (
            <div
              style={{
                background: "rgba(104,103,103,0.35)",
                padding: "5px",
                margin: "5px",
                display: "flex",
                justifyContent: "end",
              }}
            >
              <Button
                text="선택"
                icon={<Tick />}
                withoutLine
                style={{
                  width: "110px",
                  marginRight: "10px",
                }}
                kind={ButtonType.ROUND}
                color={ButtonColor.BLUE}
                type="button"
                onClick={handleClickTick}
              />

              <Button
                text="취소"
                icon={<WhiteClose width="11" height="11" />}
                withoutLine
                style={{
                  width: "80px",
                }}
                kind={ButtonType.ROUND}
                color={ButtonColor.BLUE}
                type="button"
              />
            </div>
          )}
        </div>

        <Form
          selected={selected}
          ref={formRef}
          fetchData={fetchData}
          setData={setData}
          setSelected={setSelected}
          dataCommonDic={dataCommonDic}
          areaCode={getValues("areaCode")}
          isAddBtnClicked={isAddBtnClicked}
          setIsAddBtnClicked={setIsAddBtnClicked}
        />
      </div>
    </>
  );
}

export default FormCM1106;
