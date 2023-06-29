import { ValueType } from "realgrid";

export const fields = [
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
    fieldName: "cuHp",
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
    fieldName: "gjGum",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjGage",
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
  {
    fieldName: "gsDate",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: "gjCuCode",
    fieldName: "gjCuCode",
    type: "data",
    width: "90",
    header: {
      text: "코드",
    },
    footer: {
      valueCallback: function (grid: any) {
        return grid.getSummary("gjCuCode", "count");
      },
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
    width: "90",
    header: {
      text: "전화번호",
    },
  },
  {
    name: "cuHp",
    fieldName: "cuHp",
    type: "data",
    width: "90",
    header: {
      text: "핸드폰",
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
      text: "당검침",
    },
  },
  {
    name: "gjGum",
    fieldName: "gjGum",
    type: "data",
    width: "50",
    header: {
      text: "사용량",
    },
  },
  {
    name: "gjGage",
    fieldName: "gjGage",
    type: "data",
    width: "70",
    header: {
      text: "당월금액",
    },
  },
  {
    name: "gjTotal",
    fieldName: "gjTotal",
    type: "data",
    width: "70",
    header: {
      text: "당월미수",
    },
  },
  {
    name: "gjMisujan",
    fieldName: "gjMisujan",
    type: "data",
    width: "70",
    header: {
      text: "누계",
    },
  },
  {
    name: "lastMisu",
    fieldName: "lastMisu",
    type: "data",
    width: "70",
    header: {
      text: "검침사원",
    },
  },
  {
    name: "cuSwName",
    fieldName: "cuSwName",
    type: "data",
    width: "90",
    header: {
      text: "최종수금일",
    },
  },
  {
    name: "gsDate",
    fieldName: "gsDate",
    type: "data",
    width: "90",
    header: {
      text: "gsDate",
    },
  },
];
