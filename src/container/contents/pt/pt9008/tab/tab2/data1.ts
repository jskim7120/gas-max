import { ValueType } from "realgrid";

export const fields1 = [
  {
    fieldName: "gjCuCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuAddr",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjDate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjGumymsno",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjJankg",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuSwName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gaa",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gaa1",
    dataType: ValueType.TEXT,
  },
];

export const columns1 = [
  {
    name: "gjCuCode",
    fieldName: "gjCuCode",
    type: "data",
    width: "150",
    styleName: "rg-left-column",
    header: {
      text: "업소",
    },
    footer: {
      valueCallback: function (grid: any) {
        return grid.getSummary("areaCode", "count");
      },
    },
  },
  {
    name: "cuName",
    fieldName: "cuName",
    type: "data",
    width: "150",
    header: {
      text: "일자",
    },
  },

  {
    name: "cuAddr",
    fieldName: "cuAddr",
    type: "data",
    width: "70",
    styleName: "rg-left-column",
    header: {
      text: "건수",
    },
  },
  {
    name: "gjDate",
    fieldName: "gjDate",
    type: "data",
    width: "100",
    header: {
      text: "사용료",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "gjGumymsno",
    fieldName: "gjGumymsno",
    type: "data",
    width: "100",
    header: {
      text: "연체료",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "gjJankg",
    fieldName: "gjJankg",
    type: "data",
    width: "100",
    header: {
      text: "원단위",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "cuSwName",
    fieldName: "cuSwName",
    type: "data",
    width: "120",
    header: {
      text: "수금액",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },

  {
    name: "gaa",
    fieldName: "gaa",
    type: "data",
    width: "100",
    header: {
      text: "D/C",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "gaa1",
    fieldName: "gaa1",
    type: "data",
    width: "120",
    header: {
      text: "합계",
    },
    sstyleName: "rg-right-column",
    numberFormat: "#,##0",
  },
];
