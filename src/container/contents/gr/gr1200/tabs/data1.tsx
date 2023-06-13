import { ValueType } from "realgrid";

export const fields1 = [
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
    fieldName: "bclSvyn",
    dataType: ValueType.TEXT,
  },
];

export const columns1 = [
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
    styleName: "rg-left-column",
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
    styleName: "rg-right-column",
    numberFormat: "#",
    header: {
      text: "입고",
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
    name: "bclSvyn",
    fieldName: "bclSvyn",
    width: "60",
    type: "data",
    header: {
      text: "무료 충전",
    },
    editable: false,
  },
];

export const layout1 = [
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
  "bclSvyn",
];
