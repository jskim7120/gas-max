import { ValueType } from "realgrid";

export const fields1 = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuViewName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuTel",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuAddr",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuJpName",
    dataType: ValueType.TEXT,
  },
];

export const columns1 = [
  {
    name: "areaCode",
    fieldName: "areaCode",
    type: "data",
    width: "50",
    header: {
      text: "영업소",
    },
  },
  {
    name: "cuCode",
    fieldName: "cuCode",
    type: "data",
    width: "120",
    header: {
      text: "코드",
    },
  },
  {
    name: "cuViewName",
    fieldName: "cuViewName",
    type: "data",
    width: "200",
    header: {
      text: "거래처명",
    },
  },
  {
    name: "cuTel",
    fieldName: "cuTel",
    type: "data",
    width: "120",
    header: {
      text: "전화",
    },
  },
  {
    name: "cuAddr",
    fieldName: "cuAddr",
    type: "data",
    width: "300",
    styleName: "rg-left-column",
    header: {
      text: "주소",
    },
  },
  {
    name: "cuJpName",
    fieldName: "cuJpName",
    type: "data",
    width: "120",
    header: {
      text: "사용품목",
    },
  },
];
