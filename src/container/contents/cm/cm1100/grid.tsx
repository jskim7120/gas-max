import React, { useEffect, useRef, useImperativeHandle } from "react";
import { GridView, LocalDataProvider } from "realgrid";
import { ExcelIcon } from "components/allSvgIcon";
import Button from "components/button/button";
import { ButtonColor, ButtonType } from "components/componentsType";

let container: HTMLDivElement;
let dp: any;
let gv: any;

const Grid = React.forwardRef(
  (
    {
      data,
      columns,
      fields,
      rowIndex,
      setSelected,
      openPopup,
      cm1105PopUp,
      areaCode,
      menuId,
    }: {
      data: any;
      columns: any;
      fields: any;
      rowIndex: number | undefined;
      setSelected?: any;
      openPopup?: any;
      cm1105PopUp?: any;
      areaCode: string;
      menuId?: string;
    },
    ref: any
  ) => {
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
      gv.onScrollToBottom = () => {
        gv.setCurrent({
          dataRow: rowIndex,
        });
      };

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

    const saveToExcel = () => {
      if (data && data?.length > 0) {
        var msg = "엑셀파일로 다운로드 하시겠습니까?";
        if (window.confirm(msg) === true) {
          msg = "congratulations";
          gv.exportGrid({
            type: "excel",
            target: "local",
            fileName: `${menuId}.xlsx`,
            progressMessage: "엑셀 Export중입니다.",
            //done: function () {},
          });
        }
      } else {
        /* eslint-disable no-restricted-globals */
        confirm("엑셀 변환 데이터 없습니다");
      }
    };
    useImperativeHandle<any, any>(ref, () => ({ saveToExcel }));

    return (
      <>
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
);

export default Grid;
