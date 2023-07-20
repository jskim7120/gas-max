import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "sgDate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "sgSwName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "sgBigo",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "sgKumack",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "sgKumackB",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "sgJanack",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: "areaCode",
    fieldName: "areaCode",
    type: "data",
    width: "90",
    header: {
      text: "영업소",
    },
  },
  {
    name: "sgDate",
    fieldName: "sgDate",
    type: "data",
    width: "90",
    header: {
      text: "일자",
    },
    footer: {
      valueCallback: function (grid: any) {
        return grid.getSummary("sgDate", "count");
      },
    },
  },
  {
    name: "sgSwName",
    fieldName: "sgSwName",
    type: "data",
    width: "100",
    styleName: "rg-left-column",
    header: {
      text: "사원",
    },
  },
  {
    name: "sgBigo",
    fieldName: "sgBigo",
    type: "data",
    width: "250",
    header: {
      text: "비고",
    },
  },
  {
    name: "sgKumack",
    fieldName: "sgKumack",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "가불 금액",
    },
  },
  {
    name: "sgKumackB",
    fieldName: "sgKumackB",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "반제 금액",
    },
  },
  {
    name: "sgJanack",
    fieldName: "sgJanack",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "잔액",
    },
  },
];
