import React, { useState, useEffect } from "react";
import {
  Power,
  Settings,
  CloseCircle,
  PlusCircle,
  ArrowDownCircle,
  ForbidCircle,
} from "components/AllSvgIcon";
import UserImg from "image/user.png";
import Tab, { TabContent } from "components/Tab";
import Table from "components/Table";
import InfoDetail from "components/InfoDetail";
import { useGetCustomerListQuery } from "features/customer/customers-api-slice";
import { Main, Wrapper } from "./style";
import IconButton from "components/Button";

export let tableHeader: any[] = [
  "영업소코드",
  "사원코드",
  "사원명",
  "전화번호",
  "핸드폰",
  "급여일",
];
let tableData: any;

function Index() {
  const tabData = [{ title: "사원등록" }, { title: "거래처정보" }];
  const { data, isFetching } = useGetCustomerListQuery();
  const [selectedCustomer, setSelectedCustomer] = useState({});

  useEffect(() => {
    if (data) {
      tableData = Object.values(data);
      console.log(tableData);
      setSelectedCustomer(tableData[0]);
    }
  }, [data]);

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
            <IconButton
              icon={<PlusCircle color="orangered" />}
              onClick={() => console.log("bla")}
              title="Add"
            />
            <IconButton
              icon={<CloseCircle color="red" />}
              onClick={() => console.log("bla")}
              title="Delete"
            />
            <IconButton
              icon={<ArrowDownCircle color="aqua" />}
              onClick={() => console.log("bla")}
              title="Save"
            />
            <IconButton
              icon={<ForbidCircle color="red" />}
              onClick={() => console.log("bla")}
              title="Cancel"
            />
          </span>
        </div>
        {isFetching ? (
          <p>...loading</p>
        ) : (
          <Wrapper>
            <Table
              tableHeader={tableHeader}
              tableData={tableData}
              onClick={changeCustomerInfo}
            />
            <InfoDetail data={selectedCustomer} />
          </Wrapper>
        )}
      </TabContent>
    </Main>
  );
}

export default Index;
