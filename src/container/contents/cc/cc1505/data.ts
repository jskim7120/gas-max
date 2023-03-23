import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "accCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "accName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "accDelYn",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: "accCode",
    fieldName: "accCode",
    type: "data",
    width: "50",
    header: {
      text: "코드",
    },
  },
  {
    name: "accName",
    fieldName: "accName",
    type: "data",
    width: "150",
    styleName: "rg-left-column",
    header: {
      text: "계정과목",
    },
  },
  {
    name: "accDelYn",
    fieldName: "accDelYn",
    type: "data",
    width: "80",
    header: {
      text: "변경가능",
    },
  },
];
