import React, { useState, useEffect, useImperativeHandle } from "react";
import {
  Input,
  FormGroup,
  Label,
  DividerGray,
  Field,
  Select,
} from "components/form/style";
import { MagnifyingGlass } from "components/allSvgIcon";
import { SearchBtn } from "components/daum";
import { useForm, Controller } from "react-hook-form";
import { FieldKind, InputSize } from "components/componentsType";
import Button from "components/button/button";
import { ICM1106 } from "./model";
import { CM1106INSERT, CM1106UPDATE, CM1106DELETE } from "app/path";
import { currencyMask } from "helpers/currency";
import { toast } from "react-toastify";
import API from "app/axios";
import { formatCurrencyRemoveComma } from "helpers/currency";
import { emptyObj } from "./model";

const FORMCM1106 = React.forwardRef(
  (
    {
      selected,
      fetchData,
      setData,
      selectedRowIndex,
      setSelectedRowIndex,
      setSelected,
      dataCommonDic,
      areaCode,
      isAddBtnClicked,
      setIsAddBtnClicked,
    }: {
      selected: any;
      fetchData: Function;
      setData: Function;
      selectedRowIndex: any;
      setSelectedRowIndex: Function;
      setSelected: Function;
      dataCommonDic: any;
      areaCode: string;
      isAddBtnClicked: boolean;
      setIsAddBtnClicked: Function;
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
      if (type === "reset" && selected && Object.keys(selected)?.length > 0) {
        reset(selected);
      }
    };

    const crud = async (type: string | null) => {
      if (type === "delete") {
        const path = CM1106DELETE;
        const formValues = getValues();

        try {
          const response: any = await API.post(path, formValues);
          if (response.status === 200) {
            toast.success("삭제했습니다", {
              autoClose: 500,
            });
            await fetchData();
          } else {
            toast.error(response?.response?.message);
          }
        } catch (err) {
          toast.error("Couldn't delete");
        }
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

      formValues.jcJdcAmt = formatCurrencyRemoveComma(formValues.jcJdcAmt);
      formValues.jcJpDanga = formatCurrencyRemoveComma(formValues.jcJpDanga);

      try {
        const response: any = await API.post(path, formValues);
        if (response.status === 200) {
          if (isAddBtnClicked) {
            setData((prev: any) => [formValues, ...prev]);
            setSelectedRowIndex(0);
            setIsAddBtnClicked(true);
            setIsAddBtnClicked(false);
          } else {
            setData((prev: any) => {
              prev[selectedRowIndex] = formValues;
              return [...prev];
            });
          }
          // setSelected(formValues);
          setIsAddBtnClicked(false);

          toast.success("저장이 성공하였습니다", {
            autoClose: 500,
          });
        } else {
          toast.error(response?.response?.data?.message, {
            autoClose: 500,
          });
        }
      } catch (err: any) {
        toast.error(err?.message, {
          autoClose: 500,
        });
      }
    };

    return (
      <form
        onSubmit={handleSubmit(submit)} autoComplete="off"
        style={{ width: "25%", margin: "30px 30px 0 0" }}
      >
        <Field flex style={{ alignItems: "center" }}>
          <Input
            label="코 드"
            register={register("jcJpCode")}
            inputSize={InputSize.i130}
            kind={FieldKind.BORDER}
          />
          <SearchBtn type="button" onClick={() => alert("dsdsds")}>
            <MagnifyingGlass />
          </SearchBtn>
        </Field>
        <Field>
          <Input
            label="품 명"
            register={register("jcJpName")}
            kind={FieldKind.BORDER}
            inputSize={InputSize.i130}
          />
        </Field>
        <Field>
          <Input
            label="규 격"
            register={register("jcJpSpec")}
            kind={FieldKind.BORDER}
            inputSize={InputSize.i130}
          />
        </Field>
        <Field>
          <FormGroup>
            <Label></Label>
            <p style={{ marginLeft: "5px" }}>환경단가 : 25,000 원 (Vat포함)</p>
          </FormGroup>
        </Field>
        <DividerGray />

        <FormGroup>
          <Label>적용구분</Label>
          <Select
            register={register("jcDangaType")}
            kind={FieldKind.BORDER}
            width={InputSize.i130}
          >
            {dataCommonDic?.jcDangaType?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code1}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Vat구분</Label>
          <Select
            register={register("jcVatKind")}
            kind={FieldKind.BORDER}
            width={InputSize.i130}
          >
            {dataCommonDic?.jcVatKind?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code1}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>

        <Field flex>
          <Controller
            control={control}
            {...register("jcJdcAmt")}
            render={({ field: { onChange, value, name } }) => (
              <Input
                label="할인액"
                value={value}
                onChange={onChange}
                mask={currencyMask}
                textAlign="right"
                inputSize={InputSize.i130}
                name={name}
              />
            )}
          />
          <p>원</p>
        </Field>
        <Field flex>
          <Controller
            control={control}
            {...register("jcJdcPer")}
            render={({ field: { onChange, value, name } }) => (
              <Input
                label="할인율"
                value={value}
                onChange={onChange}
                mask={[/\d/, /\d/, /\d/]}
                textAlign="right"
                name={name}
                inputSize={InputSize.i130}
              />
            )}
          />

          <p>%</p>
        </Field>
        <Field flex>
          <Controller
            control={control}
            {...register("jcJpDanga")}
            render={({ field: { onChange, value, name } }) => (
              <Input
                label="적용단가"
                value={value}
                onChange={onChange}
                mask={currencyMask}
                textAlign="right"
                inputSize={InputSize.i130}
                name={name}
              />
            )}
          />
          <p>원</p>
        </Field>
        <DividerGray />
        <Field flex>
          <Input
            label="기초재고"
            register={register("jcBasicJaego")}
            kind={FieldKind.BORDER}
            inputSize={InputSize.i130}
            textAlign="right"
          />
          <p>개</p>
        </Field>
        <FormGroup>
          <Label>사용상태</Label>
          <Select
            register={register("jcJpState")}
            kind={FieldKind.BORDER}
            width={InputSize.i130}
          >
            {dataCommonDic?.jcJpState?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code1}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>

        <Field flex style={{ justifyContent: "center", marginTop: "20px" }}>
          {/* <Button
            text="선택"
            icon={<SmallWhiteTick />}
            style={{
              background: "#5284CE",
              marginRight: "20px",
              border: "1px solid #5284CE",
              borderRadius: "999px",
              height: "28px",
              minWidth: "60px",
              padding: "0 15px",
            }}
            type="button"
            withoutLine
          />
          <Button
            text="취소"
            icon={<SmallWhiteClose />}
            style={{
              background: "#707070",
              marginRight: "5px",
              border: "1px solid #707070",
              borderRadius: "999px",
              height: "28px",
              minWidth: "60px",
              padding: "0 15px",
              fontSize: "14px",
            }}
            type="button"
            withoutLine
          /> */}
        </Field>
      </form>
    );
  }
);

export default FORMCM1106;
