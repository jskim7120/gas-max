import { useEffect, useRef } from "react";
import { GridView, LocalDataProvider } from "realgrid";
import { fields1, columns1, layout1 } from "./data1";
import { fields2, columns2, layout2 } from "./data2";
import { fields3, columns3 } from "./data3";
import Tab1Footer from "./tab1Footer";
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
      gv.setFooter({ visible: false });
    }

    if (tabId === 1) {
      dp.setFields(fields2);
      gv.setColumns(columns2);
      gv.setColumnLayout(layout2);
    }

    if (tabId === 2) {
      dp.setFields(fields3);
      gv.setColumns(columns3);
      gv.setFooter({ visible: false });
    }

    dp.setRows(data);

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
      // console.log("getValues areaCode:::", getValues("areaCode"));
      // console.log("getValues bcBuCode:::", getValues("bcBuCode"));

      dispatch(
        addGR1200({
          index: index.dataRow,
          areaCode: getValues("areaCode"),
          bcBuCode: getValues("bcBuCode"),
          bcChitType: tabId, //daraa n "0"-iig hasah
        })
      );
      dispatch(openModal({ type: "gr1200Modal" }));
    };

    gv.onEditCommit = (id: any, index: any, oldValue: any, newValue: any) => {
      if (tabId === 0) {
        setData((prev: any) =>
          prev.map((object: any, idx: number) => {
            if (idx === index.dataRow) {
              if (index.fieldName === "bclInqty") {
                return {
                  ...object,
                  [index.fieldName]: newValue,
                  isEdited: true,
                };
              } else {
                return {
                  ...object,
                  [index.fieldName]: newValue,
                };
              }
            } else return object;
          })
        );
        setBclInqtyLPG((prev: boolean) => !prev);
      }
      if (tabId === 1) {
        setData((prev: any) =>
          prev.map((object: any, idx: number) => {
            if (idx === index.dataRow) {
              if (index.fieldName === "bclInqty" && object.bclCost !== null) {
                const bclVatType = object.bclVatType ? object.bclVatType : 0;
                const bclAmt = object.bclCost * newValue + bclVatType;
                return {
                  ...object,
                  [index.fieldName]: newValue,
                  bclAmt: bclAmt,
                };
              }
              if (index.fieldName === "bclCost" && object.bclInqty !== null) {
                const bclVatType = object.bclVatType ? object.bclVatType : 0;

                const bclAmt = object.bclInqty * newValue + bclVatType;
                console.log("hfdhdfhjfdj:", bclVatType);
                return {
                  ...object,
                  [index.fieldName]: newValue,
                  bclAmt: bclAmt,
                };
              }

              if (
                index.fieldName === "bclVatType" &&
                object.bclInqty !== null &&
                object.bclVatType !== null
              ) {
                const bclAmt = object.bclInqty * object.bclCost + newValue;
                return {
                  ...object,
                  [index.fieldName]: newValue,
                  bclAmt: bclAmt,
                };
              }
              return {
                ...object,
                [index.fieldName]: newValue,
              };
            } else return object;
          })
        );
      }

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
          height: `${tabId === 0 ? "180px" : "360px"}`,
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
    </>
  );
}

export default Grid;
