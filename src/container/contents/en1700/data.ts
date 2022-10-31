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
    fieldName: "caBldate",
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
    styles: {
      textAlignment: "near",
    },
    header: {
      text: "업소",
    },
  },
  {
    name: "caCode",
    fieldName: "caCode",
    type: "data",
    width: "80",
    styles: {
      textAlignment: "near",
    },
    header: {
      text: "차량명",
    },
  },
  {
    name: "caName",
    fieldName: "caName",
    type: "data",
    width: "120",
    styles: {
      textAlignment: "near",
    },
    header: {
      text: "담당사원",
    },
  },
  {
    name: "caSwName",
    fieldName: "caSwName",
    type: "data",
    width: "120",
    styles: {
      textAlignment: "near",
    },
    header: {
      text: "차종",
    },
  },
  {
    name: "caType",
    fieldName: "caType",
    type: "data",
    width: "100",
    styles: {
      textAlignment: "near",
    },
    header: {
      text: "연식",
    },
  },
  {
    name: "caYear",
    fieldName: "caYear",
    type: "data",
    width: "100",
    styles: {
      textAlignment: "near",
    },
    header: {
      text: "보험기간",
    },
  },

  {
    name: "caBldate",
    fieldName: "caBldate",
    type: "data",
    width: "100",
    styles: {
      textAlignment: "near",
    },
    header: {
      text: "검사기간",
    },
  },

  {
    name: "caJaegoyn",
    fieldName: "caJaegoyn",
    type: "data",
    width: "80",
    styles: {
      textAlignment: "near",
    },
    header: {
      text: "재고사용",
    },
  },

  {
    name: "caBigo",
    fieldName: "caBigo",
    type: "data",
    width: "80",
    styles: {
      textAlignment: "near",
    },
    header: {
      text: "비고",
    },
  },
];
