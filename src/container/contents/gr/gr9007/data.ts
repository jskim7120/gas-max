import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "bbBuName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "buDate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "buKumack",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "buVat",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "buSum",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "buOutkum",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bjDc",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bjJanack",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: "bbBuName",
    fieldName: "bbBuName",
    type: "data",
    width: "200",
    styleName: "rg-left-column",
    header: {
      text: "매입처명",
    },
    footer: {
      valueCallback: function (grid: any) {
        return grid.getSummary("bbBuName", "count");
      },
    },
  },
  {
    name: "buDate",
    fieldName: "buDate",
    type: "data",
    width: "100",
    header: {
      text: "일자",
    },
  },
  {
    name: "buKumack",
    fieldName: "buKumack",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "매입금액",
    },
  },
  {
    name: "buVat",
    fieldName: "buVat",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "세액",
    },
  },
  {
    name: "buSum",
    fieldName: "buSum",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "합계",
    },
  },
  {
    name: "buOutkum",
    fieldName: "buOutkum",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "지금액",
    },
  },
  {
    name: "bjDc",
    fieldName: "bjDc",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "D/C",
    },
  },
  {
    name: "bjJanack",
    fieldName: "bjJanack",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "잔액",
    },
  },
];
