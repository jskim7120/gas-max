import { useEffect, useRef } from "react";
import { GridView, LocalDataProvider } from "realgrid";
import { useDispatch } from "app/store";

function Grid({ data, openModal }: { data: any; openModal: Function }) {
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

    gv.setFooter({ visible: false });

    dp.setRows(data);

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
    };

    gv.onCellButtonClicked = function (grid: any, index: any, column: any) {
      openModal();
    };

    gv.onEditCommit = (id: any, index: any, oldValue: any, newValue: any) => {
      gv.cancel();
    };

    return () => {
      dp.clearRows();
      gv.destroy();
      dp.destroy();
    };
  }, [data]);
  return (
    <>
      <div
        style={{
          height: "180px",
          borderBottom: "1px solid #CCC",
          marginBottom: "2px",
        }}
        ref={realgridElement}
      ></div>
    </>
  );
}

export default Grid;
