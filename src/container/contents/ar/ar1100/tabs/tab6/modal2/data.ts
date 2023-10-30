import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "gjDate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gsSwName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjMisujan",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: "gjDate",
    fieldName: "gjDate",
    width: "30",
    type: "data",
    header: {
      text: "코드",
    },
    editable: false,
    footer: {
      valueCallback: function (grid: any) {
        return grid.getSummary("gjDate", "count");
      },
    },
  },
  {
    name: "gsSwName",
    fieldName: "gsSwName",
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
    name: "gjMisujan",
    fieldName: "gjMisujan",
    width: "50",
    type: "data",
    styleName: "rg-right-column",
    numberFormat: "#",
    header: {
      text: "규격",
    },
  },
];
