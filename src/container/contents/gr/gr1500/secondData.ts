import { ValueType } from "realgrid";

export const fieldsSecond = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bjDate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bjBuName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bjOutkum",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "bjDc",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "bjOuttypName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bjBigo",
    dataType: ValueType.TEXT,
  },
];

export const columnsSecond = [
  {
    name: "areaCode",
    fieldName: "areaCode",
    type: "data",
    width: "20",
    header: {
      text: "영업소",
    },
  },
  {
    name: "bjDate",
    fieldName: "bjDate",
    type: "data",
    width: "30",
    header: {
      text: "지급일자",
    },
  },
  {
    name: "bjBuName",
    fieldName: "bjBuName",
    type: "data",
    width: "80",
    header: {
      text: "상호 (매입처명)",
    },
    styleName: "rg-left-column",
    footer: {
      text: "합  계",
    },
  },
  {
    name: "bjOutkum",
    fieldName: "bjOutkum",
    type: "data",
    width: "40",
    header: {
      text: "지급액",
    },
    styleName: "rg-right-column",
    footer: {
      expression: "sum",
    },
  },
  {
    name: "bjDc",
    fieldName: "bjDc",
    type: "data",
    width: "40",
    header: {
      text: "지급 D/C",
    },
    styleName: "rg-right-column",
    footer: {
      expression: "sum",
    },
  },
  {
    name: "bjOuttypName",
    fieldName: "bjOuttypName",
    type: "data",
    width: "50",
    header: {
      text: "방법",
    },
  },
  {
    name: "bjBigo",
    fieldName: "bjBigo",
    type: "data",
    width: "50",
    header: {
      text: "비고",
    },
    styleName: "rg-left-column",
  },
];
