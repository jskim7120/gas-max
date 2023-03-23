import React, { useEffect, useRef } from "react";
import { GridView, LocalDataProvider } from "realgrid";

let container: HTMLDivElement;
let dp: any;
let gv: any;
let selectedRowIndex: number = 0;

function Grid({
  data,
  columns,
  fields,
  setSelected,
  openPopup,
  cm1105PopUp,
  areaCode,
}: {
  data: any;
  columns: any;
  fields: any;
  setSelected?: any;
  openPopup?: any;
  cm1105PopUp?: any;
  areaCode: string;
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
    gv.setHeader({
      height: 35,
    });

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

    if (areaCode !== "00") {
      gv.removeColumn("areaCode");
    }

    gv.onSelectionChanged = () => {
      const itemIndex: any = gv.getCurrent().dataRow;
      setSelected(data[itemIndex]);
    };

    gv.onCellDblClicked = function (grid: any, e: any) {
      openPopup && openPopup();
    };

    return () => {
      dp.clearRows();
      gv.destroy();
      dp.destroy();
    };
  }, [data, cm1105PopUp]);

  return (
    <div
      style={{
        width: "100%",
        height: `calc(100% - 271px)`,
      }}
      ref={realgridElement}
    ></div>
  );
}

export default Grid;
