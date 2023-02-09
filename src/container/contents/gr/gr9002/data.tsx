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
    fieldName: "bcSno",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bcInqty",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bcInc",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bcOutc",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bcOutqty",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bcInmigum",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bcOutmigum",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bcChungbox",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bcChungdae",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bcTongdel",
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
    fieldName: "bcCsawon",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bcCarno",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
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
    name: "bcDate",
    fieldName: "bcDate",
    type: "data",
    width: "120",
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
      text: "충전소",
    },
  },
  {
    name: "bcSno",
    fieldName: "bcSno",
    type: "data",
    width: "70",
    styleName: "rg-left-column",
    header: {
      text: "회차",
    },
  },
  {
    name: "bcInqty",
    fieldName: "bcInqty",
    type: "data",
    width: "120",
    styleName: "rg-left-column",
    header: {
      text: "입고",
    },
  },
  {
    name: "bcInc",
    fieldName: "bcInc",
    type: "data",
    width: "120",
    styleName: "rg-left-column",
    header: {
      text: "출고",
    },
  },
  {
    name: "bcOutc",
    fieldName: "bcOutc",
    type: "data",
    width: "120",
    styleName: "rg-left-column",
    header: {
      text: "입고",
    },
  },
  {
    name: "bcOutqty",
    fieldName: "bcOutqty",
    type: "data",
    width: "120",
    styleName: "rg-left-column",
    header: {
      text: "출고",
    },
  },
  {
    name: "bcInmigum",
    fieldName: "bcInmigum",
    type: "data",
    width: "120",
    styleName: "rg-left-column",
    header: {
      text: "입고",
    },
  },
  {
    name: "bcOutmigum",
    fieldName: "bcOutmigum",
    type: "data",
    width: "120",
    styleName: "rg-left-column",
    header: {
      text: "출고",
    },
  },
  {
    name: "bcChungbox",
    fieldName: "bcChungbox",
    type: "data",
    width: "120",
    styleName: "rg-left-column",
    header: {
      text: "보관",
    },
  },
  {
    name: "bcChungdae",
    fieldName: "bcChungdae",
    type: "data",
    width: "120",
    styleName: "rg-left-column",
    header: {
      text: "회수",
    },
  },
  {
    name: "bcTongdel",
    fieldName: "bcTongdel",
    type: "data",
    width: "120",
    styleName: "rg-left-column",
    header: {
      text: "폐기",
    },
  },
  {
    name: "bcPjan",
    fieldName: "bcPjan",
    type: "data",
    width: "120",
    styleName: "rg-left-column",
    header: {
      text: "프로판",
    },
  },
  {
    name: "bcBjan",
    fieldName: "bcBjan",
    type: "data",
    width: "120",
    styleName: "rg-left-column",
    header: {
      text: "부탄",
    },
  },
  {
    name: "bcPin",
    fieldName: "bcPin",
    type: "data",
    width: "120",
    styleName: "rg-left-column",
    header: {
      text: "프로판",
    },
  },
  {
    name: "bcBin",
    fieldName: "bcBin",
    type: "data",
    width: "120",
    styleName: "rg-left-column",
    header: {
      text: "부탄",
    },
  },
  {
    name: "bcGin",
    fieldName: "bcGin",
    type: "data",
    width: "120",
    styleName: "rg-left-column",
    header: {
      text: "기타",
    },
  },
  {
    name: "bcCsawon",
    fieldName: "bcCsawon",
    type: "data",
    width: "120",
    styleName: "rg-left-column",
    header: {
      text: "수송기사",
    },
  },
  {
    name: "bcCarno",
    fieldName: "bcCarno",
    type: "data",
    width: "120",
    styleName: "rg-left-column",
    header: {
      text: "차량",
    },
  },
];

export const layout = [
  "areaCode",
  "bcDate",
  "bcBuName",
  "bcSno",
  {
    name: "someGroup",
    direction: "horizontal",
    items: ["bcInqty", "bcInc"],
    header: {
      text: "충전",
    },
  },
  {
    name: "someGroup",
    direction: "horizontal",
    items: ["bcOutc", "bcOutqty"],
    header: {
      text: "공병",
    },
  },
  {
    name: "someGroup",
    direction: "horizontal",
    items: ["bcInmigum", "bcOutmigum"],
    header: {
      text: "미검",
    },
  },
  {
    name: "someGroup",
    direction: "horizontal",
    items: ["bcChungbox", "bcChungdae", "bcTongdel"],
    header: {
      text: "충전소",
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
    items: ["bcPin", "bcBin", "bcGin"],
    header: {
      text: "충전량",
    },
  },
  "bcCsawon",
  "bcCarno",
];
