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
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "curAmt",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "curPay",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "curDc",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "curUnpay",
    dataType: ValueType.NUMBER,
  },
];

export const columns = [
  {
    name: "areaCode",
    fieldName: "areaCode",
    type: "data",
    width: "60",
    header: {
      text: "영업소",
    },
  },
  {
    name: "buGubunName",
    fieldName: "buGubunName",
    type: "data",
    width: "60",
    header: {
      text: "구분",
    },
    footer: {
      valueCallback: function (grid: any) {
        return grid.getSummary("buGubunName", "count");
      },
    },
  },
  {
    name: "buCode",
    fieldName: "buCode",
    type: "data",
    width: "50",
    header: {
      text: "코드",
    },
    styleName: "rg-left-column",
  },
  {
    name: "buName",
    fieldName: "buName",
    type: "data",
    width: "200",
    header: {
      text: "상호 (매입처명)",
    },
    styleName: "rg-left-column",
    footer: {
      text: "합  계",
    },
  },
  {
    name: "befAmt",
    fieldName: "befAmt",
    type: "data",
    width: "80",
    header: {
      text: "이월금액",
    },
    styleName: "rg-right-column",
    footer: {
      expression: "sum",
    },
    numberFormat: "#,##0",
  },
  {
    name: "curAmt",
    fieldName: "curAmt",
    type: "data",
    width: "80",
    header: {
      text: "당월금액",
    },
    styleName: "rg-right-column",
    footer: {
      expression: "sum",
    },
    numberFormat: "#,##0",
  },
  {
    name: "curPay",
    fieldName: "curPay",
    type: "data",
    width: "80",
    header: {
      text: "당월지급",
    },
    styleName: "rg-right-column",
    footer: {
      expression: "sum",
    },
    numberFormat: "#,##0",
  },
  {
    name: "curDc",
    fieldName: "curDc",
    type: "data",
    width: "80",
    header: {
      text: "지급 D/C",
    },
    styleName: "rg-right-column",
    footer: {
      expression: "sum",
    },
    numberFormat: "#,##0",
  },
  {
    name: "curUnpay",
    fieldName: "curUnpay",
    type: "data",
    width: "80",
    header: {
      text: "미지급액",
    },
    styleName: "rg-right-column",
    footer: {
      expression: "sum",
    },

    numberFormat: "#,##0",
  },
];
