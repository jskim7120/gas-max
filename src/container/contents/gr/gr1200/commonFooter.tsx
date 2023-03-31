import { useState } from "react";
import { Input, Field, Select } from "components/form/style";
import { CTitle, CTextArea, CLabel, TabLikeHeader, CTable } from "./style";
import { InputSize } from "components/componentsType";

function CommonFooterInfo({
  register,
  calcOnFieldChange,
  dataAdditionalDic,
}: {
  register: any;
  calcOnFieldChange: Function;
  dataAdditionalDic: any;
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
            <Select
              {...register("bcSupplyType")}
              className="h27"
              width={InputSize.i110}
              style={{ margin: "0px 3px" }}
            >
              {dataAdditionalDic?.bcSupplyType?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </td>
          <td>
            <Input
              register={register("bcOutkum")}
              onChange={(e: any) => {
                setBcOutkum(e.target.value);
                calcOnFieldChange(e.target.value, "bcOutkum");
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
                calcOnFieldChange(e.target.value, "bcDc");
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

export default CommonFooterInfo;
