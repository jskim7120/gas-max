import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "cuCno",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuUsername",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuAddr1",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuGongname",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuRh2O",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "jnCost",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "cuPer",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuCdc",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuSwName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuRdangaSign",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: "cuCno",
    fieldName: "cuCno",
    type: "data",
    width: "60",
    header: {
      text: "순번",
    },
    footer: {
      valueCallback: function (grid: any) {
        return grid.getSummary("cuCno", "count");
      },
    },
  },
  {
    name: "cuCode",
    fieldName: "cuCode",
    type: "data",
    width: "80",
    header: {
      text: "거래처코드",
    },
  },

  {
    name: "cuName",
    fieldName: "cuName",
    type: "data",
    width: "200",
    styleName: "rg-left-column",
    header: {
      text: "거래처명",
    },
  },
  {
    name: "cuUsername",
    fieldName: "cuUsername",
    type: "data",
    width: "150",
    styleName: "rg-left-column",
    header: {
      text: "사용자명",
    },
  },
  {
    name: "cuAddr1",
    fieldName: "cuAddr1",
    type: "data",
    width: "250",
    styleName: "rg-left-column",
    header: {
      text: "주소",
    },
  },
  {
    name: "cuGongname",
    fieldName: "cuGongname",
    type: "data",
    width: "80",
    header: {
      text: "성명",
    },
  },
  {
    name: "cuRh2O",
    fieldName: "cuRh2O",
    type: "data",
    width: "60",
    header: {
      text: "조정기",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "jnCost",
    fieldName: "jnCost",
    type: "data",
    width: "80",
    header: {
      text: "루베단가",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "cuPer",
    fieldName: "cuPer",
    type: "data",
    width: "50",
    header: {
      text: "연체율",
    },
  },
  {
    name: "cuCdc",
    fieldName: "cuCdc",
    type: "data",
    width: "50",
    header: {
      text: "할인율",
    },
  },
  {
    name: "cuSwName",
    fieldName: "cuSwName",
    type: "data",
    width: "80",
    styleName: "rg-left-column",
    header: {
      text: "담당사원",
    },
  },
  {
    name: "cuRdangaSign",
    fieldName: "cuRdangaSign",
    type: "data",
    width: "80",
    styleName: "rg-left-column",
    header: {
      text: "단가구분",
    },
  },
];
