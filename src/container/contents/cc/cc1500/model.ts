export interface ICC1500SEARCH {
  areaCode: String;
  sDateF: string;
  sDateT: string;
  cjCaCode: string;
}

export interface ICC1500 {
  areaCode: string;
  cjDate: string;
  totGabul: string;

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

export const emptyObj = {
  areaCode: "",
  cjDate: "",
  totGabul: "",
  cjBigo: "",
  cjBigoOil: "",
  cjCaCode: "",
  cjCaName: "",
  cjCarKg: 0,
  cjCcCode: "",
  cjCcName: "",
  cjKumack: 0,
  cjKumackOil: 0,
  cjOilDanga: 0,
  cjOilL: 0,
  cjOilType: "",
  cjSwCode: "",
  cjSwCodeOil: "",
  cjSwName: "",
};
