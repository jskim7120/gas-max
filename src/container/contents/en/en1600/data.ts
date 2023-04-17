import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "swName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "swTel",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "swHp",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "swDepartment",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "swGubunName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "swPaydate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "swWorkOut",
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
    name: "swName",
    fieldName: "swName",
    type: "data",
    width: "300",
    styleName: "rg-left-column",
    header: {
      text: "사원명",
    },
  },
  {
    name: "swTel",
    fieldName: "swTel",
    type: "data",
    width: "110",
    header: {
      text: "전화번호",
    },
    styleName: "rg-left-column",
  },
  {
    name: "swHp",
    fieldName: "swHp",
    type: "data",
    width: "110",
    header: {
      text: "핸드폰",
    },
    styleName: "rg-left-column",
  },
  {
    name: "swDepartment",
    fieldName: "swDepartment",
    type: "data",
    width: "100",
    styleName: "rg-left-column",
    header: {
      text: "부서명",
    },
  },
  {
    name: "swGubunName",
    fieldName: "swGubunName",
    type: "data",
    width: "80",
    header: {
      text: "업무구분",
    },
    styleName: "rg-left-column",
  },
  {
    name: "swPaydate",
    fieldName: "swPaydate",
    type: "data",
    width: "50",
    header: {
      text: "급여일",
    },
    styleName: "rg-left-column",
  },
  {
    name: "swWorkOut",
    fieldName: "swWorkOut",
    type: "data",
    width: "50",
    header: {
      text: "퇴사",
    },
    styleName: "rg-left-column",
  },
];
