import { useEffect, useRef } from "react";
import { useDispatch } from "app/store";
import { GridView, LocalDataProvider } from "realgrid";
import { fields, columns } from "./data";
import { closeModal } from "app/state/modal/modalSlice";
import { addInfo } from "app/state/modal/footerSlice";

function Grid({ data, setSelected }: { data: any; setSelected: Function }) {
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

    gv.onSelectionChanged = () => {
      const itemIndex: any = gv.getCurrent().dataRow;
      setSelected(data[itemIndex]);
    };

    gv.onCellDblClicked = function (grid: any, e: any) {
      const itemIndex: any = gv.getCurrent().dataRow;
      if (JSON.stringify(data[itemIndex]) !== "{}") {
        dispatch(addInfo({ info: data[itemIndex] }));
        dispatch(closeModal());
      } else {
        alert("please choose row from grid ");
      }
    };

    return () => {
      dp.clearRows();
      gv.destroy();
      dp.destroy();
    };
  }, [data]);

  return <div ref={realgridElement} style={{ height: "470px" }}></div>;
}

export default Grid;
