import Tab1 from "./tab1";
import Tab2 from "./tab2";
import Tab3 from "./tab3";
import Tab4 from "./tab4";
import Tab5 from "./tab5";
import Tab6 from "./tab6";

function getTabContent(
  id: number,
  register: any,
  dataCommonDic: any,
  setAddress: any,
  control: any,
  rdangaType: string,
  setRdangaType: Function,
  rdanga: string,
  setRdanga: Function,
  rdangaSign: string,
  setRdangaSign: Function,
  rdangaAmt: string,
  setRdangaAmt: Function,
  totalValue: string,
  setTotalValue: Function,
  calcRdanga: Function,
  watch: any,
  reset: any
) {
  switch (id) {
    case 0: {
      return (
        <Tab1
          dataCommonDic={dataCommonDic}
          register={register}
          setAddress={setAddress}
          control={control}
          reset={reset}
          watch={watch}
        />
      );
    }
    case 1:
      return (
        <Tab2
          dataCommonDic={dataCommonDic}
          register={register}
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
          watch={watch}
          reset={reset}
        />
      );
    case 2:
      return (
        <Tab3
          dataCommonDic={dataCommonDic}
          register={register}
          control={control}
        />
      );
    case 3:
      return (
        <Tab4
          dataCommonDic={dataCommonDic}
          register={register}
          control={control}
        />
      );
    case 4:
      return <Tab5 register={register} />;
    case 5:
      return <Tab6 register={register} control={control} />;
  }
  return null;
}

export default getTabContent;
