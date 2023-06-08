import { ValueType } from "realgrid";

export const fields2 = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jcCuCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuTel",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuAddr1",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jcJpName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "yBokTmQty",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jcLastdate5",
    dataType: ValueType.TEXT,
  },
];

export const columns2 = [
  {
    name: "areaCode",
    fieldName: "areaCode",
    type: "data",
    width: "100",
    header: {
      text: "영업소",
    },
  },
  {
    name: "jcCuCode",
    fieldName: "jcCuCode",
    type: "data",
    width: "100",
    header: {
      text: "코드",
    },
  },
  {
    name: "cuName",
    fieldName: "cuName",
    type: "data",
    width: "100",
    header: {
      text: "거래처명",
    },
  },
  {
    name: "cuTel",
    fieldName: "cuTel",
    type: "data",
    width: "100",
    header: {
      text: "전화번호",
    },
  },
  {
    name: "cuAddr1",
    fieldName: "cuAddr1",
    type: "data",
    width: "100",
    header: {
      text: "주소",
    },
  },
  {
    name: "jcJpName",
    fieldName: "jcJpName",
    type: "data",
    width: "100",
    header: {
      text: "품명",
    },
  },
  {
    name: "yBokTmQty",
    fieldName: "yBokTmQty",
    type: "data",
    width: "100",
    header: {
      text: "수량",
    },
  },
  {
    name: "jcLastdate5",
    fieldName: "jcLastdate5",
    type: "data",
    width: "100",
    header: {
      text: "최종공급일",
    },
  },
];
