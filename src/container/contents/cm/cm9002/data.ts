import { ValueType } from "realgrid";

export const fields = [
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
    fieldName: "cuJmisu",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuCmisu",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuCutypeName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuGongdate",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuGongno",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuTypeName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuStaeName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuSupplyDate",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: "areaCode",
    fieldName: "areaCode",
    type: "data",
    width: "20",
    header: {
      text: "영업소",
    },
  },
  {
    name: "cuCode",
    fieldName: "cuCode",
    type: "data",
    width: "40",
    header: {
      text: "코드",
    },
  },
  {
    name: "cuViewName",
    fieldName: "cuViewName",
    type: "data",
    width: "100",
    header: {
      text: "거래처",
    },
    styleName: "rg-left-column",
  },
  {
    name: "cuTel",
    fieldName: "cuTel",
    type: "data",
    width: "40",
    header: {
      text: "전화번호",
    },
    styleName: "rg-left-column",
  },
  {
    name: "cuHp",
    fieldName: "cuHp",
    type: "data",
    width: "45",
    header: {
      text: "핸드폰",
    },
    styleName: "rg-left-column",
  },
  {
    name: "cuAddrn2",
    fieldName: "cuAddrn2",
    type: "data",
    width: "150",
    header: {
      text: "주소",
    },
    styleName: "rg-left-column",
  },
  {
    name: "cuSwName",
    fieldName: "cuSwName",
    type: "data",
    width: "30",
    header: {
      text: "담당사원",
    },
    styleName: "rg-left-column",
  },
  {
    name: "cuJmisu",
    fieldName: "cuJmisu",
    type: "data",
    width: "40",
    header: {
      text: "중량미수",
    },
    styleName: "rg-right-column",
  },
  {
    name: "cuCmisu",
    fieldName: "cuCmisu",
    type: "data",
    width: "40",
    header: {
      text: "체적미수",
    },
    styleName: "rg-right-column",
  },
  {
    name: "cuCutypeName",
    fieldName: "cuCutypeName",
    type: "data",
    width: "60",
    header: {
      text: "소비자형태",
    },
    styleName: "rg-left-column",
  },
  {
    name: "cuGongdate",
    fieldName: "cuGongdate",
    type: "data",
    width: "40",
    header: {
      text: "공급계약",
    },
    styleName: "rg-left-column",
  },
  {
    name: "cuGongno",
    fieldName: "cuGongno",
    type: "data",
    width: "40",
    header: {
      text: "계약번호",
    },
    styleName: "rg-left-column",
  },
  {
    name: "cuTypeName",
    fieldName: "cuTypeName",
    type: "data",
    width: "30",
    header: {
      text: "거래구분",
    },
    styleName: "rg-left-column",
  },
  {
    name: "cuStaeName",
    fieldName: "cuStaeName",
    type: "data",
    width: "30",
    header: {
      text: "거래상태",
    },
    styleName: "rg-left-column",
  },
  {
    name: "cuSupplyDate",
    fieldName: "cuSupplyDate",
    type: "data",
    width: "40",
    header: {
      text: "최종공급일",
    },
    styleName: "rg-left-column",
  },
];
