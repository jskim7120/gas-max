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
    width: "90",
    header: {
      text: "일자",
    },
  },
  {
    name: "mjBigo",
    fieldName: "mjBigo",
    type: "data",
    width: "200",
    header: {
      text: "적요",
    },
    styleName: "rg-left-column",
  },
  {
    name: "mjMisujan",
    fieldName: "mjMisujan",
    type: "data",
    width: "100",
    header: {
      text: "미수잔액",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "mjSwName",
    fieldName: "mjSwName",
    type: "data",
    width: "100",
    header: {
      text: "배달사원",
    },
  },
  {
    name: "pjBigo",
    fieldName: "pjBigo",
    type: "data",
    width: "200",
    header: {
      text: "비고",
    },
  },
];
