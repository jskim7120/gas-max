import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "app/store";
import { useGetCommonDictionaryQuery } from "app/api/commonDictionary";
import {
  SearchWrapper,
  MainWrapper,
  RightSide,
  LeftSide,
} from "../../commonStyle";
import { openModal, addDeleteMenuId } from "app/state/modal/modalSlice";
import { fields, columns } from "./data";
import { ICC1505SEARCH } from "./model";
import GridLeft from "components/grid";
import API from "app/axios";
import { CC1505SEARCH, CC150565 } from "app/path";
import Form from "./form";
import FourButtons from "components/button/fourButtons";

function CC1505({
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
  const [data65, setData65] = useState<any>({});
  const [selected, setSelected] = useState<any>({});
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isAddBtnClicked, setIsAddBtnClicked] = useState<boolean>(false);
  const [isCancelBtnDisabled, setIsCancelBtnDisabled] = useState<boolean>(true);

  const { data: dataCommonDic } = useGetCommonDictionaryQuery({
    groupId: "CC",
    functionName: "CC1505",
  });

  useEffect(() => {
    if (ownAreaCode) {
      fetchData({ areaCode: ownAreaCode });
    }
  }, []);

  useEffect(() => {
    if (selected && Object.keys(selected).length > 0) {
      fetchData65({ accCode: selected.accCode, areaCode: ownAreaCode });
    }
  }, [selected]);

  const fetchData = async (params: any) => {
    try {
      const { data: datas } = await API.get(CC1505SEARCH, { params: params });

      if (datas) {
        setData(datas);
        setSelected(datas[0]);
      } else {
        setData([]);
        setSelected({});
      }
    } catch (err) {
      setData([]);
      setSelected({});
      console.log("CC1505 data search fetch error =======>", err);
    }
  };

  const fetchData65 = async (params: any) => {
    try {
      const { data: data65 } = await API.get(CC150565, { params: params });
      if (data65) {
        setData65(data65[0]);
      } else {
        setData65({});
      }
    } catch (err) {
      setData65({});
      console.log("CC1505 data 65 fetch error =======>", err);
    }
  };

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
        <p>{depthFullName}</p>

        <FourButtons
          onClickAdd={onClickAdd}
          onClickDelete={onClickDelete}
          onClickUpdate={onClickUpdate}
          onClickReset={onClickReset}
          isAddBtnClicked={isAddBtnClicked}
          isCancelBtnDisabled={isCancelBtnDisabled}
        />
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
            style={{ height: `100%` }}
          />
        </LeftSide>
        <RightSide>
          <Form
            ref={formRef}
            data={data65}
            dataCommonDic={dataCommonDic}
            isAddBtnClicked={isAddBtnClicked}
          />
        </RightSide>
      </MainWrapper>
    </>
  );
}

export default CC1505;
