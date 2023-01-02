import { useEffect, useRef } from "react";
import { GridView, LocalDataProvider } from "realgrid";
import { fields, columns, layout } from "./data";

function Grid({
  data,
  setSelected,
  selectedRowIndex,
  setSelectedRowIndex,
}: {
  data: any;
  setSelected: Function;
  selectedRowIndex: number | null;
  setSelectedRowIndex: Function;
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
    gv.setColumnLayout(layout);

    dp.setRows(data);
    gv.header.heights = [25, 25];
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
    <div style={{ height: `calc(100% - 196px)` }} ref={realgridElement}></div>
  );
}

export default Grid;
