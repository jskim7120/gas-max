import React, { useEffect, useState } from "react";
import { Calendar, Power, Settings, Home } from "components/AllSvgIcon";
import UserImg from "image/user.png";
import Tab, { TabContent } from "components/Tab";
import Table from "components/Table";
import InfoDetail from "components/InfoDetail";
import { useGetCustomerListQuery } from "features/customer/customers-api-slice";
import { Main } from "./style";

let tableHeader: any[];
let tableData: any;

function Index() {
  const tabData = [{ title: "사원등록" }, { title: "거래처정보" }];
  const { data, isFetching } = useGetCustomerListQuery();
  const [selectedCustomer, setSelectedCustomer] = useState(
    data ? Object.entries(data)[0] : []
  );

  if (data) {
    tableHeader = Object.keys(Object.values(data)[0]);
    tableData = Object.values(data);
    //console.log(tableData);
  }

  const changeCustomerInfo = (data: any) => {
    console.log("onClick:", data);
    setSelectedCustomer(data);
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
          <Table
            tableHeader={tableHeader}
            tableData={tableData}
            onClick={changeCustomerInfo}
          />
          <InfoDetail data={selectedCustomer} />
        </div>
      </TabContent>
    </Main>
  );
}

export default Index;
