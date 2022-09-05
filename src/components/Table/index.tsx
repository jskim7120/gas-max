import React from "react";
import AppTable from "./style";
interface ITable {
  tableHeader: any;
  tableData: any;
  onClick: (arg: any) => any;
}

function Table({ tableHeader, tableData, onClick }: ITable) {
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
          <tr key={i}>
            {Object.entries(data)?.map(([key, value], idx: number) =>
              idx === 1 ? (
                <td key={idx} onClick={(e) => onClick(data)}>
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
