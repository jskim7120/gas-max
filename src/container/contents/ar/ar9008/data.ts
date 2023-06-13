import { ValueType } from "realgrid";

export const fields = [
  //   {
  //     fieldName: "areaCode",
  //     dataType: ValueType.TEXT,
  //   },
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
    fieldName: "sumKg",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "junMisu",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "kumack",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "DC",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "inkum",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "misukum",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "suKum",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "suDC",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "dangMisu",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "chkYn",
    dataType: ValueType.TEXT,
  },
];
export const columns = [
  //   {
  //     name: "areaCode",
  //     fieldName: "areaCode",
  //     type: "data",
  //     width: "100",
  //     header: {
  //       text: "영업소",
  //     },
  //   },
  {
    name: "cuCode",
    fieldName: "cuCode",
    type: "data",
    width: "90",
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
    name: "cuTel",
    fieldName: "cuTel",
    type: "data",
    width: "100",
    styleName: "rg-left-column",
    header: {
      text: "전화",
    },
  },
  {
    name: "sumKg",
    fieldName: "sumKg",
    type: "data",
    width: "50",
    styleName: "rg-right-column",
    header: {
      text: "공급량",
    },
    numberFormat: "#,##0",
  },
  {
    name: "junMisu",
    fieldName: "junMisu",
    type: "data",
    width: "80",
    styleName: "rg-right-column",
    header: {
      text: "전월미수",
    },
    numberFormat: "#,##0",
  },
  {
    name: "kumack",
    fieldName: "kumack",
    type: "data",
    width: "80",
    styleName: "rg-right-column",
    header: {
      text: "매출액",
    },
    numberFormat: "#,##0",
  },
  {
    name: "DC",
    fieldName: "DC",
    type: "data",
    width: "80",
    styleName: "rg-right-column",
    header: {
      text: "D/C",
    },
    numberFormat: "#,##0",
  },
  {
    name: "inkum",
    fieldName: "inkum",
    type: "data",
    width: "80",
    styleName: "rg-right-column",
    header: {
      text: "입금액",
    },
    numberFormat: "#,##0",
  },
  {
    name: "misukum",
    fieldName: "misukum",
    type: "data",
    width: "80",
    styleName: "rg-right-column",
    header: {
      text: "미수금액",
    },
    numberFormat: "#,##0",
  },
  {
    name: "suKum",
    fieldName: "suKum",
    type: "data",
    width: "80",
    styleName: "rg-right-column",
    header: {
      text: "수금액",
    },
    numberFormat: "#,##0",
  },
  {
    name: "suDC",
    fieldName: "suDC",
    type: "data",
    width: "80",
    styleName: "rg-right-column",
    header: {
      text: "D/C",
    },
    numberFormat: "#,##0",
  },
  {
    name: "dangMisu",
    fieldName: "dangMisu",
    type: "data",
    width: "80",
    styleName: "rg-right-column",
    header: {
      text: "당월미수",
    },
    numberFormat: "#,##0",
  },
  {
    name: "chkYn",
    fieldName: "chkYn",
    type: "data",
    width: "50",
    header: {
      text: "선택 ",
    },
  },
];
