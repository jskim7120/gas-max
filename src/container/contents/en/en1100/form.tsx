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
  isAddBtnClicked: boolean;
  setIsAddBtnClicked: Function;
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
      isAddBtnClicked,
      setIsAddBtnClicked,
    }: IForm,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const [tabId, setTabId] = useState(0);
    const [zipcode, setZipcode] = useState("");
    const [addr, setAddress] = useState<string>("");
    const { data: dataCommonDic } = useGetCommonDictionaryQuery({
      groupId: "EN",
      functionName: "EN1100",
    });

    const { register, handleSubmit, reset, control, getValues, setFocus } =
      useForm<IJNOTRY>({
        mode: "onChange",
      });

    // useEffect(() => {
    //   function handleKeyDown(event: any) {
    //     if (event.key === "F1") {
    //       event.preventDefault();
    //       alert("F1");
    //       // crud(null);
    //     }
    //     if (event.key === "F2") {
    //       // event.stopPropagation();
    //       event.preventDefault();
    //       alert("F2");
    //     }
    //     if (event.key === "F3") {
    //       alert("F3");
    //       event.preventDefault();
    //     }
    //     if (event.key === "F4") {
    //       alert("F4");
    //     }
    //     if (event.key === "Escape" || event.key === "Esc") {
    //       alert("escape");
    //       event.preventDefault();
    //     }
    //   }
    //   document.addEventListener("keydown", handleKeyDown);
    //   return () => {
    //     document.removeEventListener("keydown", handleKeyDown);
    //   };
    // }, []);

    useEffect(() => {
      if (addr.length > 0) {
        reset({
          jnAddr1: addr ? addr?.split("/")[0] : "",
        });
        setZipcode(addr ? addr?.split("/")[1] : "");
      }
    }, [addr]);

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      crud,
      resetForm,
    }));

    const resetForm = async (type: string) => {
      if (selected !== undefined && JSON.stringify(selected) !== "{}") {
        let newData: any = {};

        if (type === "clear") {
          setFocus("areaName");
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
              setZipcode("");
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

          setZipcode(selected?.jnZipcode);

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
            await fetchData("delete");
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
            setIsAddBtnClicked(false);
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
        } else {
          //  toast.error(response?.response?.data?.message, { autoClose: 500 });
          alert(response?.response?.data?.message);
        }
      } catch (err: any) {
        // toast.error(err?.message, { autoClose: 500 });
        alert(err?.message);
      }
    };

    const ggg = () => {
      setFocus("jnAddr2");
    };
    return (
      <form onSubmit={handleSubmit(submit)} style={{ padding: "0px 12px" }}>
        <Wrapper grid col={3}>
          <Input
            label="영업소 코드"
            register={register("areaCode")}
            readOnly={true}
            inputSize={InputSize.i150}
          />
          <Input
            label="영업소명"
            register={register("areaName")}
            maxLength="20"
            inputSize={InputSize.i150}
            readOnly={!isAddBtnClicked}
            // onKeyDown={handleKeyPress}
          />
        </Wrapper>

        <Divider />

        <Wrapper grid col={3}>
          <Controller
            control={control}
            {...register("jnSsno")}
            render={({ field: { onChange, value, name } }) => (
              <Input
                label="사업자 번호"
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
            label="상 호"
            // labelStyle={{ minWidth: "50px" }}
            register={register("jnSangho")}
            maxLength="26"
            inputSize={InputSize.i150}
          />
          <Input
            label="대 표"
            // labelStyle={{ minWidth: "50px" }}
            register={register("jnSajang")}
            maxLength="14"
            inputSize={InputSize.i90}
          />
        </Wrapper>

        <Wrapper style={{ alignItems: "center" }}>
          <Input
            label="주 소"
            // register={register("jnZipcode")}
            maxLength="6"
            inputSize={InputSize.i150}
            style={{ marginRight: "7px" }}
            value={zipcode}
            onChange={(e: any) => setZipcode(e.target.value)}
          />
          <DaumAddress
            setAddress={setAddress}
            defaultValue={zipcode}
            onClose={ggg}
          />
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
            label="업 태"
            register={register("jnUptae")}
            inputSize={InputSize.i150}
            maxLength="50"
          />
          <Input
            label="종 목"
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
            label="대표전화 2"
            // labelStyle={{ minWidth: "80px" }}
            register={register("jnTel2")}
            inputSize={InputSize.i150}
            maxLength="14"
          />

          <Input
            label="팩 스"
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
            <Select register={register("jnSekum")} width={InputSize.i150}>
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
            <Select register={register("jnJangbu")} width={InputSize.i150}>
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
            <Select register={register("jnVirtualAcc")} width={InputSize.i150}>
              {dataCommonDic?.jnVirtualAcc?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code1}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            <Label style={{ marginLeft: "5px" }}>계좌 자동이체</Label>
            <Select register={register("jnBankCms")} style={{ width: "165px" }}>
              {dataCommonDic?.jnBankCms?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code1}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>카드 자동이체</Label>
            <Select register={register("jnCardCms")} width={InputSize.i90}>
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
              "고객 안내문",
              "입금계좌 안내",
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
