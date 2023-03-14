import { ValueType } from "realgrid";

export const fields = [
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
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "mjSwName",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
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
    width: "80",
    header: {
      text: "비고",
    },
  },
  {
    name: "mjMisujan",
    fieldName: "mjMisujan",
    type: "data",
    width: "80",
    header: {
      text: "미수잔액",
    },
  },
  {
    name: "mjSwName",
    fieldName: "mjSwName",
    type: "data",
    width: "80",
    header: {
      text: "사원",
    },
  },
];
