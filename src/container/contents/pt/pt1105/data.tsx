import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "cuChkamt",
    dataType: ValueType.BOOLEAN,
  },
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
];

export const columns = [
  {
    name: "cuChkamt",
    fieldName: "cuChkamt",
    width: "40",
    header: {
      text: "선택",
    },
    type: "Boolean",
    defaultValue: true,
    renderer: {
      type: "check",
      editable: true,
    },
    editor: {
      type: "check",
      editable: false,
    },
  },
  {
    name: "mjDate",
    fieldName: "mjDate",
    type: "data",
    width: "110",
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
      text: "비고",
    },
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
      text: "사원",
    },
    styleName: "rg-left-column",
  },
];
