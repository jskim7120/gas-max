import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "app/store";
import { setRowIndex } from "app/state/tab/tabSlice";
import { apiGet } from "app/axios";
import { addDeleteMenuId, setIsDelete } from "app/state/modal/modalSlice";
import { useGetCommonDictionaryMutation } from "app/api/commonDictionary";
import use4Btns from "./use4Btns";
import useDrawLine from "./useMidLine";
import useRowIndex from "./useRowIndex";
import useModal from "./useModal";

function CreateScreen(
  groupId: string,
  functionName: string,
  menuId: string,
  searchPath: string,
  leftSideWidth: number
) {
  const dispatch = useDispatch();
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  const {
    show4Btns,
    addBtnClick,
    addBtnUnclick,
    isAddBtnClicked,
    setIsAddBtnClicked,
  } = use4Btns();

  const { showDraggableLine, linePos } = useDrawLine(leftSideWidth);
  const { rowIndex, gridIndexes } = useRowIndex(menuId, 0);
  const { showDeleteModal, openModal, closeModal } = useModal();

  const [getCommonDictionary, { data: dataCommonDic }] =
    useGetCommonDictionaryMutation();

  const { delete: deleteState } = useSelector((state: any) => state.modal);

  const [data, setData] = useState<Array<any>>([]);
  const [selected, setSelected] = useState<any>({});

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getCommonDictionary({ groupId: groupId, functionName: functionName });
  }, []);

  useEffect(() => {
    if (deleteState.menuId === menuId && deleteState.isDelete) {
      deleteRowGrid();
    }
  }, [deleteState.isDelete]);

  const fetchData = async (params: any, pos: string = "") => {
    setLoading(true);

    const dataS = await apiGet(searchPath, params);

    if (dataS) {
      setData(dataS);
      const lastIndex = dataS && dataS.length > 0 ? dataS.length - 1 : 0;

      if (pos === "last") {
        setSelected(dataS[lastIndex]);
        dispatch(setRowIndex({ menuId: menuId, row: lastIndex, grid: 0 }));
      } else {
        if (rowIndex) {
          if (rowIndex > lastIndex) {
            dispatch(setRowIndex({ menuId: menuId, row: lastIndex, grid: 0 }));
            setSelected(dataS[lastIndex]);
          } else {
            setSelected(dataS[rowIndex]);
          }
        }
      }
    } else {
      setData([]);
      setSelected({});
    }
    setLoading(false);
  };

  function deleteRowGrid() {
    try {
      formRef.current.crud("delete");
      dispatch(addDeleteMenuId({ menuId: "" }));
      dispatch(setIsDelete({ isDelete: false }));
      closeModal();
    } catch (error) {}
  }

  const handleClickDelete = () => {
    if (selected && Object.keys(selected)?.length > 0) {
      openModal();
      dispatch(addDeleteMenuId({ menuId: menuId }));
    } else {
      toast.warning("no selected data to delete", {
        autoClose: 500,
      });
    }
  };

  const handleClickAdd = () => {
    addBtnClick();
    formRef.current.resetForm("clear");
  };

  const handleClickUpdate = () => {
    formRef.current.crud(null);
  };

  const handleClickReset = () => {
    addBtnUnclick();
    formRef.current.resetForm("reset");
  };

  const showAll4Btns = () => {
    return show4Btns({
      handleClickAdd,
      handleClickDelete,
      handleClickUpdate,
      handleClickReset,
    });
  };

  return {
    data,
    setData,
    selected,
    setSelected,
    loading,
    isAddBtnClicked,
    setIsAddBtnClicked,
    fetchData,
    showDraggableLine,
    showAll4Btns,
    show4Btns,
    gridIndexes,
    rowIndex,
    dispatch,
    dataCommonDic,
    linePos,
    setLoading,
    formRef,
    addBtnUnclick,
    handleClickDelete,
    handleClickReset,
    handleClickUpdate,
  };
}

export default CreateScreen;
