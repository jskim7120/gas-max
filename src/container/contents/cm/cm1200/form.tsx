// REACT
import React, { useEffect, useImperativeHandle, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import CreatableSelect from "react-select/creatable";
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
// FORM
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./validation";
//API
import { ICM1200SEARCH, emptyObj } from "./model";
import API from "app/axios";
import {
  CM1200DELETE,
  CM1200INSERT,
  CM1200UPDATE,
  CM1200INSERTSEQ,
} from "app/path";
import {
  formatDate,
  formatDateByRemoveDash,
  formatDateToStringWithoutDash,
} from "helpers/dateFormat";
import { formatCurrencyRemoveComma } from "helpers/currency";

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

    let tankMakeCo1: Array<any> = [];

    const { handleSubmit, reset, register, getValues, control, watch } =
      useForm<ICM1200SEARCH>({
        mode: "onChange",
        resolver: yupResolver(schema),
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

    const checkAreaCode = () => {
      if (areaCode === "undefined" || areaCode === "00") {
        toast.warning("areaCode can't be 00.", {
          autoClose: 500,
        });
        return false;
      }
      return true;
    };

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
        if (!checkAreaCode()) {
          return null;
        }
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

          cuFinishDate: selected?.cuFinishDate
            ? formatDate(selected.cuFinishDate)
            : "",
          cuCircuitDate: selected?.cuCircuitDate
            ? formatDate(selected.cuCircuitDate)
            : "",
          cuScheduleDate: selected?.cuScheduleDate
            ? formatDate(selected.cuScheduleDate)
            : "",
          tankFirstDate1: selected?.tankFirstDate1
            ? formatDate(selected.tankFirstDate1)
            : "",
          tankFirstDate2: selected?.tankFirstDate2
            ? formatDate(selected.tankFirstDate2)
            : "",
          tankOutsideDate1: selected?.tankOutsideDate1
            ? formatDate(selected.tankOutsideDate1)
            : "",
          tankOutsideDate2: selected?.tankOutsideDate2
            ? formatDate(selected.tankOutsideDate2)
            : "",
          tankInsideDate1: selected?.tankInsideDate1
            ? formatDate(selected.tankInsideDate1)
            : "",

          tankInsideDate2: selected?.tankInsideDate2
            ? formatDate(selected.tankInsideDate2)
            : "",
          gasifyCheckDate1: selected?.gasifyCheckDate1
            ? formatDate(selected.gasifyCheckDate1)
            : "",
          gasifyCheckDate2: selected?.gasifyCheckDate2
            ? formatDate(selected.gasifyCheckDate2)
            : "",
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

      formValues.cuFinishDate =
        typeof formValues.cuFinishDate === "string"
          ? formatDateByRemoveDash(formValues.cuFinishDate)
          : formValues.cuFinishDate instanceof Date
          ? formatDateToStringWithoutDash(formValues.cuFinishDate)
          : "";

      formValues.cuCircuitDate =
        typeof formValues.cuCircuitDate === "string"
          ? formatDateByRemoveDash(formValues.cuCircuitDate)
          : formValues.cuCircuitDate instanceof Date
          ? formatDateToStringWithoutDash(formValues.cuCircuitDate)
          : "";

      formValues.cuScheduleDate =
        typeof formValues.cuScheduleDate === "string"
          ? formatDateByRemoveDash(formValues.cuScheduleDate)
          : formValues.cuScheduleDate instanceof Date
          ? formatDateToStringWithoutDash(formValues.cuScheduleDate)
          : "";

      formValues.gasifyCheckDate1 =
        typeof formValues.gasifyCheckDate1 === "string"
          ? formatDateByRemoveDash(formValues.gasifyCheckDate1)
          : formValues.gasifyCheckDate1 instanceof Date
          ? formatDateToStringWithoutDash(formValues.gasifyCheckDate1)
          : "";

      formValues.gasifyCheckDate2 =
        typeof formValues.gasifyCheckDate2 === "string"
          ? formatDateByRemoveDash(formValues.gasifyCheckDate2)
          : formValues.gasifyCheckDate2 instanceof Date
          ? formatDateToStringWithoutDash(formValues.gasifyCheckDate2)
          : "";

      formValues.tankFirstDate1 =
        typeof formValues.tankFirstDate1 === "string"
          ? formatDateByRemoveDash(formValues.tankFirstDate1)
          : formValues.tankFirstDate1 instanceof Date
          ? formatDateToStringWithoutDash(formValues.tankFirstDate1)
          : "";

      formValues.tankFirstDate2 =
        typeof formValues.tankFirstDate2 === "string"
          ? formatDateByRemoveDash(formValues.tankFirstDate2)
          : formValues.tankFirstDate2 instanceof Date
          ? formatDateToStringWithoutDash(formValues.tankFirstDate2)
          : "";

      formValues.tankInsideDate1 =
        typeof formValues.tankInsideDate1 === "string"
          ? formatDateByRemoveDash(formValues.tankInsideDate1)
          : formValues.tankInsideDate1 instanceof Date
          ? formatDateToStringWithoutDash(formValues.tankInsideDate1)
          : "";

      formValues.tankInsideDate2 =
        typeof formValues.tankInsideDate2 === "string"
          ? formatDateByRemoveDash(formValues.tankInsideDate2)
          : formValues.tankInsideDate2 instanceof Date
          ? formatDateToStringWithoutDash(formValues.tankInsideDate2)
          : "";

      formValues.tankOutsideDate1 =
        typeof formValues.tankOutsideDate1 === "string"
          ? formatDateByRemoveDash(formValues.tankOutsideDate1)
          : formValues.tankOutsideDate1 instanceof Date
          ? formatDateToStringWithoutDash(formValues.tankOutsideDate1)
          : "";

      formValues.tankOutsideDate2 =
        typeof formValues.tankOutsideDate2 === "string"
          ? formatDateByRemoveDash(formValues.tankOutsideDate2)
          : formValues.tankOutsideDate2 instanceof Date
          ? formatDateToStringWithoutDash(formValues.tankOutsideDate2)
          : "";

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
        {/* 2-1 Wrapper */}
        <Wrapper grid col={3} fields="1fr 1fr 2fr">
          <FormGroup>
            <Label className="lable-check">
              <CheckBox
                title="조정기"
                checked={chkCuRh20}
                onChange={(e: any) => setChkCuRh20(e.target.checked)}
              />
            </Label>
            <CSelect
              disabled={!chkCuRh20}
              {...register("cuRh2o")}
              width={InputSize.i120}
            >
              {dataCommonDic?.cuRh20?.map((obj: any, index: number) => (
                <option key={index} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </CSelect>
            <p>mmH20</p>
          </FormGroup>

          <FormGroup>
            <Label className="lable-check">
              <CheckBox
                title="루베단가"
                checked={chkCuRdanga}
                onChange={(e: any) => setChkCuRdanga(e.target.checked)}
              />
            </Label>
            <CSelect
              disabled={!chkCuRdanga}
              {...register("cuRdangaType")}
              width={InputSize.i120}
            >
              {dataCommonDic?.cuRdangaType.map((obj: any, index: number) => (
                <option key={index} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </CSelect>
          </FormGroup>

          {renderRdangaCalc()}
        </Wrapper>
        {/* 2-2 Wrapper */}
        <Wrapper grid col={3} fields="1fr 1fr 2fr">
          <FormGroup>
            <Label className="lable-check">
              <CheckBox
                title="관리비"
                checked={chkCuAnKum}
                onChange={(e: any) => setChkCuAnKum(e.target.checked)}
              />
            </Label>

            <Controller
              control={control}
              {...register("cuAnkum")}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  value={value}
                  onChange={onChange}
                  name={name}
                  mask={currencyMask}
                  textAlign="right"
                  inputSize={InputSize.i120}
                  readOnly={!chkCuAnKum}
                />
              )}
            />
            <p>원</p>
          </FormGroup>

          <FormGroup>
            <Label className="lable-check">
              <CheckBox
                title="계량기"
                checked={chkCuMeterKum}
                onChange={(e: any) => setChkCuMeterKum(e.target.checked)}
              />
            </Label>

            <Controller
              control={control}
              {...register("cuMeterkum")}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  value={value}
                  onChange={onChange}
                  name={name}
                  mask={currencyMask}
                  textAlign="right"
                  inputSize={InputSize.i120}
                  readOnly={!chkCuMeterKum}
                />
              )}
            />
            <p>원</p>
          </FormGroup>

          <FormGroup style={{ gap: "7px" }}>
            <Label style={{ minWidth: "auto" }}>기본사용료</Label>
            <Label className="lable-check" style={{ minWidth: "98px" }}>
              <CheckBox title="적용" register={{ ...register("cuBaGageYn") }} />
            </Label>

            <Input
              register={register("cuBaGageM3")}
              textAlign="right"
              inputSize={InputSize.i50}
            />
            <p>m3이하 일때</p>
            <Controller
              control={control}
              {...register("cuBaGageKum")}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  value={value}
                  onChange={onChange}
                  name={name}
                  mask={currencyMask}
                  textAlign="right"
                  inputSize={InputSize.i120}
                />
              )}
            />
            <p>원 적용</p>
          </FormGroup>
        </Wrapper>

        <Wrapper grid col={3} fields="1fr 1fr 2fr">
          <FormGroup>
            <Label className="lable-check">
              <CheckBox
                title="연체율"
                //register={register("chkCuPer")}
                checked={chkCuPer}
                onChange={(e: any) => setChkCuPer(e.target.checked)}
              />
            </Label>

            <Controller
              control={control}
              {...register("cuPer")}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  value={value}
                  onChange={onChange}
                  name={name}
                  mask={[/\d/, /\d/, /\d/]}
                  readOnly={!chkCuPer}
                  inputSize={InputSize.i50}
                  textAlign="right"
                />
              )}
            />
            <p>{`%`}</p>
          </FormGroup>

          <FormGroup>
            <Label className="lable-check">
              <CheckBox
                title="할인율"
                checked={chkCuCdc}
                onChange={(e: any) => setChkCuCdc(e.target.checked)}
              />
            </Label>

            <Controller
              control={control}
              {...register("cuCdc")}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  value={value}
                  onChange={onChange}
                  name={name}
                  mask={[/\d/, /\d/, /\d/]}
                  readOnly={!chkCuCdc}
                  inputSize={InputSize.i50}
                  textAlign="right"
                />
              )}
            />
            <p>{`%`}</p>
          </FormGroup>

          <FormGroup>
            <Label className="lable-check">
              <CheckBox
                title="수금방법"
                checked={chkCuSukumtype}
                onChange={(e: any) => setChkCuSukumtype(e.target.checked)}
              />
            </Label>
            <CSelect
              disabled={!chkCuSukumtype}
              {...register("cuSukumtype")}
              width={InputSize.i120}
            >
              {dataCommonDic?.cuSukumtype?.map((obj: any, index: number) => (
                <option key={index} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </CSelect>
          </FormGroup>
        </Wrapper>
        {/* 2-4 Wrapper */}
        <Wrapper grid col={3} fields="1fr 1fr 2fr">
          <FormGroup>
            <Label className="lable-check">
              <CheckBox
                title="검침주기"
                //register={register("chkCuGumTurm")}
                checked={chkCuGumTurm}
                onChange={(e: any) => setChkCuGumTurm(e.target.checked)}
              />
            </Label>
            <CSelect
              disabled={!chkCuGumTurm}
              {...register("cuGumTurm")}
              width={InputSize.i175}
            >
              {dataCommonDic?.cuGumTurm?.map((obj: any, index: number) => (
                <option key={index} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </CSelect>
          </FormGroup>

          <FormGroup>
            <Label className="lable-check">
              <CheckBox
                title="검침일"
                checked={chkCuGumdate}
                onChange={(e: any) => setChkCuGumdate(e.target.checked)}
              />
            </Label>

            <Controller
              control={control}
              {...register("cuGumdate")}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  value={value}
                  onChange={onChange}
                  name={name}
                  mask={[/\d/, /\d/]}
                  inputSize={InputSize.i40}
                  readOnly={!chkCuGumdate}
                />
              )}
            />
            <p>일</p>
          </FormGroup>

          <FormGroup>
            <Label className="lable-check">
              <CheckBox
                title="순 번"
                checked={chkCuCno}
                onChange={(e: any) => setChkCuCno(e.target.checked)}
              />
            </Label>
            <Input
              register={register("cuCno")}
              inputSize={InputSize.i120}
              readOnly={!chkCuCno}
            />
          </FormGroup>
        </Wrapper>
        <Divider />
        {/* 3-1-1 Wrapper */}
        <Wrapper grid col={4}>
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
          <Field flex style={{ alignItems: "center" }}>
            <Label>완성검사일</Label>
            <Controller
              control={control}
              {...register("cuFinishDate")}
              render={({ field: { onChange, value, name } }) => (
                <CustomDatePicker
                  value={value}
                  onChange={onChange}
                  name={name}
                />
              )}
            />
          </Field>
          <Field flex style={{ alignItems: "center" }}>
            <Label>정기검사일</Label>
            <Controller
              control={control}
              {...register("cuCircuitDate")}
              render={({ field: { onChange, value } }) => (
                <CustomDatePicker value={value} onChange={onChange} />
              )}
            />
          </Field>
          <Field flex style={{ alignItems: "center" }}>
            <Label>검사예정일</Label>
            <Controller
              control={control}
              {...register("cuScheduleDate")}
              render={({ field: { onChange, value } }) => (
                <CustomDatePicker value={value} onChange={onChange} />
              )}
            />
          </Field>
        </Wrapper>
        {/* 3-2-1 Wrapper */}
        <Field flex>
          <FormGroup>
            <Label>벌크 시설</Label>
          </FormGroup>
          <Wrapper grid col={8} fields="1fr 1fr 1fr 1fr 1fr 0.7fr 0.7fr 0.7fr">
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
          <Wrapper grid col={8} fields="1fr 1fr 1fr 1fr 1fr 0.7fr 0.7fr 0.7fr">
            <Field>
              <FormGroup>
                {/*

                <Select {...register("tankMakeCo1")} fullWidth>

                  {dataCommonDic?.tankMakeCo1?.map(
                    (obj: any, index: number) => (
                      <option key={index} value={obj.code}>
                        {obj.codeName}
                      </option>
                    )
                  )}


                */}

                <EditableSelect
                  list={dataCommonDic?.tankMakeCo1}
                  register={register("tankMakeCo1")}
                  textAlign={"left"}
                />
              </FormGroup>
            </Field>
            <Field>
              <FormGroup>
                <CSelect {...register("tankVol1")} fullWidth textAlign="right">
                  {dataCommonDic?.tankVol1?.map((obj: any, index: number) => (
                    <option key={index} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </CSelect>
              </FormGroup>
            </Field>
            <Field>
              <FormGroup>
                <Input register={register("tankMakeSno1")} />
              </FormGroup>
            </Field>
            <Field>
              <FormGroup>
                <Input maxLength="7" register={register("tankMakeDate1")} />
              </FormGroup>
            </Field>
            <Field>
              <FormGroup>
                <Input register={register("tankRcv1")} />
              </FormGroup>
            </Field>
            <Field>
              <Controller
                control={control}
                {...register("tankFirstDate1")}
                render={({ field: { onChange, value } }) => (
                  <CustomDatePicker value={value} onChange={onChange} />
                )}
              />
            </Field>
            <Field>
              <Controller
                control={control}
                {...register("tankOutsideDate1")}
                render={({ field: { onChange, value } }) => (
                  <CustomDatePicker value={value} onChange={onChange} />
                )}
              />
            </Field>
            <Field>
              <Controller
                control={control}
                {...register("tankInsideDate1")}
                render={({ field: { onChange, value } }) => (
                  <CustomDatePicker value={value} onChange={onChange} />
                )}
              />
            </Field>
          </Wrapper>
        </Field>
        {/* 3-2-3 Wrapper */}
        <Field flex>
          <FormGroup>
            <Label>{`2)`}</Label>
          </FormGroup>
          <Wrapper grid col={8} fields="1fr 1fr 1fr 1fr 1fr 0.7fr 0.7fr 0.7fr">
            <Field>
              <FormGroup>
                {/*
                <Select {...register("tankMakeCo2")} fullWidth>

                  {dataCommonDic?.tankMakeCo2?.map(
                    (obj: any, index: number) => (
                      <option key={index} value={obj.code}>
                        {obj.codeName}
                      </option>
                    )
                  )}

                </Select>
                */}
                <EditableSelect
                  list={dataCommonDic?.tankMakeCo2}
                  register={register("tankMakeCo2")}
                  textAlign={"left"}
                />
              </FormGroup>
            </Field>
            <Field>
              <FormGroup>
                <CSelect {...register("tankVol2")} fullWidth textAlign="right">
                  {dataCommonDic?.tankVol2?.map((obj: any, index: number) => (
                    <option key={index} value={obj.code}>
                      {obj.codeName}
                    </option>
                  ))}
                </CSelect>
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
              <Controller
                control={control}
                {...register("tankFirstDate2")}
                render={({ field: { onChange, value } }) => (
                  <CustomDatePicker value={value} onChange={onChange} />
                )}
              />
            </Field>
            <Field>
              <Controller
                control={control}
                {...register("tankOutsideDate2")}
                render={({ field: { onChange, value } }) => (
                  <CustomDatePicker value={value} onChange={onChange} />
                )}
              />
            </Field>
            <Field>
              <Controller
                control={control}
                {...register("tankInsideDate2")}
                render={({ field: { onChange, value } }) => (
                  <CustomDatePicker value={value} onChange={onChange} />
                )}
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
                  maxLength="3"
                  textAlign="right"
                  inputSize={InputSize.i40}
                  placeholder=""
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
                  register={register("tankMax2")}
                  placeholder=""
                  inputSize={InputSize.sm}
                  textAlign="right"
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
                <CSelect {...register("cuCylinderName")} width={InputSize.i120}>
                  {dataCommonDic?.cuCylinderName?.map(
                    (obj: any, index: number) => (
                      <option key={index} value={obj.code}>
                        {obj.codeName}
                      </option>
                    )
                  )}
                </CSelect>
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
          <Wrapper grid col={8} fields="1fr 1fr 1fr 1fr 1fr 0.7fr 0.7fr 0.7fr">
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

          <Wrapper grid col={8} fields="1fr 1fr 1fr 1fr 1fr 0.7fr 0.7fr 0.7fr">
            <FormGroup>
              {/*
              <Select {...register("gasifyCo1")} fullWidth>

                {dataCommonDic?.gasifyCo1?.map((obj: any, idx: number) => {
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>;
                })}
   </Select>
              */}
              <EditableSelect
                list={dataCommonDic?.gasifyCo1}
                register={register("gasifyCo1")}
                textAlign={"left"}
              />
            </FormGroup>
            <FormGroup>
              <CSelect {...register("gasifyVol1")} fullWidth>
                {dataCommonDic?.gasifyVol1?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </CSelect>
            </FormGroup>
            <Field>
              <Input register={register("gasifySno1")} />
            </Field>
            <Field>
              <Input maxLength="7" register={register("gasifyMakeDate1")} />
            </Field>
            <Field>
              <Input register={register("gasifyPower1")} />
            </Field>
            <Field>
              <Controller
                control={control}
                {...register("gasifyCheckDate1")}
                render={({ field: { onChange, value, name } }) => (
                  <CustomDatePicker
                    value={value}
                    onChange={onChange}
                    name={name}
                  />
                )}
              />
            </Field>
          </Wrapper>
        </Field>
        {/* 3-4-3 Wrapper */}
        <Field flex>
          <FormGroup>
            <Label>{`2)`}</Label>
          </FormGroup>
          <Wrapper grid col={8} fields="1fr 1fr 1fr 1fr 1fr 0.7fr 0.7fr 0.7fr">
            <FormGroup>
              {/*
              <Select {...register("gasifyCo2")} fullWidth>

                {dataCommonDic?.gasifyCo2?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}

              </Select>
              */}
              <EditableSelect
                list={dataCommonDic?.gasifyCo2}
                register={register("gasifyCo2")}
                textAlign={"left"}
              />
            </FormGroup>

            <FormGroup>
              <CSelect {...register("gasifyVol2")} fullWidth>
                {dataCommonDic?.gasifyVol2?.map((obj: any, index: number) => (
                  <option key={index} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </CSelect>
            </FormGroup>
            <Field>
              <Input register={register("gasifySno2")} />
            </Field>
            <Field>
              <Input maxLength="7" register={register("gasifyMakeDate2")} />
            </Field>
            <Field>
              <Input register={register("gasifyPower2")} />
            </Field>
            <Field>
              <Controller
                control={control}
                {...register("gasifyCheckDate2")}
                render={({ field: { onChange, value, name } }) => (
                  <CustomDatePicker
                    value={value}
                    onChange={onChange}
                    name={name}
                  />
                )}
              />
            </Field>
          </Wrapper>
        </Field>
      </form>
    );
  }
);

export default Form;
