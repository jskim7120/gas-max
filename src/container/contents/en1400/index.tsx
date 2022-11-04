import { useState, useEffect, useRef } from "react";
import { GridView, LocalDataProvider } from "realgrid";
import API from "app/axios";
import Button from "components/button/button";
import DataGridFooter from "components/dataGridFooter/dataGridFooter";
import { ButtonColor } from "components/componentsType";
import { Plus, Trash, Update, Reset } from "components/allSvgIcon";
import { columns, fields } from "./data";
import {
  openModal,
  closeModal,
  deleteAction,
} from "app/state/modal/modalSlice";
import Form from "./form";
import { Wrapper, TableWrapper, DetailWrapper, DetailHeader } from "../style";
import { setRowIndex, resetFromStorage } from "app/state/gridSelectedRowSlice";
import { useDispatch, useSelector } from "app/store";

let container: HTMLDivElement;
let dp: any;
let gv: any;
let selectedRowIndex: number = 0;

function EN1400({
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
  const [selected, setSelected] = useState({});
  const { isDelete } = useSelector((state) => state.modal);

  useEffect(() => {
    const storagegridRows = JSON.parse(`${sessionStorage.getItem("gridRows")}`);
    if (storagegridRows) {
      dispatch(resetFromStorage({ rows: storagegridRows }));
      const row = storagegridRows.find((row: any) => row.tabId === menuId);
      selectedRowIndex = row && row.rowIndex;
    } else {
      selectedRowIndex = 0;
    }
  }, []);

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

      if (data.length > 0) {
        gv.setCurrent({
          dataRow: selectedRowIndex,
        });

        gv.onSelectionChanged = () => {
          const itemIndex: any = gv.getCurrent().dataRow;
          setSelected(data[itemIndex]);
          dispatch(setRowIndex({ tabId: menuId, rowIndex: itemIndex }));
        };
      }

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
      const res = await API.get("/app/EN1400/list");
      if (res.status === 200) {
        const { data } = res;
        if (data) {
          setData(data);
          setSelected(data[selectedRowIndex]);
        }
      } else {
        console.log("res:", res);
      }
    } catch (error) {
      console.log("Couldn't fetch JNOSAUP data.", error);
    }
  };

  if (!data) return <p>...Loading</p>;

  function deleteRowGrid() {
    try {
      formRef.current.setIsAddBtnClicked(false);
      formRef.current.crud("delete");
      dispatch(deleteAction({ isDelete: false }));
      dispatch(closeModal());
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
          <Form selected={selected} ref={formRef} fetchData={fetchData} />
        </DetailWrapper>
      </Wrapper>
      <DataGridFooter dataLength={data.length > 0 ? data.length : 0} />
    </>
  );
}

export default EN1400;
