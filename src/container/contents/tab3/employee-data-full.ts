import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "opt",
    dataType: ValueType.INT,
  },
  {
    fieldName: "swAddr1",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "swAddr2",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "swBigo",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "swCaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "swCaName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "swCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "swDriverNo",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "swDriverType",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "swGubun",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "swHp",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "swIndate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "swJdate1",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "swJdate2",
    dataType: ValueType.TEXT,
  },

  {
    fieldName: "swJuminno",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "swName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "swPaydate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "swPaykum",
    dataType: ValueType.INT,
  },

  {
    fieldName: "swPaytype",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "swTel",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "swWorkOut",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "swZipcode",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: "areaCode",
    fieldName: "areaCode",
    type: "data",
    width: "50",
    styles: {
      textAlignment: "center",
    },
    header: {
      text: "영업소코드",
      showTooltip: true,
      tooltip: '<span style="color: red;">이름</span>',
    },
  },
  {
    name: "opt",
    fieldName: "opt",
    type: "data",
    width: "50",
    styles: {
      textAlignment: "center",
    },
    header: {
      text: "opt",
      showTooltip: false,
    },
  },
  {
    name: "swAddr1",
    fieldName: "swAddr1",
    type: "data",
    width: "80",
    styles: {
      textAlignment: "center",
    },
    header: {
      text: "swAddr1",
      showTooltip: false,
    },
  },
  {
    name: "swAddr2",
    fieldName: "swAddr2",
    type: "data",
    width: "80",
    styles: {
      textAlignment: "center",
    },
    header: {
      text: "swAddr2",
      showTooltip: false,
    },
  },
  {
    name: "swBigo",
    fieldName: "swBigo",
    type: "data",
    width: "50",
    styles: {
      textAlignment: "center",
    },
    header: {
      text: "swBigo",
      showTooltip: false,
    },
  },
  {
    name: "swCaCode",
    fieldName: "swCaCode",
    type: "data",
    width: "50",
    styles: {
      textAlignment: "center",
    },
    header: {
      text: "swCaCode",
      showTooltip: false,
    },
  },
  {
    name: "swCaName",
    fieldName: "swCaName",
    type: "data",
    width: "50",
    styles: {
      textAlignment: "center",
    },
    header: {
      text: "swCaName",
      showTooltip: false,
    },
  },
  {
    name: "swCode",
    fieldName: "swCode",
    type: "data",
    width: "50",
    styles: {
      textAlignment: "center",
    },
    header: {
      text: "사원코드",
      showTooltip: false,
    },
  },
  {
    name: "swDriverNo",
    fieldName: "swDriverNo",
    type: "data",
    width: "50",
    styles: {
      textAlignment: "center",
    },
    header: {
      text: "swDriverNo",
      showTooltip: false,
    },
  },
  {
    name: "swDriverType",
    fieldName: "swDriverType",
    type: "data",
    width: "50",
    styles: {
      textAlignment: "center",
    },
    header: {
      text: "swDriverType",
      showTooltip: false,
    },
  },
  {
    name: "swGubun",
    fieldName: "swGubun",
    type: "data",
    width: "50",
    styles: {
      textAlignment: "center",
    },
    header: {
      text: "swGubun",
      showTooltip: false,
    },
  },
  {
    name: "swHp",
    fieldName: "swHp",
    type: "data",
    width: "100",
    styles: {
      textAlignment: "center",
    },
    header: {
      text: "swHp",
      showTooltip: false,
    },
  },
  {
    name: "swIndate",
    fieldName: "swIndate",
    type: "data",
    width: "80",
    styles: {
      textAlignment: "center",
    },
    header: {
      text: "swIndate",
      showTooltip: false,
    },
  },
  {
    name: "swJdate1",
    fieldName: "swJdate1",
    type: "data",
    width: "80",
    styles: {
      textAlignment: "center",
    },
    header: {
      text: "swJdate1",
      showTooltip: false,
    },
  },
  {
    name: "swJdate2",
    fieldName: "swJdate2",
    type: "data",
    width: "80",
    styles: {
      textAlignment: "center",
    },
    header: {
      text: "swJdate2",
      showTooltip: false,
    },
  },
  {
    name: "swJuminno",
    fieldName: "swJuminno",
    type: "data",
    width: "50",
    styles: {
      textAlignment: "center",
    },
    header: {
      text: "swJuminno",
      showTooltip: false,
    },
  },
  {
    name: "swName",
    fieldName: "swName",
    type: "data",
    width: "100",
    styles: {
      textAlignment: "center",
    },
    header: "swName",
  },
  {
    name: "swPaydate",
    fieldName: "swPaydate",
    type: "data",
    width: "50",
    styles: {
      textAlignment: "center",
    },
    header: {
      text: "swPaydate",
      showTooltip: false,
    },
  },
  {
    name: "swPaykum",
    fieldName: "swPaykum",
    type: "data",
    width: "80",
    styles: {
      textAlignment: "center",
    },
    header: {
      text: "swPaykum",
      showTooltip: false,
    },
  },
  {
    name: "swPaytype",
    fieldName: "swPaytype",
    type: "data",
    width: "50",
    styles: {
      textAlignment: "center",
    },
    header: {
      text: "swPaytype",
      showTooltip: false,
    },
  },
  {
    name: "swTel",
    fieldName: "swTel",
    type: "data",
    width: "130",
    styles: {
      textAlignment: "center",
    },
    header: {
      text: "swTel",
      showTooltip: false,
    },
  },
  {
    name: "swWorkOut",
    fieldName: "swWorkOut",
    type: "data",
    width: "50",
    styles: {
      textAlignment: "center",
    },
    header: {
      text: "swWorkOut",
      showTooltip: false,
    },
  },
  {
    name: "swZipcode",
    fieldName: "swZipcode",
    type: "data",
    width: "50",
    styles: {
      textAlignment: "center",
    },
    header: {
      text: "swZipcode",
      showTooltip: false,
    },
  },
];
