export interface IAR1100SEARCH {
  areaCode: string;
  sDate: string;
  dDate: string;
  sCustomer: string;
  sSawon: string;
  sInkumtype: string;
  sProxytype: string;
  sInserttype: string;
  sSalestate0: boolean;
  sSalestate1: boolean;
  sSalestate2: boolean;
  sSalestate3: boolean;
  sSalestate4: boolean;
  sSalestate5: boolean;
  sSalestate6: boolean;
  sSalegubun0: boolean;
  sSalegubun1: boolean;
  sSalegubun2: boolean;
  sSalegubun3: boolean;
  sSalegubun4: boolean;
  sSalegubun5: boolean;
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

export const emtObj = {
  areaCode: "",
  bigo: null,
  cuCode: "",
  cuName: "",
  dc: null,
  inkum: null,
  inkumType: "",
  inkumtypeName: "",
  insertType: " ",
  insertypeName: null,
  jpCode: "",
  jpName: "",
  kumack: null,
  misukum: null,
  orderDate: null,
  pjCuName: "",
  pjDate: "",
  pjSno: "",
  pjTime: "",
  pjType: "",
  pjUserId: "",
  pjtypeName: "",
  proxyType: "",
  proxytypeName: null,
  qty: null,
  reqty: null,
  saleState: "",
  salestateName: "",
  swCode: "",
  swName: "",
  vatDiv: "",
};

// {"pjJpCode":"20",
// "pjJpName":"LPG 20 kg",
// "pjQty":"4",
// "pjReqty":"4",
// "pjVatDiv":"0",
// "proxyType":"0",
// "pjInkumtype":"0",
// "pjSwCode":"02",
// "pjDc":3,
// "buName":"",
// "pjMisukum":6,
// "queryType":"INITDATA",
// "pjKumSup":40,
// "signuser":"",
// "pjDanga":10,
// "pjKumVat":0,
// "pjKumack":40,
// "pjInkum":2,
// "saleState":"3",
// "pjDate":"20230822",
// "pjBigo":"",
// "pjJago":"5",
// "signkey":"",
// "areaCode":"00",
// "pjCuCode":"000-00002",
// "pjCuName":"테스트수정",
// "pjSwName":"02 사원"}
