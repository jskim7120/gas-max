import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "no",
    dataType: ValueType.TEXT,
  },
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
    fieldName: "cuAddr",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuGongname",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuRh20",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jnCost",
    dataType: ValueType.TEXT,
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
    width: "50",
    header: {
      text: "순번",
    },
    footer: {
      valueCallback: function (grid: any) {
        return grid.getSummary("areaCode", "count");
      },
    },
  },
  {
    name: "cuCode",
    fieldName: "cuCode",
    type: "data",
    width: "100",
    header: {
      text: "거래처코드",
    },
  },

  {
    name: "cuName",
    fieldName: "cuName",
    type: "data",
    width: "150",
    header: {
      text: "거래처명",
    },
  },
  {
    name: "cuUsername",
    fieldName: "cuUsername",
    type: "data",
    width: "150",
    header: {
      text: "사용자명",
    },
    styleName: "rg-left-column",
  },
  {
    name: "cuAddr",
    fieldName: "cuAddr",
    type: "data",
    width: "50",
    header: {
      text: "주소",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "cuGongname",
    fieldName: "cuGongname",
    type: "data",
    width: "50",
    header: {
      text: "성명",
    },
    styleName: "rg-left-column",
  },
  {
    name: "cuRh20",
    fieldName: "cuRh20",
    type: "data",
    width: "50",
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
    width: "70",
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
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "cuCdc",
    fieldName: "cuCdc",
    type: "data",
    width: "50",
    header: {
      text: "할인율",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "cuSwName",
    fieldName: "cuSwName",
    type: "data",
    width: "70",
    header: {
      text: "담당사원",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "cuRdangaSign",
    fieldName: "cuRdangaSign",
    type: "data",
    width: "70",
    header: {
      text: "단가구분",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
];
