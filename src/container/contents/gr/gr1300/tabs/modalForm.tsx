import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "app/store";
import API from "app/axios";
import { GR130012 } from "app/path";
import { CTable2 } from "../style";
import Button from "components/button/button";
import { ButtonColor } from "components/componentsType";
import { addGR1300, closeModal } from "app/state/modal/modalSlice";

function GR1300Modal() {
  const [data, setData] = useState<any[]>();
  const [selected, setSelected] = useState<any>(null);

  const dispatch = useDispatch();

  const state = useSelector((state) => state.modal.gr1300);

  useEffect(() => {
    if (state) {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const res = await API.get(GR130012, {
        params: {
          areaCode: state.areaCode,
          bbBuCode: state.bbBuCode,
          bbType: state.bbType,
        },
      });

      if (res.status === 200) {
        setData(res.data);
      } else {
        alert("error");
      }
    } catch (err) {
      console.log("error fetching GR1300 Modal data");
    }
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CTable2>
        <tr>
          <th>구분</th>
          <th>총입고량</th>
        </tr>
        {data?.map((item, idx) => (
          <tr
            key={idx}
            onClick={() => setSelected(item)}
            className={
              selected?.bpCode &&
              (selected.bpCode === item.bpCode ? "active" : undefined)
            }
          >
            <td>{item.bpCode}</td>
            <td>{item.bpName}</td>
          </tr>
        ))}
      </CTable2>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          type="button"
          text="choose"
          color={ButtonColor.SUCCESS}
          onClick={() => {
            dispatch(
              addGR1300({
                ...state,
                jbuDangaType: selected?.jbuDangaType ?? undefined,
                bpName: selected?.bpName ?? undefined,
                bpType: selected?.bpType ?? undefined,
                jbuChangedate: selected?.jbuChangedate ?? undefined,
                bpDanwi: selected?.bpDanwi ?? undefined,
                jbuVatKind: selected?.jbuVatKind ?? undefined,
                jbuBpDanga: selected?.jbuBpDanga ?? undefined,
                bpCode: selected?.bpCode ?? undefined,
              })
            );

            dispatch(closeModal());
          }}
        />
        <Button
          type="button"
          text="esc"
          color={ButtonColor.LIGHT}
          onClick={() => {
            dispatch(closeModal());
          }}
        />
      </div>
    </div>
  );
}

export default GR1300Modal;
