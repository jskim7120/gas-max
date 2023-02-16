import { useState } from "react";
import { Input, Field, Select } from "components/form/style";
import { CTitle, CTextArea, CLabel, TabLikeHeader, CTable } from "./style";

function FooterInfo({
  data,
  register,
  calcTab1FooterChange,
}: {
  data: any;
  register: any;
  calcTab1FooterChange: Function;
}) {
  const [bcOutkum, setBcOutkum] = useState<string | undefined>(undefined);
  const [bcDc, setBcDc] = useState<string | undefined>(undefined);
  return (
    <div>
      <Field flex style={{ alignItems: "center" }}>
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
          <td>
            <Input register={register("bcInkum1")} readOnly className="h27" />
          </td>
          <td>
            <Select {...register("bcSupplyType")} className="h27">
              <option value="A">외상</option>
              <option value="0">현금</option>
            </Select>
          </td>
          <td>
            <Input
              register={register("bcOutkum")}
              onChange={(e: any) => {
                setBcOutkum(e.target.value);
                calcTab1FooterChange(e.target.value, "bcOutkum");
              }}
              value={bcOutkum}
              className="h27"
            />
          </td>
          <td>
            <Input
              register={register("bcDc")}
              onChange={(e: any) => {
                setBcDc(e.target.value);
                calcTab1FooterChange(e.target.value, "bcDc");
              }}
              value={bcDc}
              className="h27"
            />
          </td>
          <td>
            <Input register={register("bcMisu")} className="h27" />
          </td>
          <td>
            <Input register={register("bcBigo")} className="h27" />
          </td>
        </tr>
      </CTable>
    </div>
  );
}

export default FooterInfo;
