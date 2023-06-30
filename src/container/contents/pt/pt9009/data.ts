import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "suType",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "msDate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "msCuCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "msCuName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "msKumack",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "msSwName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "msSukumtype",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "msCdBank",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "msCdDate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "msCdLastDate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "msCdNo",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "msCdBigo",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "msCdType",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: "suType",
    fieldName: "suType",
    type: "data",
    width: "60",
    header: {
      text: "구분",
    },
    footer: {
      valueCallback: function (grid: any) {
        return grid.getSummary("suType", "count");
      },
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
    name: "msCuCode",
    fieldName: "msCuCode",
    type: "data",
    width: "100",
    header: {
      text: "거래처코드",
    },
  },
  {
    name: "msCuName",
    fieldName: "msCuName",
    type: "data",
    width: "200",
    styleName: "rg-left-column",
    header: {
      text: "거래처명",
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
    name: "msSukumtype",
    fieldName: "msSukumtype",
    type: "data",
    width: "60",
    header: {
      text: "방법",
    },
  },
  {
    name: "msCdBank",
    fieldName: "msCdBank",
    type: "data",
    width: "80",
    styleName: "rg-left-column",
    header: {
      text: "발행은행",
    },
  },

  {
    name: "msCdDate",
    fieldName: "msCdDate",
    type: "data",
    width: "100",
    header: {
      text: "발행일자",
    },
  },
  {
    name: "msCdLastDate",
    fieldName: "msCdLastDate",
    type: "data",
    width: "100",
    header: {
      text: "결재일자",
    },
  },
  {
    name: "msCdNo",
    fieldName: "msCdNo",
    type: "data",
    width: "100",
    header: {
      text: "수표번호",
    },
  },
  {
    name: "msCdBigo",
    fieldName: "msCdBigo",
    type: "data",
    width: "80",
    header: {
      text: "적요",
    },
  },
  {
    name: "msCdType",
    fieldName: "msCdType",
    type: "data",
    width: "80",
    styleName: "rg-left-column",
    header: {
      text: "처리구분",
    },
  },
];
