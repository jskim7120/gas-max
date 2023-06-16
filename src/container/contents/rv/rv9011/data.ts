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
    fieldName: "maxRh20",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "sumGageA",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "m3ToKgA",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "kgA",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "janAJun",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "janADang",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "kumackA",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "m3KumackA",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "sumGageB",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "im3ToKgB",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "kgB",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "janBJun",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "janBDang",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "kumackB",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "m3KumackB",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "sumGageC",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "m3ToKgC",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "kgC",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "janCJun",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "janCDang",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "kumackC",
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
    name: "maxRh20",
    fieldName: "maxRh20",
    type: "data",
    width: "90",
    header: {
      text: "압력",
    },
  },
  {
    name: "sumGageA",
    fieldName: "sumGageA",
    type: "data",
    width: "200",
    header: {
      text: "M3",
    },
    styleName: "rg-left-column",
  },
  {
    name: "m3ToKgA",
    fieldName: "m3ToKgA",
    type: "data",
    width: "50",
    header: {
      text: "KG",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "kgA",
    fieldName: "kgA",
    type: "data",
    width: "50",
    header: {
      text: "공급량",
    },
    styleName: "rg-left-column",
  },
  {
    name: "janAJun",
    fieldName: "janAJunD",
    type: "data",
    width: "50",
    header: {
      text: "전잔",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },

  {
    name: "janADang",
    fieldName: "janADang",
    type: "data",
    width: "50",
    header: {
      text: "당잔",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "kumackA",
    fieldName: "kumackA",
    type: "data",
    width: "50",
    header: {
      text: "KG",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
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
    name: "sumGageB",
    fieldName: "sumGageB",
    type: "data",
    width: "50",
    styleName: "rg-right-column",
    header: {
      text: "M3",
    },
  },
  {
    name: "im3ToKgB",
    fieldName: "im3ToKgB",
    type: "data",
    width: "50",
    header: {
      text: "KG",
    },
    styleName: "rg-right-column",
  },

  {
    name: "kgB",
    fieldName: "kgB",
    type: "data",
    width: "50",
    header: {
      text: "공급량",
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
      text: "전잔",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "janBDang",
    fieldName: "janBDang",
    type: "data",
    width: "50",
    header: {
      text: "당잔",
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
      text: "KG",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "m3KumackB",
    fieldName: "m3KumackB",
    type: "data",
    width: "100",
    header: {
      text: "오차",
    },
    styleName: "rg-left-column",
  },
  {
    name: "sumGageC",
    fieldName: "sumGageC",
    type: "data",
    width: "100",
    header: {
      text: "M3",
    },
    styleName: "rg-left-column",
  },
  {
    name: "m3ToKgC",
    fieldName: "m3ToKgC",
    type: "data",
    width: "50",
    header: {
      text: "KG",
    },
    styleName: "rg-right-column",
  },

  {
    name: "kgC",
    fieldName: "kgC",
    type: "data",
    width: "50",
    header: {
      text: "공급량",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "janCJun",
    fieldName: "janCJun",
    type: "data",
    width: "50",
    header: {
      text: "전잔",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "janCDang",
    fieldName: "janCDang",
    type: "data",
    width: "50",
    header: {
      text: "당잔",
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
      text: "KG",
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
  "maxRh20",
  {
    name: "2023-04월",
    directions: "horizontal",
    hideChildHeaders: false,
    items: [
      "sumGageA",
      "m3ToKgA",
      "kgA",
      "janAJun",
      "janADang",
      "kumackA",
      "m3KumackA",
    ],
  },
  {
    name: "2023-05월",
    directions: "horizontal",
    hideChildHeaders: false,
    items: [
      "sumGageB",
      "im3ToKgB",
      "kgB",
      "janBJun",
      "janBDang",
      "kumackB",
      "m3KumackB",
    ],
  },
  {
    name: "2023-06월",
    directions: "horizontal",
    hideChildHeaders: false,
    items: [
      "sumGageC",
      "m3ToKgC",
      "kgC",
      "janCJun",
      "janCDang",
      "kumackC",
      "m3KumackC",
    ],
  },
  "sumKg",
];
