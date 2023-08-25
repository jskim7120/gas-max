import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "app/store";
import { apiGet } from "app/axios";
import Button from "components/button/button";
import { ButtonColor } from "components/componentsType";
import { useGetCommonDictionaryMutation } from "app/api/commonDictionary";
import {
  Plus,
  Trash,
  Update,
  Reset,
  WhiteClose,
  TickInCircle,
} from "components/allSvgIcon";
import SEARCH_RED from "assets/image/search_red.png";
import Grid from "components/grid";
import Form from "./form";
import { addCM1106AR1100Tick } from "app/state/modal/modalSlice";
import { Select, FormGroup, Label } from "components/form/style";
import { CM1106LIST, CM110665 } from "app/path";
import { ISEARCH } from "./model";
import styled from "styled-components";
import { ModalBlueHeader } from "components/modal/customModals/style";
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

function FormCM1106({ setIsModalOpen }: { setIsModalOpen: Function }) {
  const cm1106 = useSelector((state) => state.modal.cm1106);
  const areaCode = useSelector((state) => state.auth.areaCode);
  const [isAddBtnClicked, setIsAddBtnClicked] = useState<boolean>(false);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState<any>({});
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  const { register, handleSubmit, reset, getValues } = useForm<ISEARCH>();

  const dispatch = useDispatch();

  useEffect(() => {
    if (cm1106.areaCode && cm1106.cuCode && cm1106.source === "AR11000") {
      fetchData();
      resetForm("resetAreaCode");
    }
    if (cm1106.areaCode && cm1106.cuCode && cm1106.source === "AR11001") {
      fetchData65();
      resetForm("resetAreaCode");
    }
  }, [cm1106.areaCode, cm1106.cuCode, cm1106.tick]);

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

  const fetchData65 = async () => {
    const data65 = await apiGet(CM110665, {
      jcCuCode: cm1106.cuCode,
      areaCode: cm1106.areaCode,
    });

    if (data65) {
      setData(data65);
      setSelected(data65[0]);
    } else {
      setData([]);
      setSelected({});
    }
  };

  const submit = async (data: ISEARCH) => {};

  const handleChoose = () => {
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

      setIsModalOpen(false);
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
      <ModalBlueHeader className="handle h40">
        <FormGroup>
          {areaCode === "00" && (
            <>
              <Label style={{ minWidth: "80px", color: "white" }}>영업소</Label>
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
          <Label style={{ color: "white" }}>거래처 사용품목</Label>
          <span
            className="close_btn"
            style={{ marginLeft: "10px", marginTop: "1px" }}
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            <WhiteClose />
          </span>
        </FormGroup>
      </ModalBlueHeader>

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
          {cm1106.source.substring(0, 6) === "AR1100" && (
            <div
              style={{
                background: "#CDE7EB",
                padding: "5px",
                display: "flex",
                justifyContent: "end",
                gap: "7px",
              }}
            >
              <Button
                text="선택"
                icon={<TickInCircle />}
                type="button"
                color={ButtonColor.SUCCESS}
                onClick={handleChoose}
              />
              <Button text="취소" icon={<Reset />} type="button" />
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
