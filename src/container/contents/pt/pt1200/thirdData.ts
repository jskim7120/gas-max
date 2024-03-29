import { ValueType } from "realgrid";

export const fieldsThird = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gsDate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gsCuCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gsCuName",
    dataType: ValueType.TEXT,
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
    fieldName: "gsSwName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gsSukumtype",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gsBigo",
    dataType: ValueType.TEXT,
  },
];

export const columnsThird = [
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
    name: "gsDate",
    fieldName: "gsDate",
    type: "data",
    width: "90",
    header: {
      text: "수금일자",
    },
    footer: {
      valueCallback: function (grid: any) {
        return grid.getSummary("gsDate", "count");
      },
    },
  },
  {
    name: "gsCuCode",
    fieldName: "gsCuCode",
    type: "data",
    width: "90",
    header: {
      text: "거래처코드",
    },
  },
  {
    name: "gsCuName",
    fieldName: "gsCuName",
    type: "data",
    width: "200",
    header: {
      text: "거래처명",
    },
    styleName: "rg-left-column",
  },
  {
    name: "gsKumack",
    fieldName: "gsKumack",
    type: "data",
    width: "90",
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
    width: "90",
    header: {
      text: "D/C",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "gsSwName",
    fieldName: "gsSwName",
    type: "data",
    width: "90",
    header: {
      text: "사원",
    },
    styleName: "rg-left-column",
  },
  {
    name: "gsSukumtype",
    fieldName: "gsSukumtype",
    type: "data",
    width: "90",
    header: {
      text: "수금 방법",
    },
  },
  {
    name: "gsBigo",
    fieldName: "gsBigo",
    type: "data",
    width: "150",
    header: {
      text: "비고",
    },
    styleName: "rg-left-column",
  },
];
