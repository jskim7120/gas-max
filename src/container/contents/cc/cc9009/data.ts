import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cjCaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cjCaName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cjSwName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cjDate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cjOilL",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cjOilDanga",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cjKumack",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cjCarKg",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cjCarDr",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cjCarEff",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cjBigo",
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
  },
  {
    name: "cjCaCode",
    fieldName: "cjCaCode",
    type: "data",
    width: "40",
    header: {
      text: "코드",
    },
    footer: {
      valueCallback: function (grid: any) {
        return grid.getSummary("cjCaCode", "count");
      },
    },
  },
  {
    name: "cjCaName",
    fieldName: "cjCaName",
    type: "data",
    width: "150",
    styleName: "rg-left-column",
    header: {
      text: "차량명",
    },
  },
  {
    name: "cjSwName",
    fieldName: "cjSwName",
    type: "data",
    width: "90",
    header: {
      text: "사원",
    },
  },
  {
    name: "cjDate",
    fieldName: "cjDate",
    type: "data",
    width: "130",
    header: {
      text: "주유일자",
    },
  },
  {
    name: "cjOilL",
    fieldName: "cjOilL",
    type: "data",
    width: "130",
    styleName: "rg-right-column",
    header: {
      text: "주유량(L)",
    },
  },
  {
    name: "cjOilDanga",
    fieldName: "cjOilDanga",
    type: "data",
    width: "130",
    styleName: "rg-right-column",
    header: {
      text: "단가",
    },
  },
  {
    name: "cjKumack",
    fieldName: "cjKumack",
    type: "data",
    width: "130",
    styleName: "rg-right-column",
    header: {
      text: "금액",
    },
  },
  {
    name: "cjCarKg",
    fieldName: "cjCarKg",
    type: "data",
    width: "130",
    styleName: "rg-right-column",
    header: {
      text: "주행적산(km)",
    },
  },
  {
    name: "cjCarDr",
    fieldName: "cjCarDr",
    type: "data",
    width: "130",
    styleName: "rg-right-column",
    header: {
      text: "주행(km)",
    },
  },
  {
    name: "cjCarEff",
    fieldName: "cjCarEff",
    type: "data",
    width: "130",
    styleName: "rg-right-column",
    header: {
      text: "연비(km/L)",
    },
  },
  {
    name: "cjBigo",
    fieldName: "cjBigo",
    type: "data",
    width: "350",
    styleName: "rg-left-column",
    header: {
      text: "비고",
    },
  },
];
