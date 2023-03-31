import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import CustomDatePicker from "components/customDatePicker";
import PlainTab from "components/plainTab";
import EditableSelect from "components/editableSelect";
import { TabContentWrapper } from "components/plainTab/style";
import {
  Item,
  RadioButton,
  RadioButtonLabel,
} from "components/radioButton/style";
import { Input, Select, FormGroup, Label } from "components/form/style";
import {
  openModal,
  addDeleteMenuId,
  setIsDelete,
  closeModal,
} from "app/state/modal/modalSlice";
import { InputSize } from "components/componentsType";
import { emptyObj, IDATA65 } from "./model";
import TabGrid from "./tabs/grid";
import { useDispatch, useSelector } from "app/store";
import CommonFooterInfo from "./commonFooter";
import { CircleBtn } from "./style";
import { PersonInfoText } from "components/text";
import { DateWithDash, DateWithoutDash } from "helpers/dateFormat";
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
import { useGetAdditionalDictionaryQuery } from "app/api/commonDictionary";
import { emptyObjTab1, emptyObjTab2, emptyObjTab3 } from "./model";
import { calcTab1GridChange, calcFooterTab2Tab3 } from "./calculationHelper";
import { SearchWrapper } from "container/contents/commonStyle";
import FourButtons from "components/button/fourButtons";

let clone: any[];

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

