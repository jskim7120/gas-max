import { useState } from "react";
import AppTable from "./style";

interface ITable {
  tableHeader: any;
  tableData: any;
  onClick?: (arg: any) => any;
  style?: any;
  className?: any;
}

function Table({ tableHeader, tableData, onClick, style, className }: ITable) {
  const [clickedRowIndex, setClickedRowIndex] = useState(0);

  return (
    <AppTable style={style} className={className && className}>
      <thead>
        <tr>
          {tableHeader?.map((header: string, idx: number) => (
            <th key={idx}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData?.map((item: any, i: number) => (
          <tr
            key={i}
            className={i === clickedRowIndex ? "active" : ""}
            onClick={() => {
              setClickedRowIndex(i);
              onClick && onClick(item);
            }}
          >
            {Object.entries(item)?.map(([key, value], idx: number) => (
              <td key={idx}>{item[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </AppTable>
  );
}

export default Table;
