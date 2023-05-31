import React, { useEffect } from "react";
import Table from "components/table";
import { Input, Select, Field, FormGroup } from "components/form/style";
import { InputSize } from "components/componentsType";
import { Controller } from "react-hook-form";
import CustomDatePicker from "components/customDatePicker";
import { IAR110065DETAIL } from "../model";
import { useForm } from "react-hook-form";

function Tab1({ data, dictionary }: { data: any; dictionary: any }) {
  const { register, handleSubmit, reset, control } = useForm<IAR110065DETAIL>({
    mode: "onSubmit",
  });

  useEffect(() => {
    if (data) {
      reset({
        pjDate: data?.pjDate,
        pjJpCode: data?.pjJpCode,
        pjJpName: data?.pjJpName,
        pjQty: data?.pjQty,
        pjReqty: data?.pjReqty,
        pjJago: data?.pjJago,
        pjDanga: data?.pjDanga,
        pjVatDiv: data?.pjVatDiv,
        pjKumSup: data?.pjKumSup,
        pjKumVat: data?.pjKumVat,
        pjKumack: data?.pjKumack,
        saleState: data?.saleState,
        proxyType: data?.proxyType,
        buName: data?.buName,
        pjInkumtype: data?.pjInkumtype,
        pjInkum: data?.pjInkum,
        pjDc: data?.pjDc,
        pjMisukum: data?.pjMisukum,
        pjSwCode: data?.pjSwCode,
        pjBigo: data?.pjBigo,
        signuser: data?.signuser,
        signkey: data?.signkey,
      });
    }
  }, [data]);

  const data1 = [
    {
      1: (
        <Controller
          control={control}
          {...register("pjDate")}
          render={({ field: { onChange, value, name } }) => (
            <CustomDatePicker value={value} onChange={onChange} name={name} />
          )}
        />
      ),
      2: (
        <FormGroup>
          <Input register={register("pjJpCode")} />
          <Input register={register("pjJpName")} />
        </FormGroup>
      ),
      3: (
        <Input
          register={
            data.jpKind === null ? register("pjQty") : register("qtyKg")
          }
        />
      ),
      4: (
        <Input
          register={
            data.jpKind === null ? register("pjReqty") : register("qtyL")
          }
        />
      ),
      5: (
        <Input
          register={
            data.jpKind === null ? register("pjJago") : register("jpSpecific")
          }
        />
      ),
      6: <Input register={register("pjDanga")} />,
      7: (
        <Select register={register("pjVatDiv")} width={InputSize.i100}>
          {dictionary?.pjVatDiv?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>
      ),
      8: <Input register={register("pjKumSup")} />,
      9: <Input register={register("pjKumVat")} />,
      10: <Input register={register("pjKumack")} />,
    },
  ];

  const data2 = [
    {
      1: (
        <Select register={register("saleState")} width={InputSize.i100}>
          {dictionary?.saleType?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>
      ),
      2: (
        <Select register={register("proxyType")} width={InputSize.i100}>
          {dictionary?.proxyType?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>
      ),
      3: <Input register={register("buName")} />,
      4: (
        <Select register={register("pjInkumtype")} width={InputSize.i100}>
          {dictionary?.pjInkumtype?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>
      ),
      5: <Input register={register("pjInkum")} />,
      6: <Input register={register("pjDc")} />,
      7: <Input register={register("pjMisukum")} />,
      8: (
        <Select register={register("pjSwCode")} width={InputSize.i100}>
          {dictionary?.pjSwCode?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>
      ),
      9: <Input register={register("pjBigo")} />,
      10: (
        <>
          <Input register={register("signuser")} />
          <Input register={register("signkey")} />
        </>
      ),
    },
  ];
  return (
    <div>
      <Table
        className="no-space"
        tableHeader={[
          "판매일자",
          "품  명",
          data.jpKind === null ? "판매수량" : "매출량(kg)",
          data.jpKind === null ? "공병회수" : "매출량(ℓ)",
          data.jpKind === null ? "재고" : "비중(kg/ℓ)",
          "단가",
          "VAT",
          "공급가액",
          "세액",
          "합계금액",
        ]}
        tableData={data1}
        onClick={(item) => console.log("table", item)}
        style={{ marginBottom: "5px" }}
      />
      <Table
        tableHeader={[
          "거래상태",
          "대납구분",
          "매입처명",
          "입금방법",
          "입금액",
          "D/C",
          "미입금액",
          "사원",
          "비고",
          "확인자 서명",
        ]}
        tableData={data2}
        onClick={(item) => console.log("table", item)}
      />
    </div>
  );
}

export default Tab1;
