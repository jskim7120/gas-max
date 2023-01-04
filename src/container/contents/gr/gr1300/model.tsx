export interface ISEARCH {
  areaCode: string;
  sDate: string;
  eDate: string;
  sBuCode: string;
}
export interface IGR1300 {
  areaCode: string;
  bbDate: number;
  bbTypeName: string;
  bbBuName: string;
  bbBpName: string;
  bbSum: number;
  bbVat: number;
  bbTotal: number;
  bbSupplyTypeName: string;
  bbOutkum: number;
  bbDc: number;
  bbCredit: number;
  bbType: string;
  bbSupplyType: string;
  bbBuCode: string;
  bbSno: string;
  bbMemo: string;
}

// -------------------------------------------

export interface IDATA65 {
  //======Main
  areaCode: string;
  bbBuCode: string;
  sBuCode: string;
  bbDate: string;
  bbSno: string;
  bpCode: string;
  bpName: string;
  bpType: string;
  qty: string;
}
