// REACT
import React, { useEffect, useImperativeHandle, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
// COMPONENTS
import DaumAddress from "components/daum";
import CheckBox from "components/checkbox";
import { InputSize } from "components/componentsType";
import CustomDatePicker from "components/customDatePicker/customdate2";
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
      dataCommonDic,
      selectedSupplyTab,
      fetchData,
      setData,
      selectedRowIndex,
      setSelected,
      setSelectedRowIndex,
      selectAreaCode,
      setSelectAreaCode,
    }: {
      selected: any;
      dataCommonDic: any;
      selectedSupplyTab: any;
      fetchData: any;
      setData: any;
      selectedRowIndex: number;
      setSelected: any;
      setSelectedRowIndex: any;
      selectAreaCode?: string;
      setSelectAreaCode?: any;
    },
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const [addr, setAddress] = useState<string>("");
    const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);

    // CustomDatePickers
    const [cuFinishDate, setCuFinishDate] = useState("");
    const [cuCircuitDate, setCuCircuitDate] = useState("");
    const [cuScheduleDate, setCuScheduleDate] = useState("");
    const [tankFirstDate1, setTankFirstDate1] = useState("");
    const [tankFirstDate2, setTankFirstDate2] = useState("");
    const [tankOutsideDate1, setTankOutsideDate1] = useState("");
    const [tankOutsideDate2, setTankOutsideDate2] = useState("");
    const [tankInsideDate1, setTankInsideDate1] = useState("");
    const [tankInsideDate2, setTankInsideDate2] = useState("");
    const [gasifyCheckDate1, setGasifyCheckDate1] = useState("");
    const [gasifyCheckDate2, setGasifyCheckDate2] = useState("");
    const [clearNumberic, setClearNumberic] = useState(false);

    const {
      handleSubmit,
      reset,
      register,
      getValues,
      setValue,
      watch,
      formState: { errors },
    } = useForm<ICM1200SEARCH>({
      mode: "onChange",
      resolver: yupResolver(schema),
    });

    useEffect(() => {
      if (JSON.stringify(selected) !== "{}") {
        resetForm("reset");
        setClearNumberic(false);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected]);

    useEffect(() => {
      if (addr) {
        reset({
          cuZipcode: addr ? addr?.split("/")[1] : "",
          cuAddr1: addr ? addr?.split("/")[0].split("(")[0] : "",
          cuAddr2: addr ? `(${addr?.split("/")[0].split("(")[1]}` : "",
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addr]);

    useEffect(() => {
      reset({
        cuJyCode: dataCommonDic?.cuJyCode[0].code,
        cuSwCode: dataCommonDic?.cuSwCode[0].code,
        cuCustgubun: dataCommonDic?.cuCustgubun[0].code,

        cuRh2o: dataCommonDic?.cuRh20[0].code,
        cuRdangaType: dataCommonDic?.cuRdangaType[0].code,
        cuRdangaSign: dataCommonDic?.cuRdangaSign[0].code,

        cuSukumtype: dataCommonDic?.cuSukumtype[0].code,
        cuGumTurm: dataCommonDic?.cuGumTurm[0].code,

        tankMakeCo1: dataCommonDic?.tankMakeCo1[0].code,
        tankMakeCo2: dataCommonDic?.tankMakeCo2[0].code,
        tankVol1: dataCommonDic?.tankVol1[0].code,
        tankVol2: dataCommonDic?.tankVol2[0].code,

        gasifyCo1: dataCommonDic?.gasifyCo1[0].code,
        gasifyCo2: dataCommonDic?.gasifyCo2[0].code,
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
        let newData: any = {};

        if (type === "clear") {
          for (const [key, value] of Object.entries(newFormData)) {
            newData[key] = null;
          }
          reset(newData);
          setCuFinishDate("");
          setCuCircuitDate("");
          setCuScheduleDate("");
          setTankFirstDate1("");
          setTankFirstDate2("");
          setTankOutsideDate1("");
          setTankOutsideDate2("");
          setTankInsideDate1("");
          setTankInsideDate2("");
          setGasifyCheckDate1("");
          setGasifyCheckDate2("");
          setSelectAreaCode("");
          setClearNumberic(true);
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
          });

          setCuFinishDate(
            newFormData?.cuFinishDate
              ? formatDate(newFormData?.cuFinishDate)
              : ""
          );
          setCuCircuitDate(
            newFormData?.cuCircuitDate
              ? formatDate(newFormData?.cuCircuitDate)
              : ""
          );
          setCuScheduleDate(
            newFormData?.cuScheduleDate
              ? formatDate(newFormData?.cuScheduleDate)
              : ""
          );
          setTankFirstDate1(
            newFormData?.tankFirstDate1
              ? formatDate(newFormData?.tankFirstDate1)
              : ""
          );
          setTankFirstDate2(
            newFormData?.tankFirstDate2
              ? formatDate(newFormData?.tankFirstDate2)
              : ""
          );
          setTankOutsideDate1(
            newFormData?.tankOutsideDate1
              ? formatDate(newFormData?.tankOutsideDate1)
              : ""
          );
          setTankOutsideDate2(
            newFormData?.tankOutsideDate2
              ? formatDate(newFormData?.tankOutsideDate2)
              : ""
          );
          setTankInsideDate1(
            newFormData?.tankInsideDate1
              ? formatDate(newFormData?.tankInsideDate1)
              : ""
          );
          setTankInsideDate2(
            newFormData?.tankInsideDate2
              ? formatDate(newFormData?.tankInsideDate2)
              : ""
          );

          setGasifyCheckDate1(
            newFormData?.gasifyCheckDate1
              ? formatDate(newFormData?.gasifyCheckDate1)
              : ""
          );
          setGasifyCheckDate2(
            newFormData?.gasifyCheckDate2
              ? formatDate(newFormData?.gasifyCheckDate2)
              : ""
          );
          setClearNumberic(false);
          setSelectAreaCode(selected?.areaCode);
        }
      }
    };

    const crud = async (type: string | null) => {
      if (type === "delete") {
        const formValues = getValues();

        try {
          const response: any = await API.post(CM1200DELETE, formValues);
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

    const submit = async (data: ICM1200SEARCH) => {
      let newRemovedData: any = {};
      const formValues = getValues();

      for (const [key, value] of Object.entries(formValues)) {
        if (
          key !== "tankMakeCo1" &&
          key !== "tankMakeCo2" &&
          key !== "tankVol2" &&
          key !== "tankVol2" &&
          key !== "tankMakeSno2" &&
          key !== "tankMakeSno2" &&
          key !== "tankMakeDate1" &&
          key !== "tankMakeDate2" &&
          key !== "tankRcv1" &&
          key !== "tankRcv2" &&
          key !== "tankFirstDate1" &&
          key !== "tankFirstDate2" &&
          key !== "tankOutsideDate1" &&
          key !== "tankOutsideDate2" &&
          key !== "tankInsideDate1" &&
          key !== "tankInsideDate2" &&
          key !== "gasifyCo1" &&
          key !== "gasifyCo2" &&
          key !== "gasifyVol1" &&
          key !== "gasifyVol2" &&
          key !== "gasifySno1" &&
          key !== "gasifySno2" &&
          key !== "gasifyMakeDate1" &&
          key !== "gasifyMakeDate2" &&
          key !== "gasifyPower1" &&
          key !== "gasifyPower2" &&
          key !== "gasifyCheckDate1" &&
          key !== "gasifyCheckDate2"
        ) {
          newRemovedData[key] = value;
        }
      }

      const path = isAddBtnClicked ? CM1200INSERT : CM1200UPDATE;

      newRemovedData.areaCode = selectAreaCode;
      newRemovedData.cuAptnameYn = newRemovedData.cuAptnameYn ? "Y" : "N";
      newRemovedData.chkCuZipCode = newRemovedData.chkCuZipCode ? "Y" : "N";
      newRemovedData.chkCuRh20 = newRemovedData.chkCuRh20 ? "Y" : "N";
      newRemovedData.chkCuRdange = newRemovedData.chkCuRdange ? "Y" : "N";

      newRemovedData.chkCuAnKum = newRemovedData.chkCuAnKum ? "Y" : "N";
      newRemovedData.ckCuSisulKum = newRemovedData.ckCuSisulKum ? "Y" : "N";
      newRemovedData.chkCuMeterKum = newRemovedData.chkCuMeterKum ? "Y" : "N";

      newRemovedData.chkCuPer = newRemovedData.chkCuPer ? "Y" : "N";
      newRemovedData.chkCuCdc = newRemovedData.chkCuCdc ? "Y" : "N";
      newRemovedData.chkCuSukumtype = newRemovedData.chkCuSukumtype ? "Y" : "N";
      newRemovedData.chkCuGumTurm = newRemovedData.chkCuMeterKum ? "Y" : "N";
      newRemovedData.chkCuGumdate = newRemovedData.chkCuGumdate ? "Y" : "N";
      newRemovedData.chkCuCno = newRemovedData.chkCuCno ? "Y" : "N";

      newRemovedData.cuAnKum = newRemovedData.cuAnKum
        ? formatCurrencyRemoveComma(newRemovedData.cuAnKum)
        : "";
      newRemovedData.cuSisulKum = newRemovedData.cuSisulKum
        ? formatCurrencyRemoveComma(newRemovedData.cuSisulKum)
        : "";
      newRemovedData.cuMeterKum = newRemovedData.cuMeterKum
        ? formatCurrencyRemoveComma(newRemovedData.cuMeterKum)
        : "";

      newRemovedData.cuFinishDate = cuFinishDate
        ? formatDateByRemoveDash(cuFinishDate)
        : "";
      newRemovedData.cuCircuitDate = cuCircuitDate
        ? formatDateByRemoveDash(cuCircuitDate)
        : "";
      newRemovedData.cuScheduleDate = cuScheduleDate
        ? formatDateByRemoveDash(cuScheduleDate)
        : "";

      newRemovedData.cuRdangaAmt =
        newRemovedData.cuRdangaType != "1"
          ? 0
          : Number(newRemovedData.cuRdangaAmt);
      newRemovedData.cuRdanga = Number(newRemovedData.cuRdanga);

      if (selectAreaCode) {
        try {
          const response: any = await API.post(path, newRemovedData);
          if (response.status === 200) {
            if (isAddBtnClicked) {
              setData((prev: any) => [newRemovedData, ...prev]);
              setSelectedRowIndex(0);
            } else {
              setData((prev: any) => {
                prev[selectedRowIndex] = newRemovedData;
                return [...prev];
              });
            }
            setSelected(newRemovedData);
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
      } else {
        toast.error("지역코드 선택하세요", {
          autoClose: 500,
        });
      }
    };

    const renderRdangaCalc = () => {
      var selectedcuRdanga = watch("cuRdanga") ?? 0;
      var selectedRdangaType = watch("cuRdangaType");
      var selectedRdangaSign = watch("cuRdangaSign") ?? null;
      var selectedRdangaAmt = watch("cuRdangaAmt") ?? 0;
      var totalValue = 0;

      if (selectedRdangaSign === null) {
        totalValue = 0;
      } else if (selectedRdangaSign === "+") {
        console.log("Mother fker", selectedcuRdanga);
        console.log("Error hander on purpose");
        // totalValue = eval(`${selectedcuRdanga} + ${selectedRdangaAmt}`);
        totalValue = Number(selectedcuRdanga) + Number(selectedRdangaAmt);
      } else if (selectedRdangaSign === "-") {
        totalValue = selectedcuRdanga - selectedRdangaAmt;
      } else if (selectedRdangaSign === "X") {
        if (selectedcuRdanga === 0 || selectedRdangaAmt === 0) {
          totalValue = 0;
        } else {
          totalValue = selectedcuRdanga * selectedRdangaAmt;
        }
      } else {
        totalValue = 0;
      }

      if (selectedRdangaType === "0") {
        return (
          <Field>
            <FormGroup>
              {/* cuRdanga  */}
              <Input
                type="hidden"
                name="cuRdanga"
                register={register("cuRdanga")}
                inputSize={InputSize.xs}
              />
              <p>{selected.cuRdanga} 원</p>
            </FormGroup>
          </Field>
        );
      }
      if (selectedRdangaType === "1") {
        return (
          <Field>
            <FormGroup>
              {/* cuRdanga  */}
              <Input
                type="number"
                name="cuRdanga"
                register={register("cuRdanga")}
                inputSize={InputSize.xs}
              />
              <p>원</p>
              <Select {...register("cuRdangaSign")} style={{ minWidth: "15%" }}>
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
                type="text"
                inputSize={InputSize.xs}
                textAlign="right"
                register={register("cuRdangaAmt")}
              />
              <p>
                {selectedRdangaSign === "X"
                  ? "%"
                  : selectedRdangaSign === "+"
                  ? "원"
                  : "원"}
              </p>
              <p>=</p>
              <p>{totalValue}원</p>
            </FormGroup>
          </Field>
        );
      }
      if (selectedRdangaType === "2") {
        return (
          <Field>
            <FormGroup>
              <Input
                name="cuRdanga"
                type="number"
                register={register("cuRdanga")}
                inputSize={InputSize.xs}
              />
            </FormGroup>
          </Field>
        );
      }
    };

    return (
      <form onSubmit={handleSubmit(submit)}>
        {/* 1-1 Wrapper */}
        <Divider />
        <Wrapper grid col={4}>
          <Field>
            <FormGroup>
              <Input
                label="건물코드"
                maxLength="3"
                codeFormatNumber={{
                  status: true,
                  clear: clearNumberic,
                  selectedRowIndex: selectedRowIndex,
                  numbericDefValue: selected?.cuCode,
                }}
                name="cuCode"
                register={register("cuCode")}
                errors={errors["cuCode"]?.message}
                inputSize={InputSize.xs}
              />
            </FormGroup>
          </Field>
          <Field>
            <FormGroup>
              <Input label="건물명" register={register("cuName")} />
            </FormGroup>
          </Field>
          <Field>
            <FormGroup>
              <CheckBox
                title="건물명 지로 출력 안함."
                register={register("cuAptnameYn")}
                rtl={true}
              />
            </FormGroup>
          </Field>
        </Wrapper>
        {/* 1-2 Wrapper */}
        <Wrapper col={3}>
          <Field>
            <FormGroup>
              <Label className="lable-check">
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
        {/* 1-3 Wrapper */}
        <Wrapper grid col={4}>
          <Field>
            <FormGroup>
              <Label>담당사원</Label>
              <Select {...register("cuSwCode")} width={InputSize.i120}>
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
              <Select {...register("cuJyCode")} width={InputSize.i120}>
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
              <Select {...register("cuCustgubun")} width={InputSize.i120}>
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
        <Wrapper grid col={4}>
          <Field>
            <FormGroup>
              <Label className="lable-check">
                <CheckBox
                  title="조정기"
                  register={register("chkCuRh20")}
                  rtl={false}
                />
              </Label>
              <Select {...register("cuRh2o")} width={InputSize.i120}>
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
              <Label className="lable-check">
                <CheckBox
                  title="루베단가 "
                  register={register("chkCuRdange")}
                  rtl={false}
                />
              </Label>
              <Select {...register("cuRdangaType")} width={InputSize.i120}>
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
          {renderRdangaCalc()}
        </Wrapper>
        {/* 2-2 Wrapper */}
        <Wrapper grid col={4}>
          <Field>
            <FormGroup>
              <Label className="lable-check">
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
                inputSize={InputSize.i120}
              />
              <p>원</p>
            </FormGroup>
          </Field>
          <Field>
            <FormGroup>
              <Label className="lable-check">
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
                inputSize={InputSize.i120}
              />
              <p>{selected?.cuSukumType}</p>
              <p>원</p>
            </FormGroup>
          </Field>
          <Field>
            <FormGroup>
              <Label className="lable-check">
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
                inputSize={InputSize.i120}
              />
              <p>원</p>
            </FormGroup>
          </Field>
        </Wrapper>
        {/* <DividerGray /> */}
        <Wrapper grid col={4}>
          <Field>
            <FormGroup>
              <Label className="lable-check">
                <CheckBox
                  title="연체율"
                  register={register("chkCuPer")}
                  rtl={false}
                />
              </Label>
              <Input
                register={register("cuPer")}
                codeFormatNumber={{
                  status: true,
                  clear: clearNumberic,
                  selectedRowIndex: selectedRowIndex,
                  numbericDefValue: selected?.cuPer,
                }}
                maxLength="3"
                textAlign="right"
                inputSize={InputSize.i120}
              />
              <p>{`%`}</p>
            </FormGroup>
          </Field>
          <Field>
            <FormGroup>
              <Label className="lable-check">
                <CheckBox
                  title="할인율"
                  register={register("chkCuCdc")}
                  rtl={false}
                />
              </Label>
              <Input
                register={register("cuCdc")}
                codeFormatNumber={{
                  status: true,
                  clear: clearNumberic,
                  selectedRowIndex: selectedRowIndex,
                  numbericDefValue: selected?.cuCdc,
                }}
                textAlign="right"
                maxLength="3"
                inputSize={InputSize.i120}
              />
              <p>{`%`}</p>
            </FormGroup>
          </Field>
          <Field>
            <FormGroup>
              <Label className="lable-check">
                <CheckBox
                  title="수금방법"
                  register={register("chkCuSukumtype")}
                  rtl={false}
                />
              </Label>
              <Select {...register("cuSukumtype")} width={InputSize.i120}>
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
        {/* 2-4 Wrapper */}
        <Wrapper grid col={4}>
          <Field>
            <FormGroup>
              <Label className="lable-check">
                <CheckBox
                  title="검침주기"
                  register={register("chkCuGumTurm")}
                  rtl={false}
                />
              </Label>
              <Select {...register("cuGumTurm")} width={InputSize.i120}>
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
              <Label className="lable-check">
                <CheckBox
                  title="검침일"
                  register={register("chkCuGumdate")}
                  rtl={false}
                />
              </Label>
              <Input
                register={register("cuGumdate")}
                codeFormatNumber={{
                  status: true,
                  clear: clearNumberic,
                  selectedRowIndex: selectedRowIndex,
                  numbericDefValue: selected?.cuGumdate,
                }}
                maxLength="2"
                inputSize={InputSize.i120}
              />
              <p>일</p>
            </FormGroup>
          </Field>
          <Field>
            <FormGroup>
              <Label className="lable-check">
                <CheckBox
                  title="순 번"
                  register={register("chkCuCno")}
                  rtl={false}
                />
              </Label>
              <Input register={register("cuCno")} inputSize={InputSize.i120} />
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
          <Field flex style={{ alignItems: "center" }}>
            <Label>완성검사일</Label>
            <CustomDatePicker
              style={{ width: "92%" }}
              value={cuFinishDate}
              name="cuFinishDate"
              setValue={setCuFinishDate}
            />
          </Field>
          <Field flex style={{ alignItems: "center" }}>
            <Label>정기검사일</Label>
            <CustomDatePicker
              style={{ width: "92%" }}
              name="cuCircuitDate"
              value={cuCircuitDate}
              setValue={setCuCircuitDate}
            />
          </Field>
          <Field flex style={{ alignItems: "center" }}>
            <Label>검사예정일</Label>
            <CustomDatePicker
              style={{ width: "92%" }}
              value={cuScheduleDate}
              name="cuScheduleDate"
              setValue={setCuScheduleDate}
            />
          </Field>
        </Wrapper>
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
        {/* 3-2-2 Wrapper */}
        <Field flex>
          <FormGroup>
            <Label>{`1)`}</Label>
          </FormGroup>
          <Wrapper grid col={8}>
            <Field>
              <FormGroup>
                <Select {...register("tankMakeCo1")} fullWidth>
                  {dataCommonDic?.tankMakeCo1?.map(
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
              <CustomDatePicker
                style={{ width: "94%" }}
                value={tankFirstDate1}
                setValue={setTankFirstDate1}
                name="tankFirstDate1"
              />
            </Field>
            <Field>
              <CustomDatePicker
                style={{ width: "94%" }}
                value={tankOutsideDate1}
                setValue={setTankOutsideDate1}
                name="tankOutsideDate1"
              />
            </Field>
            <Field>
              <CustomDatePicker
                style={{ width: "94%" }}
                value={tankInsideDate1}
                setValue={setTankInsideDate1}
                name="tankInsideDate1"
              />
            </Field>
          </Wrapper>
        </Field>
        {/* 3-2-3 Wrapper */}
        <Field flex>
          <FormGroup>
            <Label>{`2)`}</Label>
          </FormGroup>
          <Wrapper grid col={8}>
            <Field>
              <FormGroup>
                <Select {...register("tankMakeCo2")} fullWidth>
                  {dataCommonDic?.tankMakeCo2?.map(
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
                <Input register={register("tankRcv2")} />
              </FormGroup>
            </Field>
            <Field>
              <CustomDatePicker
                style={{ width: "94%" }}
                value={tankFirstDate2}
                setValue={setTankFirstDate2}
                name="tankFirstDate2"
              />
            </Field>
            <Field>
              <CustomDatePicker
                style={{ width: "94%" }}
                value={tankOutsideDate2}
                setValue={setTankOutsideDate2}
                name="tankOutsideDate1"
              />
            </Field>
            <Field>
              <CustomDatePicker
                style={{ width: "94%" }}
                value={tankInsideDate2}
                setValue={setTankInsideDate2}
                name="tankInsideDate2"
              />
            </Field>
          </Wrapper>
        </Field>
        {/* 3-2-4 Wrapper */}
        <Field flex>
          <FormGroup>
            <Label></Label>
          </FormGroup>
          <Wrapper grid col={3}>
            <Field>
              <FormGroup>
                <Label>Max레벨 / 발신기코드 / 탱크고객코드</Label>
              </FormGroup>
            </Field>
            <Field>
              <FormGroup>
                <p>{`1)`}</p>
                <Input
                  register={register("tankMax1")}
                  placeholder=""
                  inputSize={InputSize.sm}
                />
                <p>%</p>
                <Input
                  register={register("tankTransmCd1")}
                  placeholder=""
                  inputSize={InputSize.sm}
                />
                <Input
                  register={register("tankCuCd1")}
                  placeholder=""
                  inputSize={InputSize.sm}
                />
                <SearchBtn
                  type="button"
                  onClick={() => console.log("cuZipCode")}
                >
                  <MagnifyingGlass />
                </SearchBtn>
              </FormGroup>
            </Field>
            <Field>
              <FormGroup>
                <p>{`2)`}</p>
                <Input
                  register={register("tankMax1")}
                  placeholder=""
                  inputSize={InputSize.sm}
                />
                <p>%</p>
                <Input
                  register={register("tankTransmCd2")}
                  placeholder=""
                  inputSize={InputSize.sm}
                />
                <Input
                  register={register("tankCuCd2")}
                  placeholder=""
                  inputSize={InputSize.sm}
                />
                <SearchBtn
                  type="button"
                  onClick={() => console.log("cuZipCode")}
                >
                  <MagnifyingGlass />
                </SearchBtn>
              </FormGroup>
            </Field>
          </Wrapper>
        </Field>
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
                <Input register={register("cuCylinderName")} />
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
              <CustomDatePicker
                style={{ width: "94%" }}
                value={gasifyCheckDate1}
                name="gasifyCheckDate1"
                setValue={setGasifyCheckDate1}
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
              <CustomDatePicker
                style={{ width: "94%" }}
                value={gasifyCheckDate2}
                name="gasifyCheckDate2"
                setValue={setGasifyCheckDate2}
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
      </form>
    );
  }
);

export default Form;
