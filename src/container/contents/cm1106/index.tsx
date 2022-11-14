import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector, useDispatch } from "app/store";
import API from "app/axios";
import Button from "components/button/button";
import { ButtonColor, FieldKind } from "components/componentsType";
import { Plus, Trash, Update, Reset, WhiteClose } from "components/allSvgIcon";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { closeModal, addCM1105 } from "app/state/modal/modalSlice";
import SEARCH_RED from "assets/image/search_red.png";
import Grid from "./grid";
import Form from "./form";

import {
  Input,
  Select,
  Field,
  ErrorText,
  FormGroup,
  Wrapper,
  DividerGray,
  Divider,
  Label,
} from "components/form/style";

import { CM1106LIST } from "app/path";
import { ICM1106 } from "./model";

import styled from "styled-components";

const LLabel = styled.label`
  background: rgba(104, 103, 103, 0.35);
  width: 94px;
  font-size: 12px;
  text-align: right;
  padding: 3px 10px 0 0;
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
  const cm1105 = useSelector((state) => state.modal.cm1105);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState({});
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm<ICM1106>();

  const dispatch = useDispatch();

  useEffect(() => {
    if (cm1105.areaCode && cm1105.cuCode) {
      fetchData();
    }
  }, [cm1105.areaCode, cm1105.cuCode]);

  const fetchData = async () => {
    try {
      const { data } = await API.get(CM1106LIST, {
        params: { jcCuCode: cm1105.cuCode, areaCode: cm1105.areaCode },
      });
      setData(data);

      console.log("CM1106LIST:", data);
    } catch (error) {
      console.log("aldaa");
    }
  };

  const submit = async (data: ICM1106) => {};

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "35px",
          background: "#0B97F6",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 15px",
        }}
      >
        <Field flex style={{ alignItems: "center" }}>
          <p style={{ color: "#fff", fontSize: "14px" }}>거래처 사용품목</p>
          <Field></Field>
        </Field>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            text="등록"
            icon={<Plus />}
            style={{ marginRight: "5px" }}
            type="button"
            onClick={() => {
              formRef.current.bla();
            }}
          />
          <Button
            text="삭제"
            icon={<Trash />}
            style={{ marginRight: "5px" }}
            type="button"
            onClick={() => {}}
          />
          <Button
            text="저장"
            icon={<Update />}
            style={{ marginRight: "5px" }}
            color={ButtonColor.SECONDARY}
            onClick={() => console.log("first")}
            type="button"
          />
          <Button
            text="취소"
            style={{ marginRight: "5px" }}
            icon={<Reset />}
            type="button"
            onClick={() => {}}
          />
          <span
            style={{ marginLeft: "10px", marginTop: "1px" }}
            onClick={() => {
              dispatch(closeModal());
            }}
          >
            <WhiteClose />
          </span>
        </div>
      </div>
      <form onSubmit={handleSubmit(submit)}>
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
              <IInput {...register("areaCode")} />
            </FFormGroup>

            <FFormGroup>
              <LLabel style={{}}>거래처코드</LLabel>
              <IInput {...register("areaCode")} />
            </FFormGroup>

            <button
              style={{ background: "none", border: "none" }}
              type="submit"
            >
              <img src={SEARCH_RED} />
            </button>
          </div>
        </div>
        <div style={{ display: "flex", width: "100%" }}>
          <Grid data={data} setSelected={setSelected} />
          <Form selected={selected} ref={formRef} />
        </div>
      </form>
    </>
  );
}

export default FormCM1106;
