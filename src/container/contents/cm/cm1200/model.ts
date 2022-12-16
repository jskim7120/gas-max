export interface ISEARCH {
  areaCode: string;
  sCuName: string;
  dataChk: string;
}

export interface ICM1200SEARCH {
  areaCode: string;
  cuAddr1: string;
  cuAddr2: string;
  cuAnkum: number;
  cuAptnameYn: string;
  cuCdc: number;
  cuCircuitDate: string;
  cuCno: string;
  cuCode: string;
  cuCount: number;
  cuCustgubun: string;
  cuCylinderName: string;
  cuCylinderQty: number;
  cuCylinderType: string;
  cuFinishDate: string;
  cuGumTurm: string;
  cuGumdate: string;
  cuJyCode: string;
  cuMeterkum: number;
  cuName: string;
  cuPer: number;
  cuRdanga: number;
  cuRdangaAmt: number;
  cuRdangaSign: string;
  cuRdangaType: string;
  cuRh2o: string;
  cuScheduleDate: string;
  cuSisulkum: number;
  cuSukumtype: string;
  cuSwCode: string;
  cuTankYn: string;
  cuTransmCd: string;
  cuTransmCuCd: string;
  cuZipcode: string;
  gasifyCheckDate1: string;
  gasifyCheckDate2: string;
  gasifyCo1: string;
  gasifyCo2: string;
  gasifyMakeDate1: string;
  gasifyMakeDate2: string;
  gasifyPower1: string;
  gasifyPower2: string;
  gasifySno1: string;
  gasifySno2: string;
  gasifyVol1: string;
  gasifyVol2: string;
  queryType: string;
  seq: number;
  tankCuCd1: string;
  tankCuCd2: string;
  tankFirstDate1: string;
  tankFirstDate2: string;
  tankInsideDate1: string;
  tankInsideDate2: string;
  tankMakeCo1: string;
  tankMakeCo2: string;
  tankMakeDate1: string;
  tankMakeDate2: string;
  tankMakeSno1: string;
  tankMakeSno2: string;
  tankMax1: string;
  tankMax2: string;
  tankOutsideDate1: string;
  tankOutsideDate2: string;
  tankRcv1: string;
  tankRcv2: string;
  tankSno1: string;
  tankSno2: string;
  tankTransmCd1: string;
  tankTransmCd2: string;
  tankVol1: string;
  tankVol2: string;
}

export interface ICM1200GRID {}

export interface CM120065 {
  tankMakeCo1: string;
  tankVol1: string;
  tankMakeSno1: string;
  tankMakeDate1: string;
  tankRcv1: string;
  tankFirstDate1: string;
  tankOutsideDate1: string;
  tankInsideDate1: string;

  tankMakeCo2: string;
  tankVol2: string;
  tankMakeSno2: string;
  tankMakeDate2: string;
  tankRcv2: string;
  tankFirstDate2: string;
  tankOutsideDate2: string;
  tankInsideDate2: string;
}

export interface ICM120065USERINFO {
  cuAnkum: number;
  cuCdc: number;
  cuCmisu: number;
  cuCode: string;
  cuJungumdate: string;
  cuPer: number;
  cuRdanga: number;
  cuRdangaType: string;
  cuRdangaTypeName: string;
  cuStae: string;
  cuSukumtype: string;
  cuTel: string;
  cuUsernam: string;
  queryType: string;
}

export interface ICM120065SUPPLYTYPE {
  /* 3-2-2 Wrapper */
  tankMakeCo1: string;
  tankVol1: string;
  tankMakeSno1: string;
  tankMakeDate1: string;
  tankRcv1: string;
  tankFirstDate1: string;
  tankOutsideDate1: string;
  tankInsideDate1: string;
  /* 3-2-3 Wrapper */
  tankMakeCo2: string;
  tankVol2: string;
  tankMakeSno2: string;
  tankMakeDate2: string;
  tankRcv2: string;
  tankFirstDate2: string;
  tankOutsideDate2: string;
  tankInsideDate2: string;
}
