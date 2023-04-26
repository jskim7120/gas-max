import { ValueType } from "realgrid";

export const fields0 = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuViewName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuTel",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuHp",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuAddrn2",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuSwName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "tankVol1",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "tankCuCd1",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "tankVol2",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "tankCuCd2",
    dataType: ValueType.TEXT,
  },
];

export const columns0 = [
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
    name: "cuCode",
    fieldName: "cuCode",
    type: "data",
    width: "120",
    header: {
      text: "코드",
    },
  },
  {
    name: "cuViewName",
    fieldName: "cuViewName",
    type: "data",
    width: "250",
    header: {
      text: "거래처",
    },
    styleName: "rg-left-column",
  },

  {
    name: "cuTel",
    fieldName: "cuTel",
    type: "data",
    width: "100",
    header: {
      text: "전화번호",
    },
    styleName: "rg-left-column",
  },
  {
    name: "cuHp",
    fieldName: "cuHp",
    type: "data",
    width: "100",
    header: {
      text: "핸드폰",
    },
    styleName: "rg-left-column",
  },

  {
    name: "cuAddrn2",
    fieldName: "cuAddrn2",
    type: "data",
    width: "350",
    header: {
      text: "주소",
    },
    styleName: "rg-left-column",
  },

  {
    name: "cuSwName",
    fieldName: "cuSwName",
    type: "data",
    width: "100",
    header: {
      text: "담당사원",
    },
    styleName: "rg-left-column",
  },

  {
    name: "tankVol1",
    fieldName: "tankVol1",
    type: "data",
    width: "100",
    header: {
      text: "탱크용량",
    },
    styleName: "rg-right-column",
  },

  {
    name: "tankCuCd1",
    fieldName: "tankCuCd1",
    type: "data",
    width: "100",
    header: {
      text: "발신기 번호",
    },
  },
  {
    name: "tankVol2",
    fieldName: "tankVol2",
    type: "data",
    width: "100",
    header: {
      text: "탱크 용량",
    },
    styleName: "rg-right-column",
  },
  {
    name: "tankCuCd2",
    fieldName: "tankCuCd2",
    type: "data",
    width: "100",
    header: {
      text: "발신기 번호",
    },
  },
];
