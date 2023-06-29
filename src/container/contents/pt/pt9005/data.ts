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
    fieldName: "cuTel",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuHp",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjDate",
    dataType: ValueType.TEXT,
  },
  // {
  //   fieldName: "gjGumymsno",
  //   dataType: ValueType.TEXT,
  // },
  {
    fieldName: "gjGum",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gjGage",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gjTotal",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gjMisujan",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "lastMisu",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "cuSwName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gsDate",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: "gjCuCode",
    fieldName: "gjCuCode",
    type: "data",
    width: "80",
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
    name: "cuHp",
    fieldName: "cuHp",
    type: "data",
    width: "120",
    header: {
      text: "핸드폰",
    },
  },
  {
    name: "gjDate",
    fieldName: "gjDate",
    type: "data",
    width: "100",
    header: {
      text: "검침일자",
    },
  },
  // {
  //   name: "gjGumymsno",
  //   fieldName: "gjGumymsno",
  //   type: "data",
  //   width: "80",
  //   header: {
  //     text: "당검침",
  //   },
  //   styleName: "rg-right-column",
  //   numberFormat: "#,##0",
  // },
  {
    name: "gjGum",
    fieldName: "gjGum",
    type: "data",
    width: "80",
    header: {
      text: "당검침",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "gjGage",
    fieldName: "gjGage",
    type: "data",
    width: "80",
    header: {
      text: "사용량",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "gjTotal",
    fieldName: "gjTotal",
    type: "data",
    width: "100",
    header: {
      text: "당월금액",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "gjMisujan",
    fieldName: "gjMisujan",
    type: "data",
    width: "100",
    header: {
      text: "당월미수",
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
    name: "cuSwName",
    fieldName: "cuSwName",
    type: "data",
    width: "80",
    header: {
      text: "검침사원",
    },
  },
  {
    name: "gsDate",
    fieldName: "gsDate",
    type: "data",
    width: "100",
    styleName: "rg-left-column",
    header: {
      text: "최종수금일",
    },
  },
];
