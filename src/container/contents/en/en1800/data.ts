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
    name: "jyCode",
    fieldName: "jyCode",
    type: "data",
    width: "50",
    header: {
      text: "코드",
    },
    styleName: "rg-left-column",
  },
  {
    name: "jyName",
    fieldName: "jyName",
    type: "data",
    width: "200",
    styleName: "rg-left-column",
    header: {
      text: "지역 분류명",
    },
  },
];
