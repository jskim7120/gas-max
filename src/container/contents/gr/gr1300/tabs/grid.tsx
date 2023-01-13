import { useEffect, useRef } from "react";
import { GridView, LocalDataProvider } from "realgrid";
import { fields1, columns1 } from "./data1";
// import { fields2, columns2, layout2 } from "./data2";

function Grid({
  data,
  data65,
  tabId,
  openPopup,
  setRowIndex,
}: {
  data: any;
  data65: any;
  tabId: number;
  openPopup: Function;
  setRowIndex: Function;
}) {
  const realgridElement = useRef<HTMLDivElement>(null);
  let container: HTMLDivElement;
  let dp: any;
  let gv: any;

  useEffect(() => {
    container = realgridElement.current as HTMLDivElement;
    dp = new LocalDataProvider(true);
    gv = new GridView(container);

    gv.setDataSource(dp);

    if (tabId === 0) {
      dp.setFields(fields1);
      gv.setColumns(columns1);
    }

    if (tabId === 1) {
      dp.setFields(fields1);
      gv.setColumns(columns1);
    }
    dp.setRows(data65);

    gv.setFooter({ visible: false });
    gv.setOptions({
      indicator: { visible: true },
      checkBar: { visible: false },
      stateBar: { visible: false },
    });

    gv.sortingOptions.enabled = true;
    gv.displayOptions._selectionStyle = "singleRow";
    gv.displayOptions.fitStyle = "evenFill";
    gv.setEditOptions({ editable: true });

    gv.onSelectionChanged = () => {
      const itemIndex: any = gv.getCurrent().dataRow;
      setRowIndex(itemIndex);
    };

    gv.onCellButtonClicked = function (grid: any, index: any, column: any) {
      // alert(`itemIndex: ${index.itemIndex}, fieldName: ${column.fieldName}`);
      openPopup();
    };

    return () => {
      dp.clearRows();
      gv.destroy();
      dp.destroy();
    };
  }, [data65, tabId]);
  return (
    <>
      <div
        style={{
          height: `220px`,
        }}
        ref={realgridElement}
      ></div>
    </>
  );
}

export default Grid;
