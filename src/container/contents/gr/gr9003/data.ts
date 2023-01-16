import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bcBuName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bcDate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bcSawon",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bcCarno",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bcType",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bcCtypeName",
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

export const columns = [
  {
    name: "areaCode",
    fieldName: "areaCode",
    type: "data",
    width: "20",
    header: {
      text: "영업소",
    },
  },
  {
    name: "bcBuName",
    fieldName: "bcBuName",
    type: "data",
    width: "40",
    header: {
      text: "코드",
    },
  },
  {
    name: "bcDate",
    fieldName: "bcDate",
    type: "data",
    width: "80",
    header: {
      text: "거래처",
    },
    styleName: "rg-left-column",
  },
  {
    name: "bcSawon",
    fieldName: "bcSawon",
    type: "data",
    width: "40",
    header: {
      text: "전화번호",
    },
    styleName: "rg-left-column",
  },
  {
    name: "bcCarno",
    fieldName: "bcCarno",
    type: "data",
    width: "40",
    header: {
      text: "핸드폰",
    },
    styleName: "rg-left-column",
  },
  {
    name: "bcType",
    fieldName: "bcType",
    type: "data",
    width: "80",
    header: {
      text: "주소",
    },
    styleName: "rg-left-column",
  },
  {
    name: "bcTypeName",
    fieldName: "bcTypeName",
    type: "data",
    width: "20",
    header: {
      text: "담당사원",
    },
    styleName: "rg-left-column",
  },
  {
    name: "bcPin",
    fieldName: "bcPin",
    type: "data",
    width: "40",
    header: {
      text: "중량미수",
    },
    styleName: "rg-right-column",
  },
  {
    name: "bcBin",
    fieldName: "bcBin",
    type: "data",
    width: "40",
    header: {
      text: "체적미수",
    },
    styleName: "rg-right-column",
  },
  {
    name: "bcGin",
    fieldName: "bcGin",
    type: "data",
    width: "80",
    header: {
      text: "소비자형태",
    },
    styleName: "rg-right-column",
  },
  {
    name: "bcSumKum",
    fieldName: "bcSumKum",
    type: "data",
    width: "80",
    header: {
      text: "공급계약",
    },
    styleName: "rg-left-column",
  },
  {
    name: "bcOutkum",
    fieldName: "bcOutkum",
    type: "data",
    width: "40",
    header: {
      text: "계약번호",
    },
    styleName: "rg-left-column",
  },
  {
    name: "bcDc",
    fieldName: "bcDc",
    type: "data",
    width: "40",
    header: {
      text: "거래구분",
    },
    styleName: "rg-left-column",
  },
  {
    name: "bcMisu",
    fieldName: "bcMisu",
    type: "data",
    width: "40",
    header: {
      text: "거래상태",
    },
    styleName: "rg-left-column",
  },
];
