import React, { useImperativeHandle, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import API from "app/axios";
import {
  Input,
  Select,
  Field,
  FormGroup,
  Divider,
  Label,
  Input2,
} from "components/form/style";
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
import {
  Item,
  RadioButton,
  RadioButtonLabel,
} from "components/radioButton/style";

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

const someStyle = {
  paddingRight: "6px",
  minWidth: "120px",
  display: "flex",
  justifyContent: "flex-end",
};
const someStyle2 = {
  paddingRight: "6px",
  minWidth: "162px",
  display: "flex",
  justifyContent: "flex-end",
};
const someStyle3 = {
  minWidth: "100px",
  display: "flex",
  justifyContent: "flex-start",
  paddingLeft: "2px",
};

interface IForm {
  areaCode: string;
  selected: any;
  setSelected: any;
  setSelectedRowIndex: any;
  fetchData: any;
  setData: any;
  selectedRowIndex: number;
  aptGubun: Array<any>;
  aptJyCode: Array<any>;
  aptSwCode: Array<any>;
  isAddBtnClicked: boolean;
  setIsCancelBtnDisabled: Function;
  setIsAddBtnClicked: Function;
  dataCommonDic: any;
}

const Form = React.forwardRef(
  (
    {
      areaCode,
      selected,
      setSelected,
      setSelectedRowIndex,
      fetchData,
      setData,
      selectedRowIndex,
      aptGubun,
      aptJyCode,
      aptSwCode,
      isAddBtnClicked,
      setIsCancelBtnDisabled,
      setIsAddBtnClicked,
      dataCommonDic,
    }: IForm,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const [addr, setAddress] = useState<string>("");

    const [chkAptZipCode, setChkAptZipCode] = useState(false);
    const [chkAptRh2o, setChkAptRh2o] = useState(false);
    const [chkAptRdangaType, setChkAptRdangaType] = useState(false);
    const [chkAptAnkum, setChkAptAnkum] = useState(false);
    const [chkAptSisulkum, setChkAptSisulkum] = useState(false);
    const [chkAptMeterkum, setChkAptMeterkum] = useState(false);
    const [chkAptPer, setChkAptPer] = useState(false);
    const [chkAptGumdate, setChkAptGumdate] = useState(false);
    const [chkAptSukumtype, setChkAptSukumtype] = useState(false);

    const [totalValue, setTotalValue] = useState<string>("");
    const [aptRdangaType, setAptRdangaType] = useState<string>("");
    const [aptRdanga, setAptRdanga] = useState<string>("");
    const [aptRdangaSign, setAptRdangaSign] = useState<string>("");
    const [aptRdangaAmt, setAptRdangaAmt] = useState<string>("");

    const { register, handleSubmit, reset, getValues } = useForm<ICM1300>({
      mode: "onChange",
    });

    useEffect(() => {
      if (selected !== undefined && JSON.stringify(selected) !== "{}") {
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
          const data = await fetchCodes(areaCode);
          if (data) {
            for (const [key, value] of Object.entries(selected)) {
              newData[key] = null;
            }
            reset({
              ...newData,
              aptCode: data?.tempAptCode[0]?.tempAptCode,
              aptType: radioOptions[0].id,
            });
          }
        } else if (type === "reset") {
          reset({
            ...selected,
            apt4F: selected?.apt4F === "Y",
            apt4Ho: selected?.apt4Ho === "Y",
            aptBf: selected?.aptBf === "Y",
          });
        }
        setChkAptZipCode(false);
        setChkAptRh2o(false);
        setChkAptRdangaType(false);
        setChkAptAnkum(false);
        setChkAptSisulkum(false);
        setChkAptMeterkum(false);
        setChkAptPer(false);
        setChkAptGumdate(false);
        setChkAptSukumtype(false);

        setAptRdangaType(selected?.aptRdangaType);
        setAptRdanga(selected?.aptRdanga);
        setAptRdangaSign(selected?.aptRdangaSign);
        setAptRdangaAmt(selected?.aptRdangaAmt);
        setTotalValue("");
      }
    };
    const crud = async (type: string | null) => {
      if (type === "delete") {
        const formValues = getValues();

        //delete procedure bhgui yum bn

        // try {
        //   const response = await API.post(CM1300DELETE, formValues);
        //   if (response.status === 200) {
        //     toast.success("삭제했습니다", {
        //       autoClose: 500,
        //     });
        //     await fetchData({ areaCode: areaCode });
        //   } else {
        //     toast.error("Couldn't delete", {
        //       autoClose: 500,
        //     });
        //   }
        // } catch (err) {
        //   toast.error("Couldn't delete", {
        //     autoClose: 500,
        //   });
        // }
      }
      if (type === null) {
        handleSubmit(submit)();
      }
    };

    const submit = async (data: ICM1300) => {
      //form aldaagui uyd ajillana
      const path = isAddBtnClicked ? CM1300INSERT : CM1300UPDATE;
      const formValues: any = getValues();
      formValues.areaCode = areaCode;

      formValues.aptF = +formValues.aptF;
      formValues.aptS = +formValues.aptS;
      formValues.aptMeterkum = +formValues.aptMeterkum;
      formValues.aptAnkum = +formValues.aptAnkum;
      formValues.aptPer = +formValues.aptPer;
      formValues.aptSisulkum = +formValues.aptSisulkum;

      if (aptRdangaType !== "") {
        formValues.aptRdangaType = aptRdangaType;
      }

      if (aptRdanga !== "") {
        formValues.aptRdanga = +aptRdanga;
      }

      // if (aptRdangaSign !== "") {
      formValues.aptRdangaSign = aptRdangaSign;
      // }

      if (aptRdangaAmt !== "") {
        formValues.aptRdangaAmt = +aptRdangaAmt;
      }

      if (!chkAptZipCode) {
        delete formValues.aptZipcode;
        delete formValues.aptAddr1;
        delete formValues.aptAddr2;
      }

      if (!chkAptRh2o) {
        delete formValues.aptRh2O;
      }

      if (!chkAptRdangaType) {
        //-----------------------------
      }

      if (!chkAptAnkum) {
        delete formValues.aptAnkum;
      }

      if (!chkAptSisulkum) {
        delete formValues.aptSisulkum;
      }

      if (!chkAptMeterkum) {
        delete formValues.aptMeterkum;
      }

      if (!chkAptPer) {
        delete formValues.aptPer;
      }

      if (!chkAptGumdate) {
        delete formValues.aptGumdate;
      }

      if (!chkAptSukumtype) {
        delete formValues.aptSukumtype;
      }

      try {
        const response: any = await API.post(path, formValues);
        if (response.status === 200) {
          fetchData({ areaCode: areaCode });

          toast.success("저장이 성공하였습니다", {
            autoClose: 500,
          });
          setIsAddBtnClicked(false);
          setIsCancelBtnDisabled(true);
        } else {
          toast.error(response.response.data?.message, {
            autoClose: 500,
          });
        }
      } catch (err: any) {
        toast.error(err?.message, {
          autoClose: 500,
        });
      }
    };

    const customEval = (t1: any, sign: any, t2: any) => {
      let tot = 0;
      let retVal = "";
      if (sign === null || sign === undefined) {
        retVal = ``;
      } else if (sign !== "X") {
        tot = eval(`${+t1} ${sign} ${+t2}`);
        retVal = `원 = ${tot}원`;
      } else {
        tot = eval(`${+t1} * ${t2} / 100`);
        retVal = `% = ${tot}원`;
      }
      return retVal;
    };

    const calcRdanga = (type: string, cur: any) => {
      let retSt = "";
      if (type === "aptRdanga") {
        retSt = customEval(cur, aptRdangaSign, aptRdangaAmt);
      }

      if (type === "aptRdangaSign") {
        retSt = customEval(aptRdanga, cur, aptRdangaAmt);
      }

      if (type === "aptRdangaAmt") {
        retSt = customEval(aptRdanga, aptRdangaSign, cur);
      }

      if (type === "aptRdangaType" && cur === "1") {
        retSt = customEval(aptRdanga, aptRdangaSign, aptRdangaAmt);
      }

      setTotalValue(retSt);
    };

    const showRdanga = () => {
      if (aptRdangaType === "0") {
        return (
          <FormGroup className="0">
            <Input
              readOnly
              inputSize={InputSize.i60}
              value={aptRdanga}
              onChange={(e: any) => setAptRdanga(e.target.value)}
            />
            <p>원</p>
          </FormGroup>
        );
      }
      if (aptRdangaType === "1") {
        return (
          <FormGroup className="1">
            <Input
              inputSize={InputSize.i60}
              value={aptRdanga}
              onChange={(e: any) => {
                setAptRdanga(e.target.value);
                calcRdanga("aptRdanga", e.target.value);
              }}
            />
            <p>원</p>
            <Select
              width={InputSize.i50}
              value={aptRdangaSign}
              onChange={(e: any) => {
                setAptRdangaSign(e.target.value);
                calcRdanga("aptRdangaSign", e.target.value);
              }}
            >
              {dataCommonDic?.aptRdangaSign.map((obj: any, index: number) => (
                <option key={index} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <Input
              inputSize={InputSize.i60}
              textAlign="right"
              value={aptRdangaAmt}
              onChange={(e: any) => {
                setAptRdangaAmt(e.target.value);
                calcRdanga("aptRdangaAmt", e.target.value);
              }}
            />
            <p>{totalValue}</p>
          </FormGroup>
        );
      }
      if (aptRdangaType === "2") {
        return (
          <FormGroup className="2">
            <Input
              inputSize={InputSize.i60}
              value={aptRdanga}
              onChange={(e: any) => setAptRdanga(e.target.value)}
            />
          </FormGroup>
        );
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
            style={someStyle3}
            register={{ ...register("apt4Ho") }}
          />

          <CheckBox
            title="4층포함"
            rtl
            style={someStyle3}
            register={{ ...register("apt4F") }}
          />
          <CheckBox
            title="지층포함"
            rtl
            style={someStyle3}
            register={{ ...register("aptBf") }}
          />
        </FormGroup>
        <Divider />
        <FormGroup>
          <CheckBox
            title="주 소"
            checked={chkAptZipCode}
            onChange={(e: any) => setChkAptZipCode(e.target.checked)}
            style={someStyle}
          />
          <Input
            register={register("aptZipcode")}
            inputSize={InputSize.i80}
            readOnly={!chkAptZipCode}
          />
          <DaumAddress setAddress={setAddress} disabled={!chkAptZipCode} />
          <Input
            register={register("aptAddr1")}
            inputSize={InputSize.i250}
            readOnly={!chkAptZipCode}
          />
          <Input
            register={register("aptAddr2")}
            inputSize={InputSize.i250}
            readOnly={!chkAptZipCode}
          />
        </FormGroup>
        <FormGroup>
          <Label>담당사원</Label>
          <Select {...register("aptSwCode")} width={InputSize.i120}>
            {aptSwCode?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>

          <Label>지역분류</Label>
          <Select {...register("aptJyCode")} width={InputSize.i120}>
            {aptJyCode?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>

          <Label>관리자</Label>
          <Select {...register("aptCustgubun")} width={InputSize.i120}>
            {aptGubun?.map((obj: any, idx: number) => (
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
            checked={chkAptRh2o}
            onChange={(e: any) => setChkAptRh2o(e.target.checked)}
            style={someStyle}
          />

          <Select
            disabled={!chkAptRh2o}
            {...register("aptRh2O")}
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
            checked={chkAptRdangaType}
            onChange={(e: any) => setChkAptRdangaType(e.target.checked)}
            style={someStyle}
          />

          <Select
            disabled={!chkAptRdangaType}
            width={InputSize.i120}
            value={aptRdangaType}
            onChange={(e) => {
              setAptRdangaType(e.target.value);
              calcRdanga("aptRdangaType", e.target.value);
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

          {showRdanga()}
        </FormGroup>
        <FormGroup>
          <CheckBox
            title="관리비"
            checked={chkAptAnkum}
            onChange={(e: any) => setChkAptAnkum(e.target.checked)}
            style={someStyle}
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
            checked={chkAptSisulkum}
            onChange={(e: any) => setChkAptSisulkum(e.target.checked)}
            style={someStyle2}
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
            checked={chkAptMeterkum}
            onChange={(e: any) => setChkAptMeterkum(e.target.checked)}
            style={someStyle}
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
            checked={chkAptPer}
            onChange={(e: any) => setChkAptPer(e.target.checked)}
            style={someStyle}
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
            checked={chkAptGumdate}
            onChange={(e: any) => setChkAptGumdate(e.target.checked)}
            style={someStyle2}
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
            checked={chkAptSukumtype}
            onChange={(e: any) => setChkAptSukumtype(e.target.checked)}
            style={someStyle}
          />

          <Select
            {...register("aptSukumtype")}
            width={InputSize.i120}
            disabled={!chkAptSukumtype}
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
