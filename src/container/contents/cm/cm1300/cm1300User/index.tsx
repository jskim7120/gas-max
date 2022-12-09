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
import {
  Grid2TableContainer,
  FormContainer,
  TableContainer,
  UpdateButtonsContainer2,
} from "./style";
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
  const { modalIsOpen } = useSelector((state) => state.modal);

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

    gv.onCellDblClicked = function (grid: any, e: any) {
      const itemIndex: any = e.dataRow;
      setSelected(data[itemIndex]);
      handleOpenPopup(data[itemIndex]["cuCode"], data[itemIndex]["areaCode"]);
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
    fetchSearchData(selectedUser);
  }, [selectedUser]);

  useEffect(() => {
    fetchSearchData(selectedUser);
  }, [modalIsOpen]);

  const fetchSearchData = async (selectedUser: any) => {
    try {
      const { data } = await API.get(CM130065, {
        params: { aptCode: selectedUser.aptCode },
      });
      if (data.length > 0) {
        data[0].areaCode = selectedUser.areaCode;
      }
      if (data) {
        setData(data);
        setSelected(data[0]);
        setSelectedRowIndex(0);
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

  const handleOpenPopup = async (cuCode: string, areaCode: string) => {
    try {
      dispatch(
        addCM1105({
          cuCode: cuCode,
          areaCode: areaCode,
        })
      );
      dispatch(openModal({ type: "cm1105Modal" }));
    } catch (err: any) {}
  };

  if (!data) return <p>...Loading</p>;

  return (
    <>
      <div className="buttons">
        <Button
          text="사용자 추가"
          icon={<Plus />}
          style={{ marginRight: "5px" }}
          onClick={() => {
            dispatch(
              addCM1105({
                cuCode: "",
                areaCode: "",
              })
            );
            dispatch(openModal({ type: "cm1105Modal" }));
          }}
        />
        <Button
          text="삭제"
          icon={<Trash />}
          style={{ marginRight: "12px" }}
          onClick={() => {}}
        />
      </div>
      <Grid2TableContainer>
        <FormContainer>
          <TableContainer ref={realgridElement}></TableContainer>
          <Divider />
          <Form
            selected={selected}
            ref={formRef}
            fetchData={fetchSearchData}
            setData={setData}
            selectedRowIndex={selectedRowIndex}
            setSelectedRowIndex={setSelectedRowIndex}
            setSelected={setSelected}
          />
          <UpdateButtonsContainer2>
            <Button
              text="저장"
              icon={<Update />}
              style={{ marginRight: "5px" }}
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
          </UpdateButtonsContainer2>
        </FormContainer>
      </Grid2TableContainer>
    </>
  );
}

export default FormCM1300User;
