import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "app/store";

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
import Menu from "components/Menu";
import InfoDetail from "components/InfoDetail";
import { Main, Wrapper } from "./style";
import IconButton from "components/Button";

import {
  updateEmployee,
  addEmployee,
  deleteEmployee,
} from "features/employee/employeeSlice";

const tabData = [{ title: "사원등록" }, { title: "거래처정보" }];
let tableHeader: any[] = [
  "영업소코드",
  "사원코드",
  "사원명",
  "전화번호",
  "핸드폰",
  "급여일",
];
let tableData: any;
let menuData: any;

function MainContainer() {
  const dispatch = useDispatch();
  const [selectedCustomer, setSelectedCustomer] = useState({});
  tableData = useSelector((state) => state.employees.employees);
  menuData = useSelector((state) => state.menu.menu);

  // console.log("tableData:", tableData[0]);
  // console.log("menuData:", menuData);

  const changeCustomerInfo = (data: any) => {
    setSelectedCustomer(data);
  };

  const AddEmployee = async () => {
    // const employee: any = {
    //   areaCode: "00", //
    //   swAddr1: "bla bal",
    //   swAddr2: "",
    //   swBigo: "",
    //   swCaCode: null,
    //   swCaName: null,
    //   swCode: "16", //unique
    //   swDriverNo: "",
    //   swDriverType: "",
    //   swGubun: "0",
    //   swHp: "",
    //   swIndate: "20210901",
    //   swJdate1: "",
    //   swJdate2: "",
    //   swJuminno: "",
    //   swName: "Otgoo2",
    //   swPaydate: "",
    //   swPaykum: 0,
    //   swPaytype: "2",
    //   swTel: "",
    //   swWorkOut: "N",
    //   swZipcode: "",
    // };
    // await dispatch(addEmployee(employee));
    setSelectedCustomer({});
  };

  const DeleteEmployee = async () => {
    const employee: any = {
      areaCode: "00", //
      swAddr1: "bla bal",
      swAddr2: "",
      swBigo: "",
      swCaCode: null,
      swCaName: null,
      swCode: "16", //unique
      swDriverNo: "",
      swDriverType: "",
      swGubun: "0",
      swHp: "",
      swIndate: "20210901",
      swJdate1: "",
      swJdate2: "",
      swJuminno: "",
      swName: "Otgoo",
      swPaydate: "",
      swPaykum: 0,
      swPaytype: "2",
      swTel: "",
      swWorkOut: "N",
      swZipcode: "",
    };

    await dispatch(deleteEmployee(employee));
  };

  const UpdateEmployee = async () => {
    dispatch(addEmployee({}));

    const employee: any = {
      areaCode: "00", //
      swAddr1: "bla bal",
      swAddr2: "",
      swBigo: "",
      swCaCode: null,
      swCaName: null,
      swCode: "16", //unique
      swDriverNo: "",
      swDriverType: "",
      swGubun: "0",
      swHp: "",
      swIndate: "20210901",
      swJdate1: "",
      swJdate2: "",
      swJuminno: "",
      swName: "Otgoo zasav",
      swPaydate: "",
      swPaykum: 0,
      swPaytype: "2",
      swTel: "",
      swWorkOut: "N",
      swZipcode: "",
    };

    await dispatch(updateEmployee(employee));
  };

  // const menuData = useSelector(selectMenu);
  // console.log("menuData:", menuData);

  // useEffect(() => {
  //   if (data) {
  //     tableData = Object.values(data);
  //     // console.log(tableData);
  //     setSelectedCustomer(tableData[0]);
  //   }
  // }, [data]);

  // useEffect(() => {
  //   if (menuData) {
  //     console.log(Object.values(menuData));
  //   }
  // }, [menuData]);

  return (
    <Main>
      <div>
        <div>
          <div>
            <div></div>
          </div>

          <Menu data={menuData} />

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
              onClick={() => AddEmployee()}
              title="Add"
            />
            <IconButton
              icon={<CloseCircle color="red" />}
              onClick={() => DeleteEmployee()}
              title="Delete"
            />
            <IconButton
              icon={<ArrowDownCircle color="aqua" />}
              onClick={() => UpdateEmployee()}
              title="Save"
            />
            <IconButton
              icon={<ForbidCircle color="red" />}
              onClick={() => console.log("bla")}
              title="Cancel"
            />
          </span>
        </div>
        {tableData ? (
          <Wrapper>
            <Table
              tableHeader={tableHeader}
              tableData={tableData}
              onClick={changeCustomerInfo}
            />
            <InfoDetail data={selectedCustomer} />
          </Wrapper>
        ) : (
          <p>...loading</p>
        )}
      </TabContent>
    </Main>
  );
}

export default MainContainer;
