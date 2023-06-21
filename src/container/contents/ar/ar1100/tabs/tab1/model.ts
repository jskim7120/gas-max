export interface IAR110065DETAIL {
  areaCode: string;
  pjCuCode: string;
  pjCuName: string;
  buCode: string;
  buName: string;
  jpKind: string;
  jpSpecific: string;
  pjBigo: string;
  pjDanga: number;
  pjDate: string;
  pjDc: number;
  pjInkum: number;
  pjInkumtype: string;
  pjJago: number;
  pjJpCode: string;
  pjJpName: string;
  pjKumSup: number;
  pjKumVat: number;
  pjKumack: number;
  pjMisukum: number;
  pjQty: string;
  pjReqty: string;
  pjSno: string;
  pjSwCode: string;
  pjSwName: string;
  pjVatDiv: string;
  proxyType: string;
  qtyKg: string;
  qtyL: string;
  queryType: string;
  saleState: string;
  signkey: string;
  signuser: string;
}

export const emptyObj = {
  pjDate: "",
  pjJpCode: "",
  pjJpName: "",
  pjQty: "",
  pjReqty: "",
  pjDanga: 0,
  pjVatDiv: "",
  pjKumVat: 0,
  pjKumack: 0,
  saleState: "",
  proxyType: "",
  buName: "",
  pjInkumtype: "",
  pjInkum: 0,
  pjDc: 0,
  pjMisukum: 0,
  pjSwCode: "",
  pjBigo: "",
  signkey: "",
  signuser: "",
};
