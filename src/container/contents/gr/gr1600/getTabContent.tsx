import Tab1 from "./tab1/tab1";
import Tab2 from "./tab2/tab2";
import Tab3 from "./tab3/tab3";

function getTabContent(
  id: number,
  register: any,
  errors: any,
  tabData: any,
  selected: any
) {
  switch (id) {
    case 0:
      return <Tab1 register={register} errors={errors} tabData={tabData} />;
    case 1:
      return <Tab2 buCode={selected?.buCode} />;
    case 2:
      return <Tab3 register={register} errors={errors} />;
  }
  return null;
}

export default getTabContent;
