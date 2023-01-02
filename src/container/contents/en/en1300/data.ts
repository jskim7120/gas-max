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
    fieldName: "jpKg",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jpUnitName",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "jpOutdanga",
    dataType: ValueType.NUMBER,
  },

  {
    fieldName: "jpOuttong",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "jpJaegoYn",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "jpSort",
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
    name: "jpCode",
    fieldName: "jpCode",
    type: "data",
    width: "120",
    header: {
      text: "코드",
    },
  },
  {
    name: "jpName",
    fieldName: "jpName",
    type: "data",
    width: "120",
    styleName: "rg-left-column",
    header: {
      text: "품명",
    },
  },

  {
    name: "jpSpec",
    fieldName: "jpSpec",
    type: "data",
    width: "120",
    styleName: "rg-left-column",
    header: {
      text: "규격",
    },
  },
  {
    name: "jpGubunName",
    fieldName: "jpGubunName",
    type: "data",
    width: "120",
    header: {
      text: "가스구분",
    },
  },
  {
    name: "jpKg",
    fieldName: "jpKg",
    type: "data",
    width: "120",
    header: {
      text: "용량 ",
    },
  },
  {
    name: "jpUnitName",
    fieldName: "jpUnitName",
    type: "data",
    width: "120",
    header: {
      text: "단위",
    },
  },
  {
    name: "jpOutdanga",
    fieldName: "jpOutdanga",
    type: "data",
    width: "120",
    styleName: "rg-right-column",
    header: {
      text: "가스판매단가",
    },
  },
  {
    name: "jpOuttong",
    fieldName: "jpOuttong",
    type: "data",
    width: "120",
    styleName: "rg-right-column",
    header: {
      text: "용기판매단가",
    },
  },
  {
    name: "jpJaegoYn",
    fieldName: "jpJaegoYn",
    type: "data",
    width: "120",
    header: {
      text: "재고사용유무",
    },
  },
  {
    name: "jpSort",
    fieldName: "jpSort",
    type: "data",
    width: "120",
    header: {
      text: "순번",
    },
  },
];
