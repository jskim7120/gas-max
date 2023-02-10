import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cjDate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cjCaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cjCaName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cjCcCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cjCcName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cjKumack",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cjSwName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cjBigo",
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
    name: "cjDate",
    fieldName: "cjDate",
    type: "data",
    width: "80",
    header: {
      text: "일자",
    },
  },

  {
    name: "cjCaCode",
    fieldName: "cjCaCode",
    type: "data",
    width: "50",
    header: {
      text: "코드",
    },
  },
  {
    name: "cjCaName",
    fieldName: "cjCaName",
    type: "data",
    width: "80",
    styleName: "rg-left-column",
    header: {
      text: "차량명",
    },
  },
  {
    name: "cjCcCode",
    fieldName: "cjCcCode",
    type: "data",
    width: "50",
    styleName: "rg-left-column",
    header: {
      text: "코드",
    },
  },
  {
    name: "cjCcName",
    fieldName: "cjCcName",
    type: "data",
    width: "100",
    styleName: "rg-left-column",
    header: {
      text: "정비명",
    },
  },
  {
    name: "cjKumack",
    fieldName: "cjKumack",
    type: "data",
    width: "80",
    styleName: "rg-right-column",
    header: {
      text: "금액",
    },
  },
  {
    name: "cjSwName",
    fieldName: "cjSwName",
    type: "data",
    width: "80",
    header: {
      text: "사원",
    },
  },
  {
    name: "cjBigo",
    fieldName: "cjBigo",
    type: "data",
    width: "120",
    header: {
      text: "비고",
    },
  },
];
