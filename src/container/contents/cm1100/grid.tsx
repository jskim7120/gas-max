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
}: {
  data: any;
  columns: any;
  fields: any;
  setSelected?: any;
}) {
  const realgridElement = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (data.length > 0) {
      console.log("yadaj data bnu", data);
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
        checkBar: { visible: true },
        stateBar: { visible: false },
      });
      gv.sortingOptions.enabled = true;
      gv.displayOptions._selectionStyle = "singleRow";

      if (data.length > 0) {
        gv.setCurrent({
          dataRow: selectedRowIndex,
        });

        gv.onSelectionChanged = () => {
          const itemIndex: any = gv.getCurrent().dataRow;
          //   setSelected(data[itemIndex]);
        };
      }

      return () => {
        dp.clearRows();
        gv.destroy();
        dp.destroy();
      };
    }
  }, [data]);

  return (
    <div style={{ width: "100%", height: "500px" }} ref={realgridElement}></div>
  );
}

export default Grid;
