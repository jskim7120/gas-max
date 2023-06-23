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
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "sumGageA",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "m3ToKgA",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "kgA",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "janAJun",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "janADang",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "kumackA",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "m3KumackA",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "sumGageB",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "im3ToKgB",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "kgB",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "janBJun",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "janBDang",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "kumackB",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "m3KumackB",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "sumGageC",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "m3ToKgC",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "kgC",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "janCJun",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "janCDang",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "kumackC",
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
    name: "maxRh20",
    fieldName: "maxRh20",
    type: "data",
    width: "60",
    header: {
      text: "압력",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "sumGageA",
    fieldName: "sumGageA",
    type: "data",
    width: "60",
    header: {
      text: "M3",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "m3ToKgA",
    fieldName: "m3ToKgA",
    type: "data",
    width: "60",
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
    width: "60",
    header: {
      text: "공급량",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "janAJun",
    fieldName: "janAJun",
    type: "data",
    width: "60",
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
    width: "60",
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
    width: "60",
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
    width: "70",
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
    width: "60",
    header: {
      text: "M3",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "im3ToKgB",
    fieldName: "im3ToKgB",
    type: "data",
    width: "60",
    header: {
      text: "KG",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },

  {
    name: "kgB",
    fieldName: "kgB",
    type: "data",
    width: "60",
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
    width: "60",
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
    width: "60",
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
    width: "70",
    header: {
      text: "오차",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "sumGageC",
    fieldName: "sumGageC",
    type: "data",
    width: "60",
    header: {
      text: "M3",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "m3ToKgC",
    fieldName: "m3ToKgC",
    type: "data",
    width: "60",
    header: {
      text: "KG",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "kgC",
    fieldName: "kgC",
    type: "data",
    width: "60",
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
    width: "60",
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
    width: "60",
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
    width: "60",
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
    width: "70",
    header: {
      text: "오차",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
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
    header: { text: "" },
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
    header: { text: "" },
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
    header: { text: "" },
  },
  "sumM3Kumack",
];
