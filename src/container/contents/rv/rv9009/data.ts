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
    fieldName: "gjJunGum",
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
    fieldName: "giwha",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "m3tokg",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "qtykg",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "junjankg",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "jankg",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "sUseqty",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "sumKg",
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
    name: "gjJunGum",
    fieldName: "gjJunGum",
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
      text: "m3단가",
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
    name: "giwha",
    fieldName: "giwha",
    type: "data",
    width: "60",
    header: {
      text: "kg단가",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "m3tokg",
    fieldName: "m3tokg",
    type: "data",
    width: "60",
    header: {
      text: "사용량",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "qtykg",
    fieldName: "qtykg",
    type: "data",
    width: "60",
    header: {
      text: "공급량",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "junjankg",
    fieldName: "junjankg",
    type: "data",
    width: "60",
    header: {
      text: "전잔",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "jankg",
    fieldName: "jankg",
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
    width: "60",
    header: {
      text: "사용량",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "sumKg",
    fieldName: "sumKg",
    type: "data",
    width: "70",
    header: {
      text: "오차",
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
    name: "체적 사용량",
    directions: "horizontal",
    hideChildHeaders: false,
    items: [
      "gjJunGum",
      "gjGum",
      "gjGage",
      "gjDanga",
      "gjKumack",
      "giwha",
      "m3tokg",
    ],
  },
  {
    name: "가스 공급량",
    directions: "horizontal",
    hideChildHeaders: false,
    items: ["qtykg", "junjankg", "jankg", "sUseqty"],
  },
  "sumKg",
];
