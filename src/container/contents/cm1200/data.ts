import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuCount",
    dataType: ValueType.TEXT,
  },
];

export const fieldsSelected = [
  {
    fieldName: "cuCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuUserName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuTel",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuAnkum",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuCdc",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuPer",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuRdangaTypeName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuRdanga",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuJungumDate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuCmisu",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuSukumType",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuState",
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
      textAlignment: "near",
    },
    header: {
      text: "영업소",
    },
  },
  {
    name: "cuCode",
    fieldName: "cuCode",
    type: "data",
    width: "80",
    styles: {
      textAlignment: "near",
    },
    header: {
      text: "코드",
    },
  },
  {
    name: "cuName",
    fieldName: "cuName",
    type: "data",
    width: "265",
    styles: {
      textAlignment: "near",
    },
    header: {
      text: "건물명",
    },
  },
  {
    name: "cuCount",
    fieldName: "cuCount",
    type: "data",
    width: "80",
    styles: {
      textAlignment: "near",
    },
    header: {
      text: "세대",
    },
  },
];

export const columnsSelected = [
  {
    name: "cuCode",
    fieldName: "cuCode",
    type: "data",
    width: "90",
    styles: {
      textAlignment: "near",
    },
    header: {
      text: "코드",
    },
  },
  {
    name: "cuUserName",
    fieldName: "cuUserName",
    type: "data",
    width: "150",
    styles: {
      textAlignment: "near",
    },
    header: {
      text: "사용자명",
    },
  },
  {
    name: "cuTel",
    fieldName: "cuTel",
    type: "data",
    width: "100",
    styles: {
      textAlignment: "near",
    },
    header: {
      text: "전화",
    },
  },
  {
    name: "cuAnkum",
    fieldName: "cuAnkum",
    type: "data",
    width: "90",
    styles: {
      textAlignment: "near",
    },
    header: {
      text: "관리비",
    },
  },
  {
    name: "cuCdc",
    fieldName: "cuCdc",
    type: "data",
    width: "90",
    styles: {
      textAlignment: "near",
    },
    header: {
      text: "할인율",
    },
  },
  {
    name: "cuPer",
    fieldName: "cuPer",
    type: "data",
    width: "90",
    styles: {
      textAlignment: "near",
    },
    header: {
      text: "연체율",
    },
  },
  {
    name: "cuRdangaTypeName",
    fieldName: "cuRdangaTypeName",
    type: "data",
    headerSpan: 2,
    width: "90",
    styles: {
      textAlignment: "near",
    },
    header: {
      text: "㎥ 단가",
    },
  },
  {
    name: "cuRdanga",
    fieldName: "cuRdanga",
    type: "data",
    width: "90",
    styles: {
      textAlignment: "near",
    },
    header: {
      text: "㎥ 단가",
    },
  },
  {
    name: "cuJungumDate",
    fieldName: "cuJungumDate",
    type: "data",
    width: "100",
    styles: {
      textAlignment: "near",
    },
    header: {
      text: " 최종검침일 ",
    },
  },
  {
    name: "cuCmisu",
    fieldName: "cuCmisu",
    type: "data",
    width: "150",
    styles: {
      textAlignment: "near",
    },
    header: {
      text: "체적미수 ",
    },
  },
  {
    name: "cuSukumType",
    fieldName: "cuSukumType",
    type: "data",
    width: "90",
    styles: {
      textAlignment: "near",
    },
    header: {
      text: "수금방법 ",
    },
  },
  {
    name: "cuState",
    fieldName: "cuState",
    type: "data",
    width: "90",
    styles: {
      textAlignment: "near",
    },
    header: {
      text: "상태 ",
    },
  },
];
