import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "buycustYn",
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
    fieldName: "bpSpec",
    dataType: ValueType.TEXT,
  },

  {
    fieldName: "bpDanwi",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bpDangaType",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bpDanga",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bpVatKind",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bpChangedate",
    dataType: ValueType.TEXT,
  },
];

// export const columns = [
//   {
//     name: "buycustYn",
//     fieldName: "buycustYn",
//     type: "data",
//     width: "80",
//     header: {
//       text: "매입퓸목",
//     },

//     renderer: {
//       type: "check",
//       trueValues: "Y",
//       falseValues: "N",
//     },
//   },
//   {
//     name: "bpCode",
//     fieldName: "bpCode",
//     type: "data",
//     width: "80",
//     header: {
//       text: "코드",
//     },
//     editable: false,
//   },
//   {
//     name: "bpName",
//     fieldName: "bpName",
//     type: "data",
//     width: "80",
//     header: {
//       text: "부품명",
//     },
//     editable: false,
//   },
//   {
//     name: "bpSpec",
//     fieldName: "bpSpec",
//     type: "data",
//     width: "80",
//     header: {
//       text: "규격",
//     },
//     editable: false,
//   },
//   {
//     name: "bpDanwi",
//     fieldName: "bpDanwi",
//     type: "data",
//     width: "80",
//     header: {
//       text: "단위",
//     },
//     editable: false,
//   },

//   {
//     name: "bpDangaType",
//     fieldName: "bpDangaType",
//     type: "data",
//     width: "80",
//     header: {
//       text: "단가구분",
//     },
//     lookupDisplay: true,
//     values: ["", "0", "1", "2"],
//     labels: ["", "환경단가", "할인단가", "개별단가"],
//     editor: { type: "dropdown" },
//   },
//   {
//     name: "bpDanga",
//     fieldName: "bpDanga",
//     type: "data",
//     width: "80",
//     header: {
//       text: "매입단가",
//     },
//   },
//   {
//     name: "bpVatKind",
//     fieldName: "bpVatKind",
//     type: "data",
//     width: "80",
//     header: {
//       text: "Vat",
//     },
//     lookupDisplay: true,
//     values: ["", "0", "1", "2"],
//     labels: ["", "포함", "별도", "비과세"],
//     editor: { type: "dropdown" },
//   },
//   {
//     name: "bpChangedate",
//     fieldName: "bpChangedate",
//     type: "data",
//     width: "80",
//     header: {
//       text: "단가 변경일",
//     },
//     editable: false,
//   },
// ];

export const col1 = [
  {
    name: "buycustYn",
    fieldName: "buycustYn",
    type: "data",
    width: "60",
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
    name: "bpCode",
    fieldName: "bpCode",
    type: "data",
    width: "50",
    header: {
      text: "코드",
    },
    editable: false,
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
    editable: false,
  },
  {
    name: "bpSpec",
    fieldName: "bpSpec",
    type: "data",
    width: "50",
    styleName: "rg-left-column",
    header: {
      text: "규격",
    },
    editable: false,
  },
  {
    name: "bpDanwi",
    fieldName: "bpDanwi",
    type: "data",
    width: "50",
    header: {
      text: "단위",
    },
    editable: false,
  },
];

export const col2 = [
  {
    name: "bpDanga",
    fieldName: "bpDanga",
    type: "data",
    width: "70",
    styleName: "rg-right-column",
    header: {
      text: "매입단가",
    },
  },
];

export const col3 = [
  {
    name: "bpChangedate",
    fieldName: "bpChangedate",
    type: "data",
    width: "80",
    header: {
      text: "단가 변경일",
    },
    editable: false,
  },
];

export const dangaType = {
  name: "bpDangaType",
  fieldName: "bpDangaType",
  type: "data",
  width: "60",
  header: {
    text: "단가구분",
  },
  lookupDisplay: true,
  values: [],
  labels: [],
  editor: { type: "dropdown" },
};

export const vatKind = {
  name: "bpVatKind",
  fieldName: "bpVatKind",
  type: "data",
  width: "80",
  styleName: "rg-right-column",
  header: {
    text: "Vat",
  },
  lookupDisplay: true,
  values: [],
  labels: [],
  editor: { type: "dropdown" },
};
