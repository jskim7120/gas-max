import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "app/store";
import { GridView, LocalDataProvider } from "realgrid";
import Button from "components/button/button";
import { Plus, Trash, Tick, X, Chat, CloseCircle } from "components/allSvgIcon";
import { columns, fields } from "./data";
import Form from "./form";
import { Wrapper, TableWrapper, DetailWrapper, DetailHeader } from "./style";
import { ButtonType, ButtonColor } from "components/componentsType";

let tableData: any;
let container: HTMLDivElement;
let dp: any;
let gv: any;

function EN100({ name }: { name: string }) {
  const dispatch = useDispatch();
  const formRef = useRef<any>(null);
  const [selected, setSelected] = useState();
  const [clickedButton, setClickedButton] = useState("");
  // tableData = useSelector((state) => state.employees.employees);
  tableData = [
    { areaCode: "00", areaName: "123456789123456789" },
    { areaCode: "01", areaName: "777777777777777777" },
    { areaCode: "02", areaName: "222222222222222222" },
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
      console.log("itemIndex:", itemIndex);
      setSelected(tableData[itemIndex]);
      setClickedButton("");
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
    <>
      <DetailHeader>
        <p>{name}</p>
        <div className="buttons">
          <Button
            text="등록"
            icon={<Plus />}
            style={{ marginRight: "5px" }}
            onClick={() => {
              setClickedButton("clear");
              console.log("formRef:", formRef.current);
            }}
          />
          <Button
            text="삭제"
            icon={<Trash />}
            style={{ marginRight: "5px" }}
            onClick={() => console.log("delete daragdav")}
          />
          <Button
            text="저장"
            icon={<Tick />}
            style={{ marginRight: "5px" }}
            onClick={() => setClickedButton("update")}
            color={ButtonColor.SECONDARY}
          />
          <Button
            text="취소"
            icon={<X />}
            style={{ marginRight: "15px" }}
            onClick={() => setClickedButton("reset")}
          />
          <div>
            <Chat />
            <CloseCircle />
          </div>
        </div>
      </DetailHeader>
      <Wrapper>
        <TableWrapper ref={realgridElement}></TableWrapper>
        <DetailWrapper>
          <Form
            selected={selected}
            getFormValues={getFormValues}
            ref={formRef}
          />
        </DetailWrapper>
      </Wrapper>
    </>
  );
}

export default EN100;