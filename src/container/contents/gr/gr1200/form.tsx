import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { apiGet, apiPost } from "app/axios";
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
import { useGetAdditionalDictionaryQuery } from "app/api/commonDictionary";
import { calcFooterTab2Tab3 } from "./tabs/tab2and3CalculationHelper";
import { SearchWrapper } from "container/contents/commonStyle";
import FourButtons from "components/button/fourButtons";
import Tab1Footer from "./tabs/tab1Footer";
import {
  calcByOnChange,
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
  const [bcBuCode, setBcBuCode] = useState("");
  const [data65, setData65] = useState<any>({});
  const [data65Detail, setData65Detail] = useState<any[]>([]);
  const [deleteData65Detail, setDeleteData65Detail] = useState<any[]>([]);

  const [callCalc, setCallCalc] = useState(false);

  const [bcPjan, setBcPjan] = useState<number>(0);
  const [bcBjan, setBcBjan] = useState<number>(0);
  const [bcPdanga, setBcPdanga] = useState<number>(0);
  const [bcBdanga, setBcBdanga] = useState<number>(0);
  const [bcPcost, setBcPcost] = useState<number>(0);
  const [bcBcost, setBcBcost] = useState<number>(0);
  const [bcGcost, setBcGcost] = useState<number>(0);
  const [bcOutkum, setBcOutkum] = useState<number>(0);
  const [bcDc, setBcDc] = useState<number>(0);

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
      setAreaCode2(dataCommonDic?.areaCode[0].code);
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

      dataAdditionalDic?.bcBuCode &&
        setBcBuCode(
          dataAdditionalDic?.bcBuCode[0].code
            ? dataAdditionalDic?.bcBuCode[0].code
            : ""
        );
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
    if (tabId === 0) {
      calcTab1GridChange(
        data65Detail,
        getValues,
        reset,
        bcPjan,
        bcBjan,
        bcPdanga,
        bcBdanga,
        bcPcost,
        bcBcost,
        bcGcost,
        bcOutkum,
        bcDc
      );
    }
    if (tabId === 1 || tabId === 2) {
      calcFooterTab2Tab3(data65Detail, bcDc, bcOutkum, reset);
    }

    clone = structuredClone(data65Detail);
  }, [callCalc]);

  useEffect(() => {
    if (isAddBtnClicked === true) {
      if (clone.length > 0) {
        if (clone[0].tabId !== tabId) {
          setData65Detail([
            {
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

  const calcOnFieldChange = (name: string, num: number) => {
    calcByOnChange(
      name,
      num,
      reset,
      getValues,
      bcPjan,
      bcBjan,
      bcPdanga,
      bcBdanga,
      bcPcost,
      bcBcost,
      bcGcost,
      bcOutkum,
      bcDc
    );
  };

  const fetchData65 = async () => {
    const data = await apiGet(GR120065, {
      areaCode: selected?.areaCode,
      bcDate: DateWithoutDash(selected?.bcDate),
      sBcBuCode: selected?.bcBuCode,
      bcSno: selected?.bcSno,
      bcChitType: selected?.bcChitType,
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
          tabId: 0,
          isNew: true,
        },
      ]);

      setBcPjan(0);
      setBcBjan(0);
      setBcPdanga(0);
      setBcBdanga(0);
      setBcPcost(0);
      setBcBcost(0);
      setBcGcost(0);
      setBcOutkum(0);
      setBcDc(0);

      document.getElementById("bcJunno")?.focus();
    }
    if (type === "reset") {
      setTabId(parseInt(data65?.bcChitType));
      setRadioChecked(data65?.bcCaCode);
      setIsAddBtnClicked(false);
      setRowIndex(null);
      setBcBuCode(data65?.bcBuCode);

      reset({ ...data65 });

      setBcPjan(data65?.bcPjan);
      setBcBjan(data65?.bcBjan);
      setBcPdanga(data65?.bcPdanga);
      setBcBdanga(data65?.bcBdanga);
      setBcPcost(data65?.bcPcost);
      setBcBcost(data65?.bcBcost);
      setBcGcost(data65?.bcGcost);
      setBcOutkum(data65?.bcOutkum);
      setBcDc(data65?.bcDc);
    }
  };

  const crud = async (type: string | null) => {
    if (type === "delete") {
      if (Object.keys(data65).length > 0) {
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
        areaCode: areaCode2,
        bcBuCode: bcBuCode,
        bcChitType: `${tabId}`,
        bcCaCode: radioChecked,
        bcSno: "",
        bcPjan: +removeCommas(bcPjan),
        bcBjan: +removeCommas(bcBjan),
        bcPdanga: +removeCommas(bcPdanga),
        bcBdanga: +removeCommas(bcBdanga),
        bcPcost: +removeCommas(bcPcost),
        bcBcost: +removeCommas(bcBcost),
        bcGcost: +removeCommas(bcGcost),
        bcOutkum: +removeCommas(bcOutkum),
        bcDc: +removeCommas(bcDc),
      };
    } else {
      path = GR1200BUYUPDATE;
      body = {
        ...formValues,
        bcDate: DateWithoutDash(formValues.bcDate),
        bcCaCode: radioChecked,
        bcBuCode: bcBuCode,
        bcPjan: +removeCommas(bcPjan),
        bcBjan: +removeCommas(bcBjan),
        bcPdanga: +removeCommas(bcPdanga),
        bcBdanga: +removeCommas(bcBdanga),
        bcPcost: +removeCommas(bcPcost),
        bcBcost: +removeCommas(bcBcost),
        bcGcost: +removeCommas(bcGcost),
        bcOutkum: +removeCommas(bcOutkum),
        bcDc: +removeCommas(bcDc),
      };
    }

    try {
      const res: any = await apiPost(path, body);

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
                          areaCode: areaCode2,
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
                        areaCode: areaCode2,
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

  // console.log("data65Detail :::::::", data65Detail);

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
          />
        </SearchWrapper>
        <FormGroup>
          <Label>입고 일자</Label>
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
            //{...register("bcBuCode")}
            value={bcBuCode}
            width={InputSize.i130}
            disabled={!isAddBtnClicked}
            onChange={(e) => setBcBuCode(e.target.value)}
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
            register={register("bcCsawon")}
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
            register={register("bcCarno1")}
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
            areaCode={areaCode2}
            //bcBuCode={getValues("bcBuCode") ? getValues("bcBuCode") : ""}
            bcBuCode={bcBuCode}
            data={data65Detail}
            setData={setData65Detail}
            tabId={tabId ? tabId : 0}
            setRowIndex={setRowIndex}
            setCallCalc={setCallCalc}
          />
          {tabId === 0 && (
            <Tab1Footer
              register={register}
              control={control}
              calcOnFieldChange={calcOnFieldChange}
              bcPjan={bcPjan}
              setBcPjan={setBcPjan}
              bcBjan={bcBjan}
              setBcBjan={setBcBjan}
              bcPdanga={bcPdanga}
              setBcPdanga={setBcPdanga}
              bcBdanga={bcBdanga}
              setBcBdanga={setBcBdanga}
              bcPcost={bcPcost}
              setBcPcost={setBcPcost}
              bcBcost={bcBcost}
              setBcBcost={setBcBcost}
              bcGcost={bcGcost}
              setBcGcost={setBcGcost}
            />
          )}
        </TabContentWrapper>
      </form>
      <CommonFooterInfo
        register={register}
        dataAdditionalDic={dataAdditionalDic}
        control={control}
        calcOnFieldChange={calcOnFieldChange}
        bcOutkum={bcOutkum}
        setBcOutkum={setBcOutkum}
        bcDc={bcDc}
        setBcDc={setBcDc}
        // bcSupplyType={bcSupplyType}
        // setBcSupplyType={setBcSupplyType}
      />
    </div>
  );
};
export default Form;
