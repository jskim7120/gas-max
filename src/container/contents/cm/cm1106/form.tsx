import React, { useEffect, useImperativeHandle } from "react";
import { useForm, Controller } from "react-hook-form";
import { apiPost } from "app/axios";
import { CM1106INSERT, CM1106UPDATE, CM1106DELETE } from "app/path";
import {
  Input,
  FormGroup,
  Label,
  DividerGray,
  Select,
} from "components/form/style";
import { MagnifyingGlass } from "components/allSvgIcon";
import { SearchBtn } from "components/daum";
import { InputSize } from "components/componentsType";
import { currencyMask, removeCommas } from "helpers/currency";
import { ICM1106, emptyObj } from "./model";

const FORMCM1106 = React.forwardRef(
  (
    {
      selected,
      fetchData,
      dataCommonDic,
      areaCode,
      isAddBtnClicked,
    }: {
      selected: any;
      fetchData: Function;
      dataCommonDic: any;
      areaCode: string;
      isAddBtnClicked: boolean;
    },
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const { register, handleSubmit, reset, getValues, control } =
      useForm<ICM1106>();

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      resetForm,
      crud,
    }));

    useEffect(() => {
      resetForm("reset");
    }, [selected]);

    const resetForm = (type: string | null) => {
      if (type === "clear") {
        reset(emptyObj);
      }
      if (type === "reset") {
        if (selected && Object.keys(selected)?.length > 0) {
          reset(selected);
        }
      }
    };

    const crud = async (type: string | null) => {
      if (type === "delete") {
        const path = CM1106DELETE;
        const formValues = getValues();

        const res = await apiPost(path, formValues, "삭제했습니다");
        res && (await fetchData());
      }

      if (type === null) {
        handleSubmit(submit)();
      }
    };

    const submit = async (data: ICM1106) => {
      //form aldaagui uyd ajillana
      const path = isAddBtnClicked ? CM1106INSERT : CM1106UPDATE;
      const formValues = getValues();
      isAddBtnClicked && (formValues.areaCode = areaCode);

      formValues.jcJdcAmt = +removeCommas(formValues.jcJdcAmt, "string");
      formValues.jcJpDanga = +removeCommas(formValues.jcJpDanga, "number");

      const res = await apiPost(path, formValues, "저장이 성공하였습니다");
    };

    return (
      <form
        onSubmit={handleSubmit(submit)}
        autoComplete="off"
        style={{
          padding: "30px 30px 0 0",
          borderLeft: "1px solid #e6e5e5",
        }}
      >
        <FormGroup>
          <Input
            label="코 드"
            labelStyle={{ minWidth: "90px" }}
            register={register("jcJpCode")}
            inputSize={InputSize.i160}
          />
          <SearchBtn type="button" onClick={() => alert("dsdsds")}>
            <MagnifyingGlass />
          </SearchBtn>
        </FormGroup>
        <FormGroup>
          <Input
            label="품 명"
            labelStyle={{ minWidth: "90px" }}
            register={register("jcJpName")}
            inputSize={InputSize.i160}
          />
        </FormGroup>
        <FormGroup>
          <Input
            label="규 격"
            labelStyle={{ minWidth: "90px" }}
            register={register("jcJpSpec")}
            inputSize={InputSize.i160}
          />
        </FormGroup>
        <FormGroup>
          <Label style={{ minWidth: "90px" }}></Label>
          <p style={{ marginLeft: "5px" }}>환경단가 : 25,000 원 (Vat포함)</p>
        </FormGroup>
        <DividerGray />
        <FormGroup>
          <Label style={{ minWidth: "90px" }}>적용구분</Label>
          <Select register={register("jcDangaType")} width={InputSize.i160}>
            {dataCommonDic?.jcDangaType?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code1}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <Label style={{ minWidth: "90px" }}>Vat구분</Label>
          <Select register={register("jcVatKind")} width={InputSize.i160}>
            {dataCommonDic?.jcVatKind?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code1}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <Controller
            control={control}
            name="jcJdcAmt"
            render={({ field }) => (
              <Input
                {...field}
                label="할인액"
                labelStyle={{ minWidth: "90px" }}
                mask={currencyMask}
                textAlign="right"
                inputSize={InputSize.i160}
              />
            )}
          />
          <p>원</p>
        </FormGroup>
        <FormGroup>
          <Controller
            control={control}
            name="jcJdcPer"
            render={({ field }) => (
              <Input
                {...field}
                label="할인율"
                labelStyle={{ minWidth: "90px" }}
                mask={[/\d/, /\d/, /\d/]}
                textAlign="right"
                inputSize={InputSize.i160}
              />
            )}
          />
          <p>%</p>
        </FormGroup>
        <FormGroup>
          <Controller
            control={control}
            name="jcJpDanga"
            render={({ field }) => (
              <Input
                {...field}
                label="적용단가"
                labelStyle={{ minWidth: "90px" }}
                mask={currencyMask}
                textAlign="right"
                inputSize={InputSize.i160}
              />
            )}
          />
          <p>원</p>
        </FormGroup>
        <DividerGray />
        <FormGroup>
          <Input
            label="기초재고"
            labelStyle={{ minWidth: "90px" }}
            register={register("jcBasicJaego")}
            inputSize={InputSize.i160}
            textAlign="right"
          />
          <p>개</p>
        </FormGroup>
        <FormGroup>
          <Label style={{ minWidth: "90px" }}>사용상태</Label>
          <Select register={register("jcJpState")} width={InputSize.i160}>
            {dataCommonDic?.jcJpState?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code1}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
      </form>
    );
  }
);

export default FORMCM1106;
