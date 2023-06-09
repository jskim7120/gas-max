import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useDispatch } from "app/store";
import { addCM1106, openModal } from "app/state/modal/modalSlice";
import Table from "components/table";
import { Input, Select, FormGroup } from "components/form/style";
import CustomDatePicker from "components/customDatePicker";
import Button from "components/button/button";
import { ButtonColor, ButtonType, InputSize } from "components/componentsType";
import { Reset, MagnifyingGlass, Update } from "components/allSvgIcon";
import { IAR110065DETAIL } from "../model";

function Tab1({ data, dictionary }: { data: any; dictionary: any }) {
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit, reset, control } = useForm<IAR110065DETAIL>({
    mode: "onSubmit",
  });

  const dispatch = useDispatch();
  const cm1106 = useSelector((state: any) => state.modal.cm1106);

  useEffect(() => {
    if (cm1106.source === "AR1100" && cm1106.jpCode && cm1106.jpName) {
      resetForm("jpName");
    }
  }, [cm1106.jpCode, cm1106.jpName]);
  useEffect(() => {
    if (data && Object.keys(data)?.length > 0) {
      resetForm("reset");
    }
  }, [data]);

  const resetForm = (type: string) => {
    if ((type = "reset")) {
      reset({
        pjDate: data?.pjDate,
        pjJpCode: data?.pjJpCode,
        pjJpName: data?.pjJpName,
        pjQty: data?.pjQty,
        pjReqty: data?.pjReqty,
        pjDanga: data?.pjDanga,
        pjVatDiv: data?.pjVatDiv,
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
      });
    }
    if ((type = "jpName")) {
      reset((formValues) => ({
        ...formValues,
        pjJpName: cm1106.jpName,
        pjJpCode: cm1106.jpCode,
      }));
    }
  };
  const openPopupCM1106 = async () => {
    dispatch(openModal({ type: "cm1106Modal" }));
  };

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
        <FormGroup style={{ position: "relative" }}>
          <Input register={register("pjJpCode")} inputSize={InputSize.i70} />
          <Input register={register("pjJpName")} />
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
            onClick={openPopupCM1106}
          >
            <MagnifyingGlass />
          </span>
        </FormGroup>
      ),
      3: <Input register={register("pjQty")} inputSize={InputSize.i100} />,
      4: <Input register={register("pjReqty")} inputSize={InputSize.i100} />,
      5: <Input register={register("pjJago")} inputSize={InputSize.i100} />,
      6: <Input register={register("pjDanga")} inputSize={InputSize.i100} />,
      7: (
        <Select register={register("pjVatDiv")} width={InputSize.i100}>
          {dictionary?.pjVatDiv?.map((obj: any, idx: number) => (
            <option key={idx} value={obj.code}>
              {obj.codeName}
            </option>
          ))}
        </Select>
      ),
      8: <Input register={register("pjKumSup")} inputSize={InputSize.i100} />,
      9: <Input register={register("pjKumVat")} inputSize={InputSize.i100} />,
      10: <Input register={register("pjKumack")} inputSize={InputSize.i100} />,
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
    <div style={{ display: "flex", gap: "15px" }}>
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
          style={{ marginBottom: "2px" }}
        />
        <Table
          className="no-space"
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
      <div>
        <Button
          text="저장"
          icon={<Update />}
          color={ButtonColor.SECONDARY}
          onClick={() => {}}
        />

        <Button
          text="취소"
          icon={<Reset />}
          type="button"

          // onClick={handleReset}
        />
      </div>
    </div>
  );
}

export default Tab1;
