import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "app/store";
import API from "app/axios";
import Button from "components/button/button";
import { ButtonColor } from "components/componentsType";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { Plus, Trash, Update, Reset, WhiteClose } from "components/allSvgIcon";
import SEARCH_RED from "assets/image/search_red.png";
import Grid from "components/grid";
import Form from "./form";
import { closeModal } from "app/state/modal/modalSlice";
import { Select, FormGroup } from "components/form/style";
import { CM1106LIST } from "app/path";
import { ICM1106 } from "./model";
import styled from "styled-components";
import { SearchWrapper } from "container/contents/commonStyle";
import { columns, fields } from "./data";

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
  const areaCode = useSelector((state) => state.auth.areaCode);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState<any>({});
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  const { register, handleSubmit, reset, getValues } = useForm<ICM1106>();

  const dispatch = useDispatch();

  useEffect(() => {
    if (cm1105.areaCode && cm1105.cuCode) {
      fetchData();
    }
  }, [cm1105.areaCode, cm1105.cuCode]);

  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "CM",
    functionName: "CM1106",
  });

  useEffect(() => {
    if (selected) {
      formRef.current.setIsAddBtnClicked(false);
      reset({ jcCuCode: selected?.jcCuCode, jcCuName: selected?.jcCuName });
    }
  }, [selected]);

  const fetchData = async () => {
    try {
      const { data: data1106 } = await API.get(CM1106LIST, {
        params: { jcCuCode: cm1105.cuCode, areaCode: cm1105.areaCode },
      });
      if (data1106) {
        setData(data1106);
        setSelected(data1106[0]);
      } else {
        setData([]);
        setSelected({});
      }
    } catch (error) {
      setData([]);
      setSelected({});
      console.log("CM1106 fetch data error:", error);
    }
  };

  const submit = async (data: ICM1106) => {};
  return (
    <>
      <SearchWrapper
        style={{ background: "#0B97F6", height: "40px", borderBottom: "none" }}
      >
        <FormGroup>
          <p style={{ color: "#fff" }}>거래처 사용품목</p>
          {areaCode === "00" && (
            <>
              <p className="big">영업소</p>

              <Select {...register("areaCode")}>
                {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </>
          )}
        </FormGroup>
        <div className="buttons">
          <Button
            text="등록"
            icon={<Plus />}
            style={{ marginRight: "5px" }}
            type="button"
            onClick={() => {
              formRef.current.setIsAddBtnClicked(true);
              formRef.current.resetForm("clear");
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
              formRef.current.setIsAddBtnClicked(false);
              formRef.current.resetForm("reset");
            }}
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
      </SearchWrapper>

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
        <Grid
          areaCode={areaCode}
          data={data}
          fields={fields}
          columns={columns}
          setSelected={setSelected}
          selectedRowIndex={selectedRowIndex}
          setSelectedRowIndex={setSelectedRowIndex}
          style={{
            height: "500px",
            width: "75%",
            borderRight: "1px solid #000",
            margin: "10px",
          }}
        />
        <Form
          selected={selected}
          ref={formRef}
          fetchData={fetchData}
          setData={setData}
          selectedRowIndex={selectedRowIndex}
          setSelectedRowIndex={setSelectedRowIndex}
          setSelected={setSelected}
          dataCommonDic={dataCommonDic}
        />
      </div>
    </>
  );
}

export default FormCM1106;
