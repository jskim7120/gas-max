import { useDispatch, useSelector } from "app/store";
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
}: {
  data: any;
  columns: any;
  fields: any;
  setSelected?: any;
  openPopup?: any;
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
    // gv.setCurrent({
    //   dataRow: selectedRowIndex,
    // });

    gv.onSelectionChanged = () => {
      const itemIndex: any = gv.getCurrent().dataRow;
      //   setSelected(data[itemIndex]);
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
  }, [data]);

  return (
    <div
      style={{
        width: "100%",
        height: `448px`,
      }}
      ref={realgridElement}
    ></div>
  );
}

export default Grid;