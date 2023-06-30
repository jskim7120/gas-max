import { ValueType } from "realgrid";

export const fields1 = [
  {
    fieldName: "cuCno",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjCuCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuTel",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "lastMisu",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjDate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjGum",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjGage",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjKumack",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjAnkum",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjDc",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjPerkum",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjTotal",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjMisujan",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "lastMisuN",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuSwName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "sameCount",
    dataType: ValueType.TEXT,
  },
];

export const columns1 = [
  {
    name: "cuCno",
    fieldName: "cuCno",
    type: "data",
    width: "50",
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
    name: "gjCuCode",
    fieldName: "gjCuCode",
    type: "data",
    width: "70",
    header: {
      text: "코드",
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
    name: "cuTel",
    fieldName: "cuTel",
    type: "data",
    width: "100",
    header: {
      text: "전화번호",
    },
  },
  {
    name: "lastMisu",
    fieldName: "lastMisu",
    type: "data",
    width: "70",
    header: {
      text: "전미수",
    },
  },
  {
    name: "gjDate",
    fieldName: "gjDate",
    type: "data",
    width: "50",
    header: {
      text: "검침일",
    },
  },
  {
    name: "gjGum",
    fieldName: "gjGum",
    type: "data",
    width: "50",
    header: {
      text: "당검",
    },
  },
  {
    name: "gjGage",
    fieldName: "gjGage",
    type: "data",
    width: "50",
    header: {
      text: "사용",
    },
  },

  {
    name: "gjKumack",
    fieldName: "gjKumack",
    type: "data",
    width: "70",
    header: {
      text: "사용금액",
    },
  },
  {
    name: "gjAnkum",
    fieldName: "gjAnkum",
    type: "data",
    width: "50",
    header: {
      text: "관리비",
    },
  },
  {
    name: "gjDc",
    fieldName: "gjDc",
    type: "data",
    width: "50",
    header: {
      text: "할인액",
    },
  },
  {
    name: "gjPerkum",
    fieldName: "gjPerkum",
    type: "data",
    width: "70",
    header: {
      text: "연체료",
    },
  },
  {
    name: "gjTotal",
    fieldName: "gjTotal",
    type: "data",
    width: "70",
    header: {
      text: "당월합계",
    },
  },
  {
    name: "gjMisujan",
    fieldName: "gjMisujan",
    type: "data",
    width: "70",
    header: {
      text: "당월미수",
    },
  },
  {
    name: "lastMisuN",
    fieldName: "lastMisuN",
    type: "data",
    width: "70",
    header: {
      text: "미수잔액",
    },
  },
  {
    name: "cuSwName",
    fieldName: "cuSwName",
    type: "data",
    width: "70",
    header: {
      text: "담당",
    },
  },
  {
    name: "sameCount",
    fieldName: "sameCount",
    type: "data",
    width: "50",
    header: {
      text: "건수",
    },
  },
];
