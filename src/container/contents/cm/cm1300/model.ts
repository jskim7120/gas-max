export interface ISEARCH {
  areaCode: string;
  aptCode: string;
  aptNameS: string;
}
export interface ICM1300 {
  apt4F: string;
  apt4Ho: string;
  aptAddr1: string;
  aptAddr2: string;
  aptAnkum: number;
  aptBf: string;
  aptCode: string;
  aptCustgubun: string;
  aptF: number;
  aptGumdate: string;
  aptJyCode: number;
  aptMeterkum: number;
  aptName: string;
  aptPer: number;
  aptRdanga: number;
  aptRdangaAmt: number;
  aptRdangaSign: string;
  aptRdangaType: string;
  aptRh2O: string;
  aptS: number;
  aptSisulkum: number;
  aptSukumtype: string;
  aptSum: string;
  aptSwCode: string;
  aptType: string;
  aptTypeName: string;
  aptZipcode: string;
  areaCode: string;
  // --------------

  chkAptZipCode: boolean;
  chkAptRh2o: boolean;
  chkAptRdangaType: boolean;
  chkAptAnkum: boolean;
  chkAptSisulkum: boolean;
  chkAptMeterkum: boolean;
  chkAptPer: boolean;
  chkAptGumdate: boolean;
  chkAptSukumtype: boolean;
}

export const emptyObj: any = {
  apt4F: "",
  apt4Ho: "",
  aptAddr1: "",
  aptAddr2: "",
  aptAnkum: "",
  aptBf: "",
  aptCode: "",
  aptCustgubun: "",
  aptF: "",
  aptGumdate: "",
  aptJyCode: "",
  aptMeterkum: "",
  aptName: "",
  aptPer: "",
  aptRdanga: "",
  aptRdangaAmt: "",
  aptRdangaSign: "",
  aptRdangaType: "",
  aptRh2O: "",
  aptS: "",
  aptSisulkum: "",
  aptSukumtype: "",
  aptSum: "",
  aptSwCode: "",
  aptType: "",
  aptTypeName: "",
  aptZipcode: "",
  areaCode: "",

  chkAptZipCode: false,
  chkAptRh2o: false,
  chkAptRdangaType: false,
  chkAptAnkum: false,
  chkAptSisulkum: false,
  chkAptMeterkum: false,
  chkAptPer: false,
  chkAptGumdate: false,
  chkAptSukumtype: false,
};
