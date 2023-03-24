import { ValueType } from "realgrid";

export const fieldsThird = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "msDate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "msCuCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "msCuName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "msKumack",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "msDc",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "msSwName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "msSukumtype",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "msBigo",
    dataType: ValueType.TEXT,
  },
];

export const columnsThird = [
  {
    name: "areaCode",
    fieldName: "areaCode",
    type: "data",
    width: "80",
    header: {
      text: "영업소",
    },
  },
  {
    name: "msDate",
    fieldName: "msDate",
    type: "data",
    width: "100",
    header: {
      text: "수금일자",
    },
  },
  {
    name: "msCuCode",
    fieldName: "msCuCode",
    type: "data",
    width: "120",
    header: {
      text: "거래처코드",
    },
  },
  {
    name: "msCuName",
    fieldName: "msCuName",
    type: "data",
    width: "150",
    header: {
      text: "거래처명",
    },
    styleName: "rg-left-column",
  },
  {
    name: "msKumack",
    fieldName: "msKumack",
    type: "data",
    width: "100",
    header: {
      text: "수금액",
    },
    styleName: "rg-right-column",
  },
  {
    name: "msDc",
    fieldName: "msDc",
    type: "data",
    width: "100",
    header: {
      text: "D/C",
    },
    styleName: "rg-right-column",
  },
  {
    name: "msSwName",
    fieldName: "msSwName",
    type: "data",
    width: "100",
    header: {
      text: "사원",
    },
    styleName: "rg-left-column",
  },
  {
    name: "msSukumtype",
    fieldName: "msSukumtype",
    type: "data",
    width: "100",
    header: {
      text: "수금방법",
    },
  },
  {
    name: "msBigo",
    fieldName: "msBigo",
    type: "data",
    width: "100",
    header: {
      text: "비고",
    },
    styleName: "rg-left-column",
  },
];
