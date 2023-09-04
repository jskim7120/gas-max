import React, { MouseEventHandler } from "react";
import Table from "components/table";
import { Controller } from "react-hook-form";
import { Input, Select, FormGroup } from "components/form/style";
import { InputSize } from "components/componentsType";
import CustomDatePicker from "components/customDatePicker";
import { MagnifyingGlass } from "components/allSvgIcon";
import { currencyMask } from "helpers/currency";

function Table1({
  register,
  dictionary,
  control,
  isAddBtnClicked,
  openPopupCM1106,
}: {
  register: any;
  dictionary: any;
  control: any;
  isAddBtnClicked: boolean;
  openPopupCM1106: MouseEventHandler;
}) {
  const tableData1 = [
    {
      0: (
        <FormGroup>
          <Select register={register("tsSaleState")} width={InputSize.i100}>
            {dictionary?.saleState?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
      ),
      1: (
        <Controller
          control={control}
          name="tsDate"
          render={({ field }) => (
            <CustomDatePicker
              {...field}
              readOnly={!isAddBtnClicked}
              style={{ margin: "1px 0 0 0" }}
            />
          )}
        />
      ),
      2: (
        <FormGroup>
          <Select register={register("tsGubun")} width={InputSize.i100}>
            {dictionary?.gubun?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
      ),
      3: (
        <FormGroup style={{ position: "relative" }}>
          <Input
            register={register("tsJpCode")}
            inputSize={InputSize.i70}
            readOnly={!isAddBtnClicked}
          />
          <Controller
            control={control}
            name="tsJpName"
            render={({ field }) => (
              <Input {...field} readOnly={!isAddBtnClicked} />
            )}
          />

          <span
            style={{
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              background: "#686767",
              position: "absolute",
              right: "6px",
              bottom: "6px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: "3px",
            }}
            onClick={isAddBtnClicked ? openPopupCM1106 : undefined}
          >
            <MagnifyingGlass />
          </span>
        </FormGroup>
      ),
      4: (
        <FormGroup>
          <Select register={register("tsTonggubun")} width={InputSize.i100}>
            {dictionary?.gubun?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
      ),
      5: (
        <Controller
          control={control}
          name="tsQty"
          render={({ field }) => (
            <Input
              {...field}
              inputSize={InputSize.i100}
              textAlign="right"
              mask={currencyMask}
            />
          )}
        />
      ),
      6: (
        <FormGroup>
          <Select register={register("tsSwCode")} width={InputSize.i100}>
            {dictionary?.proxyType?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
      ),
      7: (
        <Controller
          control={control}
          name="tsBigo"
          render={({ field }) => (
            <Input
              {...field}
              inputSize={InputSize.i200}
              textAlign="right"
              mask={currencyMask}
            />
          )}
        />
      ),
      8: (
        <Controller
          control={control}
          name="signuser"
          render={({ field }) => (
            <Input
              {...field}
              inputSize={InputSize.i100}
              textAlign="right"
              mask={currencyMask}
            />
          )}
        />
      ),
    },
  ];

  return (
    <>
      <Table
        className="no-space"
        tableHeader={[
          "거래상태",
          "일자",
          "입출구분",
          "품 명",
          "실병/공병",
          "수량",
          "사원",
          "비고",
          "확인",
        ]}
        tableData={tableData1}
        style={{ marginBottom: "2px" }}
      />
    </>
  );
}

export default Table1;
