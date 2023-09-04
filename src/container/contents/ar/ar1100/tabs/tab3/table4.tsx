import React, { MouseEventHandler } from "react";
import Table from "components/table";
import { Controller } from "react-hook-form";
import { Input, Select, FormGroup } from "components/form/style";
import { InputSize } from "components/componentsType";
import CustomDatePicker from "components/customDatePicker";
import { MagnifyingGlass } from "components/allSvgIcon";
import { currencyMask } from "helpers/currency";

function Table4({
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
            {dictionary?.tsSaleState?.map((obj: any, idx: number) => (
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
            {dictionary?.tsGubun?.map((obj: any, idx: number) => (
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
            {dictionary?.tsTonggubun?.map((obj: any, idx: number) => (
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
        <Controller
          control={control}
          name="tsKumack"
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

  const tableData2 = [
    {
      0: (
        <FormGroup>
          <Select register={register("tsInkumtype")} width={InputSize.i100}>
            {dictionary?.tsInkumtype?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
      ),
      1: (
        <FormGroup>
          <Select register={register("tsAbcCode")} width={InputSize.i150}>
            {dictionary?.tsAbcCode?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
      ),
      2: (
        <Controller
          control={control}
          name="tsInkum"
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
      3: (
        <Controller
          control={control}
          name="tsDc"
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
      4: (
        <Controller
          control={control}
          name="tsMisu"
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
      5: (
        <FormGroup>
          <Select register={register("tsSwCode")} width={InputSize.i100}>
            {dictionary?.tsSwCode?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
      ),
      6: (
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
      7: (
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
          "반환 보증금",
        ]}
        tableData={tableData1}
        style={{ marginBottom: "2px" }}
      />
      <Table
        className="no-space"
        tableHeader={[
          "지급방법",
          "입/출금 계좌",
          "지급액",
          "D/C",
          "미지급액",
          "사원",
          "비고",
          "확인",
        ]}
        tableData={tableData2}
      />
    </>
  );
}

export default Table4;
