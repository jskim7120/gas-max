import { ValueType } from "realgrid";

export const fields1 = [
  {
    fieldName: "cuCno",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjCuCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuTel",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "lastMisu",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gjDate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjGum",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gjGage",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gjKumack",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gjAnkum",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gjDc",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gjPerkum",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gjTotal",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gjMisujan",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "lastMisuN",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "cuSwName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "sameCount",
    dataType: ValueType.TEXT,
  },
];

export const columns1 = [
  {
    name: "cuCno",
    fieldName: "cuCno",
    type: "data",
    width: "50",
    header: {
      text: "순번",
    },
    footer: {
      valueCallback: function (grid: any) {
        return grid.getSummary("cuCno", "count");
      },
    },
  },
  {
    name: "gjCuCode",
    fieldName: "gjCuCode",
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
    name: "cuTel",
    fieldName: "cuTel",
    type: "data",
    width: "120",
    styleName: "rg-left-column",
    header: {
      text: "전화번호",
    },
  },
  {
    name: "lastMisu",
    fieldName: "lastMisu",
    type: "data",
    width: "100",
    header: {
      text: "전미수",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "gjDate",
    fieldName: "gjDate",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "검침일",
    },
  },
  {
    name: "gjGum",
    fieldName: "gjGum",
    type: "data",
    width: "70",
    header: {
      text: "당검",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "gjGage",
    fieldName: "gjGage",
    type: "data",
    width: "70",
    header: {
      text: "사용",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },

  {
    name: "gjKumack",
    fieldName: "gjKumack",
    type: "data",
    width: "100",
    header: {
      text: "사용금액",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "gjAnkum",
    fieldName: "gjAnkum",
    type: "data",
    width: "70",
    header: {
      text: "관리비",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "gjDc",
    fieldName: "gjDc",
    type: "data",
    width: "70",
    header: {
      text: "할인액",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "gjPerkum",
    fieldName: "gjPerkum",
    type: "data",
    width: "70",
    header: {
      text: "연체료",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "gjTotal",
    fieldName: "gjTotal",
    type: "data",
    width: "100",
    header: {
      text: "당월합계",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "gjMisujan",
    fieldName: "gjMisujan",
    type: "data",
    width: "100",
    header: {
      text: "당월미수",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "lastMisuN",
    fieldName: "lastMisuN",
    type: "data",
    width: "100",
    header: {
      text: "미수잔액",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "cuSwName",
    fieldName: "cuSwName",
    type: "data",
    width: "70",
    header: {
      text: "담당",
    },
  },
  {
    name: "sameCount",
    fieldName: "sameCount",
    type: "data",
    width: "50",
    header: {
      text: "건수",
    },
  },
];
