import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "sumChaTot",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "sumCha",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "sumInkum",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "accName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "sumOutkum",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "sumDae",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "sumDaeTot",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: "sumChaTot",
    fieldName: "sumChaTot",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "합계",
    },
  },
  {
    name: "sumCha",
    fieldName: "sumCha",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "대체",
    },
  },
  {
    name: "sumInkum",
    fieldName: "sumInkum",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "현금",
    },
  },
  {
    name: "accName",
    fieldName: "accName",
    type: "data",
    width: "240",
    styleName: "rg-left-column",
    header: {
      text: "계정 과목",
    },
  },
  {
    name: "sumOutkum",
    fieldName: "sumOutkum",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "현금",
    },
  },
  {
    name: "sumDae",
    fieldName: "sumDae",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "대체",
    },
  },
  {
    name: "sumDaeTot",
    fieldName: "sumDaeTot",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "합계",
    },
  },
];

export const layout = [
  {
    name: "someGroup",
    direction: "horizontal",
    items: ["sumChaTot", "sumCha", "sumInkum"],
    header: {
      text: "차변",
    },
  },
  "accName",
  {
    name: "someGroup",
    direction: "horizontal",
    items: ["sumOutkum", "sumDae", "sumDaeTot"],
    header: {
      text: "대변",
    },
  },
];
