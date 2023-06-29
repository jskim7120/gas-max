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
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "msDc",
    dataType: ValueType.TEXT,
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
    width: "50",
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
    width: "200",
    header: {
      text: "거래처명",
    },
  },

  {
    name: "msDate",
    fieldName: "msDate",
    type: "data",
    width: "70",
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
    width: "70",
    header: {
      text: "수금액",
    },
  },
  {
    name: "msDc",
    fieldName: "msDc",
    type: "data",
    width: "70",
    header: {
      text: "D/C",
    },
  },
  {
    name: "msSwName",
    fieldName: "msSwName",
    type: "data",
    width: "70",
    header: {
      text: "사원",
    },
  },
  {
    name: "msBigo",
    fieldName: "msBigo",
    type: "data",
    width: "100",
    header: {
      text: "비고",
    },
  },
  {
    name: "cuTel",
    fieldName: "cuTel",
    type: "data",
    width: "70",
    header: {
      text: "핸드폰",
    },
  },
];
