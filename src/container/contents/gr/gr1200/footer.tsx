import React from "react";
import {
  Input,
  Select,
  Field,
  ErrorText,
  FormGroup,
  Wrapper,
  Divider,
  Label,
  TextArea,
} from "components/form/style";
import PlainTab from "components/plainTab";
import { TabContentWrapper } from "components/plainTab/style";

import { CTitle, CTextArea, CLabel, TabLikeHeader, CTable } from "./style";

function FooterInfo({ data, register }: { data: any; register: any }) {
  return (
    <div>
      <Field flex style={{ marginBottom: "20px", alignItems: "center" }}>
        <Field flex style={{ width: "80%" }}>
          <CTitle>메모</CTitle>
          <CTextArea {...register("bcMemo")} />
        </Field>

        <Field style={{ width: "20%" }}>
          <Field flex style={{ alignItems: "center" }}>
            <CLabel>공급액</CLabel>
            <Input
              register={register("bcSupplyAmt")}
              style={{
                margin: "2px 5px",
                background: `rgba(104,103,103,0.35)`,
                height: "20px",
                width: "120px",
              }}
            />
          </Field>
          <Field flex style={{ alignItems: "center" }}>
            <CLabel>세액</CLabel>
            <Input
              register={register("bcVatAmt")}
              style={{
                margin: "2px 5px",
                background: `rgba(104,103,103,0.35)`,
                height: "20px",
                width: "120px",
              }}
            />
          </Field>
          <Field flex style={{ alignItems: "center" }}>
            <CLabel>합계금액</CLabel>
            <Input
              register={register("bcInkum")}
              style={{
                margin: "2px 5px",
                background: `rgba(104,103,103,0.35)`,
                height: "20px",
                width: "120px",
              }}
            />
          </Field>
        </Field>
      </Field>
      <TabLikeHeader>매입액</TabLikeHeader>
      <CTable>
        <tr>
          <th>매입 금액</th>
          <th>지급 방법</th>
          <th>지급금액</th>
          <th>D/C</th>
          <th>미지급액</th>
          <th>비고</th>
        </tr>
        <tr>
          <td>{data?.bcInkum1}</td>
          <td>{data?.bcSupplyType}</td>
          <td>{data?.bcOutkum}</td>
          <td>{data?.bcDc}</td>
          <td>{data?.bcMisu}</td>
          <td>{data?.bcBigo}</td>
        </tr>
      </CTable>
    </div>
  );
}

export default FooterInfo;
