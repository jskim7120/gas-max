import { ValueType } from "realgrid";

export const fields1 = [
  {
    fieldName: "jcJpCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jcJpName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jcBoyou",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jcTdaekumy",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jcTdaekumn",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jcTm",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jcBok",
    dataType: ValueType.TEXT,
  },

  {
    fieldName: "jcFirstdate",
    dataType: ValueType.TEXT,
  },

  {
    fieldName: "jcLastdate5",
    dataType: ValueType.TEXT,
  },
];

export const columns1 = [
  {
    name: "jcJpCode",
    fieldName: "jcJpCode",
    type: "data",
    width: "80",
    header: {
      text: "코드",
    },
    footer: {
      valueCallback: function (grid: any) {
        return grid.getSummary("jcBok", "count");
      },
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
    name: "jcBoyou",
    fieldName: "jcBoyou",
    type: "data",
    width: "80",
    header: {
      text: "보유",
    },
  },
  {
    name: "jcTdaekumy",
    fieldName: "jcTdaekumy",
    type: "data",
    width: "80",
    header: {
      text: "유상대여",
    },
  },
  {
    name: "jcTdaekumn",
    fieldName: "jcTdaekumn",
    type: "data",
    width: "80",
    header: {
      text: "무상대여",
    },
  },
  {
    name: "jcTm",
    fieldName: "jcTm",
    type: "data",
    width: "80",
    header: {
      text: "미회수용기",
    },
  },
  {
    name: "jcBok",
    fieldName: "jcBok",
    type: "data",
    width: "80",
    header: {
      text: "보관용기",
    },
  },
  {
    name: "jcFirstdate",
    fieldName: "jcFirstdate",
    type: "data",
    width: "80",
    header: {
      text: "최초공급일",
    },
  },
  {
    name: "jcLastdate5",
    fieldName: "jcLastdate5",
    type: "data",
    width: "80",
    header: {
      text: "최종공급일",
    },
  },
];
