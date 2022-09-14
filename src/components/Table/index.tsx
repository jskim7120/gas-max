import React, { useState } from "react";
import AppTable from "./style";

interface ITable {
  tableHeader: any;
  tableData: any;
  onClick: (arg: any) => any;
}

function Table({ tableHeader, tableData, onClick }: ITable) {
  const [clickedRowIndex, setClickedRowIndex] = useState(0);
  const data = JSON.parse(JSON.stringify(tableData));

  return (
    <AppTable>
      <thead>
        <tr>
          {tableHeader?.map((header: string, idx: number) => (
            <th key={idx}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.map((item: any, i: number) => (
          <tr
            key={i}
            className={i === clickedRowIndex ? "active" : ""}
            onClick={() => {
              setClickedRowIndex(i);
              onClick(item);
            }}
          >
            {/* {Object.entries(data)?.map(
              ([key, value], idx: number) =>
                idx < 6 && <td key={idx}>{data[key]}</td>
            )} */}
            <td>{item.areaCode}</td>
            <td>{item.swCode}</td>
            <td>{item.swName}</td>
            <td>{item.swTel}</td>
            <td>{item.swHp}</td>
            <td>{item.swPaydate}</td>
          </tr>
        ))}
      </tbody>
    </AppTable>
  );
}

export default Table;
