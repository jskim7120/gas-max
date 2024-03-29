import Tab1 from "./tabs/tab1";
import Tab2 from "./tabs/tab2";
import Tab3 from "./tabs/tab3";
import Tab4 from "./tabs/tab4";
import Tab5 from "./tabs/tab5";
import Tab6 from "./tabs/tab6";

function getTabContent(
  tabId: number,
  areaCode: string,
  data: any,
  data65: any,
  dictionary: any,
  isAddBtnClicked: boolean,
  handleSubmit: Function,
  submit: Function,
  selected: number,
  menuId: string,
  tabRef1: any,
  tabRef2: any,
  tabRef3: any,
  tabRef4: any,
  tabRef5: any,
  tabRef6: any,
  addBtnUnClick: Function,
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
          ref={tabRef1}
          data={data}
          data65={data65}
          dictionary={dictionary}
          isAddBtnClicked={isAddBtnClicked}
          handleSubmitParent={handleSubmit}
          submitParent={submit}
          addBtnUnClick={addBtnUnClick}
          qty={qty}
          setQty={setQty}
          reqty={reqty}
          setReqty={setReqty}
          danga={danga}
          setDanga={setDanga}
          vatDiv={vatDiv}
          setVatDiv={setVatDiv}
          inkum={inkum}
          setInkum={setInkum}
          dc={dc}
          setDc={setDc}
        />
      );
    case 1:
      return (
        <Tab2
          ref={tabRef2}
          data={data}
          data65={data65}
          dictionary={dictionary}
          isAddBtnClicked={isAddBtnClicked}
          handleSubmitParent={handleSubmit}
          submitParent={submit}
          addBtnUnClick={addBtnUnClick}
          // junJaego={junJaego}
          // setJunJaego={setJunJaego}
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
          ref={tabRef3}
          tabId={tabId}
          data={data}
          data65={data65}
          dictionary={dictionary}
          isAddBtnClicked={isAddBtnClicked}
          handleSubmitParent={handleSubmit}
          submitParent={submit}
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
      return (
        <Tab4
          ref={tabRef4}
          tabId={tabId}
          data={data}
          data65={data65}
          dictionary={dictionary}
          isAddBtnClicked={isAddBtnClicked}
          handleSubmitParent={handleSubmit}
          submitParent={submit}
          addBtnUnClick={addBtnUnClick}
          areaCode={areaCode}
          selected={selected}
        />
      );
    case 4:
      return (
        <Tab5
          ref={tabRef5}
          tabId={tabId}
          data={data}
          data65={data65}
          dictionary={dictionary}
          isAddBtnClicked={isAddBtnClicked}
          handleSubmitParent={handleSubmit}
          submitParent={submit}
          addBtnUnClick={addBtnUnClick}
          areaCode={areaCode}
        />
      );
    case 5:
      return (
        <Tab6
          ref={tabRef6}
          tabId={tabId}
          data={data}
          data65={data65}
          dictionary={dictionary}
          isAddBtnClicked={isAddBtnClicked}
          handleSubmitParent={handleSubmit}
          submitParent={submit}
          addBtnUnClick={addBtnUnClick}
          areaCode={areaCode}
        />
      );
  }
  return null;
}

export default getTabContent;
