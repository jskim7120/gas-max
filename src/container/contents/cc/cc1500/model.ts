export interface ICC1500SEARCH {
  areaCode: String;
  sDateF: string;
  sDateT: string;
  cjCaCode: string;
}

export interface ICC1500 {
  areaCode: string;
  cjBigo: string;
  cjCaCode: string;
  cjCaName: string;
  cjCcCode: string;
  cjCcName: string;
  cjDate: string;
  cjKumack: number;
  cjSno: string;
  cjSwCode: string;
  cjSwName: string;
}

export interface ICC1500FORM {
  areaCode: string;
  cjDate: string;
  cjCarCode: string; //
  cjCcCode: string;
  cjKumack: number;
  cjSwCode: string;
  cjBigo: string;
  cjOilL: string; //
  cjOilDanga: string; //
  cjKumackOil: string; //
  cjCarKg: string; //
  cjSwCodeOil: string; //
  cjBigoOil: string; //
}
