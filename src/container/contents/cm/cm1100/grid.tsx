import { useDispatch } from "app/store";
import React, { useEffect, useRef } from "react";
import { GridView, LocalDataProvider } from "realgrid";
import { addCM1105 } from "app/state/modal/modalSlice";

let container: HTMLDivElement;
let dp: any;
let gv: any;
let selectedRowIndex: number = 0;

function Grid({
  data,
  columns,
  fields,
  setSelected,
  openPopup,
  cm1105PopUp,
  areaCode,
}: {
  data: any;
  columns: any;
  fields: any;
  setSelected?: any;
  openPopup?: any;
  cm1105PopUp?: any;
  areaCode: string;
}) {
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
    gv.displayOptions.fitStyle = "evenFill";
    gv.setEditOptions({ editable: false });
    gv.displayOptions.useFocusClass = true;
    gv.setCurrent({
      dataRow: selectedRowIndex,
    });

    if (areaCode !== "00") {
      // gv.removeColumn("areaCode");
    }

    gv.onSelectionChanged = () => {
      const itemIndex: any = gv.getCurrent().dataRow;
      setSelected(data[itemIndex]);
      dispatch(
        addCM1105({
          cuCode: data[itemIndex].cuCode,
          areaCode: data[itemIndex].areaCode,
        })
      );
    };

    gv.onCellDblClicked = function (grid: any, e: any) {
      const itemIndex: any = e.dataRow;
      openPopup && openPopup(itemIndex);
    };
    return () => {
      dp.clearRows();
      gv.destroy();
      dp.destroy();
    };
  }, [data, cm1105PopUp]);

  return (
    <div
      style={{
        width: "100%",
        height: `calc(100% - 271px)`,
      }}
      ref={realgridElement}
    ></div>
  );
}

export default Grid;
