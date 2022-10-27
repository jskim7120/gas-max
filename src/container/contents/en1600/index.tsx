import { useState, useEffect, useRef } from "react";
import { GridView, LocalDataProvider } from "realgrid";
import { columns, fields } from "./data";
import Button from "components/button/button";
import DataGridFooter from "components/dataGridFooter/dataGridFooter";
import { ButtonColor } from "components/componentsType";
import { Plus, Trash, Update, Reset } from "components/allSvgIcon";
import { Wrapper, TableWrapper, DetailWrapper, DetailHeader } from "../style";
import API from "app/axios";
import Form from "./form";
import { setRowIndex } from "app/state/gridSelectedRowSlice";
import { useDispatch } from "app/store";

let container: HTMLDivElement;
let dp: any;
let gv: any;
let selectedRowIndex: number = 0;

function EN1600({
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

  useEffect(() => {
    const storagegridRows = JSON.parse(`${sessionStorage.getItem("gridRows")}`);
    if (storagegridRows) {
      const row = storagegridRows.find((row: any) => row.tabId === menuId);
      selectedRowIndex = row && row.rowIndex;
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
      gv.displayOptions._selectionDisplay = "row";

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

  const fetchData = async () => {
    try {
      const { data } = await API.get("/app/EN1600/list");
      if (data) {
        setData(data);
        setSelected(data[selectedRowIndex]);
      }
    } catch (err) {
      console.log("SAWON DATA fetch error =======>", err);
    }
  };

  if (!data) return <p>...Loading</p>;
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
            onClick={() => {
              formRef.current.setIsAddBtnClicked(false);
              formRef.current.crud("delete");
            }}
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

export default EN1600;
