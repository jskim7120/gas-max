import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "guChkamt",
    dataType: ValueType.BOOLEAN,
  },
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
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjGum",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjGage",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjDangkum",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gjMisu",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gjPerkum",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjTotal",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gjJirodate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjMisujan",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gjSwName",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: "guChkamt",
    fieldName: "guChkamt",
    width: "40",
    header: {
      text: "선택",
    },
    type: "Boolean",
    defaultValue: true,
    renderer: {
      type: "check",
      editable: true,
    },
    editor: {
      type: "check",
      editable: false,
    },
  },
  {
    name: "gjGumymsno",
    fieldName: "gjGumymsno",
    type: "data",
    width: "80",
    header: {
      text: "회차",
    },
  },
  {
    name: "gjDate",
    fieldName: "gjDate",
    type: "data",
    width: "80",
    header: {
      text: "검침일",
    },
  },
  {
    name: "gjJungum",
    fieldName: "gjJungum",
    type: "data",
    width: "80",
    header: {
      text: "전검침",
    },
  },
  {
    name: "gjGum",
    fieldName: "gjGum",
    type: "data",
    width: "80",
    header: {
      text: "당검침",
    },
    styleName: "rg-right-column",
  },
  {
    name: "gjGage",
    fieldName: "gjGage",
    type: "data",
    width: "80",
    header: {
      text: "사용량",
    },
    styleName: "rg-right-column",
  },
  {
    name: "gjDangkum",
    fieldName: "gjGage",
    type: "data",
    width: "80",
    header: {
      text: "당월금액",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "gjMisu",
    fieldName: "gjMisu",
    type: "data",
    width: "80",
    header: {
      text: "미수금액",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "gjPerkum",
    fieldName: "gjPerkum",
    type: "data",
    width: "80",
    header: {
      text: "연체료",
    },
    styleName: "rg-right-column",
  },
  {
    name: "gjTotal",
    fieldName: "gjTotal",
    type: "data",
    width: "80",
    header: {
      text: "합계",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "gjJirodate",
    fieldName: "gjJirodate",
    type: "data",
    width: "80",
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
      text: "미수액",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "gjSwName",
    fieldName: "gjSwName",
    type: "data",
    width: "90",
    header: {
      text: "사원",
    },
    styleName: "rg-left-column",
  },
];
