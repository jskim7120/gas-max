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

    renderer: {
      type: "check",
      trueValues: "Y",
      falseValues: "N",
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
    editable: false,
  },
  {
    name: "jpName",
    fieldName: "jpName",
    type: "data",
    width: "80",
    header: {
      text: "품명",
    },
    editable: false,
  },
  {
    name: "jpSpec",
    fieldName: "jpSpec",
    type: "data",
    width: "80",
    header: {
      text: "규격",
    },
    editable: false,
  },
  {
    name: "jpKg",
    fieldName: "jpKg",
    type: "data",
    width: "80",
    header: {
      text: "용량",
    },
    editable: false,
  },
  {
    name: "jpDangaType",
    fieldName: "jpDangaType",
    type: "data",
    width: "80",
    header: {
      text: "단가구분",
    },
    lookupDisplay: true,
    values: ["", "0", "1", "2"],
    labels: ["", "환경단가", "할인단가", "개별단가"],
    editor: { type: "dropdown" },
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
    lookupDisplay: true,
    values: ["", "0", "1", "2"],
    labels: ["", "포함", "별도", "비과세"],
    editor: { type: "dropdown" },
  },
  {
    name: "jpChangedate",
    fieldName: "jpChangedate",
    type: "data",
    width: "80",
    header: {
      text: "단가 변경일",
    },
    editable: false,
  },
  {
    name: "jpFreeYn",
    fieldName: "jpFreeYn",
    type: "data",
    width: "80",
    header: {
      text: "무료품목",
    },
    editable: false,
  },
];

export const col1 = [
  {
    name: "buycustYn",
    fieldName: "buycustYn",
    type: "data",
    width: "80",
    header: {
      text: "매입퓸목",
    },

    renderer: {
      type: "check",
      trueValues: "Y",
      falseValues: "N",
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
    editable: false,
  },
  {
    name: "jpName",
    fieldName: "jpName",
    type: "data",
    width: "80",
    header: {
      text: "품명",
    },
    editable: false,
  },
  {
    name: "jpSpec",
    fieldName: "jpSpec",
    type: "data",
    width: "80",
    header: {
      text: "규격",
    },
    editable: false,
  },
  {
    name: "jpKg",
    fieldName: "jpKg",
    type: "data",
    width: "80",
    header: {
      text: "용량",
    },
    editable: false,
  },
];

export const col2 = [
  {
    name: "jpDanga",
    fieldName: "jpDanga",
    type: "data",
    width: "80",
    header: {
      text: "매입단가",
    },
  },
];

export const col3 = [
  {
    name: "jpChangedate",
    fieldName: "jpChangedate",
    type: "data",
    width: "80",
    header: {
      text: "단가 변경일",
    },
    editable: false,
  },
  {
    name: "jpFreeYn",
    fieldName: "jpFreeYn",
    type: "data",
    width: "80",
    header: {
      text: "무료품목",
    },
    editable: false,
  },
];

export const dangaType = {
  name: "jpDangaType",
  fieldName: "jpDangaType",
  type: "data",
  width: "80",
  header: {
    text: "단가구분",
  },
  lookupDisplay: true,
  editor: { type: "dropdown" },
  values: [],
  labels: [],
};

export const vatKind = {
  name: "jpVatKind",
  fieldName: "jpVatKind",
  type: "data",
  width: "80",
  header: {
    text: "Vat",
  },
  lookupDisplay: true,
  editor: { type: "dropdown" },
  values: [],
  labels: [],
};
