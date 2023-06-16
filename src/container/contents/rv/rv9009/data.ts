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
    fieldName: "gjDanga",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjKumack",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "giwha",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "m3tokg",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "qtykg",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "junjankg",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jankg",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "sUseqty",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "sumKg",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: "gjCuCode",
    fieldName: "gjCuCode",
    type: "data",
    width: "50",
    header: {
      text: "코드",
    },
    footer: {
      valueCallback: function (grid: any) {
        return grid.getSummary("areaCode", "count");
      },
    },
  },
  {
    name: "cuName",
    fieldName: "cuName",
    type: "data",
    width: "100",
    header: {
      text: "거래처명",
    },
  },
  {
    name: "cuUsername",
    fieldName: "cuUsername",
    type: "data",
    width: "90",
    header: {
      text: "사용자명",
    },
  },
  {
    name: "gjDate",
    fieldName: "gjDate",
    type: "data",
    width: "200",
    header: {
      text: "검침일",
    },
    styleName: "rg-left-column",
  },
  {
    name: "gjGumymsno",
    fieldName: "gjGumymsno",
    type: "data",
    width: "50",
    header: {
      text: "회차",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "gjJunGum",
    fieldName: "gjJunGum",
    type: "data",
    width: "50",
    header: {
      text: "전검",
    },
    styleName: "rg-left-column",
  },
  {
    name: "gjGum",
    fieldName: "gjGum",
    type: "data",
    width: "50",
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
    width: "50",
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
    width: "50",
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
    width: "50",
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
    width: "50",
    styleName: "rg-right-column",
    header: {
      text: "kg단가",
    },
  },
  {
    name: "m3tokg",
    fieldName: "m3tokg",
    type: "data",
    width: "50",
    header: {
      text: "사용량",
    },
    styleName: "rg-right-column",
  },
  {
    name: "qtykg",
    fieldName: "qtykg",
    type: "data",
    width: "50",
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
    width: "50",
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
    width: "50",
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
    width: "50",
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
    width: "100",
    header: {
      text: "오차",
    },
    styleName: "rg-left-column",
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
    items: ["qtyKg", "junjankg", "jankg", "sUseqty"],
  },
  "sumKg",
];
