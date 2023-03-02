import React, { useImperativeHandle, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import API from "app/axios";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import {
  GR1100INSERT,
  GR1100UPDATE,
  GR1100DELETE,
  GR110065,
  GR1100INSERTSEQ,
} from "app/path";
import DaumAddress from "components/daum";
import { PersonInfoText } from "components/text";
import {
  Item,
  RadioButton,
  RadioButtonLabel,
} from "components/radioButton/style";
import { ISANGPUM, IForm } from "./model";
import {
  Input,
  Select,
  Wrapper,
  Divider,
  FormGroup,
  Label,
} from "components/form/style";
import { InputSize } from "components/componentsType";
import { currencyMask } from "helpers/currency";
import TableData from "./table/index";

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
      tData,
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
      setIsAddBtnClicked(false);
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
      control,
      getValues,
    } = useForm<ISANGPUM>({
      mode: "onChange",
    });

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      crud,
      resetForm,
      setIsAddBtnClicked,
    }));

    const fetchCodes = async () => {
      try {
        const response: any = await API.get(GR1100INSERTSEQ);
        if (response.status === 200 && response.data.buCode) {
          return response.data.buCode;
        } else {
          toast.error("can't get aptCode", {
            autoClose: 500,
          });
        }
      } catch (err) {
        toast.error("Error occured during get aptCode", {
          autoClose: 500,
        });
      }
      return null;
    };

    const resetForm = async (type: string) => {
      if (selected !== undefined && JSON.stringify(selected) !== "{}") {
        let newData: any = {};
        if (type === "clear") {
          const data = await fetchCodes();
          if (data) {
            for (const [key, value] of Object.entries(selected)) {
              newData[key] = null;
            }
          }
          reset({
            ...newData,
            buCode: data,
            buGubun: radioOptions[0].id,
            buStae: dataCommonDic?.buStae[0].code,
          });
          document.getElementById("buName")?.focus();
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
      if (typeof formValues.buMisu === "string")
        formValues.buMisu = Number(formValues.buMisu.replaceAll(",", ""));
      if (typeof formValues.buBcost === "string")
        formValues.buBcost = Number(formValues.buBcost.replaceAll(",", ""));
      if (typeof formValues.buBdanga === "string")
        formValues.buBdanga = Number(formValues.buBdanga.replaceAll(",", ""));
      if (typeof formValues.buBlcost === "string")
        formValues.buBlcost = Number(formValues.buBlcost.replaceAll(",", ""));
      if (typeof formValues.buBldanga === "string")
        formValues.buBldanga = Number(formValues.buBldanga.replaceAll(",", ""));
      if (typeof formValues.buPcost === "string")
        formValues.buPcost = Number(formValues.buPcost.replaceAll(",", ""));
      if (typeof formValues.buPdanga === "string")
        formValues.buPdanga = Number(formValues.buPdanga.replaceAll(",", ""));
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
      <form style={{ padding: "0px 10px", width: "745px" }}>
        <PersonInfoText
          text="매입처 정보"
          style={{ marginBottom: "6px", marginTop: "7px" }}
        />
        <Divider />
        <Wrapper grid col={2}>
          <Input
            label="매입처코드"
            register={register("buCode")}
            errors={errors["buCode"]?.message}
            inputSize={InputSize.i80}
            readOnly
          />
          <FormGroup>
            <Label>매입처 구분</Label>
            {radioOptions.map((option, index) => (
              <Item key={index}>
                <RadioButton
                  type="radio"
                  value={option.id}
                  {...register(`buGubun`)}
                  id={option.id}
                  //checked={option.id === "0"}
                />
                <RadioButtonLabel htmlFor={`${option.label}`}>
                  {option.label}
                </RadioButtonLabel>
              </Item>
            ))}
          </FormGroup>
        </Wrapper>

        <Wrapper grid col={2}>
          <Input
            label="매입처명"
            register={register("buName")}
            inputSize={InputSize.i150}
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

        <Wrapper grid col={2}>
          <Input
            label="대표전화"
            register={register("buTel")}
            inputSize={InputSize.i150}
          />
          <Input
            label="Fax 번호"
            register={register("buFax")}
            inputSize={InputSize.i110}
          />
        </Wrapper>

        <Wrapper grid col={2}>
          <Input
            label="비고"
            register={register("buBigo")}
            inputSize={InputSize.i290}
          />
        </Wrapper>
        <Divider />
        <Wrapper grid col={2}>
          <Controller
            control={control}
            {...register("buNo")}
            render={({ field: { onChange, value, name } }) => (
              <Input
                label="사업자번호"
                value={value}
                onChange={onChange}
                mask={[
                  /\d/,
                  /\d/,
                  /\d/,
                  "-",
                  /\d/,
                  /\d/,
                  "-",
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                ]}
                name={name}
                inputSize={InputSize.i110}
              />
            )}
          />
          <Input
            label="종사업장"
            register={register("buRCode")}
            inputSize={InputSize.i70}
            maxLength="4"
          />
        </Wrapper>
        <Wrapper grid col={2}>
          <Input
            label="상호"
            register={register("buSangho")}
            inputSize={InputSize.i130}
          />
          <Input
            label="대표자명"
            register={register("buSajang")}
            inputSize={InputSize.i130}
          />
        </Wrapper>
        <Divider />
        <Wrapper style={{ alignItems: "center" }}>
          <Input
            label="주소"
            register={register("buZipcode")}
            inputSize={InputSize.i70}
          />
          <DaumAddress setAddress={setAddress} />
          <Input register={register("buAddr1")} inputSize={InputSize.i290} />
        </Wrapper>
        <Wrapper>
          <Label></Label>
          <Input register={register("buAddr2")} inputSize={InputSize.i290} />
        </Wrapper>
        <Wrapper grid col={2}>
          <Input
            label="업태"
            register={register("buUptae")}
            inputSize={InputSize.i130}
          />
          <Input
            label="종목"
            register={register("buJongmok")}
            inputSize={InputSize.i130}
          />
        </Wrapper>
        <Wrapper grid col={2}>
          <Input
            label="담당자명"
            register={register("buDamdang")}
            inputSize={InputSize.i130}
          />
          <Input
            label="담당자 번호"
            register={register("buHp")}
            inputSize={InputSize.i130}
          />
        </Wrapper>
        <Wrapper grid>
          <Input
            label="이메일"
            register={register("buEmail")}
            inputSize={InputSize.i130}
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
        <Wrapper grid col={2}>
          <Input
            label="결재은행"
            register={register("buBank")}
            inputSize={InputSize.i130}
          />
          <Input
            label="계좌번호"
            register={register("buBankno")}
            inputSize={InputSize.i130}
          />
        </Wrapper>
        <Wrapper grid col={2}>
          <Input
            label="예금주"
            register={register("buBankju")}
            inputSize={InputSize.i130}
          />
          <Controller
            control={control}
            {...register("buMisu")}
            render={({ field: { onChange, value, name } }) => (
              <Input
                label="미지급액"
                value={value}
                onChange={onChange}
                mask={currencyMask}
                name={name}
                textAlign="right"
                inputSize={InputSize.i130}
              />
            )}
          />
        </Wrapper>
        <Divider />
        <TableData
          register={register}
          tableData={tableData}
          selected={selected}
          tData={tData}
        />
      </form>
    );
  }
);

export default Form;
