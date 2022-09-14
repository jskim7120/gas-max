import React from "react";
import { useSelector } from "app/store";
import Navbar from "components/Menu/Navbar";
import { Main } from "./style";
import Tab from "components/Tab";
import { Power, Settings } from "components/AllSvgIcon";
import UserImg from "image/user.png";

let menuData: Array<any>;

function MainContainer() {
  menuData = useSelector((state) => state.menu.menu);
  console.log("Main dotroos");
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
      {<Tab />}
    </Main>
  );
}

export default MainContainer;
