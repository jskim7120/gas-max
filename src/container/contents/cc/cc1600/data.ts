import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "acsTypeName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "acsAccCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "acsAccName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "acsName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "acsDelYn",
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
    name: "acsTypeName",
    fieldName: "acsTypeName",
    type: "data",
    width: "50",
    header: {
      text: "구분",
    },
  },
  {
    name: "acsAccCode",
    fieldName: "acsAccCode",
    type: "data",
    width: "50",
    styleName: "rg-left-column",
    header: {
      text: "코드",
    },
  },
  {
    name: "acsAccName",
    fieldName: "acsAccName",
    type: "data",
    width: "80",
    styleName: "rg-left-column",
    header: {
      text: "계정과목",
    },
  },
  {
    name: "acsName",
    fieldName: "acsName",
    type: "data",
    width: "100",
    header: {
      text: "수입/지출 항목",
    },
  },
  {
    name: "acsDelYn",
    fieldName: "acsDelYn",
    type: "data",
    width: "80",
    header: {
      text: "변경가능",
    },
  },
];
