import Tab1 from "./tabs/tab1";
import Tab2 from "./tabs/tab2";
import Tab3 from "./tabs/tab3";

function getTabContent(
  tabId: number,
  data: any,
  setData: Function,
  data65: any,
  selected: any,
  dictionary: any,
  isAddBtnClicked: boolean,
  areaCode: string,
  handleSubmit: Function,
  submit: Function,
  menuId: string,
  tabRef1: any,
  tabRef2: any,
  tabRef3: any,
  addBtnUnClick: Function,
  jpKind: any,
  setJpKind: Function
) {
  switch (tabId) {
    case 0:
      return (
        <Tab1
          tabId={tabId}
          areaCode={areaCode}
          data={data}
          data65={data65}
          dictionary={dictionary}
          isAddBtnClicked={isAddBtnClicked}
          handleSubmitParent={handleSubmit}
          submitParent={submit}
          selected={selected}
          menuId={menuId}
          ref={tabRef1}
          addBtnUnClick={addBtnUnClick}
          jpKind={jpKind}
          setJpKind={setJpKind}
        />
      );
    case 1:
      return (
        <Tab2
          tabId={tabId}
          areaCode={areaCode}
          data={data}
          data65={data65}
          dictionary={dictionary}
          isAddBtnClicked={isAddBtnClicked}
          handleSubmitParent={handleSubmit}
          submitParent={submit}
          selected={selected}
          menuId={menuId}
          ref={tabRef2}
          addBtnUnClick={addBtnUnClick}
        />
      );
    case 2:
      return (
        <Tab3
          tabId={tabId}
          areaCode={areaCode}
          data={data}
          data65={data65}
          dictionary={dictionary}
          isAddBtnClicked={isAddBtnClicked}
          handleSubmitParent={handleSubmit}
          submitParent={submit}
          selected={selected}
          menuId={menuId}
          ref={tabRef3}
          addBtnUnClick={addBtnUnClick}
        />
      );
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
