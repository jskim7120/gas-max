import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jyCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jyName",
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
    footer: {
      valueCallback: function (grid: any) {
        return grid.getSummary("areaCode", "count");
      },
    },
  },
  {
    name: "jyCode",
    fieldName: "jyCode",
    type: "data",
    width: "120",
    header: {
      text: "코드",
    },
  },
  {
    name: "jyName",
    fieldName: "jyName",
    type: "data",
    width: "120",
    styleName: "rg-left-column",
    header: {
      text: "분류명",
    },
  },
];
