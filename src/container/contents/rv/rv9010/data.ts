import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "cuCno",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjCuCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "janAJun",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "kumackA",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "aSumGage",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "aSumKumack",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "m3KumackA",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "janBJun",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "kumackB",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bSumGage",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "BSumKumack",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "m3KumackB",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "janCJun",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "kumackC",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cSumGage",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cSumKumack",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "m3KumackC",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "sumM3Kumack",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: "cuCno",
    fieldName: "cuCno",
    type: "data",
    width: "50",
    header: {
      text: "순번",
    },
    footer: {
      valueCallback: function (grid: any) {
        return grid.getSummary("areaCode", "count");
      },
    },
  },
  {
    name: "gjCuCode",
    fieldName: "gjCuCode",
    type: "data",
    width: "50",
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
    name: "janAJun",
    fieldName: "janAJun",
    type: "data",
    width: "90",
    header: {
      text: "kg",
    },
  },
  {
    name: "kumackA",
    fieldName: "kumackA",
    type: "data",
    width: "200",
    header: {
      text: "공급액",
    },
    styleName: "rg-left-column",
  },
  {
    name: "aSumGage",
    fieldName: "aSumGage",
    type: "data",
    width: "50",
    header: {
      text: "M3",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "aSumKumack",
    fieldName: "aSumKumack",
    type: "data",
    width: "50",
    header: {
      text: "사용금액",
    },
    styleName: "rg-left-column",
  },
  {
    name: "m3KumackA",
    fieldName: "m3KumackA",
    type: "data",
    width: "50",
    header: {
      text: "오차",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },

  {
    name: "janBJun",
    fieldName: "janBJun",
    type: "data",
    width: "50",
    header: {
      text: "kg",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "kumackB",
    fieldName: "kumackB",
    type: "data",
    width: "50",
    header: {
      text: "공급액",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "bSumGage",
    fieldName: "bSumGage",
    type: "data",
    width: "50",
    header: {
      text: "M3",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "BSumKumack",
    fieldName: "BSumKumack",
    type: "data",
    width: "50",
    styleName: "rg-right-column",
    header: {
      text: "사용금액",
    },
  },
  {
    name: "m3KumackB",
    fieldName: "m3KumackB",
    type: "data",
    width: "50",
    header: {
      text: "오차",
    },
    styleName: "rg-right-column",
  },

  {
    name: "janCJun",
    fieldName: "janCJun",
    type: "data",
    width: "50",
    header: {
      text: "kg",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "kumackC",
    fieldName: "kumackC",
    type: "data",
    width: "50",
    header: {
      text: "공급액",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "cSumGage",
    fieldName: "cSumGage",
    type: "data",
    width: "50",
    header: {
      text: "M3",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "cSumKumack",
    fieldName: "cSumKumack",
    type: "data",
    width: "50",
    header: {
      text: "사용금액",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "m3KumackC",
    fieldName: "m3KumackC",
    type: "data",
    width: "100",
    header: {
      text: "오차",
    },
    styleName: "rg-left-column",
  },
  {
    name: "sumM3Kumack",
    fieldName: "sumM3Kumack",
    type: "data",
    width: "100",
    header: {
      text: "오차합계",
    },
    styleName: "rg-left-column",
  },
];
export const layout = [
  "cuCno",
  "gjCuCode",
  "cuName",
  {
    name: "2023-05월",
    directions: "horizontal",
    hideChildHeaders: false,
    items: ["janAJun", "kumackA", "aSumGage", "aSumKumack", "m3KumackA"],
  },
  {
    name: "2023-06월",
    directions: "horizontal",
    hideChildHeaders: false,
    items: ["janBJun", "kumackB", "bSumGage", "BSumKumack", "m3KumackB"],
  },
  {
    name: "2023-07월",
    directions: "horizontal",
    hideChildHeaders: false,
    items: ["janCJun", "kumackC", "cSumGage", "cSumKumack", "m3KumackC"],
  },
  "sumKg",
];
