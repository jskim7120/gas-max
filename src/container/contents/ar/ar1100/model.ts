export interface IAR1100SEARCH {
  areaCode: string;
  sDate: string;
  sCustomer: string;
  sSawon: string;
  sInkumtype: string;
  sProxytype: string;
  sInserttype: string;
  sSalestate1: string;
  sSalestate2: string;
  sSalestate3: string;
  sSalestate4: string;
  sSalestate5: string;
  sSalestate6: string;
  sSalesGubun1: string;
  sSalesGubun2: string;
  sSalesGubun3: string;
  sSalesGubun4: string;
  sSalesGubun5: string;
}

export interface IAR1100GRID {
  areaCode: string;
  bigo: string;
  cuCode: string;
  cuName: string;
  dc: number;
  inkum: number;
  inkumType: string;
  inkumtypeName: string;
  insertType: string;
  inserttypeName: string;
  jpCode: string;
  jpName: string;
  kumack: number;
  misukum: number;
  pjDate: string;
  pjSno: string;
  pjTime: string;
  pjType: string;
  pjUserId: string;
  proxyType: string;
  proxytypeName: string;
  qty: string;
  reqty: string;
  saleState: string;
  salestateName: string;
  swCode: string;
  swName: string;
  vatDiv: null;
}

export interface IAR110065DETAIL {
  areaCode: string;
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
