import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bbDate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bbBuName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bbBpCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bbBpName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bbQty",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bbDanga",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bbKumack",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bbBIgo",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: "areaCode",
    fieldName: "areaCode",
    type: "data",
    width: "20",
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
    name: "bbDate",
    fieldName: "bbDate",
    type: "data",
    width: "30",
    header: {
      text: "일자",
    },
  },
  {
    name: "bbBuName",
    fieldName: "bbBuName",
    type: "data",
    width: "60",
    header: {
      text: "매입처명",
    },
  },
  {
    name: "bbBpCode",
    fieldName: "bbBpCode",
    type: "data",
    width: "20",
    header: {
      text: "코드",
    },
  },
  {
    name: "bbBpName",
    fieldName: "bbBpName",
    type: "data",
    width: "60",
    header: {
      text: "품명",
    },
  },
  {
    name: "bbQty",
    fieldName: "bbQty",
    type: "data",
    width: "30",
    header: {
      text: "수량",
    },
  },
  {
    name: "bbDanga",
    fieldName: "bbDanga",
    type: "data",
    width: "30",
    header: {
      text: "단가",
    },
  },
  {
    name: "bbKumack",
    fieldName: "bbKumack",
    type: "data",
    width: "30",
    header: {
      text: "금액",
    },
  },
  {
    name: "bbBigo",
    fieldName: "bbBigo",
    type: "data",
    width: "60",
    header: {
      text: "비고",
    },
  },
];
