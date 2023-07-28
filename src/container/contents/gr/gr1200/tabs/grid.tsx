import { useEffect, useRef } from "react";
import { GridView, LocalDataProvider } from "realgrid";
import { fields1, columns1, layout1 } from "./data1";
import { fields2, columns2, layout2 } from "./data2";
import { fields3, columns3 } from "./data3";
import { useDispatch } from "app/store";
import { addGR1200Popup, openModal } from "app/state/modal/modalSlice";

function Grid({
  areaCode,
  bcBuCode,
  data,
  setData,
  tabId,
  setRowIndex,
  setCallCalc,
}: {
  areaCode: string;
  bcBuCode: any;
  data: any;
  setData: Function;
  tabId: number;
  setRowIndex: Function;
  setCallCalc: Function;
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
      dispatch(
        addGR1200Popup({
          index: index.dataRow,
          areaCode: areaCode,
          bcBuCode: bcBuCode,
          bcChitType: tabId,
        })
      );
      dispatch(openModal({ type: "gr1200Modal" }));
    };

    gv.onEditCommit = (id: any, index: any, oldValue: any, newValue: any) => {
      if (tabId === 0) {
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

        //if (index.fieldName === "bclInqty") {
        setCallCalc((prev: boolean) => !prev);
        //}
      }
      if (tabId === 1) {
        setData((prev: any) =>
          prev.map((object: any, idx: number) => {
            if (idx === index.dataRow) {
              if (index.fieldName === "bclInqty") {
                const bclAmt: number =
                  (newValue ? +newValue : 0) *
                    (object.bclKg ? +object.bclKg : 0) *
                    (object.bclCost ? +object.bclCost : 0) +
                  (object.bclVatType ? +object.bclVatType : 0);

                return {
                  ...object,
                  [index.fieldName]: newValue,
                  bclAmt: bclAmt,
                  isEdited: true,
                };
              }

              if (index.fieldName === "bclCost") {
                const bclAmt: number =
                  (object.bclInqty ? +object.bclInqty : 0) *
                    (object.bclKg ? +object.bclKg : 0) *
                    (newValue ? +newValue : 0) +
                  (object.bclVatType ? +object.bclVatType : 0);

                return {
                  ...object,
                  [index.fieldName]: newValue,
                  bclAmt: bclAmt,
                  isEdited: true,
                };
              }

              if (index.fieldName === "bclVatType") {
                const bclAmt: number =
                  (object.bclInqty ? +object.bclInqty : 0) *
                    (object.bclKg ? +object.bclKg : 0) *
                    (object.bclCost ? +object.bclCost : 0) +
                  (newValue ? +newValue : 0);

                return {
                  ...object,
                  [index.fieldName]: newValue,
                  bclAmt: bclAmt,
                  isEdited: true,
                };
              }

              return {
                ...object,
                [index.fieldName]: newValue,
                isEdited: true,
              };
            } else return object;
          })
        );

        // if (
        //index.fieldName === "bclInqty" ||
        //index.fieldName === "bclCost" ||
        //index.fieldName === "bclVatType"
        //) {
        setCallCalc((prev: boolean) => !prev);
        //}
      }

      if (tabId === 2) {
        setData((prev: any) =>
          prev.map((object: any, idx: number) => {
            if (idx === index.dataRow) {
              if (index.fieldName === "bclBulkKg") {
                const bclBulkL = Math.round(
                  (newValue ? +newValue : 0) /
                    (object.bclSpecific ? +object.bclSpecific : 0)
                );

                const bclAmt: number =
                  (newValue ? +newValue : 0) *
                    (object.bclCost ? +object.bclCost : 0) +
                  (object.bclVatType ? +object.bclVatType : 0);

                return {
                  ...object,
                  [index.fieldName]: newValue,
                  bclBulkL: bclBulkL,
                  bclAmt: bclAmt,
                  isEdited: true,
                };
              }

              if (index.fieldName === "bclBulkL") {
                const bclBulkKg = Math.round(
                  (newValue ? +newValue : 0) *
                    (object.bclSpecific ? +object.bclSpecific : 0)
                );

                const bclAmt: number =
                  bclBulkKg * (object.bclCost ? +object.bclCost : 0) +
                  (object.bclVatType ? +object.bclVatType : 0);

                return {
                  ...object,
                  [index.fieldName]: newValue,
                  bclBulkKg: bclBulkKg,
                  bclAmt: bclAmt,
                  isEdited: true,
                };
              }

              if (index.fieldName === "bclCost") {
                const bclAmt: number =
                  (object.bclBulkKg ? +object.bclBulkKg : 0) *
                    (newValue ? +newValue : 0) +
                  (object.bclVatType ? +object.bclVatType : 0);

                return {
                  ...object,
                  [index.fieldName]: newValue,
                  bclAmt: bclAmt,
                  isEdited: true,
                };
              }

              if (index.fieldName === "bclVatType") {
                const bclAmt: number =
                  (object.bclBulkKg ? +object.bclBulkKg : 0) *
                    (object.bclCost ? +object.bclCost : 0) +
                  (newValue ? +newValue : 0);

                return {
                  ...object,
                  [index.fieldName]: newValue,
                  bclAmt: bclAmt,
                  isEdited: true,
                };
              }
            } else return object;
          })
        );

        setCallCalc((prev: boolean) => !prev);
      }

      gv.cancel();
    };

    return () => {
      dp.clearRows();
      gv.destroy();
      dp.destroy();
    };
  }, [tabId, data, bcBuCode, areaCode]);
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
    </>
  );
}

export default Grid;
