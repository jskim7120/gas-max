import { ValueType } from "realgrid";

export const fields1 = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "pcCuCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "pcCuName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "pcJpName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "pcQty",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "pcDanga",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "pcKumack",
    dataType: ValueType.NUMBER,
  },

  {
    fieldName: "pcDate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "pcSwName",
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
    footer: {
      valueCallback: function (grid: any) {
        return grid.getSummary("areaCode", "count");
      },
    },
  },
  {
    name: "pcCuCode",
    fieldName: "pcCuCode",
    type: "data",
    width: "90",
    header: {
      text: "거래처코드",
    },
  },
  {
    name: "pcCuName",
    fieldName: "pcCuName",
    type: "data",
    width: "200",
    header: {
      text: "거래처명",
    },
    styleName: "rg-left-column",
  },
  {
    name: "pcJpName",
    fieldName: "pcJpName",
    type: "data",
    width: "90",
    header: {
      text: "품명",
    },
    styleName: "rg-left-column",
  },

  {
    name: "pcQty",
    fieldName: "pcQty",
    type: "data",
    width: "50",
    header: {
      text: "수량",
    },
    styleName: "rg-right-column",
  },
  {
    name: "pcDanga",
    fieldName: "pcDanga",
    type: "data",
    width: "70",
    header: {
      text: "단가",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "pcKumack",
    fieldName: "pcKumack",
    type: "data",
    width: "80",
    header: {
      text: "공급액",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "pcDate",
    fieldName: "pcDate",
    type: "data",
    width: "100",
    header: {
      text: "최종공급일",
    },
    styleName: "rg-left-column",
  },
  {
    name: "pcSwName",
    fieldName: "pcSwName",
    type: "data",
    width: "100",
    header: {
      text: "담당사원",
    },
    styleName: "rg-left-column",
  },
];
