import { useEffect, useRef } from "react";
import { GridView, LocalDataProvider } from "realgrid";

function Grid({
  areaCode,
  data,
  fields,
  columns,
  style,
  evenFill,
  layout,
  rowIndex,
}: {
  areaCode?: string;
  data: any;
  fields: any;
  columns: any;
  style?: any;
  evenFill?: boolean;
  layout?: any;
  rowIndex: number | undefined;
}) {
  let container: HTMLDivElement;
  let dp: any;
  let gv: any;
  const realgridElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    container = realgridElement.current as HTMLDivElement;
    dp = new LocalDataProvider(true);
    gv = new GridView(container);

    gv.setDataSource(dp);
    dp.setFields(fields);
    gv.setColumns(columns);
    if (layout) {
      gv.setColumnLayout(layout);
    }
    dp.setRows(data);
    gv.setHeader({ height: 35 });
    gv.setOptions({
      indicator: { visible: true },
      checkBar: { visible: false },
      stateBar: { visible: false },
    });
    gv.sortingOptions.enabled = true;
    gv.displayOptions._selectionStyle = "singleRow";

    if (evenFill) {
      gv.displayOptions.fitStyle = "evenFill";
    }

    if (areaCode !== "00") {
      gv.removeColumn("areaCode");
    }

    gv.displayOptions.useFocusClass = true;
    gv.setCurrent({
      dataRow: rowIndex,
    });

    gv.onSelectionChanged = () => {};

    return () => {
      dp.clearRows();
      gv.destroy();
      dp.destroy();
    };
  }, [data]);

  return <div style={style} ref={realgridElement}></div>;
}

export default Grid;
