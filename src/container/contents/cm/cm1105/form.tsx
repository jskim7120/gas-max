import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DaumAddress from "components/daum";
import { useSelector, useDispatch } from "app/store";
import API from "app/axios";
import { schema } from "./validation";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import { Plus, Update, Reset, WhiteClose } from "components/allSvgIcon";
import { ICM1105SEARCH } from "./model";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { formatDateByRemoveDash, formatDate } from "helpers/dateFormat";
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
import { CM1105SEARCH } from "app/path";
import { ModalHeader } from "./cm1105Style";

import CheckBox from "components/checkbox";
import PlainTab from "components/plainTab";
import { TabContentWrapper } from "components/plainTab/style";
import getTabContent from "./getTabContent";
import { CM1105INSERT, CM1105UPDATE } from "app/path";
import { toast } from "react-toastify";

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

  //tab2
  const [cuMeterTurm, setCuMeterTurm] = useState("");
  const [cuMeterDt, setCuMeterDt] = useState("");
  const [cuMdate, setCuMdate] = useState("");
  //tab3
  const [cuFinishDate, setCuFinishDate] = useState("");
  const [cuCircuitDate, setCuCircuitDate] = useState("");
  const [cuScheduleDate, setCuScheduleDate] = useState("");
  const [tankFirstDate1, setTankFirstDate1] = useState("");
  const [tankOutsideDate1, setTankOutsideDate1] = useState("");
  const [tankInsideDate1, setTankInsideDate1] = useState("");
  const [tankFirstDate2, setTankFirstDate2] = useState("");
  const [tankOutsideDate2, setTankOutsideDate2] = useState("");
  const [tankInsideDate2, setTankInsideDate2] = useState("");
  const [gasifyCheckDate1, setGasifyCheckDate1] = useState("");
  const [gasifyCheckDate2, setGasifyCheckDate2] = useState("");

  //tab4
  const [cuHdate, setCuHdate] = useState("");
  const [cuGongdate, setCuGongdate] = useState("");
  const [cuGongdateT, setCuGongdateT] = useState("");
  const [cuExtendDate, setCuExtendDate] = useState("");
  const [cuSisuldate, setCuSisuldate] = useState("");
  const [cuPdate, setCuPdate] = useState("");

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

        customerInfo?.cuMeterTurm && setCuMeterTurm(customerInfo.cuMeterTurm);
        customerInfo?.cuMeterDt && setCuMeterDt(customerInfo.cuMeterDt);
        customerInfo?.cuMdate && setCuMdate(customerInfo.cuMdate);
        customerInfo?.cuFinishDate &&
          setCuFinishDate(customerInfo.cuFinishDate);
        customerInfo?.cuCircuitDate &&
          setCuCircuitDate(customerInfo.cuCircuitDate);
        customerInfo?.cuScheduleDate &&
          setCuScheduleDate(customerInfo.cuScheduleDate);
        customerInfo?.tankFirstDate1 &&
          setTankFirstDate1(customerInfo.tankFirstDate1);
        customerInfo?.tankOutsideDate1 &&
          setTankOutsideDate1(customerInfo.tankOutsideDate1);
        customerInfo?.tankFirstDate2 &&
          setTankFirstDate2(customerInfo.tankFirstDate2);
        customerInfo?.tankOutsideDate2 &&
          setTankOutsideDate2(customerInfo.tankOutsideDate2);
        customerInfo?.tankInsideDate2 &&
          setTankInsideDate2(customerInfo.tankInsideDate2);
        customerInfo?.gasifyCheckDate1 &&
          setGasifyCheckDate1(customerInfo.gasifyCheckDate1);
      }
    }
  };

  const fetchData = async () => {
    try {
      const { data } = await API.get(CM1105SEARCH, {
        params: { cuCode: cm1105.cuCode, areaCode: cm1105.areaCode },
      });
      setData(data);
    } catch (error) {
      console.log("aldaa");
    }
  };

  const submit = async (data: ICM1105SEARCH) => {
    const path = isAddBtnClicked ? CM1105INSERT : CM1105UPDATE;
    const formValues = getValues();

    formValues.cuMeterDt = cuMeterDt ? formatDateByRemoveDash(cuMeterDt) : "";
    formValues.cuMdate = cuMdate ? formatDateByRemoveDash(cuMdate) : "";
    formValues.cuMeterTurm = cuMeterTurm
      ? formatDateByRemoveDash(cuMeterTurm)
      : "";

    formValues.cuFinishDate = cuFinishDate
      ? formatDateByRemoveDash(cuFinishDate)
      : "";

    formValues.cuCircuitDate = cuCircuitDate
      ? formatDateByRemoveDash(cuCircuitDate)
      : "";

    formValues.cuScheduleDate = cuScheduleDate
      ? formatDateByRemoveDash(cuScheduleDate)
      : "";

    formValues.tankFirstDate1 = tankFirstDate1
      ? formatDateByRemoveDash(tankFirstDate1)
      : "";
    formValues.tankOutsideDate1 = tankOutsideDate1
      ? formatDateByRemoveDash(tankOutsideDate1)
      : "";

    formValues.tankInsideDate1 = tankInsideDate1
      ? formatDateByRemoveDash(tankInsideDate1)
      : "";

    formValues.tankFirstDate2 = tankFirstDate2
      ? formatDateByRemoveDash(tankFirstDate2)
      : "";

    formValues.tankOutsideDate2 = tankOutsideDate2
      ? formatDateByRemoveDash(tankOutsideDate2)
      : "";

    formValues.tankInsideDate2 = tankInsideDate2
      ? formatDateByRemoveDash(tankInsideDate2)
      : "";

    formValues.gasifyCheckDate1 = gasifyCheckDate1
      ? formatDateByRemoveDash(gasifyCheckDate1)
      : "";

    formValues.cuHdate = cuHdate ? formatDateByRemoveDash(cuHdate) : "";

    formValues.cuGongdate = cuGongdate
      ? formatDateByRemoveDash(cuGongdate)
      : "";

    formValues.cuGongdateT = cuGongdateT
      ? formatDateByRemoveDash(cuGongdateT)
      : "";

    formValues.cuExtendDate = cuExtendDate
      ? formatDateByRemoveDash(cuExtendDate)
      : "";

    formValues.cuExtendDate = cuExtendDate
      ? formatDateByRemoveDash(cuExtendDate)
      : "";

    formValues.cuSisuldate = cuSisuldate
      ? formatDateByRemoveDash(cuSisuldate)
      : "";

    formValues.cuPdate = cuPdate ? formatDateByRemoveDash(cuPdate) : "";

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
      </ModalHeader>
      <div style={{ padding: "12px" }}>
        <Divider />
        <Wrapper grid>
          <Input
            label="거래처코드"
            register={register("cuCode")}
            errors={errors["cuCode"]?.message}
            inputSize={InputSize.sm}
          />
          <Input
            label="거래처명(건물명)"
            register={register("cuName")}
            errors={errors["cuName"]?.message}
            inputSize={InputSize.i150}
          />
          <Input
            label="사용자명"
            register={register("cuUsername")}
            errors={errors["cuUsername"]?.message}
            inputSize={InputSize.i150}
          />
        </Wrapper>

        <Wrapper grid>
          <Input
            label="전화번호"
            register={register("cuTel")}
            errors={errors["cuTel"]?.message}
            inputSize={InputSize.i150}
          />
          <Input
            register={register("cuTel21")}
            errors={errors["cuTel21"]?.message}
            inputSize={InputSize.i150}
          />

          <FormGroup>
            <Label>거래구분</Label>
            <Select {...register("cuType")} width={InputSize.i100}>
              {dataCommonDic?.cuType?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
        </Wrapper>

        <Wrapper grid>
          <Input
            label="핸드폰"
            register={register("cuHp")}
            errors={errors["cuHp"]?.message}
            formatNumber="telNumber"
          />
          <Input register={register("cuHp")} errors={errors["cuHp"]?.message} />

          <FormGroup>
            <Label>거래상태</Label>
            <Select {...register("cuStae")} width={InputSize.i100}>
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
            <Input label="주소" register={register("cuZipcode")} />
            <DaumAddress setAddress={setAddress} />
            <Input register={register("cuAddr1")} fullWidth />
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
                <Select {...register("cuSwCode")} width={InputSize.i100}>
                  {dataCommonDic?.cuSwCode?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>지역 분류</Label>
                <Select {...register("cuJyCode")} width={InputSize.i100}>
                  {dataCommonDic?.cuJyCode?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>관리자 분류</Label>
                <Select {...register("cuCustgubun")} width={InputSize.i100}>
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
                <Select {...register("cuCutype")} width={InputSize.i100}>
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
                inputSize={InputSize.i100}
              />

              <FormGroup>
                <Label>수금 방법</Label>
                <Select {...register("cuSukumtype")} width={InputSize.i100}>
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
                <Select {...register("cuJdc")} width={InputSize.i100}>
                  {dataCommonDic?.cuJdc?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code1}>
                      {obj.code1}
                    </option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>Vat 적용방법</Label>
                <Select {...register("cuVatKind")} width={InputSize.i100}>
                  {dataCommonDic?.cuVatKind?.map((obj: any, idx: number) => (
                    <option key={idx} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>원미만 금액계산</Label>
                <Select {...register("cuRoundType")} width={InputSize.i100}>
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
              <Input
                label="무료시설 투자비"
                register={register("cuSvKumack")}
                textAlign="right"
                inputSize={InputSize.i100}
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
                inputSize={InputSize.i100}
                textAlign="right"
              />
            </FormGroup>
            <FormGroup>
              <label>중량미수</label>
              <Input
                register={register("cuJmisu")}
                inputSize={InputSize.i100}
                textAlign="right"
              />
            </FormGroup>
            <FormGroup>
              <label>체적미수</label>
              <Input
                register={register("cuCmisu")}
                inputSize={InputSize.i100}
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
          />
          <TabContentWrapper>
            {getTabContent(
              tabId,
              data?.customerInfo[0],
              register,
              errors,
              dataCommonDic,
              setAddress2,
              reset,
              too,
              setToo,
              sign,
              setSign,
              //setCuRdangaType,
              setCuMeterTurm,
              setCuMeterDt,
              setCuMdate,
              //cuRdangaType,
              cuMeterTurm,
              cuMeterDt,
              cuMdate,
              setCuFinishDate,
              setCuCircuitDate,
              setCuScheduleDate,
              setTankFirstDate1,
              setTankOutsideDate1,
              setTankInsideDate1,
              setTankFirstDate2,
              setTankOutsideDate2,
              setTankInsideDate2,
              setGasifyCheckDate1,
              setGasifyCheckDate2,
              cuFinishDate,
              cuCircuitDate,
              cuScheduleDate,
              tankFirstDate1,
              tankOutsideDate1,
              tankInsideDate1,
              tankFirstDate2,
              tankOutsideDate2,
              tankInsideDate2,
              gasifyCheckDate1,
              gasifyCheckDate2,

              cuHdate,
              setCuHdate,
              cuGongdate,
              setCuGongdate,
              cuGongdateT,
              setCuGongdateT,
              cuExtendDate,
              setCuExtendDate,
              cuSisuldate,
              setCuSisuldate,
              cuPdate,
              setCuPdate
            )}
          </TabContentWrapper>
        </div>
      </div>
    </form>
  );
}

export default FormCM1105;
