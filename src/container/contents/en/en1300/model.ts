export interface ISANGPUM {
  areaCode: string;
  areaName: string;
  jpCode: string;
  jpGasType: string;
  jpGasuse: string;
  jpGubun: string;
  jpGubunName: string;
  jpJaegoYnName: string;
  jpKgDanwi: string;
  jpKgDanwiName: string;
  jpKind: string;
  jpKindName: string;
  jpName: string;
  jpSpec: string;
  jpUnit: string;
  jpUnitName: string;
  jpVatKind: string;
  jpKg: string;
  jpSort: string;
  jpSpecific: string;

  jpJaegoYn: string | boolean;

  jpBaedal: number;
  jpIntong: number;
  jpIndanga: number;
  jpOuttong: number;
  jpOutdanga: number;
}

export const emptyObj = {
  areaCode: "",
  areaName: "",
  jpBaedal: 0,
  jpCode: "",
  jpGasType: "",
  jpGasuse: "",
  jpGubun: "",
  jpGubunName: "",
  jpIndanga: 0,
  jpIntong: 0,
  jpJaegoYn: "",
  jpJaegoYnName: "",
  jpKg: "",
  jpKgDanwi: "",
  jpKgDanwiName: "",
  jpKind: "",
  jpKindName: "",
  jpName: "",
  jpOutdanga: 0,
  jpOuttong: 0,
  jpSort: "",
  jpSpec: "",
  jpSpecific: "",
  jpUnit: "",
  jpUnitName: "",
  jpVatKind: "",
  jpVatKindName: "",
};
