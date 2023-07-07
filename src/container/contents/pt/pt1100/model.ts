export interface IPT1100SEARCH {
  areaCode: String;
  sCheck: String;
  sCuName: String;
  sMsdateF: any;
  sMsdateT: any;
}
export interface IPT1100THIRD {
  sMsdateF: String;
  sMsdateT: String;
}

export interface IPTFORMMODEL {
  msDate: string;
  cuName: string;
  cuCode: string;
  cuJmisu: number;
  msDc: number;
  msKumack: number;
  msJanack: number;
  msSukumtype: string;
  msSwCode: string;
  msBigo: string;
  totMisukum: number;
  totSukum: number;
  totDc: number;
}

export const emptyObj = {};
