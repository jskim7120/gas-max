import React, { useImperativeHandle, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
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
import { ICC1100, emptyObj } from "./model";
import { SearchBtn } from "components/daum";
import { MagnifyingGlass } from "components/allSvgIcon";
import { useDispatch, useSelector } from "app/store";
import { addCC1100 } from "app/state/modal/modalSlice";
import Modal from "components/modal/modal";

interface IForm {
  areaCode: string;
  selected: any;
  fetchData: any;
  setData: any;
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
      dataCommonDic,
      isAddBtnClicked,
      setIsAddBtnClicked,
    }: IForm,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const stateCC1100 = useSelector((state: any) => state.modal.cc1100);

    const { register, reset, control, setFocus, watch } = useForm<ICC1100>({
      mode: "onChange",
    });

    useEffect(() => {
      if (selected !== undefined && Object.keys(selected)?.length > 0) {
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
      if (type === "clear") {
        document.getElementsByName("acjDate")[0]?.focus();
        reset(emptyObj);
      }
      if (type === "reset") {
        reset(selected);
      }
    };
    const crud = async (type: string | null) => {};

    const handleSelectCode = async (event: any) => {};

    const handleSearchBtnClick = () => {
      dispatch(
        addCC1100({
          acjType: watch("acjType"),
        })
      );

      setIsModalOpen(true);
    };

    return (
      <form autoComplete="off" style={{ width: "380px", padding: "10px" }}>
        <Modal
          type="cc1100Modal"
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
        />
        <FormGroup>
          <Label style={{ minWidth: "80px" }}>영 업 소</Label>
          <Select
            width={InputSize.i200}
            register={register("areaCode")}
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
            name="acjDate"
            render={({ field }) => (
              <CustomDatePicker {...field} style={{ width: "200px" }} />
            )}
          />
        </FormGroup>

        <FormGroup>
          <Label style={{ minWidth: "80px" }}>입출 구분</Label>
          <Select register={register("acjType")} width={InputSize.i200}>
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
          ].map((option, index) => (
            <Item key={index} style={{ marginLeft: "3px" }}>
              <RadioButton
                type="radio"
                value={option.value}
                id={option.value}
                {...register("acjGb")}
              />
              <RadioButtonLabel htmlFor={`${option.value}`}>
                {option.name}
              </RadioButtonLabel>
            </Item>
          ))}
        </FormGroup>

        <FormGroup>
          <Label style={{ minWidth: "80px" }}>통장 계좌</Label>
          <Select register={register("cashBank")} width={InputSize.i200}>
            {dataCommonDic?.bankNo?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>

        <Divider />

        <Input
          label="계정 과목"
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
            marginTop: "30px",
          }}
        >
          <p>☞ 입출금 전표는 자동 분계 처리 됩니다.</p>
        </div>
      </form>
    );
  }
);

export default Form;
