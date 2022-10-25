import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "saupSsno",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "saupSangho",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "saupSajang",
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
      textAlignment: "near",
    },
    header: {
      text: "업소",
    },
  },
  {
    name: "saupSsno",
    fieldName: "saupSsno",
    type: "data",
    width: "120",
    styles: {
      textAlignment: "near",
    },
    header: {
      text: "사업번호",
    },
  },
  {
    name: "saupSangho",
    fieldName: "saupSangho",
    type: "data",
    width: "120",
    styles: {
      textAlignment: "near",
    },
    header: {
      text: "상호",
    },
  },
  {
    name: "saupSajang",
    fieldName: "saupSajang",
    type: "data",
    width: "120",
    styles: {
      textAlignment: "near",
    },
    header: {
      text: "대표",
    },
  },
];
