import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "app/store";
import { Container, TopSide, TopLeftWrapper, Icons } from "./style";
import { Settings, User } from "components/allSvgIcon";
import Navbar from "components/menu/navbar";
import LogoImg from "assets/image/Logo.png";
import Footer from "./footer";
import { openModal } from "features/modal/modalSlice";

let menuData: Array<any>;

export default function AppLayout() {
  const dispatch = useDispatch();
  menuData = useSelector((state) => state.menu.menu);
  return (
    <Container>
      <TopSide>
        <TopLeftWrapper>
          <img src={LogoImg} />
          <Navbar data={menuData} />
        </TopLeftWrapper>
        <Icons>
          <span>
            <Settings />
          </span>
          <span onClick={() => dispatch(openModal({ type: "accountModal" }))}>
            <User />
          </span>
        </Icons>
      </TopSide>

      <Outlet />
      <Footer />
    </Container>
  );
}
