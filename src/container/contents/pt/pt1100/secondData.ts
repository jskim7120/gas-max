import { ValueType } from "realgrid";

export const fieldsSecond = [
  {
    fieldName: "mjDate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "mjBigo",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "mjMisujan",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "mjSwName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "pjBigo",
    dataType: ValueType.TEXT,
  },
];

export const columnsSecond = [
  {
    name: "mjDate",
    fieldName: "mjDate",
    type: "data",
    width: "80",
    header: {
      text: "일자",
    },
  },
  {
    name: "mjBigo",
    fieldName: "mjBigo",
    type: "data",
    width: "100",
    header: {
      text: "적요",
    },
  },
  {
    name: "mjMisujan",
    fieldName: "mjMisujan",
    type: "data",
    width: "120",
    header: {
      text: "미수잔액",
    },
  },
  {
    name: "mjSwName",
    fieldName: "mjSwName",
    type: "data",
    width: "150",
    header: {
      text: "배달사원",
    },
  },
  {
    name: "pjBigo",
    fieldName: "pjBigo",
    type: "data",
    width: "100",
    header: {
      text: "비고",
    },
  },
];
