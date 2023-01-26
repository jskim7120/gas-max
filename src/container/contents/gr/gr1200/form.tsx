import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Button from "components/button/button";
import CustomDatePicker from "components/customDatePicker";
import PlainTab from "components/plainTab";
import EditableSelect from "components/editableSelect";
import { TabContentWrapper } from "components/plainTab/style";
import {
  Item,
  RadioButton,
  RadioButtonLabel,
} from "components/radioButton/style";
import {
  Input,
  Select,
  Field,
  FormGroup,
  Wrapper,
  Label,
} from "components/form/style";
import { ResetGray, Update, Plus, Trash } from "components/allSvgIcon";
import { InputSize, ButtonColor } from "components/componentsType";
import { IDATA65 } from "./model";
import TabGrid from "./tabs/grid";
import { openModal, addGR1200 } from "app/state/modal/modalSlice";
import { useDispatch, useSelector } from "app/store";
import FooterInfo from "./footer";
import { toast } from "react-toastify";
import { CircleBtn } from "./style";
import { PersonInfoText } from "components/text";
import {
  formatDateToStringWithoutDash,
  formatDateByRemoveDash,
  formatDate,
} from "helpers/dateFormat";
import { GR120065 } from "app/path";
import API from "app/axios";

const radioOptions = [
  {
    label: "창고",
    id: "0",
  },
  {
    label: "차량",
    id: "1",
  },
];

