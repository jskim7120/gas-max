import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "accName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "toCha",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "toDae",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "befCha",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "befDae",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: "accName",
    fieldName: "accName",
    type: "data",
    width: "250",
    styleName: "rg-left-column",
    header: {
      text: " 계정과목",
    },
  },
  {
    name: "toCha",
    fieldName: "toCha",
    type: "data",
    width: "120",
    styleName: "rg-right-column",
    header: {
      text: "금액",
    },
  },
  {
    name: "toDae",
    fieldName: "toDae",
    type: "data",
    width: "120",
    styleName: "rg-right-column",
    header: {
      text: "",
    },
  },
  {
    name: "befCha",
    fieldName: "befCha",
    type: "data",
    width: "120",
    styleName: "rg-right-column",
    header: {
      text: "금액",
    },
  },
  {
    name: "befDae",
    fieldName: "befDae",
    type: "data",
    width: "120",
    styleName: "rg-right-column",
    header: {
      text: "",
    },
  },
];

export const layout = [
  "accName",
  {
    name: "someGroup",
    direction: "vertical",
    width: 250,
    items: [
      {
        name: "someGroup",
        direction: "horizontal",
        hideChildHeaders: true,
        items: ["toCha", "toDae"],
        header: {
          text: "금액",
        },
      },
    ],
    header: {
      text: "당월(2023-01)",
    },
  },
  {
    name: "someGroup",
    direction: "vertical",
    width: 250,
    items: [
      {
        name: "someGroup",
        direction: "horizontal",
        hideChildHeaders: true,
        items: ["befCha", "befDae"],
        header: {
          text: "금액",
        },
      },
    ],
    header: {
      text: "전월(2022-12)",
    },
  },
];
