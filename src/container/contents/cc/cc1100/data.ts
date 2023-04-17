import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "acjDate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "acjAcsName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "acjBigo",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "acjSwName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "acjKumackIn",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "acjKumackOut",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "acjKumackJan",
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
      text: "영 업 소",
    },
  },
  {
    name: "acjDate",
    fieldName: "acjDate",
    type: "data",
    width: "80",
    header: {
      text: "일 자",
    },
  },
  {
    name: "acjAcsName",
    fieldName: "acjAcsName",
    type: "data",
    width: "80",
    styleName: "rg-left-column",
    header: {
      text: "항 목",
    },
  },
  {
    name: "acjBigo",
    fieldName: "acjBigo",
    type: "data",
    width: "130",
    styleName: "rg-left-column",
    header: {
      text: "적 요",
    },
  },
  {
    name: "acjSwName",
    fieldName: "acjSwName",
    type: "data",
    width: "100",
    header: {
      text: "사 원",
    },
  },
  {
    name: "acjKumackIn",
    fieldName: "acjKumackIn",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "입 금",
    },
    numberFormat: "#,##0",
  },
  {
    name: "acjKumackOut",
    fieldName: "acjKumackOut",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "출 금",
    },
    numberFormat: "#,##0",
  },
  {
    name: "acjKumackJan",
    fieldName: "acjKumackJan",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "잔 액",
    },
    numberFormat: "#,##0",
  },
];
