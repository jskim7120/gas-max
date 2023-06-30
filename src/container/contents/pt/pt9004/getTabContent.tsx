import Tab1 from "./tab/tab1";
import Tab2 from "./tab/tab2";
import Tab3 from "./tab/tab3";

function getTabContent(
  id: number,
  register: any,
  dataCommonDic: any,
  data: any,
  control: any
) {
  switch (id) {
    case 0:
      return (
        <Tab1
          register={register}
          dataCommonDic={dataCommonDic}
          control={control}
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
