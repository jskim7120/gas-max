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
import { Main, Wrapper } from "./style";
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
      <div>
        <div>
          <div>
            <div></div>
          </div>
          <ul>
            <li>등록</li>
            <li>현황</li>
            <li>거래처</li>
            <li>재고</li>
            <li>회계</li>
            <li>수금</li>
            <li>A/S</li>
            <li>기타</li>
            <li>공통관리</li>
            <li>양식</li>
          </ul>
          <div>
            <span>
              <img src={UserImg} width="40px" />
            </span>
            <Power />
            <Settings />
          </div>
        </div>
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
        <Wrapper>
          <Table
            tableHeader={tableHeader}
            tableData={tableData}
            onClick={changeCustomerInfo}
          />
          <InfoDetail data={selectedCustomer} />
        </Wrapper>
      </TabContent>
    </Main>
  );
}

export default Index;
