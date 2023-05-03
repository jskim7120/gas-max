import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "cuCno",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjCuCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "viewCuName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjDate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjJungum",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gjGum",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gjJankg",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gjGage",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gjDanga",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gjKumack",
    dataType: ValueType.NUMBER,
  },

  {
    fieldName: "maintCost",
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
    fieldName: "gjMisu",
    dataType: ValueType.NUMBER,
  },

  {
    fieldName: "gjDangkum",
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
    fieldName: "gjSldate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjJirodate",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
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
    name: "areaCode",
    fieldName: "areaCode",
    type: "data",
    width: "50",
    header: {
      text: "영업소",
    },
  },
  {
    name: "gjCuCode",
    fieldName: "gjCuCode",
    type: "data",
    width: "90",
    header: {
      text: "코드",
    },
  },
  {
    name: "viewCuName",
    fieldName: "viewCuName",
    type: "data",
    width: "200",
    styleName: "rg-left-column",
    header: {
      text: "거래처명",
    },
  },
  {
    name: "gjDate",
    fieldName: "gjDate",
    type: "data",
    width: "100",
    header: {
      text: "검침일자",
    },
  },
  {
    name: "gjJungum",
    fieldName: "gjJungum",
    type: "data",
    width: "80",
    styleName: "rg-right-column",
    header: {
      text: "전월검침",
    },
    numberFormat: "#,##0",
  },
  {
    name: "gjGum",
    fieldName: "gjGum",
    type: "data",
    width: "80",
    styleName: "rg-right-column",
    header: {
      text: "당월검침",
    },
    numberFormat: "#,##0",
  },
  {
    name: "gjJankg",
    fieldName: "gjJankg",
    type: "data",
    width: "80",
    styleName: "rg-right-column",
    header: {
      text: "잔량",
    },
    numberFormat: "#,##0",
  },
  {
    name: "gjGage",
    fieldName: "gjGage",
    type: "data",
    width: "80",
    styleName: "rg-right-column",
    header: {
      text: "사용량",
    },
    numberFormat: "#,##0",
  },
  {
    name: "gjDanga",
    fieldName: "gjDanga",
    type: "data",
    width: "80",
    styleName: "rg-right-column",
    header: {
      text: "단가",
    },
    numberFormat: "#,##0",
  },
  {
    name: "gjKumack",
    fieldName: "gjKumack",
    type: "data",
    width: "80",
    styleName: "rg-right-column",
    header: {
      text: "사용금액",
    },
    numberFormat: "#,##0",
  },

  {
    name: "maintCost",
    fieldName: "maintCost",
    type: "data",
    width: "80",
    styleName: "rg-right-column",
    header: {
      text: "관리비",
    },
    numberFormat: "#,##0",
  },
  {
    name: "gjDc",
    fieldName: "gjDc",
    type: "data",
    width: "80",
    styleName: "rg-right-column",
    header: {
      text: "할인액",
    },
    numberFormat: "#,##0",
  },
  {
    name: "gjPerkum",
    fieldName: "gjPerkum",
    type: "data",
    width: "80",
    styleName: "rg-right-column",
    header: {
      text: "연체료",
    },
    numberFormat: "#,##0",
  },
  {
    name: "gjMisu",
    fieldName: "gjMisu",
    type: "data",
    width: "80",
    styleName: "rg-right-column",
    header: {
      text: "전월미수",
    },
    numberFormat: "#,##0",
  },
  {
    name: "gjDangkum",
    fieldName: "gjDangkum",
    type: "data",
    width: "80",
    styleName: "rg-right-column",
    header: {
      text: "당월금액",
    },
    numberFormat: "#,##0",
  },
  {
    name: "gjTotal",
    fieldName: "gjTotal",
    type: "data",
    width: "80",
    styleName: "rg-right-column",
    header: {
      text: "청구금액",
    },
    numberFormat: "#,##0",
  },
  {
    name: "gjMisujan",
    fieldName: "gjMisujan",
    type: "data",
    width: "80",
    styleName: "rg-right-column",
    header: {
      text: "미수잔액",
    },
    numberFormat: "#,##0",
  },
  {
    name: "gjSldate",
    fieldName: "gjSldate",
    type: "data",
    width: "150",
    header: {
      text: "사용기간",
    },
  },
  {
    name: "gjJirodate",
    fieldName: "gjJirodate",
    type: "data",
    width: "80",
    header: {
      text: "지로발행",
    },
  },
];
