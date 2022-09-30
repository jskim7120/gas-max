import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "app/store";
import { Container, TopSide, TopLeftWrapper, Icons } from "./style";
import { Settings, User } from "components/AllSvgIcon";
import Navbar from "components/Menu/Navbar";
import Dropdown from "components/dropdown";
import LogoImg from "assets/image/Logo.png";
import JoaImg from "assets/image/JOA.png";

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

          <Dropdown
            icon={<User />}
            content={
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  fontFamily: "SegoeUI",
                  fontSize: "12px",
                  color: "#0057aa",
                }}
              >
                <img src={JoaImg} />
                <label>조아테크1</label>
                <label>jskim7120@daum.net</label>
                <button>로그아웃</button>
              </div>
            }
          />
        </Icons>
      </TopSide>

      <Outlet />
      <div
        style={{
          width: "100%",
          height: "80px",
          borderTop: "2px solid #707070",
          background: "#D9E8F6",
        }}
      ></div>
    </Container>
  );
}
