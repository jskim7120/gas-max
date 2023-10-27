import { useEffect, useRef } from "react";
import { GridView, LocalDataProvider } from "realgrid";
import { useDispatch } from "app/store";
import { fields, columns } from "./data";
import { addBupum } from "app/state/modal/modalSlice";

function Grid({ data }: { data: any }) {
  const realgridElement = useRef<HTMLDivElement>(null);
  let container: HTMLDivElement;
  let dp: any;
  let gv: any;

  const dispatch = useDispatch();

  useEffect(() => {
    if (data !== undefined && data?.length > 0) {
      container = realgridElement.current as HTMLDivElement;
      dp = new LocalDataProvider(true);
      gv = new GridView(container);

      gv.setDataSource(dp);

      dp.setFields(fields);
      gv.setColumns(columns);

      gv.setFooter({ visible: false });

      dp.setRows(data);
      // gv.onGridActivated = () => {
      //   dp.setRows(data);
      // };

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

      return () => {
        gv.commit();
        dp.clearRows();
        gv.destroy();
        dp.destroy();
      };
    }
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
