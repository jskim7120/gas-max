import { ValueType } from "realgrid";

export const fields1 = [
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
    fieldName: "mm01",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "mm02",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "mm03",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "mm04",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "mm05",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "mm06",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "mm07",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "mm08",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "mm09",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "mm10",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "mm11",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "mm12",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "mnSum",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gageKum",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "cuAddr",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuDate",
    dataType: ValueType.TEXT,
  },
];

export const columns1 = [
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
    name: "cuCode",
    fieldName: "cuCode",
    type: "data",
    width: "100",
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
    width: "100",
    styleName: "rg-left-column",
    header: {
      text: "사용자명",
    },
  },
  {
    name: "mm01",
    fieldName: "mm01",
    type: "data",
    width: "50",
    header: {
      text: "",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "mm02",
    fieldName: "mm02",
    type: "data",
    width: "50",
    header: {
      text: "",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "mm03",
    fieldName: "mm03",
    type: "data",
    width: "50",
    header: {
      text: "",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "mm04",
    fieldName: "mm04",
    type: "data",
    width: "50",
    header: {
      text: "",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "mm05",
    fieldName: "mm05",
    type: "data",
    width: "50",
    header: {
      text: "",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "mm06",
    fieldName: "mm06",
    type: "data",
    width: "50",
    header: {
      text: "",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "mm07",
    fieldName: "mm07",
    type: "data",
    width: "50",
    header: {
      text: "",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "mm08",
    fieldName: "mm08",
    type: "data",
    width: "50",
    header: {
      text: "",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "mm09",
    fieldName: "mm09",
    type: "data",
    width: "50",
    header: {
      text: "",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "mm10",
    fieldName: "mm10",
    type: "data",
    width: "50",
    header: {
      text: "",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "mm11",
    fieldName: "mm11",
    type: "data",
    width: "50",
    header: {
      text: "",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "mm12",
    fieldName: "mm12",
    type: "data",
    width: "50",
    header: {
      text: "",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "mnSum",
    fieldName: "mnSum",
    type: "data",
    width: "100",
    header: {
      text: "공급량",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "gageKum",
    fieldName: "gageKum",
    type: "data",
    width: "100",
    header: {
      text: "공급금액",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "cuAddr",
    fieldName: "cuAddr",
    type: "data",
    width: "200",
    styleName: "rg-left-column",
    header: {
      text: "주소",
    },
  },
  {
    name: "cuDate",
    fieldName: "cuDate",
    type: "data",
    width: "100",
    header: {
      text: "등록일",
    },
  },
];
export const layout1 = [
  "cuCno",
  "cuCode",
  "cuName",
  "cuUsername",
  {
    name: "월별 공급량(kg)",
    directions: "horizontal",
    hideChildHeaders: false,
    items: [
      "mm01",
      "mm02",
      "mm03",
      "mm04",
      "mm05",
      "mm06",
      "mm07",
      "mm08",
      "mm09",
      "mm10",
      "mm11",
      "mm12",
    ],
  },
  {
    name: "합계",
    directions: "horizontal",
    hideChildHeaders: false,
    items: ["mnSum", "gageKum"],
  },
  "cuAddr",
  "cuDate",
];
