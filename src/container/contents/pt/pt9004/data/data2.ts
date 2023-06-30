import { ValueType } from "realgrid";

export const fields2 = [
  {
    fieldName: "cuCno",
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
    fieldName: "junjan",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jmonth1",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jmonth2",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jmonth3",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jmonth4",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "jmonth5",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuCmisu",
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
  {
    fieldName: "minDate",
    dataType: ValueType.TEXT,
  },
];

export const columns2 = [
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
    name: "cuCode",
    fieldName: "cuCode",
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
    name: "junjan",
    fieldName: "junjan",
    type: "data",
    width: "50",
    header: {
      text: "전미수",
    },
  },
  {
    name: "jmonth1",
    fieldName: "jmonth1",
    type: "data",
    width: "50",
    header: {
      text: "1월",
    },
  },
  {
    name: "jmonth2",
    fieldName: "jmonth2",
    type: "data",
    width: "50",
    header: {
      text: "2월",
    },
  },
  {
    name: "jmonth3",
    fieldName: "jmonth3",
    type: "data",
    width: "50",
    header: {
      text: "3월",
    },
  },

  {
    name: "jmonth4",
    fieldName: "jmonth4",
    type: "data",
    width: "50",
    header: {
      text: "4월",
    },
  },
  {
    name: "jmonth5",
    fieldName: "jmonth5",
    type: "data",
    width: "50",
    header: {
      text: "5월",
    },
  },
  {
    name: "cuCmisu",
    fieldName: "cuCmisu",
    type: "data",
    width: "70",
    header: {
      text: "미수합계",
    },
  },
  {
    name: "cuSwName",
    fieldName: "cuSwName",
    type: "data",
    width: "50",
    header: {
      text: "사원",
    },
  },
  {
    name: "gsDate",
    fieldName: "gsDate",
    type: "data",
    width: "70",
    header: {
      text: "최종수금",
    },
  },
  {
    name: "minDate",
    fieldName: "minDate",
    type: "data",
    width: "50",
    header: {
      text: "연체",
    },
  },
];
