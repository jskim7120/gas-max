import React, { useImperativeHandle, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import API from "app/axios";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { EN1400DELETE, EN140011 } from "app/path";
import { InputSize } from "components/componentsType";
import CustomDatePicker from "components/customDatePicker";
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
} from "components/form/style";
import { ICC1200SEARCH } from "./model";
import { addCC1100, openModal } from "app/state/modal/modalSlice";

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
      selectedRowIndex,
      setSelected,
      setSelectedRowIndex,
    }: IForm,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const dispatch = useDispatch();
    const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);
    const { data: dataCommonDic } = useGetCommonDictionaryQuery({
      groupId: "CC",
      functionName: "CC1200",
    });
    const [radioChecked, setRadioChecked] = useState(0);
    const [radioCheckedSecond, setRadioCheckedSecond] = useState(0);
    const [acjType, setAcjType] = useState("");
    const { register, handleSubmit, reset, getValues, control } =
      useForm<ICC1200SEARCH>({ mode: "onChange" });

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
      if (selected !== undefined && JSON.stringify(selected) !== "{}") {
        let newData: any = {};
        if (type === "clear") {
          document.getElementById("bpName")?.focus();
          const path = EN140011;

          try {
            const response: any = await API.get(path, {
              params: { areaCode: selected.areaCode },
            });
            if (response.status === 200) {
              for (const [key, value] of Object.entries(selected)) {
                newData[key] = null;
              }
              newData.bpCode = response.data.tempCode;
              newData.areaCode = selected.areaCode;
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
          });
          setAcjType(selected.acjType);
        }
      }
    };
    const crud = async (type: string | null) => {
      if (type === "delete") {
        const formValues = getValues();

        try {
          const response = await API.post(EN1400DELETE, formValues);
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
        // handleSubmit(submit)();
      }
    };

    const handleSelectCode = async (event: any) => {};

    const handleSearchBtnClick = () => {
      dispatch(
        addCC1100({
          acjType: acjType,
        })
      );
      dispatch(openModal({ type: "cc1100Modal" }));
    };

    return (
      <form
        // onSubmit={handleSubmit(submit)}
        style={{ width: "380px", padding: "0px 10px" }}
      >
        <Wrapper>
          <FormGroup>
            <Label style={{ minWidth: "80px" }}>영 업 소</Label>
            <Select {...register("cbareaCode")} onChange={handleSelectCode}>
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
                <CustomDatePicker value={value} onChange={onChange} />
              )}
            />
          </FormGroup>
        </Wrapper>
        <Wrapper>
          <FormGroup>
            <Label style={{ minWidth: "80px" }}>차 변</Label>
            {radioOptions.map((option, index) => (
              <Item key={index}>
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
            inputSize={InputSize.i250}
          />
        </Wrapper>
        <Wrapper>
          <FormGroup>
            <Label style={{ minWidth: "80px" }}>차 변</Label>
            {radioOptionsSecond.map((option, index) => (
              <Item key={index}>
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
              inputSize={InputSize.i250}
            />
            <SearchBtn type="button" onClick={handleSearchBtnClick}>
              <MagnifyingGlass />
            </SearchBtn>
          </FormGroup>
        </Wrapper>

        <Divider />

        <Wrapper>
          <Input
            label="적 요"
            labelStyle={{ minWidth: "80px" }}
            register={register("acjBigo")}
            inputSize={InputSize.i250}
          />
        </Wrapper>
        <Wrapper>
          <Input
            label="금 액"
            labelStyle={{ minWidth: "80px" }}
            register={register("acjKumack")}
            inputSize={InputSize.i250}
          />
        </Wrapper>
      </form>
    );
  }
);

export default Form;
