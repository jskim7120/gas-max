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
    fieldName: "acjKumackCh",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "acjKumackDa",
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
    width: "80",
    header: {
      text: "영업소",
    },
  },
  {
    name: "acjDate",
    fieldName: "acjDate",
    type: "data",
    width: "110",
    header: {
      text: "일자",
    },
  },
  {
    name: "acjAcsName",
    fieldName: "acjAcsName",
    type: "data",
    width: "290",
    header: {
      text: "항목",
    },
  },
  {
    name: "acjKumackCh",
    fieldName: "acjKumackCh",
    type: "data",
    width: "130",
    header: {
      text: "차변",
    },
  },
  {
    name: "acjKumackDa",
    fieldName: "acjKumackDa",
    type: "data",
    width: "130",
    header: {
      text: "대변",
    },
  },
  {
    name: "acjKumackJan",
    fieldName: "acjKumackJan",
    type: "data",
    width: "130",
    header: {
      text: "잔액",
    },
  },
];
