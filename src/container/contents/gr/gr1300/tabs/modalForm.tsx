import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "app/store";
import { apiGet } from "app/axios";
import { GR130012 } from "app/path";
import { addGR1300 } from "app/state/modal/modalSlice";
import { CTable2 } from "../../gr1200/style";
import Button from "components/button/button";
import { ButtonColor } from "components/componentsType";

function GR1300Modal({ setModalOpen }: { setModalOpen: Function }) {
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
    const res = await apiGet(GR130012, {
      areaCode: state.areaCode,
      bbBuCode: state.bbBuCode,
      bbType: state.bbType,
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
          <th>코드</th>
          <th>품명</th>
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
                isProductNameSelected: true,
                bpCode: selected?.bpCode ?? undefined,
                bpName: selected?.bpName ?? undefined,
                jbuBpDanga: selected?.jbuBpDanga ?? undefined,
                jbuVatKind: selected?.jbuVatKind ?? undefined,
                bpType: selected?.bpType ?? undefined,
              })
            );

            setModalOpen(false);
          }}
        />
        <Button
          type="button"
          text="esc"
          color={ButtonColor.LIGHT}
          onClick={() => {
            setModalOpen(false);
          }}
        />
      </div>
    </div>
  );
}

export default GR1300Modal;
