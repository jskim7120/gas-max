import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "gjCuCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuUsername",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjDate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjGumymsno",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjJungum",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gjGum",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gjGage",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gjDanga",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gjKumack",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "qtyKg",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gjJunjankg",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gjJankg",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "sUseqty",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "danga",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "sKumack",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "sumKumack",
    dataType: ValueType.NUMBER,
  },
];

export const columns = [
  {
    name: "gjCuCode",
    fieldName: "gjCuCode",
    type: "data",
    width: "100",
    header: {
      text: "코드",
    },
    footer: {
      valueCallback: function (grid: any) {
        return grid.getSummary("gjCuCode", "count");
      },
    },
  },
  {
    name: "cuName",
    fieldName: "cuName",
    type: "data",
    width: "200",
    styleName: "rg-left-column",
    header: {
      text: "거래처명",
    },
  },
  {
    name: "cuUsername",
    fieldName: "cuUsername",
    type: "data",
    width: "100",
    styleName: "rg-left-column",
    header: {
      text: "사용자명",
    },
  },
  {
    name: "gjDate",
    fieldName: "gjDate",
    type: "data",
    width: "100",
    header: {
      text: "검침일",
    },
  },
  {
    name: "gjGumymsno",
    fieldName: "gjGumymsno",
    type: "data",
    width: "50",
    header: {
      text: "회차",
    },
  },
  {
    name: "gjJungum",
    fieldName: "gjJungum",
    type: "data",
    width: "60",
    header: {
      text: "전검",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "gjGum",
    fieldName: "gjGum",
    type: "data",
    width: "60",
    header: {
      text: "당검",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "gjGage",
    fieldName: "gjGage",
    type: "data",
    width: "60",
    header: {
      text: "사용량",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "gjDanga",
    fieldName: "gjDanga",
    type: "data",
    width: "60",
    header: {
      text: "단가",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "gjKumack",
    fieldName: "gjKumack",
    type: "data",
    width: "100",
    header: {
      text: "사용료",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "qtyKg",
    fieldName: "qtyKg",
    type: "data",
    width: "60",
    header: {
      text: "공급량",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "gjJunjankg",
    fieldName: "gjJunjankg",
    type: "data",
    width: "60",
    header: {
      text: "전잔",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "gjJankg",
    fieldName: "gjJankg",
    type: "data",
    width: "60",
    header: {
      text: "당잔",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "sUseqty",
    fieldName: "sUseqty",
    type: "data",
    width: "70",
    header: {
      text: "사용량",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "danga",
    fieldName: "danga",
    type: "data",
    width: "70",
    header: {
      text: "단가",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "sKumack",
    fieldName: "sKumack",
    type: "data",
    width: "100",
    header: {
      text: "금액",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "sumKumack",
    fieldName: "sumKumack",
    type: "data",
    width: "100",
    header: {
      text: "오차금액",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
];
export const layout = [
  "gjCuCode",
  "cuName",
  "cuUsername",
  "gjDate",
  "gjGumymsno",
  {
    name: "체적 사용 금액",
    directions: "horizontal",
    hideChildHeaders: false,
    items: ["gjJungum", "gjGum", "gjGage", "gjDanga", "gjKumack"],
  },
  {
    name: "중량 사용 금액",
    directions: "horizontal",
    hideChildHeaders: false,
    items: ["qtyKg", "gjJunjankg", "gjJankg", "sUseqty", "danga", "sKumack"],
  },
  "sumKumack",
];
