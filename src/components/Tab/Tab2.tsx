import { useDispatch, useSelector } from "app/store";
import { GridView, LocalDataProvider } from "realgrid";
import { columns, fields } from "./employee-data";
import { useEffect, useState, useRef } from "react";
import "realgrid/dist/realgrid-style.css";

function Tab2() {
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.employees.employees);

  // const [dataProvider, setDataProvider] = useState(null);
  // const [gridView, setGridView] = useState(null);
  const realgridElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container: HTMLDivElement = realgridElement.current as HTMLDivElement;
    const dp = new LocalDataProvider(true);
    const gv = new GridView(container);

    gv.setDataSource(dp);
    dp.setFields(fields);
    gv.setColumns(columns);
    dp.setRows(rows);

    // setDataProvider(dp);
    // setGridView(gv);

    return () => {
      dp.clearRows();
      gv.destroy();
      dp.destroy();
    };
  }, []);

  return (
    <div className="App">
      <h2>RealGrid2 React Sample</h2>
      <div
        style={{ height: "500px", width: "100%" }}
        ref={realgridElement}
      ></div>
    </div>
  );
}

export default Tab2;
