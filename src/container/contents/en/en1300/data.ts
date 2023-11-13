import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jpCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jpName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jpSpec",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jpGubunName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jpKindName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jpKg",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "jpUnitName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jpOutdanga",
    dataType: ValueType.TEXT,
  },

  {
    fieldName: "jpOuttong",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jpJaegoYnName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jpSort",
    dataType: ValueType.NUMBER,
  },
];

export const columns = [
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
        return grid.getSummary("areaCode", "count");
      },
    },
  },
  {
    name: "jpCode",
    fieldName: "jpCode",
    type: "data",
    width: "50",
    header: {
      text: "코드",
    },
    styleName: "rg-left-column",
  },
  {
    name: "jpName",
    fieldName: "jpName",
    type: "data",
    width: "250",
    styleName: "rg-left-column",
    header: {
      text: "품명",
    },
  },

  {
    name: "jpSpec",
    fieldName: "jpSpec",
    type: "data",
    width: "70",
    styleName: "rg-left-column",
    header: {
      text: "규격",
    },
  },
  {
    name: "jpGubunName",
    fieldName: "jpGubunName",
    type: "data",
    width: "70",
    header: {
      text: "가스 구분",
    },
    styleName: "rg-left-column",
  },
  {
    name: "jpKindName",
    fieldName: "jpKindName",
    type: "data",
    width: "70",
    header: {
      text: "품목 구분",
    },
    styleName: "rg-left-column",
  },
  {
    name: "jpKg",
    fieldName: "jpKg",
    type: "data",
    width: "60",
    header: {
      text: "용량",
    },
    styleName: "rg-right-column",
    numberFormat: "#",
  },
  {
    name: "jpUnitName",
    fieldName: "jpUnitName",
    type: "data",
    width: "50",
    header: {
      text: "단위",
    },
    styleName: "rg-right-column",
  },
  {
    name: "jpOutdanga",
    fieldName: "jpOutdanga",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "가스판매 단가",
    },
  },
  {
    name: "jpOuttong",
    fieldName: "jpOuttong",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "용기판매 단가",
    },
  },
  {
    name: "jpJaegoYnName",
    fieldName: "jpJaegoYnName",
    type: "data",
    width: "92",
    header: {
      text: "재고사용 유무",
    },
    styleName: "rg-left-column",
  },
  {
    name: "jpSort",
    fieldName: "jpSort",
    type: "data",
    width: "50",
    header: {
      text: "순번",
    },
    styleName: "rg-left-column",
    numberFormat: "#",
  },
];
