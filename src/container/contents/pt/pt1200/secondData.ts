import { ValueType } from "realgrid";

export const fieldsSecond = [
  {
    fieldName: "gjGumymsno",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjDate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjJungum",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gjGum",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gjGage",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjDangkum",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjMisu",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjPerkum",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjTotal",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjJiroDate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjMisujan",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjSwName",
    dataType: ValueType.TEXT,
  },
];

export const columnsSecond = [
  {
    name: "gjGumymsno",
    fieldName: "gjGumymsno",
    type: "data",
    width: "100",
    header: {
      text: "회차",
    },
  },
  {
    name: "gjDate",
    fieldName: "gjDate",
    type: "data",
    width: "100",
    header: {
      text: "검침일",
    },
  },
  {
    name: "gjJungum",
    fieldName: "gjJungum",
    type: "data",
    width: "120",
    header: {
      text: "전검침",
    },
    styleName: "rg-right-column",
  },
  {
    name: "gjGum",
    fieldName: "gjGum",
    type: "data",
    width: "150",
    header: {
      text: "당검침",
    },
    styleName: "rg-right-column",
  },
  {
    name: "gjGage",
    fieldName: "gjGage",
    type: "data",
    width: "100",
    header: {
      text: "사용량",
    },
    styleName: "rg-right-column",
  },
  {
    name: "gjDangkum",
    fieldName: "gjDangkum",
    type: "data",
    width: "100",
    header: {
      text: "당월금액",
    },
    styleName: "rg-right-column",
  },
  {
    name: "gjMisu",
    fieldName: "gjMisu",
    type: "data",
    width: "100",
    header: {
      text: "전미수",
    },
    styleName: "rg-right-column",
  },
  {
    name: "gjPerkum",
    fieldName: "gjPerkum",
    type: "data",
    width: "100",
    header: {
      text: "연체료",
    },
    styleName: "rg-right-column",
  },
  {
    name: "gjTotal",
    fieldName: "gjTotal",
    type: "data",
    width: "100",
    header: {
      text: "당월합계",
    },
    styleName: "rg-right-column",
  },
  {
    name: "gjJirodate",
    fieldName: "gjJirodate",
    type: "data",
    width: "100",
    header: {
      text: "지로발행일",
    },
  },
  {
    name: "gjMisujan",
    fieldName: "gjMisujan",
    type: "data",
    width: "100",
    header: {
      text: "미수잔액",
    },
    styleName: "rg-right-column",
  },
  {
    name: "gjSwName",
    fieldName: "gjSwName",
    type: "data",
    width: "100",
    header: {
      text: "사원",
    },
  },
];
