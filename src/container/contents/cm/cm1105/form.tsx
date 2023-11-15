import { useEffect, useState, useRef, BaseSyntheticEvent } from "react";
import { useForm, Controller } from "react-hook-form";
import DaumAddress from "components/daum";
import { useSelector, useDispatch } from "app/store";
import { apiGet, apiPost } from "app/axios";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import { Plus, Update, WhiteClose, Reset } from "components/allSvgIcon";
import { ICM1105SEARCH, emptyObj } from "./model";
import { useGetCommonDictionaryMutation } from "app/api/commonDictionary";
import { currencyMask, removeCommas } from "helpers/currency";
import {
  DateWithoutDash,
  DateWithoutDashOnlyYearMonth,
} from "helpers/dateFormat";
import { addCM1105LoadStatus } from "app/state/modal/modalSlice";
import {
  Input,
  Select,
  Field,
  FormGroup,
  Divider,
  Label,
  TextArea,
} from "components/form/style";
import { ModalBlueHeader } from "components/modal/customModals/style";
import CheckBox from "components/checkbox";
import PlainTab from "components/plainTab";
import { TabContentWrapper } from "components/plainTab/style";
import getTabContent from "./getTabContent";
import { CM1105SEARCH, CM1105INSERT, CM1105UPDATE, CM110511 } from "app/path";
import useRdanga from "app/hook/useCalcRdanga";
import { CustomForm } from "components/form/style";
import {
  RadioButton,
  RadioButtonLabel,
  Item,
} from "components/radioButton/style";

const radioOptions = [
  {
    label: "용기",
    id: "0",
  },
  {
    label: "탱크",
    id: "1",
  },
  {
    label: "탱크 + 용기",
    id: "2",
  },
  {
    label: "기타",
    id: "3",
  },
];

