import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "tsDate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "tsCucode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "tsGubun",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "tsJpName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "tsInqty",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "tsOutqty",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "tsKumack",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "tsBkum",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "tsInkum",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "tsDc",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "tsMisu",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "tsGukum",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "tsBoutkum",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "tsSwName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "tsBigo",
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
    name: "tsDate",
    fieldName: "tsDate",
    type: "data",
    width: "100",
    header: {
      text: "일자",
    },
  },
  {
    name: "tsCucode",
    fieldName: "tsCucode",
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
      text: "코드",
    },
  },
  {
    name: "tsGubun",
    fieldName: "tsGubun",
    type: "data",
    width: "100",
    header: {
      text: "거래처명",
    },
  },
  {
    name: "tsJpName",
    fieldName: "tsJpName",
    type: "data",
    width: "100",
    header: {
      text: "입출구분",
    },
  },
  {
    name: "tsInqty",
    fieldName: "tsInqty",
    type: "data",
    width: "100",
    header: {
      text: "품명",
    },
  },
  {
    name: "tsOutqty",
    fieldName: "tsOutqty",
    type: "data",
    width: "100",
    header: {
      text: "수량",
    },
  },
  {
    name: "tsKumack",
    fieldName: "tsKumack",
    type: "data",
    width: "100",
    header: {
      text: "판매액",
    },
  },
  {
    name: "tsBkum",
    fieldName: "tsBkum",
    type: "data",
    width: "100",
    header: {
      text: "보증금",
    },
  },
  {
    name: "tsInkum",
    fieldName: "tsInkum",
    type: "data",
    width: "100",
    header: {
      text: "입금액",
    },
  },
  {
    name: "tsDc",
    fieldName: "tsDc",
    type: "data",
    width: "100",
    header: {
      text: " D/C",
    },
  },
  {
    name: "tsDc",
    fieldName: "tsDc",
    type: "data",
    width: "100",
    header: {
      text: "미수액",
    },
  },
  {
    name: "tsMisu",
    fieldName: "tsMisu",
    type: "data",
    width: "100",
    header: {
      text: "출금액 ",
    },
  },
  {
    name: "tsGukum",
    fieldName: "tsGukum",
    type: "data",
    width: "100",
    header: {
      text: "사원",
    },
  },
  {
    name: "tsBoutkum",
    fieldName: "tsBoutkum",
    type: "data",
    width: "100",
    header: {
      text: "비고 ",
    },
  },
];
