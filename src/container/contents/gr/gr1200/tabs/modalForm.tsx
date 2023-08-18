import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "app/store";
import { apiGet } from "app/axios";
import { GR120012 } from "app/path";
import { addGR1200 } from "app/state/modal/modalSlice";
import { CTable2 } from "../style";
import Button from "components/button/button";
import { ButtonColor } from "components/componentsType";

function GR1200Modal({ setModalOpen }: { setModalOpen: Function }) {
  const [data, setData] = useState<any[]>();
  const [selected, setSelected] = useState<any>(null);

  const dispatch = useDispatch();
  const state = useSelector((state) => state.modal.gr1200Popup);

  useEffect(() => {
    if (state) {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    const res = await apiGet(GR120012, {
      areaCode: state.areaCode,
      bcBuCode: state.bcBuCode,
      bcChitType: state.bcChitType,
    });

    if (res) {
      setData(res);
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
              selected?.jpCode &&
              (selected.jpCode === item.jpCode ? "active" : undefined)
            }
          >
            <td>{item.jpCode}</td>
            <td>{item.jpName}</td>
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
          text="선택"
          color={ButtonColor.SUCCESS}
          onClick={() => {
            dispatch(
              addGR1200({
                index: state.index,
                // jpCode: selected?.jpCode ?? undefined,
                // jpCost: selected?.jpCost ?? undefined,
                // jpDanga: selected?.jpDanga ?? undefined,
                // jpGubun: selected?.jpGubun ?? undefined,
                // jpKg: selected?.jpKg ?? undefined,
                // jpName: selected?.jpName ?? undefined,
                // jpSvyn: selected?.jpSvyn ?? undefined,
                // isProductNameSelected: true,
                ...selected,
              })
            );

            setModalOpen(false);
          }}
        />
        <Button
          type="button"
          text="취소"
          color={ButtonColor.LIGHT}
          onClick={() => {
            setModalOpen(false);
          }}
        />
      </div>
    </div>
  );
}

export default GR1200Modal;
