import { useState } from "react";
import { TabLikeHeader, CTable2 } from "../style";
import { Input } from "components/form/style";
import { Controller } from "react-hook-form";
import { currencyMask } from "helpers/currency";

function Tab1Footer({
  register,
  control,
  calcOnFieldChange,
  bcPjan,
  setBcPjan,
  bcBjan,
  setBcBjan,
  bcPdanga,
  setBcPdanga,
  bcBdanga,
  setBcBdanga,
  bcPcost,
  setBcPcost,
  bcBcost,
  setBcBcost,
  bcGcost,
  setBcGcost,
}: {
  register: Function;
  control: any;
  calcOnFieldChange: Function;
  bcPjan: any;
  setBcPjan: Function;
  bcBjan: any;
  setBcBjan: Function;
  bcPdanga: any;
  setBcPdanga: Function;
  bcBdanga: any;
  setBcBdanga: Function;
  bcPcost: any;
  setBcPcost: Function;
  bcBcost: any;
  setBcBcost: Function;
  bcGcost: any;
  setBcGcost: Function;
}) {
  return (
    <div>
      <TabLikeHeader>매입량</TabLikeHeader>
      <CTable2>
        <thead>
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
        </thead>
        <tbody>
          <tr>
            <th className="light-gray ">프로판</th>
            <td>
              <Controller
                control={control}
                name="bcPin"
                render={({ field }) => (
                  <Input
                    {...field}
                    className="disabled"
                    mask={currencyMask}
                    textAlign="right"
                    readOnly
                  />
                )}
              />
            </td>
            <td>
              <Input
                value={bcPjan}
                onChange={(e: any) => {
                  setBcPjan(e.target.value);
                  calcOnFieldChange("bcPjan", e.target.value);
                }}
                textAlign="right"
                mask={currencyMask}
                className="h27"
              />
            </td>
            <td>
              <Controller
                control={control}
                name="bcSumP"
                render={({ field }) => (
                  <Input
                    {...field}
                    className="disabled"
                    textAlign="right"
                    mask={currencyMask}
                    readOnly
                  />
                )}
              />
            </td>
            <td>
              <Input
                value={bcPdanga}
                onChange={(e: any) => {
                  setBcPdanga(e.target.value);
                  calcOnFieldChange("bcPdanga", e.target.value);
                }}
                mask={currencyMask}
                textAlign="right"
                className="h27"
              />
            </td>
            <td>
              <Controller
                control={control}
                name="bcPkum"
                render={({ field }) => (
                  <Input
                    {...field}
                    mask={currencyMask}
                    textAlign="right"
                    className="disabled"
                    readOnly
                  />
                )}
              />
            </td>
            <td>
              <Input
                value={bcPcost}
                onChange={(e: any) => {
                  setBcPcost(e.target.value);
                  calcOnFieldChange("bcPcost", e.target.value);
                }}
                mask={currencyMask}
                textAlign="right"
                className="h27"
              />
            </td>
            <td>
              <Controller
                control={control}
                name="bcPsum"
                render={({ field }) => (
                  <Input
                    {...field}
                    mask={currencyMask}
                    textAlign="right"
                    className="disabled"
                    readOnly
                  />
                )}
              />
            </td>
          </tr>
          <tr>
            <th className="light-gray ">부탄</th>
            <td>
              <Controller
                control={control}
                name="bcBin"
                render={({ field }) => (
                  <Input
                    {...field}
                    mask={currencyMask}
                    textAlign="right"
                    className="disabled"
                    readOnly
                  />
                )}
              />
            </td>
            <td>
              <Input
                value={bcBjan}
                onChange={(e: any) => {
                  setBcBjan(e.target.value);
                  calcOnFieldChange("bcBjan", e.target.value);
                }}
                mask={currencyMask}
                textAlign="right"
                className="h27"
              />
            </td>
            <td>
              <Controller
                control={control}
                name="bcSumB"
                render={({ field }) => (
                  <Input
                    {...field}
                    mask={currencyMask}
                    textAlign="right"
                    className="disabled"
                    readOnly
                  />
                )}
              />
            </td>
            <td>
              <Input
                value={bcBdanga}
                onChange={(e: any) => {
                  setBcBdanga(e.target.value);
                  calcOnFieldChange("bcBdanga", e.target.value);
                }}
                mask={currencyMask}
                textAlign="right"
                className="h27"
              />
            </td>
            <td>
              <Controller
                control={control}
                name="bcBkum"
                render={({ field }) => (
                  <Input
                    {...field}
                    mask={currencyMask}
                    className="disabled"
                    textAlign="right"
                    readOnly
                  />
                )}
              />
            </td>
            <td>
              <Input
                value={bcBcost}
                onChange={(e: any) => {
                  setBcBcost(e.target.value);
                  calcOnFieldChange("bcBcost", e.target.value);
                }}
                mask={currencyMask}
                textAlign="right"
                className="h27"
              />
            </td>
            <td>
              <Controller
                control={control}
                name="bcBsum"
                render={({ field }) => (
                  <Input
                    {...field}
                    mask={currencyMask}
                    textAlign="right"
                    className="disabled"
                    readOnly
                  />
                )}
              />
            </td>
          </tr>
          <tr>
            <th className="light-gray">기타</th>
            <td>
              <Controller
                control={control}
                name="bcGin"
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
            <td></td>
            <td></td>
            <td></td>
            <td>
              <Controller
                control={control}
                name="bcGkum"
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
              <Input
                value={bcGcost}
                onChange={(e: any) => {
                  setBcGcost(e.target.value);
                  calcOnFieldChange("bcGcost", e.target.value);
                }}
                mask={currencyMask}
                textAlign="right"
                className="h27"
              />
            </td>
            <td>
              <Controller
                control={control}
                name="bcGsum"
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
          </tr>
          <tr>
            <th>합계</th>
            <td>
              <Controller
                control={control}
                name="bcTotal"
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
              <Controller
                control={control}
                name="bcJTotal"
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
              <Controller
                control={control}
                name="bcSumTotal"
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
            <td></td>
            <td>
              <Controller
                control={control}
                name="bcSumKum"
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
              <Controller
                control={control}
                name="bcSumCost"
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
              <Controller
                control={control}
                name="bcSum"
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
          </tr>
        </tbody>
      </CTable2>
    </div>
  );
}

export default Tab1Footer;
