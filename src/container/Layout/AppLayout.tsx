import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "app/store";
import FavMenu from "components/favMenu/favMenu";

import {
  Container,
  TopSide,
  LeftSide,
  Top,
  Logo,
  Middle,
  Bottom,
  Navigation,
} from "./style";
import { Power, Settings, Calendar } from "components/AllSvgIcon";
import LogoImg from "image/Logo.png";

import Navbar from "components/Menu/Navbar";

let menuData: Array<any>;

export default function AppLayout() {
  menuData = useSelector((state) => state.menu.menu);
  return (
    <Container>
      <TopSide>
        <Logo>
          <img src={LogoImg} />
        </Logo>

        <Navbar data={menuData} />
      </TopSide>
      <LeftSide>
        <Navigation>
          <Top>
            {/* <img src={Logo} width="200px" /> */}
            {/* <img src={UserImg} width="auto" /> */}
            <p>사용자1[영업소]</p>
            <p>최근접속시간 2022-09-01 14:01:25</p>
          </Top>
          <Middle>
            <div>
              <Calendar />
              <p>즐겨찾기</p>
            </div>
            <FavMenu />
          </Middle>

          <Bottom>
            <span>
              <Power />
              <Settings color="gray" />
            </span>
            <div className="time">15:50</div>
          </Bottom>
        </Navigation>
      </LeftSide>
      <Outlet />
    </Container>
  );
}
