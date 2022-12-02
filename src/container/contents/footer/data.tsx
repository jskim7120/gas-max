import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuTypeName",
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
    fieldName: "cuHp",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuAddr1n2",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuUsername",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuStaeName",
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
    name: "cuCode",
    fieldName: "cuCode",
    type: "data",
    width: "120",
    header: {
      text: "코드",
    },
  },
  {
    name: "cuTypeName",
    fieldName: "cuTypeName",
    type: "data",
    width: "120",
    header: {
      text: "구분",
    },
  },
  {
    name: "cuViewName",
    fieldName: "cuViewName",
    type: "data",
    width: "350",
    header: {
      text: "매출처명",
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
    name: "cuHp",
    fieldName: "cuHp",
    type: "data",
    width: "120",
    header: {
      text: "핸드폰",
    },
  },
  {
    name: "cuAddr1n2",
    fieldName: "cuAddr1n2",
    type: "data",
    width: "120",
    header: {
      text: "주소",
    },
  },
  {
    name: "cuUsername",
    fieldName: "cuUsername",
    type: "data",
    width: "120",
    header: {
      text: "성명",
    },
  },
  {
    name: "cuStaeName",
    fieldName: "cuStaeName",
    type: "data",
    width: "120",
    header: {
      text: "상태",
    },
  },
];
