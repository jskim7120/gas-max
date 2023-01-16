import { ValueType } from "realgrid";

export const fields1 = [
  {
    fieldName: "bbBuName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bbDate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bbKumack",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bbOutkum",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bbDc",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bbJanack",
    dataType: ValueType.TEXT,
  },
];

export const columns1 = [
  {
    name: "bbBuName",
    fieldName: "bbBuName",
    type: "data",
    width: "170",
    header: {
      text: "매입처명",
    },
  },
  {
    name: "areaCode",
    fieldName: "areaCode",
    type: "data",
    width: "70",
    header: {
      text: "영업소",
    },
  },
  {
    name: "bbDate",
    fieldName: "bbDate",
    type: "data",
    width: "90",
    styleName: "rg-left-column",
    header: {
      text: "년-월",
    },
  },
  {
    name: "bbKumack",
    fieldName: "bbKumack",
    type: "data",
    width: "100",
    styleName: "rg-left-column",
    header: {
      text: "매입금액",
    },
  },
  {
    name: "bbOutkum",
    fieldName: "bbOutkum",
    type: "data",
    width: "100",
    styleName: "rg-left-column",
    header: {
      text: "지금액",
    },
  },
  {
    name: "bbDc",
    fieldName: "bbDc",
    type: "data",
    width: "100",
    styleName: "rg-left-column",
    header: {
      text: "D/C",
    },
  },
  {
    name: "bbJanack",
    fieldName: "bbJanack",
    type: "data",
    width: "100",
    styleName: "rg-left-column",
    header: {
      text: "잔액",
    },
  },
];
