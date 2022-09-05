import React, { useState } from "react";
import AppTable from "./style";

interface ITable {
  tableHeader: any;
  tableData: any;
  onClick: (arg: any) => any;
}

function Table({ tableHeader, tableData, onClick }: ITable) {
  const [clickedRowIndex, setClickedRowIndex] = useState(0);
  console.log("clickedRowIndex", clickedRowIndex);
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
        {tableData?.map((data: any, i: number) => (
          <tr key={i} className={i === clickedRowIndex ? "active" : ""}>
            {Object.entries(data)?.map(([key, value], idx: number) =>
              idx === 2 ? (
                <td
                  key={idx}
                  onClick={() => {
                    setClickedRowIndex(i);
                    onClick(data);
                  }}
                >
                  {data[key]}
                </td>
              ) : (
                <td key={idx}>{data[key]}</td>
              )
            )}
          </tr>
        ))}
      </tbody>
    </AppTable>
  );
}

export default Table;
