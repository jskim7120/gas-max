import { ValueType } from "realgrid";

export const fields0 = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bbDate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bbBuName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bbBpName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bbBpType",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bbQty",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bbDanga",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bbKumack",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bbVat",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bbSum",
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
  },
  {
    name: "bbDate",
    fieldName: "bbDate",
    type: "data",
    width: "100",
    header: {
      text: "일자",
    },
    footer: {
      valueCallback: function (grid: any) {
        return grid.getSummary("bbDate", "count");
      },
    },
  },
  {
    name: "bbBuName",
    fieldName: "bbBuName",
    type: "data",
    width: "200",
    styleName: "rg-left-column",
    header: {
      text: "매입처명",
    },
  },
  {
    name: "bbBpName",
    fieldName: "bbBpName",
    type: "data",
    width: "150",
    styleName: "rg-left-column",
    header: {
      text: "품명",
    },
  },
  {
    name: "bbBpType",
    fieldName: "bbBpType",
    type: "data",
    width: "100",
    styleName: "rg-left-column",
    header: {
      text: "규격",
    },
  },
  {
    name: "bbQty",
    fieldName: "bbQty",
    type: "data",
    width: "90",
    styleName: "rg-right-column",
    header: {
      text: "수량",
    },
  },
  {
    name: "bbDanga",
    fieldName: "bbDanga",
    type: "data",
    width: "120",
    styleName: "rg-right-column",
    header: {
      text: "단가",
    },
  },
  {
    name: "bbKumack",
    fieldName: "bbKumack",
    type: "data",
    width: "120",
    styleName: "rg-right-column",
    header: {
      text: "금액",
    },
  },
  {
    name: "bbVat",
    fieldName: "bbVat",
    type: "data",
    width: "120",
    styleName: "rg-right-column",
    header: {
      text: "세액",
    },
  },
  {
    name: "bbSum",
    fieldName: "bbSum",
    type: "data",
    width: "120",
    styleName: "rg-right-column",
    header: {
      text: "합계",
    },
  },
];
