import { useEffect, useRef } from "react";
import { GridView, LocalDataProvider } from "realgrid";

function Grid({
  data,
  fields,
  columns,
  setSelected,
  selectedRowIndex,
  setSelectedRowIndex,
  style,
}: {
  data: any;
  fields: any;
  columns: any;
  setSelected: Function;
  selectedRowIndex: number | null;
  setSelectedRowIndex: Function;
  style?: any;
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
    //gv.displayOptions.fitStyle = "evenFill";
    gv.setEditOptions({ editable: false });

    gv.onScrollToBottom = () => {
      gv.setCurrent({
        dataRow: selectedRowIndex,
      });
    }

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

  return <div ref={realgridElement} style={style}></div>;
}

export default Grid;
