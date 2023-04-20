import { Controller } from "react-hook-form";
import Table from "components/table";
import { Input, Select, Field } from "components/form/style";
import { InputSize } from "components/componentsType";
import { PersonInfoText } from "components/text";
import { InfoText } from "components/text";
import { currencyMask, formatMoney } from "helpers/currency";

import styled from "styled-components";

const CustomSpan = styled.span`
  width: 100%;
  display: inline-block;
  text-align: right;
`;

function TableData({
  tableData,
  register,
  control,
  buPsum,
  buBsum,
  buBlsum,
}: {
  tableData: any;
  register: Function;
  control: any;
  buPsum: number;
  buBsum: number;
  buBlsum: number;
}) {
  const data0 = [
    {
      1: <p>프로판</p>,
      2: (
        <Controller
          control={control}
          {...register("buPdanga")}
          render={({ field: { onChange, value, name } }) => (
            <Input
              value={value}
              onChange={onChange}
              mask={currencyMask}
              textAlign="right"
              fullWidth
              name={name}
            />
          )}
        />
      ),
      3: (
        <Controller
          control={control}
          {...register("buPcost")}
          render={({ field: { onChange, value, name } }) => (
            <Input
              value={value}
              onChange={onChange}
              mask={currencyMask}
              textAlign="right"
              fullWidth
              name={name}
            />
          )}
        />
      ),
      4: <CustomSpan> {formatMoney(buPsum)}</CustomSpan>,
    },
    {
      1: <p>부탄</p>,
      2: (
        <Controller
          control={control}
          {...register("buBdanga")}
          render={({ field: { onChange, value, name } }) => (
            <Input
              value={value}
              onChange={onChange}
              mask={currencyMask}
              textAlign="right"
              fullWidth
              name={name}
            />
          )}
        />
      ),

      3: (
        <Controller
          control={control}
          {...register("buBcost")}
          render={({ field: { onChange, value, name } }) => (
            <Input
              value={value}
              onChange={onChange}
              mask={currencyMask}
              textAlign="right"
              fullWidth
              name={name}
            />
          )}
        />
      ),
      4: <CustomSpan>{formatMoney(buBsum)}</CustomSpan>,
    },
    {
      1: <p>벌크</p>,
      2: (
        <Controller
          control={control}
          {...register("buBldanga")}
          render={({ field: { onChange, value, name } }) => (
            <Input
              value={value}
              onChange={onChange}
              mask={currencyMask}
              textAlign="right"
              fullWidth
              name={name}
            />
          )}
        />
      ),
      3: (
        <Controller
          control={control}
          {...register("buBlcost")}
          render={({ field: { onChange, value, name } }) => (
            <Input
              value={value}
              onChange={onChange}
              mask={currencyMask}
              textAlign="right"
              fullWidth
              name={name}
            />
          )}
        />
      ),
      4: <CustomSpan>{formatMoney(buBlsum)}</CustomSpan>,
    },
  ];

  const data1 = [
    {
      1: (
        <Select
          style={{ margin: "5px" }}
          width={InputSize.i100}
          register={register("buJpCode1")}
        >
          {tableData?.buJpCode1?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.jpCode}>
              {obj.jpName}
            </option>
          ))}
        </Select>
      ),
    },
    {
      2: (
        <Select
          style={{ margin: "5px" }}
          width={InputSize.i100}
          register={register("buJpCode2")}
        >
          {tableData?.buJpCode2?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.jpCode}>
              {obj.jpName}
            </option>
          ))}
        </Select>
      ),
    },
    {
      3: (
        <Select
          style={{ margin: "5px" }}
          width={InputSize.i100}
          register={register("buJpCode3")}
        >
          {tableData?.buJpCode3?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.jpCode}>
              {obj.jpName}
            </option>
          ))}
        </Select>
      ),
    },
    {
      4: (
        <Select
          style={{ margin: "5px" }}
          width={InputSize.i100}
          register={register("buJpCode4")}
        >
          {tableData?.buJpCode4?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.jpCode}>
              {obj.jpName}
            </option>
          ))}
        </Select>
      ),
    },
  ];
  return (
    <>
      <Field flex style={{ justifyContent: "space-between" }}>
        <Field flex>
          <Field>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <PersonInfoText
                text="LPG 매입 단가"
                style={{
                  marginBottom: "6px",
                  marginTop: "7px",
                }}
              />
              <InfoText style={{ marginTop: "3px" }} text="Vat 포함 가격" />
            </div>
            <Table
              className="table1"
              tableHeader={["구분", "kg 단가", "수송비", "합계"]}
              tableData={data0}
            />
          </Field>
          <Field style={{ marginLeft: "30px" }}>
            <PersonInfoText
              text="무료 충전 품목"
              style={{
                marginBottom: "6px",
                marginTop: "7px",
                marginLeft: "4px",
              }}
            />
            <Table
              className="table2"
              tableHeader={["품목"]}
              tableData={data1}
            />
          </Field>
        </Field>
      </Field>
    </>
  );
}

export default TableData;
