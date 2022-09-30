import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "app/store";
import { Container, TopSide, TopLeftWrapper, Icons } from "./style";
import { Settings, User } from "components/AllSvgIcon";
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

      <Outlet />
      <Footer />
    </Container>
  );
}
