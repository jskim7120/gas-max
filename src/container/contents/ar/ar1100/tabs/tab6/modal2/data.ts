import CheckBox from "components/checkbox";
import { ValueType } from "realgrid";

export const fields = [
  // {
  //   fieldName: "misuYn",
  //   dataType: ValueType.BOOLEAN,
  // },
  {
    fieldName: "gjGumymsno",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjDate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjJungum",
    dataType: ValueType.TEXT,
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
    fieldName: "gjDangkum",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gjMisu",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gjPerkum",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gjTotal",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gjJirodate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjMisujan",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gsSwName",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  // {
  //   name: "misuYn",
  //   fieldName: "misuYn",
  //   width: "40",
  //   header: {
  //     // text: "Text",
  //     type: CheckBox,
  //   },
  //   renderer: {
  //     type: "check",
  //     // trueValues: "Y",
  //     // falseValues: "N",
  //   },
  // },
  {
    name: "gjGumymsno",
    fieldName: "gjGumymsno",
    width: "80",
    type: "data",
    header: {
      text: "검침회차",
    },
    editable: false,
    footer: {
      valueCallback: function (grid: any) {
        return grid.getSummary("areaCode", "count");
      },
    },
  },
  {
    name: "gjDate",
    fieldName: "gjDate",
    width: "70",
    type: "data",
    header: {
      text: "검침일자",
    },
    editable: false,
  },
  {
    name: "gjJungum",
    fieldName: "gjJungum",
    width: "60",
    type: "data",
    styleName: "rg-right-column",
    numberFormat: "#,##0",
    header: {
      text: "전월",
    },
  },
  {
    name: "gjGum",
    fieldName: "gjGum",
    width: "60",
    type: "data",
    styleName: "rg-right-column",
    numberFormat: "#,##0",
    header: {
      text: "당월",
    },
  },
  {
    name: "gjGage",
    fieldName: "gjGage",
    width: "50",
    type: "data",
    styleName: "rg-right-column",
    numberFormat: "#,##0",
    header: {
      text: "사용량",
    },
  },
  {
    name: "gjDangkum",
    fieldName: "gjDangkum",
    width: "80",
    type: "data",
    styleName: "rg-right-column",
    numberFormat: "#,##0",
    header: {
      text: "당월금액",
    },
  },
  {
    name: "gjMisu",
    fieldName: "gjMisu",
    width: "80",
    type: "data",
    styleName: "rg-right-column",
    numberFormat: "#,##0",
    header: {
      text: "전미수",
    },
  },
  {
    name: "gjPerkum",
    fieldName: "gjPerkum",
    width: "80",
    type: "data",
    styleName: "rg-right-column",
    numberFormat: "#,##0",
    header: {
      text: "연체료",
    },
  },
  {
    name: "gjTotal",
    fieldName: "gjTotal",
    width: "80",
    type: "data",
    styleName: "rg-right-column",
    numberFormat: "#,##0",
    header: {
      text: "당월합계",
    },
  },
  {
    name: "gjJirodate",
    fieldName: "gjJirodate",
    width: "80",
    type: "data",
    header: {
      text: "지로발행일",
    },
  },
  {
    name: "gjMisujan",
    fieldName: "gjMisujan",
    width: "80",
    type: "data",
    styleName: "rg-right-column",
    numberFormat: "#,##0",
    header: {
      text: "미수잔액",
    },
  },
  {
    name: "gsSwName",
    fieldName: "gsSwName",
    width: "60",
    type: "data",
    header: {
      text: "사원",
    },
  },
];
