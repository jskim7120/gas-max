import { ValueType } from "realgrid";

export const fields0 = [
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
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "cuTongKum",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "jcLastdate5",
    dataType: ValueType.TEXT,
  },
];

export const columns0 = [
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
    width: "90",
    header: {
      text: "코드",
    },
  },
  {
    name: "cuName",
    fieldName: "cuName",
    type: "data",
    width: "200",
    styleName: "rg-left-column",
    header: {
      text: "거래처명",
    },
  },
  {
    name: "cuTel",
    fieldName: "cuTel",
    type: "data",
    width: "110",
    styleName: "rg-left-column",
    header: {
      text: "전화번호",
    },
  },
  {
    name: "cuAddr1",
    fieldName: "cuAddr1",
    type: "data",
    width: "200",
    styleName: "rg-left-column",
    header: {
      text: "주소",
    },
  },
  {
    name: "jcJpName",
    fieldName: "jcJpName",
    type: "data",
    width: "90",
    styleName: "rg-left-column",
    header: {
      text: "품명",
    },
  },
  {
    name: "yBokTmQty",
    fieldName: "yBokTmQty",
    type: "data",
    width: "60",
    styleName: "rg-right-column",
    header: {
      text: "수량",
    },
    numberFormat: "#,##0",
  },
  {
    name: "cuTongKum",
    fieldName: "cuTongKum",
    type: "data",
    width: "90",
    styleName: "rg-right-column",
    header: {
      text: "대여보증금",
    },
    numberFormat: "#,##0",
  },
  {
    name: "jcLastdate5",
    fieldName: "jcLastdate5",
    type: "data",
    width: "100",
    styleName: "rg-left-column",
    header: {
      text: "최종공급일",
    },
  },
];
