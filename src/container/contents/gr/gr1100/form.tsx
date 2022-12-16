import React, { useImperativeHandle, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import API from "app/axios";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { GR1100INSERT, GR1100UPDATE, GR1100DELETE, GR110065 } from "app/path";
import DaumAddress from "components/daum";
import InfoPerson from "assets/image/infoPerson.png";
import {
  Item,
  RadioButton,
  RadioButtonLabel,
} from "components/radioButton/style";
import { ISANGPUM } from "./model";
import {
  Input,
  Select,
  Wrapper,
  Divider,
  Field,
  ErrorText,
  FormGroup,
  Label,
} from "components/form/style";
import { InputSize } from "components/componentsType";
import { formatCurrencyRemoveComma } from "helpers/currency";
import TableData from "./table/index";

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
    label: "충전소",
    id: "0",
  },
  {
    label: "기구상",
    id: "1",
  },
  {
    label: "기타",
    id: "2",
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
    const [addr, setAddress] = useState<string>("");
    const [tableData, setTableData] = useState(null);

    const { data: dataCommonDic } = useGetCommonDictionaryQuery({
      groupId: "GR",
      functionName: "GR1100",
    });

    useEffect(() => {
      if (JSON.stringify(selected) !== "{}") {
        reset({
          ...selected,
        });
      }
    }, [selected]);

    useEffect(() => {
      fetchTableData();
    }, [selected]);

    useEffect(() => {
      if (addr.length > 0) {
        reset({
          buZipcode: addr ? addr?.split("/")[1] : "",
          buAddr1: addr ? addr?.split("/")[0] : "",
        });
      }
    }, [addr]);

    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
      getValues,
    } = useForm<ISANGPUM>({
      mode: "onChange",
    });

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
        const formValues = getValues();

        try {
          const response = await API.post(GR1100DELETE, formValues);
          if (response.status === 200) {
            toast.success("삭제했습니다", {
              autoClose: 500,
            });
            await handleSubmit(submit)();
          }
        } catch (err) {
          toast.error("Couldn't delete", {
            autoClose: 500,
          });
        }
      }

      if (type === null) {
        handleSubmit(submit)();
      }
    };

    const submit = async (data: ISANGPUM) => {
      //form aldaagui uyd ajillana
      const path = isAddBtnClicked ? GR1100INSERT : GR1100UPDATE;
      const formValues = getValues();
      formValues.areaCode = selected.areaCode;

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
          toast.success("저장이 성공하였습니다", {
            autoClose: 500,
          });
          setIsAddBtnClicked(false);
        } else {
          toast.error(response?.message, {
            autoClose: 500,
          });
        }
      } catch (err: any) {
        toast.error(err?.message, {
          autoClose: 500,
        });
      }
    };

    const fetchTableData = async () => {
      if (selected !== undefined && JSON.stringify(selected) !== "{}") {
        try {
          const { data: tableData } = await API.get(GR110065, {
            params: {
              areaCode: selected.areaCode,
            },
          });

          setTableData(tableData);
        } catch (err) {}
      }
    };

    return (
      <div style={{ padding: "0px 10px" }}>
        <form>
          <Field flex style={{ marginBottom: "6px", marginTop: "7px" }}>
            <img src={InfoPerson} alt="info" />
            <p style={{ fontSize: "14px", marginLeft: "7px" }}>매입처 정보</p>
          </Field>
          <Divider />
          <Wrapper grid>
            <Input
              label="매입처코드"
              register={register("buCode")}
              errors={errors["buCode"]?.message}
              inputSize={InputSize.xs}
            />
            <FormGroup style={{ alignItems: "center", width: "347px" }}>
              <Label style={{ marginRight: "4px", marginLeft: "17px" }}>
                매입처 구분
              </Label>
              {radioOptions.map((option, index) => (
                <Item key={index}>
                  <RadioButton
                    type="radio"
                    value={option.id}
                    {...register(`buGubun`)}
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
              <ErrorText>{errors["buGubun"]?.message}</ErrorText>
            </div>
          </Wrapper>

          <Wrapper grid>
            <Input
              label="매입처명"
              register={register("buName")}
              errors={errors["buName"]?.message}
            />
            <FormGroup>
              <Label>거래상태</Label>
              <Select {...register("buStae")} width={InputSize.i80}>
                {dataCommonDic?.buStae?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
          </Wrapper>

          <Wrapper grid>
            <Input
              label="대표전화"
              register={register("buTel")}
              errors={errors["buTel"]?.message}
              inputSize={InputSize.i110}
            />
            <Input
              label="Fax 번호"
              register={register("buFax")}
              errors={errors["buFax"]?.message}
              inputSize={InputSize.i110}
            />
          </Wrapper>

          <Wrapper grid>
            <Input
              label="비고"
              register={register("buBigo")}
              errors={errors["buBigo"]?.message}
              inputSize={InputSize.md290}
            />
          </Wrapper>
          <Divider />
          <Wrapper grid>
            <Input
              label="사업자번호"
              register={register("buNo")}
              errors={errors["buNo"]?.message}
              inputSize={InputSize.i110}
              formatNumber="telNumber"
              maxLength="13"
            />
            <Input
              label="종사업장"
              register={register("buRCode")}
              errors={errors["buRCode"]?.message}
              inputSize={InputSize.xs}
              maxLength="4"
            />
          </Wrapper>
          <Wrapper grid>
            <Input
              label="상호"
              register={register("buSangho")}
              errors={errors["buSangho"]?.message}
            />
            <Input
              label="대표자명"
              register={register("buSajang")}
              errors={errors["buSajang"]?.message}
            />
          </Wrapper>
          <Divider />
          <Wrapper style={{ alignItems: "center" }}>
            <Input
              label="주소"
              register={register("buZipcode")}
              errors={errors["buZipcode"]?.message}
              inputSize={InputSize.i70}
            />
            <DaumAddress setAddress={setAddress} />
            <Input
              register={register("buAddr1")}
              errors={errors["buAddr1"]?.message}
              inputSize={InputSize.md290}
            />
          </Wrapper>
          <Wrapper style={{ marginLeft: "110px" }}>
            <Input
              register={register("buAddr2")}
              errors={errors["buAddr2"]?.message}
              inputSize={InputSize.md290}
            />
          </Wrapper>
          <Wrapper grid>
            <Input
              label="업태"
              register={register("buUptae")}
              errors={errors["buUptae"]?.message}
            />
            <Input
              label="종목"
              register={register("buJongmok")}
              errors={errors["buJongmok"]?.message}
            />
          </Wrapper>
          <Wrapper grid>
            <Input
              label="담당자명"
              register={register("buDamdang")}
              errors={errors["buDamdang"]?.message}
            />
            <Input
              label="담당자 번호"
              register={register("buHp")}
              errors={errors["buHp"]?.message}
            />
          </Wrapper>
          <Wrapper grid>
            <Input
              label="이메일"
              register={register("buEmail")}
              errors={errors["buEmail"]?.message}
            />
            <FormGroup>
              <p>@</p>
              <Select {...register("emailKind")} width={InputSize.i120}>
                {dataCommonDic?.emailKind?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
          </Wrapper>
          <Divider />
          <Wrapper grid>
            <Input
              label="결재은행"
              register={register("buBank")}
              errors={errors["buBank"]?.message}
            />
            <Input
              label="계좌번호"
              register={register("buBankno")}
              errors={errors["buBankno"]?.message}
            />
          </Wrapper>
          <Wrapper grid>
            <Input
              label="예금주"
              register={register("buBankju")}
              errors={errors["buBankju"]?.message}
            />
            <Input
              label="미지급액"
              register={register("buMisu")}
              errors={errors["buMisu"]?.message}
              formatNumber="comNumber"
              style={{ textAlign: "right" }}
            />
          </Wrapper>
          <Divider />
          <TableData
            register={register}
            errors={errors}
            tableData={tableData}
            selected={selected}
          />
        </form>
      </div>
    );
  }
);

export default Form;
