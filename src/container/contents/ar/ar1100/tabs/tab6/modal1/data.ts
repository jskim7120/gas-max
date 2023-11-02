import { ValueType } from "realgrid";

// const d = {
//   mjBigo: "2  건",
//   mjDate: "202104",
//   mjGubun: null,
//   mjId: "1",
//   mjMisujan: 1066000,
//   mjPapNo: null,
//   mjSno: null,
//   mjSwName: null,
// };
export const fields = [
  {
    fieldName: "mjId",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "mjDate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "mjBigo",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "mjMisujan",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "mjSwName",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: "mjId",
    fieldName: "mjId",
    width: "120",
    editable: false,
  },

  {
    name: "mjDate",
    fieldName: "mjDate",
    type: "data",
    width: "80",
    header: {
      text: "매입퓸목",
    },
    editable: false,
  },
  {
    name: "mjBigo",
    fieldName: "mjBigo",
    width: "250",
  },
  {
    name: "mjMisujan",
    fieldName: "mjMisujan",
    width: "100",
  },
  {
    name: "mjSwName",
    fieldName: "mjSwName",
    width: "100",
  },
];
