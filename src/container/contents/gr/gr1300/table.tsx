import React from "react";
import { CustomTable } from "../gr1200/style";

function Table({ data, style }: { data: any; style?: any }) {
  const show = (field: any) => {
    if (Object.keys(data)?.length === 0) return null;
    return Number(field).toLocaleString("en-US");
  };

  return (
    <CustomTable style={style}>
      <tr>
        <th className="orange" rowSpan={2}>
          합 계
        </th>
        <th className="orange">공급액</th>
        <th className="orange">세액</th>
        <th className="orange">매입 합계</th>
        <th className="orange">지급액</th>
        <th className="orange">D/C</th>
        <th className="orange">외상 매입</th>
      </tr>
      <tr>
        <th className="orange-light right">{show(data?.totalSum)}</th>
        <th className="orange-light right">{show(data?.totalVat)}</th>
        <th className="orange-light right">{show(data?.totalTotal)}</th>
        <th className="orange-light right">{show(data?.totalOutkum)}</th>
        <th className="orange-light right">{show(data?.Dc)}</th>
        <th className="orange-light right">{show(data?.Credit)}</th>
      </tr>
    </CustomTable>
  );
}

export default Table;
