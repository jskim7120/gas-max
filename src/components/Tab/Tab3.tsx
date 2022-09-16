import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "app/store";
import { GridView, LocalDataProvider } from "realgrid";
import { columns, fields } from "./employee-data-full";
import { baseURL } from "api";
import {
  updateEmployee,
  addEmployee,
  deleteEmployee,
  getEmployees,
} from "features/employee/employeeSlice";
import { Wrapper } from "./style";

let tableData: any;
let container: HTMLDivElement;
let dp: any;
let gv: any;

function TabContent3() {
  const dispatch = useDispatch();
  tableData = useSelector((state) => state.employees.employees);
  console.log(tableData);
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

  //   const add = () => {
  //     setSelectedCustomer(emptyUser);
  //     setIsCreate(true);
  //   };

  //   const remove = async () => {
  //     await dispatch(deleteEmployee(selectedCustomer));
  //     await dispatch(getEmployees());
  //     setIsCreate(false);
  //     closeModalFunc();
  //   };

  //   const update = async () => {
  //     if (isCreate) {
  //       await dispatch(addEmployee({ ...selectedCustomer, areaCode: "20" }));
  //       setIsCreate(false);
  //     } else {
  //       await dispatch(updateEmployee(selectedCustomer));
  //     }
  //     await dispatch(getEmployees());
  //   };

  return (
    <div>
      {tableData ? (
        <Wrapper>
          <div
            style={{ height: "500px", width: "100%" }}
            ref={realgridElement}
          ></div>
        </Wrapper>
      ) : (
        <p>...loading</p>
      )}
    </div>
  );
}

export default TabContent3;
