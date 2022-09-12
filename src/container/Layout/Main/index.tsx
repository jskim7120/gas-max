import React from "react";
import { useSelector, useDispatch } from "app/store";
import Navbar from "components/Menu/Navbar";
import { Main } from "./style";
import Tab from "components/Tab";
import { Power, Settings } from "components/AllSvgIcon";
import UserImg from "image/user.png";
import { getContent } from "components/Tab/tabContent";
import { removeTab } from "features/tab/tabSlice";

let menuData: Array<any>;

function MainContainer() {
  const dispatch = useDispatch();
  let tabHeader: any = [];
  let tabContent: Array<any> = [];

  menuData = useSelector((state) => state.menu.menu);
  const tabState = useSelector((state) => state.tab.tabs);

  if (tabState.length > 0) {
    tabState.map((tab) => {
      tabHeader.push({ menuId: tab.menuId, menuName: tab.menuName });
      tabContent.push(getContent(tab.menuId));
    });
  }
  const CloseTab = (e: any) => {
    const menuId = e.target.getAttribute("data-menuId");
    dispatch(removeTab({ menuId: menuId }));
    menuData = useSelector((state) => state.menu.menu);
  };

  return (
    <Main>
      <div>
        <div>
          <div>
            <div></div>
          </div>
          <Navbar data={menuData} />
          <div>
            <span>
              <img src={UserImg} width="40px" alt="asd" />
            </span>
            <Power />
            <Settings />
          </div>
        </div>
      </div>
      {tabState.length > 0 && (
        <Tab
          header={tabHeader}
          defaultIndex={0}
          handleClick={(e) => console.log("tab clicked", e)}
          content={tabContent}
          closeTab={CloseTab}
        />
      )}
    </Main>
  );
}

export default MainContainer;
