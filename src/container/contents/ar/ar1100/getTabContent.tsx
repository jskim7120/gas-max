import Tab1 from "./tabs/tab1/tab1";

function getTabContent(
  id: number,
  data: any,
  selected: any,
  dictionary: any,
  isAddBtnClicked: boolean,
  setIsAddBtnClicked: Function,
  areaCode: string,
  fetchData: Function,
  menuId: string,
  tabRef: any
) {
  switch (id) {
    case 0:
      return (
        <Tab1
          areaCode={areaCode}
          data={data}
          dictionary={dictionary}
          isAddBtnClicked={isAddBtnClicked}
          setIsAddBtnClicked={setIsAddBtnClicked}
          fetch={fetch}
          selected={selected}
          menuId={menuId}
          ref={tabRef}
        />
      );
    case 1:
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
