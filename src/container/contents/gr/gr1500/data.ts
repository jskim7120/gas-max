import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "buGubunName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "buCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "buName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "befAmt",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "curAmt",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "curPay",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "curDc",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "curUnpa",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: "areaCode",
    fieldName: "areaCode",
    type: "data",
    width: "20",
    header: {
      text: "영업소",
    },
  },
  {
    name: "buGubunName",
    fieldName: "buGubunName",
    type: "data",
    width: "40",
    header: {
      text: "구분",
    },
  },
  {
    name: "buCode",
    fieldName: "buCode",
    type: "data",
    width: "80",
    header: {
      text: "코드",
    },
    styleName: "rg-left-column",
  },
  {
    name: "buName",
    fieldName: "buName",
    type: "data",
    width: "40",
    header: {
      text: "상호 (매입처명)",
    },
    styleName: "rg-left-column",
  },
  {
    name: "befAmt",
    fieldName: "befAmt",
    type: "data",
    width: "40",
    header: {
      text: "이월금액",
    },
    styleName: "rg-left-column",
  },
  {
    name: "curAmt",
    fieldName: "curAmt",
    type: "data",
    width: "80",
    header: {
      text: "당월금액",
    },
    styleName: "rg-left-column",
  },
  {
    name: "curPay",
    fieldName: "curPay",
    type: "data",
    width: "20",
    header: {
      text: "당월지급",
    },
    styleName: "rg-left-column",
  },
  {
    name: "curDc",
    fieldName: "curDc",
    type: "data",
    width: "40",
    header: {
      text: "당월지급",
    },
    styleName: "rg-right-column",
  },
  {
    name: "curUnpa",
    fieldName: "curUnpa",
    type: "data",
    width: "40",
    header: {
      text: "지급 D/C",
    },
    styleName: "rg-right-column",
  },
];
