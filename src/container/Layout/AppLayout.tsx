import React from "react";
import { Outlet } from "react-router-dom";
import FavMenu from "components/favMenu/favMenu";
import { Container, LeftSide, Top, Middle, Bottom, Navigation } from "./style";
import { Power, Settings, Calendar } from "components/AllSvgIcon";
import Logo from "image/GasMax.png";
import UserImg from "image/user.png";

export default function AppLayout() {
  return (
    <Container>
      <LeftSide>
        <Navigation>
          <Top>
            <img src={Logo} width="200px" />
            <img src={UserImg} width="auto" />
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
