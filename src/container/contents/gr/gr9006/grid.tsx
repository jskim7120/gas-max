import { useEffect, useRef } from "react";
import { GridView, LocalDataProvider } from "realgrid";
import { columns1, fields1 } from "./data/data1";
import { columns2, fields2 } from "./data/data2";

let container: HTMLDivElement;
let dp: any;
let gv: any;
let fields: any = [];
let columns: any = [];

function Grid({ data, reportType }: { data: any; reportType: string }) {
  switch (reportType) {
    case "0":
      fields = fields1;
      columns = columns1;
      break;
    case "1":
      fields = fields2;
      columns = columns2;
      break;
  }

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

    return () => {
      dp.clearRows();
      gv.destroy();
      dp.destroy();
    };
  }, [data, reportType]);

  return (
    <div
      style={{
        width: "100%",
        height: `calc(100% - 37px)`,
      }}
      ref={realgridElement}
    ></div>
  );
}

export default Grid;
