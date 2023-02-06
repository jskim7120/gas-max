import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "code",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "codeName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuRh2o",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjGage",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjKumack",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "maintCost",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjDc",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjDangkum",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjPerkum",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjBaGageKum",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjTotal",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjMinab",
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
    footer: {
      valueCallback: function (grid: any) {
        return grid.getSummary("areaCode", "count");
      },
    },
  },
  {
    name: "code",
    fieldName: "code",
    type: "data",
    width: "50",
    header: {
      text: "코드",
    },
  },
  {
    name: "codeName",
    fieldName: "codeName",
    type: "data",
    width: "100",
    header: {
      text: "사원",
    },
  },
  {
    name: "cuRh2o",
    fieldName: "cuRh2o",
    type: "data",
    width: "100",
    header: {
      text: "조정기",
    },
  },
  {
    name: "gjGage",
    fieldName: "gjGage",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "사용량",
    },
  },
  {
    name: "gjKumack",
    fieldName: "gjKumack",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "사용금액",
    },
  },
  {
    name: "maintCost",
    fieldName: "maintCost",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "관리비외",
    },
  },
  {
    name: "gjDc",
    fieldName: "gjDc",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "할인액",
    },
  },
  {
    name: "gjDangkum",
    fieldName: "gjDangkum",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "당월금액",
    },
  },
  {
    name: "gjPerkum",
    fieldName: "gjPerkum",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "연체료",
    },
  },
  {
    name: "gjBaGageKum",
    fieldName: "gjBaGageKum",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "할인/기초",
    },
  },
  {
    name: "gjTotal",
    fieldName: "gjTotal",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "당월합계",
    },
  },
  {
    name: "gjMinab",
    fieldName: "gjMinab",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "당월미납액",
    },
  },
];
