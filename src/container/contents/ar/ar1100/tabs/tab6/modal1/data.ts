import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "id",
    dataType: ValueType.NUMBER,
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
    name: "id",
    fieldName: "id",
    width: "80",
  },
  {
    name: "name",
    fieldName: "name",
    width: "120",
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
