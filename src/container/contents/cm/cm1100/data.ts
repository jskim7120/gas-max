import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "areaCode",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "cuTypeColor",
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
    fieldName: "cuHdateColor",
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
  { fieldName: "cuStaeColor", dataType: ValueType.TEXT },
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
    name: "cuTypeName",
    fieldName: "cuTypeName",
    type: "data",
    width: "60",
    header: {
      text: "구분",
    },
    renderer: {
      type: "html",
      callback: renderCuTypeColor,
    },
  },
  {
    name: "cuCode",
    fieldName: "cuCode",
    type: "data",
    width: "100",
    header: {
      text: "코드",
    },
  },
  {
    name: "cuViewName",
    fieldName: "cuViewName",
    type: "data",
    width: "170",
    header: {
      text: "거래처명",
    },
  },
  {
    name: "cuAddrn2",
    fieldName: "cuAddrn2",
    type: "data",
    width: "470",
    styleName: "rg-left-column",
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
    styleName: "rg-right-column",
    header: {
      text: "용기보증금",
    },
  },
  {
    name: "cuJmisu",
    fieldName: "cuJmisu",
    type: "data",
    width: "120",
    styleName: "rg-right-column",
    header: {
      text: "중량미수",
    },
  },
  {
    name: "cuCmisu",
    fieldName: "cuCmisu",
    type: "data",
    width: "120",
    styleName: "rg-right-column",
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
    renderer: {
      type: "html",
      callback: renderHdateColor,
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
    renderer: {
      type: "html",
      callback: renderCuStaeColor,
    },
  },
];

function renderCuTypeColor(grid: any, cell: any, w: any, h: any) {
  const color = grid.getValue(cell.item.index, "cuTypeColor");
  return `<span style="color:${color}">${cell.value}</span>`;
}

function renderHdateColor(grid: any, cell: any, w: any, h: any) {
  const color = grid.getValue(cell.item.index, "cuHdateColor");
  return `<span style="color:${color}">${cell.value}</span>`;
}

function renderCuStaeColor(grid: any, cell: any, w: any, h: any) {
  const color = grid.getValue(cell.item.index, "cuStaeColor");
  return `<span style="color:${color}">${cell.value}</span>`;
}
