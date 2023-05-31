import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "pcCuCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "pcCuName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "pcJpName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "pcQty",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "pcDanga",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "pcKumack",
    dataType: ValueType.TEXT,
  },

  {
    fieldName: "pcDate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "pcSwName",
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
  },
  {
    name: "pcCuCode",
    fieldName: "pcCuCode",
    type: "data",
    width: "100",
    header: {
      text: "거래처코드",
    },
  },
  {
    name: "pcCuName",
    fieldName: "pcCuName",
    type: "data",
    width: "100",
    header: {
      text: "거래처명",
    },
  },
  {
    name: "pcJpName",
    fieldName: "pcJpName",
    type: "data",
    width: "100",
    header: {
      text: "품명",
    },
  },

  {
    name: "pcQty",
    fieldName: "pcQty",
    type: "data",
    width: "100",
    header: {
      text: "수량",
    },
  },
  {
    name: "pcDanga",
    fieldName: "pcDanga",
    type: "data",
    width: "100",
    header: {
      text: "단가",
    },
  },
  {
    name: "pcKumack",
    fieldName: "pcKumack",
    type: "data",
    width: "100",
    header: {
      text: "공급액",
    },
  },
  {
    name: "pcDate",
    fieldName: "pcDate",
    type: "data",
    width: "100",
    header: {
      text: "최종공급일",
    },
  },
  {
    name: "pcSwName",
    fieldName: "pcSwName",
    type: "data",
    width: "100",
    header: {
      text: "담당사원",
    },
  },
];
