import { useEffect, useRef } from "react";
import { useDispatch } from "app/store";
import { GridView, LocalDataProvider } from "realgrid";
import { fields, columns } from "./data";
import { addGR1300, openModal } from "app/state/modal/modalSlice";

function Grid({
  data,
  setData,
  data2,
  tabId,
  setRowIndex,
  setBclInqtyLPG,
  calcTab1FooterChange,
}: {
  data: any;
  setData: Function;
  data2: any;
  tabId: number;
  setRowIndex: Function;
  setBclInqtyLPG: Function;
  calcTab1FooterChange: Function;
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

    dp.setFields(fields);
    gv.setColumns(columns);
    gv.columnByName("bblBpName").buttonVisibility = "always";

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

    gv.onCellButtonClicked = function (grid: any, index: any, column: any) {
      if (Object.keys(data2)?.length > 0) {
        dispatch(
          addGR1300({
            index: index.dataRow,
            areaCode: data2?.areaCode,
            bbBuCode: data2?.bbBuCode,
            bbType: data2?.bbType,
          })
        );
        dispatch(openModal({ type: "gr1300Modal" }));
      }
    };

    gv.onEditCommit = (id: any, index: any, oldValue: any, newValue: any) => {
      console.log(index.fieldName, index.fieldName === "bblQty");
      setData((prev: any) =>
        prev.map((object: any, idx: number) => {
          if (idx === index.dataRow) {
            if (index.fieldName === "bblQty") {
              return {
                ...object,
                [index.fieldName]: newValue,
                bblKumack: newValue * object.bblDanga,
                isEdited: true,
              };
            } else {
              return {
                ...object,
                [index.fieldName]: newValue,
              };
            }
          } else return object;
        })
      );
      setBclInqtyLPG((prev: boolean) => !prev);
      gv.cancel();
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
          height: `200px`,
          marginBottom: "2px",
        }}
        ref={realgridElement}
      ></div>
    </>
  );
}

export default Grid;
