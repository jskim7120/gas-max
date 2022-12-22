import { ValueType } from "realgrid";
import BAR from "assets/image/Barcode.png";
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
    dataType: ValueType.TEXT,
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
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bclInmigum",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bclOutmigum",
    dataType: ValueType.TEXT,
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
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bclAmt",
    dataType: ValueType.TEXT,
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
  },
  {
    name: "bclJpName",
    fieldName: "bclJpName",
    button: "action",
    width: "150",
    type: "data",
    header: {
      text: "품명",
    },
  },
  {
    name: "bclInqty",
    fieldName: "bclInqty",
    width: "60",
    type: "data",
    header: {
      text: "입고",
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
  },
  {
    name: "bclInmigum",
    fieldName: "bclInmigum",
    width: "60",
    type: "data",
    header: {
      text: "입고",
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
