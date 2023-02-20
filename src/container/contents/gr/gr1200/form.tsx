import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
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
import { useSelector } from "app/store";
import FooterInfo from "./footer";
import { CircleBtn } from "./style";
import { PersonInfoText } from "components/text";
import {
  formatDateByRemoveDash,
  formatDate,
  formatDateToString,
  formatDateToStringWithoutDash,
} from "helpers/dateFormat";
import {
  GR120065,
  GR1200BUYINSERT,
  GR1200BUYUPDATE,
  GR1200BUYDELETE,
  GR1200BLUPDATE,
  GR1200BLINSERT,
  GR1200BLDELETE,
} from "app/path";
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
  selected,
  areaCode,
  fetchData,
}: {
  dataCommonDic: any;
  selected: any;
  areaCode: string;
  fetchData: Function;
}) {
  const [tabId, setTabId] = useState(0);
  const [isAddBtnClicked, setAddBtnClicked] = useState(false);
  const [rowIndex, setRowIndex] = useState<number | null>(null);
  const [radioChecked, setRadioChecked] = useState(0);

  const [data65, setData65] = useState<any>({});
  const [data65Detail, setData65Detail] = useState<any[]>([]);
  const [deleteData65Detail, setDeleteData65Detail] = useState<any[]>([]);
  const [bclInqtyLPG, setBclInqtyLPG] = useState(false);

  const [pin, setPin] = useState(0);
  const [bin, setBin] = useState(0);
  const [sumP, setSumP] = useState(0);
  const [sumB, setSumB] = useState(0);

  const stateGR1200 = useSelector((state: any) => state.modal.gr1200);

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
              isProductNameSelected: stateGR1200.isProductNameSelected,
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
        bcSupplyAmt: data65.bcSupplyAmt,
        bcVatAmt: data65.bcVatAmt,
        bcInkum: data65.bcInkum,
        bcMemo: data65.bcMemo,
        bcInkum1: data65.bcInkum1,
        bcSupplyType: data65.bcSupplyType,
        bcOutkum: data65.bcOutkum,
        bcDc: data65.bcDc,
      });

      setTabId(parseInt(data65?.bcChitType));
    }
    setAddBtnClicked(false);
    setRowIndex(null);
  }, [data65]);

  useEffect(() => {
    calcTab1GridChange();
  }, [data65Detail]);

  useEffect(() => {
    calcTab1GridChange();
  }, [bclInqtyLPG]);

  const calcTab1GridChange = () => {
    if (data65Detail) {
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

      bcTotal =
        (isNaN(bcPin) ? 0 : +bcPin) +
        (isNaN(bcBin) ? 0 : +bcBin) +
        +data65?.bcGin;
      bcJTotal = +bcPjan + +bcBjan;
      bcSumTotal = bcSumP + +bcSumB;
      bcSumKum = bcPkum + +bcBkum + +data65?.bcGkum;
      bcSumCost = +bcPcost + +bcBcost + +data65?.bcGcost;
      bcSum = bcPsum + +bcBsum + +data65?.bcGsum;

      const bcSupplyAmt = Math.round(bcSum / 1.1);
      const bcVatAmt = bcSum - bcSupplyAmt;
      reset((formValues) => ({
        ...formValues,
        bcPin: isNaN(bcPin) ? 0 : bcPin,
        bcBin: isNaN(bcBin) ? 0 : bcBin,
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
        bcInkum: bcSum,
        bcSupplyAmt: bcSupplyAmt,
        bcVatAmt: bcVatAmt,
      }));
    }
  };

  const calcTab1FooterChange = (num: any, name: string) => {
    if (name === "bcPjan") {
      const { bcPdanga, bcPcost, bcBjan, bcSumB, bcBkum, bcBsum } = getValues();
      let bcSumP: number = 0;
      let bcPkum: number = 0;
      let bcPsum: number = 0;
      let bcJTotal: number = 0;
      let bcSumTotal: number = 0;
      let bcSumKum: number = 0;
      let bcSum: number = 0;

      bcSumP = sumP - parseInt(num === "" ? 0 : num);

      if (bcPdanga) {
        bcPkum = bcSumP * bcPdanga;
      }

      if (bcPcost) {
        bcPsum = bcPkum + +bcPcost;
      } else {
        bcPsum = bcPkum;
      }

      bcJTotal = parseInt(num === "" ? 0 : num) + +bcBjan;
      bcSumTotal = bcSumP + +bcSumB;
      bcSumKum = bcPkum + +bcBkum;
      bcSum = bcPsum + bcBsum;

      reset((formValues) => ({
        ...formValues,
        bcSumP: bcSumP,
        bcPkum: bcPkum,
        bcPsum: bcPsum,
        bcJTotal: bcJTotal,
        bcSumTotal: bcSumTotal,
        bcSumKum: bcSumKum,
        bcSum: bcSum,
      }));
    }

    if (name === "bcBjan") {
      const { bcBdanga, bcBcost, bcPjan, bcSumP, bcPkum, bcPsum } = getValues();
      let bcSumB: number = 0;
      let bcBkum: number = 0;
      let bcBsum: number = 0;
      let bcJTotal: number = 0;
      let bcSumTotal: number = 0;
      let bcSumKum: number = 0;
      let bcSum: number = 0;

      bcSumB = sumB - parseInt(num === "" ? 0 : num);

      if (bcBdanga) {
        bcBkum = bcSumB * bcBdanga;
      }

      if (bcBcost) {
        bcBsum = bcBkum + +bcBcost;
      } else {
        bcBsum = bcBkum;
      }

      bcJTotal = parseInt(num === "" ? 0 : num) + +bcPjan;
      bcSumTotal = bcSumB + +bcSumP;
      bcSumKum = bcBkum + +bcPkum;
      bcSum = bcBsum + bcPsum;

      reset((formValues) => ({
        ...formValues,
        bcSumB: bcSumB,
        bcBkum: bcBkum,
        bcBsum: bcBsum,
        bcJTotal: bcJTotal,
        bcSumTotal: bcSumTotal,
        bcSumKum: bcSumKum,
        bcSum: bcSum,
      }));
    }

    if (name === "bcPdanga") {
      let bcPsum: number;
      const { bcSumP, bcPcost, bcBkum, bcBsum } = getValues();
      const bcPkum = bcSumP * parseInt(num === "" ? 0 : num);

      if (bcPcost) {
        bcPsum = bcPkum + +bcPcost;
      } else {
        bcPsum = bcPkum;
      }
      const bcSumKum = bcPkum + bcBkum;
      const bcSum = bcPsum + bcBsum;

      reset((formValues) => ({
        ...formValues,
        bcPkum: bcPkum,
        bcPsum: bcPsum,
        bcSumKum: bcSumKum,
        bcSum: bcSum,
      }));
    }

    if (name === "bcBdanga") {
      let bcBsum: number;
      const { bcSumB, bcBcost, bcPkum, bcPsum } = getValues();
      const bcBkum = bcSumB * parseInt(num === "" ? 0 : num);

      if (bcBcost) {
        bcBsum = bcBkum + +bcBcost;
      } else {
        bcBsum = bcBkum;
      }
      const bcSumKum = bcBkum + bcPkum;
      const bcSum = bcBsum + bcPsum;

      reset((formValues) => ({
        ...formValues,
        bcBkum: bcBkum,
        bcBsum: bcBsum,
        bcSumKum: bcSumKum,
        bcSum: bcSum,
      }));
    }

    if (name === "bcPcost") {
      const { bcPkum, bcBcost, bcBsum } = getValues();
      let bcSumCost: number = 0;
      let bcSum: number = 0;
      const bcPsum = bcPkum + parseInt(num === "" ? 0 : num);
      bcSumCost = parseInt(num === "" ? 0 : num) + +bcBcost + +data65?.bcGcost;
      bcSum = bcPsum + +bcBsum;

      reset((formValues) => ({
        ...formValues,
        bcPsum: bcPsum,
        bcSumCost: bcSumCost,
        bcSum: bcSum,
      }));
    }

    if (name === "bcBcost") {
      const { bcBkum, bcPcost, bcPsum } = getValues();
      let bcSumCost: number = 0;
      let bcSum: number = 0;
      const bcBsum = bcBkum + parseInt(num === "" ? 0 : num);
      bcSumCost = parseInt(num === "" ? 0 : num) + +bcPcost + +data65?.bcGcost;
      bcSum = +bcBsum + +bcPsum;

      reset((formValues) => ({
        ...formValues,
        bcBsum: bcBsum,
        bcSumCost: bcSumCost,
        bcSum: bcSum,
      }));
    }

    if (name === "bcOutkum") {
      const { bcInkum1, bcDc } = getValues();
      const bcMisu = +bcInkum1 - bcDc - parseInt(num === "" ? 0 : num);

      reset((formValues) => ({
        ...formValues,
        bcMisu: bcMisu,
      }));
    }
    if (name === "bcDc") {
      const { bcInkum1, bcOutkum } = getValues();
      const bcMisu = +bcInkum1 - bcOutkum - parseInt(num === "" ? 0 : num);

      reset((formValues) => ({
        ...formValues,
        bcMisu: bcMisu,
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
          isNew: true,
        },
      ]);
      setRowIndex(null);
    }
  };

  const deleteRow = () => {
    if (rowIndex !== null) {
      data65Detail.map((obj, idx) => {
        if (!("isNew" in obj) && idx === rowIndex) {
          setDeleteData65Detail((prev) => [...prev, obj]);
        }
      });
      setData65Detail((prev) => prev.filter((obj, idx) => idx !== rowIndex));
      setRowIndex(null);
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
      setDeleteData65Detail([]);
    } catch (err) {
      setData65({});
      setData65Detail([]);
      setDeleteData65Detail([]);
      console.log("GR1200 65 DATA fetch error =======>", err);
    }
  };

  const clear = () => {
    reset({
      areaCode: areaCode,
      bcDate: formatDateToString(new Date()),
      bcBuCode: dataCommonDic?.bcBuCode[0].code,
      bcCtype: dataCommonDic?.bcCtype[0].code,
      bcJunno: "",
      bcDateno: "",
      bcCsawon: dataCommonDic?.bcCsawon[0].code,
      bcCarno: dataCommonDic?.bcCarno[0].code,
    });
    document.getElementById("bcJunno")?.focus();
    setData65Detail([
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
        isNew: true,
      },
    ]);
  };

  const crud = async (type: string | null) => {
    if (type === "delete") {
      if (Object.keys(data65).length > 0) {
        const res: any = await API.post(GR1200BUYDELETE, {
          areaCode: data65.areaCode,
          bcBuCode: data65.bcBuCode,
          bcDate: data65.bcDate,
          bcSno: data65.bcSno,
        });

        if (res.status === 200) {
          toast.success("삭제하였습니다", {
            autoClose: 500,
          });
        } else {
          //toast.error(res?.data?.message, { autoClose: 500 });
        }
        fetchData();
      }
    }

    if (type === null) {
      handleSubmit(submit)();
    }
  };

  const submit = async (data: any) => {
    const formValues = getValues();

    //formValues.bcDate = formatDateByRemoveDash(formValues.bcDate);

    formValues.bcDate =
      typeof formValues.bcDate === "string"
        ? formatDateByRemoveDash(formValues.bcDate)
        : formatDateToStringWithoutDash(formValues.bcDate);

    let path: string;

    if (isAddBtnClicked) {
      path = GR1200BUYINSERT;
    } else {
      path = GR1200BUYUPDATE;
    }

    try {
      const res = await API.post(path, {
        ...formValues,
        bcChitType: tabId,
        bcSno: data65.bcSno,
      });

      if (res.status === 200) {
        const bcSno = res?.data?.returnValue;
        if (isAddBtnClicked) {
          if (bcSno && bcSno !== "" && data65Detail?.length > 0) {
            await Promise.all(
              data65Detail.map((item: any) => {
                if ("isEdited" in item && "isProductNameSelected" in item) {
                  API.post(GR1200BLINSERT, {
                    inserted: [
                      {
                        ...item,
                        areaCode: areaCode,
                        bcDate: formValues.bcDate,
                        bcBuCode: data65.bcBuCode,
                        bcSno: bcSno,
                      },
                    ],
                  });
                }
              })
            );
            toast.success("저장이 성공하였습니다", {
              autoClose: 500,
            });
          }
        } else {
          if (data65Detail?.length > 0) {
            await Promise.all(
              data65Detail.map((item: any) => {
                //insert
                if (
                  "isNew" in item &&
                  "isEdited" in item &&
                  "isProductNameSelected" in item
                ) {
                  API.post(GR1200BLINSERT, {
                    inserted: [
                      {
                        ...item,
                        areaCode: areaCode,
                        bcDate: formValues.bcDate,
                        bcBuCode: data65.bcBuCode,
                        bcSno: data65.bcSno,
                      },
                    ],
                  });
                }
                //update
                if (
                  !("isNew" in item) &&
                  ("isEdited" in item || "isProductNameSelected" in item)
                ) {
                  API.post(GR1200BLUPDATE, {
                    updated: [
                      {
                        ...item,
                        areaCode: data65?.areaCode,
                        bcDate: data65?.bcDate,
                        bcBuCode: data65?.bcBuCode,
                        bcSno: data65?.bcSno,
                      },
                    ],
                  });
                }
              })
            );
          }
          if (deleteData65Detail?.length > 0) {
            await Promise.all(
              deleteData65Detail.map((item: any) => {
                //delete
                API.post(GR1200BLDELETE, {
                  deleted: [
                    {
                      areaCode: data65?.areaCode,
                      bcDate: data65?.bcDate,
                      bcBuCode: data65?.bcBuCode,
                      bcSno: data65?.bcSno,
                      bclJpSno: item.bclJpSno,
                    },
                  ],
                });
              })
            );
          }
        }
        fetchData();
        //fetchData65();
        setRowIndex(null);
        setDeleteData65Detail([]);
      }
    } catch (err) {}
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "900px",
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
          <FormGroup>
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
          </FormGroup>
          <Field flex>
            <Button
              type="button"
              text="등록"
              icon={<Plus />}
              style={{ marginRight: "5px" }}
              onClick={() => {
                setAddBtnClicked(true);
                clear();
              }}
            />
            <Button
              type="button"
              text="삭제"
              icon={<Trash />}
              style={{ marginRight: "5px" }}
              onClick={() => {
                setAddBtnClicked(false);
                crud("delete");
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
                crud(null);
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
                  readOnly={!isAddBtnClicked}
                />
              )}
            />
          </Field>
          <FormGroup>
            <Label>매입처</Label>
            <Select
              {...register("bcBuCode")}
              width={InputSize.i100}
              disabled={!isAddBtnClicked}
            >
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
            setRowIndex={setRowIndex}
            register={register}
            setBclInqtyLPG={setBclInqtyLPG}
            calcTab1FooterChange={calcTab1FooterChange}
          />
        </TabContentWrapper>
      </form>
      <FooterInfo
        data={data65}
        register={register}
        calcTab1FooterChange={calcTab1FooterChange}
      />
    </div>
  );
}

export default Form;
