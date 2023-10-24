import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "app/store";
import { apiGet } from "app/axios";
import { AR1100BUPUMSEARCH } from "app/path";
import { CTable2 } from "container/contents/gr/gr1200/style";
import Button from "components/button/button";
import { ButtonColor } from "components/componentsType";
import { addBupumTick } from "app/state/modal/modalSlice";
import { ModalBlueHeader } from "components/modal/customModals/style";
import {
  MagnifyingGlassBig,
  Reset,
  TickInCircle,
  WhiteClose,
} from "components/allSvgIcon";
import Loader from "components/loader";
import { handleKeyDown } from "helpers/handleKeyDown";
import styled from "styled-components";
import { Input, Select, FormGroup, CustomForm } from "components/form/style";

const LLabel = styled.label`
  background: rgba(104, 103, 103, 0.35);
  width: 80px;
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

function AsModal({ setModalOpen }: { setModalOpen: Function }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any[]>();
  const [selected, setSelected] = useState<number>(0);
  const dispatch = useDispatch();

  const state: any = useSelector((state) => state.modal.bupum);

  useEffect(() => {
    if (state?.areaCode && state?.pjType) {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    const response = await apiGet(AR1100BUPUMSEARCH, {
      areaCode: state?.areaCode,
      bpCode: state?.bpCode ? state?.bpCode : "",
      bpName: state?.bpName ? state?.bpName : "",
      bpSearch: state?.bpSearch ? state?.bpSearch : "",
      pjType: state?.pjType,
    });

    if (response) {
      setData(response);
    } else {
      setData([]);
    }
  };

  const handleChoose = (obj: any) => {
    dispatch(addBupumTick(obj));
    setModalOpen(false);
  };

  return (
    <>
      <ModalBlueHeader
        className="handle h25"
        style={{ background: "rgba(101, 84, 255, 0.37)", height: "40px" }}
      >
        <FormGroup>A/S 관리</FormGroup>
        <FormGroup>
          <span
            className="close_btn"
            style={{ marginLeft: "10px", marginTop: "1px" }}
            onClick={() => {
              setModalOpen(false);
            }}
          >
            <WhiteClose />
          </span>
        </FormGroup>
      </ModalBlueHeader>
      <div>
        <div
          style={{
            fontSize: "14px",
            padding: "20px 15px",
            display: "flex",
            alignItems: "center",
            background: "#fffbd6",
          }}
        >
          <FFormGroup>
            <LLabel style={{}}>거래구분</LLabel>
            <IInput readOnly />
          </FFormGroup>
          <FFormGroup>
            <LLabel style={{}}>거래처 코드</LLabel>
            <IInput readOnly />
          </FFormGroup>
          <FFormGroup>
            <LLabel style={{}}>거래처명</LLabel>
            <IInput readOnly />
          </FFormGroup>
        </div>
        <div
          style={{
            height: "376px",
            overflowY: "auto",
            padding: "0 10px",
            margin: "10px 0",
          }}
        >
          <div>
            <div>
              <span>A/S 상태</span>
              <FormGroup>
                {/* <Select register={register("saleState")} width={InputSize.i120}>
                  {dictionary?.saleState?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select> */}
              </FormGroup>
            </div>
          </div>
          <div></div>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "end",
            gap: "10px",
            background: "#b9b9b9",
            padding: "10px",
          }}
        >
          <Button
            text="선택"
            icon={<TickInCircle />}
            type="button"
            color={ButtonColor.SUCCESS}
            onClick={(e) => data && handleChoose(data[selected])}
          />
          <Button
            text="취소"
            icon={<Reset />}
            type="button"
            onClick={() => {
              setModalOpen(false);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default AsModal;
