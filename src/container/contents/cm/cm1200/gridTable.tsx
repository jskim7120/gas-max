import { addCM1105 } from "app/state/modal/modalSlice";
import { useDispatch } from "app/store";
import { useEffect, useRef, useState } from "react";
import { GridView, LocalDataProvider } from "realgrid";
import { fieldsSelected, columnsSelected } from "./data";
import { ICM120065USERINFO } from "./modul";

let containerr: HTMLDivElement;
let dp: any;
let gv: any;

function GridTable({ selected, openPopup }: { selected: any; openPopup: any }) {
  const dispatch = useDispatch();
  const realgridTableElement = useRef<HTMLDivElement>(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);

  const [data, setData] = useState([{} as ICM120065USERINFO]);

  useEffect(() => {
    if (selected) {
      return setData(selected);
    }
  }, [selected]);

  useEffect(() => {
    containerr = realgridTableElement.current as HTMLDivElement;
    dp = new LocalDataProvider(true);
    gv = new GridView(containerr);

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
      "cuUsernam",
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

    gv.setCurrent({
      dataRow: selectedRowIndex,
    });

    gv.onSelectionChanged = () => {
      const itemIndex: any = gv.getCurrent().dataRow;
      dispatch(
        addCM1105({
          cuCode: data[itemIndex].cuCode,
          areaCode: selected?.areaCode,
        })
      );
      setSelectedRowIndex(itemIndex);
    };

    gv.onCellDblClicked = function (grid: any, e: any) {
      const itemIndex: any = e.dataRow;
      // openPopup && openPopup(itemIndex, data[itemIndex].cuCode, areaCode);
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
      style={{ width: "100%", height: "200px" }}
    />
  );
}

export default GridTable;