import { useState } from "react";
import { Input, Field, Select } from "components/form/style";
import { CTitle, CTextArea, CLabel, TabLikeHeader, CTable } from "./style";
import { InputSize } from "components/componentsType";
import { Controller } from "react-hook-form";
import { currencyMask } from "helpers/currency";

function CommonFooterInfo({
  register,
  calcOnFieldChange,
  dataAdditionalDic,
  control,
  bcOutkum,
  bcDc,
  // bcSupplyType,
  setBcOutkum,
  setBcDc,
}: // setBcSupplyType,
{
  register: any;
  calcOnFieldChange: Function;
  dataAdditionalDic: any;
  control: any;
  bcOutkum: any;
  bcDc: any;
  // bcSupplyType: any;
  setBcOutkum: Function;
  setBcDc: Function;
  // setBcSupplyType: Function;
}) {
  return (
    <form autoComplete="off">
      <div>
        <Field flex style={{ alignItems: "center" }}>
          <Field flex style={{ width: "80%" }}>
            <CTitle>메모</CTitle>
            <CTextArea {...register("bcMemo")} />
          </Field>

          <Field style={{ width: "22%" }}>
            <Field flex style={{ alignItems: "center" }}>
              <CLabel>공급액</CLabel>
              <Controller
                control={control}
                {...register("bcSupplyAmt")}
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    value={!isNaN(value) ? value : ""}
                    onChange={onChange}
                    name={name}
                    mask={currencyMask}
                    textAlign="right"
                    className="gray"
                    readOnly
                  />
                )}
              />
            </Field>
            <Field flex style={{ alignItems: "center" }}>
              <CLabel>세액</CLabel>
              <Controller
                control={control}
                {...register("bcVatAmt")}
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    value={!isNaN(value) ? value : ""}
                    onChange={onChange}
                    name={name}
                    mask={currencyMask}
                    textAlign="right"
                    className="gray"
                    readOnly
                  />
                )}
              />
            </Field>
            <Field flex style={{ alignItems: "center" }}>
              <CLabel>합계금액</CLabel>
              <Controller
                control={control}
                {...register("bcInkum")}
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    value={!isNaN(value) ? value : ""}
                    onChange={onChange}
                    name={name}
                    mask={currencyMask}
                    textAlign="right"
                    className="gray"
                    readOnly
                  />
                )}
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
              <Controller
                control={control}
                {...register("bcInkum1")}
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    value={!isNaN(value) ? value : ""}
                    onChange={onChange}
                    name={name}
                    mask={currencyMask}
                    textAlign="right"
                    className="disabled"
                    readOnly
                  />
                )}
              />
            </td>
            <td>
              <Select
                register={register("bcSupplyType")}
                className="h27"
                width={InputSize.i110}
                style={{ margin: "0px 3px" }}
              >
                {dataAdditionalDic?.bcSupplyType?.map(
                  (obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  )
                )}
              </Select>
            </td>
            <td>
              <Input
                value={bcOutkum}
                onChange={(e: any) => {
                  setBcOutkum(e.target.value);
                  calcOnFieldChange("bcOutkum", e.target.value);
                }}
                mask={currencyMask}
                textAlign="right"
                className="h27"
              />
            </td>
            <td>
              <Input
                value={bcDc}
                onChange={(e: any) => {
                  setBcDc(e.target.value);
                  calcOnFieldChange("bcDc", e.target.value);
                }}
                mask={currencyMask}
                textAlign="right"
                className="h27"
              />
            </td>
            <td>
              <Controller
                control={control}
                {...register("bcMisu")}
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    value={!isNaN(value) ? value : ""}
                    onChange={onChange}
                    name={name}
                    mask={currencyMask}
                    textAlign="right"
                    className="disabled"
                    readOnly
                  />
                )}
              />
            </td>
            <td>
              <Input register={register("bcBigo")} className="h27" />
            </td>
          </tr>
        </CTable>
      </div>
    </form>
  );
}

export default CommonFooterInfo;
