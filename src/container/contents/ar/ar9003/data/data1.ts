import { ValueType } from "realgrid";

export const fields1 = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bgDate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bgCuCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bgCuName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bglBpCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bglBpName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bglBptype",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bglQty",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bglDanga",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bglKumack",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bgSvKumack",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bgInkum",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bgDc",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bgMisu",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bgSwName",
    dataType: ValueType.TEXT,
  },
];

export const columns1 = [
  {
    name: "areaCode",
    fieldName: "areaCode",
    type: "data",
    width: "60",
    header: {
      text: "영업소",
    },
    footer: {
      valueCallback: function (grid: any) {
        return grid.getSummary("areaCode", "count");
      },
    },
  },
  {
    name: "bgDate",
    fieldName: "bgDate",
    type: "data",
    width: "100",
    header: {
      text: "일자",
    },
  },
  {
    name: "bgCuCode",
    fieldName: "bgCuCode",
    type: "data",
    width: "100",
    header: {
      text: "코드",
    },
  },
  {
    name: "bgCuName",
    fieldName: "bgCuName",
    type: "data",
    width: "100",
    header: {
      text: "거래처명",
    },
  },
  {
    name: "bglBpCode",
    fieldName: "bglBpCode",
    type: "data",
    width: "100",
    header: {
      text: "코드",
    },
  },
  {
    name: "bglBpName",
    fieldName: "bglBpName",
    type: "data",
    width: "100",
    header: {
      text: "부품명",
    },
  },
  {
    name: "bglBptype",
    fieldName: "bglBptype",
    type: "data",
    width: "100",
    header: {
      text: "규격",
    },
  },
  {
    name: "bglQty",
    fieldName: "bglQty",
    type: "data",
    width: "100",
    header: {
      text: "수량",
    },
  },
  {
    name: "bglDanga",
    fieldName: "bglDanga",
    type: "data",
    width: "100",
    header: {
      text: "단가",
    },
  },
  {
    name: "bglKumack",
    fieldName: "bglKumack",
    type: "data",
    width: "100",
    header: {
      text: "금액",
    },
  },
  {
    name: "bgSvKumack",
    fieldName: "bgSvKumack",
    type: "data",
    width: "100",
    header: {
      text: "무료시설",
    },
  },
  {
    name: "bgInkum",
    fieldName: "bgInkum",
    type: "data",
    width: "100",
    header: {
      text: "입금액",
    },
  },
  {
    name: "bgDc",
    fieldName: "bgDc",
    type: "data",
    width: "100",
    header: {
      text: "D/C",
    },
  },
  {
    name: "bgMisu",
    fieldName: "bgMisu",
    type: "data",
    width: "100",
    header: {
      text: "미수금액",
    },
  },
  {
    name: "bgSwName",
    fieldName: "bgSwName",
    type: "data",
    width: "100",
    header: {
      text: "사원",
    },
  },
];
