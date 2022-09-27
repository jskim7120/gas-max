import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "app/store";
import Table from "components/Table";
import Form from "./form";
import { Wrapper } from "../style";
import Button from "components/Button/Button";
import { Plus, Trash, Tick, X } from "components/AllSvgIcon";

let tableHeader: any[] = [
  "영업소코드",
  "사원코드",
  "사원명",
  "전화번호",
  "핸드폰",
  "급여일",
];
let tableData: any;

function TabContent1({ name }: { name: string }) {
  console.log("activeTabName:", name);
  tableData = useSelector((state) => state.employees.employees);
  const [selectedCustomer, setSelectedCustomer] = useState({
    areaCode: "",
    opt: null,
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
    swPaykum: null,
    swPaytype: "",
    swTel: "",
    swWorkOut: "",
    swZipcode: "",
  });

  const changeCustomerInfo = (data: any) => {
    setSelectedCustomer(data);
  };

  const getFormValues = (e: Object) => {
    console.log("getFormValues daragdav", e);
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
      ></div>
      {tableData ? (
        <>
          <Wrapper>
            <div
              style={{
                backgroundColor: "#0098FF",
                width: "100%",
                height: "41px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 15px",
              }}
            >
              <p
                style={{
                  color: "#EEF604",
                  fontSize: "18px",
                  fontFamily: "NotoSansKRRegular",
                }}
              >
                {name}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div>
                  <Button text="등록" icon={<Plus />} />
                  <Button text="삭제" icon={<Trash />} />
                  <Button text="저장" icon={<Tick />} />
                  <Button text="취소" icon={<X />} />
                </div>
                <div>icons</div>
              </div>
            </div>
            <Table
              tableHeader={tableHeader}
              tableData={tableData}
              onClick={changeCustomerInfo}
            />

            <Form
              selectedCustomer={selectedCustomer}
              getFormValues={getFormValues}
            />
          </Wrapper>
        </>
      ) : (
        <p>...loading</p>
      )}
    </div>
  );
}

export default TabContent1;
