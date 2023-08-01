import React from "react";
import { CustomTable } from "../gr1200/style";

function Table({ data, style }: { data: any; style?: any }) {
  const total = (
    item1: any,
    item2: any,
    item3: any,
    item4: any,
    item5: any
  ) => {
    if (
      item1 === undefined &&
      item2 === undefined &&
      item2 === undefined &&
      item3 === undefined &&
      item4 === undefined &&
      item5 === undefined
    ) {
      return null;
    }

    let sum: number = 0;
    sum = item1
      ? Number(item1)
      : 0 + item2
      ? Number(item2)
      : 0 + item3
      ? Number(item3)
      : 0 + item4
      ? Number(item4)
      : 0 + item5
      ? Number(item5)
      : 0;

    return sum;
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
        <th className="orange-light right">
          {total(data?.pCIn, data?.pVIn, data?.bCIn, data?.bVIn, data?.gIn)}
        </th>
        <th className="orange-light right">
          {total(
            data?.pCJan,
            data?.pVJan,
            data?.bCJan,
            data?.bVJan,
            data?.gJan
          )}
        </th>
        <th className="orange-light right">
          {total(
            data?.pCSum,
            data?.pVSum,
            data?.bCSum,
            data?.bVSum,
            data?.gSum
          )}
        </th>
        <th className="orange-light right">
          {total(
            data?.pCKum,
            data?.pVKum,
            data?.bCKum,
            data?.bVKum,
            data?.gKum
          )}
        </th>
        <th className="orange-light right">
          {total(
            data?.pCCost,
            data?.pVCost,
            data?.bCCost,
            data?.bVCost,
            data?.gCost
          )}
        </th>
        <th className="orange-light right">
          {total(
            data?.sumPc,
            data?.sumPv,
            data?.sumBc,
            data?.sumBv,
            data?.sumG
          )}
        </th>
      </tr>
    </CustomTable>
  );
}

export default Table;
