export interface ICC1100SEARCH {
  areaCode: string;
  codeGu: string;
  sDateF: string;
  sDateT: string;
  bankCd: string;
}
export interface ICC1100 {
  areaCode: string;
  codeGu: string;
  sDateF: string;
  sDateT: string;
  cbareaCode: string;
  acjDate: string;
  acjType: string;
  acjGb: string;
  cashBank: string;
  acjAccName: string;
  acjAcsName: string;
  acjSwCode: string;
  acjKumack: string;
  acjBigo: string;
  bankNo: string;
  bankCd: string;
}

export const emptyObj = {
  codeGu: "",
  sDateF: "",
  sDateT: "",
  cbareaCode: "",
  acjDate: "",
  acjType: "",
  acjGb: "",
  cashBank: "",
  acjAccName: "",
  acjAcsName: "",
  acjSwCode: "",
  acjKumack: "",
  acjBigo: "",
  bankNo: "",
  bankCd: "",
};
