import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import CustomDatePicker from "components/customDatePicker";
import PlainTab from "components/plainTab";
import { TabContentWrapper } from "components/plainTab/style";
import {
  Input,
  Select,
  FormGroup,
  Wrapper,
  Label,
} from "components/form/style";
import { SearchWrapper } from "container/contents/commonStyle";
import FourButtons from "components/button/fourButtons";
import { InputSize } from "components/componentsType";
import { IGR1300 } from "./model";
import TabGrid from "./tabs/grid";
import { useDispatch, useSelector } from "app/store";
import FooterInfo from "./footer";
import { CircleBtn } from "./style";
import { PersonInfoText } from "components/text";
import { DateWithoutDash } from "helpers/dateFormat";
import {
  openModal,
  addDeleteMenuId,
  setIsDelete,
  closeModal,
} from "app/state/modal/modalSlice";
import {
  GR130065,
  GR1300BUYINSERT,
  GR1300BUYUPDATE,
  GR1300BUYDELETE,
  GR1300BLUPDATE,
  GR1300BLINSERT,
  GR1300BLDELETE,
} from "app/path";
import { apiGet, apiPost } from "app/axios";

let data65Orig: any = {};

function Form({
  dataCommonDic,
  selected,
  fetchData,
  menuId,
  isAddBtnClicked,
  setIsAddBtnClicked,
}: {
  dataCommonDic: any;
  selected: any;
  fetchData: Function;
  menuId: string;
  isAddBtnClicked: boolean;
  setIsAddBtnClicked: Function;
}) {
  const [tabId, setTabId] = useState(0);
  const [rowIndex, setRowIndex] = useState<number | null>(null);
  const [areaCode2, setAreaCode2] = useState("");

  const [data65, setData65] = useState<any>({});
  const [deleteData65, setDeleteData65] = useState<any[]>([]);
  const [bclInqtyLPG, setBclInqtyLPG] = useState(false);

  const stateGR1300 = useSelector((state: any) => state.modal.gr1300);

  const dispatch = useDispatch();

  const { register, handleSubmit, reset, control, getValues } =
    useForm<IGR1300>({
      mode: "onSubmit",
    });

  useEffect(() => {
    if (stateGR1300.index !== undefined && stateGR1300.bpName) {
      setData65((prev: any) =>
        prev.map((object: any, idx: number) => {
          if (idx === stateGR1300.index) {
            return {
              ...object,
              bblBpCode: stateGR1300.bpCode,
              bblBpName: stateGR1300.bpName,
              bblDanga: stateGR1300.jbuBpDanga,
              bblVatType: stateGR1300.jbuVatKind,
              bblType: stateGR1300.bpType,
              isProductNameSelected: stateGR1300.isProductNameSelected,
            };
          } else return object;
        })
      );
    }
  }, [stateGR1300]);

  // useEffect(() => {
  //   if (selected) {
  //     fetchData65();
  //     reset({
  //       areaCode: selected.areaCode,
  //       bbDate: selected.bbDate,
  //       bbBuCode: selected.bbBuCode,
  //       bbSno: selected.bbSno,
  //       bbDc: selected.bbDc,
  //       bbOutkum: selected.bbOutkum,
  //     });

  //     setTabId(parseInt(selected.bbType));
  //     setIsAddBtnClicked(false);
  //     setRowIndex(null);
  //   }
  // }, [selected]);
  useEffect(() => {
    if (Object.keys(selected)?.length > 0) {
      setAreaCode2(selected?.areaCode);
      fetchData65();
    } else {
      resetForm("clear");
    }
  }, [selected]);

  useEffect(() => {
    calcTab1GridChange();
  }, [data65]);

  useEffect(() => {
    calcTab1GridChange();
  }, [bclInqtyLPG]);

  const calcTab1GridChange = () => {
    if (Object.keys(data65)?.length > 0) {
      let bbTotal = 0;
      data65.forEach((obj: any) => (bbTotal += obj.bblKumack ?? 0));

      const bbSum = Math.round(bbTotal / 1.1);
      const bbVat = bbTotal - bbSum;

      reset((formValues) => ({
        ...formValues,
        bbTotal: bbTotal,
        bbSum: bbSum,
        bbVat: bbVat,
      }));
    }
  };

  const calcTab1FooterChange = (num: any, name: string) => {
    if (name === "bbOutkum") {
      const { bbTotal, bbDc } = getValues();
      const bbMisu = bbTotal - bbDc - num;

      reset((formValues) => ({
        ...formValues,
        bbMisu: bbMisu,
      }));
    }
    if (name === "bbDc") {
      const { bbTotal, bbOutkum } = getValues();
      const bbMisu = bbTotal - bbOutkum - num;

      reset((formValues) => ({
        ...formValues,
        bbMisu: bbMisu,
      }));
    }
  };

  const addRow = () => {
    if (data65 !== undefined) {
      setData65((prev: any) => [
        ...prev,
        {
          bblBpCode: null,
          bblBpName: null,
          bblType: null,
          bblQty: null,
          bblDanga: null,
          bblVatType: null,
          bblKumack: null,
          isNew: true,
        },
      ]);
      setRowIndex(null);
    }
  };

  const deleteRow = () => {
    if (rowIndex !== null) {
      data65.map((obj: any, idx: number) => {
        if (!("isNew" in obj) && idx === rowIndex) {
          setDeleteData65((prev) => [...prev, obj]);
        }
      });
      setData65((prev: any) =>
        prev.filter((obj: any, idx: number) => idx !== rowIndex)
      );
      setRowIndex(null);
    } else {
      toast.warning(`please select a row.`, {
        autoClose: 500,
      });
    }
  };

  const fetchData65 = async () => {
    const data = await apiGet(GR130065, {
      areaCode: selected?.areaCode,
      bbBuCode: selected?.bbBuCode,
      bbDate: DateWithoutDash(selected?.bbDate),
      bbSno: selected?.bbSno,
    });

    if (data) {
      setData65(data);
      data65Orig = JSON.parse(JSON.stringify(data));
    } else {
      setData65({});
      data65Orig = {};
    }
    setDeleteData65([]);
  };

  // const clear = () => {
  //   reset({
  //     areaCode: areaCode2,
  //     // bbDate: formatDateToString(new Date()),
  //     // bbDate: DateWithDash(new Date()),
  //     bbBuCode: dataCommonDic?.bbBuCode[0].code,
  //     bbSno: "",
  //   });
  //   document.getElementById("bbSno")?.focus();
  //   setData65([
  //     {
  //       bblBpCode: "",
  //       bblBpName: "",
  //       bblType: "",
  //       bblQty: "",
  //       bblDanga: "",
  //       bblVatType: "",
  //       bblKumack: "",
  //       isNew: true,
  //     },
  //   ]);
  // };

  const resetForm = async (type: string) => {
    if (type === "clear") {
    }
    if (type === "reset") {
    }
  };

  const crud = async (type: string | null) => {
    if (type === "delete") {
      if (selected) {
        const res: any = await apiPost(
          GR1300BUYDELETE,
          {
            areaCode: selected.areaCode,
            bbBuCode: selected.bbBuCode,
            // bbDate: formatDateByRemoveDash(selected.bbDate),
            bbDate: DateWithoutDash(selected.bbDate),
            bbSno: selected.bbSno,
          },
          "삭제하였습니다"
        );

        res && fetchData();
      }
    }

    if (type === null) {
      handleSubmit(submit)();
    }
  };

  const submit = async (data: any) => {
    const formValues = getValues();

    // formValues.bbDate =
    //   typeof formValues.bbDate === "string"
    //     ? formatDateByRemoveDash(formValues.bbDate)
    //     : formatDateToStringWithoutDash(formValues.bbDate);
    formValues.bbDate = DateWithoutDash(formValues.bbDate);

    let path: string;

    if (isAddBtnClicked) {
      path = GR1300BUYINSERT;
    } else {
      path = GR1300BUYUPDATE;
    }

    try {
      const res: any = await apiPost(path, {
        ...formValues,
        bbType: tabId,
      });

      if (res) {
        const bbSno = res?.returnValue;
        if (isAddBtnClicked) {
          if (bbSno && bbSno !== "" && data65?.length > 0) {
            await Promise.all(
              data65.map((item: any) => {
                if ("isEdited" in item && "isProductNameSelected" in item) {
                  apiPost(GR1300BLINSERT, {
                    inserted: [
                      {
                        ...item,
                        areaCode: areaCode2,
                        bbBuCode: formValues.bbBuCode,
                        bbDate: formValues.bbDate,
                        bbSno: bbSno,
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
          if (data65?.length > 0) {
            await Promise.all(
              data65.map((item: any) => {
                //insert
                if (
                  "isNew" in item &&
                  "isEdited" in item &&
                  "isProductNameSelected" in item
                ) {
                  apiPost(GR1300BLINSERT, {
                    inserted: [
                      {
                        ...item,
                        areaCode: selected.areaCode,
                        bbBuCode: selected.bbBuCode,
                        bbDate: formValues.bbDate,
                        bbSno: selected.bbSno,
                      },
                    ],
                  });
                }
                //update
                if (
                  !("isNew" in item) &&
                  ("isEdited" in item || "isProductNameSelected" in item)
                ) {
                  apiPost(GR1300BLUPDATE, {
                    updated: [
                      {
                        ...item,
                        areaCode: selected.areaCode,
                        bbBuCode: selected.bbBuCode,
                        bbDate: formValues.bbDate,
                        bbSno: selected.bbSno,
                      },
                    ],
                  });
                }
              })
            );
          }
          if (deleteData65?.length > 0) {
            await Promise.all(
              deleteData65.map((item: any) => {
                //delete
                apiPost(GR1300BLDELETE, {
                  deleted: [
                    {
                      ...item,
                      areaCode: selected.areaCode,
                      bbBuCode: selected.bbBuCode,
                      bbDate: formValues.bbDate,
                      bbSno: selected.bbSno,
                    },
                  ],
                });
              })
            );
          }
        }
        fetchData();
        //     //fetchData65();
        setRowIndex(null);
        setDeleteData65([]);
      }
    } catch (err) {}
  };

  const onClickAdd = () => {
    setIsAddBtnClicked(true);
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
    if (Object.keys(selected)?.length > 0) {
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
            borderBottom: "1px solid #707070",
          }}
        >
          <FormGroup>
            <PersonInfoText text="매입전표 등록" />
            <p className="big">영업소99</p>
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
          {/* <FormGroup>
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
                setData65(data65Orig);
                reset(selected);
                setRowIndex(null);
              }}
              color={ButtonColor.LIGHT}
            />
          </FormGroup> */}
        </SearchWrapper>
        <Wrapper>
          <FormGroup>
            <Label>입고 일자</Label>
            <Controller
              control={control}
              name="bbDate"
              render={({ field }) => (
                <CustomDatePicker {...field} readOnly={!isAddBtnClicked} />
              )}
            />
          </FormGroup>
        </Wrapper>
        <Wrapper>
          <FormGroup>
            <Label>매입처</Label>
            <Select
              register={register("bbBuCode")}
              width={InputSize.i120}
              disabled={!isAddBtnClicked}
            >
              {dataCommonDic?.bbBuCode?.map((obj: any, idx: number) => (
                <option key={idx} value={obj.code}>
                  {obj.codeName}
                </option>
              ))}
            </Select>
          </FormGroup>
          <Input
            label="매입 회차"
            register={register("bbSno")}
            inputSize={InputSize.i70}
            readOnly={!isAddBtnClicked}
          />
        </Wrapper>

        <div style={{ display: "flex", marginTop: "10px" }}>
          <PlainTab
            tabHeader={["부품 매입", "용기매입(공병)"]}
            onClick={(id) => {
              isAddBtnClicked
                ? setTabId(id)
                : setTabId(parseInt(selected?.bbType));
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
            data={data65}
            setData={setData65}
            data2={selected}
            tabId={tabId ? tabId : 0}
            setRowIndex={setRowIndex}
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
