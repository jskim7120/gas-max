export interface ICC1400SEARCH {
  areaCode: string;
  sDateF: string;
  sDateT: string;
  sSwCode: string;
  sgSwCode: string;
}

export interface ICC1400 {
  areaCode: string;
  sgBigo: string;
  sgDate: string;
  sgKumack: number;
  sgSno: string;
  sgSwCode: string;
  sgSwName: string;
}

export interface ICC1400FORM {
  areaCode: string;
  sgDate: string;
  sgSwCode: string;
  gabulSum: string;
  sgKumack: number;
  sgBigo: string;
  totGabul: string;
}
