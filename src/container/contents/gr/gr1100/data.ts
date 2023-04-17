import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "buGubunName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "buCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "buName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "buTel",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "buMisu",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "buStaeName",
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
    name: "buGubunName",
    fieldName: "buGubunName",
    type: "data",
    width: "60",
    header: {
      text: "구분",
    },
  },
  {
    name: "buCode",
    fieldName: "buCode",
    type: "data",
    width: "60",
    header: {
      text: "코드",
    },
  },
  {
    name: "buName",
    fieldName: "buName",
    type: "data",
    width: "250",
    header: {
      text: "매입처명",
    },
    styleName: "rg-left-column",
  },
  {
    name: "buTel",
    fieldName: "buTel",
    type: "data",
    width: "120",
    header: {
      text: "전화번호",
    },
    styleName: "rg-left-column",
  },
  {
    name: "buMisu",
    fieldName: "buMisu",
    type: "data",
    width: "120",
    styleName: "rg-right-column",
    header: {
      text: "미지급액",
    },
  },
  {
    name: "buStaeName",
    fieldName: "buStaeName",
    type: "data",
    width: "60",
    header: {
      text: "상태",
    },
  },
];
