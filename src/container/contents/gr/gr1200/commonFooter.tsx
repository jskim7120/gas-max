import { Input, FormGroup, Select } from "components/form/style";
import { CTitle, CTextArea, CLabel, TabLikeHeader, CTable } from "./style";
import { InputSize } from "components/componentsType";
import { Controller } from "react-hook-form";
import { currencyMask } from "helpers/currency";

function CommonFooterInfo({
  register,
  dataAdditionalDic,
  control,
}: {
  register: any;
  dataAdditionalDic: any;
  control: any;
}) {
  return (
    <form autoComplete="off">
      <div>
        <FormGroup style={{ justifyContent: "space-between" }}>
          <div style={{ display: "flex", width: "100%" }}>
            <CTitle>메모</CTitle>
            <CTextArea {...register("bcMemo")} />
          </div>
          <div>
            <FormGroup>
              <CLabel>공급액</CLabel>
              <Controller
                control={control}
                name="bcSupplyAmt"
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
            </FormGroup>
            <FormGroup>
              <CLabel>세액</CLabel>
              <Controller
                control={control}
                name="bcVatAmt"
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
            </FormGroup>
            <FormGroup>
              <CLabel>합계금액</CLabel>
              <Controller
                control={control}
                name="bcInkum"
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
            </FormGroup>
          </div>
        </FormGroup>

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
                name="bcInkum1"
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    value={!isNaN(value) ? value : ""}
                    onChange={onChange}
                    name={name}
                    mask={currencyMask}
                    textAlign="right"
                    className="disabled"
                  />
                )}
              />
            </td>
            <td>
              <Select
                register={register("bcSupplyType")}
                className="h27"
                width={InputSize.i110}
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
              <Controller
                control={control}
                name="bcOutkum"
                render={({ field }) => (
                  <Input
                    {...field}
                    mask={currencyMask}
                    textAlign="right"
                    className="h27"
                  />
                )}
              />
            </td>
            <td>
              <Controller
                control={control}
                name="bcDc"
                render={({ field }) => (
                  <Input
                    {...field}
                    mask={currencyMask}
                    textAlign="right"
                    className="h27"
                  />
                )}
              />
            </td>
            <td>
              <Controller
                control={control}
                name="bcMisu"
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
