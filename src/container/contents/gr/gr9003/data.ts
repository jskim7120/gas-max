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
    fieldName: "bcBigo",
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
    width: "50",
    header: {
      text: "영업소",
    },
  },
  {
    name: "bcBuName",
    fieldName: "bcBuName",
    type: "data",
    width: "90",
    header: {
      text: "충전소명",
    },
    footer: {
      valueCallback: function (grid: any) {
        return grid.getSummary("bcBuName", "count");
      },
    },
  },
  {
    name: "bcDate",
    fieldName: "bcDate",
    type: "data",
    width: "50",
    header: {
      text: "일자",
    },
  },
  {
    name: "bcBigo",
    fieldName: "bcBigo",
    type: "data",
    width: "50",
    header: {
      text: "회차",
    },
  },
  {
    name: "bcSawon",
    fieldName: "bcSawon",
    type: "data",
    width: "50",
    header: {
      text: "비고",
    },
  },
  {
    name: "bcCarno",
    fieldName: "bcCarno",
    type: "data",
    width: "50",
    header: {
      text: "비고",
    },
  },
  {
    name: "bcType",
    fieldName: "bcType",
    type: "data",
    width: "100",
    styleName: "rg-left-column",
    header: {
      text: "수송기사/차량",
    },
  },
  {
    name: "bcTypeName",
    fieldName: "bcTypeName",
    type: "data",
    width: "50",
    header: {
      text: "방법",
    },
  },
  {
    name: "bcPin",
    fieldName: "bcPin",
    type: "data",
    width: "90",
    styleName: "rg-right-column",
    header: {
      text: "프로판(kg)",
    },
  },
  {
    name: "bcBin",
    fieldName: "bcBin",
    type: "data",
    width: "70",
    styleName: "rg-right-column",
    header: {
      text: "부탄(kg)",
    },
  },
  {
    name: "bcGin",
    fieldName: "bcGin",
    type: "data",
    width: "70",
    styleName: "rg-right-column",
    header: {
      text: "기타(EA)",
    },
  },
  {
    name: "bcSumKum",
    fieldName: "bcSumKum",
    type: "data",
    width: "70",
    styleName: "rg-right-column",
    header: {
      text: "매입금액",
    },
  },
  {
    name: "bcOutkum",
    fieldName: "bcOutkum",
    type: "data",
    width: "50",
    styleName: "rg-right-column",
    header: {
      text: "지급액",
    },
  },
  {
    name: "bcDc",
    fieldName: "bcDc",
    type: "data",
    width: "50",
    styleName: "rg-right-column",
    header: {
      text: "D/C",
    },
  },
  {
    name: "bcMisu",
    fieldName: "bcMisu",
    type: "data",
    width: "50",
    styleName: "rg-right-column",
    header: {
      text: "잔액",
    },
  },
];
