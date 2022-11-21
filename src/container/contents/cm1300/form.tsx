import React, { useImperativeHandle, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import {
  Input,
  Select,
  Field,
  ErrorText,
  FormGroup,
  Wrapper,
  Divider,
  DividerGray,
  Label,
} from "components/form/style";
import { CheckBoxContainer } from "./style";
import CheckBox from "components/checkbox";
import { ICM1300 } from "./model";
import DaumAddress from "components/daum";
import { schema } from "./validation";
import { InputSize } from "components/componentsType";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import API from "app/axios";
import {
  Item,
  RadioButton,
  RadioButtonLabel,
} from "components/radioButton/style";

interface IForm {
  selected: any;
  fetchData: any;
  menuId: string;
  setData: any;
  selectedRowIndex: number;
  setSelected: any;
  setSelectedRowIndex: any;
}
const base = "/app/CM1300/";

const radioOptions = [
  {
    label: "복도식",
    id: "0",
  },
  {
    label: "계단식(2세대)",
    id: "1",
  },
  {
    label: "계단식(1세대)",
    id: "2",
  },
];

const Form = React.forwardRef(
  (
    {
      selected,
      fetchData,
      menuId,
      setData,
      selectedRowIndex,
      setSelected,
      setSelectedRowIndex,
    }: IForm,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);
    const [addr, setAddress] = useState<string>("");

    const { data: dataCommonDic } = useGetCommonDictionaryQuery({
      groupId: "CM",
      functionName: "CM1300",
    });

    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
      getValues,
    } = useForm<ICM1300>({ mode: "onChange", resolver: yupResolver(schema) });

    useEffect(() => {
      if (selected !== undefined && JSON.stringify(selected) !== "{}") {
        resetForm("reset");
      }
    }, [selected]);

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      crud,
      resetForm,
      setIsAddBtnClicked,
    }));

    const resetForm = (type: string) => {
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
          reset({
            ...newData,
          });
        }
      }
    };
    const crud = async (type: string | null) => {
      if (type === "delete") {
        const path = `${base}delete`;
        const formValues = getValues();

        try {
          const response = await API.post(path, formValues);
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

    const submit = async (data: ICM1300) => {
      //form aldaagui uyd ajillana
      const path = isAddBtnClicked ? `${base}insert` : `${base}update`;
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
          setSelected(formValues);
          toast.success("Action successful", {
            autoClose: 500,
          });
          setIsAddBtnClicked(false);
        } else {
          toast.error(response.response.data?.message);
        }
      } catch (err: any) {
        toast.error(err?.message);
      }
    };

    return (
      <form
        className="form_control"
        onSubmit={handleSubmit(submit)}
        style={{ padding: "15px 0px 29px", height: "auto" }}
      >
        <Divider />
        <Wrapper grid col={3}>
          <Input
            label="건물코드"
            register={register("aptCode")}
            errors={errors["aptCode"]?.message}
            inputSize={InputSize.sm}
          />
          <Field>
            <FormGroup>
              <Label>건물명</Label>
              <Input inputSize={InputSize.md} register={register("aptName")} />
            </FormGroup>
            <div>
              <ErrorText>{errors["aptName"]?.message}</ErrorText>
            </div>
          </Field>
        </Wrapper>
        <DividerGray />
        <Wrapper grid col={3}>
          <Input
            label="건물층수"
            register={register("aptF")}
            errors={errors["aptF"]?.message}
            inputSize={InputSize.sm}
          />
          <Field>
            <FormGroup>
              <Label style={{ marginRight: "10px" }}>건물구조</Label>
              {radioOptions.map((option, index) => (
                <Item key={index}>
                  <RadioButton
                    type="radio"
                    value={option.id}
                    {...register(`aptType`, {
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
          </Field>
        </Wrapper>
        <DividerGray />
        <Wrapper grid col={3}>
          <div style={{ width: "50%" }}>
            <Input
              label="층당세대"
              register={register("aptS")}
              errors={errors["aptS"]?.message}
              inputSize={InputSize.sm}
            />
          </div>
          <CheckBoxContainer>
            <Label>호수포함</Label>
            <Field>
              <CheckBox
                title="4호포함"
                rtl
                register={{ ...register("apt4ho") }}
              />
              <div>
                <ErrorText>{errors["apt4ho"]?.message}</ErrorText>
              </div>
            </Field>
            <Field>
              <CheckBox
                title="4층포함"
                rtl
                register={{ ...register("apt4f") }}
              />
              <div>
                <ErrorText>{errors["apt4f"]?.message}</ErrorText>
              </div>
            </Field>
            <Field>
              <CheckBox
                title="지층포함"
                rtl
                register={{ ...register("aptBf") }}
              />
              <div>
                <ErrorText>{errors["aptBf"]?.message}</ErrorText>
              </div>
            </Field>
          </CheckBoxContainer>
        </Wrapper>
        <Divider />
        <Wrapper style={{ alignItems: "center" }}>
          <Label>
            <CheckBox
              title="주 소"
              register={register("aptZipcode")}
              rtl={false}
            />
          </Label>
          <Input
            register={register("aptZipcode")}
            errors={errors["aptZipcode"]?.message}
            inputSize={InputSize.sm}
          />
          <DaumAddress setAddress={setAddress} />
          <Input
            register={register("aptAddr1")}
            errors={errors["aptAddr1"]?.message}
            inputSize={InputSize.md}
          />
          <p className="addr2">(대덕동) 자양현대아파트 205동 1502호</p>
        </Wrapper>
        <DividerGray />
        <Wrapper grid col={3}>
          <Field>
            <FormGroup>
              <Label>담당사원</Label>
              <Select {...register("aptSwCode")}>
                {dataCommonDic?.aptSwCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
          </Field>
          <Field>
            <FormGroup>
              <Label>지역분류</Label>
              <Select {...register("aptJyCode")}>
                {dataCommonDic?.aptJyCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
              <DaumAddress setAddress={setAddress} />
            </FormGroup>
          </Field>
          <Field>
            <FormGroup>
              <Label>관리자</Label>
              <Select {...register("aptGubun")}>
                {dataCommonDic?.aptGubun?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
          </Field>
        </Wrapper>
        <Divider />
        <Wrapper grid col={3}>
          <Field>
            <FormGroup>
              <Label>
                <CheckBox
                  title="조정기"
                  register={register("aptRh2o")}
                  rtl={false}
                />
              </Label>
              <Select
                {...register("aptRh2o")}
                width={InputSize.i175}
                textAlign="right"
              >
                {dataCommonDic?.aptRh2o?.map((option: any, index: number) => {
                  return (
                    <option key={index} value={option.code}>
                      {option.codeName}
                    </option>
                  );
                })}
              </Select>
              <p>mmH20</p>
            </FormGroup>
          </Field>
          <Field>
            <FormGroup>
              <Label>
                <CheckBox
                  title="개별단가 "
                  register={register("aptRdangaType")}
                  rtl={false}
                />
              </Label>
              <Select
                {...register("aptRdangaType")}
                style={{ minWidth: "20%" }}
              >
                {dataCommonDic?.aptRdangaType.map(
                  (option: any, index: number) => {
                    return (
                      <option key={index} value={option.code}>
                        {option.codeName}
                      </option>
                    );
                  }
                )}
              </Select>
              <p>2,850원</p>
              <Select
                {...register("aptRdangaSign")}
                style={{ minWidth: "40px" }}
              >
                {dataCommonDic?.aptRdangaSign.map(
                  (option: any, index: number) => {
                    return (
                      <option key={index} value={option.code}>
                        {option.codeName}
                      </option>
                    );
                  }
                )}
              </Select>
              <Input
                inputSize={InputSize.xs}
                register={register("aptRdangaSign")}
              />
              <p>%</p>
              <p>=</p>
              <p>2900 원</p>
            </FormGroup>
          </Field>
        </Wrapper>
        <DividerGray />
        <Wrapper grid col={3}>
          <Field>
            <FormGroup>
              <Label>
                <CheckBox
                  title="관리비"
                  register={register("aptAnkum")}
                  rtl={false}
                />
              </Label>
              <Input register={register("aptAnkum")} textAlign="right" />
              <p>{`원`}</p>
            </FormGroup>
          </Field>
          <Field>
            <FormGroup>
              <Label>
                <CheckBox
                  title="시설비"
                  register={register("aptSisulkum")}
                  rtl={false}
                />
              </Label>
              <Input register={register("aptSisulkum")} textAlign="right" />
              <p>{`원`}</p>
            </FormGroup>
          </Field>
          <Field>
            <FormGroup>
              <Label>
                <CheckBox
                  title="계량기"
                  register={register("aptMeterkum")}
                  rtl={false}
                />
              </Label>
              <Input register={register("aptMeterkum")} textAlign="right" />
              <p>{`원`}</p>
            </FormGroup>
          </Field>
        </Wrapper>
        <DividerGray />
        <Wrapper grid col={3}>
          <Field>
            <FormGroup>
              <Label>
                <CheckBox
                  title="연체율"
                  register={register("aptPer")}
                  rtl={false}
                />
              </Label>
              <Input register={register("aptPer")} textAlign="right" />
              <p>{`%`}</p>
            </FormGroup>
          </Field>
          <Field>
            <FormGroup>
              <Label>
                <CheckBox
                  title="검침일"
                  register={register("aptGumdate")}
                  rtl={false}
                />
              </Label>
              <Select {...register("aptGumdate")} width={InputSize.i200}>
                {dataCommonDic?.aptGumdate?.map(
                  (option: any, index: number) => {
                    return (
                      <option key={index} value={option.code}>
                        {option.codeName}
                      </option>
                    );
                  }
                )}
              </Select>
              <p>{`원`}</p>
            </FormGroup>
          </Field>
          <Field>
            <FormGroup>
              <Label>
                <CheckBox
                  title="계량기"
                  register={register("aptSukumtype")}
                  rtl={false}
                />
              </Label>
              <Select {...register("aptSukumtype")} width={InputSize.i200}>
                {dataCommonDic?.aptSukumtype?.map(
                  (option: any, index: number) => {
                    return (
                      <option key={index} value={option.code}>
                        {option.codeName}
                      </option>
                    );
                  }
                )}
              </Select>
            </FormGroup>
          </Field>
        </Wrapper>
        <Divider />
      </form>
    );
  }
);

export default Form;
