import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DaumAddress from "components/daum";
import { useSelector, useDispatch } from "app/store";
import { apiGet, apiPost } from "app/axios";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import { Plus, Update, WhiteClose } from "components/allSvgIcon";
import { ICM1105SEARCH, emptyObj } from "./model";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { currencyMask, removeCommas } from "helpers/currency";
import {
  DateWithoutDash,
  DateWithoutDashOnlyYearMonth,
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
import useRdanga from "app/hook/calcRdanga";

function FormCM1105() {
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

  const { register, handleSubmit, reset, getValues, control } =
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
    if (cm1105.status === "INSERT") {
      fetchCuCode(cm1105.areaCode, cm1105.cuCode);
      setIsAddBtnClicked(true);
    } else if (cm1105.areaCode && cm1105.cuCode) {
      fetchData();
    }

    console.log("state chagnaj bn INSERT", cm1105);
  }, [cm1105.areaCode, cm1105.cuCode, cm1105.status]);

  useEffect(() => {
    if (data) {
      resetForm("reset");
    }
  }, [data]);

  useEffect(() => {
    if (addr.length > 0) {
      reset((formValues: any) => ({
        ...formValues,
        cuZipcode: addr ? addr?.split("/")[1] : "",
        cuAddr1: addr ? addr?.split("/")[0] : "",
      }));
    }
  }, [addr]);

  useEffect(() => {
    if (addr2.length > 0) {
      reset((formValues: any) => ({
        ...formValues,
        cuSzipcode: addr2 ? addr2?.split("/")[1] : "",
        cuSaddr1: addr2 ? addr2?.split("/")[0] : "",
      }));
    }
  }, [addr2]);

  const resetForm = (type: string) => {
    if (type === "clear") {
      fetchCuCode(cm1105.areaCode, cm1105.cuCode);
      return;
    }

    if (type === "reset" && data !== undefined && data?.customerInfo) {
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
      reset({ ...customerInfo, ...cms, ...cuTank, ...virtualAccount });

      setRdangaType(customerInfo?.cuRdangaType);
      setRdanga(customerInfo?.cuRdanga);
      setRdangaSign(customerInfo?.cuRdangaSign);
      // setRdangaAmt(customerInfo?.aptRdangaAmt);
      setTotalValue("");
    }
  };

  const fetchData = async () => {
    const dataS = await apiGet(CM1105SEARCH, {
      cuCode: cm1105.cuCode,
      areaCode: cm1105.areaCode,
    });

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

  const fetchCuCode = async (areaCode: string, cuCode: string) => {
    const res: any = await apiGet(CM110511, {
      areaCode: areaCode,
      cuCode: cuCode.substring(0, 3),
    });

    if (res) {
      setIsAddBtnClicked(true);
      setData(null);
      reset({
        ...emptyObj,
        cuCode: res[0].cuCode,
        cuCutype: res[0].cuCutype,
        cuStae: res[0].cuStae,
        cuType: res[0].cuType,
      });
    }
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
      setIsAddBtnClicked(false);
      setTimeout(() => {
        dispatch(closeModal());
      }, 1800);
    }
  };

  const submitAgain = async () => {
    const formValues = preSubmit();
    const path = isAddBtnClicked ? CM1105INSERT : CM1105UPDATE;

    const res = await apiPost(path, formValues, "저장이 성공하였습니다");
  };

  const handleAddAgain = () => {
    handleSubmit(submitAgain)();
    resetForm("clear");
  };

  return (
    <form onSubmit={handleSubmit(submit)} autoComplete="off">
      <ModalHeader className="handle">
        <FormGroup>
          <Label style={{ minWidth: "114px", color: "white" }}>영업소</Label>
          <Select register={register("areaCode")} disabled>
            {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
          <div style={{ marginLeft: "30px" }}>
            <Button
              text="연속등록"
              icon={<Plus />}
              style={{ marginRight: "5px" }}
              type="button"
              onClick={handleAddAgain}
            />
            <Button
              text="저장"
              icon={<Update />}
              style={{ marginRight: "5px" }}
              color={ButtonColor.SECONDARY}
              onClick={handleSubmit(submit)}
              type="button"
            />
          </div>
        </FormGroup>
        <FormGroup>
          <Label style={{ color: "white" }}>거래처 정보</Label>
          <span
            style={{ marginLeft: "10px", marginTop: "1px" }}
            onClick={() => {
              // dispatch(addCM1105({ cuCode: "", areaCode: "" }));
              dispatch(closeModal());
            }}
          >
            <WhiteClose />
          </span>
        </FormGroup>
      </ModalHeader>
      <div style={{ padding: "10px" }}>
        <FormGroup>
          <Input
            label="거래처코드"
            register={register("cuCode")}
            inputSize={InputSize.i120}
            readOnly
          />
          <Input
            label="거래처명(건물명)"
            register={register("cuName")}
            inputSize={InputSize.i150}
            labelStyle={{ minWidth: "156px" }}
          />
          <Input
            label="사용자명"
            register={register("cuUsername")}
            labelStyle={{ minWidth: "114px" }}
            inputSize={InputSize.i150}
          />
        </FormGroup>

        <FormGroup>
          <Input
            label="전화번호"
            register={register("cuTel")}
            inputSize={InputSize.i120}
          />
          <Input register={register("cuTel21")} inputSize={InputSize.i150} />
          <Input register={register("cuTel22")} inputSize={InputSize.i150} />

          <Label style={{ minWidth: "114px" }}>거래구분</Label>
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
            {...register("cuHp")}
            render={({ field: { onChange, value, name } }) => (
              <Input
                label="핸드폰"
                value={value}
                name={name}
                onChange={onChange}
                // mask={[
                //   /\d/,
                //   /\d/,
                //   /\d/,
                //   "-",
                //   /\d/,
                //   /\d/,
                //   /\d/,
                //   /\d/,
                //   "-",
                //   /\d/,
                //   /\d/,
                //   /\d/,
                //   /\d/,
                // ]}
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
                // mask={[
                //   /\d/,
                //   /\d/,
                //   /\d/,
                //   "-",
                //   /\d/,
                //   /\d/,
                //   /\d/,
                //   /\d/,
                //   "-",
                //   /\d/,
                //   /\d/,
                //   /\d/,
                //   /\d/,
                // ]}
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
                // mask={[
                //   /\d/,
                //   /\d/,
                //   /\d/,
                //   "-",
                //   /\d/,
                //   /\d/,
                //   /\d/,
                //   /\d/,
                //   "-",
                //   /\d/,
                //   /\d/,
                //   /\d/,
                //   /\d/,
                // ]}
                inputSize={InputSize.i150}
              />
            )}
          />

          <Label style={{ minWidth: "114px" }}>거래상태</Label>
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
            inputSize={InputSize.i120}
          />
          <DaumAddress setAddress={setAddress} />
          <Input register={register("cuAddr1")} style={{ width: "280px" }} />
          <Input register={register("cuAddr2")} style={{ width: "264px" }} />
        </FormGroup>

        <FormGroup>
          <Input
            label="비 고"
            register={register("cuBigo1")}
            style={{ width: "432px" }}
          />
          <Input register={register("cuBigo2")} style={{ width: "264px" }} />
        </FormGroup>
        <Divider />
        <FormGroup>
          <Input
            label="메 모"
            register={register("cuMemo")}
            style={{ width: "702px" }}
          />
        </FormGroup>

        <Field
          style={{
            display: "flex",
            alignItems: "start",
            marginRight: "20px",
          }}
        >
          <Field>
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
              <Label>품목 단가</Label>
              <Select
                register={register("cuJdc", { valueAsNumber: true })}
                width={InputSize.i150}
              >
                {dataCommonDic?.cuJdc?.map((obj: any, idx: number) => (
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
            </FormGroup>

            <Wrapper grid>
              <FormGroup>
                <Label>계산서 발행유무</Label>
                <CheckBox
                  register={{ ...register("cuSekumyn") }}
                  rtl
                  style={{
                    marginLeft: "4px",
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label>장부 사용유무</Label>
                <CheckBox
                  register={{ ...register("cuJangbuYn") }}
                  style={{
                    marginLeft: "4px",
                  }}
                />
              </FormGroup>
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
                    inputSize={InputSize.i150}
                  />
                )}
              />
            </Wrapper>
          </Field>
          <Field
            className="rectangle"
            style={{ width: "20%", marginLeft: "30px", marginTop: "3px" }}
          >
            <FormGroup style={{ justifyContent: "center" }}>
              <label>용기보증금</label>
              <Controller
                control={control}
                {...register("cuTongkum")}
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    value={value}
                    onChange={onChange}
                    name={name}
                    inputSize={InputSize.i140}
                    mask={currencyMask}
                    textAlign="right"
                  />
                )}
              />
            </FormGroup>
            <FormGroup style={{ justifyContent: "center" }}>
              <label>중량미수</label>
              <Controller
                control={control}
                {...register("cuJmisu")}
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    value={value}
                    onChange={onChange}
                    name={name}
                    inputSize={InputSize.i140}
                    mask={currencyMask}
                    textAlign="right"
                  />
                )}
              />
            </FormGroup>
            <FormGroup style={{ justifyContent: "center" }}>
              <label>체적미수</label>
              <Controller
                control={control}
                {...register("cuCmisu")}
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    value={value}
                    onChange={onChange}
                    name={name}
                    inputSize={InputSize.i140}
                    mask={currencyMask}
                    textAlign="right"
                  />
                )}
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
          <TabContentWrapper style={{ padding: "15px", minHeight: "322px" }}>
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
              calcRdanga
            )}
          </TabContentWrapper>
        </div>
      </div>
    </form>
  );
}

export default FormCM1105;
