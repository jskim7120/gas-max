import React from "react";
import { useSelector } from "app/store";
import Navbar from "components/Menu/Navbar";
import { Main } from "./style";
import Tab from "components/Tab";
import { Power, Settings } from "components/AllSvgIcon";
import UserImg from "image/user.png";
import { getContent } from "components/Tab/tabContent";

let menuData: Array<any>;

function MainContainer() {
  let tabHeader: Array<string> = [];
  let tabContent: Array<any> = [];

  menuData = useSelector((state) => state.menu.menu);
  const tabState = useSelector((state) => state.tab.tabs);

  if (tabState.length > 0) {
    tabHeader = [...tabState.map((tab) => tab.menuName)];
    tabState.map((tab) => tabContent.push(getContent(tab.menuId)));
  }

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
        />
      )}
    </Main>
  );
}

export default MainContainer;
