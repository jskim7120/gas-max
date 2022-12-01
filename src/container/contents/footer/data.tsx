import { ValueType } from "realgrid";

const dff = {
  areaCode: "01",
  barcodeYn: "N",
  cuAddr1n2: "세종시 금남면 감성리 ",
  cuBigo1: "",
  cuBigo2: "",
  cuCmisu: "0",
  cuCode: "000-00004",
  cuGongdate: "",
  cuHdate: "20210624",
  cuHdateT: "2021-12-24",
  cuHp: "",
  cuJmisu: "",
  cuNo: null,
  cuSaddr1: null,
  cuSangho: null,
  cuStae: "0",
  cuStaeName: "정상",
  cuSukumtype: "1",
  cuSukumtypeName: "지로",
  cuSwCode: "4",
  cuSwName: null,
  cuTel: "866-8384",
  cuTel2: "010-2385-8385;;;",
  cuTongkum: "0",
  cuType: "0",
  cuTypeName: "중량",
  cuUsername: "감성 이창길",
  cuViewName: "감성 이창길",
  jTransYn: "N",
  mTransYn: "N",
  tTransYn: "N",
};

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
    fieldName: "cuTypeName",
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
    fieldName: "cuAddr1n2",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuUsername",
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
    name: "cuCode",
    fieldName: "cuCode",
    type: "data",
    width: "120",
    header: {
      text: "코드",
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
    name: "cuViewName",
    fieldName: "cuViewName",
    type: "data",
    width: "350",
    header: {
      text: "매출처명",
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
    name: "cuHp",
    fieldName: "cuHp",
    type: "data",
    width: "120",
    header: {
      text: "핸드폰",
    },
  },
  {
    name: "cuAddr1n2",
    fieldName: "cuAddr1n2",
    type: "data",
    width: "120",
    header: {
      text: "주소",
    },
  },
  {
    name: "cuUsername",
    fieldName: "cuUsername",
    type: "data",
    width: "120",
    header: {
      text: "성명",
    },
  },
  {
    name: "cuStaeName",
    fieldName: "cuStaeName",
    type: "data",
    width: "120",
    header: {
      text: "상태",
    },
  },
];
