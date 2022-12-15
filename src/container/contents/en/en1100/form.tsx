import React, { useImperativeHandle, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import API from "app/axios";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { EN1100INSERT, EN1100UPDATE, EN1100DELETE, EN110011 } from "app/path";
import {
  Input,
  Select,
  Field,
  ErrorText,
  FormGroup,
  Wrapper,
  Divider,
  Label,
} from "components/form/style";
import CheckBox from "components/checkbox";
import DaumAddress from "components/daum";
import { IJNOTRY } from "./model";
import { schema } from "./validation";
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
    console.log(dataCommonDic);
    console.log(selected);

    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
      control,
      getValues,
    } = useForm<IJNOTRY>({
      mode: "onChange",
      resolver: yupResolver(schema),
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
            jnSekumEa: selected?.jnSekumEa === "Y",
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
            toast.success("삭제했습니다", {
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
      formValues.jnSekumEa = formValues.jnSekumEa ? "Y" : "N";

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
      <form
        className="form_control"
        onSubmit={handleSubmit(submit)}
        style={{ padding: "0px 10px" }}
      >
        <Wrapper grid>
          <Input
            label="코드"
            register={register("areaCode")}
            errors={errors["areaCode"]?.message}
            fullWidth
            maxLength="2"
            readOnly={isAddBtnClicked}
          />
          <Input
            label="영업소명"
            register={register("areaName")}
            errors={errors["areaName"]?.message}
            maxLength="20"
          />
        </Wrapper>
        <Divider />
        <Wrapper grid>
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
              />
            )}
          />
          <Input
            label="상호"
            register={register("jnSangho")}
            errors={errors["jnSangho"]?.message}
            maxLength="26"
          />
          <Input
            label="대표"
            register={register("jnSajang")}
            errors={errors["jnSajang"]?.message}
            maxLength="14"
          />
        </Wrapper>
        <Wrapper style={{ alignItems: "center" }}>
          <Input
            label="주소"
            register={register("jnZipcode")}
            errors={errors["jnZipcode"]?.message}
            maxLength="6"
          />
          <DaumAddress setAddress={setAddress} />
          <Input
            register={register("jnAddr1")}
            errors={errors["jnAddr1"]?.message}
            fullWidth
            maxLength="40"
          />
        </Wrapper>
        <Wrapper>
          <Input
            label=""
            register={register("jnAddr2")}
            errors={errors["jnAddr2"]?.message}
            fullWidth
            maxLength="40"
          />
        </Wrapper>
        <Wrapper>
          <Input
            label="업태"
            register={register("jnUptae")}
            errors={errors["jnUptae"]?.message}
            fullWidth
            maxLength="50"
          />
          <Input
            label="종목"
            register={register("jnJongmok")}
            errors={errors["jnJongmok"]?.message}
            fullWidth
            maxLength="50"
          />
        </Wrapper>
        <Wrapper grid>
          <Input
            label="대표전화"
            register={register("jnTel1")}
            errors={errors["jnTel1"]?.message}
            maxLength="14"
          />
          <Input
            label="대표전화2"
            register={register("jnTel2")}
            errors={errors["jnTel2"]?.message}
            maxLength="14"
          />

          <Input
            label="팩스"
            register={register("jnFax")}
            errors={errors["jnFax"]?.message}
            maxLength="14"
          />
        </Wrapper>
        <Divider />
        <Wrapper grid>
          <Input
            label="안전관리 총괄자"
            register={register("jnAnname1")}
            errors={errors["jnAnname1"]?.message}
            maxLength="10"
          />
          {/* <Input
            label="전화----"
            register={register("jnAntel1")}
            errors={errors["jnAntel1"]?.message}
            maxLength="14"
          /> */}

          <Controller
            control={control}
            {...register("jnAntel1")}
            render={({ field: { onChange, value, name } }) => (
              <Input
                label="전화"
                value={value}
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
        <Wrapper grid>
          <Input
            label="안전관리 책임자"
            register={register("jnAnname2")}
            errors={errors["jnAnname2"]?.message}
            maxLength="10"
          />
          {/* <Input
            label="전화"
            register={register("jnAntel2")}
            errors={errors["jnAntel2"]?.message}
            maxLength="14"
          /> */}

          <Controller
            control={control}
            {...register("jnAntel2")}
            render={({ field: { onChange, value, name } }) => (
              <Input
                label="전화"
                value={value}
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
        <Divider />
        <Wrapper grid col={2} style={{ gridTemplateColumns: " 2fr 4fr" }}>
          <Field>
            <FormGroup>
              <Label>세금계산서 양식</Label>
              <Select {...register("jnSekum")}>
                {dataCommonDic?.jnSekum?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code1}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <div>
              <ErrorText>{errors["jnSekum"]?.message}</ErrorText>
            </div>
          </Field>
          <Wrapper grid col={3}>
            <Field>
              <FormGroup>
                <CheckBox
                  register={{ ...register("jnSegongYn") }}
                  title="공급사업자 인쇄안함"
                />
              </FormGroup>
              <div>
                <ErrorText>{errors["jnSegongYn"]?.message}</ErrorText>
              </div>
            </Field>
            <Field>
              <FormGroup>
                <CheckBox
                  register={{ ...register("jnVatSumyn") }}
                  title="Vat 별도 단가계산"
                />
              </FormGroup>
              <div>
                <ErrorText>{errors["jnVatSumyn"]?.message}</ErrorText>
              </div>
            </Field>
            <Field>
              <FormGroup>
                <CheckBox
                  register={{ ...register("jnSekumEa") }}
                  title="수량 단가 인쇄 유무"
                />
              </FormGroup>
              <div>
                <ErrorText>{errors["jnSekumEa"]?.message}</ErrorText>
              </div>
            </Field>
          </Wrapper>
        </Wrapper>
        <Wrapper>
          <Field>
            <FormGroup>
              <Label>거래명세표 양식</Label>
              <Select {...register("jnJangbu")}>
                {dataCommonDic?.jnJangbu?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code1}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <div>
              <ErrorText>{errors["jnJangbu"]?.message}</ErrorText>
            </div>
          </Field>
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
          {/* <Input
            label="탱크잔량/원격검침 발신기 업체번호"
            labelLong
            register={register("jnCMngNo")}
            errors={errors["jnCMngNo"]?.message}
            textAlign="right"
            maxLength="4"
          /> */}

          <Field>
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
            <div>
              <ErrorText>{errors["jnVirtualAcc"]?.message}</ErrorText>
            </div>
          </Field>
          <Field>
            <FormGroup>
              <Label>계좌 자동이체</Label>
              <Select {...register("jnBankCms")} width={InputSize.i100}>
                {dataCommonDic?.jnBankCms?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code1}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <div>
              <ErrorText>{errors["jnBankCms"]?.message}</ErrorText>
            </div>
          </Field>
          <Field>
            <FormGroup>
              <Label>카드 자동이체</Label>
              <Select {...register("jnCardCms")} width={InputSize.i130}>
                {dataCommonDic?.jnCardCms?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code1}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <div>
              <ErrorText>{errors["jnCardCms"]?.message}</ErrorText>
            </div>
          </Field>
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
          />
          <TabContentWrapper>
            {getTabContent(tabId, register, errors, dataCommonDic?.jnJiro)}
          </TabContentWrapper>
        </div>
      </form>
    );
  }
);

export default Form;
