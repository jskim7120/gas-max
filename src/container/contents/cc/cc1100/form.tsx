import React, { useImperativeHandle, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import API from "app/axios";
import { EN1400DELETE, EN140011 } from "app/path";
import { InputSize } from "components/componentsType";
import CustomDatePicker from "components/customDatePicker";
import {
  Item,
  RadioButton,
  RadioButtonLabel,
} from "components/radioButton/style";
import {
  Input,
  Select,
  FormGroup,
  Divider,
  Label,
} from "components/form/style";
import { ICC1100SEARCH } from "./model";
import { SearchBtn } from "components/daum";
import { MagnifyingGlass } from "components/allSvgIcon";
import { useDispatch, useSelector } from "app/store";
import { addCC1100, openModal } from "app/state/modal/modalSlice";

interface IForm {
  selected: any;
  fetchData: any;
  setData: any;
  selectedRowIndex: number;
  setSelected: any;
  setSelectedRowIndex: any;
  dataCommonDic: any;
}

const Form = React.forwardRef(
  (
    {
      selected,
      fetchData,
      setData,
      selectedRowIndex,
      setSelected,
      setSelectedRowIndex,
      dataCommonDic,
    }: IForm,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const dispatch = useDispatch();
    const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);
    const [acjType, setAcjType] = useState("");

    const stateCC1100 = useSelector((state: any) => state.modal.cc1100);

    const { register, handleSubmit, reset, getValues, control } =
      useForm<ICC1100SEARCH>({ mode: "onChange" });

    useEffect(() => {
      if (selected !== undefined && JSON.stringify(selected) !== "{}") {
        resetForm("reset");
      }
    }, [selected]);

    useEffect(() => {
      if (stateCC1100 && stateCC1100.accCode) {
        reset((formValues) => ({
          ...formValues,
          acjAccName: stateCC1100.accName,
          acjAcsName: stateCC1100.acsName,
          acjSwCode: stateCC1100.acsCode,
        }));
      }
    }, [stateCC1100]);

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
        style={{ width: "380px", padding: "10px" }}
      >
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

        <FormGroup>
          <Label style={{ minWidth: "80px" }}>입출 구분</Label>
          <Select
            {...register("acjType")}
            onChange={(e) => setAcjType(e.target.value)}
          >
            {dataCommonDic?.acjType?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label style={{ minWidth: "80px" }}>구 분</Label>
          {[
            { name: "현금 수입", value: "0" },
            { name: "예금 수입", value: "1" },
          ].map((option, index) => {
            return (
              <Item key={index}>
                <RadioButton
                  type="radio"
                  value={option.value}
                  {...register("acjGb")}
                  id={option.value}
                />
                <RadioButtonLabel htmlFor={`${option.value}`}>
                  {option.name}
                </RadioButtonLabel>
              </Item>
            );
          })}
        </FormGroup>

        <FormGroup>
          <Label style={{ minWidth: "80px" }}>통장계좌</Label>
          <Select {...register("cashBank")} onChange={handleSelectCode}>
            {dataCommonDic?.bankNo?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>

        <Divider />

        <Input
          label="계정과목"
          labelStyle={{ minWidth: "80px" }}
          register={register("acjAccName")}
          inputSize={InputSize.i200}
        />
        <FormGroup>
          <Input
            label="항 목"
            labelStyle={{ minWidth: "80px" }}
            register={register("acjAcsName")}
            inputSize={InputSize.i250}
          />
          <SearchBtn type="button" onClick={handleSearchBtnClick}>
            <MagnifyingGlass />
          </SearchBtn>
        </FormGroup>

        <FormGroup>
          <Label style={{ minWidth: "80px" }}>사 원</Label>
          <Select {...register("acjSwCode")} onChange={handleSelectCode}>
            {dataCommonDic?.acjSwCode?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>

        <br />
        <br />

        <Input
          label="금 액"
          labelStyle={{ minWidth: "80px" }}
          register={register("acjKumack")}
          inputSize={InputSize.i250}
        />

        <Input
          label="적 요"
          labelStyle={{ minWidth: "80px" }}
          register={register("acjBigo")}
          inputSize={InputSize.i250}
        />
      </form>
    );
  }
);

export default Form;
