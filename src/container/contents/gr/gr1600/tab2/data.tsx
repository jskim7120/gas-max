import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "buycustYn",
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
    fieldName: "jpKg",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jpDangaType",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jpDanga",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jpVatKind",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jpChangedate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jpFreeYn",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: "buycustYn",
    fieldName: "buycustYn",
    type: "data",
    width: "80",
    header: {
      text: "매입퓸목",
    },
  },
  {
    name: "jpCode",
    fieldName: "jpCode",
    type: "data",
    width: "80",
    header: {
      text: "코드",
    },
  },
  {
    name: "jpName",
    fieldName: "jpName",
    type: "data",
    width: "80",
    header: {
      text: "품명",
    },
  },
  {
    name: "jpSpec",
    fieldName: "jpSpec",
    type: "data",
    width: "80",
    header: {
      text: "규격",
    },
  },
  {
    name: "jpKg",
    fieldName: "jpKg",
    type: "data",
    width: "80",
    header: {
      text: "용량",
    },
  },
  {
    name: "jpDangaType",
    fieldName: "jpDangaType",
    type: "data",
    width: "80",
    header: {
      text: "단가구분",
    },
  },
  {
    name: "jpDanga",
    fieldName: "jpDanga",
    type: "data",
    width: "80",
    header: {
      text: "매입단가",
    },
  },
  {
    name: "jpVatKind",
    fieldName: "jpVatKind",
    type: "data",
    width: "80",
    header: {
      text: "Vat",
    },
  },
  {
    name: "jpChangedate",
    fieldName: "jpChangedate",
    type: "data",
    width: "80",
    header: {
      text: "단가 변경일",
    },
  },
  {
    name: "jpFreeYn",
    fieldName: "jpFreeYn",
    type: "data",
    width: "80",
    header: {
      text: "무료품목",
    },
  },
];
