import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gubunCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gubunName",
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
    name: "gubunCode",
    fieldName: "gubunCode",
    type: "data",
    width: "50",
    header: {
      text: "코드",
    },
    styleName: "rg-left-column",
  },
  {
    name: "gubunName",
    fieldName: "gubunName",
    type: "data",
    width: "200",
    styleName: "rg-left-column",
    header: {
      text: "관리자 분류명",
    },
  },
];
