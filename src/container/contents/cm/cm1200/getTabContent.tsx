import Tab1 from "./tab/tab1";
import Tab2 from "./tab/tab2";
import Tab3 from "./tab/tab3";

function getTabContent(
  id: number,
  register: Function,
  dataCommonDic: any,
  chkCuRh20: boolean,
  setChkCuRh20: Function,
  chkCuRdanga: boolean,
  setChkCuRdanga: Function,
  chkCuAnKum: boolean,
  setChkCuAnKum: Function,
  chkCuMeterKum: boolean,
  setChkCuMeterKum: Function,
  control: any,
  chkCuPer: boolean,
  setChkCuPer: Function,
  chkCuCdc: boolean,
  setChkCuCdc: Function,
  chkCuSukumtype: boolean,
  setChkCuSukumtype: Function,
  chkCuGumTurm: boolean,
  setChkCuGumTurm: Function,
  chkCuGumdate: boolean,
  setChkCuGumdate: Function,
  chkCuCno: boolean,
  setChkCuCno: Function,
  rdangaType: any,
  setRdangaType: Function,
  rdanga: any,
  setRdanga: Function,
  rdangaSign: any,
  setRdangaSign: Function,
  rdangaAmt: any,
  setRdangaAmt: Function,
  totalValue: any,
  setTotalValue: any,
  calcRdanga: any
) {
  switch (id) {
    case 0:
      return (
        <Tab1
          register={register}
          dataCommonDic={dataCommonDic}
          control={control}
          chkCuRh20={chkCuRh20}
          setChkCuRh20={setChkCuRh20}
          chkCuRdanga={chkCuRdanga}
          setChkCuRdanga={setChkCuRdanga}
          chkCuAnKum={chkCuAnKum}
          setChkCuAnKum={setChkCuAnKum}
          chkCuMeterKum={chkCuMeterKum}
          setChkCuMeterKum={setChkCuMeterKum}
          chkCuPer={chkCuPer}
          setChkCuPer={setChkCuPer}
          chkCuCdc={chkCuCdc}
          setChkCuCdc={setChkCuCdc}
          chkCuSukumtype={chkCuSukumtype}
          setChkCuSukumtype={setChkCuSukumtype}
          chkCuGumTurm={chkCuGumTurm}
          setChkCuGumTurm={setChkCuGumTurm}
          chkCuGumdate={chkCuGumdate}
          setChkCuGumdate={setChkCuGumdate}
          chkCuCno={chkCuCno}
          setChkCuCno={setChkCuCno}
          rdangaType={rdangaType}
          setRdangaType={setRdangaType}
          rdanga={rdanga}
          setRdanga={setRdanga}
          rdangaSign={rdangaSign}
          setRdangaSign={setRdangaSign}
          rdangaAmt={rdangaAmt}
          setRdangaAmt={setRdangaAmt}
          totalValue={totalValue}
          setTotalValue={setTotalValue}
          calcRdanga={calcRdanga}
        />
      );
    case 1:
      return (
        <Tab2
          register={register}
          dataCommonDic={dataCommonDic}
          control={control}
        />
      );
    case 2:
      return (
        <Tab3
          register={register}
          dataCommonDic={dataCommonDic}
          control={control}
        />
      );
  }
  return null;
}

export default getTabContent;
