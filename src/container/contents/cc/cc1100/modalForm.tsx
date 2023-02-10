import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "app/store";
import API from "app/axios";
import { CC110080 } from "app/path";

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
      <table>
        <th></th>
        {data?.map((item) => (
          <tr onClick={() => setSelected(item)}>
            <td>{item.accCode}</td>
            <td>{item.accName}</td>
          </tr>
        ))}
      </table>

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

export default CC1100Modal;
