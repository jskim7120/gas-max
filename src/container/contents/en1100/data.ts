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
    width: "80",
    header: {
      text: "영업소코드",
    },
  },
  {
    name: "areaName",
    fieldName: "areaName",
    type: "data",
    width: "120",
    styleName: "rg-left-column",
    header: {
      text: "영업소명칭",
    },
  },
];
