// REACT
import React, { useEffect, useImperativeHandle, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
// COMPONENTS
import DaumAddress from "components/daum";
import CheckBox from "components/checkbox";
import { InputSize } from "components/componentsType";
import CustomDatePicker from "components/customDatePicker";
import { SearchBtn } from "components/daum";
import EditableSelect from "components/editableSelect";
import { MagnifyingGlass } from "components/allSvgIcon";
import { currencyMask } from "helpers/currency";
import {
  Item,
  RadioButton,
  RadioButtonLabel,
} from "components/radioButton/style";
import {
  Field,
  FormGroup,
  Input,
  Label,
  Select as CSelect,
  Divider,
  Wrapper,
} from "components/form/style";
import PlainTab from "components/plainTab";
import { TabContentWrapper } from "components/plainTab/style";

//API
import { ICM1200SEARCH, emptyObj } from "./model";
import API from "app/axios";
import {
  CM1200DELETE,
  CM1200INSERT,
  CM1200UPDATE,
  CM1200INSERTSEQ,
} from "app/path";
import { DateWithDash, DateWithoutDash } from "helpers/dateFormat";
import { formatCurrencyRemoveComma } from "helpers/currency";
import getTabContent from "./getTabContent";

const Form = React.forwardRef(
  (
    {
      selected,
      dataCommonDic,
      fetchData,
      setData,
      selectedRowIndex,
      setSelected,
      setSelectedRowIndex,
      selectedSupplyTab,
      areaCode,
    }: {
      selected: any;
      dataCommonDic: any;
      fetchData: any;
      setData: any;
      selectedRowIndex: number;
      setSelected: any;
      setSelectedRowIndex: any;
      selectedSupplyTab: any;
      areaCode: string;
    },
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const [addr, setAddress] = useState<string>("");
    const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);

    const [chkCuZipCode, setChkCuZipCode] = useState(false);
    const [chkCuRh20, setChkCuRh20] = useState(false);
    const [chkCuRdanga, setChkCuRdanga] = useState(false);
    const [chkCuAnKum, setChkCuAnKum] = useState(false);
    //const [ckCuSisulKum, setCkCuSisulKum] = useState(false);
    const [chkCuMeterKum, setChkCuMeterKum] = useState(false);
    const [chkCuPer, setChkCuPer] = useState(false);
    const [chkCuCdc, setChkCuCdc] = useState(false);
    const [chkCuSukumtype, setChkCuSukumtype] = useState(false);
    const [chkCuGumTurm, setChkCuGumTurm] = useState(false);
    const [chkCuGumdate, setChkCuGumdate] = useState(false);
    const [chkCuCno, setChkCuCno] = useState(false);
    const [newTankMakeCo1, setNewTankMakeCo1] = useState("");

    const [tabId, setTabId] = useState<number>(0);

    let tankMakeCo1: Array<any> = [];

    const { handleSubmit, reset, register, getValues, control, watch } =
      useForm<ICM1200SEARCH>({
        mode: "onChange",
      });

    useEffect(() => {
      if (JSON.stringify(selected) !== "{}") {
        resetForm("reset");
      }
    }, [selected]);

    useEffect(() => {
      if (addr) {
        reset({
          cuZipcode: addr ? addr?.split("/")[1] : "",
          cuAddr1: addr ? addr?.split("/")[0].split("(")[0] : "",
          cuAddr2: addr ? `(${addr?.split("/")[0].split("(")[1]}` : "",
        });
      }
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

      dataCommonDic?.tankMakeCo1?.map((obj: any) => {
        tankMakeCo1.push({ value: obj.code, label: obj.codeName });
      });
    }, [dataCommonDic]);

    useImperativeHandle<HTMLFormElement, any>(ref, () => ({
      resetForm,
      setIsAddBtnClicked,
      crud,
    }));

    // const checkAreaCode = () => {
    //   if (!areaCode) {
    //     toast.warning("areaCode can't be 00.", {
    //       autoClose: 500,
    //     });
    //     return false;
    //   }
    //   return true;
    // };

    const fetchCodes = async (areaCode: string) => {
      try {
        const response: any = await API.get(CM1200INSERTSEQ, {
          params: { areaCode: areaCode },
        });
        if (
          response.status === 200 &&
          response.data.tempCuCode[0]?.tempCuCode
        ) {
          return response.data;
        } else {
          toast.error("can't get cuCode", {
            autoClose: 500,
          });
        }
      } catch (err) {
        toast.error("Error occured during get CuCode", {
          autoClose: 500,
        });
      }
      return null;
    };

    const resetForm = async (type: string) => {
      if (type === "clear") {
        // if (!checkAreaCode()) {
        //   return null;
        // }
        const data = await fetchCodes(areaCode);
        if (data && data?.tempCuCode[0]) {
          reset({ ...emptyObj, cuCode: data?.tempCuCode[0]?.tempCuCode });
        }
        return;
      }

      if (
        type === "reset" &&
        selected !== undefined &&
        JSON.stringify(selected) !== "{}"
      ) {
        let tempData: any = { ...selected, ...selectedSupplyTab };

        reset({
          ...tempData,
          cuAptnameYn: tempData?.cuAptnameYn === "Y",
          cuBaGageYn: tempData?.cuBaGageYn === "Y",

          // cuFinishDate: selected?.cuFinishDate
          //   ? formatDate(selected.cuFinishDate)
          //   : "",
          cuFinishDate: DateWithDash(selected.cuFinishDate),
          // cuCircuitDate: selected?.cuCircuitDate
          //   ? formatDate(selected.cuCircuitDate)
          //   : "",
          cuCircuitDate: DateWithDash(selected.cuCircuitDate),
          // cuScheduleDate: selected?.cuScheduleDate
          //   ? formatDate(selected.cuScheduleDate)
          //   : "",
          cuScheduleDate: DateWithDash(selected.cuScheduleDate),
          // tankFirstDate1: selected?.tankFirstDate1
          //   ? formatDate(selected.tankFirstDate1)
          //   : "",
          tankFirstDate1: DateWithDash(selected.tankFirstDate1),
          // tankFirstDate2: selected?.tankFirstDate2
          //   ? formatDate(selected.tankFirstDate2)
          //   : "",
          tankFirstDate2: DateWithDash(selected.tankFirstDate2),
          // tankOutsideDate1: selected?.tankOutsideDate1
          //   ? formatDate(selected.tankOutsideDate1)
          //   : "",
          tankOutsideDate1: DateWithDash(selected.tankOutsideDate1),
          // tankOutsideDate2: selected?.tankOutsideDate2
          //   ? formatDate(selected.tankOutsideDate2)
          //   : "",
          tankOutsideDate2: DateWithDash(selected.tankOutsideDate2),
          // tankInsideDate1: selected?.tankInsideDate1
          //   ? formatDate(selected.tankInsideDate1)
          //   : "",
          tankInsideDate1: DateWithDash(selected.tankInsideDate1),
          // tankInsideDate2: selected?.tankInsideDate2
          //   ? formatDate(selected.tankInsideDate2)
          //   : "",
          tankInsideDate2: DateWithDash(selected.tankInsideDate2),
          // gasifyCheckDate1: selected?.gasifyCheckDate1
          //   ? formatDate(selected.gasifyCheckDate1)
          //   : "",
          gasifyCheckDate1: DateWithDash(selected.gasifyCheckDate1),
          // gasifyCheckDate2: selected?.gasifyCheckDate2
          //   ? formatDate(selected.gasifyCheckDate2)
          //   : "",
          gasifyCheckDate2: DateWithDash(selected.gasifyCheckDate2),
        });
        return;
      }
    };

    const crud = async (type: string | null) => {
      if (type === "delete") {
        const formValues = getValues();

        try {
          const response: any = await API.post(CM1200DELETE, {
            cuCode: formValues.cuCode,
            areaCode: areaCode,
          });

          if (response.status === 200) {
            toast.success("삭제했습니다", {
              autoClose: 500,
            });
            await fetchData();
          } else {
            toast.error(response?.message, {
              autoClose: 500,
            });
          }
        } catch (err) {
          toast.error("Couldn't delete", {
            autoClose: 500,
          });
        }
        return;
      }

      if (type === null) {
        handleSubmit(submit)();
      }
    };

    const submit = async (data: ICM1200SEARCH) => {
      const formValues: any = getValues();
      formValues.areaCode = isAddBtnClicked ? areaCode : selected.areaCode;

      if (!chkCuZipCode) {
        delete formValues.cuZipcode;
        delete formValues.cuAddr1;
        delete formValues.cuAddr2;
      }
      if (!chkCuRh20) {
        delete formValues.cuRh2o;
      }
      if (!chkCuRdanga) {
        //talbaruudiig nyagtal
      }

      if (!chkCuAnKum) {
        delete formValues.cuAnkum;
      } else {
        formValues.cuAnkum = formValues.cuAnkum
          ? formatCurrencyRemoveComma(formValues.cuAnkum)
          : "";
      }
      // if (!ckCuSisulKum) {
      //   delete formValues.cuSisulkum;
      // }

      if (!chkCuMeterKum) {
        delete formValues.cuMeterkum;
      } else {
        formValues.cuMeterkum = formValues.cuMeterkum
          ? formatCurrencyRemoveComma(formValues.cuMeterkum)
          : "";
      }
      if (!chkCuPer) {
        delete formValues.cuPer;
      }

      if (!chkCuCdc) {
        delete formValues.cuCdc;
      }

      if (!chkCuSukumtype) {
        delete formValues.cuSukumtype;
      }
      if (!chkCuGumTurm) {
        delete formValues.cuGumTurm;
      }
      if (!chkCuGumdate) {
        delete formValues.cuGumdate;
      }

      if (!chkCuCno) {
        delete formValues.cuCno;
      }

      formValues.tankMakeCo1 = newTankMakeCo1;

      formValues.cuAptnameYn = formValues.cuAptnameYn ? "Y" : "N";

      // formValues.cuFinishDate =
      //   typeof formValues.cuFinishDate === "string"
      //     ? formatDateByRemoveDash(formValues.cuFinishDate)
      //     : formValues.cuFinishDate instanceof Date
      //     ? formatDateToStringWithoutDash(formValues.cuFinishDate)
      //     : "";

      formValues.cuFinishDate = DateWithoutDash(formValues.cuFinishDate);

      // formValues.cuCircuitDate =
      //   typeof formValues.cuCircuitDate === "string"
      //     ? formatDateByRemoveDash(formValues.cuCircuitDate)
      //     : formValues.cuCircuitDate instanceof Date
      //     ? formatDateToStringWithoutDash(formValues.cuCircuitDate)
      //     : "";

      formValues.cuCircuitDate = DateWithoutDash(formValues.cuCircuitDate);

      // formValues.cuScheduleDate =
      //   typeof formValues.cuScheduleDate === "string"
      //     ? formatDateByRemoveDash(formValues.cuScheduleDate)
      //     : formValues.cuScheduleDate instanceof Date
      //     ? formatDateToStringWithoutDash(formValues.cuScheduleDate)
      //     : "";

      formValues.cuScheduleDate = DateWithoutDash(formValues.cuScheduleDate);

      // formValues.gasifyCheckDate1 =
      //   typeof formValues.gasifyCheckDate1 === "string"
      //     ? formatDateByRemoveDash(formValues.gasifyCheckDate1)
      //     : formValues.gasifyCheckDate1 instanceof Date
      //     ? formatDateToStringWithoutDash(formValues.gasifyCheckDate1)
      //     : "";

      formValues.gasifyCheckDate1 = DateWithoutDash(
        formValues.gasifyCheckDate1
      );

      // formValues.gasifyCheckDate2 =
      //   typeof formValues.gasifyCheckDate2 === "string"
      //     ? formatDateByRemoveDash(formValues.gasifyCheckDate2)
      //     : formValues.gasifyCheckDate2 instanceof Date
      //     ? formatDateToStringWithoutDash(formValues.gasifyCheckDate2)
      //     : "";

      formValues.gasifyCheckDate2 = DateWithoutDash(
        formValues.gasifyCheckDate2
      );

      // formValues.tankFirstDate1 =
      //   typeof formValues.tankFirstDate1 === "string"
      //     ? formatDateByRemoveDash(formValues.tankFirstDate1)
      //     : formValues.tankFirstDate1 instanceof Date
      //     ? formatDateToStringWithoutDash(formValues.tankFirstDate1)
      //     : "";

      formValues.tankFirstDate1 = DateWithoutDash(formValues.tankFirstDate1);

      // formValues.tankFirstDate2 =
      //   typeof formValues.tankFirstDate2 === "string"
      //     ? formatDateByRemoveDash(formValues.tankFirstDate2)
      //     : formValues.tankFirstDate2 instanceof Date
      //     ? formatDateToStringWithoutDash(formValues.tankFirstDate2)
      //     : "";

      formValues.tankFirstDate2 = DateWithoutDash(formValues.tankFirstDate2);

      // formValues.tankInsideDate1 =
      //   typeof formValues.tankInsideDate1 === "string"
      //     ? formatDateByRemoveDash(formValues.tankInsideDate1)
      //     : formValues.tankInsideDate1 instanceof Date
      //     ? formatDateToStringWithoutDash(formValues.tankInsideDate1)
      //     : "";
      formValues.tankInsideDate1 = DateWithoutDash(formValues.tankInsideDate1);

      // formValues.tankInsideDate2 =
      //   typeof formValues.tankInsideDate2 === "string"
      //     ? formatDateByRemoveDash(formValues.tankInsideDate2)
      //     : formValues.tankInsideDate2 instanceof Date
      //     ? formatDateToStringWithoutDash(formValues.tankInsideDate2)
      //     : "";

      formValues.tankInsideDate2 = DateWithoutDash(formValues.tankInsideDate2);

      // formValues.tankOutsideDate1 =
      //   typeof formValues.tankOutsideDate1 === "string"
      //     ? formatDateByRemoveDash(formValues.tankOutsideDate1)
      //     : formValues.tankOutsideDate1 instanceof Date
      //     ? formatDateToStringWithoutDash(formValues.tankOutsideDate1)
      //     : "";

      formValues.tankOutsideDate1 = DateWithoutDash(
        formValues.tankOutsideDate1
      );

      // formValues.tankOutsideDate2 =
      //   typeof formValues.tankOutsideDate2 === "string"
      //     ? formatDateByRemoveDash(formValues.tankOutsideDate2)
      //     : formValues.tankOutsideDate2 instanceof Date
      //     ? formatDateToStringWithoutDash(formValues.tankOutsideDate2)
      //     : "";

      formValues.tankOutsideDate2 = DateWithoutDash(
        formValues.tankOutsideDate2
      );

      formValues.cuRdangaAmt =
        formValues.cuRdangaType !== "1" ? 0 : Number(formValues.cuRdangaAmt);
      formValues.cuRdanga = Number(formValues.cuRdanga);

      const path = isAddBtnClicked ? CM1200INSERT : CM1200UPDATE;

      if (!isAddBtnClicked) {
        delete formValues.gasifyCheckDate1;
        delete formValues.gasifyCheckDate2;
        delete formValues.gasifyMakeDate1;
        delete formValues.gasifyMakeDate2;
      }
      try {
        console.log("cufinish::::", formValues);
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

    const renderRdangaCalc = () => {
      var selectedcuRdanga = watch("cuRdanga") ?? 0;
      var selectedRdangaType = watch("cuRdangaType");
      var selectedRdangaSign = watch("cuRdangaSign") ?? null;
      var selectedRdangaAmt = watch("cuRdangaAmt") ?? 0;
      var totalValue = 0;

      if (selectedRdangaSign === null) {
        totalValue = 0;
      } else if (selectedRdangaSign === "+") {
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
              <CSelect
                {...register("cuRdangaSign")}
                style={{ minWidth: "15%" }}
              >
                {dataCommonDic?.cuRdangaSign.map((obj: any, index: number) => (
                  <option key={index} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </CSelect>
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

    const onOptionsChanged = (newOption: any, s: any) => {
      //console.log("newOptions:", newOption.label);
      //console.log("=======s:", s);
      //setNewTankMakeCo1(newOption.label);
    };

    return (
      <form onSubmit={handleSubmit(submit)}>
        {/* 1-1 Wrapper */}
        <Divider />
        <Wrapper grid col={5} style={{ alignItems: "baseline" }}>
          <Field>
            <Input
              label="건물코드"
              register={register("cuCode")}
              inputSize={InputSize.i50}
              readOnly={true}
            />
          </Field>
          <Field>
            <Input label="건물명" register={register("cuName")} />
          </Field>
          <Field style={{ justifySelf: "center" }}>
            <CheckBox
              title="건물명 지로 출력 안함."
              register={register("cuAptnameYn")}
              rtl
            />
          </Field>
        </Wrapper>
        {/* 1-2 Wrapper */}
        <Wrapper col={3}>
          <FormGroup>
            <Label className="lable-check">
              <CheckBox
                title="주소"
                checked={chkCuZipCode}
                onChange={(e: any) => setChkCuZipCode(e.target.checked)}
              />
            </Label>
            <Input
              register={register("cuZipcode")}
              inputSize={InputSize.xs}
              readOnly={!chkCuZipCode}
              style={{ marginRight: "0px" }}
            />
            <DaumAddress setAddress={setAddress} disabled={!chkCuZipCode} />
          </FormGroup>

          <Input
            register={register("cuAddr1")}
            inputSize={InputSize.md}
            style={{ marginRight: "0px" }}
          />
          <Input
            register={register("cuAddr2")}
            inputSize={InputSize.md}
            style={{ marginLeft: "5px" }}
          />
        </Wrapper>
        {/* 1-3 Wrapper */}
        <Wrapper grid col={5}>
          <FormGroup>
            <Label>담당사원</Label>
            <CSelect {...register("cuSwCode")} width={InputSize.i120}>
              {dataCommonDic?.cuSwCode?.map((obj: any, index: number) => (
                <option key={index} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </CSelect>
          </FormGroup>

          <FormGroup>
            <Label>지역분류</Label>
            <CSelect
              {...register("cuJyCode")}
              width={InputSize.i120}
              style={{ marginRight: "0px" }}
            >
              {dataCommonDic?.cuJyCode?.map((obj: any, index: number) => (
                <option key={index} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </CSelect>
            <SearchBtn
              type="button"
              onClick={() => console.log("cuZipCode BTN")}
            >
              <MagnifyingGlass />
            </SearchBtn>
          </FormGroup>

          <FormGroup>
            <Label>관리자분류</Label>
            <CSelect {...register("cuCustgubun")} width={InputSize.i120}>
              {dataCommonDic?.cuCustgubun?.map((obj: any, index: number) => (
                <option key={index} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </CSelect>
          </FormGroup>
        </Wrapper>
        <Divider />
        <div style={{ marginTop: "5px" }}>
          <PlainTab
            tabHeader={["지로 양식", "고객안내문", "입금계좌 안내"]}
            onClick={(id) => setTabId(id)}
            tabId={tabId}
          />
          <TabContentWrapper>
            {getTabContent(
              tabId,
              register,
              dataCommonDic,
              renderRdangaCalc,
              chkCuRh20,
              setChkCuRh20,
              chkCuRdanga,
              setChkCuRdanga,
              chkCuAnKum,
              setChkCuAnKum,
              chkCuMeterKum,
              setChkCuMeterKum,
              control,
              chkCuPer,
              setChkCuPer,
              chkCuCdc,
              setChkCuCdc,
              chkCuSukumtype,
              setChkCuSukumtype,
              chkCuGumTurm,
              setChkCuGumTurm,
              chkCuGumdate,
              setChkCuGumdate,
              chkCuCno,
              setChkCuCno
            )}
          </TabContentWrapper>
        </div>
      </form>
    );
  }
);

export default Form;
