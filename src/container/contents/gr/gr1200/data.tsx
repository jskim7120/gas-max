import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "bcDate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bcChitTypeName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bcBuName",
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
    fieldName: "bcGin",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bcJTotal",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bcInkum",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bcCtypeName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bcDateno",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: "bcDate",
    fieldName: "bcDate",
    width: "70",
    type: "data",
    header: {
      text: "일자",
    },
  },
  {
    name: "bcChitTypeName",
    fieldName: "bcChitTypeName",
    width: "50",
    type: "data",
    header: {
      text: "구분",
    },
  },
  {
    name: "bcBuName",
    fieldName: "bcBuName",
    width: "80",
    type: "data",
    header: {
      text: "충전소명",
    },
  },
  {
    name: "bcPin",
    fieldName: "bcPin",
    width: "80",
    type: "data",
    header: {
      text: "프로판(kg)",
    },
  },
  {
    name: "bcBin",
    fieldName: "bcBin",
    width: "80",
    type: "data",
    header: {
      text: "부탄(kg)",
    },
  },
  {
    name: "bcGin",
    fieldName: "bcGin",
    width: "80",
    type: "data",
    header: {
      text: "기타(Ea)",
    },
  },
  {
    name: "bcJTotal",
    fieldName: "bcJTotal",
    width: "50",
    type: "data",

    header: {
      text: "잔량",
    },
  },
  {
    name: "bcInkum",
    fieldName: "bcInkum",
    width: "80",
    type: "data",
    header: {
      text: "매입금액",
    },
  },
  {
    name: "bcCtypeName",
    fieldName: "bcCtypeName",
    width: "50",
    type: "data",
    header: {
      text: "수송방법",
    },
  },
  {
    name: "bcDateno",
    fieldName: "bcDateno",
    width: "50",
    type: "data",
    header: {
      text: "충전회차",
    },
  },
];

export const layout = [
  "bcDate",
  "bcChitTypeName",
  "bcBuName",
  {
    name: "someGroup",
    direction: "horizontal",
    items: ["bcPin", "bcBin", "bcGin"],
    header: {
      text: "입고량",
    },
  },
  "bcJTotal",
  "bcInkum",
  "bcCtypeName",
  "bcDateno",
];
