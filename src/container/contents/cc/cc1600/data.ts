import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "acsTypeName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "acsAccCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "acsAccName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "acsName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "acsDelYn",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: "acsTypeName",
    fieldName: "acsTypeName",
    type: "data",
    width: "50",
    header: {
      text: "구분",
    },
  },
  {
    name: "acsAccCode",
    fieldName: "acsAccCode",
    type: "data",
    width: "50",
    styleName: "rg-left-column",
    header: {
      text: "코드",
    },
  },
  {
    name: "acsAccName",
    fieldName: "acsAccName",
    type: "data",
    width: "80",
    styleName: "rg-left-column",
    header: {
      text: "계정 과목",
    },
  },
  {
    name: "acsName",
    fieldName: "acsName",
    type: "data",
    width: "100",
    header: {
      text: "수입/지출 항목",
    },
  },
  {
    name: "acsDelYn",
    fieldName: "acsDelYn",
    type: "data",
    width: "80",
    header: {
      text: "변경 가능",
    },
  },
];
