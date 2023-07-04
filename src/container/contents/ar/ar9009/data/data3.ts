import { ValueType } from "realgrid";

export const fields3 = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "groupCd",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "groupName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjGage",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "m3ToKg",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "junmisu",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gjKumack",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gjAnkum",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gjMeterkum",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gjSisulkum",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gjDc",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gjPerkum",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gjTotal",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gsKumack",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gsDc",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "dangmisu",
    dataType: ValueType.NUMBER,
  },
];

export const columns3 = [
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
    name: "groupCd",
    fieldName: "groupCd",
    type: "data",
    width: "70",
    header: {
      text: "코드",
    },
  },
  {
    name: "groupName",
    fieldName: "groupName",
    type: "data",
    width: "70",
    styleName: "rg-left-column",
    header: {
      text: "그룹명",
    },
  },
  {
    name: "gjGage",
    fieldName: "gjGage",
    type: "data",
    width: "70",
    styleName: "rg-right-column",
    header: {
      text: "사용(m3)",
    },
    numberFormat: "#,##0",
  },
  {
    name: "m3ToKg",
    fieldName: "m3ToKg",
    type: "data",
    width: "70",
    styleName: "rg-right-column",
    header: {
      text: "기화(kg)",
    },
    numberFormat: "#,##0",
  },
  {
    name: "junmisu",
    fieldName: "junmisu",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "전월미수",
    },
    numberFormat: "#,##0",
  },
  {
    name: "gjKumack",
    fieldName: "gjKumack",
    type: "data",
    width: "80",
    styleName: "rg-right-column",
    header: {
      text: "당월사용료",
    },
    numberFormat: "#,##0",
  },
  {
    name: "gjAnkum",
    fieldName: "gjAnkum",
    type: "data",
    width: "70",
    styleName: "rg-right-column",
    header: {
      text: "관리비",
    },
    numberFormat: "#,##0",
  },
  {
    name: "gjMeterkum",
    fieldName: "gjMeterkum",
    type: "data",
    width: "70",
    styleName: "rg-right-column",
    header: {
      text: "계량기",
    },
    numberFormat: "#,##0",
  },
  {
    name: "gjSisulkum",
    fieldName: "gjSisulkum",
    type: "data",
    width: "70",
    styleName: "rg-right-column",
    header: {
      text: "시설비",
    },
    numberFormat: "#,##0",
  },
  {
    name: "gjDc",
    fieldName: "gjDc",
    type: "data",
    width: "70",
    styleName: "rg-right-column",
    header: {
      text: "할인액",
    },
    numberFormat: "#,##0",
  },
  {
    name: "gjPerkum",
    fieldName: "gjPerkum",
    type: "data",
    width: "70",
    styleName: "rg-right-column",
    header: {
      text: "연체료",
    },
    numberFormat: "#,##0",
  },
  {
    name: "gjTotal",
    fieldName: "gjTotal",
    type: "data",
    width: "70",
    styleName: "rg-right-column",
    header: {
      text: "당월금액",
    },
    numberFormat: "#,##0",
  },
  {
    name: "gsKumack",
    fieldName: "gsKumack",
    type: "data",
    width: "70",
    styleName: "rg-right-column",
    header: {
      text: "수금액",
    },
    numberFormat: "#,##0",
  },
  {
    name: "gsDc",
    fieldName: "gsDc",
    type: "data",
    width: "70",
    styleName: "rg-right-column",
    header: {
      text: "D/C",
    },
    numberFormat: "#,##0",
  },
  {
    name: "dangmisu",
    fieldName: "dangmisu",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "당월미수",
    },
    numberFormat: "#,##0",
  },
];
