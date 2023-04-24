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
    width: "60",
    header: {
      text: "영업소",
    },
  },
  {
    name: "acjDate",
    fieldName: "acjDate",
    type: "data",
    width: "80",
    header: {
      text: "일자",
    },
  },
  {
    name: "acjAcsName",
    fieldName: "acjAcsName",
    type: "data",
    width: "80",
    styleName: "rg-left-column",
    header: {
      text: "항목",
    },
  },
  {
    name: "acjBigo",
    fieldName: "acjBigo",
    type: "data",
    width: "130",
    styleName: "rg-left-column",
    header: {
      text: "적요",
    },
  },
  {
    name: "acjSwName",
    fieldName: "acjSwName",
    type: "data",
    width: "100",
    header: {
      text: "사원",
    },
  },
  {
    name: "acjKumackIn",
    fieldName: "acjKumackIn",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "입금",
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
      text: "출금",
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
      text: "잔액",
    },
    numberFormat: "#,##0",
  },
];
