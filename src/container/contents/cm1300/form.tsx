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
  Input2,
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
    const [cuRdangaType, setCuRdangaType] = useState("");
    const [sign, setSign] = useState("");

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

    useEffect(() => {
      if (addr.length > 0) {
        console.log("hayag===>", addr);
        reset({
          aptZipcode: addr ? addr?.split("/")[1] : "",
          aptAddr1: addr ? addr?.split("/")[0] : "",
        });
      }
    }, [addr]);

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
              // register={register("aptZipcode")}
              rtl={false}
            />
          </Label>
          <Input
            register={register("aptZipcode")}
            errors={errors["aptZipcode"]?.message}
            inputSize={InputSize.xs}
          />
          <DaumAddress setAddress={setAddress} />
          <Input
            register={register("aptAddr1")}
            errors={errors["aptAddr1"]?.message}
            inputSize={InputSize.md290}
          />
          <p className="addr2">(대덕동) 자양현대아파트 205동 1502호</p>
        </Wrapper>
        <DividerGray />
        <Wrapper grid col={3}>
          <Field>
            <FormGroup>
              <Label>담당사원</Label>
              <Select {...register("aptSwCode")} width={InputSize.i120}>
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
              <Select {...register("aptJyCode")} width={InputSize.i120}>
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
              <Select {...register("aptGubun")} width={InputSize.i120}>
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
                width={InputSize.i120}
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
                  title="루베단가 "
                  register={register("aptRdangaType")}
                  rtl={false}
                />
              </Label>
              <Select
                {...register("aptRdangaType")}
                style={{ minWidth: "20%" }}
                onChange={(e: any) => {
                  console.log(e.target.value);
                  setCuRdangaType(e.target.value);
                }}
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
              {cuRdangaType === "1" ? (
                <Field flex style={{ alignItems: "center" }}>
                  <Input2
                    name="percentage"
                    id="number1"
                    type="text"
                    // onChange={(e: any) => setToo(Number(e.target.value))}
                    onChange={(e: any) => {}}
                  />
                  <Select
                    {...register("aptRdangaSign")}
                    onChange={(e: any) => {
                      console.log(e.target.value);
                      setSign(e.target.value);
                    }}
                    style={{ minWidth: "30px", border: "1px solid #e6e5e5" }}
                  >
                    <option value="+">+</option>
                    <option value="*">*</option>
                    <option value="-">-</option>
                  </Select>

                  <Input2
                    name="percentage"
                    id="number2"
                    type="text"
                    // onChange={(e: any) => setToo(Number(e.target.value))}
                    onChange={(e: any) => {}}
                  />

                  <p>
                    {sign === "*" && "%"}
                    {sign === "-" && "원"}
                    {sign === "+" && "원"}
                  </p>
                  <p style={{ margin: "0 5px" }}>=</p>
                  <p>
                    2900 원
                    {/* {sign !== "*"
                    ? eval(`${customerInfo?.cuRdanga} ${sign} ${too}`)
                    : eval(`${customerInfo?.cuRdanga} ${sign} ${too}/100`)} */}
                  </p>
                </Field>
              ) : (
                <Input
                  register={register("aptRdangaType")}
                  errors={errors["aptRdangaType"]?.message}
                  inputSize={InputSize.sm}
                  textAlign="right"
                  style={{ border: "1px solid #e6e5e5" }}
                />
              )}
              {/* <Input
                register={register("aptZipcode")}
                errors={errors["aptZipcode"]?.message}
                inputSize={InputSize.xs}
              />
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
              <p>2900 원</p> */}
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
              <Input
                register={register("aptAnkum")}
                textAlign="right"
                inputSize={InputSize.i120}
                formatNumber="comDecNumber"
              />
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
              <Input
                register={register("aptSisulkum")}
                textAlign="right"
                formatNumber="comDecNumber"
              />
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
              <Input
                register={register("aptMeterkum")}
                textAlign="right"
                formatNumber="comDecNumber"
              />
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
              <Input
                register={register("aptPer")}
                textAlign="right"
                inputSize={InputSize.i120}
              />
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
              <Select {...register("aptGumdate")} width={InputSize.i175}>
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
              <p>{`일`}</p>
            </FormGroup>
          </Field>
          <Field>
            <FormGroup>
              <Label>
                <CheckBox
                  title="수금방법"
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
