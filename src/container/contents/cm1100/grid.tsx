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
}: {
  data: any;
  columns: any;
  fields: any;
  setSelected?: any;
  openPopup?: any;
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

    // gv.onSelectionChanged = () => {
    //   const itemIndex: any = gv.getCurrent().dataRow;
    //   //   setSelected(data[itemIndex]);
    //   openPopup && openPopup(itemIndex);
    // };

    gv.onCellDblClicked = function (grid: any, e: any) {
      const itemIndex: any = e.dataRow;
      openPopup && openPopup(itemIndex);
    };
    return () => {
      dp.clearRows();
      gv.destroy();
      dp.destroy();
    };
  }, [data]);

  return (
    <div
      style={{
        width: "100%",
        height: "500px",
        borderLeft: "5px solid #707070",
      }}
      ref={realgridElement}
    ></div>
  );
}

export default Grid;
