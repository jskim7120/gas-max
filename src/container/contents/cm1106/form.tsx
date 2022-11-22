import React, { useState, useEffect, useImperativeHandle } from "react";
import {
  Input,
  FormGroup,
  Label,
  DividerGray,
  Field,
  Select,
  ErrorText,
} from "components/form/style";
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
import { ICM1106 } from "./model";
import { CM1106INSERT, CM1106UPDATE, CM1106DELETE } from "app/path";
import { toast } from "react-toastify";
import API from "app/axios";

const FORMCM1106 = React.forwardRef(
  (
    {
      selected,
      fetchData,
      setData,
      selectedRowIndex,
      setSelectedRowIndex,
      setSelected,
    }: {
      selected: any;
      fetchData: Function;
      setData: Function;
      selectedRowIndex: any;
      setSelectedRowIndex: Function;
      setSelected: Function;
    },
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);

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
      resetForm,
      crud,
      setIsAddBtnClicked,
    }));

    useEffect(() => {
      resetForm("reset");
    }, [selected]);

    const resetForm = (type: string | null) => {
      if (selected !== undefined && JSON.stringify(selected) !== "{}") {
        let newData: any = {};

        if (type === "clear") {
          for (const [key, value] of Object.entries(selected)) {
            newData[key] = null;
          }
          reset(newData);
        } else if (type === "reset") {
          for (const [key, value] of Object.entries(selected)) {
            newData[key] = value;
          }
          reset(newData);
        }
      }
    };
    const crud = async (type: string | null) => {
      if (type === "delete") {
        const path = CM1106DELETE;
        const formValues = getValues();

        try {
          const response: any = await API.post(path, formValues);
          if (response.status === 200) {
            toast.success("Deleted", {
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

      try {
        const response: any = await API.post(path, formValues);
        if (response.status === 200) {
          if (isAddBtnClicked) {
            setData((prev: any) => [formValues, ...prev]);
            setSelectedRowIndex(0);
          } else {
            setData((prev: any) => {
              prev[selectedRowIndex] = formValues;
              return [...prev];
            });
          }
          // setSelected(formValues);
          setIsAddBtnClicked(false);

          toast.success("Action successful", {
            autoClose: 500,
          });
        } else {
          toast.error(response?.response?.data?.message);
        }
      } catch (err: any) {
        toast.error(err?.message);
      }
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
