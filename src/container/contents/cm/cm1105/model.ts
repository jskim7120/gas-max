export interface ICM1105SEARCH {
  cuBaGageKum: number | undefined;
  cuBaGageM3: number | undefined;
  cuBaGageYn: string;

  //-----------
  // areaCode: string;
  areaName: string;
  cuAddr1: string;
  cuAddr2: string;
  cuAnkum: number | undefined; //2nd tab
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
  cuCdc: number | undefined; // 2nd tab
  cuCircuitDate: string;
  cuCmisu: number | undefined; //top
  cuCno: string;
  cuCode: string;
  cuCustgubun: string;
  cuCustgubunName: string;
  cuCutype: string;
  cuCutypeName: string;
  cuCylinderName: string;
  cuCylinderQty: number | undefined;
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
  cuJdc: number | undefined; //top
  //cuJdcName: number | undefined;
  cuJmisu: number | undefined; //top
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
  cuMeterM3: number | undefined; //2nd tab
  cuMeterNo: string;
  cuMeterPalceName: string;
  cuMeterPlace: string;
  cuMeterTurm: string;
  cuMeterType: string;
  cuMeterkum: number | undefined; //2nd tab
  cuName: string;
  cuNo: string;
  cuNoType: string;
  cuNoTypeName: string;
  cuPdate: string;
  cuPer: number | undefined;
  cuPipelineYn: string;
  cuPipelineYnNamm: string;
  cuRCode: string;
  cuRdanga: number | undefined;
  cuRdangaSign: string;
  cuRdangaType: string;
  cuRequestType: string;
  cuRequestTypeName: string;
  cuRh2O: string;
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
  cuSisulkum: number | undefined;
  cuSisulyn: string;
  cuSmsDate: string;
  cuSmsHp: string;
  cuSmsMemo: string;
  cuSmsYn: string;
  cuStae: string;
  cuStaeName: string;
  cuSukumtype: string;
  cuSukumtypeName: string;
  cuSvKumack: number | string; //2nd tab
  cuSwCode: string;
  cuSzipcode: string;
  cuTankYn: string;
  cuTel: string;
  cuTel21: string;
  cuTel22: string;
  cuTel23: string;
  cuTel24: string;
  cuTongkum: number | undefined;
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
  tankMax1: number | undefined;
  tankMax2: number | undefined;
  tankOutsideDate1: string;
  tankOutsideDate2: string;
  tankRcv1: string;
  tankRcv2: string;
  tankSno1: string;
  tankSno2: string;
  tankTransmCd1: string;
  tankTransmCd2: string;
  tankVol1: number | undefined;
  tankVol2: number | undefined;
  percentage: number | undefined;
  //cms: ICMS;
  //virtualAccount: IVIRTUALACCOUNT;
  CMSacctno: string; //davhtsaj bn
  appdt: string;
  CMSbankName: string; //davhtsaj bn
  bigo: string;
  cmsGubun: string;
  CMSdepositor: string; //davhtsaj bn
  managerNo: string;
  monthday: string;
  CMSregDate: string; //davhtsaj bn
  stateName: string;
  tel: string;
  VIRacctno: string; //davhtsaj bn
  bankCd: string;
  VIRbankName: string; //davhtsaj bn
  VIRdepositor: string; //davhtsaj bn
  managerCode: string;
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

export const emptyObj = {
  cuBaGageKum: undefined,
  cuBaGageM3: undefined,
  cuBaGageYn: "",
  //--------------------
  // areaCode: "",
  areaName: "",
  cuAddr1: "",
  cuAddr2: "",
  cuAnkum: undefined, // 2nd tab
  cuBarcode: "",
  cuBigo1: "",
  cuBigo2: "",
  cuBilltype: "",
  cuBilltypeName: "",
  cuBlockYn: "",
  cuBlockYnName: "",
  cuBoilerName: "",
  cuBoilerYn: "",
  cuCashpayDate: "",
  cuCashpayMemo: "",
  cuCashpayNo: "",
  cuCashpayYn: "",
  cuCdc: undefined, // 2nd tab
  cuCircuitDate: "",
  cuCmisu: undefined, //top
  cuCno: "",
  //cuCode: "",
  cuCustgubun: "",
  cuCustgubunName: "",
  cuCutype: "",
  cuCutypeName: "",
  cuCylinderName: "",
  cuCylinderQty: undefined,
  cuCylinderType: "",
  cuDepartment: "",
  cuDepartment2: "",
  cuExtendDate: "",
  cuExtendType: "",
  cuExtendTypeName: "",
  cuFinishDate: "",
  cuGongdate: "",
  cuGongdateT: "",
  cuGongname: "",
  cuGongno: "",
  cuGongsano: "",
  cuGumTurm: "",
  cuGumTurmName: "",
  cuGumdate: "",
  cuGumsa: "",
  cuGumsaName: "",
  cuHdate: "",
  cuHp: "",
  cuJangbuYn: "",
  cuJdc: undefined,
  //cuJdcName: "",
  cuJmisu: undefined,
  cuJongmok: "",
  cuJuminno: "",
  cuJyCode: "",
  cuJyName: "",
  cuMTransmCd: "",
  cuMdate: "",
  cuMemo: "",
  cuMeterCo: "",
  cuMeterDt: "",
  cuMeterFeture: "",
  cuMeterFetureName: "",
  cuMeterLr: "",
  cuMeterLrName: "",
  cuMeterM3: undefined,
  cuMeterNo: "",
  cuMeterPalceName: "",
  cuMeterPlace: "",
  cuMeterTurm: "",
  cuMeterType: "",
  cuMeterkum: undefined,
  cuName: "",
  cuNo: "",
  cuNoType: "",
  cuNoTypeName: "",
  cuPdate: "",
  cuPer: undefined,
  cuPipelineYn: "",
  cuPipelineYnNamm: "",
  cuRCode: "",
  cuRdanga: undefined,
  cuRdangaSign: "",
  cuRdangaType: "",
  cuRequestType: "",
  cuRequestTypeName: "",
  cuRh2o: "",
  cuRoundType: "",
  cuRoundTypeName: "",
  cuSaddr1: "",
  cuSaddr2: "",
  cuSajang: "",
  cuSangho: "",
  cuScheduleDate: "",
  cuSeEmail: "",
  cuSeEmail2: "",
  cuSeFaxNo: "",
  cuSeFaxYn: "",
  cuSeListYn: "",
  cuSeSawon: "",
  cuSeSawon2: "",
  cuSeSmsNo: "",
  cuSeSmsYn: "",
  cuSekumDate: "",
  cuSekumMm: "",
  cuSekumMmName: "",
  cuSekumyn: "",
  cuSisuldate: "",
  cuSisulkum: undefined,
  cuSisulyn: "",
  cuSmsDate: "",
  cuSmsHp: "",
  cuSmsMemo: "",
  cuSmsYn: "",
  cuStae: "",
  cuStaeName: "",
  cuSukumtype: "",
  cuSukumtypeName: "",
  cuSvKumack: "",
  cuSwCode: "",
  cuSzipcode: "",
  cuTankYn: "",
  cuTel: "",
  cuTel21: "",
  cuTel22: "",
  cuTel23: "",
  cuTel24: "",
  cuTongkum: undefined,
  cuTransmCd: "",
  cuTransmCuCd: "",
  cuType: "",
  cuTypeName: "",
  cuUptae: "",
  cuUsername: "",
  cuUsersisul: "",
  cuUsersisulName: "",
  cuUsertong: "",
  cuUsertongName: "",
  cuVatKind: "",
  cuVatName: "",
  cuWaterName: "",
  cuWaterYn: "",
  cuZipcode: "",
  emailKind: "",
  emailKind2: "",
  queryType: "",
  saupSanghoName: "",
  swName: "",
  tCustCode: "",
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
  tankMax1: undefined,
  tankMax2: undefined,
  tankOutsideDate1: "",
  tankOutsideDate2: "",
  tankRcv1: "",
  tankRcv2: "",
  tankSno1: "",
  tankSno2: "",
  tankTransmCd1: "",
  tankTransmCd2: "",
  tankVol1: undefined,
  tankVol2: undefined,
  percentage: undefined,
  CMSacctno: "", //davhtsaj bn
  appdt: "",
  CMSbankName: "", //davhtsaj bn
  bigo: "",
  cmsGubun: "",
  CMSdepositor: "", //davhtsaj bn
  managerNo: "",
  monthday: "",
  CMSregDate: "", //davhtsaj bn
  stateName: "",
  tel: "",
  VIRacctno: "", //davhtsaj bn
  bankCd: "",
  VIRbankName: "", //davhtsaj bn
  VIRdepositor: "", //davhtsaj bn
  managerCode: "",
  VIRregDate: "", //davhtsaj bn
};
