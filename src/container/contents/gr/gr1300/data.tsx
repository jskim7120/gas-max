import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bbDate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bbTypeName",
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
    fieldName: "bbSum",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bbVat",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bbTotal",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bbSupplyTypeName",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: "areaCode",
    fieldName: "areaCode",
    width: "60",
    type: "data",
    header: {
      text: "영업소",
    },
  },
  {
    name: "bbDate",
    fieldName: "bbDate",
    width: "90",
    type: "data",
    header: {
      text: "매입일자",
    },
    footer: {
      valueCallback: function (grid: any) {
        return grid.getSummary("bbDate", "count");
      },
    },
  },
  {
    name: "bbTypeName",
    fieldName: "bbTypeName",
    width: "60",
    type: "data",
    header: {
      text: "구분",
    },
  },
  {
    name: "bbBuName",
    fieldName: "bbBuName",
    width: "180",
    type: "data",
    styleName: "rg-left-column",
    header: {
      text: "매입처명",
    },
  },
  {
    name: "bbBpName",
    fieldName: "bbBpName",
    width: "180",
    type: "data",
    styleName: "rg-left-column",
    header: {
      text: "품명",
    },
  },
  {
    name: "bbSum",
    fieldName: "bbSum",
    width: "80",
    type: "data",
    styleName: "rg-right-column",
    header: {
      text: "공급액",
    },
  },
  {
    name: "bbVat",
    fieldName: "bbVat",
    width: "80",
    type: "data",
    styleName: "rg-right-column",
    header: {
      text: "세액",
    },
  },
  {
    name: "bbTotal",
    fieldName: "bbTotal",
    width: "80",
    type: "data",
    styleName: "rg-right-column",
    header: {
      text: "합계",
    },
  },
  {
    name: "bbSupplyTypeName",
    fieldName: "bbSupplyTypeName",
    width: "70",
    type: "data",
    header: {
      text: "지급",
    },
  },
];
