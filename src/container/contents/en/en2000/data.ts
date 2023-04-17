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
    width: "50",
    header: {
      text: "코드",
    },
    footer: {
      valueCallback: function (grid: any) {
        return grid.getSummary("ccCode", "count");
      },
    },
  },
  {
    name: "ccName",
    fieldName: "ccName",
    type: "data",
    width: "200",
    styleName: "rg-left-column",
    header: {
      text: "정비명",
    },
  },
  {
    name: "ccBigo",
    fieldName: "ccBigo",
    type: "data",
    width: "200",
    styleName: "rg-left-column",
    header: {
      text: "비고",
    },
  },
];
