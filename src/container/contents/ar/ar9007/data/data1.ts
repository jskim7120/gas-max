import { ValueType } from "realgrid";

export const fields1 = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jcCuCode",
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
    fieldName: "cuAddr1",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jcJpName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "yBokTmQty",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jcTdaemKumn",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jcLastdate5",
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
        return grid.getSummary("jcBok", "count");
      },
    },
  },
  {
    name: "jcCuCode",
    fieldName: "jcCuCode",
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
    width: "110",
    styleName: "rg-left-column",
    header: {
      text: "전화번호",
    },
  },
  {
    name: "cuAddr1",
    fieldName: "cuAddr1",
    type: "data",
    width: "200",
    styleName: "rg-left-column",
    header: {
      text: "주소",
    },
  },
  {
    name: "jcJpName",
    fieldName: "jcJpName",
    type: "data",
    width: "90",
    styleName: "rg-left-column",
    header: {
      text: "품명",
    },
  },
  {
    name: "yBokTmQty",
    fieldName: "yBokTmQty",
    type: "data",
    width: "50",
    styleName: "rg-right-column",
    header: {
      text: "유상",
    },
  },
  {
    name: "jcTdaemKumn",
    fieldName: "jcTdaemKumn",
    type: "data",
    width: "50",
    styleName: "rg-right-column",
    header: {
      text: "무상",
    },
  },
  {
    name: "jcLastdate5",
    fieldName: "jcLastdate5",
    type: "data",
    width: "100",
    styleName: "rg-left-column",
    header: {
      text: "최종공급일",
    },
  },
];
