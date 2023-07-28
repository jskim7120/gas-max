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

export interface IDATA65 {
  areaCode: string;
  areaCode2: string;
  bcBigo: string;
  bcBin: number;
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
  bcGin: number;
  bcGkum: number;
  bcGsum: number;
  bcInkum: number;
  bcInkum1: number;
  bcJTotal: number;
  bcJunno: string;
  bcMemo: string;
  bcMisu: number;
  bcPin: number;

  bcPjan: number;
  bcBjan: number;
  bcPdanga: number;
  bcBdanga: number;
  bcPcost: number;
  bcBcost: number;
  bcGcost: number;
  bcOutkum: number;
  bcDc: number;

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
}
export const emptyObj: any = {
  bcPin: 0,
  bcBin: 0,
  bcGin: 0,
  bcTotal: 0,
  bcPjan: 0,
  bcBjan: 0,
  bcJTotal: 0,
  bcSumP: 0,
  bcSumB: 0,
  bcSumTotal: 0,
  bcPdanga: 0,
  bcBdanga: 0,
  bcPkum: 0,
  bcBkum: 0,
  bcGkum: 0,
  bcSumKum: 0,
  bcPcost: 0,
  bcBcost: 0,
  bcGcost: 0,
  bcSumCost: 0,
  bcPsum: 0,
  bcBsum: 0,
  bcGsum: 0,
  bcSum: 0,
  bcSupplyAmt: 0,
  bcVatAmt: 0,
  bcInkum: 0,
  bcInkum1: 0,
  bcOutkum: 0,
  bcDc: 0,
  bcMisu: 0,
  bcBigo: "",
  bcJunno: "",
  bcDateno: "",
  bcMemo: "",
};
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
  bclCost: null,
  bclVatType: null,
  bclAmt: null,
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
};
