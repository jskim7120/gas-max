export interface ICM1300 {
  areaCode: string;
  aptCode: string;
  aptName: string;
  aptTypeName: string;
  aptF: number;
  aptS: number;
  aptSum: number;
  swName: string;
  aptType: string;
  aptZipcode: string;
  aptAddr1: string;
  aptAddr2: string;
  apt4ho: string;
  apt4f: string;
  aptBf: string;
  aptSwCode: string;
  aptJyCode: string;
  aptCustgubun: string;
  aptGubun: string;
  aptRh2o: string;
  aptRdangaType: string;
  aptAnkum: string;
  aptSisulkum: string;
  aptRdangaSign: string;
  aptMeterkum: string;
  aptPer: string;
  aptGumdate: string;
  aptSukumtype: string;

  //
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

export interface ISEARCH {
  areaCode: string;
  aptCode: string;
  aptName: string;
}
