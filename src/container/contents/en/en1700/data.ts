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
    name: "caCode",
    fieldName: "caCode",
    type: "data",
    width: "80",
    header: {
      text: "코드",
    },
  },
  {
    name: "caName",
    fieldName: "caName",
    type: "data",
    width: "120",
    header: {
      text: "차량번호",
    },
  },
  {
    name: "caSwName",
    fieldName: "caSwName",
    type: "data",
    width: "120",
    header: {
      text: "담당사원",
    },
  },
  {
    name: "caType",
    fieldName: "caType",
    type: "data",
    width: "100",
    header: {
      text: "차량종류",
    },
  },
  {
    name: "caYear",
    fieldName: "caYear",
    type: "data",
    width: "100",
    header: {
      text: "연식",
    },
  },

  {
    name: "caBldateT",
    fieldName: "caBldateT",
    type: "data",
    width: "120",
    header: {
      text: "검사기간",
    },
  },

  {
    name: "caJaegoyn",
    fieldName: "caJaegoyn",
    type: "data",
    width: "80",
    header: {
      text: "재고사용유",
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
