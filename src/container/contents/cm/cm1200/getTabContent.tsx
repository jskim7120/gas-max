import Tab1 from "./tab/tab1";
import Tab2 from "./tab/tab2";
import Tab3 from "./tab/tab3";

function getTabContent(
  id: number,
  register: Function,
  reset: Function,
  watch: Function,
  dataCommonDic: any,
  control: any,
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
          watch={watch}
          dataCommonDic={dataCommonDic}
          control={control}
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
          reset={reset}
          watch={watch}
          dataCommonDic={dataCommonDic}
          control={control}
        />
      );
    case 2:
      return (
        <Tab3
          register={register}
          reset={reset}
          watch={watch}
          dataCommonDic={dataCommonDic}
          control={control}
        />
      );
  }
  return null;
}

export default getTabContent;
