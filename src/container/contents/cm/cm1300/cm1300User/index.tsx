import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import API from "app/axios";
import Button from "components/button/button";
import { Plus, Trash, Update, Reset } from "components/allSvgIcon";
import { columns, fields } from "./data";
import {
  openModal,
  closeModal,
  addDeleteMenuId,
  setIsDelete,
  addCM1105,
} from "app/state/modal/modalSlice";
import Form from "./form";
import { ButtonColor } from "components/componentsType";
import { useDispatch, useSelector } from "app/store";
import { CM130065 } from "app/path";
import { Divider, FormGroup } from "components/form/style";
import { SearchWrapper } from "container/contents/commonStyle";
import { PersonInfoText } from "components/text";
import Grid from "components/grid";
import FourButtons from "components/button/fourButtons";

function FormCM1300User({
  depthFullName,
  menuId,
  selectedUser,
  areaCode,
}: {
  depthFullName: string;
  menuId: string;
  selectedUser: any;
  areaCode: string;
}) {
  const { register, handleSubmit } = useForm({ mode: "onSubmit" });
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState({});
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const [isAddBtnClicked, setIsAddBtnClicked] = useState<boolean>(false);
  const [isCancelBtnDisabled, setIsCancelBtnDisabled] = useState<boolean>(true);

  const { isDelete } = useSelector((state) => state.modal);

  useEffect(() => {
    if (isDelete.menuId === menuId && isDelete.isDelete) {
      deleteRowGrid();
    }
  }, [isDelete.isDelete]);

  useEffect(() => {
    if (Object.keys(selectedUser)?.length > 0) {
      fetchSearchData(selectedUser);
    }
  }, [selectedUser]);

  const fetchSearchData = async (selectedUser: any) => {
    try {
      const { data: data65 } = await API.get(CM130065, {
        params: {
          areaCode: selectedUser.areaCode,
          aptCode: selectedUser.aptCode,
        },
      });
      if (data65) {
        if (data65?.userCustomer) {
          setData(data65.userCustomer);
          setSelected(data65[0]);
        } else {
          setData([]);
          setSelected({});
        }
        setSelectedRowIndex(0);
      }
    } catch (err) {
      setData([]);
      setSelected({});
      setSelectedRowIndex(0);
      console.log("CM1300 data search fetch error =======>", err);
    }
  };

  function deleteRowGrid() {
    try {
      formRef.current.setIsAddBtnClicked(false);
      formRef.current.crud("delete");
      dispatch(addDeleteMenuId({ menuId: "" }));
      dispatch(setIsDelete({ isDelete: false }));
      dispatch(closeModal());
    } catch (error) {}
  }

  const onClickAdd = () => {
    setIsAddBtnClicked(true);
    formRef.current.resetForm("clear");
  };

  const onClickDelete = () => {
    // dispatch(openModal({ type: "delModal" }));
    // dispatch(addDeleteMenuId({ menuId: menuId }));};
  };

  const onClickUpdate = () => {
    formRef.current.crud(null);
  };

  const onClickReset = () => {
    setIsAddBtnClicked(false);
    formRef.current.resetForm("reset");
  };

  return (
    <>
      <SearchWrapper className="h35">
        <div></div>
        <FourButtons
          onClickAdd={onClickAdd}
          onClickDelete={onClickDelete}
          onClickUpdate={onClickUpdate}
          onClickReset={onClickReset}
          isAddBtnClicked={isAddBtnClicked}
          isCancelBtnDisabled={isCancelBtnDisabled}
        />
      </SearchWrapper>

      <div style={{ display: "flex" }}>
        <div style={{ width: "50%", flexGrow: 1 }}>
          <PersonInfoText text="사용자" style={{ padding: "10px" }} />
          <Grid
            areaCode={areaCode}
            data={data}
            setSelected={setSelected}
            selectedRowIndex={selectedRowIndex}
            setSelectedRowIndex={setSelectedRowIndex}
            fields={fields}
            columns={columns}
            style={{ height: `282px` }}
          />
        </div>
        <div style={{ width: "1px", background: "#707070" }}></div>

        <Form
          userData={data}
          selected={selected}
          ref={formRef}
          fetchData={fetchSearchData}
          setData={setData}
          selectedRowIndex={selectedRowIndex}
          setSelectedRowIndex={setSelectedRowIndex}
          setSelected={setSelected}
        />
      </div>
    </>
  );
}

export default FormCM1300User;
