import React, { useImperativeHandle, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import API from "app/axios";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { EN1100INSERT, EN1100UPDATE, EN1100DELETE, EN110011 } from "app/path";
import {
  Input,
  Select,
  Field,
  FormGroup,
  Wrapper,
  Divider,
  Label,
} from "components/form/style";
import CheckBox from "components/checkbox";
import DaumAddress from "components/daum";
import { IJNOTRY } from "./model";
import PlainTab from "components/plainTab";
import { TabContentWrapper } from "components/plainTab/style";
import getTabContent from "./getTabContent";
import { InputSize } from "components/componentsType";

interface IForm {
  selected: any;
  fetchData: any;
  setData: any;
  selectedRowIndex: number;
  setSelected: any;
  setSelectedRowIndex: any;
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
    }: IForm,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);
    const [tabId, setTabId] = useState(0);
    const [addr, setAddress] = useState<string>("");
    const { data: dataCommonDic } = useGetCommonDictionaryQuery({
      groupId: "EN",
      functionName: "EN1100",
    });

    const { register, handleSubmit, reset, control, getValues } =
      useForm<IJNOTRY>({
        mode: "onChange",
      });

    useEffect(() => {
      if (JSON.stringify(selected) !== "{}") {
        resetForm("reset");
      }
    }, [selected]);

    useEffect(() => {
      if (addr.length > 0) {
        reset({
          jnZipcode: addr ? addr?.split("/")[1] : "",
          jnAddr1: addr ? addr?.split("/")[0] : "",
        });
      }
    }, [addr]);

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      crud,
      resetForm,
      setIsAddBtnClicked,
    }));

    const resetForm = async (type: string) => {
      if (selected !== undefined && JSON.stringify(selected) !== "{}") {
        let newData: any = {};

        if (type === "clear") {
          document.getElementById("areaName")?.focus();
          const path = EN110011;
          try {
            const response: any = await API.get(path, {
              params: { areaCode: selected.areaCode },
            });
            if (response.status === 200) {
              for (const [key, value] of Object.entries(selected)) {
                newData[key] = null;
              }
              newData.areaCode = response.data.tempCode;
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
            jnSekumea: selected?.jnSekumea === "Y",
            jnSegongYn: selected?.jnSegongYn === "Y",
            jnVatSumyn: selected?.jnVatSumyn === "Y",
          });
        }
      }
    };

    const crud = async (type: string | null) => {
      if (type === "delete") {
        const formValues = getValues();
        try {
          const response: any = await API.post(EN1100DELETE, formValues);

          if (response.status === 200) {
            toast.success("삭제하였습니다", {
              autoClose: 500,
            });
            await fetchData();
          } else {
            toast.error(response?.response?.message, {
              autoClose: 500,
            });
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

    const submit = async (data: IJNOTRY) => {
      //form aldaagui uyd ajillana
      const path = isAddBtnClicked ? EN1100INSERT : EN1100UPDATE;
      const formValues = getValues();

      formValues.jnSegongYn = formValues.jnSegongYn ? "Y" : "N";
      formValues.jnVatSumyn = formValues.jnVatSumyn ? "Y" : "N";
      formValues.jnSekumea = formValues.jnSekumea ? "Y" : "N";

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
          setIsAddBtnClicked(false);
          toast.success("저장이 성공하였습니다", {
            autoClose: 500,
          });
        } else {
          toast.error(response?.response?.data?.message, { autoClose: 500 });
        }
      } catch (err: any) {
        toast.error(err?.message, { autoClose: 500 });
      }
    };

    return (
      <form onSubmit={handleSubmit(submit)} style={{ padding: "0px 10px" }}>
        <Wrapper grid col={3}>
          <Input
            label="코드"
            register={register("areaCode")}
            readOnly={isAddBtnClicked}
            inputSize={InputSize.i150}
          />
          <Input
            label="영업소명"
            register={register("areaName")}
            maxLength="20"
            inputSize={InputSize.i150}
          />
        </Wrapper>

        <Divider />

        <Wrapper grid col={3}>
          <Controller
            control={control}
            {...register("jnSsno")}
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
            label="상호"
            // labelStyle={{ minWidth: "50px" }}
            register={register("jnSangho")}
            maxLength="26"
            inputSize={InputSize.i150}
          />
          <Input
            label="대표"
            // labelStyle={{ minWidth: "50px" }}
            register={register("jnSajang")}
            maxLength="14"
            inputSize={InputSize.i90}
          />
        </Wrapper>

        <Wrapper style={{ alignItems: "center" }}>
          <Input
            label="주소"
            register={register("jnZipcode")}
            maxLength="6"
            inputSize={InputSize.i150}
            style={{ marginRight: "7px" }}
          />
          <DaumAddress setAddress={setAddress} />
          <Input
            register={register("jnAddr1")}
            maxLength="40"
            style={{ width: "453px", marginLeft: "6px" }}
          />
        </Wrapper>

        <Wrapper grid col={3}>
          <Input
            label=""
            register={register("jnAddr2")}
            maxLength="40"
            style={{ width: "642px" }}
          />
        </Wrapper>

        <Wrapper grid col={3}>
          <Input
            label="업태"
            register={register("jnUptae")}
            inputSize={InputSize.i150}
            maxLength="50"
          />
          <Input
            label="종목"
            // labelStyle={{ minWidth: "75px" }}
            register={register("jnJongmok")}
            inputSize={InputSize.i150}
            maxLength="50"
          />
        </Wrapper>

        <Wrapper grid col={3}>
          <Input
            label="대표전화"
            register={register("jnTel1")}
            inputSize={InputSize.i150}
            maxLength="14"
          />
          <Input
            label="대표전화2"
            // labelStyle={{ minWidth: "80px" }}
            register={register("jnTel2")}
            inputSize={InputSize.i150}
            maxLength="14"
          />

          <Input
            label="팩스"
            // labelStyle={{ minWidth: "80px" }}
            register={register("jnFax")}
            inputSize={InputSize.i90}
            maxLength="14"
          />
        </Wrapper>
        <Divider />

        <Wrapper grid col={3}>
          <Input
            label="안전관리 총괄자"
            register={register("jnAnname1")}
            inputSize={InputSize.i150}
            maxLength="10"
          />

          <Controller
            control={control}
            {...register("jnAntel1")}
            render={({ field: { onChange, value, name } }) => (
              <Input
                label="전화"
                value={value}
                name={name}
                inputSize={InputSize.i150}
                onChange={onChange}
                mask={[
                  /\d/,
                  /\d/,
                  /\d/,
                  "-",
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  "-",
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                ]}
              />
            )}
          />
        </Wrapper>

        <Wrapper grid col={3}>
          <Input
            label="안전관리 책임자"
            register={register("jnAnname2")}
            inputSize={InputSize.i150}
            maxLength="10"
          />

          <Controller
            control={control}
            {...register("jnAntel2")}
            render={({ field: { onChange, value, name } }) => (
              <Input
                label="전화"
                value={value}
                name={name}
                onChange={onChange}
                inputSize={InputSize.i150}
                mask={[
                  /\d/,
                  /\d/,
                  /\d/,
                  "-",
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  "-",
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                ]}
              />
            )}
          />
        </Wrapper>
        <Divider />

        <Wrapper grid col={2} style={{ gridTemplateColumns: " 2fr 4fr" }}>
          <FormGroup>
            <Label>세금계산서 양식</Label>
            <Select {...register("jnSekum")} width={InputSize.i150}>
              {dataCommonDic?.jnSekum?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code1}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>

          <Wrapper grid col={3} style={{ marginLeft: "12px" }}>
            <FormGroup>
              <CheckBox
                register={{ ...register("jnSegongYn") }}
                title="공급사업자 인쇄안함"
              />
            </FormGroup>

            <FormGroup style={{ marginLeft: "10px" }}>
              <CheckBox
                register={{ ...register("jnVatSumyn") }}
                title="Vat 별도 단가계산"
              />
            </FormGroup>

            <FormGroup>
              <CheckBox
                register={{ ...register("jnSekumea") }}
                title="수량 단가 인쇄 유무"
              />
            </FormGroup>
          </Wrapper>
        </Wrapper>

        <Wrapper>
          <FormGroup>
            <Label>거래명세표 양식</Label>
            <Select {...register("jnJangbu")} width={InputSize.i150}>
              {dataCommonDic?.jnJangbu?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code1}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>

          <Field style={{ marginLeft: "35px" }}>
            <Controller
              control={control}
              {...register("jnCMngNo")}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="탱크잔량/원격검침 발신기 업체번호"
                  value={value}
                  onChange={onChange}
                  mask={[/\d/, /\d/, /\d/, /\d/]}
                  inputSize={InputSize.i60}
                  name={name}
                />
              )}
            />
          </Field>
        </Wrapper>

        <Wrapper grid col={3}>
          <FormGroup>
            <Label>가상 계좌 서비스</Label>
            <Select {...register("jnVirtualAcc")} width={InputSize.i150}>
              {dataCommonDic?.jnVirtualAcc?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code1}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            <Label style={{ marginLeft: "5px" }}>계좌 자동이체</Label>
            <Select {...register("jnBankCms")} style={{ width: "165px" }}>
              {dataCommonDic?.jnBankCms?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code1}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>카드 자동이체</Label>
            <Select {...register("jnCardCms")} width={InputSize.i90}>
              {dataCommonDic?.jnCardCms?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code1}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
        </Wrapper>

        <div style={{ marginTop: "5px" }}>
          <PlainTab
            tabHeader={[
              "지로 양식",
              "고객안내문",
              "입금계좌  안내",
              "결재 라인",
            ]}
            onClick={(id) => setTabId(id)}
            tabId={tabId}
          />
          <TabContentWrapper>
            {getTabContent(tabId, register, dataCommonDic?.jnJiro)}
          </TabContentWrapper>
        </div>
      </form>
    );
  }
);

export default Form;
