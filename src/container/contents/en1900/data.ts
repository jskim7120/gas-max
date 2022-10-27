import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gubunCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gubunName",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: "areaCode",
    fieldName: "areaCode",
    type: "data",
    width: "80",
    styles: {
      textAlignment: "center",
    },
    header: {
      text: "업소",
    },
  },
  {
    name: "gubunCode",
    fieldName: "gubunCode",
    type: "data",
    width: "120",
    styles: {
      textAlignment: "near",
    },
    header: {
      text: "코드",
    },
  },
  {
    name: "gubunName",
    fieldName: "gubunName",
    type: "data",
    width: "120",
    styles: {
      textAlignment: "near",
    },
    header: {
      text: "분류명",
    },
  },
];
