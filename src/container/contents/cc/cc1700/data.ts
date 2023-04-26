import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "acbAreaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "acbCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "acbAccCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "acbName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "acbBankno",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "acbBigo",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: "acbAreaCode",
    fieldName: "acbAreaCode",
    type: "data",
    width: "50",
    header: {
      text: "영업소",
    },
  },
  {
    name: "acbCode",
    fieldName: "acbCode",
    type: "data",
    width: "50",
    header: {
      text: "코드",
    },
  },
  {
    name: "acbAccCode",
    fieldName: "acbAccCode",
    type: "data",
    width: "80",
    header: {
      text: "구분",
    },
  },
  {
    name: "acbName",
    fieldName: "acbName",
    type: "data",
    width: "150",
    styleName: "rg-left-column",
    header: {
      text: "은행명",
    },
  },
  {
    name: "acbBankno",
    fieldName: "acbBankno",
    type: "data",
    width: "250",
    styleName: "rg-left-column",
    header: {
      text: "계좌번호",
    },
  },
  {
    name: "acbBigo",
    fieldName: "acbBigo",
    type: "data",
    width: "250",
    styleName: "rg-left-column",
    header: {
      text: "적용",
    },
  },
];
