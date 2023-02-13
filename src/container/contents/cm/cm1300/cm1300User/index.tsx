import { useState, useEffect, useRef } from "react";
import { GridView, LocalDataProvider } from "realgrid";
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
import { Divider } from "components/form/style";
import { SearchWrapper } from "container/contents/commonStyle";
import { PersonInfoText } from "components/text";
import Grid from "components/grid";

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

  const { isDelete } = useSelector((state) => state.modal);

  useEffect(() => {
    if (isDelete.menuId === menuId && isDelete.isDelete) {
      deleteRowGrid();
    }
  }, [isDelete.isDelete]);

  useEffect(() => {
    if (Object.keys(selectedUser).length > 0) {
      fetchSearchData(selectedUser);
    }
  }, [selectedUser]);

  const fetchSearchData = async (selectedUser: any) => {
    try {
      const { data } = await API.get(CM130065, {
        params: {
          areaCode: selectedUser.areaCode,
          aptCode: selectedUser.aptCode,
        },
      });
      if (data.userCustomer) {
        setData(data.userCustomer);
        setSelected(data[0]);
        setSelectedRowIndex(0);
      } else {
        setData([]);
      }
    } catch (err) {
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

  if (!data) return <p>...Loading</p>;

  return (
    <>
      <SearchWrapper className="h35">
        <Button
          text="사용자 추가"
          icon={<Plus />}
          onClick={() => {
            formRef.current.setIsAddBtnClicked(true);
            formRef.current.resetForm("clear");
          }}
        />
        <Button
          text="삭제"
          icon={<Trash />}
          onClick={() => {
            // dispatch(openModal({ type: "delModal" }));
            // dispatch(addDeleteMenuId({ menuId: menuId }));
          }}
        />
        <Button
          text="저장"
          icon={<Update />}
          color={ButtonColor.SECONDARY}
          onClick={() => {
            formRef.current.crud(null);
          }}
        />
        <Button
          text="취소"
          icon={<Reset />}
          onClick={() => {
            formRef.current.setIsAddBtnClicked(false);
            formRef.current.resetForm("reset");
          }}
          style={{ padding: "0 3px" }}
        />
      </SearchWrapper>
      <PersonInfoText text="사용자" style={{ padding: "10px" }} />

      <Grid
        areaCode={areaCode}
        data={data}
        setSelected={setSelected}
        selectedRowIndex={selectedRowIndex}
        setSelectedRowIndex={setSelectedRowIndex}
        fields={fields}
        columns={columns}
        style={{ height: `500px` }}
      />
      <Divider />
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
    </>
  );
}

export default FormCM1300User;
