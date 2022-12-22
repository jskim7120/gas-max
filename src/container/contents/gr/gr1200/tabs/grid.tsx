import { useEffect, useRef } from "react";
import { GridView, LocalDataProvider } from "realgrid";
import { fields1, columns1, layout1 } from "./data1";
import { fields2, columns2, layout2 } from "./data2";
import { fields3, columns3 } from "./data3";
import Tab1Footer from "./tab1Footer";
import Tab2Footer from "./tab2Footer";

function Grid({
  data,
  data2,
  tabId,
  openPopup,
  setRowIndex,
}: {
  data: any;
  data2: any;
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
      gv.setColumnLayout(layout1);
      gv.columnByName("bclJpName").buttonVisibility = "always";
    }

    if (tabId === 1) {
      dp.setFields(fields2);
      gv.setColumns(columns2);
      gv.setColumnLayout(layout2);
      gv.columnByName("bclJpName").buttonVisibility = "always";
    }

    if (tabId === 2) {
      dp.setFields(fields3);
      gv.setColumns(columns3);
    }

    dp.setRows(data);

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

    gv.onCellDblClicked = function (grid: any, e: any) {};

    gv.onCellButtonClicked = function (grid: any, index: any, column: any) {
      // alert(`itemIndex: ${index.itemIndex}, fieldName: ${column.fieldName}`);
      openPopup();
    };

    return () => {
      dp.clearRows();
      gv.destroy();
      dp.destroy();
    };
  }, [data, tabId]);
  return (
    <>
      <div
        style={{
          height: `180px`,
        }}
        ref={realgridElement}
      ></div>
      {tabId === 0 && <Tab1Footer data={data2} />}
      {tabId === 1 && <Tab2Footer />}
    </>
  );
}

export default Grid;
