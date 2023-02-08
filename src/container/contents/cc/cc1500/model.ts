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
  totGabul: string; //

  cjBigo: string;
  cjBigoOil: string;
  cjCaCode: string;
  cjCaName: string;
  cjCarKg: number;
  cjCcCode: string;
  cjCcName: string;
  cjKumack: number;
  cjKumackOil: number;
  cjOilDanga: number;
  cjOilL: number;
  cjOilType: string;
  cjSwCode: string;
  cjSwCodeOil: string;
  cjSwName: string;
}
