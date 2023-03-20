import React, { useImperativeHandle, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  Input,
  Select,
  Field,
  ErrorText,
  FormGroup,
  Wrapper,
  Divider,
  Label,
  Input2,
} from "components/form/style";
import { CheckBoxContainer } from "./style";
import CheckBox from "components/checkbox";
import { ICM1300 } from "./model";
import DaumAddress from "components/daum";

import {
  CM1300INSERT,
  CM1300UPDATE,
  CM1300DELETE,
  CM1300INSERTSEQ,
} from "app/path";
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
  setAreaCode: Function;
}

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
      setAreaCode,
    }: IForm,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);
    const [addr, setAddress] = useState<string>("");
    const [aptCuRdangaType, setAptCuRdangaType] = useState("");
    const [sign, setSign] = useState("");
    const [number1, setNumber1] = useState(0);
    const [number2, setNumber2] = useState(0);

    const [chkAptZipCode, setChkAptZipCode] = useState(false);
    const [chkAptRh2o, setChkAptRh2o] = useState(false);
    const [chkAptRdangaType, setChkAptRdangaType] = useState(false);
    const [chkAptAnkum, setChkAptAnkum] = useState(false);
    const [chkAptSisulkum, setChkAptSisulkum] = useState(false);
    const [chkAptMeterkum, setChkAptMeterkum] = useState(false);
    const [chkAptPer, setChkAptPer] = useState(false);
    const [chkAptGumdate, setChkAptGumdate] = useState(false);
    const [chkAptSukumtype, setChkAptSukumtype] = useState(false);

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
    } = useForm<ICM1300>({ mode: "onChange" });

    useEffect(() => {
      if (selected !== undefined && JSON.stringify(selected) !== "{}") {
        setChkAptZipCode(false);
        setChkAptRh2o(false);
        setChkAptRdangaType(false);
        setChkAptAnkum(false);
        setChkAptSisulkum(false);
        setChkAptMeterkum(false);
        setChkAptPer(false);
        setChkAptGumdate(false);
        setChkAptSukumtype(false);
        resetForm("reset");
      }
    }, [selected]);

    useEffect(() => {
      if (addr.length > 0) {
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

    const fetchCodes = async (areaCode: string) => {
      try {
        const response: any = await API.get(CM1300INSERTSEQ, {
          params: { areaCode: areaCode },
        });
        if (
          response.status === 200 &&
          response.data.tempAptCode[0]?.tempAptCode
        ) {
          return response.data;
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
          const data = await fetchCodes(selected.areaCode);
          if (data) {
            for (const [key, value] of Object.entries(selected)) {
              newData[key] = null;
            }
            reset({ ...newData, aptCode: data?.tempAptCode[0]?.tempAptCode });
          }
          return;
        } else if (type === "reset") {
          for (const [key, value] of Object.entries(selected)) {
            newData[key] = value;
          }
          reset({
            ...newData,
            chkAptZipCode: false,
            chkAptRh2o: false,
            chkAptRdangaType: false,
            chkAptAnkum: false,
            chkAptSisulkum: false,
            chkAptMeterkum: false,
            chkAptPer: false,
            chkAptGumdate: false,
            chkAptSukumtype: false,
          });
        }
      }
    };
    const crud = async (type: string | null) => {
      console.log("type", type);
      if (type === "delete") {
        const formValues = getValues();

        try {
          const response = await API.post(CM1300DELETE, formValues);
          if (response.status === 200) {
            toast.success("삭제했습니다", {
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
      const path = isAddBtnClicked ? CM1300INSERT : CM1300UPDATE;
      const formValues = getValues();
      formValues.areaCode = selected.areaCode;
      formValues.aptF = Number(formValues.aptF);
      formValues.aptS = Number(formValues.aptS);
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
          toast.error(response.response.data?.message);
        }
      } catch (err: any) {
        toast.error(err?.message);
      }
    };

    return (
      <form
        onSubmit={handleSubmit(submit)}
        style={{ padding: "10px 10px 0 10px" }}
      >
        <FormGroup>
          <Input
            label="건물코드"
            register={register("aptCode")}
            inputSize={InputSize.i120}
            readOnly
          />

          <Label>건물명</Label>
          <Input inputSize={InputSize.i120} register={register("aptName")} />
        </FormGroup>
        <FormGroup>
          <Input
            label="건물층수"
            register={register("aptF")}
            inputSize={InputSize.i120}
          />

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
              />
              <RadioButtonLabel
                htmlFor={`${option.label}`}
                style={{ width: "max-content" }}
              >
                {option.label}
              </RadioButtonLabel>
            </Item>
          ))}
        </FormGroup>

        <FormGroup>
          <Input
            label="층당세대"
            register={register("aptS")}
            inputSize={InputSize.i120}
          />

          <Label style={{ marginRight: "10px" }}>호수포함</Label>

          <CheckBox
            title="4호포함"
            rtl
            style={{
              minWidth: "100px",
              display: "flex",
              justifyContent: "flex-start",
              paddingLeft: "2px",
            }}
            // register={{ ...register("apt4ho") }}
          />

          <CheckBox
            title="4층포함"
            rtl
            style={{
              minWidth: "100px",
              display: "flex",
              justifyContent: "flex-start",
              paddingLeft: "2px",
            }}
            // register={{ ...register("apt4f") }}
          />
          <CheckBox
            title="지층포함"
            rtl
            style={{
              minWidth: "100px",
              display: "flex",
              justifyContent: "flex-start",
              paddingLeft: "2px",
            }}
            // register={{ ...register("aptBf") }}
          />
        </FormGroup>
        <Divider />
        <FormGroup>
          <CheckBox
            title="주 소"
            register={register("chkAptZipCode")}
            rtl={false}
            onChange={(e: any) => setChkAptZipCode(e.target.checked)}
            style={{
              paddingRight: "6px",
              minWidth: "120px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          />

          <Input
            register={register("aptZipcode")}
            errors={errors["aptZipcode"]?.message}
            inputSize={InputSize.i80}
            readOnly={!chkAptZipCode}
          />
          <DaumAddress setAddress={setAddress} />
          <Input
            register={register("aptAddr1")}
            errors={errors["aptAddr1"]?.message}
            inputSize={InputSize.i367}
          />
        </FormGroup>
        <FormGroup>
          <Label>담당사원</Label>
          <Select {...register("aptSwCode")} width={InputSize.i120}>
            {dataCommonDic?.aptSwCode?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>

          <Label>지역분류</Label>
          <Select {...register("aptJyCode")} width={InputSize.i120}>
            {dataCommonDic?.aptJyCode?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>

          <Label>관리자</Label>
          <Select {...register("aptGubun")} width={InputSize.i120}>
            {dataCommonDic?.aptGubun?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
        <Divider />
        <FormGroup>
          <CheckBox
            title="조정기"
            register={register("chkAptRh2o")}
            rtl={false}
            onChange={(e: any) => setChkAptRh2o(e.target.checked)}
            style={{
              paddingRight: "6px",
              minWidth: "120px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          />

          <Select
            disabled={!chkAptRh2o ? true : false}
            {...register("chkAptRh2o")}
            width={InputSize.i120}
            textAlign="right"
          >
            {dataCommonDic?.aptRh20?.map((option: any, index: number) => {
              return (
                <option key={index} value={option.code}>
                  {option.codeName}
                </option>
              );
            })}
          </Select>
          <p>mmH20</p>

          <CheckBox
            title="루베단가"
            register={register("chkAptRdangaType")}
            rtl={false}
            onChange={(e: any) => setChkAptRdangaType(e.target.checked)}
            style={{
              paddingRight: "6px",
              minWidth: "120px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          />

          <Select
            disabled={!chkAptRdangaType ? true : false}
            {...register("aptRdangaType")}
            width={InputSize.i120}
            onChange={(e: any) => {
              setAptCuRdangaType(e.target.value);
              setSign("");
              setNumber1(0);
              setNumber2(0);
            }}
          >
            {dataCommonDic?.aptRdangaType.map((option: any, index: number) => {
              return (
                <option key={index} value={option.code}>
                  {option.codeName}
                </option>
              );
            })}
          </Select>
          {aptCuRdangaType === "1" ? (
            <Field flex style={{ alignItems: "center" }}>
              <Input2
                name="percentage"
                id="number1"
                type="text"
                onChange={(e: any) => setNumber1(Number(e.target.value))}
                readOnly={!chkAptRdangaType}
              />
              <Select
                {...register("aptRdangaSign")}
                onChange={(e: any) => {
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
                onChange={(e: any) => setNumber2(Number(e.target.value))}
                readOnly={!chkAptRdangaType}
              />

              <p>
                {sign === "*" && "%"}
                {sign === "-" && "원"}
                {sign === "+" && "원"}
              </p>
              <p style={{ margin: "0 15px" }}>=</p>
              <p>
                {sign !== "*"
                  ? sign === "+"
                    ? number1 + number2
                    : sign === "-"
                    ? number1 - number2
                    : null
                  : (number1 * number2) / 100}
              </p>
              <span style={{ marginLeft: "3px" }}>원</span>
            </Field>
          ) : (
            <Input
              register={register("aptRdangaType")}
              errors={errors["aptRdangaType"]?.message}
              inputSize={InputSize.sm}
              textAlign="right"
              style={{ border: "1px solid #e6e5e5" }}
              readOnly={!chkAptRdangaType}
            />
          )}
        </FormGroup>
        <FormGroup>
          <CheckBox
            title="관리비"
            register={register("chkAptAnkum")}
            rtl={false}
            onChange={(e: any) => setChkAptAnkum(e.target.checked)}
            style={{
              paddingRight: "6px",
              minWidth: "120px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          />

          <Input
            register={register("aptAnkum")}
            textAlign="right"
            inputSize={InputSize.i120}
            readOnly={!chkAptAnkum}
          />
          <p>{`원`}</p>

          <CheckBox
            title="시설비"
            register={register("chkAptSisulkum")}
            rtl={false}
            onChange={(e: any) => setChkAptSisulkum(e.target.checked)}
            style={{
              paddingRight: "6px",
              minWidth: "162px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          />

          <Input
            register={register("aptSisulkum")}
            textAlign="right"
            readOnly={!chkAptSisulkum}
            inputSize={InputSize.i120}
          />
          <p>{`원`}</p>

          <CheckBox
            title="계량기"
            register={register("chkAptMeterkum")}
            rtl={false}
            onChange={(e: any) => setChkAptMeterkum(e.target.checked)}
            style={{
              paddingRight: "6px",
              minWidth: "120px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          />

          <Input
            register={register("aptMeterkum")}
            textAlign="right"
            readOnly={!chkAptMeterkum}
            inputSize={InputSize.i120}
          />
          <p>{`원`}</p>
        </FormGroup>
        <FormGroup>
          <CheckBox
            title="연체율"
            register={register("chkAptPer")}
            rtl={false}
            onChange={(e: any) => setChkAptPer(e.target.checked)}
            style={{
              paddingRight: "6px",
              minWidth: "120px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          />

          <Input
            register={register("aptPer")}
            textAlign="right"
            inputSize={InputSize.i120}
            maxLength="3"
            readOnly={!chkAptPer}
          />
          <p>{`%`}</p>

          <CheckBox
            title="검침일"
            register={register("chkAptGumdate")}
            rtl={false}
            onChange={(e: any) => setChkAptGumdate(e.target.checked)}
            style={{
              paddingRight: "6px",
              minWidth: "162px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          />

          <Input
            register={register("aptGumdate")}
            textAlign="right"
            inputSize={InputSize.i120}
            maxLength="2"
            readOnly={!chkAptGumdate}
          />
          <p>{`일`}</p>

          <CheckBox
            title="수금방법"
            register={register("chkAptSukumtype")}
            rtl={false}
            onChange={(e: any) => setChkAptSukumtype(e.target.checked)}
            style={{
              paddingRight: "6px",
              minWidth: "120px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          />

          <Select
            {...register("aptSukumtype")}
            width={InputSize.i120}
            disabled={!chkAptSukumtype ? true : false}
          >
            {dataCommonDic?.aptSukumtype?.map((option: any, index: number) => {
              return (
                <option key={index} value={option.code}>
                  {option.codeName}
                </option>
              );
            })}
          </Select>
        </FormGroup>
      </form>
    );
  }
);

export default Form;
