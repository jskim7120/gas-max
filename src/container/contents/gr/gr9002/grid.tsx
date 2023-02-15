import { useEffect, useRef } from "react";
import { GridView, LocalDataProvider } from "realgrid";
import { columns, fields, layout } from "./data";

let container: HTMLDivElement;
let dp: any;
let gv: any;

function Grid({ data }: { data: any }) {
  const realgridElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    container = realgridElement.current as HTMLDivElement;
    dp = new LocalDataProvider(true);
    gv = new GridView(container);

    gv.setDataSource(dp);
    dp.setFields(fields);
    gv.setColumns(columns);
    gv.setColumnLayout(layout);
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

    return () => {
      dp.clearRows();
      gv.destroy();
      dp.destroy();
    };
  }, [data]);

  return (
    <div
      style={{
        height: `calc(100% - 38px)`,
      }}
      ref={realgridElement}
    ></div>
  );
}

export default Grid;