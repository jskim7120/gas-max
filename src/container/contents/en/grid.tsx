import { useEffect, useRef } from "react";
import { GridView, LocalDataProvider } from "realgrid";
import { LeftSideEN } from "../commonStyle";
import { setRowIndex } from "app/state/tab/tabSlice";
import { useDispatch } from "app/store";

function Grid({
  data,
  fields,
  columns,
  setSelected,
  setIsAddBtnClicked,
  menuId,
  style,
  rowIndex,
}: {
  data: any;
  fields: any;
  columns: any;
  setSelected: Function;
  setIsAddBtnClicked?: Function;
  menuId: string;
  style?: any;
  rowIndex: number | undefined;
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
    gv.setEditOptions({ editable: false });

    gv.displayOptions.useFocusClass = true;
    gv.setCurrent({
      dataRow: rowIndex,
    });

    gv.onSelectionChanged = () => {
      const itemIndex: any = gv.getCurrent().dataRow;
      setSelected(data[itemIndex]);
      setIsAddBtnClicked && setIsAddBtnClicked(false);
      dispatch(setRowIndex({ menuId: menuId, rowIndex: itemIndex }));
    };

    return () => {
      dp.clearRows();
      gv.destroy();
      dp.destroy();
    };
  }, [data]);

  return <LeftSideEN ref={realgridElement} style={style}></LeftSideEN>;
}

export default Grid;
