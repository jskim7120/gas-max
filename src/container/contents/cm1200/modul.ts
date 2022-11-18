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
  cuRh20: string;
  chkCuRdange: string;
  cuRdangaType: string;
  cuRdangaSign: string;
  cuRdangaAmt: number;

  cuGumTurm: string;
  cuCylinderType: null;
  cuTransmCuCd: null;
  cuScheduleDate: null;
  cuGumdate: null;
  cuAnkum: number;
  cuCylinderName: null;
  cuCylinderQty: null;
  cuFinishDate: null;
  cuMeterkum: number;
  cuTankYn: string;
  cuSisulkum: number;
  cuRdanga: number;
  cuPer: number;
  cuCircuitDate: null;
  cuCount: number;
  queryType: string;
  cuTransmCd: null;
  cuCdc: string;
  cuSukumtype: string;
  cuCno: string;
}

export interface ICM1200GRID {}
