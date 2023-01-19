import React from "react";
import { TabLikeHeader, CTable2 } from "../style";
import {
  Input,
  Select,
  Field,
  FormGroup,
  Wrapper,
  Label,
} from "components/form/style";
import { InputSize } from "components/componentsType";

function Tab1Footer({ data, register }: { data: any; register: Function }) {
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
          <td>
            <Input register={register("bcPjan")} />
          </td>
          <td>{data?.bcSumP}</td>
          <td>
            <Input register={register("bcPdanga")} />
          </td>
          <td>{data?.bcPkum}</td>
          <td>
            <Input register={register("bcPcost")} />
          </td>
          <td>{data?.bcPsum}</td>
        </tr>
        <tr>
          <th className="light-gray ">부탄</th>
          <td>{data?.bcBin}</td>
          <td>
            <Input register={register("bcBjan")} />
          </td>
          <td>{data?.bcSumB}</td>
          <td>
            <Input register={register("bcBdanga")} />
          </td>
          <td>{data?.bcBkum}</td>
          <td>
            <Input register={register("bcBcost")} />
          </td>
          <td>{data?.bcBsum}</td>
        </tr>
        <tr>
          <th className="light-gray ">기타</th>
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
