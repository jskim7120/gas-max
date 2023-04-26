import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bcDate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bcBuName",
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
    fieldName: "bcInqty",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bcInkg",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bcCost",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bcAmt",
    dataType: ValueType.TEXT,
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
    name: "bcDate",
    fieldName: "bcDate",
    type: "data",
    width: "100",
    header: {
      text: "일자",
    },
  },
  {
    name: "bcBuName",
    fieldName: "bcBuName",
    type: "data",
    width: "200",
    styleName: "rg-left-column",
    header: {
      text: "충전소명",
    },
  },
  {
    name: "bclJpCode",
    fieldName: "bclJpCode",
    type: "data",
    width: "100",
    header: {
      text: "코드",
    },
  },
  {
    name: "bclJpName",
    fieldName: "bclJpName",
    type: "data",
    width: "200",
    styleName: "rg-left-column",
    header: {
      text: "품명",
    },
  },
  {
    name: "bcInqty",
    fieldName: "bcInqty",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "입고수량",
    },
  },
  {
    name: "bcInkg",
    fieldName: "bcInkg",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "입고량",
    },
  },
  {
    name: "bcCost",
    fieldName: "bcCost",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "단가",
    },
  },
  {
    name: "bcAmt",
    fieldName: "bcAmt",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "금액",
    },
  },
];
