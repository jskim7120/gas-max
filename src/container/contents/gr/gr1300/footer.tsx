import { Controller } from "react-hook-form";
import { Input, Select, FormGroup } from "components/form/style";
import { InputSize } from "components/componentsType";
import { currencyMask } from "helpers/currency";
import {
  CTitle,
  CTextArea,
  CLabel,
  TabLikeHeader,
  CTable,
} from "../gr1200/style";

function FooterInfo({
  register,
  control,
  bbSupplyType,
}: {
  register: any;
  control: any;
  bbSupplyType: any;
}) {
  return (
    <form autoComplete="off">
      <div>
        <FormGroup style={{ justifyContent: "space-between" }}>
          <div style={{ display: "flex", width: "100%" }}>
            <CTitle>메모</CTitle>
            <CTextArea {...register("bbMemo")} />
          </div>
          <div>
            <FormGroup>
              <CLabel>공급액</CLabel>
              <Controller
                control={control}
                name="bbSum"
                render={({ field }) => (
                  <Input
                    {...field}
                    mask={currencyMask}
                    textAlign="right"
                    className="gray"
                  />
                )}
              />
            </FormGroup>
            <FormGroup>
              <CLabel>세액</CLabel>
              <Controller
                control={control}
                name="bbVat"
                render={({ field }) => (
                  <Input
                    {...field}
                    mask={currencyMask}
                    textAlign="right"
                    className="gray"
                  />
                )}
              />
            </FormGroup>
            <FormGroup>
              <CLabel>합계금액</CLabel>
              <Controller
                control={control}
                name="bbTotal"
                render={({ field }) => (
                  <Input
                    {...field}
                    mask={currencyMask}
                    textAlign="right"
                    className="gray"
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
            <th>지급 금액</th>
            <th>D/C</th>
            <th>미지급액</th>
            <th>비고</th>
          </tr>
          <tr>
            <td>
              <Controller
                control={control}
                name="bbTotal"
                render={({ field }) => (
                  <Input
                    {...field}
                    mask={currencyMask}
                    textAlign="right"
                    className="h27 disabled"
                  />
                )}
              />
            </td>
            <td>
              <Select
                register={register("bbSupplyType")}
                className="h27"
                width={InputSize.i110}
              >
                {bbSupplyType?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </td>
            <td>
              <Controller
                control={control}
                name="bbOutkum"
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
                name="bbDc"
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
                name="bbMisu"
                render={({ field }) => (
                  <Input
                    {...field}
                    mask={currencyMask}
                    textAlign="right"
                    className="h27 disabled"
                  />
                )}
              />
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
