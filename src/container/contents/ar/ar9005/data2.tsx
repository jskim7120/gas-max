import { ValueType } from "realgrid";

export const fields2 = [
  {
    fieldName: "tsDate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "tsGubun",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "tsJpName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "tsInqty",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "tsOutqty",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "tsKumack",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "tsBkum",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "tsInkum",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "tsDc",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "tsMisu",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "tsGukum",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "tsBoutkum",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "tsBigo",
    dataType: ValueType.TEXT,
  },
];

export const columns2 = [
  {
    name: "tsDate",
    fieldName: "tsDate",
    type: "data",
    width: "100",
    header: {
      text: "일자",
    },
    footer: {
      valueCallback: function (grid: any) {
        return grid.getSummary("tsDate", "count");
      },
    },
  },
  {
    name: "tsGubun",
    fieldName: "tsGubun",
    type: "data",
    width: "100",
    styleName: "rg-left-column",
    header: {
      text: "입출구분",
    },
  },
  {
    name: "tsJpName",
    fieldName: "tsJpName",
    type: "data",
    width: "130",
    styleName: "rg-left-column",
    header: {
      text: "품명",
    },
  },
  {
    name: "tsInqty",
    fieldName: "tsInqty",
    type: "data",
    width: "50",
    styleName: "rg-right-column",
    header: {
      text: "입고",
    },
  },
  {
    name: "tsOutqty",
    fieldName: "tsOutqty",
    type: "data",
    width: "50",
    styleName: "rg-right-column",
    header: {
      text: "출고",
    },
  },
  {
    name: "tsKumack",
    fieldName: "tsKumack",
    type: "data",
    width: "80",
    styleName: "rg-right-column",
    header: {
      text: "판매금액",
    },
    numberFormat: "#,##0",
  },
  {
    name: "tsBkum",
    fieldName: "tsBkum",
    type: "data",
    width: "80",
    styleName: "rg-right-column",
    header: {
      text: "대여보증금",
    },
    numberFormat: "#,##0",
  },
  {
    name: "tsInkum",
    fieldName: "tsInkum",
    type: "data",
    width: "80",
    styleName: "rg-right-column",
    header: {
      text: "입금액",
    },
    numberFormat: "#,##0",
  },
  {
    name: "tsDc",
    fieldName: "tsDc",
    type: "data",
    width: "80",
    styleName: "rg-right-column",
    header: {
      text: "D/C",
    },
    numberFormat: "#,##0",
  },
  {
    name: "tsMisu",
    fieldName: "tsMisu",
    type: "data",
    width: "80",
    styleName: "rg-right-column",
    header: {
      text: "미수금액",
    },
    numberFormat: "#,##0",
  },
  {
    name: "tsGukum",
    fieldName: "tsGukum",
    type: "data",
    width: "80",
    styleName: "rg-right-column",
    header: {
      text: "구입액",
    },
    numberFormat: "#,##0",
  },
  {
    name: "tsBoutkum",
    fieldName: "tsBoutkum",
    type: "data",
    width: "80",
    styleName: "rg-right-column",
    header: {
      text: "보증환불액",
    },
    numberFormat: "#,##0",
  },
  {
    name: "tsBigo",
    fieldName: "tsBigo",
    type: "data",
    width: "150",
    styleName: "rg-left-column",
    header: {
      text: "비고",
    },
  },
];

export const layout = [
  "tsDate",
  "tsGubun",
  "tsJpName",
  {
    name: "someGroup",
    directions: "horizontal",
    items: ["tsInqty", "tsOutqty"],
    header: {
      text: "수량",
    },
  },
  {
    name: "someGroup",
    directions: "horizontal",
    items: ["tsKumack", "tsBkum", "tsInkum", "tsDc", "tsMisu"],
    header: {
      text: "입금액",
    },
  },
  {
    name: "someGroup",
    directions: "horizontal",
    items: ["tsGukum", "tsBoutkum"],
    header: {
      text: "출금액",
    },
  },

  "tsBigo",
];
