// REACT
import React, { useEffect, useImperativeHandle, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
// COMPONENTS
import DaumAddress from "components/daum";
import CheckBox from "components/checkbox";
import { InputSize } from "components/componentsType";
import CustomDate from "components/customDatePicker";
import { SearchBtn } from "components/daum";
import { MagnifyingGlass } from "components/allSvgIcon";
import {
  Item,
  RadioButton,
  RadioButtonLabel,
} from "components/radioButton/style";
import {
  DividerGray,
  Field,
  FormGroup,
  Input,
  Label,
  Select,
  Divider,
  Wrapper,
} from "components/form/style";
// FORM
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./validation";
//API
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { ICM1200SEARCH } from "./modul";
import API from "app/axios";
import { CM1200DELETE, CM1200INSERT, CM1200UPDATE } from "app/path";
import {
  formatCurrencyRemoveComma,
  formatDate,
  formatDateByRemoveDash,
} from "helpers/dateFormat";

const Form = React.forwardRef(
  (
    {
      selected,
      selectedSupplyTab,
      fetchData,
      setData,
      selectedRowIndex,
      setSelected,
      setSelectedRowIndex,
    }: {
      selected: any;
      selectedSupplyTab: any;
      fetchData: any;
      setData: any;
      selectedRowIndex: number;
      setSelected: any;
      setSelectedRowIndex: any;
    },
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const [addr, setAddress] = useState<string>("");
    const [rdangaCalc, setRdangaCalc] = useState("");
    const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);
    const [rdangaTotal, setRdangaTotal] = useState(0);
    const { data: dataCommonDic } = useGetCommonDictionaryQuery({
      groupId: "CM",
      functionName: "CM1200",
    });

    console.log("selected", selected, dataCommonDic);
    console.log("selectedSupplyTab", selectedSupplyTab[0]);

    const {
      handleSubmit,
      reset,
      register,
      getValues,
      formState: { errors },
    } = useForm<ICM1200SEARCH>({
      mode: "onChange",
      resolver: yupResolver(schema),
    });

    useEffect(() => {
      if (JSON.stringify(selected) !== "{}") {
        resetForm("reset");
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected]);

    useEffect(() => {
      if (addr) {
        reset({
          cuZipcode: addr ? addr?.split("/")[1] : "",
          cuAddr1: addr ? addr?.split("/")[2] : "",
          cuAddr2: addr ? addr?.split("/")[3] : "",
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addr]);

    useEffect(() => {
      reset({
        cuJyCode: dataCommonDic?.cuJyCode[0].code,
        cuSwCode: dataCommonDic?.cuSwCode[0].code,
        cuCustgubun: dataCommonDic?.cuCustgubun[0].code,

        cuRh20: dataCommonDic?.cuRh20[0].code,
        cuRdangaType: dataCommonDic?.cuRdangaType[0].code,
        cuRdangaSign: dataCommonDic?.cuRdangaSign[0].code,

        cuSukumtype: dataCommonDic?.cuSukumtype[0].code,
        cuGumTurm: dataCommonDic?.cuGumTurm[0].code,

        // cuGumdate: dataCommonDic?.cuGumdate[0].code, // dataCommonDic-d baihgvi
        // cuCylinderName: dataCommonDic?.cuCylinderName[0].code, // dataCommonDic-d baihgvi

        // areaCode: dataCommonDic?.areaCode[0].code,
        // tankMakeVol1: dataCommonDic?.tankMakeVol1[0].code,
        // tankMakeVol2: dataCommonDic?.tankMakeVol2[0].code,
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataCommonDic]);

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      resetForm,
      setIsAddBtnClicked,
      crud,
    }));

    const resetForm = (type: string) => {
      if (selected !== undefined && JSON.stringify(selected) !== "{}") {
        const newFormData = { ...selected, ...selectedSupplyTab[0] };
        console.log("---newFormData", newFormData);
        let newData: any = {};

        if (type === "clear") {
          for (const [key, value] of Object.entries(newFormData)) {
            newData[key] = null;
          }
          reset(newData);
        }

        if (type === "reset") {
          for (const [key, value] of Object.entries(newFormData)) {
            newData[key] = value;
          }
          reset({
            ...newData,
            cuAptnameYn: newFormData?.cuAptnameYn === "Y",
            chkCuZipCode: newFormData?.chkCuZipCode === "Y",
            chkCuRh20: newFormData?.chkCuRh20 === "Y",
            chkCuRdange: newFormData?.chkCuRdange === "Y",

            chkCuAnKum: newFormData?.chkCuAnKum === "Y",
            ckCuSisulKum: newFormData?.ckCuSisulKum === "Y",
            chkCuMeterKum: newFormData?.chkCuMeterKum === "Y",

            chkCuPer: newFormData?.chkCuPer === "Y",
            chkCuCdc: newFormData?.chkCuCdc === "Y",
            chkCuSukumtype: newFormData?.chkCuSukumtype === "Y",
            chkCuGumTurm: newFormData?.chkCuGumTurm === "Y",
            chkCuGumdate: newFormData?.chkCuGumdate === "Y",
            chkCuCno: newFormData?.chkCuCno === "Y",

            cuFinishDate: newFormData?.cuFinishDate
              ? formatDate(newFormData?.cuFinishDate)
              : "",
            cuCircuitDate: newFormData?.cuCircuitDate
              ? formatDate(newFormData?.cuCircuitDate)
              : "",
            cuScheduleDate: newFormData?.cuScheduleDate
              ? formatDate(newFormData?.cuScheduleDate)
              : "",
          });
          setRdangaTotal(0);
        }
      }
    };

    const crud = async (type: string | null) => {
      if (type === "delete") {
        const formValues = getValues();

        try {
          const response: any = await API.post(CM1200DELETE, formValues);
          if (response.status === 200) {
            toast.success("Deleted", {
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

    const submit = async (data: ICM1200SEARCH) => {
      const formValues = getValues();
      const path = isAddBtnClicked ? CM1200INSERT : CM1200UPDATE;
      console.log("formValues", formValues);

      formValues.areaCode = "00";
      formValues.cuAptnameYn = formValues.cuAptnameYn ? "Y" : "N";
      formValues.chkCuZipCode = formValues.chkCuZipCode ? "Y" : "N";
      formValues.chkCuRh20 = formValues.chkCuRh20 ? "Y" : "N";
      formValues.chkCuRdange = formValues.chkCuRdange ? "Y" : "N";

      formValues.chkCuAnKum = formValues.chkCuAnKum ? "Y" : "N";
      formValues.ckCuSisulKum = formValues.ckCuSisulKum ? "Y" : "N";
      formValues.chkCuMeterKum = formValues.chkCuMeterKum ? "Y" : "N";

      formValues.chkCuPer = formValues.chkCuPer ? "Y" : "N";
      formValues.chkCuCdc = formValues.chkCuCdc ? "Y" : "N";
      formValues.chkCuSukumtype = formValues.chkCuSukumtype ? "Y" : "N";
      formValues.chkCuGumTurm = formValues.chkCuMeterKum ? "Y" : "N";
      formValues.chkCuGumdate = formValues.chkCuGumdate ? "Y" : "N";
      formValues.chkCuCno = formValues.chkCuCno ? "Y" : "N";

      formValues.cuAnKum = formValues.cuAnKum
        ? formatCurrencyRemoveComma(formValues.cuAnKum)
        : "";
      formValues.cuSisulKum = formValues.cuSisulKum
        ? formatCurrencyRemoveComma(formValues.cuSisulKum)
        : "";
      formValues.cuMeterKum = formValues.cuMeterKum
        ? formatCurrencyRemoveComma(formValues.cuMeterKum)
        : "";

      formValues.cuFinishDate = formValues.cuFinishDate
        ? formatDateByRemoveDash(formValues.cuFinishDate)
        : "";
      formValues.cuCircuitDate = formValues.cuCircuitDate
        ? formatDateByRemoveDash(formValues.cuCircuitDate)
        : "";
      formValues.cuScheduleDate = formValues.cuScheduleDate
        ? formatDateByRemoveDash(formValues.cuScheduleDate)
        : "";

      try {
        const response: any = await API.post(path, formValues);
        if (response.status === 200) {
          if (isAddBtnClicked) {
            setData((prev: any) => [formValues, ...prev]);
            setSelectedRowIndex(0);
          } else {
            setData((prev: any) => {
              prev[selectedRowIndex] = formValues;
              console.log("prev", prev);
              return [...prev];
            });
          }
          setSelected(formValues);
          toast.success("Action successful", {
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

    const renderRdangaATM = (e: any) => {
      setRdangaCalc(e.target.value);
      var bill = e.target.value;
      var number = Number(getValues("cuRdangaAmt"));

      const total =
        bill !== "X"
          ? eval(`${selected?.cuRdanga} ${bill} ${number}`)
          : eval(`${selected?.cuRdanga} ${`*`} ${number}/100`);

      setRdangaTotal(total);
    };

    return (
      <form onSubmit={handleSubmit(submit)}>
        {/* 1-1 Wrapper */}
        <Divider />
        <Wrapper grid col={3}>
          <Input
            label="건물코드"
            maxLength="3"
            name="cuCode"
            register={register("cuCode")}
            errors={errors["cuCode"]?.message}
          />
          <Input label="건물명" register={register("cuName")} />
          <CheckBox
            title="건물명 지로 출력 안함."
            register={register("cuAptnameYn")}
            rtl={true}
          />
        </Wrapper>
        <DividerGray />
        {/* 1-2 Wrapper */}
        <Wrapper col={3}>
          <Field>
            <FormGroup>
              <Label>
                <CheckBox
                  title=""
                  register={register("chkCuZipCode")}
                  rtl={false}
                />
              </Label>
              <Input
                register={register("cuZipcode")}
                inputSize={InputSize.xs}
              />

              <DaumAddress setAddress={setAddress} />
            </FormGroup>
          </Field>
          <Input register={register("cuAddr1")} inputSize={InputSize.md} />
          <Input register={register("cuAddr2")} inputSize={InputSize.md} />
        </Wrapper>
        <DividerGray />
        {/* 1-3 Wrapper */}
        <Wrapper grid col={3}>
          <Field>
            <FormGroup>
              <Label>담당사원</Label>
              <Select {...register("cuSwCode")} fullWidth>
                {dataCommonDic?.cuSwCode?.map((option: any, index: number) => {
                  return (
                    <option key={index} value={option.code}>
                      {option.codeName}
                    </option>
                  );
                })}
              </Select>
            </FormGroup>
          </Field>
          <Field>
            <FormGroup>
              <Label>지역분류</Label>
              <Select {...register("cuJyCode")} style={{ width: "60%" }}>
                {dataCommonDic?.cuJyCode?.map((option: any, index: number) => {
                  return (
                    <option key={index} value={option.code}>
                      {option.codeName}
                    </option>
                  );
                })}
              </Select>
              <SearchBtn
                type="button"
                onClick={() => console.log("cuZipCode BTN")}
              >
                <MagnifyingGlass />
              </SearchBtn>
            </FormGroup>
          </Field>
          <Field>
            <FormGroup>
              <Label>관리자분류</Label>
              <Select {...register("cuCustgubun")} fullWidth>
                {dataCommonDic?.cuCustgubun?.map(
                  (option: any, index: number) => {
                    return (
                      <option key={index} value={option.code}>
                        {option.codeName}
                      </option>
                    );
                  }
                )}
              </Select>
            </FormGroup>
          </Field>
        </Wrapper>
        <Divider />
        {/* 2-1 Wrapper */}
        <Wrapper grid col={3}>
          <Field>
            <FormGroup>
              {/* 1 - urd taliin selectees hamaarsan dun garna input idewhigvi, 
              2 - huwi ntr bodolttoi
              3 - gants input bna
              */}
              <Label>
                <CheckBox
                  title="조정기"
                  register={register("chkCuRh20")}
                  rtl={false}
                />
              </Label>
              <Select {...register("cuRh20")} inputWidth="175px">
                {dataCommonDic?.cuRh20?.map((option: any, index: number) => {
                  return (
                    <option key={index} value={option.code}>
                      {option.codeName}
                    </option>
                  );
                })}
              </Select>
              <p>mmH20</p>
            </FormGroup>
          </Field>
          <Field>
            <FormGroup>
              <Label>
                <CheckBox
                  title="루베단가 "
                  register={register("chkCuRdange")}
                  rtl={false}
                />
              </Label>
              <Select {...register("cuRdangaType")} inputWidth="175px">
                {dataCommonDic?.cuRdangaType.map(
                  (option: any, index: number) => {
                    return (
                      <option key={index} value={option.code}>
                        {option.codeName}
                      </option>
                    );
                  }
                )}
              </Select>
            </FormGroup>
          </Field>
          <Field>
            <FormGroup>
              {/* cuRdanga  */}
              <p>{selected?.cuRdanga} 원</p>
              <Select
                {...register("cuRdangaSign")}
                onChange={(e: any) => renderRdangaATM(e)}
                style={{ minWidth: "15%" }}
              >
                {dataCommonDic?.cuRdangaSign.map(
                  (option: any, index: number) => {
                    return (
                      <option key={index} value={option.code}>
                        {option.codeName}
                      </option>
                    );
                  }
                )}
              </Select>
              <Input
                inputSize={InputSize.xs}
                textAlign="right"
                register={register("cuRdangaAmt")}
              />
              <p>
                {rdangaCalc === "X" ? "%" : rdangaCalc === "+" ? "원" : "원"}
              </p>
              <p>=</p>
              <p>{rdangaTotal} 원</p>
            </FormGroup>
          </Field>
        </Wrapper>
        <DividerGray />
        {/* 2-2 Wrapper */}
        <Wrapper grid col={3}>
          <Field>
            <FormGroup>
              <Label>
                <CheckBox
                  title="관리비"
                  register={register("chkCuAnKum")}
                  rtl={false}
                />
              </Label>
              <Input
                register={register("cuAnKum")}
                textAlign="right"
                formatNumber="comDecNumber"
              />
              <p>원</p>
            </FormGroup>
          </Field>
          <Field>
            <FormGroup>
              <Label>
                <CheckBox
                  title="시설비"
                  register={register("ckCuSisulKum")}
                  rtl={false}
                />
              </Label>
              <Input
                register={register("cuSisulKum")}
                textAlign="right"
                formatNumber="comDecNumber"
              />
              <p>{selected?.cuSukumType}</p>
            </FormGroup>
          </Field>
          <Field>
            <FormGroup>
              <Label>
                <CheckBox
                  title="계량기"
                  register={register("chkCuMeterKum")}
                  rtl={false}
                />
              </Label>
              <Input
                register={register("cuMeterKum")}
                textAlign="right"
                formatNumber="comDecNumber"
              />
              <p>원</p>
            </FormGroup>
          </Field>
        </Wrapper>
        <DividerGray />
        {/* 2-3 Wrapper */}
        <Wrapper grid col={3}>
          <Field>
            <FormGroup>
              <Label>
                <CheckBox
                  title="연체율"
                  register={register("chkCuPer")}
                  rtl={false}
                />
              </Label>
              <Input
                register={register("cuPer")}
                type="number"
                textAlign="right"
              />
              <p>{`%`}</p>
            </FormGroup>
          </Field>
          <Field>
            <FormGroup>
              <Label>
                <CheckBox
                  title="할인율"
                  register={register("chkCuCdc")}
                  rtl={false}
                />
              </Label>
              <Input
                register={register("cuCdc")}
                textAlign="right"
                type="number"
              />
              <p>{`%`}</p>
            </FormGroup>
          </Field>
          <Field>
            <FormGroup>
              <Label>
                <CheckBox
                  title="수금방법"
                  register={register("chkCuSukumtype")}
                  rtl={false}
                />
              </Label>
              <Select {...register("cuSukumtype")} inputWidth="175px">
                {dataCommonDic?.cuSukumtype?.map(
                  (option: any, index: number) => {
                    return (
                      <option key={index} value={option.code}>
                        {option.codeName}
                      </option>
                    );
                  }
                )}
              </Select>
            </FormGroup>
          </Field>
        </Wrapper>
        <DividerGray />
        {/* 2-4 Wrapper */}
        <Wrapper grid col={3}>
          <Field>
            <FormGroup>
              <Label>
                <CheckBox
                  title="검침주기"
                  register={register("chkCuGumTurm")}
                  rtl={false}
                />
              </Label>
              <Select {...register("cuGumTurm")} inputWidth="175px">
                {dataCommonDic?.cuGumTurm?.map((option: any, index: number) => {
                  return (
                    <option key={index} value={option.code}>
                      {option.codeName}
                    </option>
                  );
                })}
              </Select>
            </FormGroup>
          </Field>
          <Field>
            <FormGroup>
              <Label>
                <CheckBox
                  title="검침일"
                  register={register("chkCuGumdate")}
                  rtl={false}
                />
              </Label>
              <Select {...register("cuGumdate")} inputWidth="175px">
                {dataCommonDic?.cuGumdate?.map((option: any, index: number) => {
                  return (
                    <option key={index} value={option.code}>
                      {option.codeName}
                    </option>
                  );
                })}
              </Select>
              <p>일</p>
            </FormGroup>
          </Field>
          <Field>
            <FormGroup>
              <Label>
                <CheckBox
                  title="순 번"
                  register={register("chkCuCno")}
                  rtl={false}
                />
              </Label>
              <Input register={register("cuCno")} />
            </FormGroup>
          </Field>
        </Wrapper>
        <Divider />
        {/* 3-1-1 Wrapper */}
        <Wrapper grid col={4}>
          <Field>
            <FormGroup>
              <Label>공급시설구분</Label>
              {[
                { name: "벌크공급", value: "Y" },
                { name: "용기공급", value: "N" },
              ].map((option, index) => {
                return (
                  <Item key={index}>
                    <RadioButton
                      type="radio"
                      value={option.value}
                      {...register("cuTankYn")}
                      id={option.value}
                    />
                    <RadioButtonLabel htmlFor={`${option.value}`}>
                      {option.name}
                    </RadioButtonLabel>
                  </Item>
                );
              })}
            </FormGroup>
          </Field>
          <Field>
            <FormGroup>
              <CustomDate
                label="완성검사일"
                name="cuFinishDate"
                register={register("cuFinishDate")}
                reset={reset}
              />
            </FormGroup>
          </Field>
          <Field>
            <FormGroup>
              <CustomDate
                label="정기검사일"
                name="cuCircuitDate"
                register={register("cuCircuitDate")}
                reset={reset}
              />
            </FormGroup>
          </Field>
          <Field>
            <FormGroup>
              <CustomDate
                label="검사예정일"
                name="cuScheduleDate"
                register={register("cuScheduleDate")}
                reset={reset}
              />
            </FormGroup>
          </Field>
        </Wrapper>
        <DividerGray />
        {/* 3-2-1 Wrapper */}
        <Field flex>
          <FormGroup>
            <Label>벌크 시설</Label>
          </FormGroup>
          <Wrapper grid col={8}>
            <Label align={"center"}>제조사</Label>
            <Label align={"center"}>용량(kg)</Label>
            <Label align={"center"}>제조번호</Label>
            <Label align={"center"}>제작년월</Label>
            <Label align={"center"}>대여처</Label>
            <Label align={"center"}>최초검사</Label>
            <Label align={"center"}>외관검사</Label>
            <Label align={"center"}>개방검사</Label>
          </Wrapper>
        </Field>
        <DividerGray />
        {/* 3-2-2 Wrapper */}
        <Field flex>
          <FormGroup>
            <Label>{`1)`}</Label>
          </FormGroup>
          <Wrapper grid col={8}>
            <Field>
              <FormGroup>
                <Select {...register("makeCo1")} fullWidth>
                  {dataCommonDic?.makeCo1?.map((option: any, index: number) => {
                    return (
                      <option key={index} value={option.code}>
                        {option.codeName}
                      </option>
                    );
                  })}
                </Select>
              </FormGroup>
            </Field>
            <Field>
              <FormGroup>
                <Select {...register("tankVol1")} fullWidth>
                  {dataCommonDic?.tankVol1?.map(
                    (option: any, index: number) => {
                      return (
                        <option key={index} value={option.code}>
                          {option.codeName}
                        </option>
                      );
                    }
                  )}
                </Select>
              </FormGroup>
            </Field>
            <Field>
              <FormGroup>
                <Input register={register("tankMakeSno1")} />
              </FormGroup>
            </Field>
            <Field>
              <FormGroup>
                <Input register={register("tankMakeDate1")} />
              </FormGroup>
            </Field>
            <Field>
              <FormGroup>
                <Input register={register("tankRcv1")} />
              </FormGroup>
            </Field>
            <Field>
              <FormGroup>
                <CustomDate
                  name="tankFinishDate1"
                  register={register("tankFinishDate1")}
                  reset={reset}
                />
              </FormGroup>
            </Field>
            <Field>
              <FormGroup>
                <CustomDate
                  name="tankOutsiderDate1"
                  register={register("tankOutsiderDate1")}
                  reset={reset}
                />
              </FormGroup>
            </Field>
            <Field>
              <FormGroup>
                <CustomDate
                  name="tankInsiderDate1"
                  register={register("tankInsiderDate1")}
                  reset={reset}
                />
              </FormGroup>
            </Field>
          </Wrapper>
        </Field>
        <DividerGray />
        {/* 3-2-3 Wrapper */}
        <Field flex>
          <FormGroup>
            <Label>{`2)`}</Label>
          </FormGroup>
          <Wrapper grid col={8}>
            <Field>
              <FormGroup>
                <Select {...register("makeCo2")} fullWidth>
                  {dataCommonDic?.makeCo2?.map((option: any, index: number) => {
                    return (
                      <option key={index} value={option.code}>
                        {option.codeName}
                      </option>
                    );
                  })}
                </Select>
              </FormGroup>
            </Field>
            <Field>
              <FormGroup>
                <Select {...register("tankVol2")} fullWidth>
                  {dataCommonDic?.tankVol2?.map(
                    (option: any, index: number) => {
                      return (
                        <option key={index} value={option.code}>
                          {option.codeName}
                        </option>
                      );
                    }
                  )}
                </Select>
              </FormGroup>
            </Field>
            <Field>
              <FormGroup>
                <Input register={register("tankMakeSno2")} />
              </FormGroup>
            </Field>
            <Field>
              <FormGroup>
                <Input register={register("tankMakeDate2")} />
              </FormGroup>
            </Field>
            <Field>
              <FormGroup>
                <Input register={register("tankRcv1")} />
              </FormGroup>
            </Field>
            <Field>
              <FormGroup>
                <CustomDate
                  name="tankFinishDate2"
                  register={register("tankFinishDate2")}
                  reset={reset}
                />
              </FormGroup>
            </Field>
            <Field>
              <FormGroup>
                <CustomDate
                  name="tankOutsiderDate2"
                  register={register("tankOutsiderDate2")}
                  reset={reset}
                />
              </FormGroup>
            </Field>
            <Field>
              <FormGroup>
                <CustomDate
                  name="tankInsiderDate2"
                  register={register("tankInsiderDate2")}
                  reset={reset}
                />
              </FormGroup>
            </Field>
          </Wrapper>
        </Field>
        <DividerGray />
        {/* 3-3-1 Wrapper */}
        <Field flex>
          <FormGroup>
            <Label>용기시설</Label>
          </FormGroup>
          <Wrapper grid col={3}>
            <Field style={{ padding: "0px 5px" }}>
              <FormGroup>
                {[
                  { name: "일반", value: "Y" },
                  { name: "싸이폰", value: "N" },
                ].map((option, index) => {
                  return (
                    <Item key={index}>
                      <RadioButton
                        type="radio"
                        value={index}
                        {...register("cuCylinderType")}
                        id={option.value}
                      />
                      <RadioButtonLabel htmlFor={``}>
                        {option.name}
                      </RadioButtonLabel>
                    </Item>
                  );
                })}
              </FormGroup>
            </Field>
            <Field style={{ padding: "0px 5px" }}>
              <FormGroup>
                <Label align="center">용기수량</Label>
                <Select {...register("cuCylinderName")} inputWidth="175px">
                  {dataCommonDic?.cuCylinderName?.map(
                    (option: any, index: number) => {
                      return (
                        <option key={index} value={option.code}>
                          {option.codeName}
                        </option>
                      );
                    }
                  )}
                </Select>
                <p>x</p>
                <Input
                  register={register("cuCylinderQty")}
                  inputSize={InputSize.xs}
                />
                <p>개</p>
              </FormGroup>
            </Field>
            <Field>
              <FormGroup>
                <Label>발신기코드 / 절체고객코드</Label>
                <Input
                  register={register("cuTransmCd")}
                  inputSize={InputSize.sm}
                />
                <Input
                  register={register("cuTransmCuCd")}
                  inputSize={InputSize.sm}
                />
                <SearchBtn
                  type="button"
                  onClick={() => console.log("cuTransmCuCd")}
                >
                  <MagnifyingGlass />
                </SearchBtn>
              </FormGroup>
            </Field>
          </Wrapper>
        </Field>
        <DividerGray />
        {/* 3-4-1 Wrapper */}
        <Field flex>
          <FormGroup>
            <Label>기화기</Label>
          </FormGroup>
          <Wrapper grid col={8}>
            <Label align={"center"}>제조사</Label>
            <Label align={"center"}>용량(kg)</Label>
            <Label align={"center"}>제조번호</Label>
            <Label align={"center"}>제작년월</Label>
            <Label align={"center"}>전원</Label>
            <Label align={"center"}>장치검사</Label>
            <FormGroup>{` `}</FormGroup>
            <FormGroup>{` `}</FormGroup>
          </Wrapper>
        </Field>
        <DividerGray />

        {/* 3-4-2 Wrapper */}
        <Field flex>
          <FormGroup>
            <Label>{`1)`}</Label>
          </FormGroup>

          <Wrapper grid col={8}>
            <Field>
              <FormGroup>
                <Select {...register("gasifyCo1")} fullWidth>
                  {dataCommonDic?.gasifyCo1?.map(
                    (option: any, index: number) => {
                      return (
                        <option key={index} value={option.code}>
                          {option.codeName}
                        </option>
                      );
                    }
                  )}
                </Select>
              </FormGroup>
            </Field>
            <Field>
              <FormGroup>
                <Select {...register("gasifyVol1")} fullWidth>
                  {dataCommonDic?.gasifyVol1?.map(
                    (option: any, index: number) => {
                      return (
                        <option key={index} value={option.code}>
                          {option.codeName}
                        </option>
                      );
                    }
                  )}
                </Select>
              </FormGroup>
            </Field>
            <Field>
              <FormGroup>
                <Input register={register("gasifySno1")} />
              </FormGroup>
            </Field>
            <Field>
              <FormGroup>
                <Input register={register("gasifyMakeDate1")} />
              </FormGroup>
            </Field>
            <Field>
              <FormGroup>
                <Input register={register("gasifyPower1")} />
              </FormGroup>
            </Field>
            <Field>
              <CustomDate
                name="gasifyCheckDate1"
                register={register("gasifyCheckDate1")}
                reset={reset}
              />
            </Field>
            <Field>
              <FormGroup>{` `}</FormGroup>
            </Field>
            <Field>
              <FormGroup>{` `}</FormGroup>
            </Field>
          </Wrapper>
        </Field>
        <DividerGray />
        {/* 3-4-3 Wrapper */}
        <Field flex>
          <FormGroup>
            <Label>{`2)`}</Label>
          </FormGroup>
          <Wrapper grid col={8}>
            <Field>
              <FormGroup>
                <Select {...register("gasifyCo2")} fullWidth>
                  {dataCommonDic?.gasifyCo2?.map(
                    (option: any, index: number) => {
                      return (
                        <option key={index} value={option.code}>
                          {option.codeName}
                        </option>
                      );
                    }
                  )}
                </Select>
              </FormGroup>
            </Field>
            <Field>
              <FormGroup>
                <Select {...register("gasifyVol2")} fullWidth>
                  {dataCommonDic?.gasifyVol2?.map(
                    (option: any, index: number) => {
                      return (
                        <option key={index} value={option.code}>
                          {option.codeName}
                        </option>
                      );
                    }
                  )}
                </Select>
              </FormGroup>
            </Field>
            <Field>
              <FormGroup>
                <Input register={register("gasifySno2")} />
              </FormGroup>
            </Field>
            <Field>
              <FormGroup>
                <Input register={register("gasifyMakeDate2")} />
              </FormGroup>
            </Field>
            <Field>
              <FormGroup>
                <Input register={register("gasifyPower2")} />
              </FormGroup>
            </Field>
            <Field>
              <CustomDate
                name="gasifyCheckDate2"
                register={register("gasifyCheckDate2")}
                reset={reset}
              />
            </Field>
            <Field>
              <FormGroup>{` `}</FormGroup>
            </Field>
            <Field>
              <FormGroup>{` `}</FormGroup>
            </Field>
          </Wrapper>
        </Field>
        <Divider />
      </form>
    );
  }
);

export default Form;
