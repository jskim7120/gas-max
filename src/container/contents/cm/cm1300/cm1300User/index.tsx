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
import { Grid2TableContainer, FormContainer, TableContainer } from "./style";
import { Divider } from "components/form/style";

let container: HTMLDivElement;
let dp: any;
let gv: any;

function FormCM1300User({
  depthFullName,
  menuId,
  selectedUser,
}: {
  depthFullName: string;
  menuId: string;
  selectedUser: any;
}) {
  const { register, handleSubmit } = useForm({ mode: "onSubmit" });
  const realgridElement = useRef<HTMLDivElement>(null);
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState({});
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);

  const { isDelete } = useSelector((state) => state.modal);

  useEffect(() => {
    container = realgridElement.current as HTMLDivElement;
    dp = new LocalDataProvider(true);
    gv = new GridView(container);

    gv.setDataSource(dp);
    dp.setFields(fields);
    gv.setColumns(columns);
    dp.setRows(data);
    gv.setHeader({
      height: 35,
    });
    gv.setFooter({ visible: false });
    gv.setOptions({
      indicator: { visible: true },
      checkBar: { visible: false },
      stateBar: { visible: false },
    });
    gv.sortingOptions.enabled = true;
    gv.displayOptions._selectionStyle = "singleRow";
    gv.setEditOptions({ editable: false });

    gv.setCurrent({
      dataRow: selectedRowIndex,
    });

    gv.onSelectionChanged = () => {
      const itemIndex: any = gv.getCurrent().dataRow;
      setSelected(data[itemIndex]);
      setSelectedRowIndex(itemIndex);
    };
    return () => {
      dp.clearRows();
      gv.destroy();
      dp.destroy();
    };
  }, [data]);

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
      <div className="buttons">
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
      </div>
      <Grid2TableContainer>
        <FormContainer>
          <TableContainer ref={realgridElement}></TableContainer>
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
        </FormContainer>
      </Grid2TableContainer>
    </>
  );
}

export default FormCM1300User;
