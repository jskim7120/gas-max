import { useEffect, useRef } from "react";
import { GridView, LocalDataProvider } from "realgrid";
import { useDispatch } from "app/store";
import { fields, columns } from "./data";

function Grid({ data }: { data: any }) {
  const realgridElement = useRef<HTMLDivElement>(null);
  let container: HTMLDivElement;
  let dp: any;
  let gv: any;

  const dispatch = useDispatch();

  console.log("----------------", data);

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
          height: "275px",
          width: "100%",
          border: "1px solid #a6a6a6",
          padding: "10px 20px",
          borderRadius: "3px",
        }}
        ref={realgridElement}
      ></div>
    </>
  );
}

export default Grid;
