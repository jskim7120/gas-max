import { ValueType } from "realgrid";

export const fields0 = [
  {
    fieldName: "gsCuCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gsCuName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gsCuUsername",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gsDate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gsSukumtype",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gslkumack",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "suPer",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "suPerDc",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gsKumack",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gsDc",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "swName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gsBigo",
    dataType: ValueType.TEXT,
  },
];

export const columns0 = [
  {
    name: "gsCuCode",
    fieldName: "gsCuCode",
    type: "data",
    width: "80",
    header: {
      text: "코드",
    },
    footer: {
      valueCallback: function (grid: any) {
        return grid.getSummary("gsCuCode", "count");
      },
    },
  },
  {
    name: "gsCuName",
    fieldName: "gsCuName",
    type: "data",
    width: "200",
    styleName: "rg-left-column",
    header: {
      text: "건물명",
    },
  },

  {
    name: "gsCuUsername",
    fieldName: "gsCuUsername",
    type: "data",
    width: "150",
    styleName: "rg-left-column",
    header: {
      text: "사용자명",
    },
  },
  {
    name: "gsDate",
    fieldName: "gsDate",
    type: "data",
    width: "100",
    header: {
      text: "수금일자",
    },
  },
  {
    name: "gsSukumtype",
    fieldName: "gsSukumtype",
    type: "data",
    width: "70",
    header: {
      text: "수금방법",
    },
  },
  {
    name: "gslkumack",
    fieldName: "gslkumack",
    type: "data",
    width: "100",
    header: {
      text: "사용료",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "suPer",
    fieldName: "suPer",
    type: "data",
    width: "100",
    header: {
      text: "연체료",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },

  {
    name: "suPerDc",
    fieldName: "suPerDc",
    type: "data",
    width: "70",
    header: {
      text: "원단위",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "gsKumack",
    fieldName: "gsKumack",
    type: "data",
    width: "100",
    header: {
      text: "수금액",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "gsDc",
    fieldName: "gsDc",
    type: "data",
    width: "100",
    header: {
      text: "D/C",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "swName",
    fieldName: "swName",
    type: "data",
    width: "70",
    header: {
      text: "사원",
    },
  },
  {
    name: "gsBigo",
    fieldName: "gsBigo",
    type: "data",
    width: "150",
    styleName: "rg-left-column",
    header: {
      text: "비고",
    },
  },
];
