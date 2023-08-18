import React, { useImperativeHandle, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "app/store";
import { useGetCommonDictionaryMutation } from "app/api/commonDictionary";
import { addCC1100 } from "app/state/modal/modalSlice";
import Modal from "components/modal/modal";
import { InputSize } from "components/componentsType";
import CustomDatePicker from "components/customDatePicker";
import { SearchBtn } from "components/daum";
import { MagnifyingGlass } from "components/allSvgIcon";
import {
  Item,
  RadioButton,
  RadioButtonLabel,
} from "components/radioButton/style";
import {
  Input,
  Select,
  FormGroup,
  Label,
  StcTable,
} from "components/form/style";
import { currencyMask } from "helpers/currency";
import { ICC1200, emptyObj } from "./model";

interface IForm {
  selected: any;
  fetchData: any;
  setData: any;
  setSelected: any;
  isAddBtnClicked: boolean;
  setIsAddBtnClicked: Function;
  areaCode: string;
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
      areaCode,
    }: IForm,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [getCommonDictionary, { data: dataCommonDic }] =
      useGetCommonDictionaryMutation();

    const { register, handleSubmit, reset, watch, control } = useForm<ICC1200>({
      mode: "onChange",
    });

    useEffect(() => {
      getCommonDictionary({ groupId: "CC", functionName: "CC1200" });
    }, []);

    useEffect(() => {
      if (selected !== undefined && Object.keys(selected)?.length > 0) {
        resetForm("reset");
      }
    }, [selected]);

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      crud,
      resetForm,
      setIsAddBtnClicked,
    }));

    const resetForm = async (type: string) => {
      if (type === "clear") {
        document.getElementById("acjDate")?.focus();
        reset({ ...emptyObj });
      }
      if (type === "reset") {
        reset(selected);
      }
    };

    const crud = async (type: string | null) => {};

    const handleSearchBtnClick = () => {
      dispatch(
        addCC1100({
          acjType: watch("acjType"),
        })
      );
      setIsModalOpen(true);
    };

    return (
      <form
        // onSubmit={handleSubmit(submit)}
        autoComplete="off"
        style={{ width: "380px", padding: "20px 10px" }}
      >
        <Modal
          type="cc1200Modal"
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
        />
        <FormGroup>
          <Label style={{ minWidth: "80px" }}>영 업 소</Label>
          <Select
            register={register("areaCode")}
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

        <div
          style={{
            borderStyle: "groove",
            marginTop: "8px",
            alignItems: "center",
            padding: "7px 0",
          }}
        >
          <FormGroup>
            <Label style={{ minWidth: "80px" }}>차 변</Label>
            {radioOptions.map((option, index) => (
              <Item key={index} style={{ marginLeft: "2px" }}>
                <RadioButton
                  type="radio"
                  value={option.id}
                  {...register(`chGubun`)}
                  id={option.id}
                />
                <RadioButtonLabel htmlFor={`${option.label}`}>
                  {option.label}
                </RadioButtonLabel>
              </Item>
            ))}
          </FormGroup>

          <Input
            label="계정과목"
            labelStyle={{ minWidth: "80px" }}
            register={register("acjAccCodeCh")}
            inputSize={InputSize.i200}
          />
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
          <FormGroup>
            <Label style={{ minWidth: "80px" }}>대변</Label>
            {radioOptionsSecond.map((option, index) => (
              <Item key={index} style={{ marginLeft: "2px" }}>
                <RadioButton
                  type="radio"
                  value={option.id}
                  {...register(`daGubun`)}
                  id={option.id}
                />
                <RadioButtonLabel htmlFor={`${option.label}`}>
                  {option.label}
                </RadioButtonLabel>
              </Item>
            ))}
          </FormGroup>

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
        </div>

        <Input
          label="적 요"
          labelStyle={{ minWidth: "80px" }}
          register={register("acjBigo")}
          inputSize={InputSize.i200}
        />

        <Input
          label="금 액"
          labelStyle={{ minWidth: "80px" }}
          register={register("acjKumack")}
          inputSize={InputSize.i200}
          mask={currencyMask}
          textAlign="right"
        />

        <StcTable style={{ marginTop: "40px" }}>
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
