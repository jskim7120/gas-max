import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "salestateName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "pjDate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "pjType",
    dataType: ValueType.TEXT,
  },
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
    fieldName: "jpName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "qty",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "reqty",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "vatDiv",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "kumack",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "dc",
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
    fieldName: "swName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bigo",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "inkumtypeName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "proxytypeName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "inserttypeName",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: "salestateName",
    fieldName: "salestateName",
    type: "data",
    width: "80",
    header: {
      text: "상태",
    },
    footer: {
      valueCallback: function (grid: any) {
        return grid.getSummary("salestateName", "count");
      },
    },
  },
  {
    name: "pjDate",
    fieldName: "pjDate",
    type: "data",
    width: "90",
    header: {
      text: "일자",
    },
  },
  {
    name: "pjType",
    fieldName: "pjType",
    type: "data",
    width: "80",
    header: {
      text: "구분",
    },
  },
  {
    name: "areaCode",
    fieldName: "areaCode",
    type: "data",
    width: "80",
    header: {
      text: "영업소",
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
    width: "200",
    styleName: "rg-left-column",
    header: {
      text: "거래처명",
    },
  },
  {
    name: "jpName",
    fieldName: "jpName",
    type: "data",
    width: "150",
    styleName: "rg-left-column",
    header: {
      text: "품명",
    },
  },
  {
    name: "qty",
    fieldName: "qty",
    type: "data",
    width: "100",
    header: {
      text: "납품",
    },
  },
  {
    name: "reqty",
    fieldName: "reqty",
    type: "data",
    width: "80",
    header: {
      text: "회수",
    },
  },
  {
    name: "vatDiv",
    fieldName: "vatDiv",
    type: "data",
    width: "80",
    styleName: "rg-right-column",
    header: {
      text: "VAT",
    },
  },
  {
    name: "kumack",
    fieldName: "kumack",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "금액",
    },
  },
  {
    name: "dc",
    fieldName: "dc",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "D/C",
    },
  },
  {
    name: "inkum",
    fieldName: "inkum",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "입금액",
    },
  },
  {
    name: "misukum",
    fieldName: "misukum",
    type: "data",
    width: "100",
    styleName: "rg-right-column",
    header: {
      text: "미입금액",
    },
  },
  {
    name: "swName",
    fieldName: "swName",
    type: "data",
    width: "100",
    styleName: "rg-left-column",
    header: {
      text: "사원",
    },
  },
  {
    name: "bigo",
    fieldName: "bigo",
    type: "data",
    width: "100",
    styleName: "rg-left-column",
    header: {
      text: "비고",
    },
  },
  {
    name: "inkumtypeName",
    fieldName: "inkumtypeName",
    type: "data",
    width: "100",
    header: {
      text: "입금",
    },
  },
  {
    name: "proxytypeName",
    fieldName: "proxytypeName",
    type: "data",
    width: "100",
    header: {
      text: "대납",
    },
  },
  {
    name: "inserttypeName",
    fieldName: "inserttypeName",
    type: "data",
    width: "100",
    header: {
      text: "등록",
    },
  },
];
