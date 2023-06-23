import { ValueType } from "realgrid";

export const fields1 = [
  {
    fieldName: "cuCno",
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
    fieldName: "junjan",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jmonth1",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jmonth2",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jmonth3",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jmonth4",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jmonth5",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuJmisu",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuSwName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "mjDate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "minDate",
    dataType: ValueType.TEXT,
  },
];

export const columns1 = [
  {
    name: "cuCno",
    fieldName: "cuCno",
    type: "data",
    width: "50",
    header: {
      text: "순번",
    },
    footer: {
      valueCallback: function (grid: any) {
        return grid.getSummary("cuCno", "count");
      },
    },
  },

  {
    name: "cuCode",
    fieldName: "cuCode",
    type: "data",
    width: "50",
    header: {
      text: "코드",
    },
  },
  {
    name: "cuName",
    fieldName: "cuName",
    type: "data",
    width: "150",
    header: {
      text: "거래처명",
    },
    styleName: "rg-left-column",
  },
  {
    name: "cuTel",
    fieldName: "cuTel",
    type: "data",
    width: "150",
    header: {
      text: "전화번호",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "junjan",
    fieldName: "junjan",
    type: "data",
    width: "70",
    header: {
      text: "전미수",
    },
    styleName: "rg-left-column",
  },
  {
    name: "jmonth1",
    fieldName: "jmonth1",
    type: "data",
    width: "70",
    header: {
      text: "1월",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "jmonth2",
    fieldName: "jmonth2",
    type: "data",
    width: "70",
    header: {
      text: "2월",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "jmonth3",
    fieldName: "jmonth3",
    type: "data",
    width: "70",
    header: {
      text: "3월",
    },
  },

  {
    name: "jmonth4",
    fieldName: "jmonth4",
    type: "data",
    width: "70",
    header: {
      text: "4월",
    },
  },
  {
    name: "jmonth5",
    fieldName: "jmonth5",
    type: "data",
    width: "90",
    header: {
      text: "5월",
    },
    styleName: "rg-left-column",
  },
  {
    name: "cuJmisu",
    fieldName: "cuJmisu",
    type: "data",
    width: "70",
    header: {
      text: "미수합계",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "cuSwName",
    fieldName: "cuSwName",
    type: "data",
    width: "70",
    header: {
      text: "사원 ",
    },
    styleName: "rg-left-column",
  },
  {
    name: "mjDate",
    fieldName: "mjDate",
    type: "data",
    width: "100",
    header: {
      text: "최종수금",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
  {
    name: "minDate",
    fieldName: "minDate",
    type: "data",
    width: "70",
    header: {
      text: "연체",
    },
    styleName: "rg-right-column",
    numberFormat: "#,##0",
  },
];
