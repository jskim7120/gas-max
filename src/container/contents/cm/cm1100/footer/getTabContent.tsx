import Tab1 from "./tab1";
import Tab2 from "./tab2";
import Tab3 from "./tab3";

function getTabContent(id: number, data: any, selected: any) {
  switch (id) {
    case 0:
      return <Tab1 data={data} selected={selected} />;
    case 1:
      return <Tab2 data={data} />;
    case 2:
      return <Tab3 data={data} />;
  }
  return null;
}

export default getTabContent;
