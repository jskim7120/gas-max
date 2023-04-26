import { ValueType } from "realgrid";

export const fields3 = [
  {
    fieldName: "bclGubunName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bclJpCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bclJpName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bclUnit",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bclSpecific",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bclBulkKg",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "bclBulkL",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "bclCost",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "bclVatType",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "bclAmt",
    dataType: ValueType.NUMBER,
  },
];

export const columns3 = [
  {
    name: "bclGubunName",
    fieldName: "bclGubunName",
    width: "60",
    type: "data",
    header: {
      text: "구분",
    },
    editable: false,
  },
  {
    name: "bclJpCode",
    fieldName: "bclJpCode",
    button: "action",
    buttonVisibility: "always",
    width: "80",
    type: "data",
    header: {
      text: "코드",
    },
    editable: false,
  },
  {
    name: "bclJpName",
    fieldName: "bclJpName",
    width: "100",
    type: "data",
    styleName: "rg-left-column",
    header: {
      text: "품명",
    },
    editable: false,
  },
  {
    name: "bclUnit",
    fieldName: "bclUnit",
    width: "50",
    type: "data",
    header: {
      text: "단위",
    },
    editable: false,
  },
  {
    name: "bclSpecific",
    fieldName: "bclSpecific",
    width: "80",
    styleName: "rg-right-column",
    type: "data",
    header: {
      text: "비중",
    },
    editable: false,
  },
  {
    name: "bclBulkKg",
    fieldName: "bclBulkKg",
    width: "80",
    styleName: "rg-right-column",
    type: "data",
    numberFormat: "#",
    header: {
      text: "매입량(kg)",
    },
  },
  {
    name: "bclBulkL",
    fieldName: "bclBulkL",
    width: "80",
    styleName: "rg-right-column",
    type: "data",
    numberFormat: "#",
    header: {
      text: "매입량(ℓ)",
    },
  },
  {
    name: "bclCost",
    fieldName: "bclCost",
    width: "80",
    styleName: "rg-right-column",
    type: "data",
    numberFormat: "#,##0",
    header: {
      text: "단가",
    },
  },
  {
    name: "bclVatType",
    fieldName: "bclVatType",
    width: "80",
    styleName: "rg-right-column",
    type: "data",
    numberFormat: "#,##0",
    header: {
      text: "VAT",
    },
  },
  {
    name: "bclAmt",
    fieldName: "bclAmt",
    width: "80",
    styleName: "rg-right-column",
    type: "data",
    numberFormat: "#,##0",
    header: {
      text: "금액",
    },
    editable: false,
  },
];
