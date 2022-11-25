import { useEffect, useRef } from "react";
import { GridView, LocalDataProvider } from "realgrid";
import { fields, columns } from "./data";

function Grid({ data, setData }: { data: any; setData: any }) {
  let container: HTMLDivElement;
  let dp: any;
  let gv: any;
  const realgridElement = useRef<HTMLDivElement>(null);

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
    gv.setEditOptions({ editable: true });

    gv.onSelectionChanged = () => {
      const itemIndex: any = gv.getCurrent().dataRow;
    };

    gv.onEditCommit = (id: any, index: any, oldValue: any, newValue: any) => {
      data[index.dataRow][index.fieldName] = Number(newValue);
      setData(data);
    };

    return () => {
      dp.clearRows();
      gv.destroy();
      dp.destroy();
    };
  }, [data]);

  return <div ref={realgridElement} style={{ height: "300px" }}></div>;
}

export default Grid;
