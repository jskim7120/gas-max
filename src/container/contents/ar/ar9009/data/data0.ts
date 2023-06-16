import { ValueType } from "realgrid";

export const fields0 = [
  {
    fieldName: "areaCode",
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
    fieldName: "cuTel",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "junmisu",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gjKumack",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gjAnkum",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gjDc",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gjPerkum",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gjTotal",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gsKumack",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gsDc",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "dangmisu",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "rowchk",
    dataType: ValueType.TEXT,
  },
];

export const columns0 = [
  {
    name: "areaCode",
    fieldName: "areaCode",
    type: "data",
    width: "50",
    header: {
      text: "영업소",
    },
  },
  {
    name: "cuCno",
    fieldName: "cuCno",
    type: "data",
    width: "50",
    header: {
      text: "",
    },
  },
  {
    name: "cuCode",
    fieldName: "cuCode",
    type: "data",
    width: "80",
    header: {
      text: "코드",
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
    name: "cuTel",
    fieldName: "cuTel",
    type: "data",
    width: "110",
    styleName: "rg-left-column",
    header: {
      text: "전화",
    },
  },
  {
    name: "junmisu",
    fieldName: "junmisu",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "전월미수",
    },
    numberFormat: "#,##0",
  },
  {
    name: "gjKumack",
    fieldName: "gjKumack",
    type: "data",
    width: "80",
    styleName: "rg-right-column",
    header: {
      text: "사용료",
    },
    numberFormat: "#,##0",
  },
  {
    name: "gjAnkum",
    fieldName: "gjAnkum",
    type: "data",
    width: "80",
    styleName: "rg-right-column",
    header: {
      text: "관리비",
    },
    numberFormat: "#,##0",
  },
  {
    name: "gjDc",
    fieldName: "gjDc",
    type: "data",
    width: "80",
    styleName: "rg-right-column",
    header: {
      text: "할인액",
    },
    numberFormat: "#,##0",
  },
  {
    name: "gjPerkum",
    fieldName: "gjPerkum",
    type: "data",
    width: "80",
    styleName: "rg-right-column",
    header: {
      text: "연체료",
    },
    numberFormat: "#,##0",
  },
  {
    name: "gjTotal",
    fieldName: "gjTotal",
    type: "data",
    width: "80",
    styleName: "rg-right-column",
    header: {
      text: "당월금액",
    },
    numberFormat: "#,##0",
  },
  {
    name: "gsKumack",
    fieldName: "gsKumack",
    type: "data",
    width: "80",
    styleName: "rg-right-column",
    header: {
      text: "수금액",
    },
    numberFormat: "#,##0",
  },
  {
    name: "gsDc",
    fieldName: "gsDc",
    type: "data",
    width: "80",
    styleName: "rg-right-column",
    header: {
      text: "D/C",
    },
    numberFormat: "#,##0",
  },
  {
    name: "dangmisu",
    fieldName: "dangmisu",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "당월미수",
    },
    numberFormat: "#,##0",
  },
  {
    name: "rowchk",
    fieldName: "rowchk",
    type: "data",
    width: "50",
    header: {
      text: "선택",
    },
  },
];
