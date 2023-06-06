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
    fieldName: "tsCuCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuUsername",
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
    name: "tsCuCode",
    fieldName: "tsCuCode",
    type: "data",
    width: "100",
    header: {
      text: "코드",
    },
  },
  {
    name: "cuUsername",
    fieldName: "cuUsername",
    type: "data",
    width: "100",
    header: {
      text: "거래처명",
    },
  },
  {
    name: "tsGubun",
    fieldName: "tsGubun",
    type: "data",
    width: "100",
    header: {
      text: "입출구분",
    },
  },
  {
    name: "tsJpName",
    fieldName: "tsJpName",
    type: "data",
    width: "100",
    header: {
      text: "품명",
    },
  },
  {
    name: "tsInqty",
    fieldName: "tsInqty",
    type: "data",
    width: "100",
    header: {
      text: "입고",
    },
  },
  {
    name: "tsOutqty",
    fieldName: "tsOutqty",
    type: "data",
    width: "100",
    header: {
      text: "출고",
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
    name: "tsMisu",
    fieldName: "tsMisu",
    type: "data",
    width: "100",
    header: {
      text: "미수액 ",
    },
  },
  {
    name: "tsGukum",
    fieldName: "tsGukum",
    type: "data",
    width: "100",
    header: {
      text: "구입액",
    },
  },
  {
    name: "tsBoutkum",
    fieldName: "tsBoutkum",
    type: "data",
    width: "100",
    header: {
      text: "환불액",
    },
  },
  {
    name: "tsSwName",
    fieldName: "tsSwName",
    type: "data",
    width: "100",
    header: {
      text: "사원",
    },
  },
  {
    name: "tsBigo",
    fieldName: "tsBigo",
    type: "data",
    width: "100",
    header: {
      text: "비고",
    },
  },
];

export const layout = [
  "areaCode",
  "tsDate",
  "tsCuCode",
  "cuUsername",
  "tsGubun",
  "tsJpName",

  {
    name: "수량",
    directions: "horizontal",
    hideChildHeaders: false,
    items: ["tsInqty", "tsOutqty"],
  },
  "tsKumack",
  "tsBkum",
  "tsInkum",
  "tsDc",
  "tsMisu",
  {
    name: "출금액",
    directions: "horizontal",
    hideChildHeaders: false,
    items: ["tsGukum", "tsBoutkum"],
  },
  "tsSwName",
  "tsBigo",
];
