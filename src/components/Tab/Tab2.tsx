import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "app/store";
import { GridView, LocalDataProvider } from "realgrid";
import { columns, fields } from "./employee-data";
import InfoDetail from "components/InfoDetail";
// import { baseURL } from "api";
// import IconButton from "components/Button";

// import {
//   updateEmployee,
//   addEmployee,
//   deleteEmployee,
//   getEmployees,
// } from "features/employee/employeeSlice";
// import { openModal, closeModal } from "features/modal/modalSlice";
// import {
//   ExcelIcon,
//   CloseCircle,
//   PlusCircle,
//   ArrowDownCircle,
//   ForbidCircle,
// } from "components/AllSvgIcon";
import { Wrapper } from "./style";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "315px",
    height: "175px",
  },
};

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

let tableData: any;
let user: any;

function Tab2() {
  const dispatch = useDispatch();
  tableData = useSelector((state) => state.employees.employees);

  const [isCreate, setIsCreate] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState({});
  let selectedCustomerCopy = { ...tableData[0] };

  // const [dataProvider, setDataProvider] = useState(null);
  // const [gridView, setGridView] = useState(null);
  const realgridElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container: HTMLDivElement = realgridElement.current as HTMLDivElement;
    const dp = new LocalDataProvider(true);
    const gv = new GridView(container);

    gv.setDataSource(dp);
    dp.setFields(fields);
    gv.setColumns(columns);
    dp.setRows(tableData);

    // setDataProvider(dp);
    // setGridView(gv);

    return () => {
      dp.clearRows();
      gv.destroy();
      dp.destroy();
    };
  }, []);

  // const closeModalFunc = () => {
  //   dispatch(closeModal({}));
  // };

  // const changeCustomerInfo = (data: any) => {
  //   user = data;
  //   setSelectedCustomer(data);
  //   selectedCustomerCopy = { data };
  // };

  // const AddEmployee = async () => {
  //   setSelectedCustomer(dummySelectedUser);
  //   setIsCreate(true);
  // };

  // const DeleteEmployee = async () => {
  //   await dispatch(deleteEmployee(selectedCustomer));
  //   await dispatch(getEmployees());
  //   setIsCreate(false);
  //   closeModalFunc();
  // };

  // const UpdateEmployee = () => {
  //   if (isCreate) {
  //     dispatch(addEmployee({ ...selectedCustomer, areaCode: "20" }));
  //     setIsCreate(false);
  //   } else {
  //     dispatch(updateEmployee(selectedCustomer));
  //   }
  //   dispatch(getEmployees());
  // };

  // const Cancel = () => {
  //   setSelectedCustomer(selectedCustomerCopy);
  //   setIsCreate(false);
  // };

  return (
    <div>
      {/* <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "5px 10px",
        }}
      >
        <span>총수량 :{tableData.length}</span>
        <span style={{ display: "flex" }}>
          <a
            href={`${baseURL}employee/excel`}
            style={{
              margin: "1px 15px 0 0",
            }}
          >
            <ExcelIcon width="28px" height="28px" />
          </a>
          <IconButton
            icon={<PlusCircle color="orangered" />}
            onClick={() => AddEmployee()}
            title="등록"
          />
          <IconButton
            icon={<CloseCircle color="red" />}
            // onClick={() => DeleteEmployee()}
            onClick={() => dispatch(openModal({}))}
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
      </div> */}
      {tableData ? (
        <Wrapper>
          <div
            style={{ height: "auto", width: "50%" }}
            ref={realgridElement}
          ></div>
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

export default Tab2;
