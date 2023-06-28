import { useState } from "react";
import { Input, Field, Select } from "components/form/style";
import { CTitle, CTextArea, CLabel, TabLikeHeader, CTable } from "./style";
import { InputSize } from "components/componentsType";

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
    <form autoComplete="off">
      <div>
        <Field flex style={{ alignItems: "center" }}>
          <Field flex style={{ width: "80%" }}>
            <CTitle>메모</CTitle>
            <CTextArea {...register("bbMemo")} />
          </Field>

          <Field style={{ width: "22%" }}>
            <Field flex style={{ alignItems: "center" }}>
              <CLabel>공급액</CLabel>
              <Input
                register={register("bbSum")}
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
                register={register("bbVat")}
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
                register={register("bbTotal")}
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
            <th>지급 금액</th>
            <th>D/C</th>
            <th>미지급액</th>
            <th>비고</th>
          </tr>
          <tr>
            <td>
              <Input register={register("bbTotal")} readOnly className="h27" />
            </td>
            <td>
              <Select
                register={register("bbSupplyType")}
                className="h27"
                width={InputSize.i110}
                style={{ margin: "0px 3px" }}
              >
                <option value="A">외상</option>
                <option value="0">현금</option>
              </Select>
            </td>
            <td>
              <Input
                register={register("bbOutkum")}
                onChange={(e: any) => {
                  setBcOutkum(e.target.value);
                  calcTab1FooterChange(e.target.value, "bbOutkum");
                }}
                value={bcOutkum}
                className="h27"
              />
            </td>
            <td>
              <Input
                register={register("bbDc")}
                onChange={(e: any) => {
                  setBcDc(e.target.value);
                  calcTab1FooterChange(e.target.value, "bbDc");
                }}
                value={bcDc}
                className="h27"
              />
            </td>
            <td>
              <Input register={register("bbMisu")} className="h27" />
            </td>
            <td>
              <Input register={register("bbBigo")} className="h27" />
            </td>
          </tr>
        </CTable>
      </div>
    </form>
  );
}

export default FooterInfo;
