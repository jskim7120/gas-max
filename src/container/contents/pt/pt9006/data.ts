import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "gjCuCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuAddr",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjDate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjGumymsno",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjJankg",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuSwName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gaa",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gaa1",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gaa2",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gaa3",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gaa4",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gaa5",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gaa6",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gaa7",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gaa8",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gaa9",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: "gjCuCode",
    fieldName: "gjCuCode",
    type: "data",
    width: "50",
    header: {
      text: "코드",
    },
    footer: {
      valueCallback: function (grid: any) {
        return grid.getSummary("areaCode", "count");
      },
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
    name: "cuAddr",
    fieldName: "cuAddr",
    type: "data",
    width: "70",
    header: {
      text: "사용자명",
    },
  },
  {
    name: "gjDate",
    fieldName: "gjDate",
    type: "data",
    width: "70",
    header: {
      text: "전화번호",
    },
    styleName: "rg-left-column",
  },
  {
    name: "gjGumymsno",
    fieldName: "gjGumymsno",
    type: "data",
    width: "50",
    header: {
      text: "사용량",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "gjJankg",
    fieldName: "gjJankg",
    type: "data",
    width: "70",
    header: {
      text: "당월금액",
    },
    styleName: "rg-left-column",
  },
  {
    name: "cuSwName",
    fieldName: "cuSwName",
    type: "data",
    width: "50",
    header: {
      text: "수금액",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "gaa",
    fieldName: "gaa",
    type: "data",
    width: "50",
    header: {
      text: "일",
    },
  },

  {
    name: "gaa1",
    fieldName: "gaa1",
    type: "data",
    width: "50",
    header: {
      text: "사용량",
    },
  },
  {
    name: "gaa2",
    fieldName: "gaa2",
    type: "data",
    width: "70",
    header: {
      text: "당월금액",
    },
    styleName: "rg-left-column",
  },
  {
    name: "gaa3",
    fieldName: "gaa3",
    type: "data",
    width: "50",
    header: {
      text: "수금액",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "gaa4",
    fieldName: "gaa4",
    type: "data",
    width: "50",
    header: {
      text: "일",
    },
    styleName: "rg-left-column",
  },
  {
    name: "gaa5",
    fieldName: "gaa5",
    type: "data",
    width: "50",
    header: {
      text: "사용량",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "gaa6",
    fieldName: "gaa6",
    type: "data",
    width: "70",
    header: {
      text: "당월금액",
    },
    styleName: "rg-left-column",
  },
  {
    name: "gaa7",
    fieldName: "gaa7",
    type: "data",
    width: "50",
    header: {
      text: "수금액",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "gaa8",
    fieldName: "gaa8",
    type: "data",
    width: "50",
    header: {
      text: "일",
    },
    styleName: "rg-left-column",
  },
  {
    name: "gaa9",
    fieldName: "gaa9",
    type: "data",
    width: "70",
    header: {
      text: "현재미수",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
];

export const layout = [
  "gjCuCode",
  "cuName",
  "cuAddr",
  "gjDate",
  {
    name: "2023-04월",
    directions: "horizontal",
    hideChildHeaders: false,
    items: ["gjGumymsno", "gjJankg", "cuSwName", "gaa"],
  },
  {
    name: "2023-05월",
    directions: "horizontal",
    hideChildHeaders: false,
    items: ["gaa1", "gaa2", "gaa3", "gaa4"],
  },
  {
    name: " 2023-06월",
    directions: "horizontal",
    hideChildHeaders: false,
    items: ["gaa5", "gaa6", "gaa7", "gaa8"],
  },
  "gaa9",
];
