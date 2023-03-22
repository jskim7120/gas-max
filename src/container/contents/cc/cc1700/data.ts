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
    fieldName: "acbAccCodeName",
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
    name: "acbAccCodeName",
    fieldName: "acbAccCodeName",
    type: "data",
    width: "100",
    header: {
      text: "구분",
    },
  },
  {
    name: "acbName",
    fieldName: "acbName",
    type: "data",
    width: "100",
    header: {
      text: "은행명",
    },
  },
  {
    name: "acbBankno",
    fieldName: "acbBankno",
    type: "data",
    width: "150",
    header: {
      text: "계좌번호",
    },
  },
  {
    name: "acbBigo",
    fieldName: "acbBigo",
    type: "data",
    width: "150",
    header: {
      text: "적용",
    },
  },
];
