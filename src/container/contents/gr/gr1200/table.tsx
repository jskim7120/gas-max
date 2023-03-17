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
    item1 = item1 ? +item1 : 0;
    item2 = item2 ? +item2 : 0;
    item3 = item3 ? +item3 : 0;
    item4 = item4 ? +item4 : 0;
    item5 = item5 ? +item5 : 0;

    let sum: number = 0;
    sum = item1 + item2 + item3 + item4 + item5;

    return Number(sum).toLocaleString("en-US");
  };

  const show = (field: any) => {
    if (Object.keys(data).length === 0) return null;
    return Number(field).toLocaleString("en-US");
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
        <td className="right">{show(data?.pCIn)}</td>
        <td className="right">{show(data?.pCJan)}</td>
        <td className="right">{show(data?.pCSum)}</td>
        <td className="right">{show(data?.pCKum)}</td>
        <td className="right">{show(data?.pCCost)}</td>
        <td className="right">{show(data?.sumPc)}</td>
      </tr>
      <tr>
        <th className="orange-light">벌크</th>
        <td className="right">{show(data?.pVIn)}</td>
        <td className="right">{show(data?.pVJan)}</td>
        <td className="right">{show(data?.pVSum)}</td>
        <td className="right">{show(data?.pVKum)}</td>
        <td className="right">{show(data?.pVCost)}</td>
        <td className="right">{show(data?.sumPv)}</td>
      </tr>

      <tr>
        <th className="orange-light" rowSpan={2}>
          부탄
        </th>
        <th className="orange-light">용기</th>
        <td className="right">{show(data?.bCIn)}</td>
        <td className="right">{show(data?.bCJan)}</td>
        <td className="right">{show(data?.bCSum)}</td>
        <td className="right">{show(data?.bCKum)}</td>
        <td className="right">{show(data?.bCCost)}</td>
        <td className="right">{show(data?.sumBc)}</td>
      </tr>
      <tr>
        <th className="orange-light">벌크</th>
        <td className="right">{show(data?.bVIn)}</td>
        <td className="right">{show(data?.bVJan)}</td>
        <td className="right">{show(data?.bVSum)}</td>
        <td className="right">{show(data?.bVKum)}</td>
        <td className="right">{show(data?.bVCost)}</td>
        <td className="right">{show(data?.sumBv)}</td>
      </tr>
      <tr>
        <th className="orange-light" colSpan={2}>
          기타
        </th>
        <td className="right">{show(data?.gIn)}</td>
        <td className="right">{show(data?.gJan)}</td>
        <td className="right">{show(data?.gSum)}</td>
        <td className="right">{show(data?.gKum)}</td>
        <td className="right">{show(data?.gCost)}</td>
        <td className="right">{show(data?.sumG)}</td>
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
