import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "acjDate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "acjAcsName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "acjBigo",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "acjSwName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "acjKumackIn",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "acjKumackOut",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "acjKumackJan",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
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
    name: "acjDate",
    fieldName: "acjDate",
    type: "data",
    width: "30",
    header: {
      text: "일자",
    },
  },
  {
    name: "acjAcsName",
    fieldName: "acjAcsName",
    type: "data",
    width: "60",
    header: {
      text: "항목",
    },
  },
  {
    name: "acjBigo",
    fieldName: "acjBigo",
    type: "data",
    width: "30",
    header: {
      text: "적요",
    },
  },
  {
    name: "acjSwName",
    fieldName: "acjSwName",
    type: "data",
    width: "60",
    header: {
      text: "사원",
    },
  },
  {
    name: "acjKumackIn",
    fieldName: "acjKumackIn",
    type: "data",
    width: "30",
    header: {
      text: "입금",
    },
  },
  {
    name: "acjKumackOut",
    fieldName: "acjKumackOut",
    type: "data",
    width: "30",
    header: {
      text: "출금",
    },
  },
  {
    name: "acjKumackJan",
    fieldName: "acjKumackJan",
    type: "data",
    width: "30",
    header: {
      text: "잔액",
    },
  },
];
