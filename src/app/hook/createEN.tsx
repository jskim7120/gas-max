import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "app/store";
import Button from "components/button/button";
import { ButtonColor } from "components/componentsType";
import { Plus, Trash, Update, Reset } from "components/allSvgIcon";
import API from "app/axios";
import Grid from "container/contents/en/grid";
import {
  MainWrapper,
  RightSide,
  SearchWrapper,
} from "container/contents/commonStyle";
import {
  openModal,
  closeModal,
  addDeleteMenuId,
  setIsDelete,
} from "app/state/modal/modalSlice";
import { setRowIndex } from "app/state/tab/tabSlice";

function CreateEN(
  depthFullName: string,
  menuId: string,
  searchPath: string,
  columns: any,
  fields: any,
  Form: any,
  leftSideWidth: number,
  rightSideWidth: string
) {
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  const btnRef1 = useRef() as React.MutableRefObject<HTMLButtonElement>;
  const btnRef2 = useRef() as React.MutableRefObject<HTMLButtonElement>;
  const btnRef3 = useRef() as React.MutableRefObject<HTMLButtonElement>;
  const btnRef4 = useRef() as React.MutableRefObject<HTMLButtonElement>;

  const dispatch = useDispatch();
  const { isDelete } = useSelector((state) => state.modal);
  const activeTabId = useSelector((state) => state.tab.activeTabId);
  const tabState = useSelector((state) => state.tab.tabs);
  const isOpen = useSelector((state) => state.sidebar);

  const rowIndex = tabState.find((item) => item.menuId === menuId)?.rowIndex;

  const [data, setData] = useState<Array<any>>([]);
  const [selected, setSelected] = useState<any>({});
  const [isAddBtnClicked, setIsAddBtnClicked] = useState<boolean>(false);
  const [linePos, setLinePos] = useState(leftSideWidth);

  useEffect(() => {
    fetchData("pos");
  }, []);

  function handleKeyDown(event: any) {
    if (event.key === "F1") {
      console.log("F1-----");
      event.preventDefault();
      handleClickBtn1();
    }
    if (event.key === "F4") {
      console.log("F4-----");
      event.preventDefault();
      handleClickBtn2();
    }

    if (event.key === "F7") {
      console.log("F7-----");
      event.preventDefault();
      btnRef3.current.focus();
      handleClickBtn3();
    }

    if (event.key === "F9") {
      console.log("F9-----");
      event.preventDefault();
      handleClickBtn4();
    }
  }

  useEffect(() => {
    if (isDelete.menuId === menuId && isDelete.isDelete) {
      deleteRowGrid();
    }
  }, [isDelete.isDelete]);

  useEffect(() => {
    if (selected && Object.keys(selected)?.length > 0) {
      btnRef1.current.classList.remove("active");
      formRef.current.resetForm("reset");
      setIsAddBtnClicked(false);
    }
  }, [selected]);

  const fetchData = async (func: string = "") => {
    try {
      const { data: dataS } = await API.get(searchPath);
      if (dataS) {
        setData(dataS);
        if (func === "pos") {
          const lastIndex = dataS && dataS.length > 0 ? dataS.length - 1 : 0;
          setSelected(dataS[lastIndex]);
          dispatch(setRowIndex({ menuId: menuId, rowIndex: lastIndex }));
        }
      } else {
        setData([]);
        setSelected({});
      }
    } catch (err) {
      setData([]);
      setSelected({});
      console.log(`${menuId} DATA fetch error =======>`, err);
    }
  };

  function deleteRowGrid() {
    try {
      setIsAddBtnClicked(false);
      formRef.current.crud("delete");
      dispatch(addDeleteMenuId({ menuId: "" }));
      dispatch(setIsDelete({ isDelete: false }));
      dispatch(closeModal());
    } catch (error) {}
  }

  const handleDrag = (event: any, ui: any) => {
    setLinePos(ui.x);
  };

  const handleClickBtn1 = () => {
    btnRef1.current.classList.add("active");
    // btnRef4.current.classList.remove("active");
    setIsAddBtnClicked(true);
    formRef.current.resetForm("clear");
    formRef.current?.setImage64 && formRef.current?.setImage64("");
  };

  const handleClickBtn2 = () => {
    dispatch(openModal({ type: "delModal" }));
    dispatch(addDeleteMenuId({ menuId: menuId }));
  };

  const handleClickBtn3 = () => {
    formRef.current.crud(null);
  };

  const handleClickBtn4 = () => {
    btnRef1.current.classList.remove("active");
    // btnRef4.current.classList.add("active");
    setIsAddBtnClicked(false);
    formRef.current.resetForm("reset");
  };

  const resetButtonCombination = () => {
    setIsAddBtnClicked(false);
    btnRef1.current.classList.remove("active");
  };

  const showScreen = () => {
    return (
      <>
        <SearchWrapper className="h35 mt5">
          <div className="buttons">
            <Button
              text="등록 (F1)"
              icon={<Plus />}
              onClick={handleClickBtn1}
              ref={btnRef1}
            />
            <Button
              text="삭제 (F4)"
              icon={<Trash />}
              onClick={handleClickBtn2}
              disabled={isAddBtnClicked}
              ref={btnRef2}
            />
            <Button
              text="저장 (F7)"
              icon={<Update />}
              color={ButtonColor.SECONDARY}
              onClick={handleClickBtn3}
              ref={btnRef3}
            />
            <Button
              text="취소 (F9)"
              icon={<Reset />}
              onClick={handleClickBtn4}
              disabled={!isAddBtnClicked}
              ref={btnRef4}
            />
          </div>
          <p>{depthFullName}</p>
        </SearchWrapper>
        <MainWrapper>
          <Grid
            style={{ width: `${linePos}px` }}
            data={data}
            fields={fields}
            columns={columns}
            setSelected={setSelected}
            setIsAddBtnClicked={setIsAddBtnClicked}
            menuId={menuId}
            rowIndex={rowIndex}
          />

          <RightSide
            style={{
              width: `calc(100% - ${linePos}px)`,
            }}
          >
            <div style={{ width: rightSideWidth }}>
              <Form
                ref={formRef}
                selected={selected}
                fetchData={fetchData}
                isAddBtnClicked={isAddBtnClicked}
                setIsAddBtnClicked={setIsAddBtnClicked}
                resetButtonCombination={resetButtonCombination}
              />
            </div>
          </RightSide>

          <Draggable
            axis="x"
            bounds={{ left: 0, right: window.innerWidth - 96 }}
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
        </MainWrapper>
      </>
    );
  };

  return { showScreen, handleKeyDown, activeTabId, fetchData };
}

export default CreateEN;
