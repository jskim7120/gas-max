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
    fieldName: "jcDangaName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jcVatName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jcJpDanga",
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
    fieldName: "jcJpDandate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jcLastdate5",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jcCycle",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jpStateName",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: "jcJpCode",
    fieldName: "jcJpCode",
    type: "data",
    width: "80",
    styles: {
      textAlignment: "center",
    },
    header: {
      text: "영업소",
    },
  },
  {
    name: "jcJpName",
    fieldName: "jcJpName",
    type: "data",
    width: "120",
    styles: {
      textAlignment: "near",
    },
    header: {
      text: "구분",
    },
  },
  {
    name: "jcDangaName",
    fieldName: "jcDangaName",
    type: "data",
    width: "120",
    styles: {
      textAlignment: "near",
    },
    header: {
      text: "코드",
    },
  },
  {
    name: "jcVatName",
    fieldName: "jcVatName",
    type: "data",
    width: "200",
    styles: {
      textAlignment: "near",
    },
    header: {
      text: "거래처명",
    },
  },
  {
    name: "jcJpDanga",
    fieldName: "jcJpDanga",
    type: "data",
    width: "250",
    styles: {
      textAlignment: "near",
    },
    header: {
      text: "주소",
    },
  },
  {
    name: "custOut",
    fieldName: "custOut",
    type: "data",
    width: "120",
    styles: {
      textAlignment: "near",
    },
    header: {
      text: "전화",
    },
  },
  {
    name: "custIn",
    fieldName: "custIn",
    type: "data",
    width: "120",
    styles: {
      textAlignment: "near",
    },
    header: {
      text: "용기보증금",
    },
  },
  {
    name: "jcJpDandate",
    fieldName: "jcJpDandate",
    type: "data",
    width: "120",
    styles: {
      textAlignment: "near",
    },
    header: {
      text: "중량미수",
    },
  },
  {
    name: "jcLastdate5",
    fieldName: "jcLastdate5",
    type: "data",
    width: "120",
    styles: {
      textAlignment: "near",
    },
    header: {
      text: "체적미수",
    },
  },
  {
    name: "jcCycle",
    fieldName: "jcCycle",
    type: "data",
    width: "120",
    styles: {
      textAlignment: "near",
    },
    header: {
      text: "공급계약일",
    },
  },
  {
    name: "jpStateName",
    fieldName: "jpStateName",
    type: "data",
    width: "120",
    styles: {
      textAlignment: "near",
    },
    header: {
      text: "최종점검일",
    },
  },
];
