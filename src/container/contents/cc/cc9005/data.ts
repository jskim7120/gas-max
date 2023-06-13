import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "acbAreaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "accName",
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
    fieldName: "bankKumack",
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
    footer: {
      valueCallback: function (grid: any) {
        return grid.getSummary("areaCode", "count");
      },
    },
  },
  {
    name: "accName",
    fieldName: "accName",
    type: "data",
    width: "100",
    header: {
      text: "계정 과목",
    },
  },
  {
    name: "acbName",
    fieldName: "acbName",
    type: "data",
    width: "120",
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
      text: "계좌 번호",
    },
  },
  {
    name: "bankKumack",
    fieldName: "bankKumack",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "잔액",
    },
  },
];
