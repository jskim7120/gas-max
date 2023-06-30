import { ValueType } from "realgrid";

export const fields0 = [
  {
    fieldName: "cuCno",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjCuCode",
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
    fieldName: "gjDate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjGumymsno",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjJungum",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjGum",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjGage",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjDanga",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjDangkum",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjPerkum",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjTotal",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjMisujan",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "lastMisu",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuSwName",
    dataType: ValueType.TEXT,
  },
];

export const columns0 = [
  {
    name: "cuCno",
    fieldName: "cuCno",
    type: "data",
    width: "50",
    header: {
      text: "순번",
    },
    footer: {
      valueCallback: function (grid: any) {
        return grid.getSummary("cuCno", "count");
      },
    },
  },
  {
    name: "gjCuCode",
    fieldName: "gjCuCode",
    type: "data",
    width: "70",
    header: {
      text: "코드",
    },
  },

  {
    name: "cuName",
    fieldName: "cuName",
    type: "data",
    width: "200",
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
      text: "전화번호",
    },
  },
  {
    name: "gjDate",
    fieldName: "gjDate",
    type: "data",
    width: "70",
    header: {
      text: "검침일자",
    },
  },
  {
    name: "gjGumymsno",
    fieldName: "gjGumymsno",
    type: "data",
    width: "50",
    header: {
      text: "전검",
    },
  },
  {
    name: "gjJungum",
    fieldName: "gjJungum",
    type: "data",
    width: "50",
    header: {
      text: "당검침",
    },
  },
  {
    name: "gjGum",
    fieldName: "gjGum",
    type: "data",
    width: "50",
    header: {
      text: "사용",
    },
  },

  {
    name: "gjGage",
    fieldName: "gjGage",
    type: "data",
    width: "50",
    header: {
      text: "단가",
    },
  },
  {
    name: "gjDanga",
    fieldName: "gjDanga",
    type: "data",
    width: "90",
    header: {
      text: "당월금액",
    },
  },
  {
    name: "gjDangkum",
    fieldName: "gjDangkum",
    type: "data",
    width: "50",
    header: {
      text: "연체료",
    },
  },
  {
    name: "gjPerkum",
    fieldName: "gjPerkum",
    type: "data",
    width: "70",
    header: {
      text: "당월미수",
    },
  },
  {
    name: "gjTotal",
    fieldName: "gjTotal",
    type: "data",
    width: "70",
    header: {
      text: "미수누계",
    },
  },
  {
    name: "gjMisujan",
    fieldName: "gjMisujan",
    type: "data",
    width: "50",
    header: {
      text: "사원",
    },
  },
  {
    name: "lastMisu",
    fieldName: "lastMisu",
    type: "data",
    width: "70",
    header: {
      text: "",
    },
  },
  {
    name: "cuSwName",
    fieldName: "cuSwName",
    type: "data",
    width: "50",
    header: {
      text: "",
    },
  },
];
