import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "caCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "caName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "caSwName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "caType",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "caYear",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "caBldateT",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "caJdate2",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "caJaegoyn",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "caBigo",
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
    name: "caCode",
    fieldName: "caCode",
    type: "data",
    width: "50",
    header: {
      text: "코드",
    },
    styleName: "rg-left-column",
  },
  {
    name: "caName",
    fieldName: "caName",
    type: "data",
    width: "100",
    header: {
      text: "차량 번호",
    },
    styleName: "rg-left-column",
  },
  {
    name: "caSwName",
    fieldName: "caSwName",
    type: "data",
    width: "200",
    header: {
      text: "담당 사원",
    },
    styleName: "rg-left-column",
  },
  {
    name: "caType",
    fieldName: "caType",
    type: "data",
    width: "150",
    header: {
      text: "차량 종류",
    },
    styleName: "rg-left-column",
  },
  {
    name: "caYear",
    fieldName: "caYear",
    type: "data",
    width: "70",
    header: {
      text: "연식",
    },
    styleName: "rg-left-column",
  },
  {
    name: "caBldateT",
    fieldName: "caBldateT",
    type: "data",
    width: "100",
    header: {
      text: "보험 기간",
    },
    styleName: "rg-left-column",
  },
  {
    name: "caJdate2",
    fieldName: "caJdate2",
    type: "data",
    width: "100",
    header: {
      text: "검사 기간",
    },
    styleName: "rg-left-column",
  },

  {
    name: "caJaegoyn",
    fieldName: "caJaegoyn",
    type: "data",
    width: "95",
    header: {
      text: "재고사용 유무",
    },
  },

  {
    name: "caBigo",
    fieldName: "caBigo",
    type: "data",
    width: "80",
    styleName: "rg-left-column",
    header: {
      text: "비고",
    },
  },
];
