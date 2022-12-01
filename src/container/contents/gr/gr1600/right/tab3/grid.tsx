import { useEffect, useRef, useState } from "react";
import { GridView, LocalDataProvider } from "realgrid";
import { fields, col1, col2, col3, vatKind, dangaType } from "./data";

function Grid({
  data,
  setData,
  setCommitedRowId,
  values1,
  values2,
  labels1,
  labels2,
}: {
  data: any;
  setData: any;
  setCommitedRowId: any;
  values1: any;
  values2: any;
  labels1: any;
  labels2: any;
}) {
  let container: HTMLDivElement;
  let dp: any;
  let gv: any;

  const realgridElement = useRef<HTMLDivElement>(null);

  const [columns, setColumns] = useState<Array<any>>([]);

  useEffect(() => {
    if (values1 && values2 && labels1 && labels2) {
      dangaType.values = values1;
      dangaType.labels = labels1;

      vatKind.values = values1;
      vatKind.labels = labels1;

      setColumns([...col1, dangaType, ...col2, vatKind, ...col3]);
    }
  }, [values1, values2, labels1, labels2]);

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
    gv.setEditOptions({ editable: true });

    gv.onEditCommit = (id: any, index: any, oldValue: any, newValue: any) => {
      data[index.dataRow][index.fieldName] = newValue;
      setData(data);
      setCommitedRowId(index.dataRow);
    };

    return () => {
      dp.clearRows();
      gv.destroy();
      dp.destroy();
    };
  }, [data, columns]);

  return <div ref={realgridElement} style={{ height: "400px" }}></div>;
}

export default Grid;
