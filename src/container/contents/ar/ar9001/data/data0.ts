import { ValueType } from "realgrid";

export const fields0 = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "pjDate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "pjCuCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "pjCuName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "pjJpName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "pjQty",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "pjDanga",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "pjKumack",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "pjInkum",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "pjDc",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "pjMisukum",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "pjSwName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "pjBigo",
    dataType: ValueType.TEXT,
  },
];

export const columns0 = [
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
    name: "pjDate",
    fieldName: "pjDate",
    type: "data",
    width: "100",
    header: {
      text: "일자",
    },
    footer: {
      valueCallback: function (grid: any) {
        return grid.getSummary("pjDate", "count");
      },
    },
  },
  {
    name: "pjCuCode",
    fieldName: "pjCuCode",
    type: "data",
    width: "90",
    header: {
      text: "거래처코드",
    },
  },
  {
    name: "pjCuName",
    fieldName: "pjCuName",
    type: "data",
    width: "200",
    header: {
      text: "거래처명",
    },
    styleName: "rg-left-column",
  },
  {
    name: "pjJpName",
    fieldName: "pjJpName",
    type: "data",
    width: "90",
    header: {
      text: "품명",
    },
    styleName: "rg-left-column",
  },
  {
    name: "pjQty",
    fieldName: "pjQty",
    type: "data",
    width: "50",
    header: {
      text: "수량",
    },
    styleName: "rg-right-column",
  },
  {
    name: "pjDanga",
    fieldName: "pjDanga",
    type: "data",
    width: "70",
    header: {
      text: "단가",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "pjKumack",
    fieldName: "pjKumack",
    type: "data",
    width: "80",
    header: {
      text: "금액",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "pjInkum",
    fieldName: "pjInkum",
    type: "data",
    width: "80",
    header: {
      text: "입금액",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "pjDc",
    fieldName: "pjDc",
    type: "data",
    width: "80",
    header: {
      text: "D/C",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "pjMisukum",
    fieldName: "pjMisukum",
    type: "data",
    width: "80",
    header: {
      text: "미입금액",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "pjSwName",
    fieldName: "pjSwName",
    type: "data",
    width: "100",
    header: {
      text: "사원",
    },
  },
  {
    name: "pjBigo",
    fieldName: "pjBigo",
    type: "data",
    width: "130",
    header: {
      text: "비고",
    },
  },
];
