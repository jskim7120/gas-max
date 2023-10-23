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
  bigo: "",
  cuCode: "",
  cuName: "",
  dc: 0,
  inkum: 0,
  inkumType: "",
  inkumtypeName: "",
  insertType: "",
  inserttypeName: "",
  jpCode: "",
  jpName: "",
  kumack: 0,
  misukum: 0,
  orderDate: "",
  pjCuName: "",
  pjDate: "",
  pjSno: "",
  pjTime: "",
  pjType: "",
  pjUserId: "",
  pjtypeName: "",
  proxyType: "",
  proxytypeName: "",
  qty: 0,
  reqty: 0,
  saleState: "",
  salestateName: "",
  swCode: "",
  swName: "",
  vatDiv: "",
};
