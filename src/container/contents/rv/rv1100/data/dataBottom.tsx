import { ValueType } from "realgrid";

export const fields = [
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
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gjGage",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjDanga",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjKumack",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "maintCost",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjPerkum",
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
    fieldName: "gjCuSwCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjBigo",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjSukumdate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjZdate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjJirodate",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: "gjGumymsno",
    fieldName: "gjGumymsno",
    type: "data",
    width: "100",
    header: {
      text: "년월 회차",
    },
  },
  {
    name: "gjDate",
    fieldName: "gjDate",
    type: "data",
    width: "100",
    header: {
      text: "검침일자",
    },
  },
  {
    name: "gjJungum",
    fieldName: "gjJungum",
    type: "data",
    width: "80",
    styleName: "rg-right-column",
    header: {
      text: "전월",
    },
  },
  {
    name: "gjGum",
    fieldName: "gjGum",
    type: "data",
    width: "80",
    styleName: "rg-right-column",
    header: {
      text: "당월",
    },
  },
  {
    name: "gjGage",
    fieldName: "gjGage",
    type: "data",
    width: "80",
    styleName: "rg-right-column",
    header: {
      text: "사용량",
    },
  },
  {
    name: "gjDanga",
    fieldName: "gjDanga",
    type: "data",
    width: "80",
    styleName: "rg-right-column",
    header: {
      text: "단가",
    },
  },
  {
    name: "gjKumack",
    fieldName: "gjKumack",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "사용료",
    },
  },
  {
    name: "maintCost",
    fieldName: "maintCost",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "관리비외",
    },
  },
  {
    name: "gjPerkum",
    fieldName: "gjPerkum",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "연체료",
    },
  },
  {
    name: "gjDangkum",
    fieldName: "gjDangkum",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "당월금액",
    },
  },
  {
    name: "gjMisu",
    fieldName: "gjMisu",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "미납액",
    },
  },
  {
    name: "gjCuSwCode",
    fieldName: "gjCuSwCode",
    type: "data",
    width: "100",
    header: {
      text: "검침원",
    },
  },
  {
    name: "gjBigo",
    fieldName: "gjBigo",
    type: "data",
    width: "120",
    header: {
      text: "비고",
    },
  },
  {
    name: "gjSukumdate",
    fieldName: "gjSukumdate",
    type: "data",
    width: "100",
    header: {
      text: "수납일",
    },
  },
  {
    name: "gjZdate",
    fieldName: "gjZdate",
    type: "data",
    width: "100",
    header: {
      text: "납부마감일",
    },
  },
  {
    name: "gjJirodate",
    fieldName: "gjJirodate",
    type: "data",
    width: "100",
    header: {
      text: "지로출력일",
    },
  },
];
