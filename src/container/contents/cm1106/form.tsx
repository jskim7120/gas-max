import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector, useDispatch } from "app/store";
import API from "app/axios";
// import { schema } from "./validation";
import Button from "components/button/button";
import { ButtonColor } from "components/componentsType";
import { Plus, Trash, Update, Reset, WhiteClose } from "components/allSvgIcon";
// import { ICM1105SEARCH } from "./model";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { closeModal, addCM1105 } from "app/state/modal/modalSlice";

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

function FormCM1106() {
  const cm1105 = useSelector((state) => state.modal.cm1105);

  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   formState: { errors },
  //   getValues,
  // } = useForm<ICM1106>({
  //   mode: "onChange",
  //   resolver: yupResolver(schema),
  // });
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

      console.log("CM1106LIST:", data);
    } catch (error) {
      console.log("aldaa");
    }
  };

  return (
    <form>
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
            onClick={() => {}}
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
    </form>
  );
}

export default FormCM1106;
