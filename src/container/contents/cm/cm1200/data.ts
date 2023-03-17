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
    fieldName: "cuUsername",
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
    fieldName: "cuJungumdate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuCmisu",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuSukumtype",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuStae",
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
    footer: {
      valueCallback: function (grid: any) {
        return grid.getSummary("areaCode", "count");
      },
    },
  },
  {
    name: "cuCode",
    fieldName: "cuCode",
    type: "data",
    width: "60",

    header: {
      text: "코드",
    },
  },
  {
    name: "cuName",
    fieldName: "cuName",
    type: "data",
    width: "180",
    alignText: "left",
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
    width: "60",

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

    header: {
      text: "코드",
    },
  },
  {
    name: "cuUsername",
    fieldName: "cuUsername",
    type: "data",
    width: "150",

    header: {
      text: "사용자명",
    },
  },
  {
    name: "cuTel",
    fieldName: "cuTel",
    type: "data",
    width: "90",
    header: {
      text: "전화",
    },
  },
  {
    name: "cuAnkum",
    fieldName: "cuAnkum",
    type: "data",
    width: "90",
    header: {
      text: "관리비",
    },
    styleName: "rg-right-column",
  },
  {
    name: "cuCdc",
    fieldName: "cuCdc",
    type: "data",
    width: "90",
    header: {
      text: "할인율",
    },
    styleName: "rg-right-column",
  },
  {
    name: "cuPer",
    fieldName: "cuPer",
    type: "data",
    width: "90",
    header: {
      text: "연체율",
    },
    styleName: "rg-right-column",
  },
  {
    name: "cuRdangaTypeName",
    fieldName: "cuRdangaTypeName",
    type: "data",
    headerSpan: 2,
    width: "90",
    header: {
      text: "㎥ 단가",
    },
  },
  {
    name: "cuRdanga",
    fieldName: "cuRdanga",
    type: "data",
    width: "90",
    header: {
      text: "㎥ 단가",
    },
  },
  {
    name: "cuJungumdate",
    fieldName: "cuJungumdate",
    type: "data",
    width: "90",
    header: {
      text: " 최종검침일 ",
    },
  },
  {
    name: "cuCmisu",
    fieldName: "cuCmisu",
    type: "data",
    width: "140",
    header: {
      text: "체적미수 ",
    },
  },
  {
    name: "cuSukumtype",
    fieldName: "cuSukumtype",
    type: "data",
    width: "90",

    header: {
      text: "수금방법 ",
    },
  },
  {
    name: "cuStae",
    fieldName: "cuStae",
    type: "data",
    width: "90",

    header: {
      text: "상태 ",
    },
  },
];
