import React, { useEffect, useState, useRef } from "react";
import { apiGet } from "app/axios";
import { useDispatch } from "app/store";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import { CC1600SEARCH, CC160065, CC160062 } from "app/path";
import {
  SearchWrapper,
  MainWrapper,
  RightSide,
  LeftSide,
} from "../../commonStyle";
import { openModal, addDeleteMenuId } from "app/state/modal/modalSlice";
import GridLeft from "components/grid";
import { fields, columns } from "./data";
import Form from "./form";
import FourButtons from "components/button/fourButtons";

function CC1600({
  depthFullName,
  ownAreaCode,
  menuId,
}: {
  depthFullName: string;
  ownAreaCode: string;
  menuId: string;
}) {
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [data65, setData65] = useState({});
  const [selected, setSelected] = useState<any>({});
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const [isAddBtnClicked, setIsAddBtnClicked] = useState<boolean>(false);
  const [isCancelBtnDisabled, setIsCancelBtnDisabled] = useState<boolean>(true);
  const [acsAccName, setAcsAccName] = useState([]);
  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "CC",
    functionName: "CC1600",
  });

  useEffect(() => {
    if (ownAreaCode) {
      fetchData({ areaCode: ownAreaCode });
    }
  }, []);

  useEffect(() => {
    if (selected && Object.keys(selected).length > 0) {
      fetchData65({
        acsAccCode: selected.acsAccCode,
        acsCode: selected.acsCode,
        areaCode: ownAreaCode,
      });
      // fetchData62({ acsType: selected.acsType });
    }
  }, [selected]);

  const fetchData = async (params: any) => {
    // try {
    //   const { data: datas } = await API.get(CC1600SEARCH, { params: params });

    //   if (datas) {
    //     setData(datas);
    //     setSelected(datas[0]);
    //   } else {
    //     setData([]);
    //     setSelected({});
    //   }
    // } catch (err) {
    //   setData([]);
    //   setSelected({});
    //   console.log("CC1600 data search fetch error =======>", err);
    // }

    const datas = await apiGet(CC1600SEARCH, params);
    if (datas) {
      setData(datas);
      setSelected(datas[0]);
    } else {
      setData([]);
      setSelected({});
    }
  };

  const fetchData65 = async (params: any) => {
    // try {
    //   const { data: data65 } = await API.get(CC160065, { params: params });
    //   if (data65) {
    //     // console.log("data65:", data65);

    //     setData65(data65.data[0]);
    //     setAcsAccName(data65.acsAccName);
    //   } else {
    //     setData65({});
    //     setAcsAccName([]);
    //   }
    // } catch (err) {
    //   setData65({});
    //   setAcsAccName([]);
    //   console.log("CC1600 data 65 fetch error =======>", err);
    // }

    const data65 = await apiGet(CC160065, params);
    if (data65) {
      // console.log("data65:", data65);

      setData65(data65.data[0]);
      setAcsAccName(data65.acsAccName);
    } else {
      setData65({});
      setAcsAccName([]);
    }
  };

  // const fetchData62 = async (params: any) => {
  //   try {
  //     const { data: data62 } = await API.get(CC160062, { params: params });
  //     if (data62) {
  //       // console.log("data62:", data62);
  //     } else {
  //     }
  //   } catch (err) {
  //     console.log("CC1600 data 65 fetch error =======>", err);
  //   }
  // };

  const onClickAdd = () => {
    setIsAddBtnClicked(true);
    setIsCancelBtnDisabled(false);
    formRef.current.resetForm("clear");
  };

  const onClickDelete = () => {
    dispatch(openModal({ type: "delModal" }));
    dispatch(addDeleteMenuId({ menuId: menuId }));
  };
  const onClickUpdate = () => {
    formRef.current.crud(null);
  };

  const onClickReset = () => {
    setIsAddBtnClicked(false);
    formRef.current.resetForm("reset");
  };

  return (
    <>
      <SearchWrapper className="h35 mt5">
        <FourButtons
          onClickAdd={onClickAdd}
          onClickDelete={onClickDelete}
          onClickUpdate={onClickUpdate}
          onClickReset={onClickReset}
          isAddBtnClicked={isAddBtnClicked}
        />
        <p>{depthFullName}</p>
      </SearchWrapper>
      <MainWrapper>
        <LeftSide>
          <GridLeft
            areaCode={ownAreaCode}
            data={data}
            setSelected={setSelected}
            selectedRowIndex={selectedRowIndex}
            setSelectedRowIndex={setSelectedRowIndex}
            setIsCancelBtnDisabled={setIsCancelBtnDisabled}
            setIsAddBtnClicked={setIsAddBtnClicked}
            fields={fields}
            columns={columns}
            style={{ height: "100%" }}
          />
        </LeftSide>
        <RightSide>
          <Form
            ref={formRef}
            data65={data65}
            acsAccName={acsAccName}
            //setData65={setData65}
            //fetchData={fetchData}
            //setData={setData}
            //selectedRowIndex={selectedRowIndex}
            //setSelectedRowIndex={setSelectedRowIndex}
            //setSelected={setSelected}
            //dataCommonDic={dataCommonDic}
            isAddBtnClicked={isAddBtnClicked}
            setIsAddBtnClicked={setIsAddBtnClicked}
          />
        </RightSide>
      </MainWrapper>
    </>
  );
}

export default CC1600;
