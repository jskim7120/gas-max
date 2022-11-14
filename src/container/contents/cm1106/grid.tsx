import React, { useEffect, useRef } from "react";
import { columns, fields } from "./data";
import { GridView, LocalDataProvider } from "realgrid";
export default function Grid({ data }: { data: any }) {
  const realgridElement = useRef<HTMLDivElement>(null);

  let container: HTMLDivElement;
  let dp: any;
  let gv: any;

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
    gv.setFooter({ visible: false });
    gv.setOptions({
      indicator: { visible: true },
      checkBar: { visible: false },
      stateBar: { visible: false },
    });
    gv.sortingOptions.enabled = true;
    gv.displayOptions._selectionStyle = "singleRow";
    gv.setEditOptions({ editable: false });
    // gv.setCurrent({
    //   dataRow: selectedRowIndex,
    // });

    gv.onSelectionChanged = () => {
      const itemIndex: any = gv.getCurrent().dataRow;
    };

    return () => {
      dp.clearRows();
      gv.destroy();
      dp.destroy();
    };
  }, [data]);

  return (
    <div
      style={{ width: "60%", borderRight: "1px solid #000" }}
      ref={realgridElement}
    ></div>
  );
}
