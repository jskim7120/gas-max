import React, { useState } from "react";
import styled from "styled-components";
import { Calendar, Power, Settings, Home } from "components/AllSvgIcon";
import UserImg from "image/user.png";
import Tab, { TabContent } from "components/Tab";
import Table from "components/Table";
import InfoDetail from "components/InfoDetail";

const Main = styled.div`
  width: 100%;
  border: 1px solid black;
  margin-left: 5px;
`;

const tabData = [{ title: "사원등록" }, { title: "거래처정보" }];

function Index() {
  const [infoData, setInfoData] = useState({
    name: "Bat",
    age: "21",
    color: "red",
    date: "2020-02-05",
    country: "mongolia",
    job: "cdscd",
  });

  const changeCustomerInfo = () => {
    console.log("dsvsv");
  };
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
      <Tab
        data={tabData}
        defaultIndex={0}
        handleClick={() => console.log("sdcds")}
      />
      <TabContent visible={true}>
        <div style={{ display: "flex" }}>
          <Table onClick={changeCustomerInfo} />
          <InfoDetail data={infoData} />
        </div>
      </TabContent>
    </Main>
  );
}

export default Index;
