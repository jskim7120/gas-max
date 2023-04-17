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
    dataType: ValueType.NUMBER,
  },
];

export const columns = [
  {
    name: "areaCode",
    fieldName: "areaCode",
    type: "data",
    width: "50",
    header: {
      text: "영 업 소",
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
      text: "일 자",
    },
  },

  {
    name: "sgSwCode",
    fieldName: "sgSwCode",
    type: "data",
    width: "50",
    header: {
      text: "코 드",
    },
  },
  {
    name: "sgSwName",
    fieldName: "sgSwName",
    type: "data",
    width: "100",
    header: {
      text: "사 원",
    },
  },
  {
    name: "sgBigo",
    fieldName: "sgBigo",
    type: "data",
    width: "200",
    styleName: "rg-left-column",
    header: {
      text: "비 고",
    },
  },
  {
    name: "sgKumack",
    fieldName: "sgKumack",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "금 액",
    },
    numberFormat: "#,##0",
  },
];
