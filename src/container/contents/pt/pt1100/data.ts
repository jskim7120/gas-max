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
    fieldName: "cuName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuTel",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuJmisu",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuSwName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "suDate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuJangbuYn",
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
    width: "100",
    header: {
      text: "거래처코드",
    },
  },
  {
    name: "cuName",
    fieldName: "cuName",
    type: "data",
    width: "180",
    header: {
      text: "거래처",
    },
  },
  {
    name: "cuTel",
    fieldName: "cuTel",
    type: "data",
    width: "120",
    header: {
      text: "전화번호",
    },
  },
  {
    name: "cuJmisu",
    fieldName: "cuJmisu",
    type: "data",
    width: "100",
    header: {
      text: "미수금액",
    },
    styleName: "rg-right-column",
  },
  {
    name: "cuSwName",
    fieldName: "cuSwName",
    type: "data",
    width: "100",
    header: {
      text: "담당사원",
    },
  },
  {
    name: "suDate",
    fieldName: "suDate",
    type: "data",
    width: "80",
    header: {
      text: "최종수금일",
    },
  },
  {
    name: "cuJangbuYn",
    fieldName: "cuJangbuYn",
    type: "data",
    width: "60",
    header: {
      text: "장부Y/N",
    },
  },
];
