import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "app/store";
import { GridView, LocalDataProvider } from "realgrid";
import Button from "components/Button/Button";
import { Plus, Trash, Tick, X, Chat, CloseCircle } from "components/AllSvgIcon";
import { columns, fields } from "./data";
import Form from "./form";
import { Wrapper, TableWrapper, DetailWrapper, DetailHeader } from "./style";

let tableData: any;
let container: HTMLDivElement;
let dp: any;
let gv: any;

function EN100({ name }: { name: string }) {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState();
  // tableData = useSelector((state) => state.employees.employees);
  tableData = [
    { areaCode: "test1", areaName: "1-r test" },
    { areaCode: "test2", areaName: "2-r test" },
    { areaCode: "test3", areaName: "3-r test" },
  ];
  const realgridElement = useRef<HTMLDivElement>(null);
  useEffect(() => {
    container = realgridElement.current as HTMLDivElement;
    dp = new LocalDataProvider(true);
    gv = new GridView(container);
    gv.setDataSource(dp);
    dp.setFields(fields);
    gv.setColumns(columns);
    dp.setRows(tableData);

    gv.setOptions({
      indicator: { visible: true },
      checkBar: { visible: false },
      stateBar: { visible: true },
      edit: { insertable: true, appendable: true },
    });

    gv.onSelectionChanged = () => {
      const itemIndex: any = gv.getCurrent().itemIndex;
      setSelected(tableData[itemIndex]);
    };

    dp.onRowUpdated = async (provider: any, row: any) => {
      const item = gv.getEditingItem();
      console.log("item:", item.values);
      // await dispatch(updateEmployee(item.values));
      // await dispatch(getEmployees());
    };

    return () => {
      dp.clearRows();
      gv.destroy();
      dp.destroy();
    };
  }, [tableData]);

  const getFormValues = (e: Object) => {
    console.log("getFormValues daragdav", e);
  };

  if (!tableData) return <p>...loading</p>;

  return (
    <Wrapper>
      <TableWrapper ref={realgridElement}></TableWrapper>
      <DetailWrapper>
        <DetailHeader>
          <p>{name}</p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button
              text="등록"
              icon={<Plus />}
              style={{ marginRight: "5px" }}
            />
            <Button
              text="삭제"
              icon={<Trash />}
              style={{ marginRight: "5px" }}
            />
            <Button
              text="저장"
              icon={<Tick />}
              style={{ marginRight: "5px" }}
            />
            <Button text="취소" icon={<X />} style={{ marginRight: "15px" }} />

            <div>
              <Chat />
              <CloseCircle />
            </div>
          </div>
        </DetailHeader>
        <Form selectedCustomer={selected} getFormValues={getFormValues} />
      </DetailWrapper>
    </Wrapper>
  );
}

export default EN100;
