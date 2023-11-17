import React, { useImperativeHandle, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { apiPost, apiGet } from "app/axios";
import { useGetCommonDictionaryMutation } from "app/api/commonDictionary";
import { EN1100INSERT, EN1100UPDATE, EN1100DELETE, EN110011 } from "app/path";
import {
  Input,
  Select,
  FormGroup,
  Divider,
  Label,
  CustomForm,
} from "components/form/style";
import CheckBox from "components/checkbox";
import DaumAddress from "components/daum";
import { IJNOTRY, emptyObj } from "./model";
import PlainTab from "components/plainTab";
import { TabContentWrapper } from "components/plainTab/style";
import getTabContent from "./getTabContent";
import { InputSize } from "components/componentsType";

interface IForm {
  selected: any;
  fetchData: any;
  isAddBtnClicked: boolean;
  setIsAddBtnClicked: Function;
  resetButtonCombination: Function;
}

const Form = React.forwardRef(
  (
    {
      selected,
      fetchData,
      isAddBtnClicked,
      setIsAddBtnClicked,
      resetButtonCombination,
    }: IForm,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const [tabId, setTabId] = useState(0);
    const [jnAddr1, setJnAddr1] = useState("");
    const [addr, setAddress] = useState<string>("");

    const [getCommonDictionary, { data: dataCommonDic }] =
      useGetCommonDictionaryMutation();

    const { register, handleSubmit, reset, control, getValues, setFocus } =
      useForm<IJNOTRY>({
        mode: "onChange",
      });

    useEffect(() => {
      getCommonDictionary({ groupId: "EN", functionName: "EN1100" });
    }, []);

    useEffect(() => {
      if (addr.length > 0) {
        reset((formValues: any) => ({
          ...formValues,
          jnZipcode: addr ? addr?.split("/")[1] : "",
          jnAddr2: "",
        }));

        setJnAddr1(addr ? addr?.split("/")[0] : "");
      }
    }, [addr]);

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      crud,
      resetForm,
    }));

    const resetForm = async (type: string) => {
      if (type === "clear") {
        const res = await apiGet(EN110011);
        if (res) {
          setFocus("areaName");
          setJnAddr1("");
          reset({
            ...emptyObj,
            ...res,
            areaCode: res.tempCode,
            jnSekumea: res.jnSekumea === "Y",
            jnSegongYn: res.jnSegongYn === "Y",
            jnVatSumyn: res.jnVatSumyn === "Y",
          });
        } else {
          resetButtonCombination();
        }
        return;
      }

      if (type === "reset") {
        if (selected !== undefined && Object.keys(selected)?.length > 0) {
          setJnAddr1(selected?.jnAddr1 ? selected?.jnAddr1 : "");
          reset({
            ...selected,
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
        const res = await apiPost(EN1100DELETE, formValues, "삭제하였습니다");
        res && (await fetchData());
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
      formValues.jnAddr1 = jnAddr1;

      const res = await apiPost(path, formValues, "저장이 성공하였습니다");

      if (res) {
        if (isAddBtnClicked) {
          setIsAddBtnClicked(false);
          await fetchData("last");
        } else {
          await fetchData();
        }
      }
    };

    return (
      <CustomForm
        onSubmit={handleSubmit(submit)}
        style={{
          padding: "6px 7px 0 10px",
          width: "1225px",
        }}
        autoComplete="off"
      >
        <FormGroup>
          <Input
            label="영업소 코드"
            register={register("areaCode")}
            readOnly={!isAddBtnClicked}
            inputSize={InputSize.i150}
          />
          <Input
            label="영업소명"
            register={register("areaName")}
            maxLength="20"
            inputSize={InputSize.i200}
          />
        </FormGroup>
        <Divider />
        <FormGroup>
          <Controller
            control={control}
            name="jnSsno"
            render={({ field }) => (
              <Input
                {...field}
                label="사업자 번호"
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
                inputSize={InputSize.i120}
              />
            )}
          />
          <Input
            label="상 호"
            register={register("jnSangho")}
            maxLength="50"
            inputSize={InputSize.i500}
            labelStyle={{ minWidth: "70px" }}
          />
          <Input
            label="대 표"
            register={register("jnSajang")}
            maxLength="20"
            inputSize={InputSize.i300}
            labelStyle={{ minWidth: "70px" }}
          />
        </FormGroup>

        <FormGroup>
          <Input
            label="주 소"
            register={register("jnZipcode")}
            inputSize={InputSize.i90}
          />
          <DaumAddress
            setAddress={setAddress}
            defaultValue={jnAddr1}
            onClose={() => setFocus("jnAddr2")}
          />
          <Input
            maxLength="60"
            style={{ width: "950px" }}
            value={jnAddr1}
            onChange={(e: any) => setJnAddr1(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Input
            label=""
            register={register("jnAddr2")}
            maxLength="60"
            style={{ width: "1072px" }}
          />
        </FormGroup>

        <FormGroup>
          <Input
            label="업 태"
            register={register("jnUptae")}
            style={{ minWidth: "488px" }}
            maxLength="50"
          />
          <Input
            label="종 목"
            labelStyle={{ minWidth: "90px" }}
            register={register("jnJongmok")}
            style={{ minWidth: "488px" }}
            maxLength="50"
          />
        </FormGroup>

        <FormGroup>
          <Input
            label="대표전화"
            register={register("jnTel1")}
            inputSize={InputSize.i190}
            maxLength="14"
          />
          <Input
            label="대표전화 2"
            labelStyle={{ minWidth: "102px" }}
            register={register("jnTel2")}
            inputSize={InputSize.i190}
            maxLength="14"
          />

          <Input
            label="팩 스"
            labelStyle={{ minWidth: "90px" }}
            register={register("jnFax")}
            inputSize={InputSize.i190}
            maxLength="14"
          />
        </FormGroup>
        <Divider />

        <FormGroup>
          <Input
            label="안전관리 총괄자"
            register={register("jnAnname1")}
            inputSize={InputSize.i190}
            maxLength="10"
          />
          <Controller
            control={control}
            name="jnAntel1"
            render={({ field }) => (
              <Input
                {...field}
                label="전화"
                inputSize={InputSize.i190}
                maxLength="14"
                labelStyle={{ minWidth: "102px" }}
              />
            )}
          />
        </FormGroup>
        <FormGroup>
          <Input
            label="안전관리 책임자"
            register={register("jnAnname2")}
            inputSize={InputSize.i190}
            maxLength="10"
          />
          <Controller
            control={control}
            name="jnAntel2"
            render={({ field }) => (
              <Input
                {...field}
                label="전화"
                labelStyle={{ minWidth: "102px" }}
                inputSize={InputSize.i190}
                maxLength="14"
              />
            )}
          />
        </FormGroup>
        <Divider />

        <FormGroup>
          <Label>세금계산서 양식</Label>
          <Select register={register("jnSekum")} width={InputSize.i150}>
            {dataCommonDic?.jnSekum?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code1}>
                {obj.codeName}
              </option>
            ))}
          </Select>

          <CheckBox
            register={register("jnSegongYn")}
            title="공급사업자 인쇄안함"
            style={{ marginLeft: "30px" }}
          />

          <CheckBox
            register={register("jnVatSumyn")}
            title="Vat 별도 단가계산"
            style={{ marginLeft: "30px" }}
          />

          <CheckBox
            register={register("jnSekumea")}
            title="수량 단가 인쇄 유무"
            style={{ marginLeft: "30px" }}
          />
        </FormGroup>

        <FormGroup>
          <Label>거래명세표 양식</Label>
          <Select register={register("jnJangbu")} width={InputSize.i150}>
            {dataCommonDic?.jnJangbu?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code1}>
                {obj.codeName}
              </option>
            ))}
          </Select>

          <Controller
            control={control}
            name="jnCMngNo"
            render={({ field }) => (
              <Input
                {...field}
                labelStyle={{ width: "260px" }}
                label="탱크잔량/원격검침 발신기 업체번호"
                mask={[/\d/, /\d/, /\d/, /\d/]}
                inputSize={InputSize.i60}
              />
            )}
          />
        </FormGroup>

        <FormGroup>
          <Label>가상 계좌 서비스</Label>
          <Select register={register("jnVirtualAcc")} width={InputSize.i150}>
            {dataCommonDic?.jnVirtualAcc?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code1}>
                {obj.codeName}
              </option>
            ))}
          </Select>

          <Label style={{ marginLeft: "5px" }}>계좌 자동이체</Label>
          <Select register={register("jnBankCms")} style={{ width: "165px" }}>
            {dataCommonDic?.jnBankCms?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code1}>
                {obj.codeName}
              </option>
            ))}
          </Select>

          <Label>카드 자동이체</Label>
          <Select register={register("jnCardCms")} width={InputSize.i90}>
            {dataCommonDic?.jnCardCms?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code1}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>

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
          <TabContentWrapper style={{ minHeight: "221px" }}>
            {getTabContent(tabId, register, dataCommonDic?.jnJiro)}
          </TabContentWrapper>
        </div>
      </CustomForm>
    );
  }
);

export default Form;
