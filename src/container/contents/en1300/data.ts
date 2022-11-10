import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jpGubun",
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
    fieldName: "jpUnit",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jpKg",
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
    fieldName: "jpSort",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "jpJaegoYn",
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
  },
  {
    name: "jpGubun",
    fieldName: "jpGubun",
    type: "data",
    width: "120",
    header: {
      text: "코드",
    },
  },
  {
    name: "jpCode",
    fieldName: "jpCode",
    type: "data",
    width: "120",
    styleName: "rg-left-column",
    header: {
      text: "품명",
    },
  },

  {
    name: "jpName",
    fieldName: "jpCode",
    type: "data",
    width: "120",
    styleName: "rg-left-column",
    header: {
      text: "규격",
    },
  },
  {
    name: "jpSpec",
    fieldName: "jpCode",
    type: "data",
    width: "120",
    header: {
      text: "가스구분",
    },
  },
  {
    name: "jpUnit",
    fieldName: "jpCode",
    type: "data",
    width: "120",
    header: {
      text: "용량 ",
    },
  },
  {
    name: "jpKg",
    fieldName: "jpCode",
    type: "data",
    width: "120",
    header: {
      text: "단위",
    },
  },
  {
    name: "jpOutdanga",
    fieldName: "jpCode",
    type: "data",
    width: "120",
    styleName: "rg-right-column",
    header: {
      text: "가스판매단가",
    },
  },
  {
    name: "jpOuttong",
    fieldName: "jpCode",
    type: "data",
    width: "120",
    styleName: "rg-right-column",
    header: {
      text: "용기판매단가",
    },
  },
  {
    name: "jpSort",
    fieldName: "jpCode",
    type: "data",
    width: "120",
    header: {
      text: "재고사용유무",
    },
  },
  {
    name: "jpJaegoyn",
    fieldName: "jpCode",
    type: "data",
    width: "120",
    header: {
      text: "순번",
    },
  },
];
