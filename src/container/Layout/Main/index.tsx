import React from "react";
import { useSelector } from "app/store";
import Navbar from "components/Menu/Navbar";
import { Main } from "./style";
import Tab from "components/Tab";
import Tab1 from "components/Tab/Tab1";
import { Power, Settings } from "components/AllSvgIcon";
import UserImg from "image/user.png";

let tabData = ["사원등록", "거래처정보"];
let menuData: any;
let tabs = [<Tab1 />, <div>2-r div shuu</div>];

function MainContainer() {
  menuData = useSelector((state) => state.menu.menu);

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

      <Tab
        header={tabData}
        defaultIndex={0}
        handleClick={(e) => console.log("tab clicked", e)}
        content={tabs}
      />
    </Main>
  );
}

export default MainContainer;
