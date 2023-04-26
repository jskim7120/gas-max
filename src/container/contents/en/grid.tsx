import { useEffect, useRef } from "react";
import { GridView, LocalDataProvider } from "realgrid";
import { LeftSideEN } from "../commonStyle";

function Grid({
  data,
  fields,
  columns,
  setSelected,
  selectedRowIndex,
  setSelectedRowIndex,
  style,
  setIsCancelBtnDisabled,
  setIsAddBtnClicked,
}: {
  data: any;
  fields: any;
  columns: any;
  setSelected: Function;
  selectedRowIndex: number | null;
  setSelectedRowIndex: Function;
  style?: any;
  setIsCancelBtnDisabled?: Function;
  setIsAddBtnClicked?: Function;
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
    gv.setEditOptions({ editable: false });

    gv.displayOptions.useFocusClass = true;
    gv.setCurrent({
      dataRow: selectedRowIndex,
    });

    gv.onSelectionChanged = () => {
      const itemIndex: any = gv.getCurrent().dataRow;
      setSelected(data[itemIndex]);
      setSelectedRowIndex(itemIndex);

      setIsCancelBtnDisabled && setIsCancelBtnDisabled(true);
      setIsAddBtnClicked && setIsAddBtnClicked(false);
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
