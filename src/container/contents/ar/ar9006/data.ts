import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "tsDate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "tsCuCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuName",
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
    fieldName: "tsSwName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "tsBigo",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: "areaCode",
    fieldName: "areaCode",
    type: "data",
    width: "50",
    header: {
      text: "영업소",
    },
  },
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
    name: "tsCuCode",
    fieldName: "tsCuCode",
    type: "data",
    width: "80",
    header: {
      text: "코드",
    },
  },
  {
    name: "cuName",
    fieldName: "cuName",
    type: "data",
    width: "200",
    styleName: "rg-left-column",
    header: {
      text: "거래처명",
    },
  },
  {
    name: "tsGubun",
    fieldName: "tsGubun",
    type: "data",
    width: "80",
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
      text: "판매액",
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
      text: "보증금",
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
      text: " D/C",
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
      text: "미수액 ",
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
      text: "환불액",
    },
    numberFormat: "#,##0",
  },
  {
    name: "tsSwName",
    fieldName: "tsSwName",
    type: "data",
    width: "100",
    styleName: "rg-left-column",
    header: {
      text: "사원",
    },
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
  "areaCode",
  "tsDate",
  "tsCuCode",
  "cuName",
  "tsGubun",
  "tsJpName",

  {
    name: "수량",
    directions: "horizontal",
    hideChildHeaders: false,
    items: ["tsInqty", "tsOutqty"],
  },
  "tsKumack",
  "tsBkum",
  "tsInkum",
  "tsDc",
  "tsMisu",
  {
    name: "출금액",
    directions: "horizontal",
    hideChildHeaders: false,
    items: ["tsGukum", "tsBoutkum"],
  },
  "tsSwName",
  "tsBigo",
];
