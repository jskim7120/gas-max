import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "app/store";
import Button from "components/button/button";
import { ButtonColor } from "components/componentsType";
import { Plus, Trash, Update, Reset } from "components/allSvgIcon";
import Grid from "container/contents/en/grid";
import {
  MainWrapper,
  RightSide,
  SearchWrapper,
} from "container/contents/commonStyle";
import { addDeleteMenuId, setIsDelete } from "app/state/modal/modalSlice";
import { apiGet } from "app/axios";
import useModal from "./useModal";
import useRowIndex from "./useRowIndex";

function CreateEN(
  depthFullName: string,
  menuId: string,
  ownAreaCode: string,
  searchPath: string,
  columns: any,
  fields: any,
  Form: any,
  leftSideWidth: number
) {
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  const btnRef1 = useRef() as React.MutableRefObject<HTMLButtonElement>;
  const btnRef2 = useRef() as React.MutableRefObject<HTMLButtonElement>;
  const btnRef3 = useRef() as React.MutableRefObject<HTMLButtonElement>;
  const btnRef4 = useRef() as React.MutableRefObject<HTMLButtonElement>;

  const dispatch = useDispatch();
  const { delete: deleteState } = useSelector((state) => state.modal);
  const activeTabId = useSelector((state) => state.tab.activeTabId);
  const isOpen = useSelector((state) => state.sidebar);

  const { getRowIndex, setRowIndex } = useRowIndex();

  const rowIndex = getRowIndex(menuId, 0);

  const [data, setData] = useState<Array<any>>([]);
  const [selected, setSelected] = useState<any>({});
  const [isAddBtnClicked, setIsAddBtnClicked] = useState<boolean>(false);
  const [linePos, setLinePos] = useState(leftSideWidth);
  const { showDeleteModal, closeModal, openModal } = useModal();

  useEffect(() => {
    fetchData("last");
  }, []);

  function handleKeyDown(event: any) {
    if (event.key === "F1") {
      event.preventDefault();
      handleClickBtn1();
    }
    if (event.key === "F4") {
      event.preventDefault();
      handleClickBtn2();
    }

    if (event.key === "F7") {
      event.preventDefault();
      btnRef3.current.focus();
      handleClickBtn3();
    }

    if (event.key === "F9") {
      event.preventDefault();
      handleClickBtn4();
    }
  }

  useEffect(() => {
    if (deleteState.menuId === menuId && deleteState.isDelete) {
      deleteRowGrid();
    }
  }, [deleteState.isDelete]);

  useEffect(() => {
    if (activeTabId) {
      if (activeTabId === menuId) {
        document.addEventListener("keydown", handleKeyDown);
      }
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [activeTabId]);

  useEffect(() => {
    if (selected && Object.keys(selected)?.length > 0) {
      btnRef1?.current?.classList?.remove("active");
      formRef?.current?.resetForm("reset");
      setIsAddBtnClicked(false);
    }
  }, [selected]);

  const fetchData = async (func: string = "") => {
    const dataS = await apiGet(searchPath);

    if (dataS) {
      setData(dataS);
      const lastIndex = dataS && dataS?.length > 0 ? dataS?.length - 1 : 0;

      if (func === "last") {
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
    }
  };

  function deleteRowGrid() {
    try {
      setIsAddBtnClicked(false);
      formRef.current.crud("delete");
      dispatch(addDeleteMenuId({ menuId: "" }));
      dispatch(setIsDelete({ isDelete: false }));
      closeModal();
    } catch (error) {}
  }

  const handleDrag = (event: any, ui: any) => {
    setLinePos(ui.x);
  };

  const handleClickBtn1 = () => {
    btnRef1?.current?.classList?.add("active");
    // btnRef4.current.classList.remove("active");
    setIsAddBtnClicked(true);
    formRef?.current?.resetForm("clear");
    formRef?.current?.setImage64 && formRef?.current?.setImage64("");
  };

  const handleClickBtn2 = () => {
    openModal();
    dispatch(addDeleteMenuId({ menuId: menuId }));
  };

  const handleClickBtn3 = () => {
    formRef?.current?.crud(null);
  };

  const handleClickBtn4 = () => {
    btnRef1?.current?.classList?.remove("active");
    // btnRef4.current.classList.add("active");
    setIsAddBtnClicked(false);
    formRef?.current?.resetForm("reset");
  };

  const resetButtonCombination = () => {
    setIsAddBtnClicked(false);
    btnRef1?.current?.classList?.remove("active");
  };

  const showScreen = () => {
    return (
      <>
        {showDeleteModal()}
        <SearchWrapper className="h35">
          <div className="buttons">
            {((menuId === "EN1100" && ownAreaCode === "00") ||
              menuId !== "EN1100") && (
              <>
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
              </>
            )}

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
            <Form
              ref={formRef}
              selected={selected}
              fetchData={fetchData}
              isAddBtnClicked={isAddBtnClicked}
              setIsAddBtnClicked={setIsAddBtnClicked}
              resetButtonCombination={resetButtonCombination}
            />
          </RightSide>

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
        </MainWrapper>
      </>
    );
  };

  return { showScreen, handleKeyDown, activeTabId, fetchData };
}

export default CreateEN;
