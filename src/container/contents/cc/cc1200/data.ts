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
    fieldName: "acjJno",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "acjAccName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "acjBigo",
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
];

export const columns = [
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
    name: "acjDate",
    fieldName: "acjDate",
    type: "data",
    width: "80",
    header: {
      text: "일자",
    },
  },
  {
    name: "acjJno",
    fieldName: "acjJno",
    type: "data",
    width: "80",
    header: {
      text: "전표번호",
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
    name: "acjBigo",
    fieldName: "acjBigo",
    type: "data",
    width: "120",
    header: {
      text: "적요",
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
];
