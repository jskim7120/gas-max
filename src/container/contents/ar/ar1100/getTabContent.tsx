import Tab1 from "./tabs/tab1";
import Tab2 from "./tabs/tab2";
import Tab3 from "./tabs/tab3";

function getTabContent(
  tabId: number,
  data: any,
  data65: any,
  dictionary: any,
  isAddBtnClicked: boolean,
  handleSubmit: Function,
  submit: Function,
  menuId: string,
  tabRef1: any,
  tabRef2: any,
  tabRef3: any,
  addBtnUnClick: Function,
  jpKind: any,
  setJpKind: Function,
  junJaego: number,
  setJunJaego: Function,
  qty: number,
  setQty: Function,
  reqty: number,
  setReqty: Function,
  danga: number,
  setDanga: Function,
  vatDiv: string,
  setVatDiv: Function,
  kumSup: number,
  setKumSup: Function,
  kumVat: number,
  setKumVat: Function,
  kumack: number,
  setKumack: Function,
  inkum: number,
  setInkum: Function,
  dc: number,
  setDc: Function,
  misu: number,
  setMisu: Function,
  gubun: string,
  setGubun: Function
) {
  switch (tabId) {
    case 0:
      return (
        <Tab1
          tabId={tabId}
          data={data}
          data65={data65}
          dictionary={dictionary}
          isAddBtnClicked={isAddBtnClicked}
          handleSubmitParent={handleSubmit}
          submitParent={submit}
          ref={tabRef1}
          addBtnUnClick={addBtnUnClick}
          jpKind={jpKind}
          setJpKind={setJpKind}
          junJaego={junJaego}
          setJunJaego={setJunJaego}
          qty={qty}
          setQty={setQty}
          reqty={reqty}
          setReqty={setReqty}
          danga={danga}
          setDanga={setDanga}
        />
      );
    case 1:
      return (
        <Tab2
          tabId={tabId}
          data={data}
          data65={data65}
          dictionary={dictionary}
          isAddBtnClicked={isAddBtnClicked}
          handleSubmitParent={handleSubmit}
          submitParent={submit}
          ref={tabRef2}
          addBtnUnClick={addBtnUnClick}
          junJaego={junJaego}
          setJunJaego={setJunJaego}
          qty={qty}
          setQty={setQty}
          reqty={reqty}
          setReqty={setReqty}
          danga={danga}
          setDanga={setDanga}
        />
      );
    case 2:
      return (
        <Tab3
          tabId={tabId}
          data={data}
          data65={data65}
          dictionary={dictionary}
          isAddBtnClicked={isAddBtnClicked}
          handleSubmitParent={handleSubmit}
          submitParent={submit}
          ref={tabRef3}
          addBtnUnClick={addBtnUnClick}
          qty={qty}
          setQty={setQty}
          danga={danga}
          setDanga={setDanga}
          vatDiv={vatDiv}
          setVatDiv={setVatDiv}
          kumSup={kumSup}
          setKumSup={setKumSup}
          kumVat={kumVat}
          setKumVat={setKumVat}
          kumack={kumack}
          setKumack={setKumack}
          inkum={inkum}
          setInkum={setInkum}
          dc={dc}
          setDc={setDc}
          misu={misu}
          setMisu={setMisu}
          gubun={gubun}
          setGubun={setGubun}
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
