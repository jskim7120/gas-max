import { useEffect, useRef, useState } from "react";
import { GridView, LocalDataProvider } from "realgrid";
import { fieldsSelected, columnsSelected } from "./data";

let containerr: HTMLDivElement;
let dp: any;
let gv: any;

function GridTable({ selected }: { selected: any }) {
  const realgridTableElement = useRef<HTMLDivElement>(null);
  const [data, setData] = useState([{}]);

  useEffect(() => {
    if (selected) {
      return setData([selected]);
    }
  }, [selected]);

  useEffect(() => {
    containerr = realgridTableElement.current as HTMLDivElement;
    dp = new LocalDataProvider(true);
    gv = new GridView(containerr);

    gv.setDataSource(dp);
    dp.setFields(fieldsSelected);
    gv.setColumns(columnsSelected);
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

    return () => {
      dp.clearRows();
      gv.destroy();
      dp.destroy();
    };
  }, [data]);

  return (
    <div
      ref={realgridTableElement}
      style={{ width: "100%", height: "200px" }}
    />
  );
}

export default GridTable;
