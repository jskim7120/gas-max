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
    fieldName: "gjJirodate",
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
  },
  {
    name: "gjJirodate",
    fieldName: "gjJirodate",
    type: "data",
    width: "80",
    header: {
      text: "지로발행일",
    },
    styleName: "rg-right-column",
  },
  {
    name: "gjMisujan",
    fieldName: "gjMisujan",
    type: "data",
    width: "80",
    header: {
      text: "미수액",
    },
  },
  {
    name: "gjSwName",
    fieldName: "gjSwName",
    type: "data",
    width: "80",
    header: {
      text: "사원",
    },
  },
];
