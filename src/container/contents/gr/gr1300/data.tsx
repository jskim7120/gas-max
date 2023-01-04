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
    fieldName: "bbTypeName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bbBuName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bbBpName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bbSum",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bbVat",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bbTotal",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bbSupplyTypeName",
    dataType: ValueType.TEXT,
  },
  // {
  //   fieldName: "bbOutkum",
  //   dataType: ValueType.TEXT,
  // },
  // {
  //   fieldName: "bbDc",
  //   dataType: ValueType.TEXT,
  // },
  // {
  //   fieldName: "bbCredit",
  //   dataType: ValueType.TEXT,
  // },
  // {
  //   fieldName: "bbType",
  //   dataType: ValueType.TEXT,
  // },
  // {
  //   fieldName: "bbSupplyType",
  //   dataType: ValueType.TEXT,
  // },
  // {
  //   fieldName: "bbBuCode",
  //   dataType: ValueType.TEXT,
  // },
  // {
  //   fieldName: "bbSno",
  //   dataType: ValueType.TEXT,
  // },
];

export const columns = [
  {
    name: "areaCode",
    fieldName: "areaCode",
    width: "70",
    type: "data",
    header: {
      text: "영업소",
    },
  },
  {
    name: "bbDate",
    fieldName: "bbDate",
    width: "70",
    type: "data",
    header: {
      text: "매입일자",
    },
  },
  {
    name: "bbTypeName",
    fieldName: "bbTypeName",
    width: "50",
    type: "data",
    header: {
      text: "구분",
    },
  },
  {
    name: "bbBuName",
    fieldName: "bbBuName",
    width: "80",
    type: "data",
    styleName: "rg-left-column",
    header: {
      text: "매입처명",
    },
  },
  {
    name: "bbBpName",
    fieldName: "bbBpName",
    width: "80",
    type: "data",
    styleName: "rg-left-column",
    header: {
      text: "품명",
    },
  },
  {
    name: "bbSum",
    fieldName: "bbSum",
    width: "80",
    type: "data",
    styleName: "rg-right-column",
    header: {
      text: "공급액",
    },
  },
  {
    name: "bbVat",
    fieldName: "bbVat",
    width: "80",
    type: "data",
    styleName: "rg-right-column",
    header: {
      text: "세액",
    },
  },
  {
    name: "bbTotal",
    fieldName: "bbTotal",
    width: "50",
    type: "data",
    styleName: "rg-right-column",
    header: {
      text: "합계",
    },
  },
  {
    name: "bbSupplyTypeName",
    fieldName: "bbSupplyTypeName",
    width: "80",
    type: "data",
    header: {
      text: "지급",
    },
  },
  // {
  //   name: "bbOutkum",
  //   fieldName: "bbOutkum",
  //   width: "50",
  //   type: "data",
  //   header: {
  //     text: "수송방법",
  //   },
  // },
  // {
  //   name: "bbDc",
  //   fieldName: "bbDc",
  //   width: "50",
  //   type: "data",
  //   header: {
  //     text: "충전회차",
  //   },
  // },
  // {
  //   name: "bbCredit",
  //   fieldName: "bbCredit",
  //   width: "50",
  //   type: "data",
  //   header: {
  //     text: "충전회차",
  //   },
  // },
  // {
  //   name: "bbType",
  //   fieldName: "bbType",
  //   width: "50",
  //   type: "data",
  //   header: {
  //     text: "충전회차",
  //   },
  // },
  // {
  //   name: "bbSupplyType",
  //   fieldName: "bbSupplyType",
  //   width: "50",
  //   type: "data",
  //   header: {
  //     text: "충전회차",
  //   },
  // },
  // {
  //   name: "bbBuCode",
  //   fieldName: "bbBuCode",
  //   width: "50",
  //   type: "data",
  //   header: {
  //     text: "충전회차",
  //   },
  // },
  // {
  //   name: "bbSno",
  //   fieldName: "bbSno",
  //   width: "50",
  //   type: "data",
  //   header: {
  //     text: "충전회차",
  //   },
  // },
];
