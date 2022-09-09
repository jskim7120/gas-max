import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "app/store";
import Table from "components/Table";
import InfoDetail from "components/InfoDetail";
import IconButton from "components/Button";
import {
  updateEmployee,
  addEmployee,
  deleteEmployee,
  getEmployees,
} from "features/employee/employeeSlice";
import {
  CloseCircle,
  PlusCircle,
  ArrowDownCircle,
  ForbidCircle,
} from "components/AllSvgIcon";
import { Wrapper } from "./style";

let tableHeader: any[] = [
  "영업소코드",
  "사원코드",
  "사원명",
  "전화번호",
  "핸드폰",
  "급여일",
];
let tableData: any;
let user: any;

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

function TabContent1() {
  const dispatch = useDispatch();
  tableData = useSelector((state) => state.employees.employees);

  const [isCreate, setIsCreate] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState({});
  let selectedCustomerCopy = { ...tableData[0] };

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
      await dispatch(updateEmployee(selectedCustomer));
    }
    await dispatch(getEmployees());
  };

  const Cancel = () => {
    setSelectedCustomer(selectedCustomerCopy);
    setIsCreate(false);
  };
  return (
    <div>
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
            title="등록"
          />
          <IconButton
            icon={<CloseCircle color="red" />}
            onClick={() => DeleteEmployee()}
            title="삭제"
          />
          <IconButton
            icon={<ArrowDownCircle color="aqua" />}
            onClick={() => UpdateEmployee()}
            title="저장"
          />
          <IconButton
            icon={<ForbidCircle color="red" />}
            onClick={() => Cancel()}
            title="취소"
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
    </div>
  );
}

export default TabContent1;
