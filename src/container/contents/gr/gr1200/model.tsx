export interface ISEARCH {
  areaCode: string;
  sDate: string;
  eDate: string;
  sBcBuCode: string;
}
export interface IGR1200 {
  areaCode: string;
  bcBin: number;
  bcBuCode: string;
  bcBuName: string;
  bcChitType: string;
  bcChitTypeName: string;
  bcCtypeName: string;
  bcDate: string;
  bcDateno: string;
  bcGin: number;
  bcInkum: number;
  bcJTotal: number;
  bcPin: number;
  bcSno: string;
  queryType: string;
}

// -------------------------------------------

// bCCost: 0;
// bCIn: 260;
// bCJan: 0;
// bCKum: 190060;
// bCSum: 260;
// bVCost: 0;
// bVIn: 0;
// bVJan: 0;
// bVKum: 0;
// bVSum: 0;
// gCost: 0;
// gIn: 0;
// gJan: 0;
// gKum: 0;
// gSum: 0;
// pCCost: 0;
// pCIn: 283378;
// pCJan: 1072;
// pCKum: 127913380;
// pCSum: 282306;
// pVCost: 0;
// pVIn: 0;
// pVJan: 0;
// pVKum: 0;
// pVSum: 0;
// queryType: "TOTAL_DATA";
// sumBc: 0;
// sumBv: 0;
// sumG: 0;
// sumPc: 0;
// sumPv: 0;

export interface IDATA65 {
  //======Main
  areaCode: string;
  bcBcost: number;
  bcBdanga: number;
  bcBigo: string;
  bcBin: number;
  bcBjan: number;
  bcBkum: number;
  bcBsum: number;
  bcBuCode: string;
  bcCaCode: string;
  bcCarno: string;
  bcCarno1: string;
  bcChitType: string;
  bcCsawon: string;
  bcCtype: string;
  bcDate: string;
  bcDateno: string;
  bcDc: number;
  bcGcost: number;
  bcGin: number;
  bcGkum: number;
  bcGsum: number;
  bcInkum: number;
  bcInkum1: number;
  bcJTotal: number;
  bcJunno: string;
  bcMemo: string;
  bcMisu: number;
  bcOutkum: number;
  bcPcost: number;
  bcPdanga: number;
  bcPin: number;
  bcPjan: number;
  bcPkum: number;
  bcPsum: number;
  bcSno: string;
  bcSum: number;
  bcSumB: number;
  bcSumCost: number;
  bcSumKum: number;
  bcSumP: number;
  bcSumTotal: number;
  bcSupplyAmt: number;
  bcSupplyType: string;
  bcTotal: number;
  bcVatAmt: number;

  // =====detail tab1

  bclChungbok: number;
  bclChungdae: number;
  bclInc: string;
  bclInmigum: number;
  bclInqty: number;
  bclJpCode: string;
  bclJpName: string;
  bclOutc: null;
  bclOutmigum: number;
  bclOutqty: number;
  bclSvyn: string;
  bclTongdel: number;
  queryType: string;

  //=========detail tab2
  // bclAmt: null;
  // bclChungbok: 0;
  // bclChungdae: 0;
  // bclCost: null;
  // bclInc: null;
  // bclInmigum: 0;
  // bclInqty: 5000;
  // bclJpCode: "99";
  // bclJpName: "벌크";
  // bclOutc: null;
  // bclOutmigum: 0;
  // bclOutqty: 0;
  // bclTongdel: 0;
  // bclVatType: null;
  // queryType: "DETAIL_DATA";

  //==============detail tab3

  // bclAmt: null;
  // bclBulkKg: null;
  // bclBulkL: null;
  // bclCost: null;
  // bclGubun: "0";
  // bclGubunName: "프로판";
  // bclJpCode: "99";
  // bclJpName: "벌크";
  // bclSpecific: null;
  // bclUnit: null;
  // bclVatType: null;
  // bclVatTypeName: null;
  // queryType: "DETAIL_DATA";
}

export const emptyObjTab1: any = {
  bclJpCode: null,
  bclJpName: null,
  bclInqty: null,
  bclInc: null,
  bclOutc: null,
  bclOutqty: null,
  bclInmigum: null,
  bclOutmigum: null,
  bclChungbok: null,
  bclChungdae: null,
  bclTongdel: null,
  bclSvyn: null,
  bclJpSno: null,
};

export const emptyObjTab2: any = {
  bclJpCode: null,
  bclJpName: null,
  bclInqty: null,
  bclInc: null,
  bclOutc: null,
  bclOutqty: null,
  bclInmigum: null,
  bclOutmigum: null,
  bclChungbok: null,
  bclChungdae: null,
  bclTongdel: null,
  bclCost: 0,
  bclVatType: 0,
  bclAmt: 0,
  bclJpSno: null,
};

export const emptyObjTab3: any = {
  bclGubunName: null,
  bclJpCode: null,
  bclJpName: null,
  bclUnit: null,
  bclSpecific: null,
  bclBulkKg: null,
  bclBulkL: null,
  bclCost: 0,
  bclVatType: null,
  bclAmt: 0,

  //
  // bclGubun: null,
  // bclJpSno: "01",
  // bclVatType: "0",
};
