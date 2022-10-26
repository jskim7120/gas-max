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
    styles: {
      textAlignment: "center",
    },
    header: {
      text: "업소",
    },
  },
  {
    name: "ccName",
    fieldName: "ccName",
    type: "data",
    width: "120",
    styles: {
      textAlignment: "near",
    },
    header: {
      text: "코드",
    },
  },
];
