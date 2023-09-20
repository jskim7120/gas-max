import React, { useEffect, useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { apiGet } from "app/axios";
import {
  AR1100SEARCH,
  AR1100SELECT,
  AR1100INIT,
  AR1100SELECT41,
  AR1100SELECT51,
  AR1100SELECT61,
} from "app/path";
import { useDispatch, useSelector } from "app/store";
import useModal from "app/hook/useModal";
import useRowIndex from "app/hook/useRowIndex";
import useGetData from "app/hook/getSimpleData";
import { addSource, removeSearchText } from "app/state/footer/footerSlice";
import { addCM1106 } from "app/state/modal/modalSlice";
import {
  Plus,
  Trash,
  Reset,
  MagnifyingGlassBig,
  ExcelIcon,
} from "components/allSvgIcon";
import Button from "components/button/button";
import { ButtonColor, InputSize } from "components/componentsType";
import { Select, Label, FormGroup, Input } from "components/form/style";
import CustomDatePicker from "components/customDatePicker";
import Loader from "components/loader";
import CheckBox from "components/checkbox";
import PlainTab from "components/plainTab";
import { TabContentWrapper } from "components/plainTab/style";
import { WrapperContent, SearchWrapper } from "../../commonStyle";
import { DateWithoutDash } from "helpers/dateFormat";
import { fields, columns } from "./data";
import { IAR1100SEARCH, emtObj } from "./model";
import { emtObjTab1 } from "./tabs/tab1/model";
import getTabContent from "./getTabContent";
import Grid from "./grid";

let currentDate;
let dateWithTime: string;
let dateOnly: string;

function AR1100({
  depthFullName,
  menuId,
  ownAreaCode,
}: {
  depthFullName: string;
  menuId: string;
  ownAreaCode: string;
}) {
  const { data, setData, loading, dataCommonDic, setLoading } = useGetData(
    "AR",
    "AR1100",
    AR1100SEARCH
  );
  const { info, source } = useSelector((state: any) => state.footer);

  const dispatch = useDispatch();
  const tabRef1 = useRef() as React.MutableRefObject<any>;
  const tabRef2 = useRef() as React.MutableRefObject<any>;
  const tabRef3 = useRef() as React.MutableRefObject<any>;
  const btnRef1 = useRef() as React.MutableRefObject<HTMLButtonElement>;

  const [selected, setSelected] = useState<any>({});
  const [data65, setData65] = useState({});
  const [dataDictionary, setDataDictionary] = useState({});
  const [tabId, setTabId] = useState<number>(0);
  const [isAddBtnClicked, setIsAddBtnClicked] = useState<boolean>(false);
  const [toggler, setToggler] = useState<boolean>(false);
  const [jpKind, setJpKind] = useState();

  const { getRowIndex, setRowIndex } = useRowIndex();
  const { showCM1105Modal, openModal: openCM1105Modal } = useModal();
  const {
    showCustomerModal,
    closeModal: closeCustomerModal,
    openModal: openCustomerModal,
  } = useModal();

  const { register, handleSubmit, reset, control, getValues } =
    useForm<IAR1100SEARCH>({
      mode: "onSubmit",
    });

  let rowIndex = getRowIndex(menuId, 0);

  useEffect(() => {
    if (dataCommonDic && dataCommonDic?.dataInit) {
      resetSearchForm("reset");
      fetchData(prepareParamsInit(), "last");
    }
  }, [dataCommonDic]);

  useEffect(() => {
    if (selected && Object.keys(selected)?.length > 0) {
      setData((prevState) =>
        prevState.filter((item) => {
          if ("isNew" in item) {
            return false;
          }
          return true;
        })
      );

      if (selected?.pjType && Number(selected?.pjType) !== tabId) {
        setTabId(Number(selected?.pjType));
      }

      if (selected?.pjDate && selected?.areaCode) {
        addBtnUnClick();
        fetchData65({
          areaCode: selected?.areaCode,
          pjCuCode: selected?.cuCode,
          pjDate: DateWithoutDash(selected?.pjDate),
          pjSno: selected?.pjSno,
          pjType: selected?.pjType,
        });
      }
    }
  }, [selected]);

  useEffect(() => {
    if (source === menuId) {
      if (info) {
        addCodeAndNameToLastRow(info);
        if (info?.cuType === "0") {
          tabId !== 0 ? setTabId(0) : setToggler((prev) => !prev);
        } else {
          tabId !== 1 ? setTabId(1) : setToggler((prev) => !prev);
        }
      }
    }
  }, [info]);

  useEffect(() => {
    if (isAddBtnClicked === true && tabId !== undefined) {
      onTabChangeonAdd();
    }
  }, [tabId, toggler]);

  const onTabChangeonAdd = async () => {
    if (tabId === 0) {
      const res: any = await fetchData41({
        areaCode: info?.areaCode,
        cuCode: info?.cuCode,
        saleType: 5,
      });

      if (res && Object.keys(res)?.length > 0) {
        setDataDictionary({
          pjVatDiv: res?.pjVatDiv,
          pjSwCode: res?.pjSwCode,
          proxyType: res?.proxyType,
          pjInkumtype: res?.pjInkumtype,
          saleState: res?.saleState,
          pabcCode: res?.pabcCode,
        });
        if (res?.detailData) {
          setData65(res?.detailData[0]);
          tabRef1.current.reset({ ...res?.detailData[0], pjDate: new Date() });
          tabRef1.current.setPjQty(res?.detailData[0]?.pjQty);
        } else if (res?.initData) {
          setData65(res?.initData[0]);
          tabRef1.current.reset({ ...res?.initData[0] });
          tabRef1.current.setPjQty(res?.initData[0]?.pjQty);
        }
      }
    } else if (tabId === 1) {
      const res: any = await fetchData51({
        areaCode: info?.areaCode,
        cuCode: info?.cuCode,
        saleType: 5,
      });

      if (res && Object.keys(res)?.length > 0) {
        setDataDictionary({
          proxyType: res?.proxyType,
          saleState: res?.saleState,
          pcSwCode: res?.pcSwCode,
        });
        if (res?.detailData) {
          setData65(res?.detailData[0]);
          tabRef2.current.reset({ ...res?.detailData[0], pcDate: new Date() });
          tabRef2.current.setPcQty(res?.detailData[0]?.pcQty);
        } else if (res?.initData) {
          setData65(res?.initData[0]);
          tabRef2.current.reset({ ...res?.initData[0] });
          tabRef2.current.setPcQty(res?.initData[0]?.pcQty);
        }
      }
    } else if (tabId === 2) {
      const res: any = await fetchData61({
        areaCode: info?.areaCode,
        cuCode: info?.cuCode,
        saleType: 5,
      });
      if (res && Object.keys(res)?.length > 0) {
        console.log("tab3>>>", res);
        setDataDictionary({
          abcCode: res?.abcCode,
          saleState: res?.saleState,
          tsGubun: res?.tsGubun,
          tsInkumType: res?.tsInkumType,
          tsSwCode: res?.tsSwCode,
          tsTongGubun: res?.tsTongGubun,
          tsVatDiv: res?.tsVatDiv,
        });
        if (res?.detailData) {
          setData65(res?.detailData[0]);
          tabRef3.current.reset({ ...res?.detailData[0], tsDate: new Date() });
        } else if (res?.initData) {
          setData65(res?.initData[0]);
          tabRef3.current.reset({ ...res?.initData[0] });
        }
      }
    }
  };

  // const onTabChangeOnAdd = () => {
  //dispatch(addSource({ source: menuId + tabId.toString() }));
  //dispatch(addSource({ source: menuId }));
  // dispatch(
  //   addCM1106({
  //     source: menuId + tabId.toString(),
  //     jpName: "",
  //     jpCode: "",
  //     custIn: 0,
  //     custOut: 0,
  //     jcBasicJaego: 0,
  //     jcJpDanga: 0,
  //   })
  // );
  // fetchData11({ areaCode: getValues("areaCode"), pjType: tabId });
  // };

  const addCodeAndNameToLastRow = (info: any) => {
    if (data?.length > 0) {
      if ("isNew" in data[data?.length - 1]) {
        setData((prev: any) =>
          prev.map((object: any, idx: number) => {
            if (idx === data?.length - 1) {
              return {
                ...object,
                cuName: info?.cuName,
                cuCode: info?.cuCode,
              };
            } else return object;
          })
        );
      }
    }
  };

  const addEmptyRow = () => {
    currentDate = new Date();
    dateOnly =
      currentDate.getFullYear() +
      "-" +
      (currentDate.getMonth() + 1 < 10
        ? "0" + (currentDate.getMonth() + 1)
        : currentDate.getMonth() + 1) +
      "-" +
      (currentDate.getDate() < 10
        ? "0" + currentDate.getDate()
        : currentDate.getDate());
    dateWithTime =
      dateOnly +
      " " +
      (currentDate.getHours() < 10
        ? "0" + currentDate.getHours()
        : currentDate.getHours()) +
      ":" +
      (currentDate.getMinutes() < 10
        ? "0" + currentDate.getMinutes()
        : currentDate.getMinutes());

    const obj = {
      orderDate: dateWithTime,
      salestateName: "완료",
      pjDate: dateOnly,
      isNew: true,
    };

    if (data?.length > 0) {
      if ("isNew" in data[data?.length - 1]) {
        setRowIndex(menuId, 0, data?.length - 1);
        setData((prev: any) =>
          prev.map((object: any, idx: number) => {
            if (idx === data?.length - 1) {
              return { ...emtObj, ...obj };
            } else return object;
          })
        );
      } else {
        setRowIndex(menuId, 0, data?.length);
        setData((prev) => [...prev, { ...emtObj, ...obj }]);
      }
    } else {
      setRowIndex(menuId, 0, 0);
      setData((prev) => [...prev, { ...emtObj, ...obj }]);
    }
  };

  const prepareParamsInit = () => {
    const init = dataCommonDic.dataInit[0];
    return {
      ...init,
      areaCode: dataCommonDic.areaCode[0]?.code,
      sDate: DateWithoutDash(init.sDate),
      dDate: DateWithoutDash(init.dDate),
      sCustomer: "",
    };
  };

  const resetSearchForm = (type: string) => {
    if (type === "reset") {
      reset({
        ...prepareParamsInit(),
        ...getCheckboxVal(
          dataCommonDic.dataInit[0].sSalestate,
          dataCommonDic.dataInit[0].sSalegubun
        ),
      });
    }
  };

  const getCheckboxVal = (salestate: string, salegubun: string) => {
    return {
      sSalestate0: salestate?.charAt(0) === "Y",
      sSalestate1: salestate?.charAt(1) === "Y",
      sSalestate2: salestate?.charAt(2) === "Y",
      sSalestate3: salestate?.charAt(3) === "Y",
      sSalestate4: salestate?.charAt(4) === "Y",
      sSalestate5: salestate?.charAt(5) === "Y",
      sSalestate6: salestate?.charAt(6) === "Y",

      sSalegubun0: salegubun?.charAt(0) === "Y",
      sSalegubun1: salegubun?.charAt(1) === "Y",
      sSalegubun2: salegubun?.charAt(2) === "Y",
      sSalegubun3: salegubun?.charAt(3) === "Y",
      sSalegubun4: salegubun?.charAt(4) === "Y",
      sSalegubun5: salegubun?.charAt(5) === "Y",
    };
  };

  const prepareParamsForSearch = (params: any) => {
    params.sDate = DateWithoutDash(params.sDate);
    params.dDate = DateWithoutDash(params.dDate);
    params.sSalegubun =
      (params.sSalegubun0 ? "Y" : "N") +
      (params.sSalegubun1 ? "Y" : "N") +
      (params.sSalegubun2 ? "Y" : "N") +
      (params.sSalegubun3 ? "Y" : "N") +
      (params.sSalegubun4 ? "Y" : "N") +
      (params.sSalegubun5 ? "Y" : "N");
    params.sSalestate =
      (params.sSalestate0 ? "Y" : "N") +
      (params.sSalestate1 ? "Y" : "N") +
      (params.sSalestate2 ? "Y" : "N") +
      (params.sSalestate3 ? "Y" : "N") +
      (params.sSalestate4 ? "Y" : "N") +
      (params.sSalestate5 ? "Y" : "N") +
      (params.sSalestate6 ? "Y" : "N");

    delete params.sSalegubun0;
    delete params.sSalegubun1;
    delete params.sSalegubun2;
    delete params.sSalegubun3;
    delete params.sSalegubun4;
    delete params.sSalegubun5;

    delete params.sSalestate0;
    delete params.sSalestate1;
    delete params.sSalestate2;
    delete params.sSalestate3;
    delete params.sSalestate4;
    delete params.sSalestate5;
    delete params.sSalestate6;
  };

  const fetchData = async (params: any, pos: string = "") => {
    setLoading(true);
    const dataS = await apiGet(AR1100SEARCH, params);

    if (dataS && dataS?.length > 0) {
      setData(dataS);
      const lastIndex = dataS && dataS?.length > 1 ? dataS.length - 1 : 0;

      if (pos === "last") {
        setSelected(dataS[lastIndex]);
        setRowIndex(menuId, 0, lastIndex);
      } else {
        if (rowIndex) {
          if (rowIndex > lastIndex) {
            setRowIndex(menuId, 0, lastIndex);
            setSelected(dataS[lastIndex]);
          } else {
            setSelected(dataS[rowIndex]);
          }
        }
      }
    } else {
      setData([]);
      setSelected({});
      tabId !== 0 && setTabId(0);
      tabRef1?.current?.setPjQty(0);
      tabRef1?.current?.setPjJago(0);
      tabRef1?.current?.reset({ ...emtObjTab1 });
    }
    setLoading(false);
  };

  const fetchData65 = async (params: any) => {
    const res = await apiGet(AR1100SELECT, params);

    if (res && Object.keys(res)?.length > 0) {
      if (res?.detailData && res?.detailData?.length > 0) {
        setJpKind(res?.detailData[0]?.jpKind);
        setData65(res?.detailData[0]);
      }
      if (selected?.pjType === "0") {
        setDataDictionary({
          pjVatDiv: res?.pjVatDiv,
          pjSwCode: res?.pjSwCode,
          proxyType: res?.proxyType,
          pjInkumtype: res?.pjInkumtype,
          saleState: res?.saleState,
          pabcCode: res?.pabcCode,
        });
        if (res?.detailData && res?.detailData?.length > 0) {
          tabRef1.current.reset(res?.detailData[0]);
          tabRef1.current.setPjQty(res?.detailData[0]?.pjQty);
        }
      }
      if (selected?.pjType === "1") {
        setDataDictionary({
          proxyType: res?.proxyType,
          saleState: res?.saleState,
          pcSwCode: res?.pcSwCode,
        });
        if (res?.detailData && res?.detailData?.length > 0) {
          tabRef2.current.reset(res?.detailData[0]);
          tabRef2.current.setPcQty(res?.detailData[0]?.pcQty);
        }
      }
      if (selected?.pjType === "2") {
        setDataDictionary({
          tsAbcCode: res?.tsAbcCode,
          tsGubun: res?.tsGubun,
          tsInkumtype: res?.tsInkumtype,
          tsSaleState: res?.tsSaleState,
          tsSwCode: res?.tsSwCode,
          tsTonggubun: res?.tsTonggubun,
          tsVatDiv: res?.tsVatDiv,
        });
        if (res?.detailData && res?.detailData?.length > 0) {
          tabRef3.current.reset(res?.detailData[0]);
        }
      }
    } else {
      setData65({});
      setDataDictionary({});
    }
  };

  const fetchData11 = async (params: any) => {
    const res = await apiGet(AR1100INIT, params);

    if (res && Object.keys(res)?.length > 0) {
      if (tabId === 0) {
        setDataDictionary({
          pjInkumtype: res?.pjInkumtype,
          pjSwCode: res?.pjSwCode,
          pjVatDiv: res?.pjVatDiv,
          proxyType: res?.proxyType,
          saleState: res?.saleState,
        });
        if (res?.initData && res?.initData?.length > 0) {
          tabRef1?.current?.reset({ ...res.initData[0] });
          tabRef1?.current?.setPjQty(res.initData[0]?.pjQty);
        }
      } else if (tabId === 1) {
        setDataDictionary({
          proxyType: res?.proxyType,
          saleState: res?.saleState,
          pcSwCode: res?.pcSwCode,
        });
        if (res?.initData && res?.initData?.length > 0) {
          tabRef2?.current?.reset({ ...res.initData[0] });
          tabRef2.current?.setPcQty(res.initData[0]?.pcQty);
        }
      } else if (tabId === 2) {
        setDataDictionary({
          abcCode: res?.abcCode,
          tsGubun: res?.tsGubun,
          tsInkumType: res?.tsInkumType,
          saleState: res?.saleState,
          tsSwCode: res?.tsSwCode,
          tsTongGubun: res?.tsTongGubun,
          tsVatDiv: res?.tsVatDiv,
        });
        if (res?.initData && res?.initData?.length > 0) {
          tabRef3?.current?.reset({ ...res.initData[0] });
        }
      }
    }
  };

  const fetchData41 = async (params: any) => {
    const res = await apiGet(AR1100SELECT41, params);
    return res;
  };

  const fetchData51 = async (params: any) => {
    const res = await apiGet(AR1100SELECT51, params);
    return res;
  };

  const fetchData61 = async (params: any) => {
    const res = await apiGet(AR1100SELECT61, params);
    return res;
  };

  const addBtnClick = () => {
    if (!isAddBtnClicked) {
      btnRef1.current.classList.add("active");
      setIsAddBtnClicked(true);
    }
  };

  const addBtnUnClick = () => {
    if (isAddBtnClicked) {
      btnRef1.current.classList.remove("active");
      setIsAddBtnClicked(false);
    }
  };

  const submit = async (d: any, pos: string = "") => {
    addBtnUnClick();
    // isInfoSelected && setIsInfoSelected(false);
    const params = getValues();
    prepareParamsForSearch(params);
    fetchData(params, pos);
  };

  const handleClickBtnAdd = () => {
    dispatch(addSource({ source: menuId }));
    dispatch(removeSearchText({}));
    //fetchData11({ areaCode: getValues("areaCode"), pjType: tabId });
    addBtnClick();
    addEmptyRow();
    openCustomerModal();
  };

  const handleClickBtnDel = () => {
    addBtnUnClick();
    tabRef1.current.crud("delete");
  };

  const handleReset = () => {
    resetSearchForm("reset");
    handleSubmit((d) => submit(d, "last"))();
  };

  const onCloseModal = () => {
    closeCustomerModal();
    openCM1105Modal();
  };

  return (
    <>
      {showCustomerModal({ onClose: onCloseModal })}
      {showCM1105Modal()}
      <SearchWrapper className="h35">
        <FormGroup>
          {ownAreaCode === "00" && (
            <>
              <Label style={{ minWidth: "90px" }}>영업소</Label>
              <Select register={register("areaCode")}>
                {dataCommonDic?.areaCode?.map((obj: any, idx: number) => (
                  <option key={idx} value={obj.code}>
                    {obj.codeName}
                  </option>
                ))}
              </Select>
            </>
          )}
          <div className="buttons ml30">
            <Button
              text="등록"
              icon={<Plus />}
              onClick={handleClickBtnAdd}
              ref={btnRef1}
            />
            <Button
              text="삭제"
              icon={<Trash />}
              onClick={handleClickBtnDel}
              disabled={data?.length === 0 || isAddBtnClicked}
            />
            <Button text="취소" icon={<Reset />} onClick={handleReset} />
          </div>
        </FormGroup>
        <p>{depthFullName}</p>
      </SearchWrapper>
      <WrapperContent>
        <form
          onSubmit={handleSubmit((data) => submit(data, "last"))}
          autoComplete="off"
        >
          <SearchWrapper>
            <div className="buttons" style={{ gap: 0 }}>
              <div>
                <FormGroup>
                  <Label style={{ minWidth: "90px" }}>거래기간</Label>
                  <Controller
                    control={control}
                    name="sDate"
                    render={({ field }) => <CustomDatePicker {...field} />}
                  />
                  <p>~</p>
                  <Controller
                    control={control}
                    name="dDate"
                    render={({ field }) => <CustomDatePicker {...field} />}
                  />
                  <Input
                    register={register("sCustomer")}
                    inputSize={InputSize.i200}
                  />

                  <Label style={{ minWidth: "202px" }}>사원</Label>
                  <Select register={register("sSawon")} width={InputSize.i100}>
                    {dataCommonDic?.sSawon?.map((obj: any, idx: number) => (
                      <option key={idx} value={obj.code}>
                        {obj.codeName}
                      </option>
                    ))}
                  </Select>

                  <Label style={{ minWidth: "80px" }}>입금 구분</Label>
                  <Select
                    register={register("sInkumtype")}
                    width={InputSize.i100}
                  >
                    {dataCommonDic?.sInkumtype?.map((obj: any, idx: number) => (
                      <option key={idx} value={obj.code}>
                        {obj.codeName}
                      </option>
                    ))}
                  </Select>

                  <Label style={{ minWidth: "80px" }}>대납 구분</Label>
                  <Select
                    register={register("sProxytype")}
                    width={InputSize.i100}
                  >
                    {dataCommonDic?.sProxytype?.map((obj: any, idx: number) => (
                      <option key={idx} value={obj.code}>
                        {obj.codeName}
                      </option>
                    ))}
                  </Select>

                  <Label style={{ minWidth: "80px" }}>등록 구분</Label>
                  <Select
                    register={register("sInserttype")}
                    width={InputSize.i100}
                  >
                    {dataCommonDic?.sInserttype?.map(
                      (obj: any, idx: number) => (
                        <option key={idx} value={obj.code}>
                          {obj.codeName}
                        </option>
                      )
                    )}
                  </Select>
                </FormGroup>
                <FormGroup>
                  <Label style={{ minWidth: "90px", marginRight: "3px" }}>
                    거래 상태
                  </Label>
                  <FormGroup
                    style={{
                      border: "1px solid #c4c4c4",
                      borderRadius: "5px",
                      padding: "0px 0 1px 10px",
                    }}
                  >
                    <CheckBox
                      register={register("sSalestate0")}
                      title="접수"
                      rtl
                      style={{ width: "80px" }}
                    />
                    <CheckBox
                      register={register("sSalestate1")}
                      title="요청"
                      rtl
                      style={{ width: "80px" }}
                    />
                    <CheckBox
                      register={register("sSalestate2")}
                      title="배송중"
                      rtl
                      style={{ width: "80px" }}
                    />
                    <CheckBox
                      register={register("sSalestate3")}
                      title="완료"
                      rtl
                      style={{ width: "80px" }}
                    />
                    <CheckBox
                      register={register("sSalestate4")}
                      title="예약"
                      rtl
                      style={{ width: "80px" }}
                    />
                    <CheckBox
                      register={register("sSalestate5")}
                      title="연기"
                      rtl
                      style={{ width: "80px" }}
                    />
                    <CheckBox
                      register={register("sSalestate6")}
                      title="취소"
                      rtl
                      style={{ width: "65px" }}
                    />
                  </FormGroup>

                  <Label style={{ minWidth: "100px", marginRight: "3px" }}>
                    거래 구분
                  </Label>
                  <FormGroup
                    style={{
                      border: "1px solid #c4c4c4",
                      borderRadius: "5px",
                      padding: "0px 0 1px 10px",
                    }}
                  >
                    <CheckBox
                      register={register("sSalegubun0")}
                      title="중량"
                      rtl
                      style={{ width: "90px" }}
                    />
                    <CheckBox
                      register={register("sSalegubun1")}
                      title="체적"
                      rtl
                      style={{ width: "90px" }}
                    />
                    <CheckBox
                      register={register("sSalegubun2")}
                      title="용기"
                      rtl
                      style={{ width: "90px" }}
                    />
                    <CheckBox
                      register={register("sSalegubun3")}
                      title="부품/시설"
                      rtl
                      style={{ width: "100px" }}
                    />
                    <CheckBox
                      register={register("sSalegubun4")}
                      title="A/S"
                      rtl
                      style={{ width: "90px" }}
                    />
                    <CheckBox
                      register={register("sSalegubun5")}
                      title="수금"
                      rtl
                      style={{ width: "65px" }}
                    />
                  </FormGroup>
                </FormGroup>
              </div>
              <div className="buttons ml30">
                <Button
                  text="검색"
                  icon={!loading && <MagnifyingGlassBig width="15" />}
                  color={ButtonColor.DANGER}
                  type="submit"
                  loader={
                    loading && (
                      <Loader size={16} style={{ marginRight: "12px" }} />
                    )
                  }
                />
              </div>
            </div>
            <div className="buttons">
              <Button
                text="엑셀"
                icon={<ExcelIcon />}
                color={ButtonColor.LIGHT}
                type="button"
                //onClick={() => gridRef.current.saveToExcel()}
              />
            </div>
          </SearchWrapper>
        </form>
        <Grid
          areaCode={ownAreaCode}
          data={data}
          fields={fields}
          columns={columns}
          setSelected={setSelected}
          menuId={menuId}
          rowIndex={rowIndex}
          style={{
            height: `calc(100% - 282px)`,
            borderBottom: "1px solid rgb(188,185,185)",
            marginBottom: "3px",
          }}
          // openModal={openCustomerModal}
        />
        <PlainTab
          tabHeader={[
            "중량 판매",
            "체적 공급",
            "용기 입출",
            "부품 판매",
            "시설 판매",
            "A/S",
            "수금",
          ]}
          onClick={(id) => (isAddBtnClicked ? setTabId(id) : null)}
          tabId={tabId}
        />

        <TabContentWrapper
          style={{
            minHeight: "170px",
            borderBottom: "none",
            borderRight: "none",
            borderLeft: "none",
          }}
        >
          {getTabContent(
            tabId,
            data,
            setData,
            data65,
            selected,
            dataDictionary,
            isAddBtnClicked,
            getValues("areaCode"),
            handleSubmit,
            submit,
            menuId,
            tabRef1,
            tabRef2,
            tabRef3,
            addBtnUnClick,
            jpKind,
            setJpKind
          )}
        </TabContentWrapper>
      </WrapperContent>
    </>
  );
}

export default AR1100;
