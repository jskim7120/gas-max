export interface ISEARCH {
  areaCode: string;
  sDate: string;
  eDate: string;
  sBuCode: string;
}
export interface IGR1300 {
  areaCode: string;
  bbDate: string;
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
  bbMisu: number;
  bbBigo: string;
}

// -------------------------------------------

// export interface IDATA65 {
//   bblBpCode: string;
//   bblBpName: string;
//   bblBpSno: string;
//   bblDanga: number;
//   bblKumack: number;
//   bblQty: number;
//   bblType: string;
//   bblVatType: string;
// }

//12--o irj bgaa data type
// bpCode: "111";
// bpDanwi: null;
// bpName: "";
// bpType: null;
// jbuBpDanga: 0;
// jbuChangedate: "20221130";
// jbuDangaType: "0";
// jbuVatKind: "0";

export const emptyObj = {
  areaCode: "",
  bbDate: "",
  bbTypeName: "",
  bbBuName: "",
  bbBpName: "",
  bbSum: 0,
  bbVat: 0,
  bbTotal: 0,
  bbSupplyTypeName: "",
  bbOutkum: 0,
  bbDc: 0,
  bbCredit: 0,
  bbType: "",
  bbSupplyType: "",
  bbBuCode: "",
  bbSno: "",
  bbMemo: "",
  bbMisu: 0,
  bbBigo: "",
};
