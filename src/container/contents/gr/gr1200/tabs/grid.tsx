import { useEffect, useRef } from "react";
import { GridView, LocalDataProvider } from "realgrid";
import { fields1, columns1, layout1 } from "./data1";
import { fields2, columns2, layout2 } from "./data2";
import { fields3, columns3 } from "./data3";
import Tab1Footer from "./tab1Footer";
import Tab2Footer from "./tab2Footer";
import { useDispatch } from "app/store";
import { addGR1200, openModal } from "app/state/modal/modalSlice";

function Grid({
  data,
  setData,
  data2,
  tabId,
  setRowIndex,
  register,
  setBclInqtyLPG,
  calcTab1FooterChange,
  getValues,
}: {
  data: any;
  setData: Function;
  data2: any;
  tabId: number;
  setRowIndex: Function;
  register: Function;
  setBclInqtyLPG: Function;
  calcTab1FooterChange: Function;
  getValues: any;
}) {
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

    if (tabId === 0) {
      dp.setFields(fields1);
      gv.setColumns(columns1);
      gv.setColumnLayout(layout1);
      gv.columnByName("bclJpName").buttonVisibility = "always";
      dp.setRows(data);
    }

    if (tabId === 1) {
      dp.setFields(fields2);
      gv.setColumns(columns2);
      gv.setColumnLayout(layout2);
      gv.columnByName("bclJpName").buttonVisibility = "always";
      dp.setRows(data);
    }

    if (tabId === 2) {
      dp.setFields(fields3);
      gv.setColumns(columns3);
      dp.setRows(data);
    }

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

    gv.onSelectionChanged = () => {
      const itemIndex: any = gv.getCurrent().dataRow;
      setRowIndex(itemIndex);
    };

    gv.onCellButtonClicked = function (grid: any, index: any, column: any) {
      if (Object.keys(data2).length > 0) {
        dispatch(
          addGR1200({
            index: index.dataRow,
            areaCode: data2?.areaCode ? data2.areaCode : getValues("areaCode"),
            bcBuCode: data2?.bcBuCode ? data2.bcBuCode : getValues("bcBuCode"),
            bcChitType: data2?.bcChitType ? data2?.bcChitType : tabId, //daraa n "0"-iig hasah
          })
        );
        dispatch(openModal({ type: "gr1200Modal" }));
      }
    };

    gv.onEditCommit = (id: any, index: any, oldValue: any, newValue: any) => {
      setData((prev: any) =>
        prev.map((object: any, idx: number) => {
          if (idx === index.dataRow) {
            return {
              ...object,
              [index.fieldName]: newValue,
              isEdited: true,
            };
          } else return object;
        })
      );
      setBclInqtyLPG((prev: boolean) => !prev);
      gv.cancel();
    };

    return () => {
      dp.clearRows();
      gv.destroy();
      dp.destroy();
    };
  }, [tabId, data]);
  return (
    <>
      <div
        style={{
          height: `180px`,
          borderBottom: "1px solid #CCC",
          marginBottom: "2px",
        }}
        ref={realgridElement}
      ></div>
      {tabId === 0 && (
        <Tab1Footer
          data={data2}
          register={register}
          calcTab1FooterChange={calcTab1FooterChange}
        />
      )}
      {tabId === 1 && <Tab2Footer />}
    </>
  );
}

export default Grid;
