import React from "react";
import { TabLikeHeader, CTable2 } from "../style";

function Tab1Footer({ data }: { data: any }) {
  console.log("fucking datdaatdada:", data);
  return (
    <div>
      <TabLikeHeader>매입량</TabLikeHeader>
      <CTable2>
        <tr>
          <th>구분</th>
          <th>총입고량</th>
          <th>잔량</th>
          <th>충전량</th>
          <th>kg단가</th>
          <th>매입금액</th>
          <th>수송비</th>
          <th>합계</th>
        </tr>
        <tr>
          <th className="light-gray ">프로판</th>
          <td>{data?.bcPin}</td>
          <td>{data?.bcPjan}</td>
          <td>{data?.bcSumP}</td>
          <td>{data?.bcPdanga}</td>
          <td>{data?.bcPkum}</td>
          <td>{data?.bcPcost}</td>
          <td>{data?.bcPsum}</td>
        </tr>
        <tr>
          <th className="light-gray ">부탄</th>
          <td>{data?.bcBin}</td>
          <td>{data?.bcBjan}</td>
          <td>{data?.bcSumB}</td>
          <td>{data?.bcBdanga}</td>
          <td>{data?.bcBkum}</td>
          <td>{data?.bcBcost}</td>
          <td>{data?.bcBsum}</td>
        </tr>
        <tr>
          <th className="light-gray ">기타</th>
          <td>{data?.bcGin}</td>
          <td></td>
          <td></td>
          <td></td>
          <td>{data?.bcGkum}</td>
          <td>{data?.bcGcost}</td>
          <td>{data?.bcGsum}</td>
        </tr>
        <tr>
          <th>합계</th>
          <td>{data?.bcTotal}</td>
          <td>{data?.bcJTotal}</td>
          <td>{data?.bcSumTotal}</td>
          <td></td>
          <td>{data?.bcSumKum}</td>
          <td>{data?.bcSumCost}</td>
          <td>{data?.bcSum}</td>
        </tr>
      </CTable2>
    </div>
  );
}

export default Tab1Footer;
