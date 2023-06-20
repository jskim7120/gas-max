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
    fieldName: "gaaa",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gaaa1",
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
    width: "70",
    header: {
      text: "수금일자",
    },
  },
  {
    name: "gjDate",
    fieldName: "gjDate",
    type: "data",
    width: "70",
    header: {
      text: "수금방법",
    },
    styleName: "rg-left-column",
  },
  {
    name: "gjGumymsno",
    fieldName: "gjGumymsno",
    type: "data",
    width: "70",
    header: {
      text: "수금액",
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
      text: "D/C",
    },
    styleName: "rg-left-column",
  },
  {
    name: "cuSwName",
    fieldName: "cuSwName",
    type: "data",
    width: "70",
    header: {
      text: "사원",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "gaaa",
    fieldName: "gaaa",
    type: "data",
    width: "100",
    header: {
      text: "비고",
    },
    styleName: "rg-left-column",
  },
  {
    name: "gaaa1",
    fieldName: "gaaa1",
    type: "data",
    width: "70",
    header: {
      text: "핸드폰",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
];
