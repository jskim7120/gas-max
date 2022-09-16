import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "app/store";
import { GridView, LocalDataProvider } from "realgrid";
import { columns, fields } from "./employee-data";
import InfoDetail from "components/InfoDetail";
import { baseURL } from "api";
import IconButton from "components/Button";
import Modal from "react-modal";
import {
  updateEmployee,
  addEmployee,
  deleteEmployee,
  getEmployees,
} from "features/employee/employeeSlice";
import { openModal, closeModal } from "features/modal/modalSlice";
import {
  ExcelIcon,
  CloseCircle,
  PlusCircle,
  ArrowDownCircle,
  ForbidCircle,
} from "components/AllSvgIcon";
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

const emptyUser = {
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
let container: HTMLDivElement;
let dp: any;
let gv: any;
let selectedCustomerCopy: any;

function Tab2() {
  const dispatch = useDispatch();
  tableData = useSelector((state) => state.employees.employees);
  console.log("tableData:", tableData);
  const realgridElement = useRef<HTMLDivElement>(null);

  const [isCreate, setIsCreate] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(null);

  const modalIsOpen = useSelector((state) => state.modal.modalIsOpen);

  useEffect(() => {
    container = realgridElement.current as HTMLDivElement;
    dp = new LocalDataProvider(true);
    gv = new GridView(container);
    gv.setDataSource(dp);
    dp.setFields(fields);
    gv.setColumns(columns);
    dp.setRows(tableData);

    // gv.setDisplayOptions({
    //   selection: {
    //     background: "red",
    //   },
    // });

    gv.setSelection({
      startItem: selectedIndex,
      endItem: selectedIndex,
      style: "rows",
    });

    gv.onSelectionChanged = function () {
      const itemIndex: any = gv.getCurrent().itemIndex;
      //const realGridData = gv.getValues(itemIndex);
      selectedCustomerCopy = tableData[itemIndex];
      setSelectedCustomer(tableData[itemIndex]);
      setSelectedIndex(itemIndex);
    };

    return () => {
      dp.clearRows();
      gv.destroy();
      dp.destroy();
    };
  }, [tableData]);

  const closeModalFunc = () => {
    dispatch(closeModal({}));
  };

  const add = () => {
    setSelectedCustomer(emptyUser);
    setIsCreate(true);
  };

  const remove = async () => {
    await dispatch(deleteEmployee(selectedCustomer));
    await dispatch(getEmployees());
    setIsCreate(false);
    closeModalFunc();
  };

  const update = async () => {
    if (isCreate) {
      await dispatch(addEmployee({ ...selectedCustomer, areaCode: "20" }));
      setIsCreate(false);
    } else {
      await dispatch(updateEmployee(selectedCustomer));
    }
    await dispatch(getEmployees());
  };

  const cancel = () => {
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
            onClick={() => add()}
            title="등록"
          />
          <IconButton
            icon={<CloseCircle color="red" />}
            onClick={() => dispatch(openModal({}))}
            title="삭제"
          />
          <IconButton
            icon={<ArrowDownCircle color="aqua" />}
            onClick={() => update()}
            title="저장"
          />
          <IconButton
            icon={<ForbidCircle color="red" />}
            onClick={() => cancel()}
            title="취소"
          />
        </span>
      </div>
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
            <button onClick={remove} className="modal_btn">
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

export default Tab2;
