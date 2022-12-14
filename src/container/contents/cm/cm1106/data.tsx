import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "jcJpCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jcJpName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jcJpSpec",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jcDangaTypeName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jcJpDanga",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jcVatKindName",
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
    fieldName: "custOut",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "custIn",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jcJpSateName",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: "jcJpCode",
    fieldName: "jcJpCode",
    type: "data",
    width: "80",
    header: {
      text: "코드",
    },
  },
  {
    name: "jcJpName",
    fieldName: "jcJpName",
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
    name: "jcDangaTypeName",
    fieldName: "jcDangaTypeName",
    type: "data",
    width: "80",
    header: {
      text: "적용구분",
    },
  },
  {
    name: "jcJpDanga",
    fieldName: "jcJpDanga",
    type: "data",
    width: "80",
    header: {
      text: "적용단가",
    },
    styleName: "rg-right-column",
  },
  {
    name: "jcVatKindName",
    fieldName: "jcVatKindName",
    type: "data",
    width: "80",
    header: {
      text: "VAT",
    },
  },
  {
    name: "jcJdcAmt",
    fieldName: "jcJdcAmt",
    type: "data",
    width: "80",
    header: {
      text: "할인액",
    },
    styleName: "rg-right-column",
  },
  {
    name: "jcJdcPer",
    fieldName: "jcJdcPer",
    type: "data",
    width: "80",
    header: {
      text: "할인율",
    },
    styleName: "rg-right-column",
  },

  {
    name: "custOut",
    fieldName: "custOut",
    type: "data",
    width: "50",
    header: {
      text: "대여",
    },
  },
  {
    name: "custIn",
    fieldName: "custIn",
    type: "data",
    width: "50",
    header: {
      text: "보관",
    },
  },
  {
    name: "jcJpSateName",
    fieldName: "jcJpSateName",
    type: "data",
    width: "80",
    header: {
      text: "상태",
    },
  },
];
