import { ValueType } from "realgrid";

export const fields1 = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuSisuldate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuViewName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuTel",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuJyNmae",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuCutypeName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuGongdate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuGongno",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuSwName",
    dataType: ValueType.TEXT,
  },
];

export const columns1 = [
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
    name: "cuSisuldate",
    fieldName: "cuSisuldate",
    type: "data",
    width: "120",
    header: {
      text: "체적 시설 개선일",
    },
  },
  {
    name: "cuCode",
    fieldName: "cuCode",
    type: "data",
    width: "120",
    header: {
      text: "코드",
    },
  },

  {
    name: "cuViewName",
    fieldName: "cuViewName",
    type: "data",
    width: "200",
    header: {
      text: "거래처",
    },
    styleName: "rg-left-column",
  },

  {
    name: "cuTel",
    fieldName: "cuTel",
    type: "data",
    width: "100",
    header: {
      text: "전화번호",
    },
    styleName: "rg-left-column",
  },

  {
    name: "cuJyNmae",
    fieldName: "cuJyNmae",
    type: "data",
    width: "90",
    header: {
      text: "지역분류",
    },
    styleName: "rg-left-column",
  },

  {
    name: "cuCutypeName",
    fieldName: "cuCutypeName",
    type: "data",
    width: "100",
    header: {
      text: "소비자형태",
    },
    styleName: "rg-left-column",
  },

  {
    name: "cuGongdate",
    fieldName: "cuGongdate",
    type: "data",
    width: "100",
    header: {
      text: "계약일자",
    },
    styleName: "rg-left-column",
  },
  {
    name: "cuGongno",
    fieldName: "cuGongno",
    type: "data",
    width: "100",
    header: {
      text: "계약번호",
    },
    styleName: "rg-left-column",
  },
  {
    name: "cuSwName",
    fieldName: "cuSwName",
    type: "data",
    width: "100",
    header: {
      text: "담당사원",
    },
    styleName: "rg-left-column",
  },
];
