export interface ICM1105SEARCH {
  areaCode: string;
  areaName: string;
  cuAddr1: string;
  cuAddr2: string;
  cuAnkum: string;
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
  cuJdcName: string;
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

  //cms
  cms: ICMS;
  //virtualAccount
  virtualAccount: IVIRTUALACCOUNT;
  cuTank: ICUTANK;
}

interface ICMS {
  acctno: string;
  appdt: string;
  bankName: string;
  bigo: string;
  cmsGubun: string;
  depositor: string;
  managerNo: string;
  monthday: string;
  queryType: string;
  regDate: string;
  stateName: string;
  tel: string;
}
interface IVIRTUALACCOUNT {
  acctno: string;
  bankCd: string;
  bankName: string;
  depositor: string;
  managerCode: string;
  queryType: string;
  regDate: string;
}

interface ICUTANK {
  queryType: string;
  tankCuCd: string;
  tankFirstDate: string;
  tankInsideDate: string;
  tankMakeCo: string;
  tankMakeDate: string;
  tankMakeSno: string;
  tankMax: number;
  tankOutsideDate: string;
  tankRcv: string;
  tankSno: string;
  tankTransmCd: string;
  tankVol: number;
}