const Form = ({
  dataCommonDic,
  selected,
  fetchData,
  menuId,
  isAddBtnClicked,
  setIsAddBtnClicked,
  isCancelBtnDisabled,
  setIsCancelBtnDisabled,
}: {
  dataCommonDic: any;
  selected: any;
  fetchData: Function;
  menuId: string;
  isAddBtnClicked: boolean;
  setIsAddBtnClicked: Function;
  isCancelBtnDisabled: boolean;
  setIsCancelBtnDisabled: Function;
}) => {
  const [tabId, setTabId] = useState(0);
  const [rowIndex, setRowIndex] = useState<number | null>(null);
  const [radioChecked, setRadioChecked] = useState("0");
  const [areaCode2, setAreaCode2] = useState("");
  const [data65, setData65] = useState<any>({});
  const [data65Detail, setData65Detail] = useState<any[]>([]);
  const [deleteData65Detail, setDeleteData65Detail] = useState<any[]>([]);
  //const [bcBuCode, setBcBuCode] = useState("");
  const [bclInqtyLPG, setBclInqtyLPG] = useState(false);
  //const [pin, setPin] = useState(0);
  //const [bin, setBin] = useState(0);
  const [sumP, setSumP] = useState(0);
  const [sumB, setSumB] = useState(0);

  const dispatch = useDispatch();

  const stateGR1200 = useSelector((state: any) => state.modal.gr1200);
  const { isDelete } = useSelector((state) => state.modal);

  const { data: dataAdditionalDic } = useGetAdditionalDictionaryQuery({
    groupId: "GR",
    functionName: "GR1200",
    areaCode: areaCode2,
  });

  const { register, handleSubmit, reset, control, getValues } =
    useForm<IDATA65>({
      mode: "onSubmit",
    });

  useEffect(() => {
    if (dataCommonDic?.areaCode) {
      setAreaCode2(dataCommonDic.areaCode[0].code);
    }
  }, [dataCommonDic]);

  useEffect(() => {
    if (dataAdditionalDic) {
      reset((formValues) => ({
        ...formValues,
        bcBuCode: dataAdditionalDic?.bcBuCode
          ? dataAdditionalDic?.bcBuCode[0].code
          : "",
        bcCtype: dataAdditionalDic?.bcCtype
          ? dataAdditionalDic.bcCtype[0].code
          : "",
        bcCarno: dataAdditionalDic?.bcCarno
          ? dataAdditionalDic.bcCarno[0].code
          : "",
        bcCarno1: dataAdditionalDic?.bcCarno1
          ? dataAdditionalDic.bcCarno1[0].code
          : "",
        bcCsawon: dataAdditionalDic?.bcCsawon
          ? dataAdditionalDic.bcCsawon[0].code
          : "",
        bcSupplyType: dataAdditionalDic?.bcSupplyType
          ? dataAdditionalDic.bcSupplyType[0].code
          : "",
      }));
    }
  }, [dataAdditionalDic]);

  useEffect(() => {
    if (stateGR1200.index !== undefined && stateGR1200.jpName) {
      setData65Detail((prev: any) =>
        prev.map((object: any, idx: number) => {
          if (idx === stateGR1200.index) {
            return {
              ...object,
              bclJpName: stateGR1200?.jpName,
              bclJpCode: stateGR1200?.jpCode,
              bclSvyn: stateGR1200?.jpSvyn,
              bclGubun: stateGR1200?.jpGubun,
              isProductNameSelected: stateGR1200.isProductNameSelected,
              bclKg: stateGR1200?.jpKg,
            };
          } else return object;
        })
      );
    }
  }, [stateGR1200]);

  useEffect(() => {
    if (Object.keys(selected)?.length > 0) {
      setAreaCode2(selected?.areaCode);
      fetchData65();
    } else {
      resetForm("clear");
    }
  }, [selected]);

  useEffect(() => {
    if (Object.keys(data65)?.length) {
      resetForm("reset");
    }
  }, [data65]);

  useEffect(() => {
    if (isDelete.menuId === menuId && isDelete.isDelete) {
      deleteRowGrid();
    }
  }, [isDelete.isDelete]);

  useEffect(() => {
    tabId === 0 &&
      calcTab1GridChange(
        data65Detail,
        //setBin,
        //setPin,
        setSumB,
        setSumP,
        getValues,
        data65,
        reset
      );
    tabId === 1 && calcFooterTab2Tab3(data65Detail, getValues, reset);
    clone = structuredClone(data65Detail);
  }, [bclInqtyLPG]);

  useEffect(() => {
    if (isAddBtnClicked === true) {
      if (clone.length > 0) {
        if (clone[0].tabId !== tabId) {
          // console.log("tabID:::::", tabId);
          tabId === 0 &&
            setData65Detail([
              {
                ...emptyObjTab1,
                isNew: true,
                tabId: tabId,
              },
            ]);
          tabId === 1 &&
            setData65Detail([
              {
                ...emptyObjTab2,
                isNew: true,
                tabId: tabId,
              },
            ]);
          tabId === 2 &&
            setData65Detail([
              {
                ...emptyObjTab3,
                isNew: true,
                tabId: tabId,
              },
            ]);
        } else {
          setData65Detail(clone);
        }
      }
    }
  }, [tabId]);

  const fetchData65 = async () => {
    try {
      const { data } = await API.get(GR120065, {
        params: {
          areaCode: selected?.areaCode,
          bcDate: DateWithoutDash(selected?.bcDate),
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

  const resetForm = async (type: string) => {
    if (type === "clear") {
      setTabId(0);
      setRadioChecked(radioOptions[0].id);

      reset({
        bcBuCode: dataAdditionalDic?.bcBuCode
          ? dataAdditionalDic?.bcBuCode[0].code
          : "",
        bcCtype: dataAdditionalDic?.bcCtype
          ? dataAdditionalDic.bcCtype[0].code
          : "",
        bcCarno: dataAdditionalDic?.bcCarno
          ? dataAdditionalDic.bcCarno[0].code
          : "",
        bcCarno1: dataAdditionalDic?.bcCarno1
          ? dataAdditionalDic.bcCarno1[0].code
          : "",
        bcCsawon: dataAdditionalDic?.bcCsawon
          ? dataAdditionalDic.bcCsawon[0].code
          : "",

        bcSupplyType: dataAdditionalDic?.bcSupplyType
          ? dataAdditionalDic.bcSupplyType[0].code
          : "",

        bcDate: DateWithDash(new Date()),
        ...emptyObj,
      });

      setData65Detail([
        {
          ...emptyObjTab1,
          tabId: 0,
          isNew: true,
        },
      ]);
      document.getElementById("bcJunno")?.focus();
    }
    if (type === "reset") {
      setTabId(parseInt(data65?.bcChitType));
      setRadioChecked(data65?.bcCaCode);
      setIsAddBtnClicked(false);
      setRowIndex(null);

      reset({
        ...data65,
      });
    }
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
          fetchData();
        } else {
          toast.error(res?.data?.message, { autoClose: 500 });
          return null;
        }
      }
      return null;
    }

    if (type === null) {
      handleSubmit(submit)();
    }
  };

  const submit = async (data: any) => {
    const formValues = getValues();

    let path: string;
    let body: any = {};

    if (isAddBtnClicked) {
      path = GR1200BUYINSERT;
      body = {
        ...formValues,
        bcDate: DateWithoutDash(formValues.bcDate),
        areaCode: areaCode2,
        bcChitType: `${tabId}`,
        bcCaCode: radioChecked,
        bcSno: "",
      };
    } else {
      path = GR1200BUYUPDATE;
      body = {
        ...formValues,
        bcDate: DateWithoutDash(formValues.bcDate),
        bcCaCode: radioChecked,
      };
    }

    try {
      const res = await API.post(path, body);

      // console.log("data65Detail======>::::", data65Detail);

      if (res.status === 200) {
        if (isAddBtnClicked) {
          console.log("iishee orohgyi yum bn ", res?.data?.returnValue);
          const bcSno = res?.data?.returnValue;
          if (bcSno && bcSno !== "" && data65Detail?.length > 0) {
            await Promise.all(
              data65Detail.map((item: any) => {
                if (
                  "isNew" in item &&
                  "isEdited" in item &&
                  "isProductNameSelected" in item
                ) {
                  API.post(GR1200BLINSERT, {
                    inserted: [
                      {
                        ...item,
                        areaCode: areaCode2,
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
                        areaCode: areaCode2,
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

  const addRow = () => {
    if (data65Detail !== undefined) {
      tabId === 0 &&
        setData65Detail((prev: any) => [
          ...prev,
          {
            ...emptyObjTab1,
            isNew: true,
            tabId: tabId,
          },
        ]);
      tabId === 1 &&
        setData65Detail((prev: any) => [
          ...prev,
          {
            ...emptyObjTab2,
            isNew: true,
            tabId: tabId,
          },
        ]);
      tabId === 2 &&
        setData65Detail((prev: any) => [
          ...prev,
          {
            ...emptyObjTab3,
            isNew: true,
            tabId: tabId,
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
      clone = clone.filter((item, idx) => idx !== rowIndex);

      setRowIndex(null);
    } else {
      toast.warning(`please select a row.`, {
        autoClose: 500,
      });
    }
  };

  const calcOnFieldChange = (num: any, name: string) => {
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

      reset((formValues: any) => ({
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

      reset((formValues: any) => ({
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

      reset((formValues: any) => ({
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

      reset((formValues: any) => ({
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

      reset((formValues: any) => ({
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

      reset((formValues: any) => ({
        ...formValues,
        bcBsum: bcBsum,
        bcSumCost: bcSumCost,
        bcSum: bcSum,
      }));
    }

    if (name === "bcOutkum") {
      const { bcInkum1, bcDc } = getValues();
      const bcMisu = +bcInkum1 - bcDc - parseInt(num === "" ? 0 : num);

      reset((formValues: any) => ({
        ...formValues,
        bcMisu: bcMisu,
      }));
    }

    if (name === "bcDc") {
      const { bcInkum1, bcOutkum } = getValues();
      const bcMisu = +bcInkum1 - bcOutkum - parseInt(num === "" ? 0 : num);

      reset((formValues: any) => ({
        ...formValues,
        bcMisu: bcMisu,
      }));
    }
  };

  const onClickAdd = () => {
    setIsAddBtnClicked(true);
    setIsCancelBtnDisabled(false);
    resetForm("clear");
  };

  function deleteRowGrid() {
    try {
      crud("delete");
      dispatch(addDeleteMenuId({ menuId: "" }));
      dispatch(setIsDelete({ isDelete: false }));
      dispatch(closeModal());
    } catch (error) {}
  }

  const onClickDelete = () => {
    if (Object.keys(selected).length > 0) {
      dispatch(openModal({ type: "delModal" }));
      dispatch(addDeleteMenuId({ menuId: menuId }));
    } else {
      toast.warning("no selected data to delete", {
        autoClose: 500,
      });
    }
  };
  const onClickUpdate = () => {
    crud(null);
  };

  const onClickReset = () => {
    setIsAddBtnClicked(false);
    setIsCancelBtnDisabled(true);
    resetForm("reset");
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
        <SearchWrapper
          className="h35"
          style={{
            background: "transparent",
            borderBottom: "1px solid #707070",
          }}
        >
          <FormGroup>
            <PersonInfoText text="가스매입등록" />
            <p className="big">영업소</p>
            <Select
              onChange={(e) => setAreaCode2(e.target.value)}
              value={areaCode2}
            >
              {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>

          <FourButtons
            onClickAdd={onClickAdd}
            onClickDelete={onClickDelete}
            onClickUpdate={onClickUpdate}
            onClickReset={onClickReset}
            isAddBtnClicked={isAddBtnClicked}
            isCancelBtnDisabled={isCancelBtnDisabled}
          />
        </SearchWrapper>
        <FormGroup>
          <Label>입고일자</Label>
          <Controller
            control={control}
            {...register("bcDate")}
            render={({ field: { onChange, value, name } }) => (
              <CustomDatePicker
                style={{ width: "130px" }}
                value={value}
                onChange={onChange}
                name={name}
                readOnly={!isAddBtnClicked}
              />
            )}
          />

          <Label>매입처</Label>
          <Select
            {...register("bcBuCode")}
            width={InputSize.i130}
            disabled={!isAddBtnClicked}
          >
            {dataAdditionalDic?.bcBuCode?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>수송방법</Label>
          <Select {...register("bcCtype")} width={InputSize.i130}>
            {dataAdditionalDic?.bcCtype?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>

          <Input
            label="전표번호"
            register={register("bcJunno")}
            inputSize={InputSize.i130}
          />
          <Input
            label="충전 회차"
            register={register("bcDateno")}
            inputSize={InputSize.i50}
          />
        </FormGroup>
        <FormGroup>
          <Label>수송기사</Label>
          <EditableSelect
            list={dataAdditionalDic?.bcCsawon}
            register={register("bcCsawon")}
            style={{ width: "130px" }}
          />

          <Label>수송차량</Label>
          <Select {...register("bcCarno")} width={InputSize.i130}>
            {dataAdditionalDic?.bcCarno?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>재고 입고처</Label>
          {radioOptions.map((option, index) => (
            <Item key={index}>
              <RadioButton
                type="radio"
                value={option.id}
                name="bcCaCode"
                id={option.id}
                checked={radioChecked === option.id}
                onChange={(e: any) => {
                  setRadioChecked(option.id);
                }}
              />
              <RadioButtonLabel htmlFor={`${option.label}`}>
                {option.label}
              </RadioButtonLabel>
            </Item>
          ))}

          <Label></Label>
          <Select
            {...register("bcCarno1")}
            width={InputSize.i130}
            disabled={radioChecked === radioOptions[0].id}
          >
            {dataAdditionalDic?.bcCarno1?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>

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
          <CircleBtn onClick={deleteRow} style={{ marginRight: "14px" }}>
            -
          </CircleBtn>
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
            getValues={getValues}
            data={data65Detail}
            setData={setData65Detail}
            data2={data65}
            tabId={tabId ? tabId : 0}
            setRowIndex={setRowIndex}
            register={register}
            setBclInqtyLPG={setBclInqtyLPG}
            calcOnFieldChange={calcOnFieldChange}
          />
        </TabContentWrapper>
      </form>
      <CommonFooterInfo
        register={register}
        calcOnFieldChange={calcOnFieldChange}
        dataAdditionalDic={dataAdditionalDic}
      />
    </div>
  );
};
export default Form;
