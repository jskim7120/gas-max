import Tab1 from "./tabs/tab1";
import Tab2 from "./tabs/tab2";

function getTabContent(
  id: number,
  data: any,
  data65: any,
  selected: any,
  dictionary: any,
  isAddBtnClicked: boolean,
  areaCode: string,
  fetchData: Function,
  menuId: string,
  tabRef1: any,
  tabRef2: any,
  addBtnUnClick: Function
) {
  switch (id) {
    case 0:
      return (
        <Tab1
          areaCode={areaCode}
          data={data65}
          dictionary={dictionary}
          isAddBtnClicked={isAddBtnClicked}
          fetchData={fetchData}
          selected={selected}
          menuId={menuId}
          ref={tabRef1}
          addBtnUnClick={addBtnUnClick}
        />
      );
    case 1:
      return (
        <Tab2
          areaCode={areaCode}
          data={data65}
          dictionary={dictionary}
          isAddBtnClicked={isAddBtnClicked}
          fetchData={fetchData}
          selected={selected}
          menuId={menuId}
          ref={tabRef2}
          addBtnUnClick={addBtnUnClick}
        />
      );
    case 2:
      //   return <Tab3 data={data} />;
      return <>3</>;
    case 3:
      //   return <Tab3 data={data} />;
      return <>4</>;
    case 4:
      //   return <Tab3 data={data} />;
      return <>5</>;
    case 5:
      //   return <Tab3 data={data} />;
      return <>6</>;
    case 6:
      //   return <Tab3 data={data} />;
      return <>7</>;
  }
  return null;
}

export default getTabContent;
