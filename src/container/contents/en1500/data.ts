import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "areaName",
    dataType: ValueType.TEXT,
  },
  // {
  //   fieldName: "jnSsno",
  //   dataType: ValueType.NUMBER,
  // },
  // {
  //   fieldName: "jnSangho",
  //   dataType: ValueType.TEXT,
  // },
  // {
  //   fieldName: "jnSajang",
  //   dataType: ValueType.TEXT,
  // },
  // {
  //   fieldName: "jnZipcode",
  //   dataType: ValueType.TEXT,
  // },
  // {
  //   fieldName: "jnAddr1",
  //   dataType: ValueType.TEXT,
  // },
  // {
  //   fieldName: "jnAddr2",
  //   dataType: ValueType.TEXT,
  // },
];

export const columns = [
  {
    name: "areaCode",
    fieldName: "areaCode",
    type: "data",
    width: "80",
    styles: {
      textAlignment: "center",
    },
    header: {
      text: "코드",
    },
    footer: {
      text: "Count",
    },
  },
  {
    name: "areaName",
    fieldName: "areaName",
    type: "data",
    width: "120",
    styles: {
      textAlignment: "near",
    },
    header: {
      text: "영업소명",
    },
    footer: {
      valueCallback: function (
        grid: any,
        column: any,
        footerIndex: any,
        columnFooter: any,
        value: any
      ) {
        return grid.getSummary("areaName", "count");
      },
    },
  },
  // {
  //   name: "jnSsno",
  //   fieldName: "jnSsno",
  //   type: "data",
  //   width: "130",
  //   styles: {
  //     textAlignment: "near",
  //   },
  //   numberFormat: "0",
  //   header: {
  //     text: "jnSsno",
  //   },
  // },
  // {
  //   name: "jnSangho",
  //   fieldName: "jnSangho",
  //   type: "data",
  //   width: "100",
  //   styles: {
  //     textAlignment: "center",
  //   },
  //   header: {
  //     text: "jnSangho",
  //   },
  // },
  // {
  //   name: "jnSajang",
  //   fieldName: "jnSajang",
  //   type: "data",
  //   width: "100",
  //   styles: {
  //     textAlignment: "far",
  //     lineAlignment: "far",
  //   },
  //   header: {
  //     text: "jnSajang",
  //   },
  // },
  // {
  //   name: "jnZipcode",
  //   fieldName: "jnZipcode",
  //   type: "data",
  //   width: "100",
  //   styles: {
  //     textAlignment: "far",
  //   },
  //   header: {
  //     text: "jnZipcode",
  //   },
  // },
  // {
  //   name: "jnAddr1",
  //   fieldName: "jnAddr1",
  //   type: "data",
  //   width: "170",
  //   styles: {
  //     textAlignment: "far",
  //   },
  //   header: {
  //     text: "jnAddr1",
  //   },
  // },
  // {
  //   name: "jnAddr2",
  //   fieldName: "jnAddr2",
  //   type: "data",
  //   width: "170",
  //   styles: {
  //     textAlignment: "far",
  //   },
  //   header: {
  //     text: "jnAddr2",
  //   },
  // },
];
