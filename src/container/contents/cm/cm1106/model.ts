export interface ICM1106 {
  areaCode: string;
  areaName: string;
  custIn: string;
  custOut: string;
  jcBasicJaego: string;
  jcCuCode: string;
  jcCuName: string;
  jcDangaType: string;
  jcDangaTypeName: string;
  jcJdcAmt: number;
  jcJdcPer: string;
  jcJpCode: string;
  jcJpDanga: number;
  jcJpName: string;
  jcJpSateName: string;
  jcJpSpec: string;
  jcJpState: string;
  jcVatKind: string;
  jcVatKindName: string;
}

export interface ISEARCH {
  areaCode: string;
  jcCuCode: string;
  jcCuName: string;
}

export const emptyObj = {
  areaCode: "",
  areaName: "",
  custIn: "",
  custOut: "",
  jcBasicJaego: "",
  jcCuCode: "",
  jcCuName: "",
  jcDangaType: "",
  jcDangaTypeName: "",
  jcJdcAmt: 0,
  jcJdcPer: "",
  jcJpCode: "",
  jcJpDanga: 0,
  jcJpName: "",
  jcJpSateName: "",
  jcJpSpec: "",
  jcJpState: "",
  jcVatKind: "",
  jcVatKindName: "",
};
