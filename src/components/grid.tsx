import { is } from "immer/dist/internal";
import { useEffect, useRef } from "react";
import { GridView, LocalDataProvider } from "realgrid";

function Grid({
  areaCode,
  data,
  fields,
  columns,
  setSelected,
  selectedRowIndex,
  setSelectedRowIndex,
  style,
  evenFill,
  layout,
  setIsCancelBtnDisabled,
  setIsAddBtnClicked,
  setIsCancelBtnDisabled2,
  setIsAddBtnClicked2,
  isEditable = false,
  calc,
  isSortable = true,
}: {
  areaCode?: string;
  data: any;
  fields: any;
  columns: any;
  setSelected?: Function;
  selectedRowIndex?: Number;
  setSelectedRowIndex?: Function;
  style?: any;
  evenFill?: boolean;
  layout?: any;
  setIsCancelBtnDisabled?: Function;
  setIsAddBtnClicked?: Function;
  setIsCancelBtnDisabled2?: Function;
  setIsAddBtnClicked2?: Function;
  isEditable?: boolean;
  calc?: Function;
  isSortable?: boolean;
}) {
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
    if (layout) {
      gv.setColumnLayout(layout);
    }
    dp.setRows(data);
    gv.setHeader({ height: 35 });
    gv.setOptions({
      indicator: { visible: true },
      checkBar: { visible: false },
      stateBar: { visible: false },
      footer: { visible: false },
    });
    gv.sortingOptions.enabled = isSortable;
    gv.displayOptions._selectionStyle = "singleRow";

    if (evenFill) {
      gv.displayOptions.fitStyle = "evenFill";
    }

    if (areaCode !== "00") {
      gv.removeColumn("areaCode");
    }

    const options = {
      edit: {
        editable: isEditable,
      },
    };
    gv.setOptions(options);

    gv.displayOptions.useFocusClass = true;
    gv.setCurrent({
      dataRow: selectedRowIndex,
    });

    gv.onCellClicked = (grid: GridView, itemIndex: any, column: any) => {
      if (
        itemIndex.column === "cuChkamt" ||
        (itemIndex.column === "guChkamt" && itemIndex.cellType !== "header")
      ) {
        // Get the new value of the checkbox
        const newValue = !grid.getValue(
          gv.getCurrent().dataRow,
          itemIndex.column
        );
        // Set the new value of the checkbox
        gv.setValue(gv.getCurrent().dataRow, itemIndex.column, newValue);
        if (gv.getCurrent().dataRow !== undefined) {
          calc && calc(gv.getCurrent().dataRow, newValue ? "Y" : "N");
        }
      }
    };

    // if (setSelected) {
    gv.onSelectionChanged = () => {
      const itemIndex: any = gv.getCurrent().dataRow;

      setSelected && setSelected(data[itemIndex]);
      setSelectedRowIndex && setSelectedRowIndex(itemIndex);

      setIsCancelBtnDisabled && setIsCancelBtnDisabled(true);
      setIsAddBtnClicked && setIsAddBtnClicked(false);

      setIsCancelBtnDisabled2 && setIsCancelBtnDisabled2(true);
      setIsAddBtnClicked2 && setIsAddBtnClicked2(false);
    };
    gv.setCheckBar({ exclusive: true });
    // gv.onEditCommit = (id: any, index: any, oldValue: any, newValue: any) => {
    //   calc && calc(index.dataRow, newValue);
    //   gv.commit(false);
    //   // gv.cancel();
    // };

    return () => {
      dp.clearRows();
      gv.destroy();
      dp.destroy();
    };
  }, [data]);

  return <div style={style} ref={realgridElement}></div>;
}

export default Grid;
