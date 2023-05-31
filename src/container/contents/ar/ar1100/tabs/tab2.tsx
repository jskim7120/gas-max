import React, { useState } from "react";
import Table from "components/table";
import { Input, Select, FormGroup } from "components/form/style";
import { Controller } from "react-hook-form";
import CustomDatePicker from "components/customDatePicker";
import { IAR110065DETAIL } from "../model";
import { useForm } from "react-hook-form";
import Button from "components/button/button";
import { ButtonColor, ButtonType, InputSize } from "components/componentsType";
import { Reset, MagnifyingGlass } from "components/allSvgIcon";
import Loader from "components/loader";

function Tab2({ data, dictionary }: { data: any; dictionary: any }) {
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit, reset, control } = useForm<IAR110065DETAIL>({
    mode: "onSubmit",
  });

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
      2: <Input register={register("pjJpCode")} />,
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
      4: <Input register={register("buName")} />,
      5: (
        <Select register={register("saleState")} width={InputSize.i100}>
          {dictionary?.saleType?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>
      ),
      6: <Input register={register("pjDc")} />,
      7: <Input register={register("pjMisukum")} />,
    },
  ];
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "start" }}>
        <Table
          className="no-space"
          tableHeader={["판매 일자", "품명", "공급가액", "세액", "합계금액"]}
          tableData={data1}
          onClick={(item) => console.log("table", item)}
          style={{ marginBottom: "2px" }}
        />
        <Button
          text="검색"
          icon={!loading && <MagnifyingGlass />}
          color={ButtonColor.DANGER}
          type="submit"
          loader={
            loading && (
              <>
                <Loader
                  color="white"
                  size={13}
                  borderWidth="2px"
                  style={{ marginRight: "10px" }}
                />
              </>
            )
          }
        />
      </div>
      <Table
        className="no-space"
        tableHeader={[
          "거래 상태",
          "입금 방법",
          "입금액",
          "D/C",
          "미입금액",
          "사원",
          "비고",
        ]}
        tableData={data2}
        onClick={(item) => console.log("table", item)}
      />
    </div>
  );
}

export default Tab2;
