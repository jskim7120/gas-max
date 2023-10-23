import React, { useEffect, useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { apiGet, apiPost } from "app/axios";
import {
  AR1100SEARCH,
  AR1100SELECT,
  AR1100SELECT41,
  AR1100SELECT51,
  AR1100SELECT61,
  AR1100SELECT71,
  AR1100STATE,
  AR1100DELETE,
  AR1100CJSALEDELETE,
  AR1100TONGSALEDELETE,
  AR1100BPSALEDELETE,
} from "app/path";
import { useDispatch, useSelector } from "app/store";
import { fetchFooterData } from "container/contents/footer/footerDetailFunc";
import useModal from "app/hook/useModal";
import useRowIndex from "app/hook/useRowIndex";
import useGetData from "app/hook/getSimpleData";
import {
  addAR1100Tab4Multiple,
  addBupum,
  addCM1105,
  addDeleteMenuId,
  setIsDelete,
} from "app/state/modal/modalSlice";
import {
  addSource,
  removeSearchText,
  addInfo,
} from "app/state/footer/footerSlice";
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
import {
  DateWithoutDash,
  dateToTimestamp,
  getPreviousMonthDate,
} from "helpers/dateFormat";
import { fields, columns } from "./data";
import { IAR1100SEARCH, emtObj } from "./model";
import { emtObjTab1 } from "./tabs/tab1/model";
import { emtObjTab2 } from "./tabs/tab2/model";
import { emtObjTab3 } from "./tabs/tab3/model";
import { emtObjTab4 } from "./tabs/tab4/model";
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
  const { delete: deleteState } = useSelector((state) => state.modal);

  const dispatch = useDispatch();
  const tabRef1 = useRef() as React.MutableRefObject<any>;
  const tabRef2 = useRef() as React.MutableRefObject<any>;
  const tabRef3 = useRef() as React.MutableRefObject<any>;
  const tabRef4 = useRef() as React.MutableRefObject<any>;
  const tabRef5 = useRef() as React.MutableRefObject<any>;
  const btnRef1 = useRef() as React.MutableRefObject<HTMLButtonElement>;

  const [selected, setSelected] = useState<number>(-1);
  const [data65, setData65] = useState({});
  const [dataDictionary, setDataDictionary] = useState({});
  const [tabId, setTabId] = useState<number>(0);
  const [isAddBtnClicked, setIsAddBtnClicked] = useState<boolean>(false);
  const [toggler, setToggler] = useState<boolean>(false);
  const [jpKind, setJpKind] = useState();

  const [junJaego, setJunJaego] = useState<number>(0);
  const [qty, setQty] = useState<number>(0);
  const [reqty, setReqty] = useState<number>(0);
  const [danga, setDanga] = useState<number>(0);
  const [inkum, setInkum] = useState<number>(0);
  const [dc, setDc] = useState<number>(0);
  const [vatDiv, setVatDiv] = useState<string>("0");
  const [gubun, setGubun] = useState<string>("0");
  const [kumSup, setKumSup] = useState<number>(0);
  const [kumVat, setKumVat] = useState<number>(0);
  const [kumack, setKumack] = useState<number>(0);
  const [misu, setMisu] = useState<number>(0);

  const { getRowIndex, setRowIndex } = useRowIndex();
  const { showCM1105Modal, openModal: openCM1105Modal } = useModal();
  const {
    showCustomerModal,
    closeModal: closeCustomerModal,
    openModal: openCustomerModal,
  } = useModal();
  const {
    showDeleteModal,
    closeModal: closeDeleteModal,
    openModal: openDeleteModal,
  } = useModal();

  let rowIndex = getRowIndex(menuId, 0);

  const { register, handleSubmit, reset, control, getValues } =
    useForm<IAR1100SEARCH>({
      mode: "onSubmit",
    });

  useEffect(() => {
    if (dataCommonDic && dataCommonDic?.dataInit) {
      resetSearchForm("reset");
      fetchData(prepareParamsInit(), "last");
    }
  }, [dataCommonDic]);

  useEffect(() => {
    if (selected !== undefined && selected > -1) {
      if (isAddBtnClicked === true) {
        removeEmptyRow();
        addBtnUnClick();
      }
      if (data[selected]?.pjType) {
        const pjType = data[selected]?.pjType;
        if (pjType === "3" || pjType === "4") {
          setTabId(3);
        } else {
          setTabId(Number(pjType));
        }
      }
      if (data[selected]?.areaCode && data[selected]?.cuCode) {
        getFooterData(data[selected]?.areaCode, data[selected]?.cuCode);
      }
      if (data[selected]?.pjDate && data[selected]?.areaCode) {
        fetchData65({
          areaCode: data[selected]?.areaCode,
          pjCuCode: data[selected]?.cuCode,
          pjDate: DateWithoutDash(data[selected]?.pjDate),
          pjSno: data[selected]?.pjSno,
          pjType: data[selected]?.pjType,
        });
      }
    }
  }, [selected]);

  useEffect(() => {
    if (source === menuId && isAddBtnClicked === true && info !== undefined) {
      if (Object.keys(info)?.length === 0) {
        removeEmptyRow();
        addBtnUnClick();
      } else {
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

  useEffect(() => {
    if (deleteState.menuId === menuId && deleteState.isDelete) {
      deleteRowGrid();
    }
  }, [deleteState.isDelete]);

  const getFooterData = async (areaCode: string, cuCode: string) => {
    const res = await fetchFooterData(areaCode, cuCode);
    dispatch(addInfo({ info: res }));
  };

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
          pacbCode: res?.pacbCode,
        });
        let ddat: any;

        if (res?.detailData) {
          ddat = res?.detailData[0];
          tabRef1?.current?.reset({ ...ddat, pjDate: new Date() });
        } else if (res?.initData) {
          ddat = res?.initData[0];
          tabRef1?.current?.reset({ ...ddat });
        }

        setData65(ddat);
        setJunJaego(ddat?.junJaego ? ddat?.junJaego : 0); // ene irehgui bgaa
        setQty(ddat?.pjQty);
        setReqty(ddat?.pjReqty);
        setDanga(ddat?.pjDanga);
        setVatDiv(ddat?.pjVatDiv);
        setInkum(ddat?.pjInkum);
        setDc(ddat?.pjDc);

        if (res?.detailData) {
          document.getElementById("pjQty")?.focus();
        } else if (res?.initData) {
          document.getElementById("pjJpCode")?.focus();
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
          proxyType: res?.cproxyType,
          saleState: res?.csaleState,
          pcSwCode: res?.pcSwCode,
        });

        let ddat: any;
        if (res?.detailData) {
          ddat = res?.detailData[0];
          let tempJaego =
            (ddat?.junJaego ? ddat?.junJaego : 0) +
            (ddat?.pcQty ? ddat?.pcQty : 0) -
            (ddat?.pcReqty ? ddat?.pcReqty : 0);

          tabRef2?.current?.reset({
            ...ddat,
            pcDate: new Date(),
            pcJaego: tempJaego,
          });
        } else if (res?.initData) {
          ddat = res?.initData[0];

          let tempJaego =
            (ddat?.junJaego ? ddat?.junJaego : 0) +
            (ddat?.pcQty ? ddat?.pcQty : 0) -
            (ddat?.pcReqty ? ddat?.pcReqty : 0);

          tabRef2?.current?.reset({ ...ddat, pcJaego: tempJaego });
        }

        setData65(ddat);
        setJunJaego(ddat?.junJaego);
        setQty(ddat?.pcQty);
        setReqty(ddat?.pcReqty);
        setDanga(ddat?.pcDanga);

        if (res?.detailData) {
          document.getElementById("pcQty")?.focus();
        } else if (res?.initData) {
          document.getElementById("pcJpCode")?.focus();
        }
      }
    } else if (tabId === 2) {
      const res: any = await fetchData61({
        areaCode: info?.areaCode,
        cuCode: info?.cuCode,
        saleType: 5,
      });
      if (res && Object.keys(res)?.length > 0) {
        setDataDictionary({
          acbCode: res?.tsAcbCode,
          tsGubun: res?.tsGubun,
          tsInkumType: res?.tsInkumtype,
          tsPaytype: res?.tsPaytype,
          saleState: res?.tsSaleState,
          tsSwCode: res?.tsSwCode,
          tsTongGubun: res?.tsTongGubun,
          tsVatDiv: res?.tsVatDiv,
        });
        if (res?.detailData) {
          let detail = res?.detailData[0];
          setData65(detail);
          tabRef3?.current?.reset({ ...detail, tsDate: new Date() });
        } else if (res?.initData) {
          let init = res?.initData[0];
          setData65(init);
          setGubun(init?.tsGubun);
          setQty(init?.tsQty);
          setDanga(init?.tsDanga);
          setInkum(init?.tsInkum);
          setKumSup(init?.tsKumSup);
          setKumVat(init?.tsKumVat);
          setKumack(init?.tsKumack);
          setMisu(init?.tsMisu);
          setVatDiv(init?.tsVatDiv);
          tabRef3?.current?.reset({ ...init });
        }
      }
    } else if (tabId === 3) {
      const res: any = await fetchData71({
        areaCode: info?.areaCode,
        cuCode: info?.cuCode,
        saleType: 5,
      });
      if (res && Object.keys(res)?.length > 0) {
        setDataDictionary({
          bgAcbCode: res?.bgAcbCode,
          bgInkumType: res?.bgInkumType,
          bgSwCode: res?.bgSwCode,
          bgVatDiv: res?.bgVatDiv,
          saleState: res?.saleState,
        });

        setData65(res?.detailData[0]);
        tabRef4?.current?.reset({ ...res?.detailData[0], bgDate: new Date() });
        document.getElementById("bgBpCode")?.focus();
      }
    } else if (tabId === 4) {
      const res: any = await fetchData71({
        areaCode: info?.areaCode,
        cuCode: info?.cuCode,
        saleType: 5,
      });
      if (res && Object.keys(res)?.length > 0) {
        setDataDictionary({
          bgAcbCode: res?.bgAcbCode,
          bgInkumType: res?.bgInkumType,
          bgSwCode: res?.bgSwCode,
          bgVatDiv: res?.bgVatDiv,
          saleState: res?.saleState,
        });

        setData65(res?.detailData[0]);
        tabRef5?.current?.reset({ ...res?.detailData[0], bgDate: new Date() });
        document.getElementById("bgBpCode")?.focus();
      }
    }
  };

  const addCodeAndNameToLastRow = (info: any) => {
    if (data?.length > 0) {
      // if ("isNew" in data[data?.length - 1]) {

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
      // }
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
      //isNew: true,
    };

    setData((prev) => [...prev, { ...emtObj, ...obj }]);
    setRowIndex(menuId, 0, data?.length);
    //setSelected(0); -------------------------
  };

  const removeEmptyRow = () => {
    // if (data && data?.length > 0 && "isNew" in data[data?.length - 1]) {
    if (data && data?.length > 0) {
      const len = data?.length - 1;
      const tempdata = data.slice(0, -1);
      setData(tempdata);

      setQty(0);
      setReqty(0);
      setDanga(0);
      setVatDiv("0");
      setInkum(0);
      setDc(0);

      if (len > 0) {
        setSelected(len - 1);
        setRowIndex(menuId, 0, len - 1);
      } else {
        // setSelected({}); -----------------
        setSelected(-1);
        setRowIndex(menuId, 0, 0);
        //   if (tabId === 0) {
        //     tabRef1.current.reset(emtObjTab1);
        //   } else if (tabId === 1) {
        //     tabRef2.current.reset(emtObjTab2);
        //   } else if (tabId === 2) {
        //     tabRef2.current.reset(emtObjTab3);
        //   } else if (tabId === 3) {
        //     tabRef2.current.reset(emtObjTab4);
        //   }
        // }
      }
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
    const res = await apiGet(AR1100SEARCH, params);

    if (res && res?.length > 0) {
      setData(res);
      const lastIndex = res && res?.length > 1 ? res.length - 1 : 0;

      if (pos === "last") {
        setSelected(lastIndex);
        setRowIndex(menuId, 0, lastIndex);
      } else {
        if (rowIndex) {
          if (rowIndex > lastIndex) {
            setRowIndex(menuId, 0, lastIndex);
            setSelected(lastIndex);
          } else {
            setSelected(rowIndex);
          }
        }
      }
    } else {
      setData([]);
      setSelected(-1);
      //tabId !== 0 && setTabId(0);
      //tabRef1?.current?.setPjQty(0);
      //tabRef1?.current?.setPjJago(0); ------end state-uudiig set hiih
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
      if (data[selected]?.pjType === "0") {
        //1-r tab------------------------
        setDataDictionary({
          pjVatDiv: res?.pjVatDiv,
          pjSwCode: res?.pjSwCode,
          proxyType: res?.proxyType,
          pjInkumtype: res?.pjInkumtype,
          saleState: res?.saleState,
          pacbCode: res?.pacbCode,
        });
        if (res?.detailData && Object.keys(res?.detailData)?.length > 0) {
          let detail = res?.detailData[0];
          //setJunJaego(detail?.junJaego); // irehgui bn ene talbar
          setJunJaego(0); //turdee ingeed tavichihyaa daraa ustga
          setQty(detail?.pjQty);
          setReqty(detail?.pjReqty);
          setDanga(detail?.pjDanga);
          setVatDiv(detail?.pjVatDiv);
          setInkum(detail?.pjInkum);
          setDc(detail?.pjDc);
          tabRef1?.current?.reset(detail);
        }
      }
      if (data[selected]?.pjType === "1") {
        //2-r tab------------------------
        setDataDictionary({
          proxyType: res?.proxyType,
          saleState: res?.saleState,
          pcSwCode: res?.pcSwCode,
        });
        if (res?.detailData && Object.keys(res?.detailData)?.length > 0) {
          let detail = res?.detailData[0];
          let tempJaego =
            (detail?.junJaego ? detail?.junJaego : 0) +
            (detail?.pcQty ? detail?.pcQty : 0) -
            (detail?.pcReqty ? detail?.pcReqty : 0);
          setJunJaego(detail?.junJaego);
          setQty(detail?.pcQty);
          setReqty(detail?.pcReqty);
          setDanga(detail?.pcDanga);
          tabRef2?.current?.reset({ ...detail, pcJaego: tempJaego });
        }
      }
      if (data[selected]?.pjType === "2") {
        //3-r tab------------------------
        setDataDictionary({
          acbCode: res?.tsAcbCode,
          tsGubun: res?.tsGubun,
          tsInkumType: res?.tsInkumType,
          saleState: res?.saleState,
          tsSwCode: res?.tsSwCode,
          tsTongGubun: res?.tsTongGubun,
          tsVatDiv: res?.tsVatDiv,
        });
        if (res?.detailData && Object.keys(res?.detailData)?.length > 0) {
          let detail = res?.detailData[0];
          setGubun(detail.tsGubun);
          if (detail.tsGubun === "0") {
            setDanga(detail?.tsDanga);
            setVatDiv(detail?.tsVatDiv);
            setKumSup(detail?.tsKumSup);
            setKumVat(detail?.tsKumVat);
            setKumack(detail?.tsKumack);
            setInkum(detail?.tsInkum);
            setDc(detail?.tsDc);
            setMisu(detail?.tsMisu);
          } else if (detail.tsGubun === "1") {
            setDanga(detail?.tsDanga);
            setVatDiv(detail?.tsVatDiv);
            setKumSup(detail?.tsKumSup);
            setKumVat(detail?.tsKumVat);
            setInkum(detail?.tsPayamt);
            setKumack(detail?.tsGukum); //----------tsGukum irehgui bn
            setMisu(detail?.tsMisu);
          }
          tabRef3?.current?.reset(detail);
        }
      }
      if (data[selected]?.pjType === "4") {
        dispatch(addAR1100Tab4Multiple(res));
      }
      if (data[selected]?.pjType === "3" || data[selected]?.pjType === "4") {
        setDataDictionary({
          bgAcbCode: res?.bgAcbCode,
          bgInkumType: res?.bgInkumType,
          bgSwCode: res?.bgSwCode,
          bgVatDiv: res?.bgVatDiv,
          saleState: res?.saleState,
        });
        if (res?.detailData && Object.keys(res?.detailData)?.length > 0) {
          tabRef4?.current?.reset(res?.detailData[0]);
          dispatch(
            addBupum({
              areaCode: data[selected]?.areaCode,
              pjType: data[selected]?.pjType,
            })
          );
        }
      }
      if (data[selected]?.pjType === "5") {
        dispatch(addAR1100Tab4Multiple(res));
      }
    } else {
      setData65({});
      setDataDictionary({});
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

  const fetchData71 = async (params: any) => {
    const res = await apiGet(AR1100SELECT71, params);
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
    const params = getValues();
    const date = dateToTimestamp(
      getPreviousMonthDate(DateWithoutDash(params.dDate))
    );
    const sDate = dateToTimestamp(DateWithoutDash(params.sDate));
    const dDate = dateToTimestamp(DateWithoutDash(params.dDate));
    if (sDate >= date && date <= dDate) {
      prepareParamsForSearch(params);
      fetchData(params, pos);
    } else {
      alert("한 달 이내에 검색 가능합니다.");
    }
  };

  const handleClickBtnAdd = () => {
    if (isAddBtnClicked === false) {
      dispatch(addSource({ source: menuId }));
      dispatch(removeSearchText({}));

      addBtnClick();
      addEmptyRow();
    }
    openCustomerModal();
  };

  const handleClickBtnDel = async () => {
    openDeleteModal();
    dispatch(addDeleteMenuId({ menuId: menuId }));
  };

  async function deleteRowGrid() {
    addBtnUnClick();
    if (selected !== undefined) {
      let delPath = "";
      let params = {};
      if (data[selected]?.pjType === "0") {
        delPath = AR1100DELETE;
        params = {
          areaCode: data[selected]?.areaCode,
          pjCuCode: data[selected]?.cuCode,
          pjCuName: data[selected]?.cuName,
          pjJpCode: data[selected]?.jpCode,
          pjSno: data[selected]?.pjSno,
          pjDate: DateWithoutDash(data[selected]?.pjDate),
        };
      } else if (data[selected]?.pjType === "1") {
        delPath = AR1100CJSALEDELETE;
        params = {
          areaCode: data[selected]?.areaCode,
          pcCuCode: data[selected]?.cuCode,
          pcCuName: data[selected]?.cuName,
          pcJpCode: data[selected]?.jpCode,
          pcSno: data[selected]?.pjSno,
          pcDate: DateWithoutDash(data[selected]?.pjDate),
        };
      } else if (data[selected]?.pjType === "2") {
        delPath = AR1100TONGSALEDELETE;
        params = {
          areaCode: data[selected]?.areaCode,
          tsCuCode: data[selected]?.cuCode,
          tsCuName: data[selected]?.cuName,
          tsJpCode: data[selected]?.jpCode,
          tsSno: data[selected]?.pjSno,
          tsDate: DateWithoutDash(data[selected]?.pjDate),
        };
      } else if (
        data[selected]?.pjType === "3" ||
        data[selected]?.pjType === "4"
      ) {
        delPath = AR1100BPSALEDELETE;
        params = {
          areaCode: data[selected]?.areaCode,
          bgCuCode: data[selected]?.cuCode,
          bgCuName: data[selected]?.cuName,
          bgJpCode: data[selected]?.jpCode,
          bgSno: data[selected]?.pjSno,
          bgDate: DateWithoutDash(data[selected]?.pjDate),
        };
      }
      const res = await apiPost(delPath, params, "삭제했습니다");
      res && handleSubmit((d) => submit(d))();
    }
    dispatch(addDeleteMenuId({ menuId: "" }));
    dispatch(setIsDelete({ isDelete: false }));
    closeDeleteModal();
  }

  const handleReset = () => {
    resetSearchForm("reset");
    handleSubmit((d) => submit(d, "last"))();
  };

  const onCloseModal = () => {
    dispatch(
      addCM1105({
        areaCode: getValues("areaCode"),
        cuCode: "",
        status: "INSERT",
        source: menuId,
      })
    );
    closeCustomerModal();
    openCM1105Modal();
  };

  const changeState = async (value: string, dataRow: number) => {
    const res = await apiGet(AR1100STATE, {
      areaCode: data[dataRow].areaCode,
      cuCode: data[dataRow]?.cuCode,
      pjDate: DateWithoutDash(data[dataRow]?.pjDate),
      pjSno: data[dataRow]?.pjSno,
      pjType: data[dataRow]?.pjType,
      saleState: value,
    });
    res && handleSubmit((d) => submit(d))();
  };

  return (
    <>
      {showCustomerModal({ onClose: onCloseModal })}
      {showCM1105Modal()}
      {showDeleteModal()}
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
                    placeholder="거래처명으로 검색"
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
          changeState={changeState}
          style={{
            height: `calc(100% - 282px)`,
            borderBottom: "1px solid rgb(188,185,185)",
            marginBottom: "3px",
          }}
        />
        <PlainTab
          tabHeader={[
            "중량 판매",
            "체적 공급",
            "용기 입출",
            "시설 부품 판매",
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
            data65,
            dataDictionary,
            isAddBtnClicked,
            handleSubmit,
            submit,
            menuId,
            tabRef1,
            tabRef2,
            tabRef3,
            tabRef4,
            tabRef5,
            addBtnUnClick,
            jpKind,
            setJpKind,
            junJaego,
            setJunJaego,
            qty,
            setQty,
            reqty,
            setReqty,
            danga,
            setDanga,
            vatDiv,
            setVatDiv,
            kumSup,
            setKumSup,
            kumVat,
            setKumVat,
            kumack,
            setKumack,
            inkum,
            setInkum,
            dc,
            setDc,
            misu,
            setMisu,
            gubun,
            setGubun
          )}
        </TabContentWrapper>
      </WrapperContent>
    </>
  );
}

export default AR1100;
