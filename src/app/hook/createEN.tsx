import React, { useState, useEffect, useRef } from "react";
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

function CreateEN(
  depthFullName: string,
  menuId: string,
  searchPath: string,
  columns: any,
  fields: any,
  Form: any,
  leftSideWidth: string,
  rightSideWidth: string
) {
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  const btnRef1 = useRef() as React.MutableRefObject<HTMLButtonElement>;
  const btnRef2 = useRef() as React.MutableRefObject<HTMLButtonElement>;
  const btnRef3 = useRef() as React.MutableRefObject<HTMLButtonElement>;
  const btnRef4 = useRef() as React.MutableRefObject<HTMLButtonElement>;

  const dispatch = useDispatch();

  const [data, setData] = useState<Array<any>>([]);
  const [selected, setSelected] = useState<any>({});
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(0);
  const [isAddBtnClicked, setIsAddBtnClicked] = useState<boolean>(false);

  const { isDelete } = useSelector((state) => state.modal);

  useEffect(() => {
    fetchData();
  }, []);

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

  const fetchData = async () => {
    try {
      const { data: dataS } = await API.get(searchPath);
      if (dataS) {
        setData(dataS);
        setSelected(dataS[0]);
      } else {
        setData([]);
        setSelected({});
      }
      setSelectedRowIndex(0);
    } catch (err) {
      setData([]);
      setSelected({});
      setSelectedRowIndex(0);
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

  const showScreen = () => {
    return (
      <>
        <SearchWrapper className="h35 mt5">
          <div className="buttons">
            <Button
              text="등록"
              icon={<Plus />}
              onClick={() => {
                btnRef1.current.classList.add("active");
                btnRef4.current.classList.remove("active");
                setIsAddBtnClicked(true);
                formRef.current.resetForm("clear");
                formRef.current?.setImage64 && formRef.current?.setImage64("");
              }}
              ref={btnRef1}
            />
            <Button
              text="삭제"
              icon={<Trash />}
              onClick={() => {
                dispatch(openModal({ type: "delModal" }));
                dispatch(addDeleteMenuId({ menuId: menuId }));
              }}
              disabled={isAddBtnClicked}
              ref={btnRef2}
            />
            <Button
              text="저장"
              icon={<Update />}
              color={ButtonColor.SECONDARY}
              onClick={() => {
                formRef.current.crud(null);
              }}
              ref={btnRef3}
            />
            <Button
              text="취소"
              icon={<Reset />}
              onClick={() => {
                btnRef1.current.classList.remove("active");
                btnRef4.current.classList.add("active");
                setIsAddBtnClicked(false);
                formRef.current.resetForm("reset");
              }}
              disabled={!isAddBtnClicked}
              ref={btnRef4}
            />
          </div>
          <p>{depthFullName}</p>
        </SearchWrapper>
        <MainWrapper>
          <Grid
            style={{ width: leftSideWidth }}
            data={data}
            fields={fields}
            columns={columns}
            setSelected={setSelected}
            selectedRowIndex={selectedRowIndex}
            setSelectedRowIndex={setSelectedRowIndex}
            setIsAddBtnClicked={setIsAddBtnClicked}
          />

          <RightSide style={{ width: rightSideWidth }}>
            <Form
              selected={selected}
              ref={formRef}
              fetchData={fetchData}
              setData={setData}
              selectedRowIndex={selectedRowIndex}
              setSelectedRowIndex={setSelectedRowIndex}
              setSelected={setSelected}
              isAddBtnClicked={isAddBtnClicked}
              setIsAddBtnClicked={setIsAddBtnClicked}
            />
          </RightSide>
        </MainWrapper>
      </>
    );
  };

  return { showScreen };
}

export default CreateEN;
