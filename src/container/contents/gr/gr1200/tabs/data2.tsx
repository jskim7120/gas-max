import { ValueType } from "realgrid";

export const fields2 = [
  {
    fieldName: "bclJpCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bclJpName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bclInqty",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "bclInc",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bclOutc",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bclOutqty",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "bclInmigum",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "bclOutmigum",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "bclChungbok",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bclChungdae",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bclTongdel",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bclCost",
    dataType: ValueType.TEXT,
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

export const columns2 = [
  {
    name: "bclJpCode",
    fieldName: "bclJpCode",
    width: "60",
    type: "data",
    header: {
      text: "코드",
    },
    editable: false,
  },
  {
    name: "bclJpName",
    fieldName: "bclJpName",
    button: "action",
    buttonVisibility: "always",
    width: "150",
    type: "data",
    header: {
      text: "품명",
    },
    editable: false,
  },
  {
    name: "bclInqty",
    fieldName: "bclInqty",
    width: "60",
    type: "data",
    header: {
      text: "입고",
    },
    footer: {
      numberFormat: "#.0",
      expression: "sum",
    },
  },
  {
    name: "bclInc",
    fieldName: "bclInc",
    width: "60",
    type: "data",
    header: {
      text: "출고",
    },
  },
  {
    name: "bclOutc",
    fieldName: "bclOutc",
    width: "60",
    type: "data",
    header: {
      text: "입고",
    },
  },
  {
    name: "bclOutqty",
    fieldName: "bclOutqty",
    width: "60",
    type: "data",
    header: {
      text: "출고",
    },
    footer: {
      numberFormat: "#.0",
      expression: "sum",
    },
  },
  {
    name: "bclInmigum",
    fieldName: "bclInmigum",
    width: "60",
    type: "data",
    header: {
      text: "입고",
    },
    footer: {
      numberFormat: "#.0",
      expression: "sum",
    },
  },
  {
    name: "bclOutmigum",
    fieldName: "bclOutmigum",
    width: "60",
    type: "data",
    header: {
      text: "출고",
    },
    footer: {
      numberFormat: "#.0",
      expression: "sum",
    },
  },
  {
    name: "bclChungbok",
    fieldName: "bclChungbok",
    width: "60",
    type: "data",
    header: {
      text: "입고",
    },
  },
  {
    name: "bclChungdae",
    fieldName: "bclChungdae",
    width: "60",
    type: "data",
    header: {
      text: "출고",
    },
  },
  {
    name: "bclTongdel",
    fieldName: "bclTongdel",
    width: "60",
    type: "data",
    header: {
      text: "폐기",
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
    footer: {
      numberFormat: "#.0",
      expression: "sum",
    },
  },
];

export const layout2 = [
  "bclJpCode",
  "bclJpName",
  {
    name: "someGroup1",
    direction: "horizontal",
    items: ["bclInqty", "bclInc"],
    header: {
      text: "실병용기",
    },
  },
  {
    name: "someGroup2",
    direction: "horizontal",
    items: ["bclOutc", "bclOutqty"],
    header: {
      text: "공병용기",
    },
  },
  {
    name: "someGroup3",
    direction: "horizontal",
    items: ["bclInmigum", "bclOutmigum"],
    header: {
      text: "미검용기",
    },
  },
  {
    name: "someGroup4",
    direction: "horizontal",
    items: ["bclChungbok", "bclChungdae"],
    header: {
      text: "보관용기",
    },
  },

  "bclTongdel",
  "bclCost",
  "bclVatType",
  "bclAmt",
];
