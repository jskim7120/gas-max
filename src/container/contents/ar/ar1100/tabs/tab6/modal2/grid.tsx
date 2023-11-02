import { useEffect, useRef } from "react";
import { GridView, LocalDataProvider } from "realgrid";
import { fields, columns } from "./data";

function Grid({
  data,
  getSumOfChecked,
  setSelectedIndexes,
}: {
  data: any;
  getSumOfChecked: Function;
  setSelectedIndexes: Function;
}) {
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

      gv.setFooter({ visible: false });
      gv.setOptions({
        stateBar: { visible: false },
      });

      gv.header.height = 35;
      gv.sortingOptions.enabled = false;
      gv.displayOptions.fitStyle = "evenFill";
      gv.displayOptions.columnMovable = false;
      gv.displayOptions.emptyMessage = "표시할 데이타가 없습니다.";
      //gv.displayOptions.rowHeight = 30;

      gv.onItemChecked = (grid: any, index: any) => {
        const items = gv.getCheckedItems();
        setSelectedIndexes(items);
        getSumOfChecked(items);
      };
      gv.onItemAllChecked = (grid: any, index: any) => {
        const items = gv.getCheckedItems();
        setSelectedIndexes(items);
        getSumOfChecked(items);
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
          height: "300px",
          width: "100%",
          border: "1px solid #a6a6a6",
        }}
        ref={realgridElement}
      ></div>
    </>
  );
}

export default Grid;
