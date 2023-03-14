import { useState, useEffect, useRef } from "react";
import API from "app/axios";
import { useDispatch, useSelector } from "app/store";
import {
  closeModal,
  addDeleteMenuId,
  setIsDelete,
} from "app/state/modal/modalSlice";
import { EN1700LIST } from "app/path";
import Form from "./form";
import Grid from "../grid";
import { columns, fields } from "./data";
import { MainWrapper, RightSide, SearchWrapper } from "../../commonStyle";
import ENButtons from "components/button/enButtons";

function EN1700({
  depthFullName,
  menuId,
}: {
  depthFullName: string;
  menuId: string;
}) {
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState({});
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const [isAddBtnClicked, setIsAddBtnClicked] = useState<boolean>(false);
  const [isCancelBtnDisabled, setIsCancelBtnDisabled] = useState<boolean>(true);
  const { isDelete } = useSelector((state) => state.modal);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (isDelete.menuId === menuId && isDelete.isDelete) {
      deleteRowGrid();
    }
  }, [isDelete.isDelete]);

  const fetchData = async () => {
    try {
      const { data } = await API.get(EN1700LIST);
      if (data) {
        setData(data);
        setSelected(data[0]);
        setSelectedRowIndex(0);
      }
    } catch (error) {
      console.log("Couldn't fetch CAR data.", error);
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

  if (!data) return <p>...Loading</p>;

  return (
    <>
      <SearchWrapper className="h35 mt5">
        <p>{depthFullName}</p>
        <ENButtons
          menuId={menuId}
          formRef={formRef}
          dispatch={dispatch}
          isAddBtnClicked={isAddBtnClicked}
          setIsAddBtnClicked={setIsAddBtnClicked}
          isCancelBtnDisabled={isCancelBtnDisabled}
          setIsCancelBtnDisabled={setIsCancelBtnDisabled}
        />
      </SearchWrapper>
      <MainWrapper>
        <Grid
          data={data}
          fields={fields}
          columns={columns}
          setSelected={setSelected}
          selectedRowIndex={selectedRowIndex}
          setSelectedRowIndex={setSelectedRowIndex}
          setIsCancelBtnDisabled={setIsCancelBtnDisabled}
          setIsAddBtnClicked={setIsAddBtnClicked}
        />
        <RightSide>
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
            setIsCancelBtnDisabled={setIsCancelBtnDisabled}
          />
        </RightSide>
      </MainWrapper>
    </>
  );
}

export default EN1700;
