import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuCode",
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
    fieldName: "cuCmisu",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "cuSwName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "suDate",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
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
    name: "cuCode",
    fieldName: "cuCode",
    type: "data",
    width: "90",
    header: {
      text: "거래처코드",
    },
    footer: {
      valueCallback: function (grid: any) {
        return grid.getSummary("cuCode", "count");
      },
    },
  },
  {
    name: "cuName",
    fieldName: "cuName",
    type: "data",
    width: "200",
    header: {
      text: "거래처",
    },
    styleName: "rg-left-column",
  },
  {
    name: "cuTel",
    fieldName: "cuTel",
    type: "data",
    width: "120",
    header: {
      text: "전화번호",
    },
    styleName: "rg-left-column",
  },
  {
    name: "cuCmisu",
    fieldName: "cuCmisu",
    type: "data",
    width: "100",
    header: {
      text: "미수금액",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },

  {
    name: "suDate",
    fieldName: "suDate",
    type: "data",
    width: "80",
    header: {
      text: "최종 검침일",
    },
  },
  {
    name: "cuSwName",
    fieldName: "cuSwName",
    type: "data",
    width: "80",
    header: {
      text: "담당사원",
    },
    styleName: "rg-left-column",
  },
];
