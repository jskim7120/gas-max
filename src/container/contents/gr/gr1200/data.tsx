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
    name: "areaCode",
    fieldName: "areaCode",
    width: "60",
    type: "data",
    header: {
      text: "영업소",
    },
    footer: {
      valueCallback: function (grid: any) {
        return grid.getSummary("areaCode", "count");
      },
    },
  },
  {
    name: "bcDate",
    fieldName: "bcDate",
    width: "90",
    type: "data",
    header: {
      text: "일자",
    },
  },
  {
    name: "bcChitTypeName",
    fieldName: "bcChitTypeName",
    width: "60",
    type: "data",
    header: {
      text: "구분",
    },
  },
  {
    name: "bcBuName",
    fieldName: "bcBuName",
    width: "120",
    type: "data",
    header: {
      text: "충전소명",
    },
    styleName: "rg-left-column",
  },
  {
    name: "bcPin",
    fieldName: "bcPin",
    width: "80",
    type: "data",
    header: {
      text: "프로판(kg)",
    },
    styleName: "rg-right-column",
  },
  {
    name: "bcBin",
    fieldName: "bcBin",
    width: "80",
    type: "data",
    header: {
      text: "부탄(kg)",
    },
    styleName: "rg-right-column",
  },
  {
    name: "bcGin",
    fieldName: "bcGin",
    width: "80",
    type: "data",
    header: {
      text: "기타(Ea)",
    },
    styleName: "rg-right-column",
  },
  {
    name: "bcJTotal",
    fieldName: "bcJTotal",
    width: "70",
    type: "data",

    header: {
      text: "잔량",
    },
    styleName: "rg-right-column",
  },
  {
    name: "bcInkum",
    fieldName: "bcInkum",
    width: "90",
    type: "data",
    header: {
      text: "매입금액",
    },
    styleName: "rg-right-column",
  },
  {
    name: "bcCtypeName",
    fieldName: "bcCtypeName",
    width: "70",
    type: "data",
    header: {
      text: "수송방법",
    },
  },
  {
    name: "bcDateno",
    fieldName: "bcDateno",
    width: "70",
    type: "data",
    header: {
      text: "충전회차",
    },
    styleName: "rg-right-column",
  },
];

export const layout = [
  "areaCode",
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
