import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "orderDate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "salestateName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "pjDate",
    dataType: ValueType.TEXT,
  },
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
    fieldName: "pjtypeName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jpName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "qty",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "reqty",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "swName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "vatDiv",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "kumack",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "inkumtypeName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "inkum",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "dc",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "misukum",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "bigo",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "proxytypeName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "inserttypeName",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: "orderDate",
    fieldName: "orderDate",
    type: "data",
    width: "120",
    header: {
      text: "접수일자",
    },
    footer: {
      numberFormat: "#,##0",
      expression: "count",
    },
  },
  {
    name: "salestateName",
    fieldName: "salestateName",
    type: "data",
    width: "80",
    header: {
      text: "상태",
    },
    lookupDisplay: true,
    values: ["0", "1", "2", "3", "5", "6", "7", "9"],
    labels: [
      "접수",
      "준비",
      "배송요청",
      "배송중",
      "완료",
      "예약",
      "연기",
      "취소",
    ],
    editor: { type: "dropdown" },
  },
  {
    name: "pjDate",
    fieldName: "pjDate",
    type: "data",
    width: "90",
    header: {
      text: "일자",
    },
  },
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
    width: "100",
    header: {
      text: "코드",
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
    name: "pjtypeName",
    fieldName: "pjtypeName",
    type: "data",
    width: "50",
    header: {
      text: "구분",
    },
  },
  {
    name: "jpName",
    fieldName: "jpName",
    type: "data",
    width: "90",
    styleName: "rg-left-column",
    header: {
      text: "품명",
    },
  },
  {
    name: "qty",
    fieldName: "qty",
    type: "data",
    width: "60",
    styleName: "rg-right-column",
    numberFormat: "#,##0",
    header: {
      text: "납품",
    },
    footer: {
      numberFormat: "#,##0",
      expression: "sum",
    },
  },
  {
    name: "reqty",
    fieldName: "reqty",
    type: "data",
    width: "60",
    styleName: "rg-right-column",
    numberFormat: "#,##0",
    header: {
      text: "회수",
    },
    footer: {
      numberFormat: "#,##0",
      expression: "sum",
    },
  },

  {
    name: "vatDiv",
    fieldName: "vatDiv",
    type: "data",
    width: "60",
    styleName: "rg-right-column",
    header: {
      text: "VAT",
    },
    numberFormat: "#,##0",
    footer: {
      numberFormat: "#,##0",
      expression: "sum",
    },
  },
  {
    name: "kumack",
    fieldName: "kumack",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "금액",
    },
    numberFormat: "#,##0",
    footer: {
      numberFormat: "#,##0",
      expression: "sum",
    },
  },
  {
    name: "dc",
    fieldName: "dc",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "D/C",
    },
    numberFormat: "#,##0",
    footer: {
      numberFormat: "#,##0",
      expression: "sum",
    },
  },
  {
    name: "inkum",
    fieldName: "inkum",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "입금액",
    },
    numberFormat: "#,##0",
    footer: {
      numberFormat: "#,##0",
      expression: "sum",
    },
  },
  {
    name: "misukum",
    fieldName: "misukum",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "미입금액",
    },
    numberFormat: "#,##0",
    footer: {
      numberFormat: "#,##0",
      expression: "sum",
    },
  },
  {
    name: "inkumtypeName",
    fieldName: "inkumtypeName",
    type: "data",
    width: "80",
    header: {
      text: "방법",
    },
  },
  {
    name: "swName",
    fieldName: "swName",
    type: "data",
    width: "100",
    styleName: "rg-left-column",
    header: {
      text: "사원",
    },
  },
  {
    name: "bigo",
    fieldName: "bigo",
    type: "data",
    width: "130",
    styleName: "rg-left-column",
    header: {
      text: "비고",
    },
  },
  {
    name: "proxytypeName",
    fieldName: "proxytypeName",
    type: "data",
    width: "80",
    header: {
      text: "대납",
    },
  },
  {
    name: "inserttypeName",
    fieldName: "inserttypeName",
    type: "data",
    width: "100",
    header: {
      text: "등록구분",
    },
  },
];
