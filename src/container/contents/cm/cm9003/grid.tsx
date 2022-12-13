import { useEffect, useRef } from "react";
import { GridView, LocalDataProvider } from "realgrid";
import { columns0, fields0 } from "./data/data0";
import { columns1, fields1 } from "./data/data1";
import { columns2, fields2 } from "./data/data2";
import { columns3, fields3 } from "./data/data3";
import { columns4, fields4 } from "./data/data4";
import { columns5, fields5 } from "./data/data5";
import { columns6, fields6 } from "./data/data6";

let container: HTMLDivElement;
let dp: any;
let gv: any;
let fields: any = [];
let columns: any = [];

function Grid({ data, reportKind }: { data: any; reportKind: string }) {
  switch (reportKind) {
    case "0":
      fields = fields0;
      columns = columns0;
      break;
    case "1":
      fields = fields1;
      columns = columns1;
      break;
    case "2":
      fields = fields2;
      columns = columns2;
      break;
    case "3":
      fields = fields3;
      columns = columns3;
      break;
    case "4":
      fields = fields4;
      columns = columns4;
      break;
    case "5":
      fields = fields5;
      columns = columns5;
      break;
    case "6":
      fields = fields6;
      columns = columns6;
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
        width: "100%",
        height: `calc(100% - 37px)`,
      }}
      ref={realgridElement}
    ></div>
  );
}

export default Grid;
