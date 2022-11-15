import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "aptCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "aptName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "aptTypeName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "aptF",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "aptS",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "aptSum",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "swName",
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
    name: "aptCode",
    fieldName: "aptCode",
    type: "data",
    width: "80",
    header: {
      text: "코드",
    },
  },
  {
    name: "aptName",
    fieldName: "aptName",
    type: "data",
    width: "120",
    header: {
      text: "건물명",
    },
  },
  {
    name: "aptTypeName",
    fieldName: "aptTypeName",
    type: "data",
    width: "100",
    header: {
      text: "건물구조",
    },
  },
  {
    name: "aptF",
    fieldName: "aptF",
    type: "data",
    width: "100",
    header: {
      text: "층수",
    },
  },
  {
    name: "aptS",
    fieldName: "aptS",
    type: "data",
    width: "100",
    header: {
      text: "세대",
    },
  },
  {
    name: "aptSum",
    fieldName: "aptSum",
    type: "data",
    width: "100",
    header: {
      text: "전체세대",
    },
  },
  {
    name: "swName",
    fieldName: "swName",
    type: "data",
    width: "100",
    header: {
      text: "담당사원",
    },
  },
];
