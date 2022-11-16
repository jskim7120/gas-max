import React, { useImperativeHandle, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useDispatch } from "app/store";
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
import {
  formatDate,
  formatDateByRemoveDash,
  formatCurrencyRemoveComma,
} from "helpers/dateFormat";
import CustomDate from "components/customDatePicker";
import { InputSize } from "components/componentsType";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import API from "app/axios";
import { InfoText } from "components/text";
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
        style={{ padding: "15px 0px 29px" }}
      >
        <Divider />
        <Wrapper grid col={2}>
          <Input
            label="건물코드"
            register={register("aptCode")}
            errors={errors["aptCode"]?.message}
            inputSize={InputSize.sm}
          />
          <Field>
            <FormGroup>
              <Label>건물명</Label>
              <Select {...register("aptName")}>
                {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code1}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <div>
              <ErrorText>{errors["aptName"]?.message}</ErrorText>
            </div>
          </Field>
        </Wrapper>
        <DividerGray />
        <Wrapper grid col={2}>
          <Input
            label="건물층수"
            register={register("aptF")}
            errors={errors["aptF"]?.message}
            inputSize={InputSize.sm}
          />
          <Field>
            <FormGroup>
              <Label>건물구조</Label>
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
        <Wrapper>
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
        <Wrapper>
          <Label style={{ textAlign: "center", position: "relative" }}>
            주 소
            <div style={{ position: "absolute", right: "10px", top: "9px" }}>
              <input type="checkbox"></input>
            </div>
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
            inputSize={InputSize.lg}
          />
          <Input
            register={register("aptAddr2")}
            errors={errors["aptAddr2"]?.message}
            inputSize={InputSize.sm}
          />
        </Wrapper>
        {/* <Wrapper>
          <Field>
            <FormGroup>
              <Label>담당사원</Label>
              {aptSwCode ? (
                "error occured"
              ) : (
                <Select {...register("aptSwCode")}>
                  {aptSwCode?.map((obj, idx) => (
                    <option key={idx} value={obj.code1}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              )}
            </FormGroup>
            <div>
              <ErrorText>{errors["aptSwCode"]?.message}</ErrorText>
            </div>
          </Field>
        </Wrapper> */}
      </form>
    );
  }
);

export default Form;
