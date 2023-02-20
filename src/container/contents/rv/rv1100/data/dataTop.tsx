import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "cuCno",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjCuCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "viewCuName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjDate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjJungum",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjGum",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "gjGage",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjDanga",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjKumack",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "maintCost",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjDc",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjPerkum",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjMisu",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjTotal",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjBigo",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjCheck",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuSukumtypeName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjZdate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "gjJirodate",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: "cuCno",
    fieldName: "cuCno",
    type: "data",
    width: "50",
    header: {
      text: "순번",
    },
    footer: {
      valueCallback: function (grid: any) {
        return grid.getSummary("cuCno", "count");
      },
    },
  },
  {
    name: "areaCode",
    fieldName: "areaCode",
    type: "data",
    width: "50",
    header: {
      text: "영업소",
    },
  },
  {
    name: "gjCuCode",
    fieldName: "gjCuCode",
    type: "data",
    width: "80",
    header: {
      text: "코드",
    },
  },
  {
    name: "viewCuName",
    fieldName: "viewCuName",
    type: "data",
    width: "150",
    styleName: "rg-left-column",
    header: {
      text: "거래처명",
    },
  },
  {
    name: "gjDate",
    fieldName: "gjDate",
    type: "data",
    width: "100",
    header: {
      text: "검침일자",
    },
  },
  {
    name: "gjJungum",
    fieldName: "gjJungum",
    type: "data",
    width: "90",
    styleName: "rg-right-column",
    header: {
      text: "전월",
    },
  },
  {
    name: "gjGum",
    fieldName: "gjGum",
    type: "data",
    width: "90",
    styleName: "rg-right-column",
    header: {
      text: "당월",
    },
  },
  {
    name: "gjGage",
    fieldName: "gjGage",
    type: "data",
    width: "90",
    styleName: "rg-right-column",
    header: {
      text: "사용량",
    },
  },
  {
    name: "gjDanga",
    fieldName: "gjDanga",
    type: "data",
    width: "90",
    styleName: "rg-right-column",
    header: {
      text: "단가",
    },
  },
  {
    name: "gjKumack",
    fieldName: "gjKumack",
    type: "data",
    width: "90",
    styleName: "rg-right-column",
    header: {
      text: "사용금액",
    },
  },
  {
    name: "maintCost",
    fieldName: "maintCost",
    type: "data",
    width: "90",
    styleName: "rg-right-column",
    header: {
      text: "관리비",
    },
  },
  {
    name: "gjDc",
    fieldName: "gjDc",
    type: "data",
    width: "90",
    styleName: "rg-right-column",
    header: {
      text: "할인액",
    },
  },
  {
    name: "gjPerkum",
    fieldName: "gjPerkum",
    type: "data",
    width: "90",
    styleName: "rg-right-column",
    header: {
      text: "연체료",
    },
  },
  {
    name: "gjMisu",
    fieldName: "gjMisu",
    type: "data",
    width: "90",
    styleName: "rg-right-column",
    header: {
      text: "전미수",
    },
  },
  {
    name: "gjTotal",
    fieldName: "gjTotal",
    type: "data",
    width: "90",
    styleName: "rg-right-column",
    header: {
      text: "당월금액",
    },
  },
  {
    name: "gjBigo",
    fieldName: "",
    type: "data",
    width: "90",
    header: {
      text: "비고",
    },
  },
  {
    name: "gjCheck",
    fieldName: "gjCheck",
    type: "data",
    width: "50",
    header: {
      text: "선택",
    },
    renderer: {
      type: "check",
      trueValues: "Y",
      falseValues: "N",
    },
  },
  {
    name: "cuSukumtypeName",
    fieldName: "cuSukumtypeName",
    type: "data",
    width: "80",
    header: {
      text: "청구",
    },
  },
  {
    name: "gjZdate",
    fieldName: "gjZdate",
    type: "data",
    width: "90",
    header: {
      text: "납부마감일",
    },
  },
  {
    name: "gjJirodate",
    fieldName: "gjJirodate",
    type: "data",
    width: "90",
    header: {
      text: "지로출력일",
    },
  },
];
