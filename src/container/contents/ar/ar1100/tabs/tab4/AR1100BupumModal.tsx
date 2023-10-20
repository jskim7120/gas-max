import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "app/store";
import { apiGet } from "app/axios";
import { AR1100BUPUMSEARCH } from "app/path";
import { CTable2 } from "container/contents/gr/gr1200/style";
import Button from "components/button/button";
import { ButtonColor } from "components/componentsType";
import { addBupum } from "app/state/modal/modalSlice";
import { ModalBlueHeader } from "components/modal/customModals/style";
import {
  MagnifyingGlassBig,
  Reset,
  TickInCircle,
  WhiteClose,
} from "components/allSvgIcon";
import Loader from "components/loader";
import { FormGroup } from "components/form/style";
import { handleKeyDown } from "helpers/handleKeyDown";

function BupumModal({ setModalOpen }: { setModalOpen: Function }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any[]>();
  const [selected, setSelected] = useState<number>(0);
  const dispatch = useDispatch();

  const state = useSelector((state) => state.modal.bupum);

  useEffect(() => {
    if (state) {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    const response = await apiGet(AR1100BUPUMSEARCH, {
      areaCode: "01",
      bpCode: "",
      bpName: "",
      bpSearch: "",
      pjType: "3",
    });

    if (response) {
      setData(response);
    } else {
      setData([]);
    }
  };

  const handleChoose = (obj: any) => {
    dispatch(addBupum(obj));
    setModalOpen(false);
  };

  return (
    <>
      <ModalBlueHeader
        className="handle h25"
        style={{ background: "rgba(101, 84, 255, 0.37)", height: "40px" }}
      >
        <FormGroup>시설 부품</FormGroup>
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
            padding: "10px 15px",
            display: "flex",
            alignItems: "center",
            background: "#eceaff",
          }}
        >
          <label>부품명</label>
          <input
            style={{
              height: "25px",
              borderRadius: "15px",
              border: "1px solid rgb(188, 185, 185)",
              outline: "none",
              padding: "0 10px 0 15px",
              margin: " 0 20px 0 10px",
            }}
          />
          <Button
            text="검색"
            icon={!loading && <MagnifyingGlassBig width="15" />}
            color={ButtonColor.DANGER}
            type="submit"
            loader={
              loading && <Loader size={16} style={{ marginRight: "12px" }} />
            }
          />
        </div>
        <div
          style={{
            height: "376px",
            overflowY: "auto",
            padding: "0 10px",
            margin: "10px 0",
          }}
        >
          <CTable2>
            <colgroup>
              <col width="15%" />
              <col width="50%" />
              <col width="20%" />
              <col width="20%" />
              <col width="20%" />
            </colgroup>
            <tr style={{ height: "40px" }}>
              <th style={{ background: "#bbf7b5" }}>코드</th>
              <th style={{ background: "#bbf7b5" }}>부품명</th>
              <th style={{ background: "#bbf7b5" }}>규격</th>
              <th style={{ background: "#bbf7b5" }}>단위</th>
              <th style={{ background: "#bbf7b5" }}>판매단가</th>
            </tr>
            {data?.map((item, idx) => (
              <tr
                key={idx}
                onClick={() => setSelected(idx)}
                onDoubleClick={() => handleChoose(item)}
                className={
                  selected !== undefined && selected === idx
                    ? "active"
                    : undefined
                }
                style={{ height: "40px" }}
              >
                <td style={{ textAlign: "center" }}>{item.bgBpCode}</td>
                <td style={{ textAlign: "center" }}>{item.bgBpName}</td>
                <td style={{ textAlign: "center" }}>{item.bgBpDanwi}</td>
                <td style={{ textAlign: "center" }}>{item.bgBpType}</td>
                <td style={{ textAlign: "center" }}>{item.bgBpDanga}</td>
              </tr>
            ))}
          </CTable2>
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

export default BupumModal;
