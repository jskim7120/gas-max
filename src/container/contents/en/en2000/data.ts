import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "ccCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "ccName",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: "ccCode",
    fieldName: "ccCode",
    type: "data",
    width: "80",
    header: {
      text: "영업소",
    },
  },
  {
    name: "ccName",
    fieldName: "ccName",
    type: "data",
    width: "120",
    styleName: "rg-left-column",
    header: {
      text: "코드",
    },
  },
];
