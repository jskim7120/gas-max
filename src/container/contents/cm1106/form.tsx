import React, { useEffect, forwardRef, useImperativeHandle } from "react";
import {
  Input,
  Wrapper,
  FormGroup,
  Label,
  Divider,
  DividerGray,
  Field,
  Select,
  ErrorText,
} from "components/form/style";

import { ICM1106 } from "./model";
import {
  MagnifyingGlass,
  SmallWhiteClose,
  SmallWhiteTick,
} from "components/allSvgIcon";
import { SearchBtn } from "components/daum";
import { useForm } from "react-hook-form";
import { FieldKind, InputSize } from "components/componentsType";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import Button from "components/button/button";

const FORMCM1106 = React.forwardRef(
  (
    { selected }: { selected: any },
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const { data: dataCommonDic } = useGetCommonDictionaryQuery({
      groupId: "CM",
      functionName: "CM1106",
    });

    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
      getValues,
    } = useForm<ICM1106>();

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      // crud,
      // resetForm,
      // setIsAddBtnClicked,
      submit,
      bla,
    }));

    useEffect(() => {
      if (selected !== undefined) {
        reset({
          jcCuCode: selected?.jcCuCode,
          jcCuName: selected?.jcCuName,
          jcJpSpec: selected?.jcJpSpec,
          jcDangaType: selected?.jcDangaType,
          jcVatKind: selected?.jcVatKind,
          jcJdcAmt: selected?.jcJdcAmt,
          jcJdcPer: selected?.jcJdcPer,
          jcJpDanga: selected?.jcJpDanga,
          jcBasicJaego: selected?.jcBasicJaego,
        });
      }
    }, [selected]);

    const submit = () => {};
    const bla = () => {
      console.log("sddscdsdc");
    };
    return (
      <form
        onSubmit={handleSubmit(submit)}
        style={{ width: "25%", margin: "30px 30px 0 0" }}
      >
        <Field flex style={{ alignItems: "center" }}>
          <Input
            label="코드"
            register={register("jcCuCode")}
            errors={errors["jcCuCode"]?.message}
            inputSize={InputSize.sm}
            kind={FieldKind.BORDER}
          />
          <SearchBtn type="button" onClick={() => alert("dsdsds")}>
            <MagnifyingGlass />
          </SearchBtn>
        </Field>
        <Field>
          <Input
            label="품명"
            register={register("jcCuName")}
            errors={errors["jcCuName"]?.message}
            kind={FieldKind.BORDER}
          />
        </Field>
        <Field>
          <Input
            label="규격"
            register={register("jcJpSpec")}
            errors={errors["jcJpSpec"]?.message}
            kind={FieldKind.BORDER}
          />
        </Field>
        <Field>
          <FormGroup>
            <Label></Label>
            <p style={{ marginLeft: "5px" }}>환경단가 : 25,000 원 (Vat포함)</p>
          </FormGroup>
        </Field>
        <DividerGray />
        <Field>
          <FormGroup>
            <Label>적용구분</Label>
            <Select
              {...register("jcDangaType")}
              kind={FieldKind.BORDER}
              style={{ width: "100%" }}
            >
              {dataCommonDic?.jcDangaType?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code1}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
          <div>
            <ErrorText>{errors["jcDangaType"]?.message}</ErrorText>
          </div>
        </Field>
        <Field>
          <FormGroup>
            <Label>Vat구분</Label>
            <Select
              {...register("jcVatKind")}
              kind={FieldKind.BORDER}
              style={{ width: "100%" }}
            >
              {dataCommonDic?.jcVatKind?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code1}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
          <div>
            <ErrorText>{errors["jcVatKind"]?.message}</ErrorText>
          </div>
        </Field>
        <Field flex>
          <Input
            label="할인액"
            register={register("jcJdcAmt")}
            errors={errors["jcJdcAmt"]?.message}
            kind={FieldKind.BORDER}
          />
          <p>원</p>
        </Field>
        <Field flex>
          <Input
            label="할인율"
            register={register("jcJdcPer")}
            errors={errors["jcJdcPer"]?.message}
            kind={FieldKind.BORDER}
          />
          <p>%</p>
        </Field>
        <Field flex>
          <Input
            label="적용단가"
            register={register("jcJpDanga")}
            errors={errors["jcJpDanga"]?.message}
            kind={FieldKind.BORDER}
          />
          <p>원</p>
        </Field>
        <DividerGray />
        <Field flex>
          <Input
            label="기초재고"
            register={register("jcBasicJaego")}
            errors={errors["jcBasicJaego"]?.message}
            kind={FieldKind.BORDER}
            inputSize={InputSize.sm}
          />
          <p>개</p>
        </Field>
        {/* <Field>
          <FormGroup>
            <Label>사용상태</Label>
            <Select
              {...register("jcVatKind")}
              kind={FieldKind.BORDER}
              style={{ width: "100%" }}
            >
              {dataCommonDic?.jcVatKind?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code1}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
          <div>
            <ErrorText>{errors["jcVatKind"]?.message}</ErrorText>
          </div>
        </Field> */}
        <Field flex style={{ justifyContent: "center", marginTop: "20px" }}>
          <Button
            text="선택"
            icon={<SmallWhiteTick />}
            style={{
              background: "#5284CE",
              marginRight: "20px",
              border: "1px solid #5284CE",
              borderRadius: "999px",
              height: "31px",
              width: "60px",
              padding: "0",
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
              height: "31px",
              width: "60px",
              padding: "0",
            }}
            type="button"
            withoutLine
          />
        </Field>
      </form>
    );
  }
);

export default FORMCM1106;
