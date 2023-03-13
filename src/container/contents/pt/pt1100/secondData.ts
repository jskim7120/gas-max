import { ValueType } from "realgrid";

export const fieldsSecond = [
  {
    fieldName: "mJDate",
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
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "pjBigo",
    dataType: ValueType.NUMBER,
  },
];

export const columnsSecond = [
  {
    name: "mjDate",
    fieldName: "mjDate",
    type: "data",
    width: "80",
    header: {
      text: "영업소",
    },
  },
  {
    name: "mjBigo",
    fieldName: "mjBigo",
    type: "data",
    width: "100",
    header: {
      text: "지급일자",
    },
  },
  {
    name: "mjMisujan",
    fieldName: "mjMisujan",
    type: "data",
    width: "120",
    header: {
      text: "지급일자",
    },
  },
  {
    name: "mjSwName",
    fieldName: "mjSwName",
    type: "data",
    width: "150",
    header: {
      text: "지급액",
    },
  },
  {
    name: "pjBigo",
    fieldName: "pjBigo",
    type: "data",
    width: "100",
    header: {
      text: "지급 D/C",
    },
  },
];
