import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { apiGet, apiPost, apiPostWithReturn } from "app/axios";
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
import { useGetAreaCodeDictionaryMutation } from "app/api/commonDictionary";
import { calcFooterTab2Tab3 } from "./tabs/tab2and3CalculationHelper";
import { SearchWrapper } from "container/contents/commonStyle";
import Tab1Footer from "./tabs/tab1Footer";
import {
  calcOnFieldChange,
  calcTab1GridChange,
} from "./tabs/tab1CalculationHelper";
import { removeCommas } from "helpers/currency";

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
  addBtnUnclick,
  show4Btns,
  handleClickDelete,
}: {
  dataCommonDic: any;
  selected: any;
  fetchData: Function;
  menuId: string;
  isAddBtnClicked: boolean;
  addBtnUnclick: Function;
  show4Btns: Function;
  handleClickDelete: Function;
}) => {
  const { register, handleSubmit, reset, control, getValues, watch } =
    useForm<IDATA65>({
      mode: "onSubmit",
    });

  const [tabId, setTabId] = useState(0);
  const [rowIndex, setRowIndex] = useState<number | null>(null);

  const [data65, setData65] = useState<any>({});
  const [data65Detail, setData65Detail] = useState<any[]>([]);
  const [deleteData65Detail, setDeleteData65Detail] = useState<any[]>([]);
  const [callCalc, setCallCalc] = useState(false);

  const dispatch = useDispatch();

  const stateGR1200 = useSelector((state: any) => state.modal.gr1200);
  const { isDelete } = useSelector((state) => state.modal);

  const [getAreaCodeDictionary, { data: dataAdditionalDic }] =
    useGetAreaCodeDictionaryMutation();

  useEffect(() => {
    if (dataCommonDic) {
      resetForm("areaCode");
    }
  }, [dataCommonDic]);

  useEffect(() => {
    if (watch("areaCode2")) {
      getAreaCodeDictionary({
        groupId: "GR",
        functionName: "GR1200",
        areaCode: watch("areaCode2"),
      });
    }
  }, [watch("areaCode2")]);

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
    if ("index" in stateGR1200) {
      if (tabId === 0) {
        setData65Detail((prev: any) =>
          prev.map((object: any, idx: number) => {
            if (idx === stateGR1200.index) {
              return {
                ...object,
                bclJpName: stateGR1200?.jpName,
                bclJpCode: stateGR1200?.jpCode,
                bclSvyn: stateGR1200?.jpSvyn,
                bclGubun: stateGR1200?.jpGubun,
                bclKg: stateGR1200?.jpKg,
                bclInqty: 0,
                bclInc: 0,
                bclOutc: 0,
                bclOutqty: 0,
                bclInmigum: 0,
                bclOutmigum: 0,
                bclChungbok: 0,
                bclChungdae: 0,
                bclTongdel: 0,
                isProductNameSelected: true,
              };
            } else return object;
          })
        );
        setCallCalc((prev: boolean) => !prev);
      }
      if (tabId === 1) {
        setData65Detail((prev: any) =>
          prev.map((object: any, idx: number) => {
            if (idx === stateGR1200.index) {
              return {
                ...object,
                bclJpName: stateGR1200?.jpName,
                bclJpCode: stateGR1200?.jpCode,
                bclVatType: stateGR1200?.jpVatKind,
                bclCost: stateGR1200?.jpDanga,
                bclKg: stateGR1200?.jpKg,
                bclInqty: 0,
                bclInc: 0,
                bclOutc: 0,
                bclOutqty: 0,
                bclInmigum: 0,
                bclOutmigum: 0,
                bclChungbok: 0,
                bclChungdae: 0,
                bclTongdel: 0,
                bclAmt: stateGR1200?.jpVatKind ? +stateGR1200?.jpVatKind : 0,
                isProductNameSelected: true,
              };
            } else return object;
          })
        );
        setCallCalc((prev: boolean) => !prev);
      }
      if (tabId === 2) {
        setData65Detail((prev: any) =>
          prev.map((object: any, idx: number) => {
            if (idx === stateGR1200.index) {
              return {
                ...object,
                bclJpName: stateGR1200?.jpName,
                bclJpCode: stateGR1200?.jpCode,
                bclGubun: stateGR1200?.jpGubun,
                bclCost: stateGR1200?.jpDanga,
                bclKg: stateGR1200?.jpKg,
                jpDanga: stateGR1200?.jpDanga,
                bclUnit: stateGR1200?.jpUnit,
                bclSpecific: stateGR1200?.jpSpecific,
                bclBulkKg: 0,
                bclBulkL: 0,
                bclAmt: 0,
                bclVatType: 0,
                isProductNameSelected: true,
              };
            } else return object;
          })
        );
        setCallCalc((prev: boolean) => !prev);
      }
    }
  }, [stateGR1200]);

  useEffect(() => {
    if (selected && Object.keys(selected)?.length > 0) {
      fetchData65();
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
    if (tabId === 0) {
      calcTab1GridChange(data65Detail, getValues, reset);
    }
    if (tabId === 1 || tabId === 2) {
      calcFooterTab2Tab3(
        data65Detail,
        getValues("bcDc"),
        getValues("bcOutkum"),
        reset
      );
    }

    // clone = structuredClone(data65Detail);
  }, [callCalc]);

  useEffect(() => {
    //   if (isAddBtnClicked === true) {
    //     if (clone.length > 0) {
    //       if (clone[0].tabId !== tabId) {
    //         setData65Detail([
    //           {
    //             isNew: true,
    //             tabId: tabId,
    //           },
    //         ]);
    //       } else {
    //         setData65Detail(clone);
    //       }
    //     }
    //   }
    setData65Detail([]);
  }, [tabId]);

  useEffect(() => {
    if (watch("bcPjan")) {
      calcOnFieldChange("bcPjan", watch("bcPjan"), reset, getValues);
    }
  }, [watch("bcPjan")]);

  useEffect(() => {
    if (watch("bcPdanga")) {
      calcOnFieldChange("bcPdanga", watch("bcPdanga"), reset, getValues);
    }
  }, [watch("bcPdanga")]);

  useEffect(() => {
    if (watch("bcPcost")) {
      calcOnFieldChange("bcPcost", watch("bcPcost"), reset, getValues);
    }
  }, [watch("bcPcost")]);

  useEffect(() => {
    if (watch("bcBjan")) {
      calcOnFieldChange("bcBjan", watch("bcBjan"), reset, getValues);
    }
  }, [watch("bcBjan")]);

  useEffect(() => {
    if (watch("bcBdanga")) {
      calcOnFieldChange("bcBdanga", watch("bcBdanga"), reset, getValues);
    }
  }, [watch("bcBdanga")]);

  useEffect(() => {
    if (watch("bcBcost")) {
      calcOnFieldChange("bcBcost", watch("bcBcost"), reset, getValues);
    }
  }, [watch("bcBcost")]);

  useEffect(() => {
    if (watch("bcGcost")) {
      calcOnFieldChange("bcGcost", watch("bcGcost"), reset, getValues);
    }
  }, [watch("bcGcost")]);

  useEffect(() => {
    if (watch("bcOutkum")) {
      calcOnFieldChange("bcOutkum", watch("bcOutkum"), reset, getValues);
    }
  }, [watch("bcOutkum")]);

  useEffect(() => {
    if (watch("bcDc")) {
      calcOnFieldChange("bcDc", watch("bcDc"), reset, getValues);
    }
  }, [watch("bcDc")]);

  const fetchData65 = async () => {
    const res = await apiGet(GR120065, {
      areaCode: selected?.areaCode,
      bcDate: DateWithoutDash(selected?.bcDate),
      sBcBuCode: selected?.bcBuCode,
      bcSno: selected?.bcSno,
      bcChitType: selected?.bcChitType,
    });

    if (res) {
      setData65(res?.mainData ? res?.mainData[0] : {});
      setData65Detail(res?.detailData ? res?.detailData : []);
    } else {
      setData65({});
      setData65Detail([]);
    }
    setDeleteData65Detail([]);
  };

  const resetForm = async (type: string) => {
    if (type === "clear") {
      setTabId(0);
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
        bcCaCode: radioOptions[0].id,
      });

      setData65Detail([
        {
          tabId: 0,
          isNew: true,
        },
      ]);

      document.getElementById("bcJunno")?.focus();
    }
    if (type === "reset") {
      setTabId(parseInt(data65?.bcChitType));
      reset({ ...data65, areaCode2: data65.areaCode });
    }
    if (type === "areaCode") {
      reset({ areaCode2: dataCommonDic?.areaCode[0].code });
    }
  };

  const crud = async (type: string | null) => {
    if (type === "delete") {
      if (Object.keys(data65)?.length > 0) {
        const res = await apiPost(
          GR1200BUYDELETE,
          {
            areaCode: data65.areaCode,
            bcBuCode: data65.bcBuCode,
            bcDate: data65.bcDate,
            bcSno: data65.bcSno,
          },
          "삭제하였습니다"
        );

        res && fetchData();
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
        areaCode: watch("areaCode2"),
        bcChitType: `${tabId}`,
        bcSno: "",
        bcPjan: +removeCommas(formValues.bcPjan),
        bcBjan: +removeCommas(formValues.bcBjan),
        bcPdanga: +removeCommas(formValues.bcPdanga),
        bcBdanga: +removeCommas(formValues.bcBdanga),
        bcPcost: +removeCommas(formValues.bcPcost),
        bcBcost: +removeCommas(formValues.bcBcost),
        bcGcost: +removeCommas(formValues.bcGcost),
        bcOutkum: +removeCommas(formValues.bcOutkum),
        bcDc: +removeCommas(formValues.bcDc),
      };
    } else {
      path = GR1200BUYUPDATE;
      body = {
        ...formValues,
        bcDate: DateWithoutDash(formValues.bcDate),
        bcPjan: +removeCommas(formValues.bcPjan),
        bcBjan: +removeCommas(formValues.bcBjan),
        bcPdanga: +removeCommas(formValues.bcPdanga),
        bcBdanga: +removeCommas(formValues.bcBdanga),
        bcPcost: +removeCommas(formValues.bcPcost),
        bcBcost: +removeCommas(formValues.bcBcost),
        bcGcost: +removeCommas(formValues.bcGcost),
        bcOutkum: +removeCommas(formValues.bcOutkum),
        bcDc: +removeCommas(formValues.bcDc),
      };
    }

    try {
      const res: any = await apiPostWithReturn(path, body);

      if (res) {
        if (isAddBtnClicked) {
          const bcSno = res?.returnValue;

          if (bcSno && bcSno !== "" && data65Detail?.length > 0) {
            await Promise.all(
              data65Detail.map((item: any) => {
                if ("isNew" in item && "isProductNameSelected" in item) {
                  apiPost(
                    GR1200BLINSERT,
                    {
                      inserted: [
                        {
                          ...item,
                          areaCode: watch("areaCode2"),
                          bcDate: DateWithoutDash(formValues.bcDate),
                          bcBuCode: data65.bcBuCode,
                          bcSno: bcSno,
                        },
                      ],
                    },
                    "저장이 성공하였습니다"
                  );
                }
              })
            );
          }
        } else {
          if (data65Detail?.length > 0) {
            await Promise.all(
              data65Detail.map((item: any) => {
                //insert
                if ("isNew" in item && "isProductNameSelected" in item) {
                  apiPost(GR1200BLINSERT, {
                    inserted: [
                      {
                        ...item,
                        areaCode: watch("areaCode2"),
                        bcDate: DateWithoutDash(formValues.bcDate),
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
                  apiPost(GR1200BLUPDATE, {
                    updated: [
                      {
                        ...item,
                        areaCode: data65?.areaCode,
                        bcDate: DateWithoutDash(data65?.bcDate),
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
                apiPost(GR1200BLDELETE, {
                  deleted: [
                    {
                      areaCode: data65?.areaCode,
                      bcDate: DateWithoutDash(data65?.bcDate),
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
      // tabId === 0 &&
      //   setData65Detail((prev: any) => [
      //     ...prev,
      //     {
      //       isNew: true,
      //       tabId: tabId,
      //     },
      //   ]);
      // tabId === 1 &&
      //   setData65Detail((prev: any) => [
      //     ...prev,
      //     {
      //       isNew: true,
      //       tabId: tabId,
      //     },
      //   ]);
      // tabId === 2 &&
      //   setData65Detail((prev: any) => [
      //     ...prev,
      //     {
      //       isNew: true,
      //       tabId: tabId,
      //     },
      //   ]);

      setData65Detail((prev: any) => [
        ...prev,
        {
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

  function deleteRowGrid() {
    try {
      crud("delete");
      dispatch(addDeleteMenuId({ menuId: "" }));
      dispatch(setIsDelete({ isDelete: false }));
      dispatch(closeModal());
    } catch (error) {}
  }

  const handleClickAdd = () => {
    resetForm("clear");
  };

  // const handleClickDelete = () => {
  //   if (Object.keys(selected)?.length > 0) {
  //     dispatch(openModal({ type: "delModal" }));
  //     dispatch(addDeleteMenuId({ menuId: menuId }));
  //   } else {
  //     toast.warning("no selected data to delete", {
  //       autoClose: 500,
  //     });
  //   }
  // };
  const handleClickUpdate = () => {
    crud(null);
    addBtnUnclick();
  };

  const handleClickReset = () => {
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
      <form autoComplete="off">
        <SearchWrapper
          className="h35"
          style={{
            background: "transparent",
            borderBottom: "1px solid rgb(188,185 ,185)",
          }}
        >
          <FormGroup>
            <PersonInfoText text="가스매입등록" />
            <Label style={{ minWidth: "80px" }}>영업소</Label>
            <Select
              register={register("areaCode2")}
              disabled={!isAddBtnClicked}
            >
              {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
            <div className="buttons ml30">
              {show4Btns({
                handleClickAdd,
                handleClickDelete,
                handleClickReset,
                handleClickUpdate,
              })}
            </div>
          </FormGroup>
        </SearchWrapper>
        <FormGroup>
          <Label>입고 일자</Label>
          <Controller
            control={control}
            name="bcDate"
            render={({ field }) => (
              <CustomDatePicker
                {...field}
                style={{ width: "130px" }}
                readOnly={!isAddBtnClicked}
              />
            )}
          />

          <Label>매입처</Label>
          <Select
            register={register("bcBuCode")}
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
          <Label>수송 방법</Label>
          <Select register={register("bcCtype")} width={InputSize.i130}>
            {dataAdditionalDic?.bcCtype?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>

          <Input
            label="전표 번호"
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
          <Label>수송 기사</Label>
          <EditableSelect
            list={dataAdditionalDic?.bcCsawon}
            reset={reset}
            register={register("bcCsawon")}
            watch={watch("bcCsawon")}
            style={{ width: "130px" }}
          />

          <Label>수송 차량</Label>
          <Select register={register("bcCarno")} width={InputSize.i130}>
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
                id={option.id}
                {...register("bcCaCode")}
              />
              <RadioButtonLabel htmlFor={`${option.label}`}>
                {option.label}
              </RadioButtonLabel>
            </Item>
          ))}

          <Label></Label>
          <Select
            register={register("bcCarno1")}
            width={InputSize.i130}
            disabled={watch("bcCaCode") === radioOptions[0].id}
          >
            {dataAdditionalDic?.bcCarno1?.map((obj: any, idx: number) => (
              <option key={idx} value={obj.code}>
                {obj.codeName}
              </option>
            ))}
          </Select>
        </FormGroup>

        <div style={{ display: "flex", marginTop: "7px" }}>
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
            borderTop: "1px solid rgb(188,185 ,185)",
            boxShadow: "none",
            borderRadius: "0",
          }}
        >
          <TabGrid
            areaCode={watch("areaCode2")}
            bcBuCode={watch("bcBuCode")}
            data={data65Detail}
            setData={setData65Detail}
            tabId={tabId ? tabId : 0}
            setRowIndex={setRowIndex}
            setCallCalc={setCallCalc}
          />
          {tabId === 0 && <Tab1Footer control={control} />}
        </TabContentWrapper>
      </form>
      <CommonFooterInfo
        register={register}
        dataAdditionalDic={dataAdditionalDic}
        control={control}
      />
    </div>
  );
};
export default Form;
