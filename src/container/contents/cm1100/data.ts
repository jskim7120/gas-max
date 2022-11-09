import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuTypeName",
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
    fieldName: "cuAddrn2",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuTel",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuTongkum",
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
    fieldName: "cuGongdate10",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuHdate10",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuCutypeName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuStaeName",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: "areaCode",
    fieldName: "areaCode",
    type: "data",
    width: "80",
    header: {
      text: "영업소",
    },
  },
  {
    name: "cuTypeName",
    fieldName: "cuTypeName",
    type: "data",
    width: "120",
    header: {
      text: "구분",
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
    width: "200",
    header: {
      text: "거래처명",
    },
  },
  {
    name: "cuAddrn2",
    fieldName: "cuAddrn2",
    type: "data",
    width: "250",
    header: {
      text: "주소",
    },
  },
  {
    name: "cuTel",
    fieldName: "cuTel",
    type: "data",
    width: "120",
    header: {
      text: "전화",
    },
  },
  {
    name: "cuTongkum",
    fieldName: "cuTongkum",
    type: "data",
    width: "120",
    header: {
      text: "용기보증금",
    },
  },
  {
    name: "cuJmisu",
    fieldName: "cuJmisu",
    type: "data",
    width: "120",
    header: {
      text: "중량미수",
    },
  },
  {
    name: "cuCmisu",
    fieldName: "cuCmisu",
    type: "data",
    width: "120",
    header: {
      text: "체적미수",
    },
  },
  {
    name: "cuGongdate10",
    fieldName: "cuGongdate10",
    type: "data",
    width: "120",
    header: {
      text: "공급계약일",
    },
  },
  {
    name: "cuHdate10",
    fieldName: "cuHdate10",
    type: "data",
    width: "120",
    header: {
      text: "최종점검일",
    },
  },
  {
    name: "cuCutypeName",
    fieldName: "cuCutypeName",
    type: "data",
    width: "120",
    header: {
      text: "소비형태",
    },
  },
  {
    name: "cuStaeName",
    fieldName: "cuStaeName",
    type: "data",
    width: "100",
    header: {
      text: "상태",
    },
  },
];
