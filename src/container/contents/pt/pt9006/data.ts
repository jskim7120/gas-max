import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "cuCno",
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
    fieldName: "cuUsername",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuTel",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gage01",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "dang01",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "sukum01",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "sukum01D",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gage02",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "dang02",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "sukum02",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "sukum02D",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gage03",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "dang03",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "sukum03",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "sukum03D",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cmisu",
    dataType: ValueType.NUMBER,
  },
];

export const columns = [
  {
    name: "cuCno",
    fieldName: "cuCno",
    type: "data",
    width: "80",
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
    name: "cuCode",
    fieldName: "cuCode",
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
    name: "cuUsername",
    fieldName: "cuUsername",
    type: "data",
    width: "200",
    styleName: "rg-left-column",
    header: {
      text: "사용자명",
    },
  },
  {
    name: "cuTel",
    fieldName: "cuTel",
    type: "data",
    width: "120",
    styleName: "rg-left-column",
    header: {
      text: "전화번호",
    },
  },
  {
    name: "gage01",
    fieldName: "gage01",
    type: "data",
    width: "70",
    header: {
      text: "사용량",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "dang01",
    fieldName: "dang01",
    type: "data",
    width: "100",
    header: {
      text: "당월금액",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "sukum01",
    fieldName: "sukum01",
    type: "data",
    width: "100",
    header: {
      text: "수금액",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },

  {
    name: "sukum01D",
    fieldName: "sukum01D",
    type: "data",
    width: "50",
    header: {
      text: "일",
    },
  },
  {
    name: "gage02",
    fieldName: "gage02",
    type: "data",
    width: "70",
    header: {
      text: "사용량",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "dang02",
    fieldName: "dang02",
    type: "data",
    width: "100",
    header: {
      text: "당월금액",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "sukum02",
    fieldName: "sukum02",
    type: "data",
    width: "100",
    header: {
      text: "수금액",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "sukum02D",
    fieldName: "sukum02D",
    type: "data",
    width: "50",
    header: {
      text: "일",
    },
  },
  {
    name: "gage03",
    fieldName: "gage03",
    type: "data",
    width: "70",
    header: {
      text: "사용량",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "dang03",
    fieldName: "dang03",
    type: "data",
    width: "100",
    header: {
      text: "당월금액",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "sukum03",
    fieldName: "sukum03",
    type: "data",
    width: "100",
    header: {
      text: "수금액",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "sukum03D",
    fieldName: "sukum03D",
    type: "data",
    width: "50",
    header: {
      text: "일",
    },
  },
  {
    name: "cmisu",
    fieldName: "cmisu",
    type: "data",
    width: "100",
    header: {
      text: "현재미수",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
];

export const layout = [
  "cuCno",
  "cuCode",
  "cuName",
  "cuUsername",
  "cuTel",
  {
    name: "2023-04월",
    directions: "horizontal",
    hideChildHeaders: false,
    items: ["gage01", "dang01", "sukum01", "sukum01D"],
    header: { text: "" },
  },
  {
    name: "2023-05월",
    directions: "horizontal",
    hideChildHeaders: false,
    items: ["gage02", "dang02", "sukum02", "sukum02D"],
    header: { text: "" },
  },
  {
    name: " 2023-06월",
    directions: "horizontal",
    hideChildHeaders: false,
    items: ["gage03", "dang03", "sukum03", "sukum03D"],
    header: { text: "" },
  },
  "cmisu",
];
