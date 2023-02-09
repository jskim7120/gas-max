import React from "react";
import { CustomTable } from "./style";

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
        <th className="orange" colSpan={2}>
          구분
        </th>
        <th className="orange">총입고량</th>
        <th className="orange">잔량</th>
        <th className="orange">충전량</th>
        <th className="orange">매입금액</th>
        <th className="orange">수송비</th>
        <th className="orange">합계</th>
      </tr>
      <tr>
        <th className="orange-light" rowSpan={2}>
          프로판
        </th>
        <th className="orange-light">용기</th>
        <td className="right">{data?.pCIn}</td>
        <td className="right">{data?.pCJan}</td>
        <td className="right">{data?.pCSum}</td>
        <td className="right">{data?.pCKum}</td>
        <td className="right">{data?.pCCost}</td>
        <td className="right">{data?.sumPc}</td>
      </tr>
      <tr>
        <th className="orange-light">벌크</th>
        <td className="right">{data?.pVIn}</td>
        <td className="right">{data?.pVJan}</td>
        <td className="right">{data?.pVSum}</td>
        <td className="right">{data?.pVKum}</td>
        <td className="right">{data?.pVCost}</td>
        <td className="right">{data?.sumPv}</td>
      </tr>

      <tr>
        <th className="orange-light" rowSpan={2}>
          부탄
        </th>
        <th className="orange-light">용기</th>
        <td className="right">{data?.bCIn}</td>
        <td className="right">{data?.bCJan}</td>
        <td className="right">{data?.bCSum}</td>
        <td className="right">{data?.bCKum}</td>
        <td className="right">{data?.bCCost}</td>
        <td className="right">{data?.sumBc}</td>
      </tr>
      <tr>
        <th className="orange-light">벌크</th>
        <td>{data?.bVIn}</td>
        <td>{data?.bVJan}</td>
        <td>{data?.bVSum}</td>
        <td>{data?.bVKum}</td>
        <td>{data?.bVCost}</td>
        <td>{data?.sumBv}</td>
      </tr>
      <tr>
        <th className="orange-light" colSpan={2}>
          기타
        </th>
        <td className="right">{data?.gIn}</td>
        <td className="right">{data?.gJan}</td>
        <td className="right">{data?.gSum}</td>
        <td className="right">{data?.gKum}</td>
        <td className="right">{data?.gCost}</td>
        <td className="right">{data?.sumG}</td>
      </tr>

      <tr>
        <th className="orange" colSpan={2}>
          합계
        </th>
        <th className="orange right">
          {total(data?.pCIn, data?.pVIn, data?.bCIn, data?.bVIn, data?.gIn)}
        </th>
        <th className="orange right">
          {total(
            data?.pCJan,
            data?.pVJan,
            data?.bCJan,
            data?.bVJan,
            data?.gJan
          )}
        </th>
        <th className="orange right">
          {total(
            data?.pCSum,
            data?.pVSum,
            data?.bCSum,
            data?.bVSum,
            data?.gSum
          )}
        </th>
        <th className="orange right">
          {total(
            data?.pCKum,
            data?.pVKum,
            data?.bCKum,
            data?.bVKum,
            data?.gKum
          )}
        </th>
        <th className="orange right">
          {total(
            data?.pCCost,
            data?.pVCost,
            data?.bCCost,
            data?.bVCost,
            data?.gCost
          )}
        </th>
        <th className="orange right">
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
