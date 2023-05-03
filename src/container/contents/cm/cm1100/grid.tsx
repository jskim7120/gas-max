import React, { useEffect, useRef } from "react";
import { GridView, LocalDataProvider } from "realgrid";
import { ExcelIcon } from "components/allSvgIcon";
import Button from "components/button/button";
import { ButtonColor, ButtonType } from "components/componentsType";

let container: HTMLDivElement;
let dp: any;
let gv: any;
let selectedRowIndex: number = 0;

function Grid({
  data,
  columns,
  fields,
  setSelected,
  openPopup,
  cm1105PopUp,
  areaCode,
}: {
  data: any;
  columns: any;
  fields: any;
  setSelected?: any;
  openPopup?: any;
  cm1105PopUp?: any;
  areaCode: string;
}) {
  const realgridElement = useRef<HTMLDivElement>(null);

  const saveToExcel = () => {
    if (data.length !== 0) {
      var msg = "CM1100 grid done excel export"; 
          if(window.confirm(msg) === true){
            msg = 'congratulations';
            gv.exportGrid({
              type: "excel",
              target: "local",
              fileName: "gridExportCM1100.xlsx",
              progressMessage: "엑셀 Export중입니다.",
              done: function () {
                //내보내기 완료 후 실행되는 함수
                
              }
            });
          }else msg = `i can't this`;
    } else {
      /* eslint-disable no-restricted-globals */
      confirm("CM1100 grid data not found");
    }
  };

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

    gv.setOptions({
      indicator: { visible: true },
      checkBar: { visible: false },
      stateBar: { visible: false },
    });
    gv.sortingOptions.enabled = true;
    gv.displayOptions._selectionStyle = "singleRow";
    gv.displayOptions.fitStyle = "evenFill";
    gv.setEditOptions({ editable: false });
    gv.displayOptions.useFocusClass = true;
    gv.setCurrent({
      dataRow: selectedRowIndex,
    });

    if (areaCode !== "00") {
      gv.removeColumn("areaCode");
    }

    gv.onSelectionChanged = () => {
      const itemIndex: any = gv.getCurrent().dataRow;
      setSelected(data[itemIndex]);
    };

    gv.onCellDblClicked = function (grid: any, e: any) {
      const itemIndex: any = grid.getCurrent().dataRow;
      openPopup &&
        openPopup({
          cuCode: data[itemIndex].cuCode,
          areaCode: data[itemIndex].areaCode,
          status: "UPDATE",
        });
    };

    return () => {
      dp.clearRows();
      gv.destroy();
      dp.destroy();
    };
  }, [data, cm1105PopUp]);

  return (
    <>
      <Button
        text="엑셀"
        icon={<ExcelIcon />}
        kind={ButtonType.ROUND}
        color={ButtonColor.SECONDARY}
        type="button"
        onClick={saveToExcel}
        style={{ position: "absolute", top: "179px", right: "57px" }}
      />
      <div
        style={{
          //width: "100%",
          height: `calc(100% - 271px)`,
        }}
        ref={realgridElement}
      ></div>
    </>
  );
}

export default Grid;
