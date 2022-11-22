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
    fieldName: "buStaeName",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: "areaCode",
    fieldName: "areaCode",
    type: "data",
    width: "80",
    header: {
      text: "영업소",
    },
  },
  {
    name: "buGubunName",
    fieldName: "buGubunName",
    type: "data",
    width: "120",
    header: {
      text: "구분",
    },
  },
  {
    name: "buCode",
    fieldName: "buCode",
    type: "data",
    width: "120",
    header: {
      text: "구분",
    },
  },
  {
    name: "buName",
    fieldName: "buName",
    type: "data",
    width: "350",
    header: {
      text: "매입처명",
    },
  },
  {
    name: "buStaeName",
    fieldName: "buStaeName",
    type: "data",
    width: "120",
    header: {
      text: "상태",
    },
  },
];
