import React, { useImperativeHandle, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import API from "app/axios";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { EN1300INSERT, EN1300UPDATE, EN1300DELETE, EN130011 } from "app/path";
import {
  Item,
  RadioButton,
  RadioButtonLabel,
} from "components/radioButton/style";
import { ISANGPUM } from "./model";
import {
  Input,
  Select,
  Wrapper,
  Divider,
  Field,
  FormGroup,
  Label,
} from "components/form/style";
import { InputSize } from "components/componentsType";
import { formatCurrencyRemoveComma, currencyMask } from "helpers/currency";

interface IForm {
  selected: any;
  fetchData: any;
  setData: any;
  selectedRowIndex: number;
  setSelected: any;
  setSelectedRowIndex: any;
  isAddBtnClicked: boolean;
  setIsAddBtnClicked: Function;
  setIsCancelBtnDisabled: Function;
}

const radioOptions = [
  {
    label: "사용(Y)",
    id: "Y",
  },
  {
    label: "안함(N)",
    id: "N",
  },
];

const Form = React.forwardRef(
  (
    {
      selected,
      fetchData,
      setData,
      selectedRowIndex,
      setSelected,
      setSelectedRowIndex,
      isAddBtnClicked,
      setIsAddBtnClicked,
      setIsCancelBtnDisabled,
    }: IForm,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const { data: dataCommonDic } = useGetCommonDictionaryQuery({
      groupId: "EN",
      functionName: "EN1300",
    });

    useEffect(() => {
      if (JSON.stringify(selected) !== "{}") {
        reset({
          ...selected,
          swWorkOut: selected?.swWorkOut === "Y",
        });
      }
    }, [selected]);

    const { register, handleSubmit, reset, getValues, control } =
      useForm<ISANGPUM>({
        mode: "onChange",
      });

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      crud,
      resetForm,
    }));

    const resetForm = async (type: string) => {
      if (selected !== undefined && JSON.stringify(selected) !== "{}") {
        let newData: any = {};
        if (type === "clear") {
          document.getElementById("jpName")?.focus();
          const path = EN130011;
          try {
            const response: any = await API.get(path, {
              params: { areaCode: selected.areaCode },
            });
            if (response.status === 200) {
              for (const [key, value] of Object.entries(selected)) {
                newData[key] = null;
              }
              newData.jpCode = response.data.tempCode;
              newData.areaCode = selected.areaCode;
              newData.jpGasType = response.data.jpGasType;
              newData.jpGasuse = response.data.jpGasuse;
              newData.jpGubun = response.data.jpGubun;
              newData.jpJaegoYn = response.data.jpJaegoYn;
              newData.jpKgDanwi = response.data.jpKgDanwi;
              newData.jpKind = response.data.jpKind;
              reset(newData);
            } else {
              toast.error(response.response.data?.message, {
                autoClose: 500,
              });
            }
          } catch (err: any) {
            console.log("areaCode select error", err);
          }
        } else if (type === "reset") {
          for (const [key, value] of Object.entries(selected)) {
            newData[key] = value;
          }

          reset({
            ...newData,
            swWorkOut: selected?.swWorkOut === "Y",
          });
        }
      }
    };
    const crud = async (type: string | null) => {
      if (type === "delete") {
        const formValues = getValues();
        delete formValues.jpIndanga;
        delete formValues.jpOutdanga;
        delete formValues.jpIntong;
        delete formValues.jpBaedal;
        delete formValues.jpOuttong;

        try {
          const response = await API.post(EN1300DELETE, formValues);
          if (response.status === 200) {
            toast.success("삭제하였습니다", {
              autoClose: 500,
            });
            await fetchData();
          }
        } catch (err) {
          toast.error("Couldn't delete", {
            autoClose: 500,
          });
        }
      }

      if (type === null) {
        handleSubmit(submit)();
      }
    };

    const submit = async (data: ISANGPUM) => {
      //form aldaagui uyd ajillana
      const path = isAddBtnClicked ? EN1300INSERT : EN1300UPDATE;
      const formValues = getValues();
      formValues.jpOutdanga = formValues.jpOutdanga
        ? formatCurrencyRemoveComma(formValues.jpOutdanga)
        : "";
      formValues.jpIndanga = formValues.jpIndanga
        ? formatCurrencyRemoveComma(formValues.jpIndanga)
        : "";
      formValues.jpIntong = formValues.jpIntong
        ? formatCurrencyRemoveComma(formValues.jpIntong)
        : "";
      formValues.jpOuttong = formValues.jpOuttong
        ? formatCurrencyRemoveComma(formValues.jpOuttong)
        : "";
      formValues.jpBaedal = formValues.jpBaedal
        ? formatCurrencyRemoveComma(formValues.jpBaedal)
        : "";

      try {
        const response: any = await API.post(path, formValues);

        if (response.status === 200) {
          if (isAddBtnClicked) {
            setData((prev: any) => [formValues, ...prev]);
            setSelectedRowIndex(0);
            setIsAddBtnClicked(false);
            setIsCancelBtnDisabled(true);
          } else {
            setData((prev: any) => {
              prev[selectedRowIndex] = formValues;
              return [...prev];
            });
          }
          setSelected(formValues);
          toast.success("저장이 성공하였습니다", {
            autoClose: 500,
          });
        } else {
          toast.error(response?.message, {
            autoClose: 500,
          });
        }
      } catch (err: any) {
        toast.error(err?.message, {
          autoClose: 500,
        });
      }
    };

    const handleSelectCode = async (event: any) => {
      let newData: any = {};
      const path = EN130011;
      try {
        const response: any = await API.get(path, {
          params: { areaCode: event.target.value },
        });
        if (response.status === 200) {
          for (const [key, value] of Object.entries(selected)) {
            newData[key] = null;
          }
          newData.jpCode = response.data.tempCode;
          newData.areaCode = event.target.value;
          newData.jpGasType = response.data.jpGasType;
          newData.jpGasuse = response.data.jpGasuse;
          newData.jpGubun = response.data.jpGubun;
          newData.jpJaegoYn = response.data.jpJaegoYn;
          newData.jpKgDanwi = response.data.jpKgDanwi;
          newData.jpKind = response.data.jpKind;
          reset(newData);
          document.getElementById("jpName")?.focus();
        } else {
          toast.error(response.response.data?.message, {
            autoClose: 500,
          });
        }
      } catch (err: any) {
        console.log("areaCode select error", err);
      }
    };

    return (
      <form
        onSubmit={handleSubmit(submit)}
        style={{ padding: "0px 10px", width: "350px" }}
      >
        <Wrapper>
          <FormGroup>
            <Label>영업소</Label>
            <Select
              width={InputSize.i130}
              {...register("areaCode")}
              onChange={handleSelectCode}
              disabled={!isAddBtnClicked}
            >
              {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
        </Wrapper>
        <Wrapper>
          <Input
            label="코드"
            register={register("jpCode")}
            maxLength="4"
            inputSize={InputSize.i130}
            readOnly
          />
        </Wrapper>
        <Divider />
        <Wrapper>
          <Input
            label="품명"
            register={register("jpName")}
            inputSize={InputSize.i130}
            maxLength="30"
          />
        </Wrapper>
        <Wrapper>
          <Input
            label="규격"
            register={register("jpSpec")}
            inputSize={InputSize.i130}
            maxLength="10"
          />
        </Wrapper>
        <Wrapper>
          <FormGroup>
            <Label>가스구분</Label>
            <Select {...register("jpGubun")} width={InputSize.i130}>
              {dataCommonDic?.jpGubun?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
        </Wrapper>
        <Wrapper style={{ alignItems: "center" }}>
          <Controller
            control={control}
            {...register("jpKg")}
            render={({ field: { onChange, value, name } }) => (
              <Input
                label="용량"
                value={value}
                name={name}
                onChange={onChange}
                mask={[/\d/, /\d/, /\d/, /\d/, /\d/]}
                textAlign="right"
                inputSize={InputSize.i130}
              />
            )}
          />

          <Select {...register("jpKgDanwi")} style={{ minWidth: "64px" }}>
            {dataCommonDic?.jpKgDanwi?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </Wrapper>
        <Wrapper>
          <FormGroup>
            <Label>단위</Label>
            <Select {...register("jpUnit")} width={InputSize.i130}>
              {dataCommonDic?.jpUnit?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
        </Wrapper>
        <Wrapper>
          <FormGroup>
            <Label>가스분류</Label>
            <Select {...register("jpGasType")} width={InputSize.i130}>
              {dataCommonDic?.jpGasType?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
        </Wrapper>
        <Wrapper>
          <FormGroup>
            <Label>품목구분</Label>

            <Select {...register("jpKind")} width={InputSize.i130}>
              {dataCommonDic?.jpKind?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
        </Wrapper>
        <Wrapper>
          <FormGroup>
            <Label>용도구분</Label>
            <Select {...register("jpGasuse")} width={InputSize.i130}>
              {dataCommonDic?.jpGasuse?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
        </Wrapper>
        <Divider />
        <Wrapper>
          <FormGroup>
            <Label>Vat구분</Label>
            <Select {...register("jpVatKind")} width={InputSize.i130}>
              {dataCommonDic?.jpVatKind?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
        </Wrapper>
        <Wrapper>
          <Field flex>
            <Controller
              control={control}
              {...register("jpOutdanga")}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="가스판매단가"
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
        </Wrapper>
        <Wrapper>
          <Field flex>
            <Controller
              control={control}
              {...register("jpOuttong")}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="용기판매단가"
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
        </Wrapper>
        <Wrapper>
          <Field flex>
            <Controller
              control={control}
              {...register("jpIndanga")}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="가스매입원가"
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
        </Wrapper>
        <Wrapper>
          <Field flex>
            <Controller
              control={control}
              {...register("jpIntong")}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="용기구입단가"
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
        </Wrapper>
        <Wrapper>
          <Field flex>
            <Controller
              control={control}
              {...register("jpBaedal")}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="사원배달수수료"
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
        </Wrapper>
        <Divider />
        <Wrapper>
          <FormGroup style={{ alignItems: "center" }}>
            <Label>재고사용 유무</Label>
            {radioOptions.map((option, index) => (
              <Item key={index}>
                <RadioButton
                  type="radio"
                  value={option.id}
                  {...register(
                    `jpJaegoYn`
                    // , {
                    //   // required: "required",
                    // }
                  )}
                  id={option.id}
                  // onChange={() => console.log(option.label)}
                />
                <RadioButtonLabel htmlFor={`${option.label}`}>
                  {option.label}
                </RadioButtonLabel>
              </Item>
            ))}
          </FormGroup>
        </Wrapper>
        <Wrapper>
          <Field>
            <Input
              style={{ textAlign: "end" }}
              label="순번(조회순서)"
              register={register("jpSort")}
              inputSize={InputSize.i130}
              textAlign="right"
            />
          </Field>
        </Wrapper>
      </form>
    );
  }
);

export default Form;
