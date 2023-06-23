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
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "kumackA",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "aSumGage",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "aSumKumack",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "m3KumackA",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "janBJun",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "kumackB",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "bSumGage",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "BSumKumack",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "m3KumackB",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "janCJun",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "kumackC",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "cSumGage",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "cSumKumack",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "m3KumackC",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "sumM3Kumack",
    dataType: ValueType.NUMBER,
  },
];

export const columns = [
  {
    name: "cuCno",
    fieldName: "cuCno",
    type: "data",
    width: "60",
    header: {
      text: "순번",
    },
    footer: {
      valueCallback: function (grid: any) {
        return grid.getSummary("cuCno", "count");
      },
    },
  },
  {
    name: "gjCuCode",
    fieldName: "gjCuCode",
    type: "data",
    width: "80",
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
    name: "janAJun",
    fieldName: "janAJun",
    type: "data",
    width: "60",
    header: {
      text: "kg",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "kumackA",
    fieldName: "kumackA",
    type: "data",
    width: "60",
    header: {
      text: "공급액",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "aSumGage",
    fieldName: "aSumGage",
    type: "data",
    width: "60",
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
    width: "70",
    header: {
      text: "사용금액",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "m3KumackA",
    fieldName: "m3KumackA",
    type: "data",
    width: "70",
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
    width: "60",
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
    width: "60",
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
    width: "60",
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
    width: "70",
    header: {
      text: "사용금액",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "m3KumackB",
    fieldName: "m3KumackB",
    type: "data",
    width: "70",
    header: {
      text: "오차",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },

  {
    name: "janCJun",
    fieldName: "janCJun",
    type: "data",
    width: "60",
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
    width: "60",
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
    width: "60",
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
    width: "70",
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
    width: "70",
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
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
];
export const layout = [
  "cuCno",
  "gjCuCode",
  "cuName",
  {
    name: "bla",
    directions: "horizontal",
    hideChildHeaders: false,
    items: ["janAJun", "kumackA", "aSumGage", "aSumKumack", "m3KumackA"],
    header: { text: "" },
  },
  {
    name: "bla2",
    directions: "horizontal",
    hideChildHeaders: false,
    items: ["janBJun", "kumackB", "bSumGage", "BSumKumack", "m3KumackB"],
    header: { text: "" },
  },
  {
    name: "bla3",
    directions: "horizontal",
    hideChildHeaders: false,
    items: ["janCJun", "kumackC", "cSumGage", "cSumKumack", "m3KumackC"],
    header: { text: "" },
  },
  "sumM3Kumack",
];
