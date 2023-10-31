import { useEffect, useRef } from "react";
import { GridView, LocalDataProvider } from "realgrid";
import { addRowIndex } from "app/state/tab/tabSlice";
import { useDispatch } from "app/store";

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
  changeState,
}: {
  areaCode?: string;
  data: any;
  fields: any;
  columns: any;
  setSelected: Function;
  style?: any;
  evenFill?: boolean;
  layout?: any;
  menuId: string;
  rowIndex: number | undefined;
  gridNumber?: number | undefined;
  hideFooter?: boolean;
  changeState: Function;
}) {
  let container: HTMLDivElement;
  let dp: any;
  let gv: any;
  const realgridElement = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

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
    gv.displayOptions.emptyMessage = "표시할 데이타가 없습니다.";

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

    gv.onScrollToBottom = () => {
      gv.setCurrent({
        dataRow: rowIndex,
      });
    };

    gv.onSelectionChanged = (grid: any, index: any) => {
      const itemIndex: any = gv.getCurrent().dataRow;
      setSelected(itemIndex);
      dispatch(
        addRowIndex({
          menuId: menuId,
          grid: gridNumber ? gridNumber : 0,
          row: itemIndex,
        })
      );
    };
    gv.onEditChange = function (grid: any, index: any, value: any) {
      if (index.column === "salestateName") {
        changeState(value, index.dataRow);
      }
    };

    return () => {
      gv.commit();
      dp.clearRows();
      gv.destroy();
      dp.destroy();
    };
  }, [data]);

  return <div style={style} className="AR1100" ref={realgridElement}></div>;
}

export default Grid;
