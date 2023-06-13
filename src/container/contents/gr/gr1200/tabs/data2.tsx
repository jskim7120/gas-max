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
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "bclOutc",
    dataType: ValueType.NUMBER,
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
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "bclChungdae",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "bclTongdel",
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
    footer: {
      valueCallback: function (grid: any) {
        return grid.getSummary("areaCode", "count");
      },
    },
  },
  {
    name: "bclJpName",
    fieldName: "bclJpName",
    button: "action",
    buttonVisibility: "always",
    width: "150",
    type: "data",
    styleName: "rg-left-column",
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
    styleName: "rg-right-column",
    numberFormat: "#",
    header: {
      text: "입고",
    },
    footer: {
      expression: "sum",
      numberFormat: "#",
    },
  },
  {
    name: "bclInc",
    fieldName: "bclInc",
    width: "60",
    type: "data",
    styleName: "rg-right-column",
    numberFormat: "#",
    header: {
      text: "출고",
    },
  },
  {
    name: "bclOutc",
    fieldName: "bclOutc",
    width: "60",
    type: "data",
    styleName: "rg-right-column",
    numberFormat: "#",
    header: {
      text: "입고",
    },
  },
  {
    name: "bclOutqty",
    fieldName: "bclOutqty",
    width: "60",
    type: "data",
    styleName: "rg-right-column",
    numberFormat: "#",
    header: {
      text: "출고",
    },
    footer: {
      expression: "sum",
      numberFormat: "#",
    },
  },
  {
    name: "bclInmigum",
    fieldName: "bclInmigum",
    width: "60",
    type: "data",
    styleName: "rg-right-column",
    numberFormat: "#",
    header: {
      text: "입고",
    },
    footer: {
      expression: "sum",
      numberFormat: "#",
    },
  },
  {
    name: "bclOutmigum",
    fieldName: "bclOutmigum",
    width: "60",
    type: "data",
    styleName: "rg-right-column",
    numberFormat: "#",
    header: {
      text: "출고",
    },
    footer: {
      expression: "sum",
      numberFormat: "#",
    },
  },
  {
    name: "bclChungbok",
    fieldName: "bclChungbok",
    width: "60",
    type: "data",
    styleName: "rg-right-column",
    numberFormat: "#",
    header: {
      text: "입고",
    },
  },
  {
    name: "bclChungdae",
    fieldName: "bclChungdae",
    width: "60",
    type: "data",
    styleName: "rg-right-column",
    numberFormat: "#",
    header: {
      text: "출고",
    },
  },
  {
    name: "bclTongdel",
    fieldName: "bclTongdel",
    width: "60",
    type: "data",
    styleName: "rg-right-column",
    numberFormat: "#",
    header: {
      text: "폐기",
    },
  },
  {
    name: "bclCost",
    fieldName: "bclCost",
    width: "60",
    type: "data",
    styleName: "rg-right-column",
    numberFormat: "#,##0",
    header: {
      text: "단가",
    },
  },
  {
    name: "bclVatType",
    fieldName: "bclVatType",
    width: "60",
    type: "data",
    styleName: "rg-right-column",
    numberFormat: "#,##0",
    header: {
      text: "VAT",
    },
  },
  {
    name: "bclAmt",
    fieldName: "bclAmt",
    width: "100",
    type: "data",
    styleName: "rg-right-column",
    numberFormat: "#,##0",
    header: {
      text: "금액",
    },
    footer: {
      expression: "sum",
      numberFormat: "#,###",
    },
    editable: false,
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
