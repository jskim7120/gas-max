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
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "bglKumack",
    dataType: ValueType.NUMBER,
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
    width: "50",
    header: {
      text: "영업소",
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
    footer: {
      valueCallback: function (grid: any) {
        return grid.getSummary("bgDate", "count");
      },
    },
  },
  {
    name: "bgCuCode",
    fieldName: "bgCuCode",
    type: "data",
    width: "90",
    header: {
      text: "코드",
    },
  },
  {
    name: "bgCuName",
    fieldName: "bgCuName",
    type: "data",
    width: "200",
    header: {
      text: "거래처명",
    },
    styleName: "rg-left-column",
  },
  {
    name: "bglBpCode",
    fieldName: "bglBpCode",
    type: "data",
    width: "70",
    header: {
      text: "코드",
    },
  },
  {
    name: "bglBpName",
    fieldName: "bglBpName",
    type: "data",
    width: "150",
    header: {
      text: "부품명",
    },
    styleName: "rg-left-column",
  },
  {
    name: "bglBptype",
    fieldName: "bglBptype",
    type: "data",
    width: "70",
    header: {
      text: "규격",
    },
    styleName: "rg-left-column",
  },
  {
    name: "bglQty",
    fieldName: "bglQty",
    type: "data",
    width: "50",
    header: {
      text: "수량",
    },
    styleName: "rg-right-column",
  },
  {
    name: "bglDanga",
    fieldName: "bglDanga",
    type: "data",
    width: "70",
    header: {
      text: "단가",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "bglKumack",
    fieldName: "bglKumack",
    type: "data",
    width: "80",
    header: {
      text: "금액",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
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
