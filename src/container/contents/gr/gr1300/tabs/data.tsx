import { ValueType } from "realgrid";
export const fields = [
  {
    fieldName: "bblBpCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bblBpName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bblType",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bblQty",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bblDanga",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bblVatType",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bblKumack",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: "bblBpCode",
    fieldName: "bblBpCode",
    width: "60",
    type: "data",
    header: {
      text: "코드",
    },
    editable: false,
  },
  {
    name: "bblBpName",
    fieldName: "bblBpName",
    button: "action",
    width: "150",
    type: "data",
    styleName: "rg-left-column",
    header: {
      text: "품명",
    },
    editable: false,
  },
  {
    name: "bblType",
    fieldName: "bblType",
    width: "60",
    type: "data",
    styleName: "rg-left-column",
    header: {
      text: "규격",
    },
  },
  {
    name: "bblQty",
    fieldName: "bblQty",
    width: "60",
    type: "data",
    styleName: "rg-right-column",
    header: {
      text: "수량",
    },
  },
  {
    name: "bblDanga",
    fieldName: "bblDanga",
    width: "60",
    type: "data",
    styleName: "rg-right-column",
    header: {
      text: "단가",
    },
  },
  {
    name: "bblVatType",
    fieldName: "bblVatType",
    width: "60",
    type: "data",
    styleName: "rg-right-column",
    header: {
      text: "VAT",
    },
  },
  {
    name: "bblKumack",
    fieldName: "bblKumack",
    width: "60",
    type: "data",
    styleName: "rg-right-column",
    header: {
      text: "금액",
    },
  },
];
