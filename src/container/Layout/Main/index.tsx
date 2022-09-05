import React from "react";
import styled from "styled-components";
import { Calendar, Power, Settings, Home } from "components/AllSvgIcon";
import Logo from "image/GasMax.png";
import UserImg from "image/user.png";
import Tab from "components/Tab";

const Main = styled.div`
  width: 100%;
  border: 1px solid black;
  margin-left: 5px;
`;

function index() {
  return (
    <Main>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{
            width: "50px",
            height: "25px",
            border: "3px solid gray",
            borderRadius: "15px",
          }}
        ></div>
        <span>등록 현황 거래처 재고 회계 수금 A/S 기타 공통관리 양식</span>
        <span>
          <img src={UserImg} width="40px" />
        </span>
      </div>
      <Tab />
    </Main>
  );
}

export default index;
