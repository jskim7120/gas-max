import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "cuCno",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuUsername",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuTel",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gage01",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "dang01",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "sukum01",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "sukum01D",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gage02",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "dang02",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "sukum02",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "sukum02D",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gage03",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "dang03",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "sukum03",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "sukum03D",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cmisu",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: "cuCno",
    fieldName: "cuCno",
    type: "data",
    width: "50",
    header: {
      text: "코드",
    },
    footer: {
      valueCallback: function (grid: any) {
        return grid.getSummary("cuCno", "count");
      },
    },
  },
  {
    name: "cuCode",
    fieldName: "cuCode",
    type: "data",
    width: "100",
    header: {
      text: "거래처명",
    },
  },

  {
    name: "cuName",
    fieldName: "cuName",
    type: "data",
    width: "200",
    header: {
      text: "사용자명",
    },
  },
  {
    name: "cuUsername",
    fieldName: "cuUsername",
    type: "data",
    width: "200",
    header: {
      text: "전화번호",
    },
  },
  {
    name: "cuTel",
    fieldName: "cuTel",
    type: "data",
    width: "150",
    header: {
      text: "",
    },
  },
  {
    name: "gage01",
    fieldName: "gage01",
    type: "data",
    width: "70",
    header: {
      text: "사용량",
    },
  },
  {
    name: "dang01",
    fieldName: "dang01",
    type: "data",
    width: "50",
    header: {
      text: "당월금액",
    },
  },
  {
    name: "sukum01",
    fieldName: "sukum01",
    type: "data",
    width: "50",
    header: {
      text: "수금액",
    },
  },

  {
    name: "sukum01D",
    fieldName: "sukum01D",
    type: "data",
    width: "50",
    header: {
      text: "일",
    },
  },
  {
    name: "gage02",
    fieldName: "gage02",
    type: "data",
    width: "70",
    header: {
      text: "사용량",
    },
  },
  {
    name: "dang02",
    fieldName: "dang02",
    type: "data",
    width: "50",
    header: {
      text: "당월금액",
    },
  },
  {
    name: "sukum02",
    fieldName: "sukum02",
    type: "data",
    width: "50",
    header: {
      text: "수금액",
    },
  },
  {
    name: "sukum02D",
    fieldName: "sukum02D",
    type: "data",
    width: "50",
    header: {
      text: "일",
    },
  },
  {
    name: "gage03",
    fieldName: "gage03",
    type: "data",
    width: "70",
    header: {
      text: "사용량",
    },
  },
  {
    name: "dang03",
    fieldName: "dang03",
    type: "data",
    width: "50",
    header: {
      text: "당월금액",
    },
  },
  {
    name: "sukum03",
    fieldName: "sukum03",
    type: "data",
    width: "50",
    header: {
      text: "수금액",
    },
  },
  {
    name: "sukum03D",
    fieldName: "sukum03D",
    type: "data",
    width: "70",
    header: {
      text: "일",
    },
  },
  {
    name: "cmisu",
    fieldName: "cmisu",
    type: "data",
    width: "70",
    header: {
      text: "현재미수",
    },
  },
];

export const layout = [
  "cuCno",
  "cuCode",
  "cuName",
  "cuUsername",
  "cuTel",
  {
    name: "2023-04월",
    directions: "horizontal",
    hideChildHeaders: false,
    items: ["gage01", "dang01", "sukum01", "sukum01D"],
    header: { text: "" },
  },
  {
    name: "2023-05월",
    directions: "horizontal",
    hideChildHeaders: false,
    items: ["gage02", "dang02", "sukum02", "sukum02D"],
    header: { text: "" },
  },
  {
    name: " 2023-06월",
    directions: "horizontal",
    hideChildHeaders: false,
    items: ["gage03", "dang03", "sukum03", "sukum03D"],
    header: { text: "" },
  },
  "cmisu",
];
