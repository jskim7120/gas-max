import React, { useEffect, useState } from "react";
import {
  Calendar,
  Power,
  Settings,
  Home,
  Plus,
  Close,
  ArrowDown,
} from "components/AllSvgIcon";
import UserImg from "image/user.png";
import Tab, { TabContent } from "components/Tab";
import Table from "components/Table";
import InfoDetail from "components/InfoDetail";
import { useGetCustomerListQuery } from "features/customer/customers-api-slice";
import { Main } from "./style";
import IconCreator from "./IconCreator";

export let tableHeader: any[] = [
  "영업소코드",
  "사원코드",
  "사원명",
  "사원구분",
  "주민번호",
  "전화번호",
  "핸드폰",
  "주소1",
  "주소2",
  "우편번호",
  "담당차량코드",
  "#REF!",
  "입사일자",
  "급여방식",
  "급여액",
  "급여일",
  "면허종류",
  "면허번호",
  "적성검사 시작일",
  "적성검사 마감일",
  "비고",
  "",
];
let tableData: any;

function Index() {
  const tabData = [{ title: "사원등록" }, { title: "거래처정보" }];
  const { data, isFetching } = useGetCustomerListQuery();
  const [selectedCustomer, setSelectedCustomer] = useState(
    data ? Object.entries(data)[0] : []
  );

  if (data) {
    //tableHeader = Object.keys(Object.values(data)[0]);

    console.log("tableHeader:", tableHeader);
    tableData = Object.values(data);
    console.log(tableData);
  }

  const changeCustomerInfo = (data: any) => {
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "5px 10px",
          }}
        >
          <span>총수량 :16</span>
          <span style={{ display: "flex" }}>
            <IconCreator
              Icon={<Plus color="white" />}
              style={{ marginRight: "5px" }}
            />
            errwtgttgr
            <IconCreator
              Icon={<ArrowDown color="white" />}
              style={{ marginLeft: "10px", marginRight: "5px" }}
            />
            sdeerfer
            <IconCreator
              Icon={<Close color="white" />}
              style={{ marginLeft: "10px", marginRight: "5px" }}
            />
            wfefre
          </span>
        </div>
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
