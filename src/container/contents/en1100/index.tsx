import { useState, useEffect, useRef } from "react";
import { GridView, LocalDataProvider } from "realgrid";
import API from "app/axios";
import Button from "components/button/button";
import DataGridFooter from "components/dataGridFooter/dataGridFooter";
import { ButtonColor } from "components/componentsType";
import { Plus, Trash, Update, Reset } from "components/allSvgIcon";
import { columns, fields } from "./data";
import Form from "./form";
import { Wrapper, TableWrapper, DetailWrapper, DetailHeader } from "../style";
import { setRowIndex } from "app/state/gridSelectedRowSlice";
import { useDispatch, useSelector } from "app/store";

let container: HTMLDivElement;
let dp: any;
let gv: any;

function EN1100({ depthFullName }: { depthFullName: string }) {
  const realgridElement = useRef<HTMLDivElement>(null);
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  const dispatch = useDispatch();

  const gridSelectedRowIndex = useSelector(
    (state) => state.gridSelectedRow.selectedRowIndex
  );

  const [jnotry, setJnotry] = useState([]);
  const [selected, setSelected] = useState({});

  useEffect(() => {
    fetchJNotry();
    const storageIndex = sessionStorage.getItem("selectedRowIndex");
    if (Number(storageIndex) > 0) {
      dispatch(setRowIndex({ selectedRowIndex: storageIndex }));
    }
  }, []);

  useEffect(() => {
    if (jnotry.length > 0) {
      container = realgridElement.current as HTMLDivElement;
      dp = new LocalDataProvider(true);
      gv = new GridView(container);

      gv.setDataSource(dp);
      dp.setFields(fields);
      gv.setColumns(columns);
      dp.setRows(jnotry);

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

      if (jnotry.length > 0) {
        gv.setSelection({
          style: "rows",
          startRow: gridSelectedRowIndex,
          endRow: gridSelectedRowIndex,
        });

        gv.onSelectionChanged = () => {
          const itemIndex: any = gv.getCurrent().dataRow;
          setSelected(jnotry[itemIndex]);
          dispatch(setRowIndex({ selectedRowIndex: itemIndex }));
        };
      }

      return () => {
        dp.clearRows();
        gv.destroy();
        dp.destroy();
      };
    }
  }, [jnotry]);

  const fetchJNotry = async () => {
    try {
      const { data } = await API.get("/app/EN1100/list");
      if (data) {
        setJnotry(data);
        setSelected(data[gridSelectedRowIndex]);
      }
    } catch (err) {
      console.log("JNOTRY DATA fetch error =======>", err);
    }
  };

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
          <Form selected={selected} ref={formRef} fetchJNotry={fetchJNotry} />
        </DetailWrapper>
      </Wrapper>
      <DataGridFooter dataLength={jnotry.length > 0 ? jnotry.length : 0} />
    </>
  );
}

export default EN1100;
