import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "areaName",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: "areaCode",
    fieldName: "areaCode",
    type: "data",
    width: "100",
    styles: {
      textAlignment: "center",
    },
    header: {
      text: "코드",
    },
  },
  {
    name: "areaName",
    fieldName: "areaName",
    type: "data",
    width: "150",
    styles: {
      textAlignment: "center",
    },
    header: {
      text: "영업소명",
    },
  },
];
