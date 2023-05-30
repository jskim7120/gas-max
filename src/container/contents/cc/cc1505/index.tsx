import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { apiGet } from "app/axios";
import { useDispatch } from "app/store";
import { useGetCommonDictionaryMutation } from "app/api/commonDictionary";
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
  const [loading, setLoading] = useState(false);
  const [isAddBtnClicked, setIsAddBtnClicked] = useState<boolean>(false);

  const [getCommonDictionary, { data: dataCommonDic }] =
    useGetCommonDictionaryMutation();

  useEffect(() => {
    getCommonDictionary({ groupId: "CC", functionName: "CC1505" });
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
    // try {
    //   const { data: datas } = await API.get(CC1505SEARCH, { params: params });

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
    //   console.log("CC1505 data search fetch error =======>", err);
    // }

    const datas = await apiGet(CC1505SEARCH, params);
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
    //   const { data: data65 } = await API.get(CC150565, { params: params });
    //   if (data65) {
    //     setData65(data65[0]);
    //   } else {
    //     setData65({});
    //   }
    // } catch (err) {
    //   setData65({});
    //   console.log("CC1505 data 65 fetch error =======>", err);
    // }

    const data65 = await apiGet(CC150565, params);
    if (data65) {
      setData65(data65[0]);
    } else {
      setData65({});
    }
  };

  const onClickAdd = () => {
    setIsAddBtnClicked(true);
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
            setIsAddBtnClicked={setIsAddBtnClicked}
            fields={fields}
            columns={columns}
            menuId={menuId}
            rowIndex={0}
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
