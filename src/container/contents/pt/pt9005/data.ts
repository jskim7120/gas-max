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
    width: "200",
    header: {
      text: "거래처명",
    },
  },

  {
    name: "cuAddr",
    fieldName: "cuAddr",
    type: "data",
    width: "90",
    header: {
      text: "전화번호",
    },
  },
  {
    name: "gjDate",
    fieldName: "gjDate",
    type: "data",
    width: "90",
    header: {
      text: "핸드폰",
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
      text: "당검침",
    },
    styleName: "rg-left-column",
  },
  {
    name: "cuSwName",
    fieldName: "cuSwName",
    type: "data",
    width: "50",
    header: {
      text: "사용량",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "gaa",
    fieldName: "gaa",
    type: "data",
    width: "70",
    header: {
      text: "당월금액",
    },
  },
  {
    name: "gaa1",
    fieldName: "gaa1",
    type: "data",
    width: "70",
    header: {
      text: "당월미수",
    },
    styleName: "rg-left-column",
  },
  {
    name: "gaa2",
    fieldName: "gaa2",
    type: "data",
    width: "70",
    header: {
      text: "누계",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "gaa3",
    fieldName: "gaa3",
    type: "data",
    width: "70",
    header: {
      text: "검침사원",
    },
    styleName: "rg-left-column",
  },
  {
    name: "gaa4",
    fieldName: "gaa4",
    type: "data",
    width: "90",
    header: {
      text: "최종수금일",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
];