function FormCM1105({ setIsModalOpen }: { setIsModalOpen: Function }) {
  const btnRef1 = useRef() as React.MutableRefObject<HTMLButtonElement>;
  const [data, setData] = useState<any>(null);
  const [addr, setAddress] = useState<string>("");
  const [addr2, setAddress2] = useState<string>("");
  const [tabId, setTabId] = useState(0);

  const [cuName, setCuName] = useState<string>("");
  const [cuUsername, setCuUsername] = useState<string>("");

  const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);
  const dispatch = useDispatch();

  const cm1105 = useSelector((state) => state.modal.cm1105);

  const [getCommonDictionary, { data: dataCommonDic }] =
    useGetCommonDictionaryMutation();

  const { register, handleSubmit, reset, getValues, control, setFocus, watch } =
    useForm<ICM1105SEARCH>({
      mode: "onChange",
    });

  const {
    rdangaType,
    setRdangaType,
    rdanga,
    setRdanga,
    rdangaSign,
    setRdangaSign,
    rdangaAmt,
    setRdangaAmt,
    totalValue,
    setTotalValue,
    calcRdanga,
  } = useRdanga();

  useEffect(() => {
    getCommonDictionary({ groupId: "CM", functionName: "CM1105" });
  }, []);

  useEffect(() => {
    if (cm1105.status === "INSERT") {
      resetForm("clear");
    }

    if (cm1105.status === "UPDATE" && cm1105.areaCode && cm1105.cuCode) {
      fetchData({
        cuCode: cm1105.cuCode,
        areaCode: cm1105.areaCode,
      });
    }
  }, [cm1105.areaCode, cm1105.cuCode, cm1105.status]);

  // useEffect(() => {
  //   if (watch("cuName") !== undefined && cm1105.source === "CM1100") {
  //     resetForm("copyCuName");
  //   }
  // }, [watch("cuName")]);

  useEffect(() => {
    if (data) {
      resetForm("reset");
    }
  }, [data]);

  useEffect(() => {
    if (addr.length > 0) {
      resetForm("addr");
    }
  }, [addr]);

  useEffect(() => {
    if (addr2.length > 0) {
      resetForm("addr2");
    }
  }, [addr2]);

  const fetchData = async (params: any) => {
    const dataS = await apiGet(CM1105SEARCH, params);

    if (dataS) {
      setData({
        customerInfo: dataS?.customerInfo && dataS.customerInfo[0],
        cuTank: dataS?.cuTank && dataS.cuTank[0],
        cms: dataS?.cms && dataS.cms[0],
        virtualAccount: dataS?.virtualAccount && dataS.virtualAccount[0],
      });
    } else {
      setData(null);
    }
  };

  const fetchCuCode = async (params: any) => {
    const res: any = await apiGet(CM110511, params);

    if (res) {
      setIsAddBtnClicked(true);
      setData(null);

      if (cm1105.source === "AR1100") {
        reset((formValues) => ({
          ...formValues,
          ...emptyObj,
          cuCode: res[0].cuCode,
          cuCutype: res[0].cuCutype,
          cuStae: res[0].cuStae,
          cuType: res[0].cuType,
          cuName: cm1105.search.text,
          areaCode: cm1105.areaCode,
        }));
      } else {
        reset((formValues: any) => ({
          ...formValues,
          ...emptyObj,
          cuCode: res[0].cuCode,
          cuCutype: res[0].cuCutype,
          cuStae: res[0].cuStae,
          cuType: res[0].cuType,
          cuName: cm1105?.cuName && cm1105.cuName,
          areaCode: cm1105.areaCode,
        }));
      }
    }
  };

  const resetForm = (type: string) => {
    if (type === "clear") {
      fetchCuCode({
        areaCode: cm1105?.areaCode,
        cuCode: cm1105?.cuCode?.substring(0, 3),
      });
      document.getElementById("cuName")?.focus();
    } else if (type === "reset") {
      if (data && data?.customerInfo) {
        const customerInfo = data.customerInfo;
        const cms = data?.cms
          ? data.cms
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
        const cuTank = data?.cuTank ? data.cuTank : {};
        const virtualAccount = data?.virturalAccoount
          ? data.virturalAccoount
          : {
              acctno: "",
              bankCd: "",
              bankName: "",
              depositor: "",
              managerCode: "",
              regDate: "",
            };
        reset({
          ...customerInfo,
          cuSekumyn: customerInfo?.cuSekumyn === "Y",
          cuJangbuYn: customerInfo?.cuJangbuYn === "Y",
          cuSeSmsYn: customerInfo?.cuSeSmsYn === "Y",
          cuSeListYn: customerInfo?.cuSeListYn === "Y",
          cuSeFaxYn: customerInfo?.cuSeFaxYn === "Y",
          cuSmsYn: customerInfo?.cuSmsYn === "Y",
          cuCashpayYn: customerInfo?.cuCashpayYn === "Y",
          cuBaGageYn: customerInfo?.cuBaGageYn === "Y",
          ...cms,
          ...cuTank,
          ...virtualAccount,
        });

        setRdangaType(customerInfo?.cuRdangaType);
        setRdanga(customerInfo?.cuRdanga);
        setRdangaSign(customerInfo?.cuRdangaSign);
        // setRdangaAmt(customerInfo?.aptRdangaAmt);
        setTotalValue("");
      }
    } else if (type === "addr") {
      reset((formValues: any) => ({
        ...formValues,
        cuZipcode: addr ? addr?.split("/")[1] : "",
        cuAddr1: addr ? addr?.split("/")[0] : "",
      }));
      //setFocus("cuAddr2");
      document.getElementsByName("cuAddr2")[0]?.focus();
    } else if (type === "addr2") {
      reset((formValues: any) => ({
        ...formValues,
        cuSzipcode: addr2 ? addr2?.split("/")[1] : "",
        cuSaddr1: addr2 ? addr2?.split("/")[0] : "",
      }));
      //setFocus("cuSaddr2");
      document.getElementsByName("cuSaddr2")[0]?.focus();
    }

    // else if (type === "copyCuName") {
    //   reset((formValues: any) => ({
    //     ...formValues,
    //     cuUsername: watch("cuName"),
    //   }));
    // }
  };

  const preSubmit = () => {
    const formValues: any = getValues();

    formValues.cuSekumyn = formValues.cuSekumyn ? "Y" : "N";
    formValues.cuJangbuYn = formValues.cuJangbuYn ? "Y" : "N";
    formValues.cuSeSmsYn = formValues.cuSeSmsYn ? "Y" : "N";
    formValues.cuSeListYn = formValues.cuSeListYn ? "Y" : "N";
    formValues.cuSeFaxYn = formValues.cuSeFaxYn ? "Y" : "N";
    formValues.cuSmsYn = formValues.cuSmsYn ? "Y" : "N";
    formValues.cuCashpayYn = formValues.cuCashpayYn ? "Y" : "N";

    formValues.cuName = cuName;
    formValues.cuUsername = cuUsername;
    formValues.cuHdate = DateWithoutDash(formValues.cuHdate);
    formValues.cuExtendDate = DateWithoutDash(formValues.cuExtendDate);
    formValues.cuGongdate = DateWithoutDash(formValues.cuGongdate);
    formValues.cuPdate = DateWithoutDash(formValues.cuPdate);
    formValues.cuSisuldate = DateWithoutDash(formValues.cuSisuldate);
    formValues.cuGongdateT = DateWithoutDash(formValues.cuGongdateT);
    formValues.cuCashpayDate = DateWithoutDash(formValues.cuCashpayDate);
    formValues.cuCircuitDate = DateWithoutDash(formValues.cuCircuitDate);
    formValues.cuFinishDate = DateWithoutDash(formValues.cuFinishDate);
    formValues.cuMdate = DateWithoutDash(formValues.cuMdate);
    formValues.cuMeterDt = DateWithoutDash(formValues.cuMeterDt);
    formValues.cuMeterTurm = DateWithoutDash(formValues.cuMeterTurm);
    formValues.cuScheduleDate = DateWithoutDash(formValues.cuScheduleDate);
    formValues.cuSmsDate = DateWithoutDash(formValues.cuSmsDate);
    formValues.gasifyCheckDate1 = DateWithoutDash(formValues.gasifyCheckDate1);
    formValues.gasifyCheckDate2 = DateWithoutDash(formValues.gasifyCheckDate2);
    formValues.gasifyMakeDate1 = DateWithoutDashOnlyYearMonth(
      formValues.gasifyMakeDate1
    );
    formValues.gasifyMakeDate2 = DateWithoutDashOnlyYearMonth(
      formValues.gasifyMakeDate2
    );
    formValues.tankFirstDate1 = DateWithoutDash(formValues.tankFirstDate1);
    formValues.tankFirstDate2 = DateWithoutDash(formValues.tankFirstDate2);
    formValues.tankInsideDate1 = DateWithoutDash(formValues.tankInsideDate1);
    formValues.tankInsideDate2 = DateWithoutDash(formValues.tankInsideDate2);
    formValues.tankMakeDate1 = DateWithoutDashOnlyYearMonth(
      formValues.tankMakeDate1
    );
    formValues.tankMakeDate2 = DateWithoutDashOnlyYearMonth(
      formValues.tankMakeDate2
    );
    formValues.tankOutsideDate1 = DateWithoutDash(formValues.tankOutsideDate1);
    formValues.tankOutsideDate2 = DateWithoutDash(formValues.tankOutsideDate2);

    formValues.cuTongkum = removeCommas(formValues.cuTongkum, "number");
    formValues.cuJmisu = removeCommas(formValues.cuJmisu, "number");
    formValues.cuCmisu = removeCommas(formValues.cuCmisu, "number");
    formValues.cuAnkum = removeCommas(formValues.cuAnkum, "number");
    formValues.cuSisulkum = removeCommas(formValues.cuSisulkum, "number");
    formValues.cuMeterkum = removeCommas(formValues.cuMeterkum, "number");
    formValues.cuPer = removeCommas(formValues.cuPer, "number");
    formValues.cuCdc = removeCommas(formValues.cuCdc, "number");
    formValues.cuSvKumack = removeCommas(formValues.cuSvKumack, "number");
    formValues.cuBaGageKum = removeCommas(formValues.cuBaGageKum, "number");
    formValues.tankMax1 = removeCommas(formValues.tankMax1, "number");
    formValues.tankMax2 = removeCommas(formValues.tankMax2, "number");

    formValues.cuRdanga = +rdanga;
    formValues.cuRdangaSign = rdangaSign;
    formValues.cuRdangaType = rdangaType;

    // formValues.cuRdangaAmt = +rdangaAmt; ene 2 talbar tsaanaasaa irehgui bgaa
    // formValues.totalValue = totalValue; irvel nemeh yum

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
    return formValues;
  };

  const submit = async (data: ICM1105SEARCH) => {
    const formValues = preSubmit();
    const path = isAddBtnClicked ? CM1105INSERT : CM1105UPDATE;

    const res: any = await apiPost(path, formValues, "저장이 성공하였습니다");
    if (res) {
      dispatch(addCM1105LoadStatus({ loadStatus: true }));
      setIsAddBtnClicked(false);
      setTimeout(() => {
        setIsModalOpen(false);
      }, 1800);
    }
  };

  const submitAgain = async () => {
    const formValues = preSubmit();
    const path = isAddBtnClicked ? CM1105INSERT : CM1105UPDATE;

    const res = await apiPost(path, formValues, "저장이 성공하였습니다");
    if (res) {
      dispatch(addCM1105LoadStatus({ loadStatus: true }));
      resetForm("clear");
    }
  };

  const handleReset = () => {
    //alert("취소하시겠습니까?");
  };

  const handleChangeCuName = (val: string) => {
    setCuName(val);
    if (cm1105.source === "CM1100") {
      setCuUsername(val);
    }
  };

  return (
    <CustomForm onSubmit={handleSubmit(submit)} autoComplete="off">
      <ModalBlueHeader className="handle h40">
        <FormGroup>
          <Label style={{ minWidth: "115px", color: "white" }}>영업소</Label>
          <Controller
            control={control}
            name="areaCode"
            render={({ field }) => (
              <Select {...field} width={InputSize.i120} disabled>
                {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            )}
          />
          <div className="buttons ml30">
            {cm1105?.source === "AR1100" ? (
              <>
                <Button
                  text="저장"
                  icon={<Update />}
                  color={ButtonColor.SECONDARY}
                  type="submit"
                />
                <Button
                  type="button"
                  text="취소"
                  icon={<Reset />}
                  onClick={handleReset}
                />
              </>
            ) : (
              <>
                <Button
                  text="연속등록"
                  icon={<Plus />}
                  type="button"
                  onClick={handleSubmit(submitAgain)}
                  ref={btnRef1}
                />
                <Button
                  text="저장"
                  icon={<Update />}
                  color={ButtonColor.SECONDARY}
                  type="submit"
                />

                <Button
                  type="button"
                  text="취소"
                  icon={<Reset />}
                  onClick={handleReset}
                />
              </>
            )}
          </div>
        </FormGroup>
        <FormGroup>
          <Label style={{ color: "white" }}>거래처 정보</Label>
          <span
            className="close_btn"
            style={{ marginLeft: "10px", marginTop: "1px" }}
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            <WhiteClose />
          </span>
        </FormGroup>
      </ModalBlueHeader>
      <div style={{ padding: "5px 10px" }}>
        <FormGroup>
          <Input
            label="거래처코드"
            register={register("cuCode")}
            inputSize={InputSize.i120}
            readOnly
          />
          <Input
            name="cuName"
            value={cuName}
            label="거래처명(건물명)"
            inputSize={InputSize.i180}
            labelStyle={{ minWidth: "194px" }}
            onChange={(e: BaseSyntheticEvent) =>
              handleChangeCuName(e.target.value)
            }
          />
          <Input
            name="cuUsername"
            value={cuUsername}
            label="사용자명"
            labelStyle={{ minWidth: "67px" }}
            inputSize={InputSize.i180}
            onChange={(e: BaseSyntheticEvent) => setCuUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Input
            label="전화번호"
            register={register("cuTel")}
            style={{ width: "247px" }}
          />
          <Input
            register={register("cuTel21")}
            style={{ width: "247px" }}
            type="number"
          />
          <Input
            register={register("cuTel22")}
            style={{ width: "247px" }}
            type="number"
          />
          <Label style={{ minWidth: "97px" }}>거래구분</Label>
          <Select register={register("cuType")} width={InputSize.i150}>
            {dataCommonDic?.cuType?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <Controller
            control={control}
            name="cuHp"
            render={({ field }) => (
              <Input
                {...field}
                label="핸드폰"
                type="number"
                style={{ width: "247px" }}
              />
            )}
          />
          <Controller
            control={control}
            name="cuTel23"
            render={({ field }) => (
              <Input {...field} type="number" style={{ width: "247px" }} />
            )}
          />
          <Controller
            control={control}
            name="cuTel24"
            render={({ field }) => (
              <Input {...field} style={{ width: "247px" }} type="number" />
            )}
          />
          <Label style={{ minWidth: "97px" }}>거래상태</Label>
          <Select register={register("cuStae")} width={InputSize.i150}>
            {dataCommonDic?.cuStae?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <Input
            label="주 소"
            register={register("cuZipcode")}
            inputSize={InputSize.i100}
          />
          <DaumAddress setAddress={setAddress} />
          <Input register={register("cuAddr1")} style={{ width: "368px" }} />
          <Controller
            control={control}
            name="cuAddr2"
            render={({ field }) => (
              <Input {...field} style={{ width: "500px" }} />
            )}
          />
        </FormGroup>
        <FormGroup>
          <Input
            label="비 고"
            register={register("cuBigo1")}
            style={{ width: "500px" }}
          />
          <Input register={register("cuBigo2")} style={{ width: "500px" }} />
        </FormGroup>
        <Divider />

        <FormGroup
          style={{
            alignItems: "start",
            gap: "63px",
          }}
        >
          <FormGroup
            style={{
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <FormGroup>
              <Label>메 모</Label>
              <TextArea
                style={{
                  width: "700px",
                  height: "50px",
                  border: "1px solid rgb(188, 185, 185)",
                  background: "aliceblue",
                  borderRadius: "4px",
                  margin: "3px",
                  padding: "10px",
                }}
                id="cuMemo"
                {...register("cuMemo")}
              />
            </FormGroup>
            <FormGroup>
              <Label>담당 사원</Label>
              <Select register={register("cuSwCode")} width={InputSize.i150}>
                {dataCommonDic?.cuSwCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
              <Label>지역 분류</Label>
              <Select register={register("cuJyCode")} width={InputSize.i150}>
                {dataCommonDic?.cuJyCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
              <Label>관리자 분류</Label>
              <Select register={register("cuCustgubun")} width={InputSize.i150}>
                {dataCommonDic?.cuCustgubun?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <FormGroup>
              <Label>소비자 형태</Label>
              <Select register={register("cuCutype")} width={InputSize.i150}>
                {dataCommonDic?.cuCutype?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
              <Label>품목 단가</Label>
              <Select
                register={register("cuUseDanga", { valueAsNumber: true })}
                width={InputSize.i150}
              >
                {dataCommonDic?.cuUseDanga?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
              <Label>수금 방법</Label>
              <Select register={register("cuSukumtype")} width={InputSize.i150}>
                {dataCommonDic?.cuSukumtype?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <FormGroup>
              <Label style={{ marginRight: "10px" }}>저장설비</Label>
              {radioOptions.map((option, index) => (
                <Item key={index}>
                  <RadioButton
                    type="radio"
                    value={option.id}
                    {...register("cuUseGastype")}
                    id={option.id}
                  />
                  <RadioButtonLabel htmlFor={`${option.label}`}>
                    {option.label}
                  </RadioButtonLabel>
                </Item>
              ))}
              <CheckBox
                register={register("cuSekumyn")}
                rtl
                title="계산서 발행유무"
                style={{
                  width: "180px",
                  marginLeft: "50px",
                }}
              />
              <CheckBox
                register={register("cuJangbuYn")}
                rtl
                title="장부 사용유무"
              />
            </FormGroup>
          </FormGroup>
          <Field className="rectangle" style={{ marginTop: "3px" }}>
            <Controller
              control={control}
              name="cuSvKumack"
              render={({ field }) => (
                <Input
                  label="무료시설비"
                  labelStyle={{ minWidth: "80px" }}
                  {...field}
                  mask={currencyMask}
                  textAlign="right"
                  inputSize={InputSize.i140}
                  readOnly
                />
              )}
            />
            <FormGroup style={{ justifyContent: "center" }}>
              <Label style={{ minWidth: "80px" }}>용기보증금</Label>
              <Controller
                control={control}
                name="cuTongkum"
                render={({ field }) => (
                  <Input
                    {...field}
                    inputSize={InputSize.i140}
                    mask={currencyMask}
                    textAlign="right"
                    readOnly
                  />
                )}
              />
            </FormGroup>
            <FormGroup style={{ justifyContent: "center" }}>
              <Label style={{ minWidth: "80px" }}>중량미수</Label>
              <Controller
                control={control}
                name="cuJmisu"
                render={({ field }) => (
                  <Input
                    {...field}
                    inputSize={InputSize.i140}
                    mask={currencyMask}
                    textAlign="right"
                    readOnly
                  />
                )}
              />
            </FormGroup>
            <FormGroup style={{ justifyContent: "center" }}>
              <Label style={{ minWidth: "80px" }}>체적미수</Label>
              <Controller
                control={control}
                name="cuCmisu"
                render={({ field }) => (
                  <Input
                    {...field}
                    inputSize={InputSize.i140}
                    mask={currencyMask}
                    textAlign="right"
                    readOnly
                  />
                )}
              />
            </FormGroup>
          </Field>
        </FormGroup>

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
          <TabContentWrapper style={{ padding: "5px", height: "300px" }}>
            {getTabContent(
              tabId,
              register,
              dataCommonDic,
              setAddress2,
              control,
              rdangaType,
              setRdangaType,
              rdanga,
              setRdanga,
              rdangaSign,
              setRdangaSign,
              rdangaAmt,
              setRdangaAmt,
              totalValue,
              setTotalValue,
              calcRdanga,
              watch,
              reset
            )}
          </TabContentWrapper>
        </div>
      </div>

      {/*     

              <Label>청구 구분</Label>
              <Select
                register={register("cuRequestType")}
                width={InputSize.i150}
              >
                {dataCommonDic?.cuRequestType?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select> 
              <Label>Vat 적용방법</Label>
              <Select register={register("cuVatKind")} width={InputSize.i150}>
                {dataCommonDic?.cuVatKind?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>        
              <Label>원미만 금액계산</Label>
              <Select register={register("cuRoundType")} width={InputSize.i150}>
                {dataCommonDic?.cuRoundType?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select> 
      */}
    </CustomForm>
  );
}

export default FormCM1105;
