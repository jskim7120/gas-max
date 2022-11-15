import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "jcCuCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jcCuName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jcJpSpec",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jcDangaType",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jcVatKind",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jcJdcAmt",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jcJdcPer",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jcJpDanga",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jcBasicJaego",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jcJpState",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: "jcCuCode",
    fieldName: "jcCuCode",
    type: "data",
    width: "80",
    header: {
      text: "코드",
    },
  },
  {
    name: "jcCuName",
    fieldName: "jcCuName",
    type: "data",
    width: "80",
    header: {
      text: "품명",
    },
  },
  {
    name: "jcJpSpec",
    fieldName: "jcJpSpec",
    type: "data",
    width: "80",
    header: {
      text: "규격",
    },
  },
  {
    name: "jcDangaType",
    fieldName: "jcDangaType",
    type: "data",
    width: "80",
    header: {
      text: "구분",
    },
  },
  {
    name: "jcVatKind",
    fieldName: "jcVatKind",
    type: "data",
    width: "80",
    header: {
      text: "Vat",
    },
  },
  {
    name: "jcJdcAmt",
    fieldName: "jcJdcAmt",
    type: "data",
    width: "80",
    header: {
      text: "할앤액",
    },
  },
  {
    name: "jcJdcPer",
    fieldName: "jcJdcPer",
    type: "data",
    width: "80",
    header: {
      text: "할인율",
    },
  },
  {
    name: "jcJpDanga",
    fieldName: "jcJpDanga",
    type: "data",
    width: "80",
    header: {
      text: "대여",
    },
  },
  {
    name: "jcBasicJaego",
    fieldName: "jcBasicJaego",
    type: "data",
    width: "80",
    header: {
      text: "보관",
    },
  },
  {
    name: "jcJpState",
    fieldName: "jcJpState",
    type: "data",
    width: "80",
    header: {
      text: "상태",
    },
  },
];