function Form({
  dataCommonDic,
  // data,
  // data65Detail,
  // setData65Detail,
  selected,
}: {
  dataCommonDic: any;
  // data: any;
  // data65Detail: any;
  // setData65Detail: Function;
  selected: any;
}) {
  const [tabId, setTabId] = useState(0);
  const [isAddBtnClicked, setAddBtnClicked] = useState(false);
  const [rowIndex, setRowIndex] = useState<number | null>(null);
  const [radioChecked, setRadioChecked] = useState(0);

  const [data65, setData65] = useState<any>({});
  const [data65Detail, setData65Detail] = useState<any[]>();
  const [bclInqtyLPG, setBclInqtyLPG] = useState(false);

  const [pin, setPin] = useState(0);
  const [bin, setBin] = useState(0);
  const [sumP, setSumP] = useState(0);
  const [sumB, setSumB] = useState(0);

  const stateGR1200 = useSelector((state: any) => state.modal.gr1200);
  const dispatch = useDispatch();

  const { register, handleSubmit, reset, control, getValues } =
    useForm<IDATA65>({
      mode: "onSubmit",
    });

  useEffect(() => {
    if (stateGR1200.index !== undefined && stateGR1200.jpName) {
      setData65Detail((prev: any) =>
        prev.map((object: any, idx: number) => {
          if (idx === stateGR1200.index) {
            return {
              ...object,
              bclJpName: stateGR1200.jpName,
              bclJpCode: stateGR1200.jpCode,
              bclSvyn: stateGR1200.jpSvyn,
              bclGubun: stateGR1200.jpGubun,
              bclKg: stateGR1200.jpKg,
            };
          } else return object;
        })
      );
    }
  }, [stateGR1200]);

  useEffect(() => {
    if (selected) {
      fetchData65();
    }
  }, [selected]);

  useEffect(() => {
    if (data65) {
      reset({
        areaCode: data65.areaCode,
        bcDate: data65.bcDate ? formatDate(data65.bcDate) : "",
        bcDateno: data65.bcDateno,
        bcBuCode: data65.bcBuCode,
        bcJunno: data65.bcJunno,
        bcCtype: data65.bcCtype,
        bcCsawon: data65.bcCsawon,
        bcCarno: data65.bcCarno,
        bcCaCode: data65.bcCaCode,
        //---------------
        bcPjan: data65.bcPjan,
        bcBjan: data65.bcBjan,
        bcPdanga: data65.bcPdanga,
        bcBdanga: data65.bcBdanga,
        bcPcost: data65.bcPcost,
        bcBcost: data65.bcBcost,
        bcTotal: data65.bcTotal,
        bcJTotal: data65.bcJTotal,
        bcSumTotal: data65.bcSumTotal,
        bcSumKum: data65.bcSumKum,
        bcSumCost: data65.bcSumCost,
        bcSum: data65.bcSum,
      });

      setTabId(parseInt(data65?.bcChitType));
    }
    setAddBtnClicked(false);
  }, [data65]);

  useEffect(() => {
    someFunc();
  }, [data65Detail]);

  useEffect(() => {
    someFunc();
  }, [bclInqtyLPG]);

  /*
  const openPopup = () => {
    if (data) {
      dispatch(
        addGR1200({
          areaCode: data.areaCode,
          bcBuCode: data.bcBuCode,
          bcChitType: data.bcChitType ? data.bcChitType : "0",
        })
      );
      dispatch(openModal({ type: "gr1200Modal" }));
    }
  };
  */

  const someFunc = () => {
    if (data65Detail && data65Detail.length > 0) {
      let bcPin = 0;
      let bcBin = 0;
      let bcSumP = 0;
      let bcSumB = 0;
      let bcPkum = 0;
      let bcBkum = 0;
      let bcPsum = 0;
      let bcBsum = 0;

      let bcTotal = 0;
      let bcJTotal = 0;
      let bcSumTotal = 0;
      let bcSumKum = 0;
      let bcSumCost = 0;
      let bcSum = 0;

      data65Detail.forEach((obj: any) => {
        if (obj.bclGubun === "0") {
          bcPin += (obj.bclInqty ?? 0) * obj.bclKg;
          if (obj.bclSvyn === "N") {
            bcSumP += (obj.bclInqty ?? 0) * obj.bclKg;
          }
        }

        if (obj.bclGubun === "1") {
          bcBin += (obj.bclInqty ?? 0) * obj.bclKg;

          if (obj.bclSvyn === "N") {
            bcSumB += (obj.bclInqty ?? 0) * obj.bclKg;
          }
        }
      });

      setPin(bcPin);
      setBin(bcBin);
      setSumP(bcSumP);
      setSumB(bcSumB);

      const { bcPjan, bcBjan, bcPdanga, bcBdanga, bcPcost, bcBcost } =
        getValues();

      if (bcPjan) {
        bcSumP -= bcPjan;
      }
      if (bcBjan) {
        bcSumB -= bcBjan;
      }
      if (bcPdanga) {
        bcPkum = bcSumP * bcPdanga;
      }
      if (bcBdanga) {
        bcBkum = bcSumB * bcBdanga;
      }

      if (bcPcost) {
        bcPsum = bcPkum + +bcPcost;
      } else {
        bcPsum = bcPkum;
      }

      if (bcBcost) {
        bcBsum = bcBkum + +bcBcost;
      } else {
        bcBsum = bcBkum;
      }

      bcTotal = bcPin ?? 0 + bcBin ?? 0 + +(data65?.bcGin ?? 0);
      bcJTotal = bcPjan ?? 0 + bcBjan ?? 0;
      bcSumTotal = bcSumP ?? 0 + bcSumB ?? 0;
      bcSumKum = bcPkum ?? 0 + bcBkum ?? 0 + +(data65?.bcGkum ?? 0);
      bcSumCost = bcPcost ?? 0 + bcBcost ?? 0 + +(data65?.bcGcost ?? 0);
      bcSum = bcPsum ?? 0 + bcBsum ?? 0 + +(data65?.bcGsum ?? 0);

      reset((formValues) => ({
        ...formValues,
        bcPin: bcPin,
        bcBin: bcBin,
        bcSumP: bcSumP,
        bcSumB: bcSumB,
        bcPkum: bcPkum,
        bcBkum: bcBkum,
        bcPsum: bcPsum,
        bcBsum: bcBsum,
        bcTotal: bcTotal,
        bcJTotal: bcJTotal,
        bcSumTotal: bcSumTotal,
        bcSumKum: bcSumKum,
        bcSumCost: bcSumCost,
        bcSum: bcSum,
      }));
    }
  };

  const anotherFunc = (num: any, name: string) => {
    let fieldVal: number = 0;
    let fieldVal2: number = 0;
    let fieldVal3: number = 0;
    let fieldName: string = "";
    let fieldName2: string = "";
    let fieldName3: string = "";

    let bcJTotal: number = 0;
    let bcSumCost: number = 0;

    if (name === "bcPjan") {
      const { bcPdanga, bcPcost, bcBjan } = getValues();
      fieldName = "bcSumP";
      fieldName2 = "bcPkum";
      fieldName3 = "bcPsum";

      fieldVal = sumP - parseInt(num === "" ? 0 : num);

      if (bcPdanga) {
        fieldVal2 = fieldVal * bcPdanga;
      }

      if (bcPcost) {
        fieldVal3 = fieldVal2 + +bcPcost;
      } else {
        fieldVal3 = fieldVal2;
      }

      bcJTotal = parseInt(num === "" ? 0 : num) + +bcBjan;

      reset((formValues) => ({
        ...formValues,
        [fieldName]: fieldVal,
        [fieldName2]: fieldVal2,
        [fieldName3]: fieldVal3,
        bcJTotal: bcJTotal,
      }));
    }

    if (name === "bcBjan") {
      const { bcBdanga, bcBcost, bcPjan } = getValues();
      fieldName = "bcSumB";
      fieldName2 = "bcBkum";
      fieldName3 = "bcBsum";

      fieldVal = sumB - parseInt(num === "" ? 0 : num);

      if (bcBdanga) {
        fieldVal2 = fieldVal * bcBdanga;
      }

      if (bcBcost) {
        fieldVal3 = fieldVal2 + +bcBcost;
      } else {
        fieldVal3 = fieldVal2;
      }

      bcJTotal = parseInt(num === "" ? 0 : num) + +bcPjan;

      reset((formValues) => ({
        ...formValues,
        [fieldName]: fieldVal,
        [fieldName2]: fieldVal2,
        [fieldName3]: fieldVal3,
        bcJTotal: bcJTotal,
      }));
    }

    if (name === "bcPdanga") {
      const { bcSumP, bcPcost } = getValues();
      fieldVal = bcSumP * parseInt(num === "" ? 0 : num);
      fieldName = "bcPkum";
      fieldName2 = "bcPsum";

      if (bcPcost) {
        fieldVal2 = fieldVal + +bcPcost;
      } else {
        fieldVal2 = fieldVal;
      }

      reset((formValues) => ({
        ...formValues,
        [fieldName]: fieldVal,
        [fieldName2]: fieldVal2,
      }));
    }

    if (name === "bcBdanga") {
      const { bcSumB, bcBcost } = getValues();
      fieldVal = bcSumB * parseInt(num === "" ? 0 : num);
      fieldName = "bcBkum";
      fieldName2 = "bcBsum";

      if (bcBcost) {
        fieldVal2 = fieldVal + +bcBcost;
      } else {
        fieldVal2 = fieldVal;
      }

      reset((formValues) => ({
        ...formValues,
        [fieldName]: fieldVal,
        [fieldName2]: fieldVal2,
      }));
    }

    if (name === "bcPcost") {
      const { bcPkum, bcBcost } = getValues();
      fieldName = "bcPsum";
      fieldVal = bcPkum + parseInt(num === "" ? 0 : num);

      bcSumCost = parseInt(num === "" ? 0 : num) + +bcBcost + +data65?.bcGcost;
      reset((formValues) => ({
        ...formValues,
        [fieldName]: fieldVal,
        bcSumCost: bcSumCost,
      }));
    }

    if (name === "bcBcost") {
      const { bcBkum, bcPcost } = getValues();
      fieldName = "bcBsum";
      fieldVal = bcBkum + parseInt(num === "" ? 0 : num);
      bcSumCost = parseInt(num === "" ? 0 : num) + +bcPcost + +data65?.bcGcost;

      reset((formValues) => ({
        ...formValues,
        [fieldName]: fieldVal,
        bcSumCost: bcSumCost,
      }));
    }
  };

  const addRow = () => {
    if (data65Detail !== undefined) {
      setData65Detail((prev: any) => [
        ...prev,
        {
          bclAmt: null,
          bclChungbok: null,
          bclChungdae: null,
          bclCost: null,
          bclGubun: "1",
          bclInc: "",
          bclInmigum: null,
          bclInqty: null,
          bclJpCode: "",
          bclJpName: "",
          bclOutc: null,
          bclOutmigum: "",
          bclOutqty: null,
          bclSvyn: "",
          bclTongdel: null,
        },
      ]);
      setRowIndex(null);
    }
  };

  const deleteRow = () => {
    if (rowIndex !== null) {
      setData65Detail((prev: any) =>
        prev.filter((item: any, idx: number) => idx !== rowIndex)
      );
    } else {
      toast.warning(`please select a row.`, {
        autoClose: 500,
      });
    }
  };

  const fetchData65 = async () => {
    try {
      const { data } = await API.get(GR120065, {
        params: {
          areaCode: selected?.areaCode,
          bcDate: formatDateByRemoveDash(selected?.bcDate),
          sBcBuCode: selected?.bcBuCode,
          bcSno: selected?.bcSno,
          bcChitType: selected?.bcChitType,
        },
      });

      if (data) {
        data?.mainData ? setData65(data?.mainData[0]) : setData65({});
        data?.detailData
          ? setData65Detail([...data?.detailData])
          : setData65Detail([]);
      } else {
        setData65({});
        setData65Detail([]);
      }
    } catch (err) {
      console.log("GR1200 65 DATA fetch error =======>", err);
    }
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <form>
        <Field
          flex
          style={{
            height: "35px",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 6px 0 15px",
            borderBottom: "1px solid #707070",
          }}
        >
          <Field flex style={{ alignItems: "center" }}>
            <PersonInfoText text="가스매입등록" />
            <p
              style={{
                marginLeft: "27px",
                marginRight: "7px",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              영업소
            </p>

            <Select {...register("areaCode")}>
              {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </Field>
          <Field flex>
            <Button
              type="button"
              text="등록"
              icon={<Plus />}
              style={{ marginRight: "5px" }}
              onClick={() => {
                setAddBtnClicked(true);
              }}
            />
            <Button
              type="button"
              text="삭제"
              icon={<Trash />}
              style={{ marginRight: "5px" }}
              onClick={() => {
                setAddBtnClicked(false);
              }}
            />
            <Button
              type="button"
              text="저장"
              icon={<Update />}
              style={{ marginRight: "5px" }}
              color={ButtonColor.SUCCESS}
              onClick={() => {
                setAddBtnClicked(false);
              }}
            />
            <Button
              type="button"
              text="취소"
              icon={<ResetGray />}
              onClick={() => {
                setAddBtnClicked(false);
              }}
              color={ButtonColor.LIGHT}
            />
          </Field>
        </Field>
        <Wrapper grid>
          <Field flex style={{ alignItems: "center" }}>
            <Label>입고일자</Label>
            <Controller
              control={control}
              {...register("bcDate")}
              render={({ field: { onChange, value, name } }) => (
                <CustomDatePicker
                  value={value}
                  onChange={onChange}
                  name={name}
                />
              )}
            />
          </Field>
          <FormGroup>
            <Label>매입처</Label>
            <Select {...register("bcBuCode")} width={InputSize.i100}>
              {dataCommonDic?.bcBuCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
        </Wrapper>
        <Wrapper grid>
          <FormGroup>
            <Label>수송방법</Label>
            <Select {...register("bcCtype")} width={InputSize.i100}>
              {dataCommonDic?.bcCtype?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
          <Input label="전표번호" register={register("bcJunno")} />
          <Input
            label="충전 회차"
            register={register("bcDateno")}
            inputSize={InputSize.i50}
          />
        </Wrapper>
        <Wrapper grid>
          <FormGroup>
            <Label>수송기사</Label>

            <EditableSelect
              list={dataCommonDic?.bcCsawon}
              register={register("bcCsawon")}
            />
          </FormGroup>
          <FormGroup>
            <Label>수송차량</Label>
            <Select {...register("bcCarno")} width={InputSize.i100}>
              {dataCommonDic?.bcCarno?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
        </Wrapper>
        <Wrapper grid>
          <FormGroup>
            <Label>재고 입고처</Label>
            {radioOptions.map((option, index) => (
              <Item key={index}>
                <RadioButton
                  type="radio"
                  value={option.id}
                  {...register(`bcCaCode`)}
                  id={option.id}
                  checked={radioChecked === index}
                  onClick={(e: any) => {
                    setRadioChecked(parseInt(e.target.value));
                  }}
                />
                <RadioButtonLabel htmlFor={`${option.label}`}>
                  {option.label}
                </RadioButtonLabel>
              </Item>
            ))}
          </FormGroup>
          <FormGroup>
            <Label></Label>
            <Select
              {...register("bcCarno1")}
              width={InputSize.i100}
              disabled={radioChecked === 0}
            >
              {dataCommonDic?.bcCarno1?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
        </Wrapper>

        <div style={{ display: "flex", marginTop: "10px" }}>
          <PlainTab
            tabHeader={["LP가스 매입", "일반가스 매입", "벌크 매입"]}
            onClick={(id) => {
              isAddBtnClicked
                ? setTabId(id)
                : setTabId(parseInt(data65?.bcChitType));
            }}
            tabId={tabId}
          />

          <CircleBtn onClick={addRow} style={{ marginRight: "5px" }}>
            +
          </CircleBtn>
          <CircleBtn onClick={deleteRow}>-</CircleBtn>
        </div>
        <TabContentWrapper
          style={{
            padding: "0",
            border: "none",
            borderTop: "1px solid #707070",
            boxShadow: "none",
            borderRadius: "0",
          }}
        >
          <TabGrid
            data={data65Detail}
            setData={setData65Detail}
            data2={data65}
            tabId={tabId ? tabId : 0}
            //openPopup={openPopup}
            setRowIndex={setRowIndex}
            register={register}
            setBclInqtyLPG={setBclInqtyLPG}
            reset={reset}
            someFunc={someFunc}
            anotherFunc={anotherFunc}
          />
        </TabContentWrapper>
      </form>
      <FooterInfo data={data65} register={register} />
    </div>
  );
}

export default Form;
