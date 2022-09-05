import React from "react";
import styled from "styled-components";
import { Calendar, Power, Settings, Home } from "components/AllSvgIcon";
import Logo from "image/GasMax.png";
import UserImg from "image/user.png";

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  padding: 10px;
`;

const MainSide = styled.div`
  width: 100%;
  border: 1px solid black;
  margin-left: 5px;
`;

const LeftSide = styled.div`
  width: 400px;
  border: 2px solid green;
  padding: 10px;
  position: relative;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Middle = styled.div`
  border: 2px solid #63ce94;
  width: auto;
  height: 600px;
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid red;

  span {
    svg {
      margin: 1px 10px 0;
    }
  }

  .time {
    background: #e96220;
    border-radius: 5px;
    height: 24px;
    padding: 0 7px;
    color: #fff;
  }
`;

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
      <MainSide>Main</MainSide>
    </Container>
  );
}
