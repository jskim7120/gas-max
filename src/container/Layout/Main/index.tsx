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
import InfoDetail from "components/InfoDetail";
import { Main, Wrapper } from "./style";
import IconButton from "components/Button";
import Navbar from "components/Menu/Navbar";

import {
  updateEmployee,
  addEmployee,
  deleteEmployee,
  getEmployees,
} from "features/employee/employeeSlice";

let tabData = [{ title: "사원등록" }, { title: "거래처정보" }];
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

let dt = new Date();
const dummySelectedUser = {
  areaCode: "",
  opt: 0,
  swAddr1: "",
  swAddr2: "",
  swBigo: "",
  swCaCode: null,
  swCaName: null,
  swCode: "",
  swDriverNo: "",
  swDriverType: "",
  swGubun: "",
  swHp: "",
  swIndate: "",
  swJdate1: "",
  swJdate2: "",
  swJuminno: "",
  swName: "",
  swPaydate: "",
  swPaykum: 0,
  swPaytype: "",
  swTel: "",
  swWorkOut: "N",
  swZipcode: "",
};

let user: any;

function MainContainer() {
  const dispatch = useDispatch();

  tableData = useSelector((state) => state.employees.employees);
  menuData = useSelector((state) => state.menu.menu);
  const [selectedCustomer, setSelectedCustomer] = useState({});
  let selectedCustomerCopy = { ...tableData[0] };
  const [isCreate, setIsCreate] = useState(false);

  // console.log("tableData:", tableData[0]);
  // console.log("menuData:", menuData);

  useEffect(() => {
    setSelectedCustomer({ ...tableData[0] });
    selectedCustomerCopy = { ...tableData[0] };
  }, [tableData]);

  const changeCustomerInfo = (data: any) => {
    user = data;
    setSelectedCustomer(data);
    selectedCustomerCopy = { data };
  };

  const AddEmployee = async () => {
    console.log("selected:", dummySelectedUser.swIndate);
    setSelectedCustomer(dummySelectedUser);
    setIsCreate(true);
  };

  const DeleteEmployee = async () => {
    await dispatch(deleteEmployee(selectedCustomer));
    await dispatch(getEmployees());
    setIsCreate(false);
  };

  const UpdateEmployee = async () => {
    if (isCreate) {
      await dispatch(addEmployee({ ...selectedCustomer, areaCode: "20" }));
      setIsCreate(false);
    } else {
      console.log("---------------", selectedCustomer);
      await dispatch(updateEmployee(selectedCustomer));
    }
    await dispatch(getEmployees());
  };

  const Cancel = () => {
    console.log("fuck");
    setSelectedCustomer(selectedCustomerCopy);

    setIsCreate(false);
  };

  return (
    <Main>
      <div>
        <div>
          <div>
            <div></div>
          </div>

          <Navbar data={menuData} />

          <div>
            <span>
              <img src={UserImg} width="40px" alt="asd" />
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
              onClick={() => Cancel()}
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
            <InfoDetail
              data={selectedCustomer}
              setSelectedCustomer={setSelectedCustomer}
            />
          </Wrapper>
        ) : (
          <p>...loading</p>
        )}
      </TabContent>
    </Main>
  );
}

export default MainContainer;
