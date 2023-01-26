import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import DaumAddress from "components/daum";
import { useSelector, useDispatch } from "app/store";
import API from "app/axios";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import { Plus, Update, Reset, WhiteClose } from "components/allSvgIcon";
import { ICM1105SEARCH, emptyObj } from "./model";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { currencyMask } from "helpers/currency";
import {
  formatDateByRemoveDash,
  formatDateToStringWithoutDash,
} from "helpers/dateFormat";
import { closeModal } from "app/state/modal/modalSlice";
import {
  Input,
  Select,
  Field,
  FormGroup,
  Wrapper,
  Divider,
  Label,
} from "components/form/style";
import { ModalHeader } from "./style";
import CheckBox from "components/checkbox";
import PlainTab from "components/plainTab";
import { TabContentWrapper } from "components/plainTab/style";
import getTabContent from "./getTabContent";
import { CM1105SEARCH, CM1105INSERT, CM1105UPDATE, CM110511 } from "app/path";

function FormCM1105() {
  const [data, setData] = useState<any>(null);
  const [addr, setAddress] = useState<string>("");
  const [addr2, setAddress2] = useState<string>("");
  const [tabId, setTabId] = useState(0);
  const [sign, setSign] = useState<string>("+");
  const [too, setToo] = useState<number>(0);

  const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);
  const dispatch = useDispatch();

  const cm1105 = useSelector((state) => state.modal.cm1105);
  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "CM",
    functionName: "CM1105",
  });

  const { register, handleSubmit, reset, getValues, control } =
    useForm<ICM1105SEARCH>({
      mode: "onChange",
    });

  useEffect(() => {
    if (cm1105.status === "INSERT") {
      fetchCuCode(cm1105.areaCode, cm1105.cuCode);
      setIsAddBtnClicked(true);
    } else if (cm1105.areaCode && cm1105.cuCode) {
      fetchData();
    }
  }, [cm1105.areaCode, cm1105.cuCode, cm1105.status]);

  useEffect(() => {
    if (data) {
      resetFormTemp("reset");
    }
  }, [data]);

  useEffect(() => {
    if (addr.length > 0) {
      reset({
        cuZipcode: addr ? addr?.split("/")[1] : "",
        cuAddr1: addr ? addr?.split("/")[0] : "",
      });
    }
  }, [addr]);

  useEffect(() => {
    if (addr2.length > 0) {
      reset({
        cuSzipcode: addr2 ? addr2?.split("/")[1] : "",
        cuSaddr1: addr2 ? addr2?.split("/")[0] : "",
      });
    }
  }, [addr2]);

  const resetFormTemp = (type: string) => {
    if (type === "clear") {
      //reset(emptyObj);
      fetchCuCode(cm1105.areaCode, cm1105.cuCode);
      return;
    } else if (type === "reset" && data !== undefined && data?.customerInfo) {
      const customerInfo = data.customerInfo[0];
      const cms = data?.cms
        ? data.cms[0]
        : {
            acctno: "",
            appdt: "",
            bankName: "",
            bigo: "",
            cmsGubun: "",
            depositor: "",
            managerNo: "",
            monthday: "",
            regDate: "",
            stateName: "",
            tel: "",
          };
      const cuTank = data?.cuTank ? data.cuTank[0] : {};
      const virtualAccount = data?.virturalAccoount
        ? data.virturalAccoount[0]
        : {
            acctno: "",
            bankCd: "",
            bankName: "",
            depositor: "",
            managerCode: "",
            regDate: "",
          };
      reset({ ...customerInfo, ...cms, ...cuTank, ...virtualAccount });
    }
  };

  // const resetForm = (type: string) => {
  //   if (data !== undefined && data) {
  //     let newDataCustomerInfo: any = {};
  //     let newDataCms: any = {};
  //     let newDataVirtualAccount: any = {};
  //     let newDataCuTank: any = {};

  //     const customerInfo = data?.customerInfo ? data?.customerInfo[0] : {};
  //     const cms = data?.cms
  //       ? data?.cms[0]
  //       : {
  //           acctno: "",
  //           appdt: "",
  //           bankName: "",
  //           bigo: "",
  //           cmsGubun: "",
  //           depositor: "",
  //           managerNo: "",
  //           monthday: "",
  //           regDate: "",
  //           stateName: "",
  //           tel: "",
  //         };
  //     const cuTank = data?.cuTank ? data?.cuTank[0] : {};
  //     const virtualAccount = data?.virturalAccoount
  //       ? data?.virturalAccoount[0]
  //       : {
  //           acctno: "",
  //           bankCd: "",
  //           bankName: "",
  //           depositor: "",
  //           managerCode: "",
  //           regDate: "",
  //         };

  //     if (type === "clear") {
  //       for (const [key, value] of Object.entries(customerInfo)) {
  //         newDataCustomerInfo[key] = null;
  //       }

  //       for (const [key, value] of Object.entries(cms)) {
  //         if (
  //           key === "acctno" ||
  //           key === "bankName" ||
  //           key === "depositor" ||
  //           key === "regDate"
  //         ) {
  //           newDataCms[`CMS${key}`] = null;
  //         }
  //         newDataCms[key] = null;
  //       }

  //       for (const [key, value] of Object.entries(virtualAccount)) {
  //         if (
  //           key === "acctno" ||
  //           key === "bankName" ||
  //           key === "depositor" ||
  //           key === "regDate"
  //         ) {
  //           newDataVirtualAccount[`VIR${key}`] = null;
  //         }
  //         newDataVirtualAccount[key] = null;
  //       }

  //       for (const [key, value] of Object.entries(cuTank)) {
  //         newDataCuTank[key] = null;
  //       }

  //       reset({
  //         ...newDataCustomerInfo,
  //         ...newDataCms,
  //         ...newDataVirtualAccount,
  //         ...newDataCuTank,
  //       });
  //     } else if (type === "reset") {
  //       for (const [key, value] of Object.entries(customerInfo)) {
  //         newDataCustomerInfo[key] = value;
  //       }

  //       for (const [key, value] of Object.entries(cms)) {
  //         if (
  //           key === "acctno" ||
  //           key === "bankName" ||
  //           key === "depositor" ||
  //           key === "regDate"
  //         ) {
  //           newDataCms[`CMS${key}`] = value;
  //         }
  //         newDataCms[key] = value;
  //       }

  //       for (const [key, value] of Object.entries(virtualAccount)) {
  //         if (
  //           key === "acctno" ||
  //           key === "bankName" ||
  //           key === "depositor" ||
  //           key === "regDate"
  //         ) {
  //           newDataVirtualAccount[`VIR${key}`] = value;
  //         }
  //         newDataVirtualAccount[key] = value;
  //       }

  //       for (const [key, value] of Object.entries(cuTank)) {
  //         newDataCuTank[key] = value;
  //       }

  //       reset({
  //         ...newDataCustomerInfo,
  //         ...newDataCms,
  //         ...newDataVirtualAccount,
  //         ...newDataCuTank,
  //       });
  //     }
  //   }
  // };

  const fetchData = async () => {
    try {
      const { data } = await API.get(CM1105SEARCH, {
        params: {
          cuCode: cm1105.cuCode,
          areaCode: cm1105.areaCode,
        },
      });

      setData(data);
    } catch (error) {
      console.log("Error fetching CM1105 data:", error);
    }
  };

  const fetchCuCode = async (areaCode: string, cuCode: string) => {
    try {
      const res = await API.get(CM110511, {
        params: { areaCode: areaCode, cuCode: cuCode.substring(0, 3) },
      });
      if (res.status === 200) {
        reset({
          ...emptyObj,
          cuCode: res.data[0].cuCode,
          areaCode: areaCode ?? "",
        });
      } else {
        toast.error("couldn't get CuCode", {
          autoClose: 500,
        });
      }
      setData(null);
    } catch (error: any) {
      toast.error(error, {
        autoClose: 500,
      });
      console.log("Error fetching CuCode on CM1105: ", error);
    }
  };

  const submit = async (data: ICM1105SEARCH) => {
    const path = isAddBtnClicked ? CM1105INSERT : CM1105UPDATE;
    const formValues: any = getValues();

    formValues.cuSekumyn = formValues.cuSekumyn ? "Y" : "N";
    formValues.cuJangbuYn = formValues.cuJangbuYn ? "Y" : "N";
    formValues.cuSeSmsYn = formValues.cuSeSmsYn ? "Y" : "N";
    formValues.cuSeListYn = formValues.cuSeListYn ? "Y" : "N";
    formValues.cuSeFaxYn = formValues.cuSeFaxYn ? "Y" : "N";
    formValues.cuSmsYn = formValues.cuSmsYn ? "Y" : "N";
    formValues.cuCashpayYn = formValues.cuCashpayYn ? "Y" : "N";

    formValues.cuHdate =
      typeof formValues.cuHdate === "string"
        ? formatDateByRemoveDash(formValues.cuHdate)
        : (formValues.cuHdate as any) instanceof Date
        ? formatDateToStringWithoutDash(formValues.cuHdate)
        : "";

    formValues.cuExtendDate =
      typeof formValues.cuExtendDate === "string"
        ? formatDateByRemoveDash(formValues.cuExtendDate)
        : (formValues.cuExtendDate as any) instanceof Date
        ? formatDateToStringWithoutDash(formValues.cuExtendDate)
        : "";

    formValues.cuGongdate =
      typeof formValues.cuGongdate === "string"
        ? formatDateByRemoveDash(formValues.cuGongdate)
        : (formValues.cuGongdate as any) instanceof Date
        ? formatDateToStringWithoutDash(formValues.cuGongdate)
        : "";

    if (formValues.cuGongdate === "") {
      delete formValues.cuGongdate;
    }

    if (formValues.cuHdate === "") {
      delete formValues.cuHdate;
    }

    if (formValues.gasifyMakeDate1 === "") {
      delete formValues.gasifyMakeDate1;
    }

    if (formValues.gasifyMakeDate2 === "") {
      delete formValues.gasifyMakeDate2;
    }

    if (formValues.gasifyCheckDate2 === "") {
      delete formValues.gasifyCheckDate2;
    }

    if (formValues.gasifyCheckDate1 === "") {
      delete formValues.gasifyCheckDate1;
    }

    if (formValues.cuCmisu) {
      formValues.cuCmisu = parseInt(formValues.cuCmisu);
    }

    try {
      const response: any = await API.post(path, formValues);
      if (response.status === 200) {
        toast.success("저장이 성공하였습니다", {
          autoClose: 500,
        });
        setIsAddBtnClicked(false);
      } else {
        toast.error(response?.response?.data?.message, {
          autoClose: 500,
        });
      }
    } catch (err: any) {
      toast.error(err?.message, {
        autoClose: 500,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <ModalHeader>
        <Field flex style={{ alignItems: "center" }}>
          <p>거래처 정보</p>
          <FormGroup>
            <Label>영업소</Label>
            <Select {...register("areaCode")}>
              {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
        </Field>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            text="연속등록"
            icon={<Plus />}
            style={{ marginRight: "5px" }}
            type="button"
            onClick={() => {
              resetFormTemp("clear");
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
              resetFormTemp("reset");
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
      </ModalHeader>
      <div style={{ padding: "12px" }}>
        <Divider />
        <Wrapper grid col={4}>
          <Input
            label="거래처코드"
            register={register("cuCode")}
            inputSize={InputSize.i80}
          />
          <Input
            label="거래처명(건물명)"
            register={register("cuName")}
            inputSize={InputSize.i150}
            style={{ marginLeft: "0px" }}
          />
          <Input
            label="사용자명"
            register={register("cuUsername")}
            inputSize={InputSize.i150}
          />
        </Wrapper>

        <Wrapper grid col={2}>
          <Field flex>
            <Input
              label="전화번호"
              register={register("cuTel")}
              inputSize={InputSize.i120}
            />
            <Input register={register("cuTel21")} inputSize={InputSize.i150} />
            <Input register={register("cuTel22")} inputSize={InputSize.i150} />
          </Field>
          <FormGroup>
            <Label>거래구분</Label>
            <Select {...register("cuType")} width={InputSize.i150}>
              {dataCommonDic?.cuType?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
        </Wrapper>

        <Wrapper grid col={2}>
          <Field flex>
            <Controller
              control={control}
              {...register("cuHp")}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="핸드폰"
                  value={value}
                  name={name}
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
                  inputSize={InputSize.i120}
                />
              )}
            />
            <Controller
              control={control}
              {...register("cuTel23")}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  value={value}
                  onChange={onChange}
                  name={name}
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
                  inputSize={InputSize.i150}
                />
              )}
            />
            <Controller
              control={control}
              {...register("cuTel24")}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  value={value}
                  onChange={onChange}
                  name={name}
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
                  inputSize={InputSize.i150}
                />
              )}
            />
          </Field>

          <FormGroup>
            <Label>거래상태</Label>
            <Select {...register("cuStae")} width={InputSize.i150}>
              {dataCommonDic?.cuStae?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
        </Wrapper>

        <Wrapper grid col={2}>
          <Field flex style={{ alignItems: "center" }}>
            <Input
              label="주소"
              register={register("cuZipcode")}
              inputSize={InputSize.i175}
            />
            <DaumAddress setAddress={setAddress} />
            <Input register={register("cuAddr1")} inputSize={InputSize.i468} />
          </Field>
          <Input register={register("cuAddr2")} fullWidth />
        </Wrapper>

        <Wrapper grid col={2}>
          <Input label="비고" register={register("cuBigo1")} fullWidth />
          <Input register={register("cuBigo2")} fullWidth />
        </Wrapper>
        <Divider />
        <Wrapper>
          <Input label="메모" register={register("cuMemo")} fullWidth />
        </Wrapper>

        <Field
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "20px",
          }}
        >
          <Field style={{ width: "80%" }}>
            <Wrapper grid>
              <FormGroup>
                <Label>담당 사원</Label>
                <Select {...register("cuSwCode")} width={InputSize.i130}>
                  {dataCommonDic?.cuSwCode?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>지역 분류</Label>
                <Select {...register("cuJyCode")} width={InputSize.i130}>
                  {dataCommonDic?.cuJyCode?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>관리자 분류</Label>
                <Select {...register("cuCustgubun")} width={InputSize.i130}>
                  {dataCommonDic?.cuCustgubun?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>
            </Wrapper>

            <Wrapper grid>
              <FormGroup>
                <Label>소비자 형태</Label>
                <Select {...register("cuCutype")} width={InputSize.i130}>
                  {dataCommonDic?.cuCutype?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code1}>
                      {obj.code1}
                    </option>
                  ))}
                </Select>
              </FormGroup>

              <Input
                label="청구 구분"
                register={register("cuRequestType")}
                inputSize={InputSize.i130}
              />

              <FormGroup>
                <Label>수금 방법</Label>
                <Select {...register("cuSukumtype")} width={InputSize.i130}>
                  {dataCommonDic?.cuSukumtype?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code1}>
                      {obj.code1}
                    </option>
                  ))}
                </Select>
              </FormGroup>
            </Wrapper>

            <Wrapper grid>
              <FormGroup>
                <Label>품목 단가</Label>
                <Select {...register("cuJdc")} width={InputSize.i130}>
                  {dataCommonDic?.cuJdc?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>Vat 적용방법</Label>
                <Select {...register("cuVatKind")} width={InputSize.i130}>
                  {dataCommonDic?.cuVatKind?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>원미만 금액계산</Label>
                <Select {...register("cuRoundType")} width={InputSize.i130}>
                  {dataCommonDic?.cuRoundType?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>
            </Wrapper>

            <Wrapper grid>
              <Field>
                <FormGroup>
                  <Label>계산서 발행유무</Label>
                  <CheckBox register={{ ...register("cuSekumyn") }} />
                </FormGroup>
              </Field>
              <Field>
                <FormGroup>
                  <Label>장부 사용유무</Label>
                  <CheckBox register={{ ...register("cuJangbuYn") }} />
                </FormGroup>
              </Field>

              <Controller
                control={control}
                {...register("cuSvKumack")}
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    label="무료시설 투자비"
                    value={value}
                    onChange={onChange}
                    name={name}
                    mask={currencyMask}
                    textAlign="right"
                    inputSize={InputSize.i130}
                  />
                )}
              />
            </Wrapper>
          </Field>
          <Field
            className="rectangle"
            style={{ width: "20%", marginLeft: "5px" }}
          >
            <FormGroup style={{ justifyContent: "center" }}>
              <label>용기보증금</label>
              <Input
                register={register("cuTongkum")}
                inputSize={InputSize.i140}
                textAlign="right"
              />
            </FormGroup>
            <FormGroup style={{ justifyContent: "center" }}>
              <label>중량미수</label>
              <Input
                register={register("cuJmisu")}
                inputSize={InputSize.i140}
                textAlign="right"
              />
            </FormGroup>
            <FormGroup style={{ justifyContent: "center" }}>
              <label>체적미수</label>
              <Input
                register={register("cuCmisu")}
                inputSize={InputSize.i140}
                textAlign="right"
              />
            </FormGroup>
          </Field>
        </Field>
        <Divider />
        <div style={{ marginTop: "5px" }}>
          <PlainTab
            tabHeader={[
              "사업자 정보",
              "체적시설 정보",
              "공급시설 정보",
              "공급계약 정보",
              "CMS/가상계좌",
              "SMS 청구서",
            ]}
            onClick={(id) => setTabId(id)}
            tabId={tabId}
          />
          <TabContentWrapper>
            {getTabContent(
              tabId,
              data && data?.customerInfo && data?.customerInfo[0]
                ? data?.customerInfo[0]
                : { cuRdanga: 0 },
              register,
              dataCommonDic,
              setAddress2,
              too,
              setToo,
              sign,
              setSign,
              control
            )}
          </TabContentWrapper>
        </div>
      </div>
    </form>
  );
}

export default FormCM1105;
