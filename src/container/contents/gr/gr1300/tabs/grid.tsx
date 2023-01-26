import { useEffect, useRef } from "react";
import { GridView, LocalDataProvider } from "realgrid";
import { fields1, columns1 } from "./data1";
import { useDispatch } from "app/store";
import { addGR1300, openModal } from "app/state/modal/modalSlice";
// import { fields2, columns2, layout2 } from "./data2";

function Grid({
  data65,
  tabId,
  openPopup,
  setRowIndex,
  selected,
}: {
  data65: any;
  tabId: number;
  openPopup: Function;
  setRowIndex: Function;
  selected: any;
}) {
  const realgridElement = useRef<HTMLDivElement>(null);
  let container: HTMLDivElement;
  let dp: any;
  let gv: any;

  const dispatch = useDispatch();

  useEffect(() => {
    container = realgridElement.current as HTMLDivElement;
    dp = new LocalDataProvider(true);
    gv = new GridView(container);

    gv.setDataSource(dp);

    dp.setFields(fields1);
    gv.setColumns(columns1);
    dp.setRows(data65);
    gv.columnByName("bblBpName").buttonVisibility = "always";

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
      if (selected) {
        dispatch(
          addGR1300({
            index: index.dataRow,
            areaCode: selected?.areaCode,
            bbBuCode: selected?.bbBuCode,
            bbType: selected?.bbType ? selected?.bbType : "0", //daraa n "0"-iig hasah
          })
        );
        dispatch(openModal({ type: "gr1300Modal" }));
      }
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
