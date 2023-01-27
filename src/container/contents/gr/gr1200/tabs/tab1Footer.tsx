import React, { useEffect, useState } from "react";
import { TabLikeHeader, CTable2 } from "../style";
import { Input } from "components/form/style";
import { InputSize } from "components/componentsType";

function Tab1Footer({
  data,
  register,
  reset,
  someFunc,
  anotherFunc,
}: {
  data: any;
  register: Function;
  reset: Function;
  someFunc: Function;
  anotherFunc: Function;
}) {
  const [bcPdanga, setBcPdanga] = useState<string | undefined>(undefined);
  const [bcBdanga, setBcBdanga] = useState<string | undefined>(undefined);
  const [bcPcost, setBcPcost] = useState<number | undefined>(undefined);
  const [bcBcost, setBcBcost] = useState<number | undefined>(undefined);
  const [bcPjan, setBcPjan] = useState<string | undefined>(undefined);
  const [bcBjan, setBcBjan] = useState<string | undefined>(undefined);

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
          <td>
            {data.bcPin}
            <Input register={register("bcPin")} readOnly />
          </td>
          <td>
            {data.bcPjan}
            <Input
              register={register("bcPjan")}
              onChange={(e: any) => {
                setBcPjan(e.target.value);
                anotherFunc(e.target.value, "bcPjan");
              }}
              value={bcPjan}
            />
          </td>
          <td>
            {data.bcSumP}
            <Input register={register("bcSumP")} readOnly />
          </td>
          <td>
            {data.bcPdanga}
            <Input
              register={register("bcPdanga")}
              onChange={(e: any) => {
                setBcPdanga(e.target.value);
                anotherFunc(e.target.value, "bcPdanga");
              }}
              value={bcPdanga}
            />
          </td>
          <td>
            {data?.bcPkum}
            <Input register={register("bcPkum")} readOnly />
          </td>
          <td>
            {data?.bcPcost}
            <Input
              register={register("bcPcost")}
              onChange={(e: any) => {
                setBcPcost(e.target.value);
                anotherFunc(e.target.value, "bcPcost");
              }}
              value={bcPcost}
            />
          </td>
          <td>
            {data?.bcPsum}
            <Input register={register("bcPsum")} readOnly />
          </td>
        </tr>
        <tr>
          <th className="light-gray ">부탄</th>
          <td>
            {data?.bcBin}
            <Input register={register("bcBin")} readOnly />
          </td>
          <td>
            {data.bcBjan}
            <Input
              register={register("bcBjan")}
              onChange={(e: any) => {
                setBcBjan(e.target.value);
                anotherFunc(e.target.value, "bcBjan");
              }}
              value={bcBjan}
            />
          </td>
          <td>
            {data?.bcSumB}
            <Input register={register("bcSumB")} readOnly />
          </td>
          <td>
            {data?.bcBdanga}
            <Input
              register={register("bcBdanga")}
              onChange={(e: any) => {
                setBcBdanga(e.target.value);
                anotherFunc(e.target.value, "bcBdanga");
              }}
              value={bcBdanga}
            />
          </td>
          <td>
            {data?.bcBkum}
            <Input register={register("bcBkum")} readOnly />
          </td>
          <td>
            {data?.bcBcost}
            <Input
              register={register("bcBcost")}
              onChange={(e: any) => {
                setBcBcost(e.target.value);
                anotherFunc(e.target.value, "bcBcost");
              }}
              value={bcBcost}
            />
          </td>
          <td>
            {data?.bcBsum}
            <Input register={register("bcBsum")} readOnly />
          </td>
        </tr>
        <tr>
          <th className="light-gray">기타</th>
          <td>{data?.bcGin}</td>
          <td></td>
          <td></td>
          <td></td>
          <td>{data?.bcGkum}</td>
          <td>
            <Input register={register("bcGcost")} />
          </td>
          <td>{data?.bcGsum}</td>
        </tr>
        <tr>
          <th>합계</th>
          <td>
            {data?.bcTotal}
            <Input register={register("bcTotal")} readOnly />
          </td>
          <td>
            {data?.bcJTotal}
            <Input register={register("bcJTotal")} readOnly />
          </td>
          <td>
            {data?.bcSumTotal}
            <Input register={register("bcSumTotal")} readOnly />
          </td>
          <td></td>
          <td>
            {data?.bcSumKum}
            <Input register={register("bcSumKum")} readOnly />
          </td>
          <td>
            {data?.bcSumCost}
            <Input register={register("bcSumCost")} readOnly />
          </td>
          <td>
            {data?.bcSum}
            <Input register={register("bcSum")} readOnly />
          </td>
        </tr>
      </CTable2>
    </div>
  );
}

export default Tab1Footer;
