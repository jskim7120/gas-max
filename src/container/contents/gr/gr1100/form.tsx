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
import { ISANGPUM, IForm, emptyObj } from "./model";
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
import { removeCommas } from "helpers/currency";

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
      areaCode,
      setAreaCode,
      isAddBtnClicked,
      setIsAddBtnClicked,
      setIsCancelBtnDisabled,
    }: IForm,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const [addr, setAddress] = useState<string>("");
    const [tableData, setTableData] = useState(null);
    const [buPsum, setBuPsum] = useState<number>(0);
    const [buBsum, setBuBsum] = useState<number>(0);
    const [buBlsum, setBuBlsum] = useState<number>(0);

    const { data: dataCommonDic } = useGetCommonDictionaryQuery({
      groupId: "GR",
      functionName: "GR1100",
    });
    const { register, handleSubmit, reset, control, getValues, watch } =
      useForm<ISANGPUM>({
        mode: "onChange",
      });

    const watcher = watch();

    useEffect(() => {
      if (
        watcher?.buPdanga ||
        watcher?.buPcost ||
        watcher?.buBdanga ||
        watcher?.buBcost ||
        watcher?.buBldanga ||
        watcher?.buBlcost
      ) {
        const buPdanga: number = watcher?.buPdanga
          ? +removeCommas(watcher?.buPdanga, "number")
          : 0;

        const buPcost: number = watcher?.buPcost
          ? +removeCommas(watcher?.buPcost, "number")
          : 0;
        const s1: number = buPdanga + buPcost;
        setBuPsum(s1);

        const buBdanga: number = watcher?.buBdanga
          ? +removeCommas(watcher?.buBdanga, "number")
          : 0;

        const buBcost: number = watcher?.buBcost
          ? +removeCommas(watcher?.buBcost, "number")
          : 0;

        const s2: number = buBdanga + buBcost;
        setBuBsum(s2);

        const buBldanga: number = watcher?.buBldanga
          ? +removeCommas(watcher?.buBldanga, "number")
          : 0;

        const buBlcost: number = watcher?.buBlcost
          ? +removeCommas(watcher?.buBlcost, "number")
          : 0;

        const s3: number = buBldanga + buBlcost;
        setBuBlsum(s3);
      }
    }, [
      watcher?.buPdanga,
      watcher?.buPcost,
      watcher.buBdanga,
      watcher.buBcost,
      watcher.buBldanga,
      watcher.buBlcost,
    ]);

    useEffect(() => {
      if (selected && Object.keys(selected).length > 0) {
        resetForm("reset");
        setIsAddBtnClicked(false);
        fetchTableData();
      }
    }, [selected]);

    useEffect(() => {
      if (addr.length > 0) {
        reset((formValues: any) => ({
          ...formValues,
          buZipcode: addr ? addr?.split("/")[1] : "",
          buAddr1: addr ? addr?.split("/")[0] : "",
        }));
      }
    }, [addr]);

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      crud,
      resetForm,
    }));

    const fetchCodes = async () => {
      try {
        const response: any = await API.get(GR1100INSERTSEQ, {
          params: { areaCode: areaCode },
        });

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
      return "";
    };

    const resetForm = async (type: string) => {
      if (type === "clear") {
        const buCode = await fetchCodes();
        reset({
          ...emptyObj,
          buCode: buCode,
          buGubun: radioOptions[0].id,
          buStae: dataCommonDic?.buStae[0].code,
        });

        setBuPsum(0);
        setBuBsum(0);
        setBuBlsum(0);

        document.getElementById("buName")?.focus();
      }

      if (type === "reset" && selected && Object.keys(selected).length > 0) {
        reset({
          ...selected,
        });
      }
    };
    const crud = async (type: string | null) => {
      if (type === "delete") {
        const formValues = getValues();

        try {
          const response = await API.post(GR1100DELETE, {
            areaCode: formValues.areaCode,
            buCode: formValues.buCode,
          });

          if (response.status === 200) {
            toast.success("삭제하였습니다", {
              autoClose: 500,
            });

            fetchData({ areaCode: areaCode });
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

      formValues.areaCode = isAddBtnClicked ? areaCode : formValues.areaCode;

      formValues.buMisu =
        formValues.buMisu && +removeCommas(formValues.buMisu, "number");
      formValues.buPdanga =
        formValues.buPdanga && +removeCommas(formValues.buPdanga, "number");
      formValues.buPcost =
        formValues.buPcost && +removeCommas(formValues.buPcost, "number");
      formValues.buBdanga =
        formValues.buBdanga && +removeCommas(formValues.buBdanga, "number");
      formValues.buBcost =
        formValues.buBcost && +removeCommas(formValues.buBcost, "number");
      formValues.buBldanga =
        formValues.buBldanga && +removeCommas(formValues.buBldanga, "number");
      formValues.buBlcost =
        formValues.buBlcost && +removeCommas(formValues.buBlcost, "number");

      try {
        const response: any = await API.post(path, formValues);

        if (response.status === 200) {
          /*
          if (isAddBtnClicked) {
            //setData((prev: any) => [formValues, ...prev]);
            setSelectedRowIndex(0);
          } else {
            setData((prev: any) => {
              prev[selectedRowIndex] = formValues;
              return [...prev];
            });
          }
          */

          fetchData({ areaCode: areaCode });
          //setSelected(formValues);
          toast.success("저장이 성공하였습니다", {
            autoClose: 500,
          });
          setIsAddBtnClicked(false);
          setIsCancelBtnDisabled(true);
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
      if (selected && Object.keys(selected).length > 0) {
        try {
          const { data: tableData } = await API.get(GR110065, {
            params: {
              areaCode: selected.areaCode,
            },
          });
          if (tableData) {
            setTableData(tableData);
          } else {
            setTableData(null);
          }
        } catch (err) {}
      }
    };

    return (
      <form autoComplete="off" style={{ padding: "0px 10px", width: "745px" }}>
        <PersonInfoText
          text="매입처 정보"
          style={{ marginBottom: "6px", marginTop: "7px" }}
        />
        <Divider />
        <Wrapper grid col={2}>
          <Input
            label="매입처 코드"
            register={register("buCode")}
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
            <Label>거래 상태</Label>
            <Select register={register("buStae")} width={InputSize.i130}>
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
            inputSize={InputSize.i130}
          />
        </Wrapper>

        <Wrapper grid col={2}>
          <Input
            label="비 고"
            register={register("buBigo")}
            style={{ width: "493px" }}
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
                inputSize={InputSize.i150}
              />
            )}
          />
          <Input
            label="종사업장"
            register={register("buRCode")}
            inputSize={InputSize.i130}
            maxLength="4"
          />
        </Wrapper>
        <Wrapper grid col={2}>
          <Input
            label="상 호"
            register={register("buSangho")}
            inputSize={InputSize.i150}
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
            label="주 소"
            register={register("buZipcode")}
            inputSize={InputSize.i80}
          />
          <DaumAddress setAddress={setAddress} />
          <Input register={register("buAddr1")} style={{ width: "381px" }} />
        </Wrapper>
        <Wrapper>
          <Label></Label>
          <Input register={register("buAddr2")} style={{ width: "493px" }} />
        </Wrapper>
        <Wrapper grid col={2}>
          <Input
            label="업 태"
            register={register("buUptae")}
            inputSize={InputSize.i150}
          />
          <Input
            label="종 목"
            register={register("buJongmok")}
            inputSize={InputSize.i130}
          />
        </Wrapper>
        <Wrapper grid col={2}>
          <Input
            label="담당자명"
            register={register("buDamdang")}
            inputSize={InputSize.i150}
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
            inputSize={InputSize.i150}
          />
          <FormGroup>
            <p>@</p>
            <Select register={register("emailKind")} width={InputSize.i120}>
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
            label="결재 은행"
            register={register("buBank")}
            inputSize={InputSize.i150}
          />
          <Input
            label="계좌 번호"
            register={register("buBankno")}
            inputSize={InputSize.i130}
          />
        </Wrapper>
        <Wrapper grid col={2}>
          <Input
            label="예금주"
            register={register("buBankju")}
            inputSize={InputSize.i150}
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
          tableData={tableData}
          control={control}
          register={register}
          buPsum={buPsum}
          buBsum={buBsum}
          buBlsum={buBlsum}
        />
      </form>
    );
  }
);

export default Form;
