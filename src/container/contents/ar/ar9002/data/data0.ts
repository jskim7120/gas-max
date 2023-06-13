import { ValueType } from "realgrid";

export const fields0 = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "pcDate",
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
    fieldName: "pcGum",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "pcGage",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "pcBigo",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "pcSwName",
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
    footer: {
      valueCallback: function (grid: any) {
        return grid.getSummary("areaCode", "count");
      },
    },
  },
  {
    name: "pcDate",
    fieldName: "pcDate",
    type: "data",
    width: "100",
    header: {
      text: "일자",
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
    name: "pcGum",
    fieldName: "pcGum",
    type: "data",
    width: "80",
    header: {
      text: "배달검침",
    },
    styleName: "rg-right-column",
  },
  {
    name: "pcGage",
    fieldName: "pcGage",
    type: "data",
    width: "80",
    header: {
      text: "사용량",
    },
    styleName: "rg-right-column",
  },
  {
    name: "pcBigo",
    fieldName: "pcBigo",
    type: "data",
    width: "130",
    header: {
      text: "비고",
    },
  },
  {
    name: "pcSwName",
    fieldName: "pcSwName",
    type: "data",
    width: "100",
    header: {
      text: "사원",
    },
    styleName: "rg-left-column",
  },
];
