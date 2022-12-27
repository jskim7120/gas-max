import { useEffect, useRef } from "react";
import { GridView, LocalDataProvider } from "realgrid";
import { fields, columns } from "./data";

let container: HTMLDivElement;
let dp: any;
let gv: any;

function Grid({
  data,
  setSelected,
  selectedRowIndex,
  setSelectedRowIndex,
}: {
  data: any;
  setSelected: Function;
  selectedRowIndex: Number;
  setSelectedRowIndex: Function;
}) {
  const realgridElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    container = realgridElement.current as HTMLDivElement;
    dp = new LocalDataProvider(true);
    gv = new GridView(container);

    gv.setDataSource(dp);
    dp.setFields(fields);
    gv.setColumns(columns);
    dp.setRows(data);
    gv.setHeader({ height: 35, heightFill: "fixed" });
    gv.setOptions({
      indicator: { visible: true },
      checkBar: { visible: false },
      stateBar: { visible: false },
    });
    gv.sortingOptions.enabled = true;
    gv.displayOptions._selectionStyle = "singleRow";
    gv.displayOptions.fitStyle = "evenFill";
    gv.setEditOptions({ editable: false });

    gv.displayOptions.useFocusClass = true;
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
  }, [data]);

  return (
    <div style={{ width: "100%", height: "93%" }} ref={realgridElement}></div>
  );
}

export default Grid;
