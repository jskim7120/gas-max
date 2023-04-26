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
    width: "30",
    header: {
      text: "코드",
    },
  },
  {
    name: "jcJpName",
    fieldName: "jcJpName",
    type: "data",
    width: "100",
    styleName: "rg-left-column",
    header: {
      text: "품명",
    },
  },
  {
    name: "jcDangaName",
    fieldName: "jcDangaName",
    type: "data",
    width: "40",
    styleName: "rg-left-column",
    header: {
      text: "적용 구분",
    },
  },

  {
    name: "jcJpDanga",
    fieldName: "jcJpDanga",
    type: "data",
    width: "40",
    styleName: "rg-right-column",
    header: {
      text: "단가",
    },
  },
  {
    name: "jcVatName",
    fieldName: "jcVatName",
    type: "data",
    width: "40",
    styleName: "rg-right-column",
    header: {
      text: "Vat",
    },
  },
  {
    name: "custOut",
    fieldName: "custOut",
    type: "data",
    width: "30",
    styleName: "rg-right-column",
    header: {
      text: "대여",
    },
  },
  {
    name: "custIn",
    fieldName: "custIn",
    type: "data",
    width: "30",
    styleName: "rg-right-column",
    header: {
      text: "보관",
    },
  },
  {
    name: "jcJpDandate",
    fieldName: "jcJpDandate",
    type: "data",
    width: "40",
    header: {
      text: "단가 적용일",
    },
  },
  {
    name: "jcLastdate5",
    fieldName: "jcLastdate5",
    type: "data",
    width: "40",
    header: {
      text: "최종 공급일",
    },
  },
  {
    name: "jcCycle",
    fieldName: "jcCycle",
    type: "data",
    width: "30",
    header: {
      text: "공급 주기",
    },
  },
  {
    name: "jpStateName",
    fieldName: "jpStateName",
    type: "data",
    width: "30",
    header: {
      text: "상태",
    },
  },
];
