import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "app/store";
import { GridView, LocalDataProvider } from "realgrid";
import { columns, fields } from "./employee-data-full";
import IconButton from "components/button";
import { baseURL } from "api";
import { PlusCircle, ArrowDownCircle } from "components/allSvgIcon";
import { updateEmployee, getEmployees } from "features/employee/employeeSlice";
import { Wrapper } from "../style";

let tableData: any;
let container: HTMLDivElement;
let dp: any;
let gv: any;

function TabContent3({ name }: { name?: string }) {
  const dispatch = useDispatch();
  tableData = useSelector((state) => state.employees.employees);
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
      //const realGridData = gv.getValues(itemIndex);
    };

    dp.onRowUpdated = async (provider: any, row: any) => {
      const item = gv.getEditingItem();
      console.log("item:", item.values);

      await dispatch(updateEmployee(item.values));
      await dispatch(getEmployees());
    };

    return () => {
      dp.clearRows();
      gv.destroy();
      dp.destroy();
    };
  }, [tableData]);

  const add = () => {
    const value = {
      areaCode: "",
      opt: 0,
      swAddr1: "",
      swAddr2: "",
      swBigo: "0",
      swCaCode: null,
      swCaName: null,
      swCode: "",
      swDriverNo: "",
      swDriverType: "",
      swGubun: "",
      swHp: "",
      swIndate: "",
      swJdate1: "",
      swJdate2: "",
      swJuminno: "",
      swName: "",
      swPaydate: "",
      swPaykum: 0,
      swPaytype: "",
      swTel: "",
      swWorkOut: "N",
      swZipcode: "",
    };
    //dp.insertRow(4, value);
    // gv.beginAppendRow();
    gv.beginInsertRow(0);
  };

  return (
    <div>
      {tableData ? (
        <>
          <Wrapper>
            <div
              style={{ height: "500px", width: "100%" }}
              ref={realgridElement}
            ></div>
          </Wrapper>
          <span>
            <IconButton
              icon={<PlusCircle color="orangered" />}
              onClick={() => add()}
              title="Add"
            />

            <IconButton
              icon={<PlusCircle color="aqua" />}
              onClick={() => add()}
              title="Update"
            />
          </span>
        </>
      ) : (
        <p>...loading</p>
      )}
    </div>
  );
}

export default TabContent3;
