import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "checkYn",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "name",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "icon",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "treeId",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: "name",
    fieldName: "name",
    width: "120",
    editable: false,
  },

  {
    name: "checkYn",
    fieldName: "checkYn",
    type: "data",
    width: "80",
    header: {
      text: "매입퓸목",
    },
    editable: false,

    renderer: {
      type: "check",
      trueValues: "Y",
      falseValues: "N",
    },
  },
  {
    name: "icon",
    fieldName: "icon",
    width: "250",
  },
  {
    name: "treeId",
    fieldName: "treeId",
    width: "80",
  },
];
