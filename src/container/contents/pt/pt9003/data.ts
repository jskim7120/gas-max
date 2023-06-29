import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "msCuCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "msCuName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "msDate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "msSukumtype",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "msKumack",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "msDc",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "msSwName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "msBigo",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuTel",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: "msCuCode",
    fieldName: "msCuCode",
    type: "data",
    width: "80",
    header: {
      text: "코드",
    },
    footer: {
      valueCallback: function (grid: any) {
        return grid.getSummary("msCuCode", "count");
      },
    },
  },
  {
    name: "msCuName",
    fieldName: "msCuName",
    type: "data",
    width: "150",
    styleName: "rg-left-column",
    header: {
      text: "거래처명",
    },
  },

  {
    name: "msDate",
    fieldName: "msDate",
    type: "data",
    width: "100",
    header: {
      text: "수금일자",
    },
  },
  {
    name: "msSukumtype",
    fieldName: "msSukumtype",
    type: "data",
    width: "70",
    header: {
      text: "수금방법",
    },
  },
  {
    name: "msKumack",
    fieldName: "msKumack",
    type: "data",
    width: "100",
    header: {
      text: "수금액",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "msDc",
    fieldName: "msDc",
    type: "data",
    width: "80",
    header: {
      text: "D/C",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "msSwName",
    fieldName: "msSwName",
    type: "data",
    width: "70",
    styleName: "rg-left-column",
    header: {
      text: "사원",
    },
  },
  {
    name: "msBigo",
    fieldName: "msBigo",
    type: "data",
    width: "150",
    header: {
      text: "비고",
    },
  },
  {
    name: "cuTel",
    fieldName: "cuTel",
    type: "data",
    width: "120",
    header: {
      text: "핸드폰",
    },
  },
];
