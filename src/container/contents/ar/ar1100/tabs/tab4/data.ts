import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "bglBpCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bglBpName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bglBpType",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "bglQty",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "bglDanga",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "bglKumack",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "bglBigo",
    dataType: ValueType.NUMBER,
  },
];

export const columns = [
  {
    name: "bglBpCode",
    fieldName: "bglBpCode",
    width: "30",
    type: "data",
    header: {
      text: "코드",
    },
    editable: false,
    footer: {
      valueCallback: function (grid: any) {
        return grid.getSummary("areaCode", "count");
      },
    },
  },
  {
    name: "bglBpName",
    fieldName: "bglBpName",
    button: "action",
    buttonVisibility: "always",
    width: "90",
    styleName: "rg-left-column",
    type: "data",
    header: {
      text: "품명",
    },
    editable: false,
  },
  {
    name: "bglBpType",
    fieldName: "bglBpType",
    width: "50",
    type: "data",
    styleName: "rg-right-column",
    numberFormat: "#",
    header: {
      text: "규격",
    },
  },
  {
    name: "bglQty",
    fieldName: "bglQty",
    width: "50",
    type: "data",
    styleName: "rg-right-column",
    numberFormat: "#",
    header: {
      text: "수량",
    },
  },
  {
    name: "bglDanga",
    fieldName: "bglDanga",
    width: "60",
    type: "data",
    styleName: "rg-right-column",
    numberFormat: "#",
    header: {
      text: "단가",
    },
  },
  {
    name: "bglKumack",
    fieldName: "bglKumack",
    width: "80",
    type: "data",
    styleName: "rg-right-column",
    numberFormat: "#",
    header: {
      text: "금액",
    },
  },
  {
    name: "bglBigo",
    fieldName: "bglBigo",
    width: "150",
    type: "data",
    styleName: "rg-right-column",
    numberFormat: "#",
    header: {
      text: "비고",
    },
  },
];
