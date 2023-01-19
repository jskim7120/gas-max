import { ValueType } from "realgrid";

export const fields1 = [
  {
    fieldName: "bcBuName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bcYearMonth",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bcPin",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bcBin",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bcPjan",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bcBjan",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bcPsum",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bcBsum",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bcSumKum",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bcOutkum",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bcDc",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bcMisu",
    dataType: ValueType.TEXT,
  },
];

export const columns1 = [
  {
    name: "bcBuName",
    fieldName: "bcBuName",
    type: "data",
    width: "120",
    styleName: "rg-left-column",
    header: {
      text: "충전소명",
    },
  },
  {
    name: "areaCode",
    fieldName: "areaCode",
    type: "data",
    width: "70",
    header: {
      text: "영업소",
    },
  },
  {
    name: "bcYearMonth",
    fieldName: "bcYearMonth",
    type: "data",
    width: "70",
    header: {
      text: "년-월",
    },
  },
  {
    name: "bcPin",
    fieldName: "bcPin",
    type: "data",
    width: "100",
    styleName: "rg-left-column",
    header: {
      text: "프로판",
    },
  },
  {
    name: "bcBin",
    fieldName: "bcBin",
    type: "data",
    width: "100",
    styleName: "rg-left-column",
    header: {
      text: "부탄",
    },
  },
  {
    name: "bcPjan",
    fieldName: "bcPjan",
    type: "data",
    width: "100",
    styleName: "rg-left-column",
    header: {
      text: "프로판",
    },
  },
  {
    name: "bcBjan",
    fieldName: "bcBjan",
    type: "data",
    width: "100",
    styleName: "rg-left-column",
    header: {
      text: "부탄",
    },
  },
  {
    name: "bcPsum",
    fieldName: "bcPsum",
    type: "data",
    width: "100",
    styleName: "rg-left-column",
    header: {
      text: "프로판",
    },
  },
  {
    name: "bcBsum",
    fieldName: "bcBsum",
    type: "data",
    width: "100",
    styleName: "rg-left-column",
    header: {
      text: "부탄",
    },
  },
  {
    name: "bcSumKum",
    fieldName: "bcSumKum",
    type: "data",
    width: "80",
    styleName: "rg-left-column",
    header: {
      text: "매입액",
    },
  },
  {
    name: "bcOutkum",
    fieldName: "bcOutkum",
    type: "data",
    width: "80",
    styleName: "rg-left-column",
    header: {
      text: "지금액",
    },
  },
  {
    name: "bcDc",
    fieldName: "bcDc",
    type: "data",
    width: "80",
    styleName: "rg-left-column",
    header: {
      text: "D/C",
    },
  },
  {
    name: "bcMisu",
    fieldName: "bcMisu",
    type: "data",
    width: "80",
    styleName: "rg-left-column",
    header: {
      text: "잔액",
    },
  },
];

export const layout = [
  "bcBuName",
  "areaCode",
  "bcYearMonth",
  {
    name: "someGroup",
    direction: "horizontal",
    items: ["bcPin", "bcBin"],
    header: {
      text: "입고량",
    },
  },
  {
    name: "someGroup",
    direction: "horizontal",
    items: ["bcPjan", "bcBjan"],
    header: {
      text: "잔량",
    },
  },
  {
    name: "someGroup",
    direction: "horizontal",
    items: ["bcPsum", "bcBsum"],
    header: {
      text: "충전량",
    },
  },
  "bcSumKum",
  "bcOutkum",
  "bcDc",
  "bcMisu",
];
