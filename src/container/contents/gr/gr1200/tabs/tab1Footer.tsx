import { useState } from "react";
import { TabLikeHeader, CTable2 } from "../style";
import { Input } from "components/form/style";

function Tab1Footer({
  data,
  register,
  calcOnFieldChange,
}: {
  data: any;
  register: Function;
  calcOnFieldChange: Function;
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
            <Input register={register("bcPin")} className="h27" readOnly />
          </td>
          <td>
            <Input
              register={register("bcPjan")}
              onChange={(e: any) => {
                setBcPjan(e.target.value);
                calcOnFieldChange(e.target.value, "bcPjan");
              }}
              value={bcPjan}
              className="h27"
            />
          </td>
          <td>
            <Input register={register("bcSumP")} className="h27" readOnly />
          </td>
          <td>
            <Input
              register={register("bcPdanga")}
              onChange={(e: any) => {
                setBcPdanga(e.target.value);
                calcOnFieldChange(e.target.value, "bcPdanga");
              }}
              value={bcPdanga}
              className="h27"
            />
          </td>
          <td>
            <Input register={register("bcPkum")} className="h27" readOnly />
          </td>
          <td>
            <Input
              register={register("bcPcost")}
              onChange={(e: any) => {
                setBcPcost(e.target.value);
                calcOnFieldChange(e.target.value, "bcPcost");
              }}
              value={bcPcost}
              className="h27"
            />
          </td>
          <td>
            <Input register={register("bcPsum")} className="h27" readOnly />
          </td>
        </tr>
        <tr>
          <th className="light-gray ">부탄</th>
          <td>
            <Input register={register("bcBin")} className="h27" readOnly />
          </td>
          <td>
            <Input
              register={register("bcBjan")}
              onChange={(e: any) => {
                setBcBjan(e.target.value);
                calcOnFieldChange(e.target.value, "bcBjan");
              }}
              value={bcBjan}
              className="h27"
            />
          </td>
          <td>
            <Input register={register("bcSumB")} className="h27" readOnly />
          </td>
          <td>
            <Input
              register={register("bcBdanga")}
              onChange={(e: any) => {
                setBcBdanga(e.target.value);
                calcOnFieldChange(e.target.value, "bcBdanga");
              }}
              value={bcBdanga}
              className="h27"
            />
          </td>
          <td>
            <Input register={register("bcBkum")} className="h27" readOnly />
          </td>
          <td>
            <Input
              register={register("bcBcost")}
              onChange={(e: any) => {
                setBcBcost(e.target.value);
                calcOnFieldChange(e.target.value, "bcBcost");
              }}
              value={bcBcost}
              className="h27"
            />
          </td>
          <td>
            <Input register={register("bcBsum")} className="h27" readOnly />
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
            <Input register={register("bcGcost")} className="h27" />
          </td>
          <td>{data?.bcGsum}</td>
        </tr>
        <tr>
          <th>합계</th>
          <td>
            <Input register={register("bcTotal")} className="h27" readOnly />
          </td>
          <td>
            <Input register={register("bcJTotal")} className="h27" readOnly />
          </td>
          <td>
            <Input register={register("bcSumTotal")} className="h27" readOnly />
          </td>
          <td></td>
          <td>
            <Input register={register("bcSumKum")} className="h27" readOnly />
          </td>
          <td>
            <Input register={register("bcSumCost")} className="h27" readOnly />
          </td>
          <td>
            <Input register={register("bcSum")} className="h27" readOnly />
          </td>
        </tr>
      </CTable2>
    </div>
  );
}

export default Tab1Footer;
