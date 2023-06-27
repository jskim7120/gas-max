import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "app/store";
import { setRowIndex } from "app/state/tab/tabSlice";
import { apiGet } from "app/axios";
import {
  openModal,
  addDeleteMenuId,
  closeModal,
  setIsDelete,
} from "app/state/modal/modalSlice";
import {
  MagnifyingGlassBig,
  ExcelIcon,
  Plus,
  Trash,
  Update,
  Reset,
} from "components/allSvgIcon";
import { useGetCommonDictionaryMutation } from "app/api/commonDictionary";
import { ButtonColor, ButtonType, InputSize } from "components/componentsType";
import Button from "components/button/button";

function CreateScreen(
  groupId: string,
  functionName: string,
  menuId: string,
  searchPath: string,
  leftSideWidth: number
) {
  const dispatch = useDispatch();
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  const btnRef1 = useRef() as React.MutableRefObject<HTMLButtonElement>;
  const btnRef2 = useRef() as React.MutableRefObject<HTMLButtonElement>;
  const btnRef3 = useRef() as React.MutableRefObject<HTMLButtonElement>;
  const btnRef4 = useRef() as React.MutableRefObject<HTMLButtonElement>;

  const [getCommonDictionary, { data: dataCommonDic }] =
    useGetCommonDictionaryMutation();

  const activeTabId = useSelector((state) => state.tab.activeTabId);
  const tabState = useSelector((state) => state.tab.tabs);
  const isOpen = useSelector((state) => state.sidebar);
  const { isDelete } = useSelector((state: any) => state.modal);

  const gridIndexes = tabState.find(
    (item) => item.menuId === menuId
  )?.gridIndexes;
  const rowIndex = gridIndexes?.find((item) => item.grid === 0)?.row;

  const [data, setData] = useState<Array<any>>([]);
  const [selected, setSelected] = useState<any>({});
  const [isAddBtnClicked, setIsAddBtnClicked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [linePos, setLinePos] = useState<number>(leftSideWidth);

  useEffect(() => {
    getCommonDictionary({ groupId: groupId, functionName: functionName });
  }, []);

  useEffect(() => {
    if (isDelete.menuId === menuId && isDelete.isDelete) {
      deleteRowGrid();
    }
  }, [isDelete.isDelete]);

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

  const addBtnClick = () => {
    btnRef1.current.classList.add("active");
    setIsAddBtnClicked(true);
  };

  const addBtnUnclick = () => {
    btnRef1.current.classList.remove("active");
    setIsAddBtnClicked(false);
  };

  const handleClickDelete = () => {
    dispatch(openModal({ type: "delModal" }));
    dispatch(addDeleteMenuId({ menuId: menuId }));
  };

  function deleteRowGrid() {
    try {
      formRef.current.crud("delete");
      dispatch(addDeleteMenuId({ menuId: "" }));
      dispatch(setIsDelete({ isDelete: false }));
      dispatch(closeModal());
    } catch (error) {}
  }

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

  const handleDrag = (event: any, ui: any) => {
    setLinePos(ui.x);
  };

  const show4Btns = ({ style }: { style?: any }) => {
    return (
      <div className="buttons" style={style && style}>
        <Button
          text="등록"
          icon={<Plus />}
          type="button"
          onClick={handleClickAdd}
          ref={btnRef1}
        />
        <Button
          text="삭제"
          icon={<Trash />}
          type="button"
          onClick={handleClickDelete}
          disabled={isAddBtnClicked}
          ref={btnRef2}
        />
        <Button
          text="저장"
          icon={<Update />}
          type="button"
          color={ButtonColor.SECONDARY}
          onClick={handleClickUpdate}
          ref={btnRef3}
        />
        <Button
          text="취소"
          icon={<Reset />}
          type="button"
          onClick={handleClickReset}
          ref={btnRef4}
        />
      </div>
    );
  };

  const showDraggableLine = () => {
    return (
      <Draggable
        axis="x"
        bounds={{
          left: 0,
          right: window.innerWidth,
        }}
        position={{ x: linePos, y: 0 }}
        onDrag={handleDrag}
      >
        <div
          style={{
            position: "absolute",
            top: "117px",
            left: `${isOpen} ? 87px : 5px`,
            width: "4px",
            height: "calc(100% - 197px)",
            backgroundColor: "#707070",
            cursor: "col-resize",
          }}
        ></div>
      </Draggable>
    );
  };

  return {
    data,
    setData,
    selected,
    setSelected,
    loading,
    isAddBtnClicked,
    setIsAddBtnClicked,
    activeTabId,
    fetchData,
    showDraggableLine,
    show4Btns,
    isOpen,
    gridIndexes,
    dispatch,
    dataCommonDic,
    linePos,
    setLoading,
    formRef,
    btnRef1,
    btnRef2,
    btnRef3,
    btnRef4,
    addBtnClick,
    addBtnUnclick,
    handleClickDelete,
    handleClickReset,
    handleClickUpdate,
  };
}

export default CreateScreen;
