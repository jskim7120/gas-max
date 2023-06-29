import { ValueType } from "realgrid";

export const fields0 = [
  {
    fieldName: "mjCuCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "mjCuName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuTel",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "mjDate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "mjBigo",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "mjMisujan",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "lastMisu",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "mjSwName",
    dataType: ValueType.TEXT,
  },
];

export const columns0 = [
  {
    name: "mjCuCode",
    fieldName: "mjCuCode",
    type: "data",
    width: "80",
    header: {
      text: "코드",
    },
    footer: {
      valueCallback: function (grid: any) {
        return grid.getSummary("mjCuCode", "count");
      },
    },
  },
  {
    name: "mjCuName",
    fieldName: "mjCuName",
    type: "data",
    width: "200",
    styleName: "rg-left-column",
    header: {
      text: "거래처명",
    },
  },

  {
    name: "cuTel",
    fieldName: "cuTel",
    type: "data",
    width: "120",
    styleName: "rg-left-column",
    header: {
      text: "전화번호",
    },
  },
  {
    name: "mjDate",
    fieldName: "mjDate",
    type: "data",
    width: "100",
    header: {
      text: "일자",
    },
  },
  {
    name: "mjBigo",
    fieldName: "mjBigo",
    type: "data",
    width: "250",
    styleName: "rg-left-column",
    header: {
      text: "적요",
    },
  },
  {
    name: "mjMisujan",
    fieldName: "mjMisujan",
    type: "data",
    width: "100",
    header: {
      text: "미수금액",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "lastMisu",
    fieldName: "lastMisu",
    type: "data",
    width: "100",
    header: {
      text: "누계",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "mjSwName",
    fieldName: "mjSwName",
    type: "data",
    width: "70",
    styleName: "rg-left-column",
    header: {
      text: "사원",
    },
  },
];
