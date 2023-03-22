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
    fieldName: "acjAccCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "acjAccName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "acjMemo",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "acjSwName",
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
    fieldName: "acjKumackSum",
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
    width: "80",
    header: {
      text: "일자",
    },
  },
  {
    name: "acjAccCode",
    fieldName: "acjAccCode",
    type: "data",
    width: "70",
    header: {
      text: "코드",
    },
  },
  {
    name: "acjAccName",
    fieldName: "acjAccName",
    type: "data",
    width: "150",
    header: {
      text: "계정과목",
    },
  },
  {
    name: "acjMemo",
    fieldName: "acjMemo",
    type: "data",
    width: "300",
    header: {
      text: "항목(적요)",
    },
  },
  {
    name: "acjSwName",
    fieldName: "acjSwName",
    type: "data",
    width: "80",
    header: {
      text: "사원",
    },
  },
  {
    name: "acjKumackCh",
    fieldName: "acjKumackCh",
    type: "data",
    width: "80",
    header: {
      text: "차변",
    },
  },
  {
    name: "acjKumackDa",
    fieldName: "acjKumackDa",
    type: "data",
    width: "80",
    header: {
      text: "대변",
    },
  },
  {
    name: "acjKumackSum",
    fieldName: "acjKumackSum",
    type: "data",
    width: "80",
    header: {
      text: "잔액",
    },
  },
];
