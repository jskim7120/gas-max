export interface ICM1200SEARCH {
  /* 1-1 Wrapper */
  areaCode: string;
  cuCode: string;
  cuName: string;
  cuAptnameYn: string;
  /* 1-2 Wrapper */
  chkCuZipCode: string;
  cuZipcode: string;
  cuAddr1: string;
  cuAddr2: string;
  /* 1-3 Wrapper */
  cuSwCode: string;
  cuJyCode: string;
  cuCustgubun: string;
  // 2-1 Wrapper
  chkCuRh20: string;
  cuRh2o: string;
  chkCuRdange: string;
  cuRdangaType: string;
  cuRdanga: number;
  cuRdangaSign: string;
  cuRdangaAmt: number;
  /* 2-2 Wrapper */
  chkCuAnKum: string;
  cuAnKum: any;
  ckCuSisulKum: string;
  cuSisulKum: any;
  chkCuMeterKum: string;
  cuMeterKum: any;
  /* 2-3 Wrapper */
  chkCuPer: string;
  cuPer: number;
  chkCuCdc: string;
  cuCdc: number;
  chkCuSukumtype: string;
  cuSukumtype: string;
  chkCuGumTurm: string;
  cuGumTurm: string;
  chkCuGumdate: string;
  cuGumdate: string;
  chkCuCno: string;
  cuCno: string;
  /* 3-1-1 Wrapper */
  cuTankYn: string;
  cuFinishDate: string;
  cuCircuitDate: string;
  cuScheduleDate: string;
  /* 3-3-1 Wrapper */
  cuCylinderType: string;
  cuCylinderName: string;
  cuCylinderQty: number;
  cuTransmCd: string;
  cuTransmCuCd: string;
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
  /* 3-2-4 Wrapper */
  tankMax1: string;
  tankTransmCd1: string;
  tankCuCd1: string;
  tankMax2: string;
  tankTransmCd2: string;
  tankCuCd2: string;
  /* 3-4-2 Wrapper */
  gasifyCo1: string;
  gasifyVol1: string;
  gasifySno1: string;
  gasifyMakeDate1: string;
  gasifyPower1: string;
  gasifyCheckDate1: string;
  /* 3-4-3 Wrapper */
  gasifyCo2: string;
  gasifyVol2: string;
  gasifySno2: string;
  gasifyMakeDate2: string;
  gasifyPower2: string;
  gasifyCheckDate2: string;

  cuCount: number;
  queryType: string;
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