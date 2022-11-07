import { useState, useEffect, useRef } from "react";
import { GridView, LocalDataProvider } from "realgrid";
import { columns, fields } from "./data";
import {
  openModal,
  closeModal,
  // deleteAction,
} from "app/state/modal/modalSlice";
import Button from "components/button/button";
import DataGridFooter from "components/dataGridFooter/dataGridFooter";
import { ButtonColor } from "components/componentsType";
import { Plus, Trash, Update, Reset } from "components/allSvgIcon";
import { Wrapper, TableWrapper, DetailWrapper, DetailHeader } from "../style";
import API from "app/axios";
import Form from "./form";
import { setRowIndex, resetFromStorage } from "app/state/gridSelectedRowSlice";
import { useDispatch, useSelector } from "app/store";

let container: HTMLDivElement;
let dp: any;
let gv: any;

function EN1800({
  depthFullName,
  menuId,
}: {
  depthFullName: string;
  menuId: string;
}) {
  const realgridElement = useRef<HTMLDivElement>(null);
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState<any>();
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);

  const { isDelete } = useSelector((state) => state.modal);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
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
    }
  }, [data]);

  useEffect(() => {
    if (isDelete) {
      deleteRowGrid();
    }
  }, [isDelete]);

  const fetchData = async () => {
    try {
      const { data } = await API.get("/app/EN1800/list");
      if (data) {
        setData(data);
        setSelected(data[0]);
        setSelectedRowIndex(0);
      }
    } catch (err) {
      console.log("DATA fetch error =======>", err);
    }
  };

  function deleteRowGrid() {
    try {
      formRef.current.setIsAddBtnClicked(false);
      formRef.current.crud("delete");
      // dispatch(deleteAction({ isDelete: false }));
      // dispatch(closeModal());
    } catch (error) {}
  }

  return (
    <>
      <DetailHeader>
        <p>{depthFullName}</p>
        <div className="buttons">
          <Button
            text="등록"
            icon={<Plus />}
            style={{ marginRight: "5px" }}
            onClick={() => {
              formRef.current.setIsAddBtnClicked(true);
              formRef.current.resetForm("clear");
            }}
          />
          <Button
            text="삭제"
            icon={<Trash />}
            style={{ marginRight: "5px" }}
            onClick={() => dispatch(openModal({ type: "delModal" }))}
          />
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
          />
        </div>
      </DetailHeader>
      <Wrapper>
        <TableWrapper ref={realgridElement}></TableWrapper>
        <DetailWrapper>
          <Form
            selected={selected}
            ref={formRef}
            fetchData={fetchData}
            menuId={menuId}
            setData={setData}
            selectedRowIndex={selectedRowIndex}
            setSelectedRowIndex={setSelectedRowIndex}
            setSelected={setSelected}
          />
        </DetailWrapper>
      </Wrapper>
      <DataGridFooter dataLength={data.length > 0 ? data.length : 0} />
    </>
  );
}

export default EN1800;
