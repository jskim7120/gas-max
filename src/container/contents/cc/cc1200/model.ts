export interface ICC1200SEARCH {
  areaCode: string;
  sDateF: string;
  sDateT: string;
  userChk: string;
}

export interface ICC1200 {
  areaCode: string;
  sDateF: string;
  sDateT: string;
  userChk: string;
  cbareaCode: string;
  acjDate: string;
  chGubun: string;
  acjAccCodeCh: string;
  daGubun: string;
  acjAccCodeDa: string;
  acjBigo: string;
  acjKumack: string;

  acjType: string;
}

export const emptyObj = {
  areaCode: "",
  sDateF: "",
  sDateT: "",
  userChk: "",
  cbareaCode: "",
  acjDate: "",
  chGubun: "",
  acjAccCodeCh: "",
  daGubun: "",
  acjAccCodeDa: "",
  acjBigo: "",
  acjKumack: "",

  chGubun2: "",
  acjType: "",
};
