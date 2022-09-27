import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "app/store";
import FavMenu from "components/favMenu/favMenu";

import {
  Container,
  TopSide,
  LeftSide,
  Logo,
  Icons,
  Navigation,
  Wrapper,
  FavTitle,
} from "./style";
import { Settings, Info, User, Favorite } from "components/AllSvgIcon";
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
        <Icons>
          <Settings />
          <Info />
          <User />
        </Icons>
      </TopSide>
      <Wrapper>
        <LeftSide>
          <Navigation>
            <FavTitle>
              <Favorite />
              <p>바로가기</p>
            </FavTitle>
            <FavMenu />
          </Navigation>
        </LeftSide>
        <Outlet />
      </Wrapper>
    </Container>
  );
}
