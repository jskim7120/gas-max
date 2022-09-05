import React from "react";
import MainSide from "./Main";
import { Container, LeftSide, Top, Middle, Bottom } from "./style";
import { Power, Settings } from "components/AllSvgIcon";
import Logo from "image/GasMax.png";
import UserImg from "image/user.png";

export default function AppLayout() {
  return (
    <Container>
      <LeftSide>
        <Top>
          <img src={Logo} width="200px" />
          <img src={UserImg} width="auto" />
          <span>
            사용자1[영업소]
            <em>최근접속시간 2022-09-01 14:01:25</em>
          </span>
        </Top>
        <Middle>fbgfbg</Middle>
        <Bottom>
          <span>
            <Power />
            <Settings color="gray" />
          </span>
          <div className="time">15:50</div>
        </Bottom>
      </LeftSide>
      <MainSide />
    </Container>
  );
}
