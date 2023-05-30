import { useEffect, useRef } from "react";
import { GridView, LocalDataProvider } from "realgrid";
import { useDispatch } from "app/store";
import { addCM1105 } from "app/state/modal/modalSlice";
import { fieldsSelected, columnsSelected } from "./data";

function GridTable({
  data,
  areaCode,
  setSelectedUserInfo,
  openPopup,
  selected,
}: {
  data: any;
  areaCode: string | undefined;
  setSelectedUserInfo: Function;
  openPopup?: any;
  selected?: any;
}) {
  let container: HTMLDivElement;
  let dp: any;
  let gv: any;
  const realgridTableElement = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    container = realgridTableElement.current as HTMLDivElement;
    dp = new LocalDataProvider(true);
    gv = new GridView(container);

    gv.setDataSource(dp);
    dp.setFields(fieldsSelected);
    gv.setColumns(columnsSelected);
    dp.setRows(data);
    gv.setHeader({
      height: 35,
    });
    gv.setFooter({ visible: false });
    gv.setOptions({
      indicator: { visible: true },
      checkBar: { visible: false },
      stateBar: { visible: false },
      itemIndex: { visible: false },
    });
    gv.setColumnLayout([
      "cuCode",
      "cuUsername",
      "cuTel",
      "cuAnkum",
      "cuCdc",
      "cuPer",

      {
        name: "㎥ 단가",
        directions: "horizontal",
        hideChildHeaders: true,
        items: ["cuRdangaTypeName", "cuRdanga"],
      },
      "cuJungumdate",
      "cuCmisu",
      "cuSukumtype",
      "cuStae",
    ]);
    gv.sortingOptions.enabled = true;
    gv.displayOptions._selectionStyle = "singleRow";
    gv.setEditOptions({ editable: false });

    gv.onSelectionChanged = () => {
      const itemIndex: any = gv.getCurrent().dataRow;

      setSelectedUserInfo(data[itemIndex]);
    };

    gv.onCellDblClicked = function (grid: any, e: any) {
      const itemIndex: any = grid.getCurrent().dataRow;
      openPopup &&
        openPopup({
          cuCode: data[itemIndex].cuCode,
          areaCode: selected.areaCode,
          status: "UPDATE",
        });
    };

    return () => {
      dp.clearRows();
      gv.destroy();
      dp.destroy();
    };
  }, [data]);

  return (
    <div
      ref={realgridTableElement}
      style={{ width: "100%", height: "310px" }}
    />
  );
}

export default GridTable;
