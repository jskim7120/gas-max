import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DaumAddress from "components/daum";
import { useSelector, useDispatch } from "app/store";
import API from "app/axios";
import { schema } from "./validation";
import Button from "components/button/button";
import { ButtonColor } from "components/componentsType";
import { Plus, Trash, Update, Reset, WhiteClose } from "components/allSvgIcon";
import { ICM1105SEARCH } from "./model";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { closeModal, addCM1105 } from "app/state/modal/modalSlice";
import {
  Input,
  Select,
  Field,
  ErrorText,
  FormGroup,
  Wrapper,
  DividerGray,
  Divider,
  Label,
} from "components/form/style";

import CheckBox from "components/checkbox";
import PlainTab from "components/plainTab";
import { TabContentWrapper } from "components/plainTab/style";
import getTabContent from "./getTabContent";
import { CM1105INSERT, CM1105UPDATE } from "app/path";
import { toast } from "react-toastify";

function Form() {
  const [data, setData] = useState<any>(null);
  const [addr, setAddress] = useState<string>("");
  const [addr2, setAddress2] = useState<string>("");
  const [tabId, setTabId] = useState(0);
  const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);
  const dispatch = useDispatch();

  const cm1105 = useSelector((state) => state.modal.cm1105);
  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "CM",
    functionName: "CM1105",
  });
  // console.log("dataCommonDic:====>", dataCommonDic);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm<ICM1105SEARCH>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  // console.log("errors=================================>", errors);

  useEffect(() => {
    if (cm1105.areaCode && cm1105.cuCode) {
      fetchData();
    }
  }, [cm1105.areaCode, cm1105.cuCode]);

  useEffect(() => {
    if (data) {
      resetForm("reset");
    }
  }, [data]);

  const resetForm = (type: string) => {
    if (data !== undefined && data) {
      let newDataCustomerInfo: any = {};
      let newDataCms: any = {};
      let newDataVirtualAccount: any = {};
      let newDataCuTank: any = {};

      const customerInfo = data?.customerInfo ? data?.customerInfo[0] : {};
      const cms = data?.cms ? data?.cms[0] : {};
      const cuTank = data?.cuTank ? data?.cuTank[0] : {};
      const virtualAccount = data?.virturalAccoount
        ? data?.virturalAccoount[0]
        : {};

      // console.log("data==============>", data);
      // console.log("customerInfo==============>", customerInfo);
      // console.log("cms==============>", cms);
      // console.log("cuTank==============>", cuTank);
      // console.log("virtualAccount==============>", virtualAccount);

      if (type === "clear") {
        for (const [key, value] of Object.entries(customerInfo)) {
          newDataCustomerInfo[key] = null;
        }

        for (const [key, value] of Object.entries(cms)) {
          if (
            key === "acctno" ||
            key === "bankName" ||
            key === "depositor" ||
            key === "regDate"
          ) {
            newDataCms[`CMS${key}`] = null;
          }
          newDataCms[key] = null;
        }

        for (const [key, value] of Object.entries(virtualAccount)) {
          if (
            key === "acctno" ||
            key === "bankName" ||
            key === "depositor" ||
            key === "regDate"
          ) {
            newDataVirtualAccount[`VIR${key}`] = null;
          }
          newDataVirtualAccount[key] = null;
        }

        for (const [key, value] of Object.entries(cuTank)) {
          newDataCuTank[key] = null;
        }

        reset({
          ...newDataCustomerInfo,
          ...newDataCms,
          ...newDataVirtualAccount,
          ...newDataCuTank,
        });
      } else if (type === "reset") {
        for (const [key, value] of Object.entries(customerInfo)) {
          newDataCustomerInfo[key] = value;
        }

        for (const [key, value] of Object.entries(cms)) {
          if (
            key === "acctno" ||
            key === "bankName" ||
            key === "depositor" ||
            key === "regDate"
          ) {
            newDataCms[`CMS${key}`] = value;
          }
          newDataCms[key] = value;
        }

        for (const [key, value] of Object.entries(virtualAccount)) {
          if (
            key === "acctno" ||
            key === "bankName" ||
            key === "depositor" ||
            key === "regDate"
          ) {
            newDataVirtualAccount[`VIR${key}`] = value;
          }
          newDataVirtualAccount[key] = value;
        }

        for (const [key, value] of Object.entries(cuTank)) {
          newDataCuTank[key] = value;
        }

        reset({
          ...newDataCustomerInfo,
          ...newDataCms,
          ...newDataVirtualAccount,
          ...newDataCuTank,
          cuSekumyn: customerInfo?.cuSekumyn === "Y",
          cuJangbuYn: customerInfo?.cuJangbuYn === "Y",
          cuSvKumack: customerInfo?.cuSvKumack === "Y",
          cuSeSmsYn: customerInfo?.cuSeSmsYn === "Y",
          cuSeListYn: customerInfo?.cuSeListYn === "Y",
        });
      }
    }
  };

  // useEffect(() => {
  //   if (addr.length > 0) {
  //     reset({
  //       cuZipcode: addr ? addr?.split("/")[1] : "",
  //       cuAddr1: addr ? addr?.split("/")[0] : "",
  //     });
  //   }
  // }, [addr]);

  const fetchData = async () => {
    try {
      const { data } = await API.get("/app/CM1105/search", {
        params: { cuCode: cm1105.cuCode, areaCode: cm1105.areaCode },
      });
      setData(data);
    } catch (error) {
      console.log("aldaa");
    }
  };

  const submit = async (data: ICM1105SEARCH) => {
    const formValues = getValues();
    // formValues.jnSegongYn = formValues.jnSegongYn ? "Y" : "N";
    // formValues.jnVatSumyn = formValues.jnVatSumyn ? "Y" : "N";
    // formValues.jnSekumEa = formValues.jnSekumEa ? "Y" : "N";
    // formValues.niceBankYn = formValues.niceBankYn ? "Y" : "N";
    // formValues.innopayBankYn = formValues.innopayBankYn ? "Y" : "N";
    const path = isAddBtnClicked ? CM1105INSERT : CM1105UPDATE;
    try {
      const response: any = await API.post(path, formValues);
      if (response.status === 200) {
        toast.success("Action successful", {
          autoClose: 500,
        });
        setIsAddBtnClicked(false);
      } else {
        toast.error(response?.response?.data?.message);
      }
    } catch (err: any) {
      toast.error(err?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div
        style={{
          width: "100%",
          height: "35px",
          background: "#0B97F6",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 15px",
        }}
      >
        <Field flex style={{ alignItems: "center" }}>
          <p style={{ color: "#fff", fontSize: "14px" }}>거래처 정보</p>
          <Field>
            <FormGroup>
              <Label style={{ background: "transparent" }}>영업소</Label>
              <Select {...register("areaCode")}>
                {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
              <div>
                <ErrorText>{errors["areaCode"]?.message}</ErrorText>
              </div>
            </FormGroup>
          </Field>
        </Field>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            text="연속등록"
            icon={<Plus />}
            style={{ marginRight: "5px" }}
            type="button"
            onClick={() => {
              resetForm("clear");
              setIsAddBtnClicked(true);
            }}
          />
          <Button
            text="저장"
            icon={<Update />}
            style={{ marginRight: "5px" }}
            color={ButtonColor.SECONDARY}
            onClick={handleSubmit(submit)}
            type="button"
          />
          <Button
            text="취소"
            style={{ marginRight: "5px" }}
            icon={<Reset />}
            type="button"
            onClick={() => {
              resetForm("reset");
              setIsAddBtnClicked(false);
            }}
          />
          <span
            style={{ marginLeft: "10px", marginTop: "1px" }}
            onClick={() => {
              // dispatch(addCM1105({ cuCode: "", areaCode: "" }));
              dispatch(closeModal());
            }}
          >
            <WhiteClose />
          </span>
        </div>
      </div>
      <div style={{ padding: "12px" }}>
        <Divider />
        <Wrapper grid>
          <Input
            label="거래처코드"
            register={register("cuCode")}
            errors={errors["cuCode"]?.message}
          />
          <Input
            label="거래처명(건물명)"
            register={register("cuName")}
            errors={errors["cuName"]?.message}
          />
          <Input
            label="사용자명"
            register={register("cuUsername")}
            errors={errors["cuUsername"]?.message}
          />
        </Wrapper>
        <DividerGray />
        <Wrapper grid>
          <Input
            label="전화번호"
            register={register("cuTel")}
            errors={errors["cuTel"]?.message}
          />
          <Input
            register={register("cuTel21")}
            errors={errors["cuTel21"]?.message}
          />
          <Field>
            <FormGroup>
              <Label>거래구분</Label>
              <Select {...register("cuType")}>
                {dataCommonDic?.cuType?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <div>
              <ErrorText>{errors["cuType"]?.message}</ErrorText>
            </div>
          </Field>
        </Wrapper>
        <DividerGray />
        <Wrapper grid>
          <Input
            label="핸드폰"
            register={register("cuHp")}
            errors={errors["cuHp"]?.message}
          />
          <Input register={register("cuHp")} errors={errors["cuHp"]?.message} />
          <Field>
            <FormGroup>
              <Label>거래상태</Label>
              <Select {...register("cuStae")}>
                {dataCommonDic?.cuStae?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <div>
              <ErrorText>{errors["cuStae"]?.message}</ErrorText>
            </div>
          </Field>
        </Wrapper>
        <DividerGray />
        <Wrapper style={{ alignItems: "center" }}>
          <Input
            label="주소"
            register={register("cuZipcode")}
            errors={errors["cuZipcode"]?.message}
          />
          <DaumAddress setAddress={setAddress} />
          <Input
            register={register("cuAddr1")}
            errors={errors["cuAddr1"]?.message}
            fullWidth
          />
          <Input
            register={register("cuAddr2")}
            errors={errors["cuAddr2"]?.message}
            fullWidth
          />
        </Wrapper>
        <DividerGray />
        <Wrapper grid col={2}>
          <Input
            label="비고"
            register={register("cuBigo1")}
            errors={errors["cuBigo1"]?.message}
            fullWidth
          />
          <Input
            register={register("cuBigo2")}
            errors={errors["cuBigo2"]?.message}
            fullWidth
          />
        </Wrapper>
        <Divider />
        <Wrapper>
          <Input
            label="메모"
            register={register("cuMemo")}
            errors={errors["cuMemo"]?.message}
          />
        </Wrapper>
        <DividerGray />
        <Field
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "20px",
          }}
        >
          <Field style={{ width: "80%" }}>
            <Wrapper grid>
              <Field>
                <FormGroup>
                  <Label>담당사원</Label>
                  <Select {...register("cuSwCode")}>
                    {dataCommonDic?.cuSwCode?.map((obj: any, idx: number) => (
                      <option key={idx} value={obj.code}>
                        {obj.codeName}
                      </option>
                    ))}
                  </Select>
                </FormGroup>
                <div>
                  <ErrorText>{errors["cuSwCode"]?.message}</ErrorText>
                </div>
              </Field>

              <Field>
                <FormGroup>
                  <Label>지역분류</Label>
                  <Select {...register("cuJyCode")}>
                    {dataCommonDic?.cuJyCode?.map((obj: any, idx: number) => (
                      <option key={idx} value={obj.code}>
                        {obj.codeName}
                      </option>
                    ))}
                  </Select>
                </FormGroup>
                <div>
                  <ErrorText>{errors["cuJyCode"]?.message}</ErrorText>
                </div>
              </Field>
              <Field>
                <FormGroup>
                  <Label>관리자분류</Label>
                  <Select {...register("cuCustgubun")}>
                    {dataCommonDic?.cuCustgubun?.map(
                      (obj: any, idx: number) => (
                        <option key={idx} value={obj.code}>
                          {obj.codeName}
                        </option>
                      )
                    )}
                  </Select>
                </FormGroup>
                <div>
                  <ErrorText>{errors["cuCustgubun"]?.message}</ErrorText>
                </div>
              </Field>
            </Wrapper>
            <DividerGray />
            <Wrapper grid>
              <Field>
                <FormGroup>
                  <Label>소비자형태</Label>
                  <Select {...register("cuCutype")}>
                    {dataCommonDic?.cuCutype?.map((obj: any, idx: number) => (
                      <option key={idx} value={obj.code1}>
                        {obj.code1}
                      </option>
                    ))}
                  </Select>
                </FormGroup>
                <div>
                  <ErrorText>{errors["cuCutype"]?.message}</ErrorText>
                </div>
              </Field>
              <Input
                label="청구구분"
                register={register("cuRequestType")}
                errors={errors["cuRequestType"]?.message}
              />

              <Field>
                <FormGroup>
                  <Label>수금방법</Label>
                  <Select {...register("cuSukumtype")}>
                    {dataCommonDic?.cuSukumtype?.map(
                      (obj: any, idx: number) => (
                        <option key={idx} value={obj.code1}>
                          {obj.code1}
                        </option>
                      )
                    )}
                  </Select>
                </FormGroup>
                <div>
                  <ErrorText>{errors["cuSukumtype"]?.message}</ErrorText>
                </div>
              </Field>
            </Wrapper>
            <DividerGray />
            <Wrapper grid>
              <Field>
                <FormGroup>
                  <Label>품목단가</Label>
                  <Select {...register("cuJdc")}>
                    {dataCommonDic?.cuJdc?.map((obj: any, idx: number) => (
                      <option key={idx} value={obj.code1}>
                        {obj.code1}
                      </option>
                    ))}
                  </Select>
                </FormGroup>
                <div>
                  <ErrorText>{errors["cuJdc"]?.message}</ErrorText>
                </div>
              </Field>

              <Field>
                <FormGroup>
                  <Label>Vat 적용방법</Label>
                  <Select {...register("cuVatKind")}>
                    {dataCommonDic?.cuVatKind?.map((obj: any, idx: number) => (
                      <option key={idx} value={obj.code}>
                        {obj.codeName}
                      </option>
                    ))}
                  </Select>
                </FormGroup>
                <div>
                  <ErrorText>{errors["cuVatKind"]?.message}</ErrorText>
                </div>
              </Field>
              <Field>
                <FormGroup>
                  <Label>원미만금액계산</Label>
                  <Select {...register("cuRoundType")}>
                    {dataCommonDic?.cuRoundType?.map(
                      (obj: any, idx: number) => (
                        <option key={idx} value={obj.code}>
                          {obj.codeName}
                        </option>
                      )
                    )}
                  </Select>
                </FormGroup>
                <div>
                  <ErrorText>{errors["cuRoundType"]?.message}</ErrorText>
                </div>
              </Field>
            </Wrapper>
            <DividerGray />
            <Wrapper grid>
              <Field>
                <FormGroup>
                  <Label>계산서발행유무</Label>
                  <CheckBox register={{ ...register("cuSekumyn") }} />
                </FormGroup>
              </Field>
              <Field>
                <FormGroup>
                  <Label>장부사용유무</Label>
                  <CheckBox register={{ ...register("cuJangbuYn") }} />
                </FormGroup>
              </Field>
              <Input
                label="무료시설투자비"
                register={register("cuSvKumack")}
                errors={errors["cuSvKumack"]?.message}
                fullWidth
              />
            </Wrapper>
          </Field>
          <Field
            className="rectangle"
            style={{ width: "20%", marginLeft: "5px" }}
          >
            <FormGroup>
              <label>용기보증금</label>
              <Input
                register={register("cuTongkum")}
                errors={errors["cuTongkum"]?.message}
                textAlign="right"
              />
            </FormGroup>
            <FormGroup>
              <label>중량미수</label>
              <Input
                register={register("cuJmisu")}
                errors={errors["cuJmisu"]?.message}
                textAlign="right"
              />
            </FormGroup>
            <FormGroup>
              <label>체적미수</label>
              <Input
                register={register("cuCmisu")}
                errors={errors["cuCmisu"]?.message}
                textAlign="right"
              />
            </FormGroup>
          </Field>
        </Field>
        <Divider />
        <div style={{ marginTop: "30px" }}>
          <PlainTab
            tabHeader={[
              "사업자 정보",
              "체적 정보",
              "공급시설 정보",
              "공급계약 정보",
              "CMS/가상계좌",
              "SMS 청구서",
            ]}
            onClick={(id) => setTabId(id)}
          />
          <TabContentWrapper>
            {getTabContent(
              tabId,
              register,
              errors,
              dataCommonDic,
              setAddress2,
              reset
            )}
          </TabContentWrapper>
        </div>
      </div>
    </form>
  );
}

export default Form;
