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
    fieldName: "swPaydate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "swWorkOut",
    dataType: ValueType.TEXT,
  },
];

// 영업소코드 areaCode
//사원명칭 SW_NAME
//전화번호  SW_TEL
//핸드폰 SW_HP
//부서명 SW_DEPARTMENT
// bhgu talbar
//급여일 SW_PAYDATE
//퇴사 SW_Work_OUT

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
      text: "영업소코드",
    },
  },
  {
    name: "swName",
    fieldName: "swName",
    type: "data",
    width: "120",
    styles: {
      textAlignment: "near",
    },
    header: {
      text: "사원명칭",
    },
  },
  {
    name: "swTel",
    fieldName: "swTel",
    type: "data",
    width: "120",
    styles: {
      textAlignment: "near",
    },
    header: {
      text: "전화번호",
    },
  },
  {
    name: "swHp",
    fieldName: "swHp",
    type: "data",
    width: "120",
    styles: {
      textAlignment: "near",
    },
    header: {
      text: "핸드폰",
    },
  },
  {
    name: "swPaydate",
    fieldName: "swPaydate",
    type: "data",
    width: "80",
    styles: {
      textAlignment: "near",
    },
    header: {
      text: "급여일",
    },
    footer: {
      text: "Count",
    },
  },
  {
    name: "swWorkOut",
    fieldName: "swWorkOut",
    type: "data",
    width: "80",
    styles: {
      textAlignment: "near",
    },
    header: {
      text: "퇴사",
    },
    footer: {
      valueCallback: function (
        grid: any,
        column: any,
        footerIndex: any,
        columnFooter: any,
        value: any
      ) {
        return grid.getSummary("swWorkOut", "count");
      },
    },
  },
];