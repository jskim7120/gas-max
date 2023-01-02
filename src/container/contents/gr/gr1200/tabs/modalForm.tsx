import React, { useEffect, useState } from "react";
import { useSelector } from "app/store";
import API from "app/axios";
import { GR120012 } from "app/path";
import { CTable2 } from "../style";

function GR1200Modal() {
  const state = useSelector((state) => state.modal.gr1200);
  const [data, setData] = useState<any[]>();
  useEffect(() => {
    if (state) {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const res = await API.get(GR120012, {
        params: {
          areaCode: "00", //state.areaCode,
          bcBuCode: "01", //state.bcBuCode,
          bcChitType: "1", //state.bcChitType,
        },
      });

      if (res.status === 200) {
        console.log("datatatatatata:", res.data);
        setData(res.data);
      } else {
        alert("error");
      }
    } catch (err) {
      console.log("error fetching GR1200 Modal data");
    }
  };
  return (
    <CTable2>
      <tr>
        <th>구분</th>
        <th>총입고량</th>
      </tr>
      {data?.map((item) => (
        <tr>
          <td>{item.jpCode}</td>
          <td>{item.jpName}</td>
        </tr>
      ))}
    </CTable2>
  );
}

export default GR1200Modal;
