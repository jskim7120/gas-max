import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "pjDate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "pjCucode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "pjCuName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "pjJpName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "pjQty",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "pjDanga",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "pjKumack",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "pjInkum",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "pjDc",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "pjMisukum",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "pjSwName",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: "areaCode",
    fieldName: "areaCode",
    type: "data",
    width: "60",
    header: {
      text: "영업소",
    },
    footer: {
      valueCallback: function (grid: any) {
        return grid.getSummary("areaCode", "count");
      },
    },
  },
  {
    name: "pjDate",
    fieldName: "pjDate",
    type: "data",
    width: "100",
    header: {
      text: "일자",
    },
  },
  {
    name: "pjCucode",
    fieldName: "pjCucode",
    type: "data",
    width: "100",
    header: {
      text: "거래처코드",
    },
  },
  {
    name: "pjCuName",
    fieldName: "pjCuName",
    type: "data",
    width: "100",
    header: {
      text: "거래처명",
    },
  },
  {
    name: "pjJpName",
    fieldName: "pjJpName",
    type: "data",
    width: "100",
    header: {
      text: "품명",
    },
  },
  {
    name: "pjQty",
    fieldName: "pjQty",
    type: "data",
    width: "100",
    header: {
      text: "수량",
    },
  },
  {
    name: "pjDanga",
    fieldName: "pjDanga",
    type: "data",
    width: "100",
    header: {
      text: "단가",
    },
  },
  {
    name: "pjKumack",
    fieldName: "pjKumack",
    type: "data",
    width: "100",
    header: {
      text: "금액",
    },
  },
  {
    name: "pjInkum",
    fieldName: "pjInkum",
    type: "data",
    width: "100",
    header: {
      text: "입금액",
    },
  },
  {
    name: "pjDc",
    fieldName: "pjDc",
    type: "data",
    width: "100",
    header: {
      text: "D/C",
    },
  },
  {
    name: "pjMisukum",
    fieldName: "pjMisukum",
    type: "data",
    width: "100",
    header: {
      text: "미수금액",
    },
  },
  {
    name: "pjSwName",
    fieldName: "pjSwName",
    type: "data",
    width: "100",
    header: {
      text: "사원",
    },
  },
];
