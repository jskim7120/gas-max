export interface ISEARCH {
  areaCode: string;
  sCuName: string;
  dataChk: boolean;
}

export interface ICM1200SEARCH {
  areaCode: string;
  cuAddr1: string;
  cuAddr2: string;
  cuAnkum: number | null | undefined;
  cuAptnameYn: string;
  cuBaGageKum: number | undefined;
  cuBaGageM3: number | undefined;
  cuBaGageYn: string;
  cuCdc: number | null | undefined;
  cuCircuitDate: string;
  cuCno: string;
  cuCode: string;
  cuCount: number | undefined;
  cuCustgubun: string;
  cuCylinderName: string;
  cuCylinderQty: number | undefined;
  cuCylinderType: string;
  cuFinishDate: string;
  cuGumTurm: string;
  cuGumdate: string;
  cuJyCode: string;
  cuMeterkum: number | undefined;
  cuName: string;
  cuPer: number | undefined;
  cuRdanga: number | undefined;
  cuRdangaAmt: number | undefined;
  cuRdangaSign: string;
  cuRdangaType: string;
  cuRh2O: string;
  cuScheduleDate: string;
  // cuSisulkum: number;
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
  seq: number | undefined;
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

  //checkbox talbaruud---------------------
  chkCuZipCode: boolean;
  chkCuRh20: boolean;
  chkCuRdanga: boolean;
  chkCuAnKum: boolean;
  chkCuMeterKum: boolean;
  chkCuPer: boolean;
  chkCuCdc: boolean;
  chkCuSukumtype: boolean;
  chkCuGumTurm: boolean;
  chkCuGumdate: boolean;
  chkCuCno: boolean;
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
  cuStaeName: string;
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

export const emptyObj = {
  areaCode: "",
  cuAddr1: "",
  cuAddr2: "",
  cuAnkum: null,
  cuAptnameYn: "",
  cuBaGageKum: undefined,
  cuBaGageM3: undefined,
  cuBaGageYn: "",
  cuCdc: null,
  cuCircuitDate: "",
  cuCno: "",
  cuCode: "",
  cuCount: undefined,
  cuCustgubun: "",
  cuCylinderName: "",
  cuCylinderQty: undefined,
  cuCylinderType: "",
  cuFinishDate: "",
  cuGumTurm: "",
  cuGumdate: "",
  cuJyCode: "",
  cuMeterkum: undefined,
  cuName: "",
  cuPer: undefined,
  cuRdanga: undefined,
  cuRdangaAmt: undefined,
  cuRdangaSign: "",
  cuRdangaType: "",
  cuRh2O: "",
  cuScheduleDate: "",
  // cuSisulkum:"",
  cuSukumtype: "",
  cuSwCode: "",
  cuTankYn: "",
  cuTransmCd: "",
  cuTransmCuCd: "",
  cuZipcode: "",
  gasifyCheckDate1: "",
  gasifyCheckDate2: "",
  gasifyCo1: "",
  gasifyCo2: "",
  gasifyMakeDate1: "",
  gasifyMakeDate2: "",
  gasifyPower1: "",
  gasifyPower2: "",
  gasifySno1: "",
  gasifySno2: "",
  gasifyVol1: "",
  gasifyVol2: "",
  queryType: "",
  seq: undefined,
  tankCuCd1: "",
  tankCuCd2: "",
  tankFirstDate1: "",
  tankFirstDate2: "",
  tankInsideDate1: "",
  tankInsideDate2: "",
  tankMakeCo1: "",
  tankMakeCo2: "",
  tankMakeDate1: "",
  tankMakeDate2: "",
  tankMakeSno1: "",
  tankMakeSno2: "",
  tankMax1: "",
  tankMax2: "",
  tankOutsideDate1: "",
  tankOutsideDate2: "",
  tankRcv1: "",
  tankRcv2: "",
  tankSno1: "",
  tankSno2: "",
  tankTransmCd1: "",
  tankTransmCd2: "",
  tankVol1: "",
  tankVol2: "",

  chkCuZipCode: false,
  chkCuRh20: false,
  chkCuRdanga: false,
  chkCuAnKum: false,
  chkCuMeterKum: false,
  chkCuPer: false,
  chkCuCdc: false,
  chkCuSukumtype: false,
  chkCuGumTurm: false,
  chkCuGumdate: false,
  chkCuCno: false,
} as ICM1200SEARCH;
