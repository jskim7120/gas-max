import { useEffect, useRef } from "react";
import { GridView, LocalDataProvider } from "realgrid";
import { fields, columns } from "./data";

function Grid({ data }: { data: any }) {
  const realgridElement = useRef<HTMLDivElement>(null);
  let container: HTMLDivElement;
  let dp: any;
  let gv: any;

  useEffect(() => {
    if (data !== undefined && data?.length > 0) {
      container = realgridElement.current as HTMLDivElement;
      dp = new LocalDataProvider(true);
      gv = new GridView(container);
      gv.setDataSource(dp);

      dp.setFields(fields);
      gv.setColumns(columns);
      dp.setRows(data);

      // RealGrid Style
      gv.displayOptions.emptyMessage = "표시할 데이타가 없습니다.";
      gv.header.height = 40;
      gv.displayOptions.rowHeight = 30;
      gv.editOptions.insertable = true;
      gv.editOptions.appendable = true;

      gv.setFooter({ visible: false });
      gv.setOptions({
        stateBar: { visible: false },
      });
      // gv.setEditOptions({ editable: false });

      // gv.checkBar.fieldName = "misuYn";

      gv.sortingOptions.enabled = true;
      gv.displayOptions.fitStyle = "evenFill";

      // gv.onEditCommit = (id: any, index: any, oldValue: any, newValue: any) => {
      //   data[index.dataRow][index.fieldName] = newValue;

      //   console.log("oldValue:", oldValue);
      //   console.log("newValue:", newValue);

      //   // console.log("data", data[index.dataRow].gjMisujan);
      // };

      gv.setCheckBar({ editable: true });
      gv.getCheckedRows = (
        id: any,
        index: any,
        oldValue: any,
        newValue: any
      ) => {
        console.log("data", data[index.dataRow].gjMisujan);
        alert(data[index.dataRow].gjMisujan);
      };

      gv.onSelectionChanged = () => {
        const itemIndex: any = gv.getCurrent().dataRow;
      };

      return () => {
        gv.commit();
        dp.clearRows();

        gv.destroy();
        dp.destroy();

        gv = null;
        dp = null;
      };
    }
  }, [data, columns]);
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
