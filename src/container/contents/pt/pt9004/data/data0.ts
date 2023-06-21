import { ValueType } from "realgrid";

export const fields0 = [
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
];

export const columns0 = [
  {
    name: "gjCuCode",
    fieldName: "gjCuCode",
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
    name: "cuName",
    fieldName: "cuName",
    type: "data",
    width: "70",
    header: {
      text: "코드",
    },
  },

  {
    name: "cuAddr",
    fieldName: "cuAddr",
    type: "data",
    width: "200",
    header: {
      text: "거래처명",
    },
  },
  {
    name: "gjDate",
    fieldName: "gjDate",
    type: "data",
    width: "100",
    header: {
      text: "전화번호",
    },
    styleName: "rg-left-column",
  },
  {
    name: "gjGumymsno",
    fieldName: "gjGumymsno",
    type: "data",
    width: "70",
    header: {
      text: "검침일자",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "gjJankg",
    fieldName: "gjJankg",
    type: "data",
    width: "50",
    header: {
      text: "전검",
    },
    styleName: "rg-left-column",
  },
  {
    name: "cuSwName",
    fieldName: "cuSwName",
    type: "data",
    width: "50",
    header: {
      text: "당검침",
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
      text: "사용",
    },
  },

  {
    name: "gaa1",
    fieldName: "gaa1",
    type: "data",
    width: "50",
    header: {
      text: "단가",
    },
  },
  {
    name: "gaa2",
    fieldName: "gaa2",
    type: "data",
    width: "90",
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
      text: "연체료",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "gaa4",
    fieldName: "gaa4",
    type: "data",
    width: "70",
    header: {
      text: "당월미수",
    },
    styleName: "rg-left-column",
  },
  {
    name: "gaa5",
    fieldName: "gaa5",
    type: "data",
    width: "70",
    header: {
      text: "미수누계",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "gaa6",
    fieldName: "gaa6",
    type: "data",
    width: "50",
    header: {
      text: "사원",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
];
