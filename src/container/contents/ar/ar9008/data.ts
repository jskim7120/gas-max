import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "areaCode",
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
    fieldName: "cuTel",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "sumKg",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "junMisu",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "kumack",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "DC",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "inkum",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "misukum",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "suKum",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "suDC",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "dangMisu",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "chkYn",
    dataType: ValueType.TEXT,
  },
];
export const columns = [
  {
    name: "areaCode",
    fieldName: "areaCode",
    type: "data",
    width: "100",
    header: {
      text: "영업소",
    },
    footer: {
      valueCallback: function (grid: any) {
        return grid.getSummary("jcBok", "count");
      },
    },
  },

  {
    name: "cuCode",
    fieldName: "cuCode",
    type: "data",
    width: "100",
    header: {
      text: "코드",
    },
  },
  {
    name: "cuName",
    fieldName: "cuName",
    type: "data",
    width: "100",
    header: {
      text: "거래처명",
    },
  },
  {
    name: "cuTel",
    fieldName: "cuTel",
    type: "data",
    width: "100",
    header: {
      text: "전화",
    },
  },
  {
    name: "sumKg",
    fieldName: "sumKg",
    type: "data",
    width: "100",
    header: {
      text: "공급량",
    },
  },
  {
    name: "junMisu",
    fieldName: "junMisu",
    type: "data",
    width: "100",
    header: {
      text: "전월미수",
    },
  },
  {
    name: "kumack",
    fieldName: "kumack",
    type: "data",
    width: "100",
    header: {
      text: "매출액",
    },
  },
  {
    name: "DC",
    fieldName: "DC",
    type: "data",
    width: "100",
    header: {
      text: "D/C",
    },
  },
  {
    name: "inkum",
    fieldName: "inkum",
    type: "data",
    width: "100",
    header: {
      text: "입금액",
    },
  },
  {
    name: "misukum",
    fieldName: "misukum",
    type: "data",
    width: "100",
    header: {
      text: "미수금액",
    },
  },
  {
    name: "suKum",
    fieldName: "suKum",
    type: "data",
    width: "100",
    header: {
      text: "수금액",
    },
  },
  {
    name: "suDC",
    fieldName: "suDC",
    type: "data",
    width: "100",
    header: {
      text: "D/C",
    },
  },
  {
    name: "dangMisu",
    fieldName: "dangMisu",
    type: "data",
    width: "100",
    header: {
      text: "당월미수",
    },
  },
  {
    name: "chkYn",
    fieldName: "chkYn",
    type: "data",
    width: "100",
    header: {
      text: "선택 ",
    },
  },
];
