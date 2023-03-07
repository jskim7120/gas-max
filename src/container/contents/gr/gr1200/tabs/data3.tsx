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
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bclBulkL",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bclCost",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bclVatType",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bclAmt",
    dataType: ValueType.TEXT,
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
  },
  {
    name: "bclJpCode",
    fieldName: "bclJpCode",
    button: "action",
    buttonVisibility: "always",
    width: "150",
    type: "data",
    header: {
      text: "코드",
    },
  },
  {
    name: "bclJpName",
    fieldName: "bclJpName",
    width: "60",
    type: "data",
    header: {
      text: "품명",
    },
  },
  {
    name: "bclUnit",
    fieldName: "bclUnit",
    width: "60",
    type: "data",
    header: {
      text: "단위",
    },
  },
  {
    name: "bclSpecific",
    fieldName: "bclSpecific",
    width: "60",
    type: "data",
    header: {
      text: "비중",
    },
  },
  {
    name: "bclBulkKg",
    fieldName: "bclBulkKg",
    width: "60",
    type: "data",
    header: {
      text: "매입량(kg)",
    },
  },
  {
    name: "bclBulkL",
    fieldName: "bclBulkL",
    width: "60",
    type: "data",
    header: {
      text: "매입량(ℓ)",
    },
  },
  {
    name: "bclCost",
    fieldName: "bclCost",
    width: "60",
    type: "data",
    header: {
      text: "단가",
    },
  },
  {
    name: "bclVatType",
    fieldName: "bclVatType",
    width: "60",
    type: "data",
    header: {
      text: "VAT",
    },
  },
  {
    name: "bclAmt",
    fieldName: "bclAmt",
    width: "60",
    type: "data",
    header: {
      text: "금액",
    },
  },
];
