import React, { useEffect, useRef } from "react";
import { GridView, LocalDataProvider } from "realgrid";

function Grid({
  data,
  columns,
  fields,
  setSelected,
  setSelectedRowIndex,
  style,
}: {
  data: any;
  columns: any;
  fields: any;
  setSelected?: Function;
  setSelectedRowIndex?: any;
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
      height: 30,
    });

    gv.setOptions({
      indicator: { visible: true },
      checkBar: { visible: false },
      stateBar: { visible: false },
      footer: { visible: false },
    });
    gv.sortingOptions.enabled = true;
    gv.displayOptions._selectionStyle = "singleRow";
    // gv.displayOptions.fitStyle = "evenFill";
    gv.setEditOptions({ editable: false });

    gv.onSelectionChanged = () => {
      const itemIndex: any = gv.getCurrent().dataRow;
      setSelected && setSelected(data[itemIndex]);
      setSelectedRowIndex(itemIndex);
    };

    return () => {
      dp.clearRows();
      gv.destroy();
      dp.destroy();
    };
  }, [data]);

  return (
    <div
      style={
        style
          ? style
          : {
              height: `calc(53%)`,
            }
      }
      ref={realgridElement}
    ></div>
  );
}

export default Grid;
