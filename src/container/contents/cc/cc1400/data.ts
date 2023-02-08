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
    fieldName: "sgSwCode",
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
    footer: {
      valueCallback: function (grid: any) {
        return grid.getSummary("areaCode", "count");
      },
    },
  },
  {
    name: "sgDate",
    fieldName: "sgDate",
    type: "data",
    width: "80",
    header: {
      text: "일자",
    },
  },

  {
    name: "sgSwCode",
    fieldName: "sgSwCode",
    type: "data",
    width: "50",
    header: {
      text: "코드",
    },
  },
  {
    name: "sgSwName",
    fieldName: "sgSwName",
    type: "data",
    width: "100",
    header: {
      text: "사원",
    },
  },
  {
    name: "sgBigo",
    fieldName: "sgBigo",
    type: "data",
    width: "200",
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
      text: "금액",
    },
  },
];
