import React, { useState, useEffect } from "react";
import { baseURL } from "api";
import { useDispatch, useSelector } from "app/store";
import Modal from "react-modal";
import { openModal, closeModal } from "features/modal/modalSlice";
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
  ExcelIcon,
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

function TabContent1() {
  const dispatch = useDispatch();
  const modalIsOpen = useSelector((state) => state.modal.modalIsOpen);

  function closeModalFunc() {
    dispatch(closeModal({}));
  }

  tableData = useSelector((state) => state.employees.employees);

  const [isCreate, setIsCreate] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState({});
  let selectedCustomerCopy = { ...tableData[0] };

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
    closeModalFunc();
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

      {modalIsOpen && (
        <Modal
          isOpen={true}
          onRequestClose={closeModalFunc}
          style={customStyles}
          contentLabel="Example Modal"
          portalClassName="modal"
          ariaHideApp={false}
        >
          <div className="modal_title">정말 삭제하시겠습니까?</div>
          <div className="btn_cnt">
            <button onClick={DeleteEmployee} className="modal_btn">
              삭제
            </button>
            <button onClick={closeModalFunc} className="modal_btn">
              취소
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default TabContent1;
