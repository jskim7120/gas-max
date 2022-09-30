import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "app/store";
import FavMenu from "components/favMenu/favMenu";
import SlidingPane from "components/slidingPane";
import {
  Container,
  TopSide,
  TopLeftWrapper,
  // LeftSide,
  Icons,
  // Navigation,
  Wrapper,
  // FavTitle,
} from "./style";
import { Settings, User, Favorite } from "components/AllSvgIcon";
import Navbar from "components/Menu/Navbar";
import LogoImg from "assets/image/Logo.png";
import Footer from "./Footer";

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
          <User />
        </Icons>
      </TopSide>

      {/* <Wrapper> */}
      {/* <LeftSide>
        <Navigation>
          <FavTitle>
            <Favorite />
            <p>바로가기</p>
          </FavTitle>
          <FavMenu />
        </Navigation>
        </LeftSide> */}
      <Wrapper>
        <Outlet />
      </Wrapper>
      {/* </Wrapper> */}
      <Footer />
    </Container>
  );
}
