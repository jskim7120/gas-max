import Tab1 from "./tabs/tab1";
// import Tab2 from "./tab2";
// import Tab3 from "./tab3";

function getTabContent(id: number, data: any, dictionary: any) {
  switch (id) {
    case 0:
      return <Tab1 data={data} dictionary={dictionary} />;
    case 1:
      //   return <Tab2 data={data} />;
      return <>1</>;
    case 2:
      //   return <Tab3 data={data} />;
      return <>2</>;
    case 3:
      //   return <Tab3 data={data} />;
      return <>3</>;
    case 4:
      //   return <Tab3 data={data} />;
      return <>4</>;
    case 5:
      //   return <Tab3 data={data} />;
      return <>5</>;
    case 6:
      //   return <Tab3 data={data} />;
      return <>6</>;
  }
  return null;
}

export default getTabContent;
