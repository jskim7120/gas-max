import { useEffect, useRef } from "react";
import { GridView, LocalDataProvider } from "realgrid";
import { addRowIndex } from "app/state/tab/tabSlice";
import { useDispatch } from "app/store";
import { setContextMenu } from "components/realgrid/contextmenu";


function Grid({
  areaCode,
  data,
  fields,
  columns,
  setSelected,
  style,
  evenFill,
  layout,
  menuId,
  rowIndex,
  gridNumber,
  hideFooter,
}: {
  areaCode?: string;
  data: any;
  fields: any;
  columns: any;
  setSelected?: Function;
  style?: any;
  evenFill?: boolean;
  layout?: any;
  menuId: string;
  rowIndex: number | undefined;
  gridNumber?: number | undefined;
  hideFooter?: boolean;
}) {
  let container: HTMLDivElement;
  let dp: any;
  let gv: any;
  const realgridElement = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(setContextMenu);
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

    if (hideFooter) {
      gv.setFooter({ visible: false });
    }

    if (evenFill) {
      gv.displayOptions.fitStyle = "evenFill";
    }

    if (areaCode !== "00") {
      gv.removeColumn("areaCode");
    }

    gv.displayOptions.useFocusClass = true;
    
    // gv.onDataLoadComplated 
    gv.onScrollToBottom = () => {
      gv.setCurrent({
        dataRow: rowIndex,
      });
    }
    
    gv.onSelectionChanged = () => {
      const itemIndex: any = gv.getCurrent().dataRow;
      setSelected && setSelected(data[itemIndex]);
      dispatch(
        addRowIndex({
          menuId: menuId,
          grid: gridNumber ? gridNumber : 0,
          row: itemIndex,
        })
      );
    };

    setContextMenu(gv, menuId);

    return () => {
      dp.clearRows();
      gv.destroy();
      dp.destroy();
    };
  }, [data]);

  return <div style={style} ref={realgridElement}></div>;
}

export default Grid;
