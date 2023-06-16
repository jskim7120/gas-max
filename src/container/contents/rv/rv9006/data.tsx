import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "code",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "codeName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuRh2o",
    dataType: ValueType.TEXT,
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
    fieldName: "maintCost",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gjDc",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gjDangkum",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gjPerkum",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gjBaGageKum",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gjTotal",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gjMinab",
    dataType: ValueType.NUMBER,
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
    footer: {
      valueCallback: function (grid: any) {
        return grid.getSummary("areaCode", "count");
      },
    },
  },
  {
    name: "code",
    fieldName: "code",
    type: "data",
    width: "70",
    header: {
      text: "코드",
    },
  },
  {
    name: "codeName",
    fieldName: "codeName",
    type: "data",
    width: "150",
    styleName: "rg-left-column",
    header: {
      text: "사원",
    },
  },
  {
    name: "cuRh2o",
    fieldName: "cuRh2o",
    type: "data",
    width: "80",
    header: {
      text: "조정기",
    },
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
    name: "gjKumack",
    fieldName: "gjKumack",
    type: "data",
    width: "100",
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
      text: "관리비외",
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
    name: "gjDangkum",
    fieldName: "gjDangkum",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "당월금액",
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
    name: "gjBaGageKum",
    fieldName: "gjBaGageKum",
    type: "data",
    width: "80",
    styleName: "rg-right-column",
    header: {
      text: "할인/기초",
    },
    numberFormat: "#,##0",
  },
  {
    name: "gjTotal",
    fieldName: "gjTotal",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "당월합계",
    },
    numberFormat: "#,##0",
  },
  {
    name: "gjMinab",
    fieldName: "gjMinab",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "당월미납액",
    },
    numberFormat: "#,##0",
  },
];
