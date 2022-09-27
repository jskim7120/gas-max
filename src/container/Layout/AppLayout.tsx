import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "app/store";
import FavMenu from "components/favMenu/favMenu";
import {
  Container,
  TopSide,
  TopLeftWrapper,
  LeftSide,
  Icons,
  Navigation,
  Wrapper,
  FavTitle,
} from "./style";
import { Settings, Info, User, Favorite } from "components/AllSvgIcon";
import Navbar from "components/Menu/Navbar";
import LogoImg from "assets/image/Logo.png";

let menuData: Array<any>;

export default function AppLayout() {
  menuData = useSelector((state) => state.menu.menu);
  return (
    <Container>
      <TopSide>
        <TopLeftWrapper>
          <img src={LogoImg} />
          <Navbar data={menuData} />
        </TopLeftWrapper>
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
