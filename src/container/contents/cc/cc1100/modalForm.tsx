import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "app/store";
import API from "app/axios";
import { CC110080 } from "app/path";
import { CTable2 } from "container/contents/gr/gr1200/style";

import Button from "components/button/button";
import { ButtonColor } from "components/componentsType";
import { addCC1100, closeModal } from "app/state/modal/modalSlice";

function CC1100Modal() {
  const [data, setData] = useState<any[]>();
  const [selected, setSelected] = useState<any>(null);

  const dispatch = useDispatch();

  const state = useSelector((state) => state.modal.cc1100);

  useEffect(() => {
    if (state) {
      console.log(state);
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const res = await API.get(CC110080, {
        params: {
          acjType: state.acjType,
        },
      });

      if (res.status === 200) {
        setData(res.data);
      } else {
        setData([]);
      }
    } catch (err) {
      setData([]);
      console.log("error fetching cc1100 Modal data");
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
          <th style={{ textAlign: "left" }}>계정과목</th>
          <th style={{ textAlign: "left" }}>항목명</th>
        </tr>
        {data?.map((item) => (
          <tr onClick={() => setSelected(item)}>
            <td>{item.accName}</td>
            <td>{item.acsName}</td>
          </tr>
        ))}
      </CTable2>

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
                acsCode: selected?.acsCode ?? undefined,
                acsName: selected?.acsName ?? undefined,
              })
            );

            dispatch(closeModal());
          }}
        />
        <Button
          type="button"
          text="취소(Esc)"
          color={ButtonColor.LIGHT}
          onClick={() => {
            dispatch(closeModal());
          }}
        />
      </div>
    </div>
  );
}

export default CC1100Modal;
