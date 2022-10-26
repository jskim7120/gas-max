import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jyCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jyName",
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
      text: "영업소코드",
    },
  },
  {
    name: "jyCode",
    fieldName: "jyCode",
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
    name: "jyName",
    fieldName: "jyName",
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
