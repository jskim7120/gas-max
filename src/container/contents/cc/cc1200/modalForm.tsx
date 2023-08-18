import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "app/store";
import { apiGet } from "app/axios";
import { CC110080 } from "app/path";
import { CTable2 } from "container/contents/gr/gr1200/style";

import Button from "components/button/button";
import { ButtonColor } from "components/componentsType";
import { addCC1100 } from "app/state/modal/modalSlice";

function CC1200Modal({ setModalOpen }: { setModalOpen: Function }) {
  const [data, setData] = useState<any[]>();
  const [selected, setSelected] = useState<any>(null);

  const dispatch = useDispatch();

  const state = useSelector((state) => state.modal.cc1100);

  useEffect(() => {
    if (state) {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    const response = await apiGet(CC110080, {
      acjType: state.acjType,
    });

    if (response) {
      setData(response);
    } else {
      setData([]);
    }
  };

  return (
    <div
      style={{
        padding: "7px",
      }}
    >
      <div
        style={{
          fontSize: "14px",
          padding: "0px 2px 6px",
        }}
      >
        계정과목 선택
      </div>
      <div
        style={{
          height: "376px",
          overflowY: "auto",
        }}
      >
        <CTable2>
          <tr>
            <th style={{ width: "22%" }}>코드</th>
            <th style={{ textAlign: "left" }}>계정과목</th>
          </tr>
          {data?.map((item) => (
            <tr onClick={() => setSelected(item)}>
              <td style={{ textAlign: "center" }}>{item.accCode}</td>
              <td>{item.accName}</td>
            </tr>
          ))}
        </CTable2>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
          gap: "10px",
        }}
      >
        <Button
          type="button"
          text="선택(Enter)"
          color={ButtonColor.SUCCESS}
          onClick={() => {
            dispatch(
              addCC1100({
                ...state,
                accCode: selected?.accCode ?? undefined,
                accName: selected?.accName ?? undefined,
                accGubun: selected?.accGubun ?? undefined,
              })
            );

            setModalOpen(false);
          }}
        />
        <Button
          type="button"
          text="취소(Esc)"
          color={ButtonColor.LIGHT}
          onClick={() => {
            setModalOpen(false);
          }}
        />
      </div>
    </div>
  );
}

export default CC1200Modal;
