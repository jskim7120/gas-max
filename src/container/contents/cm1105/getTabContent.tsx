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
  setSign: Function
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
        />
      );
    case 2:
      return (
        <Tab3
          dataCommonDic={dataCommonDic}
          register={register}
          errors={errors}
          reset={reset}
        />
      );
    case 3:
      return (
        <Tab4
          dataCommonDic={dataCommonDic}
          register={register}
          errors={errors}
          reset={reset}
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
