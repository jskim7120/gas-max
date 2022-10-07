import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "areaName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jnSsno",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "jnSangho",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jnSajang",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jnZipcode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jnAddr1",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jnAddr2",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: "areaCode",
    fieldName: "areaCode",
    type: "data",
    width: "80",
    styles: {
      textAlignment: "center",
    },
    header: {
      text: "영업소코드",
    },
  },
  {
    name: "areaName",
    fieldName: "areaName",
    type: "data",
    width: "120",
    styles: {
      textAlignment: "near",
    },
    header: {
      text: "영업소명칭",
    },
  },
  {
    name: "jnSsno",
    fieldName: "jnSsno",
    type: "data",
    width: "130",
    styles: {
      textAlignment: "near",
    },
    numberFormat: "0",
    header: {
      text: "사업자번호",
    },
  },
  {
    name: "jnSangho",
    fieldName: "jnSangho",
    type: "data",
    width: "100",
    styles: {
      textAlignment: "center",
    },
    header: {
      text: "상호",
    },
  },
  {
    name: "jnSajang",
    fieldName: "jnSajang",
    type: "data",
    width: "100",
    styles: {
      textAlignment: "far",
      lineAlignment: "far",
    },
    header: {
      text: "대표",
    },
  },
  {
    name: "jnZipcode",
    fieldName: "jnZipcode",
    type: "data",
    width: "100",
    styles: {
      textAlignment: "far",
    },
    header: {
      text: "우편번호",
    },
  },
  {
    name: "jnAddr1",
    fieldName: "jnAddr1",
    type: "data",
    width: "170",
    styles: {
      textAlignment: "far",
    },
    header: {
      text: "관할주소",
    },
  },
  {
    name: "jnAddr2",
    fieldName: "jnAddr2",
    type: "data",
    width: "170",
    styles: {
      textAlignment: "far",
    },
    header: {
      text: "상세주소",
    },
  },
];
