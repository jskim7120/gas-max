import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bpCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bpName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bpType",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bpDanwi",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bpIndanga",
    dataType: ValueType.TEXT,
  },

  {
    fieldName: "bpOutdanga",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: "areaCode",
    fieldName: "areaCode",
    type: "data",
    width: "80",
    header: {
      text: "영업소",
    },
    footer: {
      valueCallback: function (grid: any) {
        return grid.getSummary("areaCode", "count");
      },
    },
  },
  {
    name: "bpCode",
    fieldName: "bpCode",
    type: "data",
    width: "120",
    header: {
      text: "부품코드",
    },
  },
  {
    name: "bpName",
    fieldName: "bpName",
    type: "data",
    width: "120",
    styleName: "rg-left-column",
    header: {
      text: "부품명",
    },
  },
  {
    name: "bpType",
    fieldName: "bpType",
    type: "data",
    width: "120",
    header: {
      text: "규격",
    },
  },
  {
    name: "bpDanwi",
    fieldName: "bpDanwi",
    type: "data",
    width: "120",
    header: {
      text: "단위",
    },
  },
  {
    name: "bpIndanga",
    fieldName: "bpIndanga",
    type: "data",
    width: "120",
    styleName: "rg-right-column",
    header: {
      text: "매입단가",
    },
  },
  {
    name: "bpOutdanga",
    fieldName: "bpOutdanga",
    type: "data",
    width: "120",
    styleName: "rg-right-column",
    header: {
      text: "판매단가",
    },
  },
];
