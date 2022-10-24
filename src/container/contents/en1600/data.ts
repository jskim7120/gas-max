import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "swName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "swTel",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "swHp",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "swPaydate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "swWorkOut",
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
    name: "swName",
    fieldName: "swName",
    type: "data",
    width: "120",
    styles: {
      textAlignment: "near",
    },
    header: {
      text: "사원명칭",
    },
  },
  {
    name: "swTel",
    fieldName: "swTel",
    type: "data",
    width: "120",
    styles: {
      textAlignment: "near",
    },
    header: {
      text: "전화번호",
    },
  },
  {
    name: "swHp",
    fieldName: "swHp",
    type: "data",
    width: "120",
    styles: {
      textAlignment: "near",
    },
    header: {
      text: "핸드폰",
    },
  },
  {
    name: "swPaydate",
    fieldName: "swPaydate",
    type: "data",
    width: "80",
    styles: {
      textAlignment: "near",
    },
    header: {
      text: "급여일",
    },
  },
  {
    name: "swWorkOut",
    fieldName: "swWorkOut",
    type: "data",
    width: "80",
    styles: {
      textAlignment: "near",
    },
    header: {
      text: "퇴사",
    },
  },
];
