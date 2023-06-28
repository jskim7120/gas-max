import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "gsCuCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gsCuName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gsDate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gsSukumtype",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gsKumack",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gsDc",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gsKumackSameName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "swName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gsBigo",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuTel",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: "gsCuCode",
    fieldName: "gsCuCode",
    type: "data",
    width: "50",
    header: {
      text: "코드",
    },
    footer: {
      valueCallback: function (grid: any) {
        return grid.getSummary("gsCuCode", "count");
      },
    },
  },
  {
    name: "gsCuName",
    fieldName: "gsCuName",
    type: "data",
    width: "200",
    header: {
      text: "거래처명",
    },
  },
  {
    name: "gsDate",
    fieldName: "gsDate",
    type: "data",
    width: "70",
    header: {
      text: "수금일자",
    },
  },
  {
    name: "gsSukumtype",
    fieldName: "gsSukumtype",
    type: "data",
    width: "70",
    header: {
      text: "수금방법",
    },
  },
  {
    name: "gsKumack",
    fieldName: "gsKumack",
    type: "data",
    width: "50",
    header: {
      text: "수금액",
    },
  },
  {
    name: "gsDc",
    fieldName: "gsDc",
    type: "data",
    width: "50",
    header: {
      text: "D/C",
    },
  },
  {
    name: "gsKumackSameName",
    fieldName: "gsKumackSameName",
    type: "data",
    width: "70",
    header: {
      text: "합계",
    },
  },
  {
    name: "swName",
    fieldName: "swName",
    type: "data",
    width: "50",
    header: {
      text: "사원",
    },
  },
  {
    name: "gsBigo",
    fieldName: "gsBigo",
    type: "data",
    width: "50",
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
