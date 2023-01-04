import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input, Field } from "components/form/style";
import { IGR1300 } from "./model";

import { GrFooter1300Cnt } from "./style";
import {
  TabLikeHeader,
  CLabel,
  CTitle,
  CTextArea,
  CTable,
} from "../gr1200/style";

function FooterInfo({ data, selected }: { data: any; selected: any }) {
  const { register, reset } = useForm<IGR1300>({});
  useEffect(() => {
    if (JSON.stringify(selected) !== "{}") {
      reset({
        ...selected,
      });
    }
  }, [selected]);
  return (
    <GrFooter1300Cnt>
      <Field flex style={{ marginBottom: "20px", alignItems: "center" }}>
        <Field flex style={{ width: "80%" }}>
          <CTitle className="cTitle">메모</CTitle>
          <CTextArea className="cTextArea" {...register("bbMemo")} />
        </Field>

        <Field style={{ width: "20%" }}>
          <Field flex style={{ alignItems: "center" }}>
            <CLabel>공급액</CLabel>
            <Input
              register={register("bbSum")}
              style={{
                margin: "2px",
                background: `rgba(104,103,103,0.35)`,
                height: "20px",
                width: "120px",
              }}
              textAlign={"right"}
            />
          </Field>
          <Field flex style={{ alignItems: "center" }}>
            <CLabel>세액</CLabel>
            <Input
              register={register("bbVat")}
              style={{
                margin: "2px",
                background: `rgba(104,103,103,0.35)`,
                height: "20px",
                width: "120px",
              }}
              textAlign={"right"}
            />
          </Field>
          <Field flex style={{ alignItems: "center" }}>
            <CLabel>합계금액</CLabel>
            <Input
              register={register("bbTotal")}
              style={{
                margin: "2px",
                background: `rgba(104,103,103,0.35)`,
                height: "20px",
                width: "120px",
              }}
              textAlign={"right"}
            />
          </Field>
        </Field>
      </Field>
      <TabLikeHeader>매입액</TabLikeHeader>
      <CTable className="cTable">
        <tr>
          <th>매입 금액</th>
          <th>매입방법</th>
          <th>지급금액</th>
          <th>D/C</th>
          <th>미지급액</th>
          <th>비고</th>
        </tr>
        <tr>
          <td className="right">{selected?.bbTotal}</td>
          <td className="right">{selected?.bbSupplyType}</td>
          <td className="right">{selected?.bbOutkum}</td>
          <td className="right">{selected?.bbDc}</td>
          <td className="right"></td>
          <td className="right"></td>
        </tr>
      </CTable>
    </GrFooter1300Cnt>
  );
}

export default FooterInfo;
