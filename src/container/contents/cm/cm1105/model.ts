export interface ICM1105SEARCH {
  areaCode: string;
  areaName: string;
  cuAddr1: string;
  cuAddr2: string;
  cuAnkum: number;
  cuBarcode: string;
  cuBigo1: string;
  cuBigo2: string;
  cuBilltype: string;
  cuBilltypeName: string;
  cuBlockYn: string;
  cuBlockYnName: string;
  cuBoilerName: string;
  cuBoilerYn: string;
  cuCashpayDate: string;
  cuCashpayMemo: string;
  cuCashpayNo: string;
  cuCashpayYn: string;
  cuCdc: number;
  cuCircuitDate: string;
  cuCmisu: number;
  cuCno: string;
  cuCode: string;
  cuCustgubun: string;
  cuCustgubunName: string;
  cuCutype: string;
  cuCutypeName: string;
  cuCylinderName: string;
  cuCylinderQty: string;
  cuCylinderType: string;
  cuDepartment: string;
  cuDepartment2: string;
  cuExtendDate: string;
  cuExtendType: string;
  cuExtendTypeName: string;
  cuFinishDate: string;
  cuGongdate: string;
  cuGongdateT: string;
  cuGongname: string;
  cuGongno: string;
  cuGongsano: string;
  cuGumTurm: string;
  cuGumTurmName: string;
  cuGumdate: string;
  cuGumsa: string;
  cuGumsaName: string;
  cuHdate: string;
  cuHp: string;
  cuJangbuYn: string;
  cuJdc: number;
  cuJdcName: number;
  cuJmisu: number;
  cuJongmok: string;
  cuJuminno: string;
  cuJyCode: string;
  cuJyName: string;
  cuMTransmCd: string;
  cuMdate: string;
  cuMemo: string;
  cuMeterCo: string;
  cuMeterDt: string;
  cuMeterFeture: string;
  cuMeterFetureName: string;
  cuMeterLr: string;
  cuMeterLrName: string;
  cuMeterM3: number;
  cuMeterNo: string;
  cuMeterPalceName: string;
  cuMeterPlace: string;
  cuMeterTurm: string;
  cuMeterType: string;
  cuMeterkum: number;
  cuName: string;
  cuNo: string;
  cuNoType: string;
  cuNoTypeName: string;
  cuPdate: string;
  cuPer: number;
  cuPipelineYn: string;
  cuPipelineYnNamm: string;
  cuRCode: string;
  cuRdanga: number;
  cuRdangaSign: string;
  cuRdangaType: string;
  cuRequestType: string;
  cuRequestTypeName: string;
  cuRh2o: string;
  cuRoundType: string;
  cuRoundTypeName: string;
  cuSaddr1: string;
  cuSaddr2: string;
  cuSajang: string;
  cuSangho: string;
  cuScheduleDate: string;
  cuSeEmail: string;
  cuSeEmail2: string;
  cuSeFaxNo: string;
  cuSeFaxYn: string;
  cuSeListYn: string;
  cuSeSawon: string;
  cuSeSawon2: string;
  cuSeSmsNo: string;
  cuSeSmsYn: string;
  cuSekumDate: string;
  cuSekumMm: string;
  cuSekumMmName: string;
  cuSekumyn: string;
  cuSisuldate: string;
  cuSisulkum: number;
  cuSisulyn: string;
  cuSmsDate: string;
  cuSmsHp: string;
  cuSmsMemo: string;
  cuSmsYn: string;
  cuStae: string;
  cuStaeName: string;
  cuSukumtype: string;
  cuSukumtypeName: string;
  cuSvKumack: number;
  cuSwCode: string;
  cuSzipcode: string;
  cuTankYn: string;
  cuTel: string;
  cuTel21: string;
  cuTel22: string;
  cuTel23: string;
  cuTel24: string;
  cuTongkum: number;
  cuTransmCd: string;
  cuTransmCuCd: string;
  cuType: string;
  cuTypeName: string;
  cuUptae: string;
  cuUsername: string;
  cuUsersisul: string;
  cuUsersisulName: string;
  cuUsertong: string;
  cuUsertongName: string;
  cuVatKind: string;
  cuVatName: string;
  cuWaterName: string;
  cuWaterYn: string;
  cuZipcode: string;
  emailKind: string;
  emailKind2: string;
  queryType: string;
  saupSanghoName: string;
  swName: string;
  tCustCode: string;

  //cuTank: ICUTANK;
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
  //queryType: string;
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

  //cms: ICMS;
  //virtualAccount: IVIRTUALACCOUNT;
  percentage: number;

  CMSacctno: string; //davhtsaj bn
  appdt: string;
  CMSbankName: string; //davhtsaj bn
  bigo: string;
  cmsGubun: string;
  CMSdepositor: string; //davhtsaj bn
  managerNo: string;
  monthday: string;
  //queryType: string;
  CMSregDate: string; //davhtsaj bn
  stateName: string;
  tel: string;

  VIRacctno: string; //davhtsaj bn
  bankCd: string;
  VIRbankName: string; //davhtsaj bn
  VIRdepositor: string; //davhtsaj bn
  managerCode: string;
  //queryType: string;
  VIRregDate: string; //davhtsaj bn
}

{
  /*
interface ICMS {
 
}
interface IVIRTUALACCOUNT {
  VIRacctno: string; //davhtsaj bn
  bankCd: string;
  VIRbankName: string; //davhtsaj bn
  VIRdepositor: string; //davhtsaj bn
  managerCode: string;
  queryType: string;
  VIRregDate: string; //davhtsaj bn
}
*/
}
