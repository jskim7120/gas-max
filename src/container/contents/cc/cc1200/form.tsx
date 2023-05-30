import React, { useImperativeHandle, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useGetCommonDictionaryMutation } from "app/api/commonDictionary";
import { InputSize } from "components/componentsType";
import CustomDatePicker from "components/customDatePicker";
import { currencyMask } from "helpers/currency";
import { SearchBtn } from "components/daum";
import { MagnifyingGlass } from "components/allSvgIcon";
import { useDispatch, useSelector } from "app/store";
import {
  Item,
  RadioButton,
  RadioButtonLabel,
} from "components/radioButton/style";
import {
  Input,
  Select,
  FormGroup,
  Wrapper,
  Divider,
  Label,
  StcTable,
} from "components/form/style";
import { ICC1200SEARCH } from "./model";
import { addCC1100, openModal } from "app/state/modal/modalSlice";

interface IForm {
  selected: any;
  fetchData: any;
  setData: any;
  setSelected: any;
  isAddBtnClicked: boolean;
  setIsAddBtnClicked: Function;
}
const radioOptions = [
  {
    label: "입 금",
    id: "0",
  },
  {
    label: "차변 대체",
    id: "1",
  },
];
const radioOptionsSecond = [
  {
    label: "출 금",
    id: "0",
  },
  {
    label: "대변 대체",
    id: "1",
  },
];
const Form = React.forwardRef(
  (
    {
      selected,
      fetchData,
      setData,
      setSelected,
      isAddBtnClicked,
      setIsAddBtnClicked,
    }: IForm,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const dispatch = useDispatch();

    const [getCommonDictionary, { data: dataCommonDic }] =
      useGetCommonDictionaryMutation();

    const [radioChecked, setRadioChecked] = useState(0);
    const [radioCheckedSecond, setRadioCheckedSecond] = useState(0);
    const [acjType, setAcjType] = useState("");
    const { register, handleSubmit, reset, getValues, control } =
      useForm<ICC1200SEARCH>({ mode: "onChange" });

    useEffect(() => {
      getCommonDictionary({ groupId: "CC", functionName: "CC1200" });
    }, []);

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

    const resetForm = async (type: string) => {
      if (selected !== undefined && Object.keys(selected)?.length > 0) {
        let newData: any = {};
        if (type === "clear") {
          document.getElementById("acjDate")?.focus();

          for (const [key, value] of Object.entries(selected)) {
            newData[key] = null;
          }
          newData.areaCode = selected.areaCode;
          reset(newData);
        } else if (type === "reset") {
          for (const [key, value] of Object.entries(selected)) {
            newData[key] = value;
          }
          reset({
            ...newData,
          });
          setAcjType(selected.acjType);
        }
      }
    };
    const crud = async (type: string | null) => {};

    const handleSelectCode = async (event: any) => {};

    const handleSearchBtnClick = () => {
      dispatch(
        addCC1100({
          acjType: acjType,
        })
      );
      dispatch(openModal({ type: "cc1200Modal" }));
    };

    return (
      <form
        // onSubmit={handleSubmit(submit)}
        autoComplete="off"
        style={{ width: "380px", padding: "20px 10px" }}
      >
        <Wrapper>
          <FormGroup>
            <Label style={{ minWidth: "80px" }}>영 업 소</Label>
            <Select
              register={register("areaCode")}
              onChange={handleSelectCode}
              width={InputSize.i200}
              disabled={!isAddBtnClicked}
            >
              {dataCommonDic?.cbareaCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
        </Wrapper>
        <Wrapper>
          <FormGroup>
            <Label style={{ minWidth: "80px" }}>일 자</Label>
            <Controller
              control={control}
              {...register("acjDate")}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <CustomDatePicker
                  value={value}
                  onChange={onChange}
                  style={{ width: "200px" }}
                />
              )}
            />
          </FormGroup>
        </Wrapper>
        <div
          style={{
            borderStyle: "groove",
            marginTop: "8px",
            alignItems: "center",
            padding: "7px 0",
          }}
        >
          <Wrapper>
            <FormGroup>
              <Label style={{ minWidth: "80px" }}>차 변</Label>
              {radioOptions.map((option, index) => (
                <Item key={index} style={{ marginLeft: "2px" }}>
                  <RadioButton
                    type="radio"
                    value={option.id}
                    {...register(`chGubun`)}
                    id={option.id}
                    checked={radioChecked === index}
                    onClick={(e: any) => {
                      setRadioChecked(parseInt(e.target.value));
                    }}
                  />
                  <RadioButtonLabel htmlFor={`${option.label}`}>
                    {option.label}
                  </RadioButtonLabel>
                </Item>
              ))}
            </FormGroup>
          </Wrapper>
          <Wrapper>
            <Input
              label="계정과목"
              labelStyle={{ minWidth: "80px" }}
              register={register("acjAccCodeCh")}
              inputSize={InputSize.i200}
            />
          </Wrapper>
        </div>
        <div
          style={{
            borderStyle: "groove",
            alignItems: "center",
            marginTop: "8px",
            marginBottom: "8px",
            padding: "7px 0",
          }}
        >
          <Wrapper>
            <FormGroup>
              <Label style={{ minWidth: "80px" }}>대변</Label>
              {radioOptionsSecond.map((option, index) => (
                <Item key={index} style={{ marginLeft: "2px" }}>
                  <RadioButton
                    type="radio"
                    value={option.id}
                    {...register(`chGubun`)}
                    id={option.id}
                    checked={radioChecked === index}
                    onClick={(e: any) => {
                      setRadioCheckedSecond(parseInt(e.target.value));
                    }}
                  />
                  <RadioButtonLabel htmlFor={`${option.label}`}>
                    {option.label}
                  </RadioButtonLabel>
                </Item>
              ))}
            </FormGroup>
          </Wrapper>
          <Wrapper>
            <FormGroup>
              <Input
                label="계정과목"
                labelStyle={{ minWidth: "80px" }}
                register={register("acjAccCodeDa")}
                style={{ width: "172px" }}
              />
              <SearchBtn type="button" onClick={handleSearchBtnClick}>
                <MagnifyingGlass />
              </SearchBtn>
            </FormGroup>
          </Wrapper>
        </div>

        <Wrapper>
          <Input
            label="적 요"
            labelStyle={{ minWidth: "80px" }}
            register={register("acjBigo")}
            inputSize={InputSize.i200}
          />
        </Wrapper>
        <Wrapper>
          <Input
            label="금 액"
            labelStyle={{ minWidth: "80px" }}
            register={register("acjKumack")}
            inputSize={InputSize.i200}
            mask={currencyMask}
            textAlign="right"
          />
        </Wrapper>
        <StcTable>
          <tr>
            <th>차변</th>
            <th>대변</th>
          </tr>
          <tr>
            <td>
              <p>자산의 증가</p>
              <p>부채의 감소</p>
              <p>자본의 감소</p>
              <p>비용의 발생</p>
            </td>
            <td>
              <p>자산의 감소</p>
              <p>부채의 증가</p>
              <p>자본의 증가</p>
              <p>비용의 발생</p>
            </td>
          </tr>
        </StcTable>
      </form>
    );
  }
);

export default Form;
