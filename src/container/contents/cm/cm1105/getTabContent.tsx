import Tab1 from "./tab1";
import Tab2 from "./tab2";
import Tab3 from "./tab3";
import Tab4 from "./tab4";
import Tab5 from "./tab5";
import Tab6 from "./tab6";

function getTabContent(
  id: number,
  customerInfo: any,
  register: any,
  errors: any,
  dataCommonDic: any,
  setAddress: any,
  reset: any,
  too: number,
  setToo: Function,
  sign: string,
  setSign: Function,
  //setCuRdangaType: any,
  setCuMeterTurm: any,
  setCuMeterDt: any,
  setCuMdate: any,
  //cuRdangaType: string,
  cuMeterTurm: string,
  cuMeterDt: string,
  cuMdate: string,
  setCuFinishDate: any,
  setCuCircuitDate: any,
  setCuScheduleDate: any,
  setTankFirstDate1: any,
  setTankOutsideDate1: any,
  setTankInsideDate1: any,
  setTankFirstDate2: any,
  setTankOutsideDate2: any,
  setTankInsideDate2: any,
  setGasifyCheckDate1: any,
  cuFinishDate: string,
  cuCircuitDate: string,
  cuScheduleDate: string,
  tankFirstDate1: string,
  tankOutsideDate1: string,
  tankInsideDate1: string,
  tankFirstDate2: string,
  tankOutsideDate2: string,
  tankInsideDate2: string,
  gasifyCheckDate1: string,

  cuHdate: string,
  setCuHdate: any,
  cuGongdate: string,
  setCuGongdate: any,
  cuGongdateT: string,
  setCuGongdateT: any,
  cuExtendDate: string,
  setCuExtendDate: any,
  cuSisuldate: string,
  setCuSisuldate: any,
  cuPdate: string,
  setCuPdate: any
) {
  switch (id) {
    case 0: {
      return (
        <Tab1
          dataCommonDic={dataCommonDic}
          register={register}
          errors={errors}
          setAddress={setAddress}
        />
      );
    }
    case 1:
      return (
        <Tab2
          customerInfo={customerInfo}
          dataCommonDic={dataCommonDic}
          register={register}
          errors={errors}
          too={too}
          setToo={setToo}
          sign={sign}
          setSign={setSign}
          reset={reset}
          //setCuRdangaType={setCuRdangaType}
          setCuMeterTurm={setCuMeterTurm}
          setCuMeterDt={setCuMeterDt}
          setCuMdate={setCuMdate}
          //cuRdangaType={cuRdangaType}
          cuMeterTurm={cuMeterTurm}
          cuMeterDt={cuMeterDt}
          cuMdate={cuMdate}
        />
      );
    case 2:
      return (
        <Tab3
          dataCommonDic={dataCommonDic}
          register={register}
          errors={errors}
          reset={reset}
          setCuFinishDate={setCuFinishDate}
          setCuCircuitDate={setCuCircuitDate}
          setCuScheduleDate={setCuScheduleDate}
          setTankFirstDate1={setTankFirstDate1}
          setTankOutsideDate1={setTankOutsideDate1}
          setTankInsideDate1={setTankInsideDate1}
          setTankFirstDate2={setTankFirstDate2}
          setTankOutsideDate2={setTankOutsideDate2}
          setTankInsideDate2={setTankInsideDate2}
          setGasifyCheckDate1={setGasifyCheckDate1}
          cuFinishDate={cuFinishDate}
          cuCircuitDate={cuCircuitDate}
          cuScheduleDate={cuScheduleDate}
          tankFirstDate1={tankFirstDate1}
          tankOutsideDate1={tankOutsideDate1}
          tankInsideDate1={tankInsideDate1}
          tankFirstDate2={tankFirstDate2}
          tankOutsideDate2={tankOutsideDate2}
          tankInsideDate2={tankInsideDate2}
          gasifyCheckDate1={gasifyCheckDate1}
        />
      );
    case 3:
      return (
        <Tab4
          dataCommonDic={dataCommonDic}
          register={register}
          errors={errors}
          reset={reset}
          cuHdate={cuHdate}
          setCuHdate={setCuHdate}
          cuGongdate={cuGongdate}
          setCuGongdate={setCuGongdate}
          cuGongdateT={cuGongdateT}
          setCuGongdateT={setCuGongdateT}
          cuExtendDate={cuExtendDate}
          setCuExtendDate={setCuExtendDate}
          cuSisuldate={cuSisuldate}
          setCuSisuldate={setCuSisuldate}
          cuPdate={cuPdate}
          setCuPdate={setCuPdate}
        />
      );
    case 4:
      return <Tab5 register={register} errors={errors} />;
    case 5:
      return <Tab6 register={register} errors={errors} reset={reset} />;
  }
  return null;
}

export default getTabContent;
