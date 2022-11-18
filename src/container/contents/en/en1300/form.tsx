import React, { useImperativeHandle, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import API from "app/axios";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { EN1300INSERT, EN1300UPDATE, EN1300DELETE } from "app/path";
import {
  Item,
  RadioButton,
  RadioButtonLabel,
} from "components/radioButton/style";
import { ISANGPUM } from "./model";
import { schema } from "./validation";
import {
  Input,
  Select,
  Wrapper,
  Divider,
  DividerGray,
  Field,
  ErrorText,
  FormGroup,
  Label,
} from "components/form/style";
import { InputSize } from "components/componentsType";
import { formatCurrencyRemoveComma } from "helpers/dateFormat";

interface IForm {
  selected: any;
  fetchData: any;
  setData: any;
  selectedRowIndex: number;
  setSelected: any;
  setSelectedRowIndex: any;
}

const radioOptions = [
  {
    label: "사용(Y)",
    id: "0",
  },
  {
    label: "안함(N)",
    id: "1",
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
    }: IForm,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);

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

    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
      getValues,
    } = useForm<ISANGPUM>({
      mode: "onChange",
      resolver: yupResolver(schema),
    });

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      crud,
      resetForm,
      setIsAddBtnClicked,
    }));

    const resetForm = (type: string) => {
      if (selected !== undefined && JSON.stringify(selected) !== "{}") {
        console.log("type:", type);
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
        try {
          const response = await API.post(EN1300DELETE, formValues);
          if (response.status === 200) {
            toast.success("Deleted", {
              autoClose: 500,
            });
            await fetchData();
          }
        } catch (err) {
          toast.error("Couldn't delete");
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
          } else {
            setData((prev: any) => {
              prev[selectedRowIndex] = formValues;
              return [...prev];
            });
          }
          setSelected(formValues);
          toast.success("Action successfull", {
            autoClose: 500,
          });
          setIsAddBtnClicked(false);
        } else {
          toast.error(response?.message);
        }
      } catch (err: any) {
        toast.error(err?.message);
      }
    };

    return (
      <form onSubmit={handleSubmit(submit)} style={{ padding: "0px 10px" }}>
        <Wrapper>
          <Field>
            <FormGroup>
              <Label>영업소</Label>
              <Select {...register("areaCode")}>
                {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <div>
              <ErrorText>{errors["areaCode"]?.message}</ErrorText>
            </div>
          </Field>
        </Wrapper>
        <DividerGray />
        <Wrapper>
          <Input
            label="코드"
            register={register("jpCode")}
            errors={errors["jpCode"]?.message}
            maxLength="4"
            inputSize={InputSize.en1300}
          />
        </Wrapper>
        <Divider />
        <Wrapper>
          <Input
            label="품명"
            register={register("jpName")}
            errors={errors["jpName"]?.message}
            inputSize={InputSize.en1300}
          />
        </Wrapper>
        <DividerGray />
        <Wrapper>
          <Input
            label="규격"
            register={register("jpSpec")}
            errors={errors["jpSpec"]?.message}
            inputSize={InputSize.en1300}
          />
        </Wrapper>
        <DividerGray />
        <Wrapper>
          <Field>
            <FormGroup>
              <Label>가스구분</Label>
              <Select {...register("jpGubun")}>
                {dataCommonDic?.jpGubun?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <div>
              <ErrorText>{errors["jpGubun"]?.message}</ErrorText>
            </div>
          </Field>
        </Wrapper>
        <DividerGray />
        <Wrapper>
          <Field style={{ display: "flex" }}>
            <Input
              label="용량"
              register={register("jpKg")}
              errors={errors["jpKg"]?.message}
              style={{ width: "56px" }}
              textAlign="right"
              maxLength="10"
            />
            <FormGroup>
              <Select {...register("jpKgDanwi")} style={{ minWidth: "64px" }}>
                {dataCommonDic?.jpKgDanwi?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <div>
              <ErrorText>{errors["jpKgDanwi"]?.message}</ErrorText>
            </div>
          </Field>
        </Wrapper>
        <DividerGray />
        <Wrapper>
          <Field>
            <FormGroup>
              <Label>단위</Label>

              <Select {...register("jpUnit")}>
                {dataCommonDic?.jpUnit?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <div>
              <ErrorText>{errors["jpUnit"]?.message}</ErrorText>
            </div>
          </Field>
        </Wrapper>
        <DividerGray />
        <Wrapper>
          <Field>
            <FormGroup>
              <Label>가스분류</Label>
              <Select {...register("jpGasType")}>
                {dataCommonDic?.jpGasType?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <div>
              <ErrorText>{errors["jpGasType"]?.message}</ErrorText>
            </div>
          </Field>
        </Wrapper>
        <DividerGray />
        <Wrapper>
          <Field>
            <FormGroup>
              <Label>품목구분</Label>

              <Select {...register("jpKind")}>
                {dataCommonDic?.jpKind?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <div>
              <ErrorText>{errors["jpKind"]?.message}</ErrorText>
            </div>
          </Field>
        </Wrapper>
        <DividerGray />
        <Wrapper>
          <Field>
            <FormGroup>
              <Label>용도구분</Label>
              <Select {...register("jpGasuse")}>
                {dataCommonDic?.jpGasuse?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <div>
              <ErrorText>{errors["jpGasuse"]?.message}</ErrorText>
            </div>
          </Field>
        </Wrapper>
        <Divider />
        <Wrapper>
          <Field>
            <FormGroup>
              <Label>Vat구분</Label>
              <Select {...register("jpVatKind")}>
                {dataCommonDic?.jpVatKind?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <div>
              <ErrorText>{errors["jpVatKind"]?.message}</ErrorText>
            </div>
          </Field>
        </Wrapper>
        <DividerGray />
        <Wrapper>
          <Field flex>
            <Input
              style={{ textAlign: "end" }}
              label="가스판매단가"
              register={register("jpOutdanga")}
              errors={errors["jpOutdanga"]?.message}
              inputSize={InputSize.en1300}
              textAlign="right"
              formatNumber="comDecNumber"
              maxLength="26"
            />
            <p>원</p>
          </Field>
        </Wrapper>
        <DividerGray />
        <Wrapper>
          <Field flex>
            <Input
              style={{ textAlign: "end" }}
              label="용기판매단가"
              register={register("jpOuttong")}
              errors={errors["jpOuttong"]?.message}
              inputSize={InputSize.en1300}
              textAlign="right"
              formatNumber="comNumber"
              maxLength="23"
            />
            <p>원</p>
          </Field>
        </Wrapper>
        <DividerGray />
        <Wrapper>
          <Field flex>
            <Input
              style={{ textAlign: "end" }}
              label="가스매입원가"
              register={register("jpIndanga")}
              errors={errors["jpIndanga"]?.message}
              inputSize={InputSize.en1300}
              textAlign="right"
              formatNumber="comDecNumber"
              maxLength="26"
            />
            <p>원</p>
          </Field>
        </Wrapper>
        <DividerGray />
        <Wrapper>
          <Field flex>
            <Input
              style={{ textAlign: "end" }}
              label="용기구입단가"
              register={register("jpIntong")}
              errors={errors["jpIntong"]?.message}
              inputSize={InputSize.en1300}
              textAlign="right"
              formatNumber="comNumber"
              maxLength="23"
            />
            <p>원</p>
          </Field>
        </Wrapper>
        <DividerGray />
        <Wrapper>
          <Field flex>
            <Input
              style={{ textAlign: "end" }}
              label="사원배달수수료"
              register={register("jpBaedal")}
              errors={errors["jpBaedal"]?.message}
              inputSize={InputSize.en1300}
              textAlign="right"
              formatNumber="comNumber"
              maxLength="23"
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
                  {...register(`jpJaegoYn`, {
                    required: "required",
                  })}
                  id={option.id}
                  // onChange={() => console.log(option.label)}
                />
                <RadioButtonLabel htmlFor={`${option.label}`}>
                  {option.label}
                </RadioButtonLabel>
              </Item>
            ))}
          </FormGroup>
          <div>
            <ErrorText>{errors["jpJaegoYn"]?.message}</ErrorText>
          </div>
        </Wrapper>
        <DividerGray />
        <Wrapper>
          <Field>
            <Input
              style={{ textAlign: "end" }}
              label="순번(조회순서)"
              register={register("jpSort")}
              errors={errors["jpSort"]?.message}
              inputSize={InputSize.en1300}
              textAlign="right"
            />
          </Field>
        </Wrapper>
        <DividerGray />
      </form>
    );
  }
);

export default Form;
