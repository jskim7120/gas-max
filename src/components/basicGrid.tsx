import React, { useEffect, useRef, useImperativeHandle } from "react";
import { GridView, LocalDataProvider } from "realgrid";

const Grid = React.forwardRef(
  (
    {
      areaCode,
      data,
      fields,
      columns,
      style,
      evenFill,
      layout,
      rowIndex,
    }: {
      areaCode?: string;
      data: any;
      fields: any;
      columns: any;
      style?: any;
      evenFill?: boolean;
      layout?: any;
      rowIndex: number | undefined;
    },
    ref: any
  ) => {
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
      });
      gv.sortingOptions.enabled = true;
      gv.displayOptions._selectionStyle = "singleRow";

      if (evenFill) {
        gv.displayOptions.fitStyle = "evenFill";
      }

      if (areaCode !== "00") {
        gv.removeColumn("areaCode");
      }

      gv.displayOptions.useFocusClass = true;
      gv.setCurrent({
        dataRow: rowIndex,
      });

      gv.onSelectionChanged = () => {};

      return () => {
        dp.clearRows();
        gv.destroy();
        dp.destroy();
      };
    }, [data]);

    const saveToExcel = () => {
      if (data && data?.length > 0) {
        var msg = "엑셀파일로 다운로드 하시겠습니까?";
        if (window.confirm(msg) === true) {
          msg = "congratulations";
          gv.exportGrid({
            type: "excel",
            target: "local",
            fileName: "grid.xlsx",
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

    return <div style={style} ref={realgridElement}></div>;
  }
);

export default Grid;
