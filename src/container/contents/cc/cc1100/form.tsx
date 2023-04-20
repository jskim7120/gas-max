import React, { useImperativeHandle, useEffect, useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import API from "app/axios";
import { InputSize } from "components/componentsType";
import CustomDatePicker from "components/customDatePicker";
import { currencyMask } from "helpers/currency";
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
import {
  addCC1100,
  openModal,
  addDeleteMenuId,
} from "app/state/modal/modalSlice";

interface IForm {
  areaCode: string;
  selected: any;
  fetchData: any;
  setData: any;
  selectedRowIndex: number;
  setSelected: any;
  setSelectedRowIndex: any;
  dataCommonDic: any;
  isAddBtnClicked: boolean;
  setIsAddBtnClicked: Function;
}

const Form = React.forwardRef(
  (
    {
      areaCode,
      selected,
      fetchData,
      setData,
      selectedRowIndex,
      setSelected,
      setSelectedRowIndex,
      dataCommonDic,
      isAddBtnClicked,
      setIsAddBtnClicked,
    }: IForm,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
    const dispatch = useDispatch();
    const [isCancelBtnDisabled, setIsCancelBtnDisabled] =
      useState<boolean>(true);
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
      if (selected !== undefined && Object.keys(selected).length > 0) {
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
      dispatch(openModal({ type: "cc1100Modal" }));
    };

    return (
      <form style={{ width: "380px", padding: "10px" }}>
        <FormGroup>
          <Label style={{ minWidth: "80px" }}>영 업 소</Label>
          <Select
            width={InputSize.i200}
            register={register("areaCode")}
            onChange={handleSelectCode}
            disabled={!isAddBtnClicked}
          >
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
              <CustomDatePicker
                style={{ width: "200px" }}
                value={value}
                onChange={onChange}
              />
            )}
          />
        </FormGroup>

        <FormGroup>
          <Label style={{ minWidth: "80px" }}>입출 구분</Label>
          <Select
            register={register("acjType")}
            onChange={(e) => setAcjType(e.target.value)}
            width={InputSize.i200}
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
              <Item key={index} style={{ marginLeft: "3px" }}>
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
          <Select
            register={register("cashBank")}
            onChange={handleSelectCode}
            width={InputSize.i200}
          >
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
            inputSize={InputSize.i175}
          />
          <SearchBtn type="button" onClick={handleSearchBtnClick}>
            <MagnifyingGlass />
          </SearchBtn>
        </FormGroup>

        <FormGroup>
          <Label style={{ minWidth: "80px" }}>사 원</Label>
          <Select
            register={register("acjSwCode")}
            onChange={handleSelectCode}
            width={InputSize.i200}
          >
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
          inputSize={InputSize.i200}
          textAlign="right"
          mask={currencyMask}
        />

        <Input
          label="적 요"
          labelStyle={{ minWidth: "80px" }}
          register={register("acjBigo")}
          inputSize={InputSize.i200}
        />

        <div
          style={{
            color: "#00BEFF",
            fontSize: "15px",
            position: "absolute",
            bottom: "88px",
            right: "115px",
          }}
        >
          <p>☞ 입출금 전표는 자동 분계 처리 됩니다.</p>
        </div>
      </form>
    );
  }
);

export default Form;
